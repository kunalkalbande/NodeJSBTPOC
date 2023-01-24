require('dotenv').config();
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoString = process.env.MONGO_DB_URL
console.log(mongoString);
mongoose.connect(mongoString);
const database = mongoose.connection

const schema = require('./graphql/schema/index')
const resolvers = require('./graphql/resolvers/index')

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');