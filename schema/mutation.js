const Product = require("../models/Product");
const Client = require("../models/Client");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const ProductType = require("../types/ProductType");
const ClientType = require("../types/ClientType");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a client
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
    // Delete a client
    deleteClient: {
      type: ClientType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        Product.find({ clientId: args.id }).then((products) => {
          products.forEach((product) => {
            product.remove();
          });
        });

        return Client.findByIdAndRemove(args.id);
      },
    },
    // Add a product
    addProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLNonNull(GraphQLString) },
        status: {
          type: new GraphQLEnumType({
            name: "ProductStatus",
            values: {
              available: { value: "Available" },
              sold: { value: "sold" },
              outofstock: { value: "Out of stock" },
            },
          }),
          defaultValue: "Available",
        },
      },
      resolve(parent, args) {
        const product = new Product({
          name: args.name,
          description: args.description,
          status: args.status,
        });

        return product.save();
      },
    },
    // Delete a product
    deleteProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Product.findByIdAndRemove(args.id);
      },
    },
    // Update a product
    updateProduct: {
      type: ProductType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: {
          type: new GraphQLEnumType({
            name: "ProductStatusUpdate",
            values: {
              available: { value: "Available" },
              sold: { value: "sold" },
              outofstock: { value: "Out of stock" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Product.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              description: args.description,
              status: args.status,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = mutation;
