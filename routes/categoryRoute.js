const express = require("express");

const {
  getCategories,
  createCategories,
} = require("../services/categoryServices");

const routerCategories = express.Router();

routerCategories.route("/").get(getCategories).post(createCategories);

module.exports = routerCategories;
