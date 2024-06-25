const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategory");

//@desc    create  subCategory
//@router  POST /api/v1/subcategories
//@access   Private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});

//@desc    GET list of subCategories
//@router  GET /api/v1/subCategories
//@access   public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;
  const subcategories = await SubCategory.find({}).skip(skip).limit(limit);
  res.status(200).json({
    results: subcategories.length,
    page,
    data: subcategories,
  });
});

//@desc    Get specific subCategory by id
//@router  GET /api/v1/Subcategories/:id
//@access   Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await SubCategory.findById(id);
  if (!subcategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});
