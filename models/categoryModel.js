const mongoose = require("mongoose");

// 1- Create schema
const CategorySchema = new mongoose.Schema({
  name: String,
});

// 2- create model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
