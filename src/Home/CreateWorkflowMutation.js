/* @flow */

import React from 'react';
import styled from 'styled-components';
import { Relay, graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import environment from '';

const Container = styled.div`
  styles
`;

type Props = {
  field: CreateWorkflowMutation_field,
};

class CreateWorkflowMutation extends Relay.Mutation {
  getFatQuery() {
    return Relay.QL`
      fragment on CreateWorkflowPayload {
        clientMutationID,
        ok,
        workflow{
          workflowId,
          workflowName,
          workflowVersion,
          configId,
        }
      }
    `;
  }
}

/* export default createFragmentContainer(
  Component,
  graphql`
    fragment CreateWorkflowMutation_field on CreateWorkflowMutation {
      fragment
    }
  `,
); */

/* mutation addWorkflow($workflow: WorkflowInput){
  createWorkflow(input:{myWorkflow:$workflow}){
    workflow {
      workflowName
      workflowId
      workflowVersion
      configId
    }
  }
}
 */
