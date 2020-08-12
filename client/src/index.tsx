//npm run codegen - generate typescript versions of queries and mutations
import {
    ApolloClient,
    InMemoryCache,
    NormalizedCacheObject,
    gql
  } from '@apollo/client';
  
  const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
  });

  // ... above is the instantiation of the client object.
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