const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategory");

// Nested route middleware
// @desc   Create subCategory by params categoryId

exports.satCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

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

// Nested route middleware
// @desc  filter by categoryId list of subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

//@desc    GET list of subCategories
//@router  GET /api/v1/subCategories
//@access   public
exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;
  console.log(req.params.categoryId);
  const subCategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  res.status(200).json({
    results: subCategories.length,
    page,
    data: subCategories,
  });
});

//@desc    Get specific subCategory by id
//@router  GET /api/v1/Subcategories/:id
//@access   Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ApiError(`No subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

//@desc    update specific category
//@router  PUT /api/v1/categories/:id
//@access   Private

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

//@desc    delete specific category
//@router   DELETE /api/v1/categories/:id
//@access   Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findByIdAndDelete({
    _id: id,
  });
  if (!subCategory) {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
  res.status(200).json({
    msg: `Document with ID ${id} deleted successfully`,
  });
});
