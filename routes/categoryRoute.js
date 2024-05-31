const express = require("express");
const {
  getCategoryValidator,
  createCategoryValidator,
  updateCategoryValidator,
} = require("../utils/validators/categoryValidator");
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
  .post(createCategoryValidator, createCategories);
routerCategories
  .route("/api/v1/categories/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategory, deleteCategory);

module.exports = routerCategories;
