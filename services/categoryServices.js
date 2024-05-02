const CategoryModel = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//@desc    GET list of Categories
//@router  GET /api/v1/categories
//@access   public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

//@desc    Get spacific category by id
//@router  GET /api/v1/categories/:id 
//@access   Public
exports.getCategory = asyncHandler(async(req,res)=>{
  const = req. 
})


//@desc    create Categories
//@router  POST /api/v1/categories
//@access   Private
exports.createCategories = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
