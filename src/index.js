/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

const { Environment, Network, RecordSource, Store } = require('relay-runtime');

const source = new RecordSource();
const store = new Store(source);

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(operation, variables, cacheConfig, uploadables) {
  return fetch('http://localhost:5000/graphql', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      console.error(responseData);
      return responseData;
    })
    .catch(error => {
      console.error(error);
    });
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery);
const handlerProvider = null;

const environment = new Environment({
  handlerProvider, // Can omit.
  network,
  store,
});

const { QueryRenderer, graphql } = require('react-relay'); // or require('react-relay/compat') for compatibility

// Render this somewhere with React:
ReactDOM.render(
  <QueryRenderer
    environment={environment}
    query={graphql`
      query srcQuery {
        node(id: "V29ya2Zsb3c6NDA=") {
          id
          ... on Workflow {
            workflowName
          }
        }
      }
    `}
    variables={{}}
    render={({ error, props }) => {
      if (error) {
        return <div>{error.message}</div>;
      } else if (props) {
        return <div>{props.node.workflowName} is great!</div>;
      }
      return <div>Loading</div>;
    }}
  />,
  document.getElementById('root'),
);
registerServiceWorker();
