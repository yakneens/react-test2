import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import storeDebugger from 'relay-runtime/lib/RelayStoreProxyDebugger';

const mutation = graphql`
  mutation CreateWorkflowMutation($myWorkflow: CreateWorkflowInput!) {
    createWorkflow(input: $myWorkflow) {
      workflow {
        workflowName
        workflowId
        workflowVersion
        configId
      }
      ok
    }
  }
`;

function addWorkflow(
  environment,
  workflowName,
  workflowVersion,
  configId,
  callback,
) {
  const variables = {
    myWorkflow: {
      myWorkflow: {
        workflowName: workflowName,
        workflowVersion: workflowVersion,
        configId: configId,
      },
    },
  };

  commitMutation(environment, {
    mutation: mutation,
    variables: variables,
    onCompleted: (response, errors) => {
      console.log(response);
      callback(response);
    },
    onError: err => console.error(err),
    updater: proxyStore => {
      storeDebugger.dump(proxyStore);
      const createWorkflowField = proxyStore.getRootField('createWorkflow');
      const newWorkflow = createWorkflowField.getLinkedRecord('workflow');

      const storeRoot = proxyStore.getRoot();
      const con = proxyStore.get('client:root:allWorkflows{"first":50}');
      const connection = ConnectionHandler.getConnection(
        storeRoot,
        'client:root:allWorkflows{"first":50}',
      );

      //require('./generateRelayClientID')(require('./RelayModernRecord').getDataID(record), storageKey, nextIndex);
      //nextRecord = require('./RelayModernRecord').create(nextID, typeName);

      if (con) {
        const newEdge = ConnectionHandler.createEdge(
          proxyStore,
          con,
          newWorkflow,
          'WorkflowEdge',
        );
        ConnectionHandler.insertEdgeAfter(con, newEdge);
      } else {
        console.log('Connection not found');
      }
      storeDebugger.dump(proxyStore);
    },
  });
}

export default { addWorkflow };
