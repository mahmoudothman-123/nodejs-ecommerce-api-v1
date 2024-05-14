const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");

//@desc    GET list of Categories
//@router  GET /api/v1/categories
//@access   public
exports.getCategories = asyncHandler(
  async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    const skip = (page - 1) * limit;
    const categories = await Category.find({})
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      results: categories.length,
      page,
      data: categories,
    });
  }
);

//@desc    Get specific category by id
//@router  GET /api/v1/categories/:id
//@access   Public
exports.getCategory = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      res.status(404).json({
        msg: `no category for this id ${id}`,
      });
    }
    res.status(200).json({ data: category });
  }
);

//@desc    create Categories
//@router  POST /api/v1/categories
//@access   Private
exports.createCategories = asyncHandler(
  async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({
      name,
      slug: slugify(name),
    });
    res.status(201).json({ data: category });
  }
);

//@desc    update specific category
//@router  PUT /api/v1/categories/:id
//@access   Private

exports.updateCategory = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category =
      await Category.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
      );
    if (!category) {
      res.status(404).json({
        msg: `no category for this id ${id}`,
      });
    }
    res.status(200).json({ data: category });
  }
);

//@desc    delete specific category
//@router   DELETE /api/v1/categories/:id
//@access   Private
exports.deleteCategory = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const category =
      await Category.findByIdAndDelete({
        _id: id,
      });
     if (!category) {
      res.status(404).json({
        msg: `Error finding or deleting the document`,
      });
    }
    res
      .status(200)
      .json({
        msg: `Document with ID ${id} deleted successfully`,
      });
  }
);
