import { graphql, commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

const mutation = graphql`
  mutation CreateConfigMutation($myConfig: CreateConfigurationInput!) {
    createConfig(input: $myConfig) {
      config {
        configId
        config
      }
      ok
    }
  }
`;

function addConfig(environment, configId, config, callback) {
  const variables = {
    myConfig: {
      myConfig: {
        configId: configId,
        config: config,
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
  });
}

export default { addConfig };
