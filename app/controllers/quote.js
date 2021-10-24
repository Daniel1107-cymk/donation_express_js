const Quote = require("../models/quote");
// helper
const asyncWrap = require("../helpers/async");
const responseFormat = require("../helpers/response.format");

const QuoteController = {
  create: asyncWrap(async (req, res) => {
    const body = req.body;
    const file = req.file;
    const quote = await Quote.create({
      title: body.title,
      description: body.description,
      image: file.buffer.toString("base64"),
      mimetype: file.mimetype,
    });
    if (quote) {
      return res.status(200).json(responseFormat.format(quote, true));
    }
  }),
  getAllQuote: asyncWrap(async (req, res) => {
    const quotes = await Quote.find({}, "-_id, -__v");
    if (quotes) {
      return res.status(200).json(responseFormat.format(quotes, true));
    }
  }),
  deleteQuote: asyncWrap(async (req, res) => {
    const quote = await Quote.findById(req.params.quoteId);
    if (quote) {
      quote.delete();
      msg = {
        msg: "Successfully delete",
      };
      return res.status(200).json(responseFormat.format([msg], true));
    }
    msg = {
      msg: "No quote found",
    };
    return res.status(400).json(responseFormat.format([msg], false));
  }),
};

module.exports = QuoteController;
