// env
const apiPrefix = process.env.API_PREFIX;
// middleware
const auth = require("../middleware/auth");
// controller
const Faq = require("../controllers/faq");
// helper
const validate = require("../validator/faq");

module.exports = (app) => {
  // get all faq
  app.get(`${apiPrefix}/faq`, Faq.getAllFaq);
  // create
  app.post(`${apiPrefix}/faq`, auth, validate.faqData, Faq.create);
  // update
  app.put(`${apiPrefix}/faq/:faqId`, auth, validate.faqData, Faq.update);
  // delete
  app.delete(`${apiPrefix}/faq/:faqId`, auth, Faq.delete);
};
