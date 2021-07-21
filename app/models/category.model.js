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

Category.create = (data, result) => {
  const category = new User({
    name: data.name,
    description: data.description,
  });

  category
    .save()
    .then((createdCategory) => {
      result(null, responseFormat.format(createdCategory, true));
    })
    .catch((err) => {
      result(responseFormat.format(err, false), null);
    });
};

Category.updateCategory = (categoryData, result) => {
  Category.findByIdAndUpdate(categoryData.id, categoryData, { new: true })
    .then((updatedCategory) => {
      return result(null, responseFormat(updatedCategory, true));
    })
    .catch((err) => {
      return result(responseFormat.format(err, false), null);
    });
};

Category.selectById = (categoryId, result) => {
  Category.findById(categoryId, (err, category) => {
    if (err) return result(responseFormat.format(err, false), null);

    return result(null, responseFormat.format(category, true));
  });
};

Category.selectAll = (result) => {
  Category.find({}, (err, category) => {
    if (err) return result(responseFormat.format(err, false), null);

    return result(null, responseFormat.format(category, true));
  });
};
