const mongoose = require("mongoose");
const Category = require("../models/category");
// helper
const asyncWrap = require("../helpers/async");
const responseFormat = require("../helpers/response.format");

const CategoryController = {
  create: asyncWrap(async (req, res) => {
    const body = req.body;
    const category = await Category.create({
      name: body.name,
      priority: body.priority,
      description: body.description,
    });
    let msg;
    if (category) {
      msg = {
        msg: "Category successfully created",
      };
      return res.status(200).json(responseFormat.format([msg], true));
    } else {
      msg = {
        msg: "Failed to create category",
      };
      return res.status(500).json(responseFormat.format([msg], false));
    }
  }),
  update: asyncWrap(async (req, res) => {
    let msg;
    if (mongoose.Types.ObjectId.isValid(req.params.categoryId)) {
      const body = req.body;
      const category = await Category.findById(req.params.categoryId);
      if (category) {
        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.categoryId,
          {
            name: body.name,
            priority: body.priority,
            description: body.description,
          },
          { useFindAndModify: false, new: true }
        );
        if (updatedCategory) {
          msg = {
            msg: "Category successfully updated",
          };
          return res.status(200).json(responseFormat.format([msg], true));
        }
      }
      msg = {
        msg: "No category found",
      };
      return res.status(400).json(responseFormat.format([msg], false));
      return res.status(400).json(responseFormat.format([msg], false));
    }
    msg = {
      msg: "Invalid category id",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
  getAllCategory: asyncWrap(async (req, res) => {
    const category = await Category.find({}, "name priority description");
    if (category) {
      return res.status(200).json(responseFormat.format(category, true));
    } else {
      msg = {
        msg: "Failed to retrieve category",
      };
      return res.status(500).json(responseFormat.format([msg], false));
    }
  }),
  delete: asyncWrap(async (req, res) => {
    let msg;
    if (mongoose.Types.ObjectId.isValid(req.params.categoryId)) {
      const category = await Category.findById(req.params.categoryId);
      if (category) {
        category.delete();
        msg = {
          msg: "Successfully delete",
        };
        return res.status(200).json(responseFormat.format([msg], true));
      }
      msg = {
        msg: "No category found",
      };
      return res.status(400).json(responseFormat.format([msg], false));
    }
    msg = {
      msg: "Invalid category id",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
};

module.exports = CategoryController;
