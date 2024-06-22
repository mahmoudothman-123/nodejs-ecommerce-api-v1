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

const router = express.Router();

router
  .route("/api/v1/categories")
  .get(getCategories)
  .post(createCategoryValidator, createCategories);
router
  .route("/api/v1/categories/:id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategory, deleteCategory);

module.exports = router;
