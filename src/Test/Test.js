/* eslint-disable no-console,func-names,react/no-multi-comp */
/* import React from 'react';
import ReactDOM from 'react-dom';
import Table from 'rc-table';
import 'rc-table/assets/index.css';

const tableData = [
  { key: 0, a: '123' },
  { key: 1, a: 'cdd', b: 'edd' },
  { key: 2, a: '1333', c: 'eee', d: 2 },
];

class Demo extends React.Component {
  state = {
    data: tableData,
    expandedRowKeys: [],
    expandIconAsCell: true,
    expandRowByClick: false,
  };

  onExpand = (expanded, record) => {
    console.log('onExpand', expanded, record);
  };

  onExpandedRowsChange = rows => {
    this.setState({
      expandedRowKeys: rows,
    });
  };

  onExpandIconAsCellChange = e => {
    this.setState({
      expandIconAsCell: e.target.checked,
    });
  };

  onExpandRowByClickChange = e => {
    this.setState({
      expandRowByClick: e.target.checked,
    });
  };

  columns = [
    { title: 'title 1', dataIndex: 'a', key: 'a', width: 100 },
    { title: 'title 2', dataIndex: 'b', key: 'b', width: 100 },
    { title: 'title 3', dataIndex: 'c', key: 'c', width: 200 },
    { title: 'Operation', dataIndex: '', key: 'x', render: this.renderAction },
  ];

  toggleButton() {
    if (this.state.expandedRowKeys.length) {
      const closeAll = () => this.setState({ expandedRowKeys: [] });
      return <button onClick={closeAll}>Close All</button>;
    }
    const openAll = () => this.setState({ expandedRowKeys: [0, 1, 2] });
    return <button onClick={openAll}>Expand All</button>;
  }

  remove(index) {
    const data = this.state.data;
    data.splice(index, 1);
    this.setState({ data });
  }

  expandedRowRender(record) {
    // console.log(record);
    return <p>extra: {record.a}</p>;
  }

  renderAction(o, row, index) {
    return (
      <a href="#" onClick={() => this.remove(index)}>
        Delete
      </a>
    );
  }

  render() {
    const {
      expandIconAsCell,
      expandRowByClick,
      expandedRowKeys,
      data,
    } = this.state;
    return (
      <div>
        {this.toggleButton()}
        <span style={{ display: 'inline-block', width: 20 }} />
        <input
          type="checkbox"
          checked={expandIconAsCell}
          onChange={this.onExpandIconAsCellChange}
        />
        expandIconAsCell
        <span style={{ display: 'inline-block', width: 20 }} />
        <input
          type="checkbox"
          checked={expandRowByClick}
          onChange={this.onExpandRowByClickChange}
        />
        expandRowByClick
        <Table
          columns={this.columns}
          expandIconAsCell={expandIconAsCell}
          expandRowByClick={expandRowByClick}
          expandedRowRender={this.expandedRowRender}
          expandedRowKeys={expandedRowKeys}
          onExpandedRowsChange={this.onExpandedRowsChange}
          onExpand={this.onExpand}
          data={data}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <h2>expandedRowRender</h2>
    <Demo />
  </div>,
  document.getElementById('root'),
);
 */
