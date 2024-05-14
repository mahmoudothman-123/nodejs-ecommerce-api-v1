const express = require("express");

const {
  getCategories,
  getCategory,
  createCategories,
  updateCategory,
  deleteCategory,
} = require("../services/categoryServices");

const routerCategories = express.Router();

routerCategories
  .route("/")
  .get(getCategories)
  .post(createCategories);
routerCategories
  .route("/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = routerCategories;
