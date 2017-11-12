/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

import React from 'react';

import { graphql, createFragmentContainer } from 'react-relay';

import type { Home_workflows } from './__generated__/Home_workflows.graphql';

import Link from '../Link';

import { Table, Icon, Input, Popconfirm, Button } from 'antd';
import '../Workflow/Workflow.js';
import './Home.css';
import 'antd/dist/antd.css';
import CreateConfigMutation from './CreateConfigMutation';
import CreateWorkflowMutation from './CreateWorkflowMutation';
import relay from '../relay.js';
import uuid from 'uuid4';

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
    const { value, editable } = this.state;
    return (
      <div>
        {editable ? (
          <div>
            <Input value={value} onChange={e => this.handleChange(e)} />
          </div>
        ) : (
          <div className="editable-row-text">
            {value ? value.toString() : ' '}
          </div>
        )}
      </div>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const workflowData = this.props.workflows.edges.map(({ node: w }) => ({
      workflowId: { value: w.workflowId },
      workflowName: { editable: false, value: w.workflowName },
      workflowVersion: { editable: false, value: w.workflowVersion },
      config: {
        value: w.configuration ? w.configuration.config : '',
      },
      mode: {
        value: 'view',
      },
      key: w.id,
    }));
    this.state = {
      data: workflowData,
      expandedRowKeys: [],
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
    };
    this.columns = [
      {
        title: 'Workflow ID',
        dataIndex: 'workflowId',
        width: '15%',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.workflowId - b.workflowId,
        render: (text, record, index) =>
          this.renderColumns(this.state.data, record.key, 'workflowId', text),
      },
      {
        title: 'Workflow Name',
        dataIndex: 'workflowName',
        width: '15%',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) =>
          (a.workflowName === null) - (b.workflowName === null) ||
          a.workflowName.localeCompare(b.workflowName),
        render: (text, record, index) =>
          this.renderColumns(this.state.data, record.key, 'workflowName', text),
        /*        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => (this.searchInput = ele)}
              placeholder="Search name"
              value={this.state.searchText}
              onChange={this.onInputChange}
              onPressEnter={this.onSearch}
            />
            <Button type="primary" onClick={this.onSearch}>
              Search
            </Button>
          </div>
        ),
        filterIcon: (
          <Icon
            type="smile-o"
            style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }}
          />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => this.searchInput.focus(),
          );
        },*/
      },
      {
        title: 'Workflow Version',
        dataIndex: 'workflowVersion',
        width: '15%',
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) =>
          (a.workflowVersion === null) - (b.workflowVersion === null) ||
          a.workflowVersion.localeCompare(b.workflowVersion),
        render: (text, record, index) =>
          this.renderColumns(
            this.state.data,
            record.key,
            'workflowVersion',
            text,
          ),
      },
      {
        title: 'Configuration',
        dataIndex: 'config',
        width: '25%',
        render: (text, record, index) =>
          this.renderColumns(this.state.data, record.key, 'config', text),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record, index) => {
          const recordIndex = Array.indexOf(
            this.state.data.map(obj => obj.key),
            record.key,
          );
          const { editable } = this.state.data[recordIndex].workflowName;
          return (
            <div className="editable-row-operations">
              {editable ? (
                <span>
                  <a onClick={() => this.editDone(record.key, 'save')}>Save</a>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.editDone(record.key, 'cancel')}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                  <a onClick={() => this.edit(record.key)}>Edit</a>
                </span>
              )}
            </div>
          );
        },
      },
    ];
    this.pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
    };
  }
  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = () => {
    const { searchText, data } = this.state;
    const reg = new RegExp(searchText, 'gi');
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data
        .map(record => {
          const match = record.name.match(reg);
          if (!match) {
            return null;
          }
          return {
            ...record,
            name: (
              <span>
                {record.name
                  .split(reg)
                  .map(
                    (text, i) =>
                      i > 0
                        ? [<span className="highlight">{match[0]}</span>, text]
                        : text,
                  )}
              </span>
            ),
          };
        })
        .filter(record => !!record),
    });
  };
  renderColumns(data, recordKey, key, text) {
    const recordIndex = Array.indexOf(data.map(obj => obj.key), recordKey);
    const { editable, status } = data[recordIndex][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (
      <EditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(key, recordIndex, value)}
        status={status}
      />
    );
  }
  handleChange(key, recordIndex, value) {
    const { data } = this.state;
    data[recordIndex][key].value = value;
    this.setState({ data });
  }
  edit(recordKey) {
    const { data, expandedRowKeys } = this.state;
    expandedRowKeys.push(recordKey);
    this.setState({ expandedRowKeys });
    const recordIndex = Array.indexOf(data.map(obj => obj.key), recordKey);

    data[recordIndex]['mode'].value = 'edit';

    Object.keys(data[recordIndex]).forEach(item => {
      if (
        data[recordIndex][item] &&
        typeof data[recordIndex][item].editable !== 'undefined'
      ) {
        data[recordIndex][item].editable = true;
      }
    });
    this.setState({ data });
  }
  editDone(recordKey, type) {
    const { data, expandedRowKeys } = this.state;
    const recordIndex = Array.indexOf(data.map(obj => obj.key), recordKey);

    expandedRowKeys.splice(Array.indexOf(expandedRowKeys, recordKey), 1);
    this.setState({ expandedRowKeys });

    data[recordIndex]['mode'].value = 'view';

    Object.keys(data[recordIndex]).forEach(item => {
      if (
        data[recordIndex][item] &&
        typeof data[recordIndex][item].editable !== 'undefined'
      ) {
        data[recordIndex][item].editable = false;
        data[recordIndex][item].status = type;
      }
    });
    this.setState({ data }, () => {
      Object.keys(data[recordIndex]).forEach(item => {
        if (
          data[recordIndex][item] &&
          typeof data[recordIndex][item].editable !== 'undefined'
        ) {
          delete data[recordIndex][item].status;
        }
      });
    });
  }
  expandedRowRender = (record, index) => {
    return record.mode === 'edit' ? (
      <Input.TextArea
        value={record.config}
        onChange={e => this.handleConfigChange(e, record, index)}
        autosize
      />
    ) : (
      <pre>{JSON.stringify(JSON.parse(record.config), undefined, 2)}</pre>
    );
  };
  handleConfigChange = (e, record, index) => {
    const recordIndex = Array.indexOf(
      this.state.data.map(obj => obj.key),
      record.key,
    );
    const { data } = this.state;
    data[recordIndex]['config'].value = e.target.value;
    this.setState(data);
  };
  onExpandedRowsChange = rows => {
    this.setState({
      expandedRowKeys: rows,
    });
  };
  onExpand = (expanded, record) => {
    console.log('onExpand', expanded, record);
  };
  onChange(pagination, filters, sorter) {
    console.log('params', pagination, filters, sorter);
  }

  addWorkflow = configId => {
    CreateWorkflowMutation.addWorkflow(
      relay,
      'My New Workflow',
      'v1.0',
      configId,
      response => {
        console.log(response);
      },
    );
  };

  handleAdd = () => {
    CreateConfigMutation.addConfig(
      relay,
      uuid(),
      '{"newkey":"newval"}',
      response => {
        this.addWorkflow(response.createConfig.config.configId);
      },
    );
  };

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
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>
          Add
        </Button>
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          expandedRowRender={this.expandedRowRender}
          expandIconColumnIndex={3}
          expandIconAsCell={false}
          expandedRowKeys={this.state.expandedRowKeys}
          onExpand={this.onExpand}
          onChange={this.onChange}
          pagination={this.pagination}
        />
      </div>
    );
  }
}

class Home extends React.Component {
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
