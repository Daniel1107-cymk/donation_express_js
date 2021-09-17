const Faq = require("../models/faq");
// helper
const asyncWrap = require("../helpers/async");
const responseFormat = require("../helpers/response.format");

const FaqController = {
  create: asyncWrap(async (req, res) => {
    const body = req.body;
    const faq = await Faq.create({
      title: body.title,
      description: body.description,
    });
    if (faq) {
      return res.status(200).json(responseFormat.format(faq, true));
    }
    const msg = [
      {
        msg: "Failed to create",
      },
    ];
    return res.status(400).send(responseFormat.format(msg, false));
  }),
  update: asyncWrap(async (req, res) => {
    const faq = await Faq.findById(req.params.faqId);
    if (faq) {
      const updatedFaq = Faq.findByIdAndUpdate(req.params.faqId, req.body, {
        useFindAndModify: false,
        new: true,
      });
      return res.status(200).json(responseFormat.format(updatedFaq, true));
    } else {
      msg = {
        msg: "No FAQ found",
      };
      return res.status(400).json(responseFormat.format([msg], false));
    }
  }),
  delete: asyncWrap(async (req, res) => {
    const faq = await Faq.findOne({ _id: req.params.faqId });
    let msg;
    if (faq) {
      faq.delete();
      msg = {
        msg: "Successfully delete",
      };
      return res.status(200).json(responseFormat.format([msg], true));
    }
    msg = {
      msg: "No FAQ found",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
  getAllFaq: asyncWrap(async (req, res) => {
    const faqs = await Faq.find({}, "-_id, -__v");
    if (faqs) {
      return res.status(200).json(responseFormat.format(faqs, true));
    }
  }),
};

module.exports = FaqController;
