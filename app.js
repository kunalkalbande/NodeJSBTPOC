require('dotenv').config();
var express = require('express');
var { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const bodyParser = require('body-parser');

var jwt = require('express-jwt').expressjwt;
var jwks = require('jwks-rsa');

const mongoose = require('mongoose');
const mongoString = process.env.MONGO_DB_URL
//console.log(mongoString);
mongoose.connect(mongoString);
const database = mongoose.connection

const schema = require('./graphql/schema/index')
const resolvers = require('./graphql/resolvers/index')

database.on('error', (error) => {
   // console.log(error)
})

database.once('connected', () => {
   // console.log('Database Connected');
})

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-a5viyr1pf4iwkc3f.us.auth0.com/.well-known/jwks.json'
}),
//credentialsRequired: false,
audience: 'http://localhost:4000/api',
issuer: 'https://dev-a5viyr1pf4iwkc3f.us.auth0.com/',
algorithms: ['RS256']
});

var app = express();
app.use(cors());
//app.use(jwtCheck);
app.use(bodyParser.json());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.use('/api',jwtCheck, graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(4000);
//console.log('Running a GraphQL API server at http://localhost:4000/graphql');