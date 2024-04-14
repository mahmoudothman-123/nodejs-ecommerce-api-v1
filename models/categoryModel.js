const mongoose = require("mongoose");

// 1- Create schema
const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "Category must be unique"],
      minlength: [3, "Too short category name"],
      maxlength: [32, "Too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// 2- create model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
