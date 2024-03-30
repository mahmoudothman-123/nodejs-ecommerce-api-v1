const express = require("express");

const { getCategories } = require("../services/categoryServices");

const routerCategories = express.Router();

routerCategories.get("/", getCategories);

module.exports = routerCategories;
