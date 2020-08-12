const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const isEmail = require('isemail');

require('dotenv').config();

//create db and server
const store = createStore();
const server = new ApolloServer({
    context: async ({ req }) => {
        // simple auth check on every request
        const auth = req.headers && req.headers.authorization || '';
        const email = Buffer.from(auth, 'base64').toString('ascii');
        if (!isEmail.validate(email)) return { user: null };
        // find a user by their email
        const users = await store.users.findOrCreate({ where: { email } });
        const user = users && users[0] || null;
        return { user: { ...user.dataValues } };
      },
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store })
  }),
  //https://studio.apollographql.com/org/originall-llc/graphs?loginAttempt=1&overlay=publish-your-schema&serviceId=apollo-graphql-demo
  engine: {    
    reportSchema: true,
    variant: "current"
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

/*
https://www.apollographql.com/docs/apollo-server/data/data-sources/#using-memcached-redis-as-a-cache-storage-backend
https://www.apollographql.com/blog/easy-and-performant-graphql-over-rest-e02796993b2b/
*/