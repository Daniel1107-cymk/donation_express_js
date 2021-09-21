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
      type: file.mimetype,
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
};

module.exports = QuoteController;