/* import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Input, Button, Icon } from 'antd';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

class Test extends React.Component {
  state = {
    filterDropdownVisible: false,
    data,
    searchText: '',
    filtered: false,
  };
  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = () => {
    const { searchText } = this.state;
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
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filterDropdown: (
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
        },
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        onFilter: (value, record) => record.address.indexOf(value) === 0,
      },
    ];
    return <Table columns={columns} dataSource={this.state.data} />;
  }
}

ReactDOM.render(<Test />, document.getElementById('root')); */
/* .custom-filter-dropdown {
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
}

.custom-filter-dropdown input {
  width: 130px;
  margin-right: 8px;
}

.highlight {
  color: #f50;
}
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Input, Popconfirm, Button, Icon } from 'antd';

import 'antd/dist/antd.css';

const workflows = [];
for (var i = 0; i < 10; i++) {
  const istr = i.toString();
  workflows.push({
    key: istr,
    workflowId: {
      value: i,
    },
    workflowName: {
      value: 'Workflow ' + istr,
      editable: false,
    },
    workflowVersion: {
      value: 'v1.0',
      editable: false,
    },
    config: {
      value: '{"prop1":"val1","prop2":"val2","prop3":"val4"}',
      textarea: true,
    },
    mode: {
      value: 'view',
    },
  });
}

class EditableCell2 extends React.Component {
  state = {
    value: this.props.value,
    editable: this.props.editable || false,
    textarea: this.props.textarea || false,
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

class EditableTable2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.workflows,
      expandedRowKeys: [],
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
    };
  }
  renderColumns(data, recordKey, key, text) {
    const recordIndex = Array.indexOf(data.map(obj => obj.key), recordKey);
    const { editable, status, textarea } = data[recordIndex][key];
    if (typeof editable === 'undefined') {
      return text;
    }
    return (
      <EditableCell2
        editable={editable}
        value={text}
        textarea={textarea}
        onChange={value => this.handleChange(key, recordIndex, value)}
        status={status}
      />
    );
  }
  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = () => {
    const { searchText, data } = this.state;
    const reg = new RegExp(searchText, 'gi');
    data.map(record => {
      const match = record.workflowName.value.match(reg);
      if (!match) {
        return null;
      }
      record.workflowName.value = (
        <span>
          {record.workflowName.value
            .split(reg)
            .map(
              (text, i) =>
                i > 0
                  ? [<span className="highlight">{match[0]}</span>, text]
                  : text,
            )}
        </span>
      );
    });
    this.setState({
      filterDropdownVisible: false,
      filtered: !!searchText,
      data: data.filter(record => !!record),
    });
  };
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
    console.log('a');
    return record.mode === 'edit' ? (
      <Input.TextArea
        value={record.config}
        onChange={e => this.handleConfigChange(e, record, index)}
        autosize
      />
    ) : (
      /*
      <EditableCell2
        editable={true}
        value={record.config}
        textarea={true}
        onChange={value => this.handleChange(record.key, recordIndex, value)}
        status={record.status}
      />*/
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
    console.log(e);
  };
  onExpandedRowsChange = rows => {
    this.setState({
      expandedRowKeys: rows,
    });
  };
  onExpand = (expanded, record) => {
    console.log('onExpand', expanded, record);
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

    const columns = [
      {
        title: 'Workflow ID',
        dataIndex: 'workflowId',
        key: 'workflowId',
        width: '15%',
        render: (text, record, index) =>
          this.renderColumns(this.state.data, record.key, 'workflowId', text),
      },
      {
        title: 'Workflow Name',
        dataIndex: 'workflowName',
        key: 'workflowName',
        width: '15%',
        onFilter: (value, record) =>
          record.workflowName.value.indexOf(value) === 0,
        render: (text, record, index) =>
          this.renderColumns(this.state.data, record.key, 'workflowName', text),
        filterDropdown: (
          <div className="custom-filter-dropdown">
            <Input
              ref={ele => {
                this.searchInput = ele;
                return this.searchInput;
              }}
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
            type="search"
            style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }}
          />
        ),
        filterDropdownVisible: this.state.filterDropdownVisible,
        onFilterDropdownVisibleChange: visible => {
          this.setState(
            {
              filterDropdownVisible: visible,
            },
            () => {
              this.searchInput.focus();
            },
          );
        },
      },
      {
        title: 'Workflow Version',
        dataIndex: 'workflowVersion',
        key: 'workflowVersion',
        width: '15%',
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
        key: 'config',
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
    return (
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        expandedRowRender={this.expandedRowRender}
        onExpandedRowsChange={this.onExpandedRowsChange}
        expandIconColumnIndex={3}
        expandIconAsCell={false}
        expandedRowKeys={this.state.expandedRowKeys}
        onExpand={this.onExpand}
      />
    );
  }
}

class Test extends React.Component {
  render() {
    return (
      <div>
        <EditableTable2 workflows={this.props.workflows} />
      </div>
    );
  }
}

ReactDOM.render(
  <Test workflows={workflows} />,
  document.getElementById('root'),
);
