const { gql } = require('apollo-server');
//const Mutation = require("./schema/mutations");
// ! list with zero element considered null here? - the array cannot be null, but it can be empty

const typeDefs = gql`
  
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }
  
  type User {
    id: ID!
    email: String!
    trips: [Launch]!
  }
  
  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }
  
  enum PatchSize {
    SMALL
    LARGE
  }

  type Query {
    launches: [Launch]!
    launch(id: ID!): Launch
    me: User
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!
    cancelTrip(launchId: ID!): TripUpdateResponse!
    login(email: String): String # login token
  }

`;

module.exports = typeDefs;

