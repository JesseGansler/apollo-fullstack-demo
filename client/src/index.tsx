import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './pages';
import injectStyles from './styles';
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    ApolloProvider,
    gql
    } from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
});
//npm run codegen - generate typescript versions of queries and mutations
//https://www.apollographql.com/docs/tutorial/queries/
//https://flaviocopes.com/apollo/


// previous variable declarations

injectStyles();
ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById('root')
);

/*TEST ... above is the instantiation of the client object.
client
.query({
  query: gql`
    query GetLaunch {
      launch(id: 56) {
        id
        mission {
          name
        }
      }
    }
  `
})
.then(result => console.log(result));
*/