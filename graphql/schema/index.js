var { buildSchema } = require('graphql');

 module.exports = buildSchema(`
type User {
    _id: ID,
    name: String!,
    email: String!,
    password: String!
   }
   input UserInput {
    name: String!,
    email: String!,
    password: String!
   }
  type RootQuery{
      users: [User!]!
      getUser(id: Int!): User!
  }
  type RootMutation{
    createUser(userInput: UserInput): User
    editUser(userInput: UserInput): User
    deleteUser(name: String!): User
  }
  schema{
    query: RootQuery
    mutation: RootMutation
  }
`);
