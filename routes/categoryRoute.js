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
  .route("/api/v1/categories")
  .get(getCategories)
  .post(createCategories);
routerCategories
  .route("/api/v1/categories/:id")
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = routerCategories;
