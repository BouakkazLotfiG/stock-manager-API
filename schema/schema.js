const { GraphQLSchema } = require("graphql");

const RootQuery = require("./Queries");
const mutation = require("./mutation");

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
