/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

import { graphql, createFragmentContainer } from 'react-relay';

import type { Home_workflows } from './__generated__/Home_workflows.graphql';

import Link from '../Link';

import { Table, Icon, Input, Popconfirm } from 'antd';

const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: 'Workflow ID',
    dataIndex: 'workflowId',
    key: 'workflowId',
  },
  {
    title: 'Workflow Name',
    dataIndex: 'workflowName',
    key: 'workflowName',
  },
  {
    title: 'Workflow Version',
    dataIndex: 'workflowVersion',
    key: 'workflowVersion',
  },
  {
    title: 'Configuration',
    dataIndex: 'config',
    key: 'config',
  },
];

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.editable !== this.state.editable) {
      this.setState({ editable: nextProps.editable });
      if (nextProps.editable) {
        this.cacheValue = this.state.value;
      }
    }
    if (nextProps.status && nextProps.status !== this.props.status) {
      if (nextProps.status === 'save') {
        this.props.onChange(this.state.value);
      } else if (nextProps.status === 'cancel') {
        this.setState({ value: this.cacheValue });
        this.props.onChange(this.cacheValue);
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.editable !== this.state.editable ||
      nextState.value !== this.state.value
    );
  }
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  render() {
    const { value, editable, textarea } = this.state;
    return (
      <div>
        {editable ? textarea ? (
          <div>
            <Input.TextArea
              value={value}
              onChange={e => this.handleChange(e)}
            />
          </div>
        ) : (
          <div>
            <Input value={value} onChange={e => this.handleChange(e)} />
          </div>
        ) : (
          <div className="editable-row-text">{value.toString() || ' '}</div>
        )}
      </div>
    );
  }
}

class EditableTable extends React.Component {
  props: {
    workflows: Home_workflows,
  };
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Workflow ID',
        dataIndex: 'workflowId',
        width: '15%',
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'workflowId', text),
      },
      {
        title: 'Workflow Name',
        dataIndex: 'workflowName',
        width: '15%',
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'workflowName', text),
      },
      {
        title: 'Workflow Version',
        dataIndex: 'workflowVersion',
        width: '15%',
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'workflowVersion', text),
      },
      {
        title: 'Configuration',
        dataIndex: 'config',
        width: '25%',
        render: (text, record, index) =>
          this.renderColumns(this.state.data, index, 'config', text),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record, index) => {
          const { editable } = this.state.data[index].workflowName;
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <a onClick={() => this.editDone(index, 'save')}>Save</a>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.editDone(index, 'cancel')}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <a onClick={() => this.edit(index)}>Edit</a>
                </span>
              )}
            </div>
          );
        },
      },
    ];
    const workflowData = this.props.workflows.edges.map(({ node: w }) => ({
      workflowId: { value: w.workflowId },
      workflowName: { editable: false, value: w.workflowName },
      workflowVersion: { editable: false, value: w.workflowVersion },
      config: {
        editable: false,
        value: w.configuration ? w.configuration.config : '',
      },
      key: w.id,
    }));
    this.state = { data: workflowData };
  }
  renderColumns(data, index, key, text) {
    const { editable, status } = data[index][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (
      <EditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(key, index, value)}
        status={status}
      />
    );
  }
  handleChange(key, index, value) {
    const { data } = this.state;
    data[index][key].value = value;
    this.setState({ data });
  }
  edit(index) {
    const { data } = this.state;
    Object.keys(data[index]).forEach(item => {
      if (
        data[index][item] &&
        typeof data[index][item].editable !== 'undefined'
      ) {
        data[index][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(index, type) {
    const { data } = this.state;
    Object.keys(data[index]).forEach(item => {
      if (
        data[index][item] &&
        typeof data[index][item].editable !== 'undefined'
      ) {
        data[index][item].editable = false;
        data[index][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[index]).forEach(item => {
        if (
          data[index][item] &&
          typeof data[index][item].editable !== 'undefined'
        ) {
          delete data[index][item].status;
        }
      });
    });
  }
  render() {
    const { data } = this.state;
    const dataSource = data.map(item => {
      const obj = {};
      Object.keys(item).forEach(key => {
        obj[key] = key === 'key' ? item[key] : item[key].value;
      });
      return obj;
    });
    const columns = this.columns;
    return (
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        expandedRowRender={record => (
          <pre>{JSON.stringify(JSON.parse(record.config), undefined, 2)}</pre>
        )}
      />
    );
  }
}

class Home extends React.Component {
  props: {
    workflows: Home_workflows,
  };

  render() {
    return (
      <div>
        <EditableTable workflows={this.props.workflows} />
      </div>
    );
  }
}

export default createFragmentContainer(
  Home,
  graphql`
    fragment Home_workflows on WorkflowConnection {
      edges {
        node {
          id
          workflowName
          workflowId
          workflowVersion
          configuration {
            configId
            config
          }
        }
      }
    }
  `,
);
