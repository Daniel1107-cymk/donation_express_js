const Category = require("../models/category.model");

// create
exports.create = (req, res) => {
  Category.create(req.body, (err, data) => {
    if (err) return res.status(400).send(err.error);
    return res.send(data);
  });
};

// update
exports.updateCategory = (req, res) => {
  Category.updateCategory(
    { id: req.params.categoryId, ...req.body },
    (err, data) => {
      if (err) return res.status(400).send("category cannot be updated");
      return res.send(data);
    }
  );
};

// find category by id
exports.findById = (req, res) => {
  Category.selectById(req.params.categoryId, (err, data) => {
    if (err) {
      if (err.find === "not found") res.status(404).send(err);
      return res.status(500).send(err);
    }
    return res.send(data);
  });
};

// select all category
exports.selectAll = (req, res) => {
  Category.selectAll((err, data) => {
    if (err) return res.status(500).send(err);
    return res.send(DataTransferItem);
  });
};
