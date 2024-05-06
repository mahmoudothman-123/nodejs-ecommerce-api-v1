const express = require("express");

const {
  getCategories,
  getCategory,
  createCategories,
} = require("../services/categoryServices");

const routerCategories = express.Router();

routerCategories.route("/").get(getCategories).post(createCategories);
routerCategories.route("/:id").get(getCategory);
module.exports = routerCategories;
