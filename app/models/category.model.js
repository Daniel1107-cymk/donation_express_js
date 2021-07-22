const mongoose = require("mongoose");
const responseFormat = require("../helpers/response.format");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

const Category = mongoose.model("categories", categorySchema);

let CategoryModel = {
  create: (categoryData, result) => {
    const category = new User({
      name: categoryData.name,
      description: categoryData.description,
    });
    category
      .save()
      .then((createdCategory) => {
        result(null, responseFormat.format(createdCategory, true));
      })
      .catch((err) => {
        result(responseFormat.format(err, false), null);
      });
  },
  updateCategory: (categoryData, result) => {
    Category.findByIdAndUpdate(categoryData.id, categoryData, { new: true })
      .then((updatedCategory) => {
        return result(null, responseFormat(updatedCategory, true));
      })
      .catch((err) => {
        return result(responseFormat.format(err, false), null);
      });
  },
  selectById: (categoryId, result) => {
    Category.findById(categoryId, (err, category) => {
      if (err) return result(responseFormat.format(err, false), null);

      return result(null, responseFormat.format(category, true));
    });
  },
  selectAll: (result) => {
    Category.find({}, (err, category) => {
      if (err) return result(responseFormat.format(err, false), null);

      return result(null, responseFormat.format(category, true));
    });
  },
};

module.exports = CategoryModel;
