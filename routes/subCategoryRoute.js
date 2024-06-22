const express = require("express");

const { createSubCategory } = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/api/v1/subcategories")
  .post(createSubCategoryValidator, createSubCategory);

module.exports = router;
