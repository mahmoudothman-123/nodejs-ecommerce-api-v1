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

const subcategoriesRoute = require("./subCategoryRoute");
const router = express.Router();

router.use("/:categoryId/subcategories", subcategoriesRoute);

router
  .route("/")
  .get(getCategories)
  .post(createCategoryValidator, createCategories);
router
  .route(":id")
  .get(getCategoryValidator, getCategory)
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategory, deleteCategory);

module.exports = router;
