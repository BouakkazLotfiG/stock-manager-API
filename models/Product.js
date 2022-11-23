const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Available", "Sold", "Out of stock"],
  },
  // clientId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Client",
  // },
});

module.exports = mongoose.model("Project", ProductSchema);
