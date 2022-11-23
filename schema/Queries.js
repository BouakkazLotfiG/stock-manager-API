const Product = require("../models/Product");
const Client = require("../models/Client");

const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");

const ProductType = require("../types/ProductType");
const ClientType = require("../types/ClientType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //products
    products: {
      type: new GraphQLList(ProductType),
      resolve(parent, args) {
        return Product.find();
      },
    },
    product: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Product.findById(args.id);
      },
    },

    //clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = RootQuery;
