/* @flow */

import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import type { Workflow_workflow } from './__generated__/Workflow_workflow.graphql';

import s from './Workflow.css';

class Workflow extends React.Component {
  props: {
    workflow: Workflow_workflow,
  };

  render() {
    const workflow = this.props.workflow || {};
    return (
      <article className={s.root}>
        <h1>
          {workflow.workflowName} - {workflow.id}
        </h1>
        <content>
          {workflow.workflowId} {workflow.workflowVersion}{' '}
          {workflow.configuration && workflow.configuration.configId}
        </content>
      </article>
    );
  }
}

export default createFragmentContainer(
  Workflow,
  graphql`
    fragment Workflow_workflow on Workflow {
      id
      workflowName
      workflowId
      workflowVersion
      configuration {
        configId
        config
        id
      }
    }
  `,
);
