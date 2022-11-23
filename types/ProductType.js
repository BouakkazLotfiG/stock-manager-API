const Product = require("../models/Product");
const Client = require("../models/Client");

const { GraphQLObjectType, GraphQLID, GraphQLString } = require("graphql");

// const ClientType = require("./ClientType");

const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
  }),
});

module.exports = ProductType;
