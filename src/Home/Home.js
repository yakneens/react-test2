/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import { graphql, createFragmentContainer } from 'react-relay';

import type { Home_workflows } from './__generated__/Home_workflows.graphql';

import Link from '../Link';

const WorkflowList = styled.ul`padding: 0;`;

const Workflow = styled.li`
  padding-bottom: 0.5em;
  list-style: none;
`;

class Home extends React.Component {
  props: {
    workflows: Home_workflows,
  };

  render() {
    return (
      <div>
        <h2>Welcome to React Static Boilerplate</h2>
        <p>
          Below is the list of "stories" fetched from{' '}
          <a href="https://graphql-demo.kriasoft.com/">
            graphql-demo.kriasoft.com
          </a>{' '}
          as an example:
        </p>
        <WorkflowList>
          {this.props.workflows &&
            this.props.workflows.edges.map(({ node: workflow }) => (
              <Workflow key={workflow.id}>
                <Link href={`/workflow-${workflow.id}`}>
                  {workflow.workflowName}
                </Link>
              </Workflow>
            ))}
        </WorkflowList>
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
        }
      }
    }
  `,
);
