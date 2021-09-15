const Faq = require("../models/faq");
// helper
const responseFormat = require("../helpers/response.format");

const FaqController = {
  create: async (req, res) => {
    const body = req.body;
    try {
      const faq = await Faq.create({
        title: body.title,
        description: body.description,
      });

      return res.status(200).json(responseFormat.format(faq, true));
    } catch (err) {
      return res
        .status(422)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  update: async (req, res) => {
    try {
      const faq = await Faq.findByIdAndUpdate(req.params.faqId, req.body, {
        new: true,
      });

      return res.status(200).json(responseFormat.format(faq, true));
    } catch (err) {
      return res
        .status(422)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  delete: async (req, res) => {
    try {
      const faq = await Faq.deleteOne({ _id: req.params.faqId });
      const msg = [
        {
          msg: "Successfully delete",
        },
      ];
      return res.status(200).json(responseFormat.format(msg, true));
    } catch (err) {
      return res
        .status(400)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
  getAllFaq: async (req, res) => {
    User.find({}, "-_id, -__v", (err, faqs) => {
      if (err) return res.status(400).json(responseFormat.format(err, false));

      return res.status(200).json(responseFormat.format(faqs));
    });
  },
};

module.exports = FaqController;
