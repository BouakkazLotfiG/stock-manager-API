const express = require("express");
const schema = require("./schema/schema");
const connectDB = require("./config/db");
const { graphqlHTTP } = require("express-graphql");

require("dotenv").config();

const app = express();

//connect to db
connectDB();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "developement",
  })
);

app.listen(5000, console.log("server running"));
