/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

import { graphql, createFragmentContainer } from 'react-relay';

import type { Home_workflows } from './__generated__/Home_workflows.graphql';

import Link from '../Link';

import { Table, Icon } from 'antd';

const { Column, ColumnGroup } = Table;

const columns = [
  {
    title: 'Workflow Name',
    dataIndex: 'workflowName',
    key: 'workflowName',
  },
  {
    title: 'Configuration ID',
    dataIndex: 'configId',
    key: 'configId',
  },
  {
    title: 'Workflow Version',
    dataIndex: 'workflowVersion',
    key: 'workflowVersion',
  },
];

class Home extends React.Component {
  props: {
    workflows: Home_workflows,
  };

  render() {
    const workflowData = this.props.workflows.edges.map(
      ({ node: workflow }) => workflow,
    );
    console.log(workflowData);
    return (
      <div>
        <Table
          dataSource={workflowData}
          columns={columns}
          rowKey={record => record.id}
        />
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
