const express = require("express");

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/api/v1/subcategories")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);
router
  .route("/api/v1/subcategories/:id")
  .get(getSubCategoryValidator, getSubCategory);
module.exports = router;
