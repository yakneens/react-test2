/* @flow */

import React from 'react';
import styled from 'styled-components';
import { graphql, createFragmentContainer } from 'react-relay';

import type { Workflows_workflows } from './__generated__/Workflows_workflows.graphql';

import Link from '../Link';

const WorkflowList = styled.ul`padding: 0;`;

const Workflow = styled.li`
  padding-bottom: 0.5em;
  list-style: none;
`;

class Workflows extends React.Component {
  props: {
    workflows: Workflows_workflows,
  };

  render() {
    return (
      <div>
        <h2>Welcome to Workflow List</h2>
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
  Workflows,
  graphql`
    fragment Workflows_workflows on WorkflowConnection {
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
