const Donation = require("../models/donation");
const DonationDetail = require("../models/donation.detail");
const DonationImage = require("../models/donation.image");
const User = require("../models/user");
// helper
const responseFormat = require("../helpers/response.format");

const DonationController = {
  create: async (req, res) => {
    try {
      const body = req.body;
      console.log(body);
      const files = req.files;
      const currentUserEmail = req.user.email;
      const userId = await User.findOne({ email: currentUserEmail }, "_id");
      let totalQuantity = 0;
      let totalWeight = 0;
      let donationDetails = [];
      let donationImages = [];

      const donation_details = body.donation_details;
      for (let i = 0; i < donation_details.length; i++) {
        donationDetails.push({
          product_name: donation_details[i].product_name,
          quantity: donation_details[i].quantity,
          weight: donation_details[i].weight,
        });
        totalQuantity += donation_details[i].quantity;
        totalWeight += donation_details[i].weight;
      }

      const donation_images = files.images;
      for (let i = 0; i < donation_images.length; i++) {
        donationImages.push({
          fileName: donation_images[i].originalName,
          image: donation_images[i].buffer,
        });
      }

      const donation = await Donation.create({
        user: userId,
        total_quantity: totalQuantity,
        total_weight: totalWeight,
        pickup_date: Date.now(),
      });

      for (let i = 0; i < donationDetails.length; i++) {
        const donationDetail = await DonationDetail.create({
          ...donationDetails,
          donation: donation.id,
        });
        donation.donation_details.push(donationDetail);
        await donation.save();
      }

      for (let i = 0; i < donationImages.length; i++) {
        const donationImage = await DonationImage.create({
          ...donationImages,
          donation: donation.id,
        });
        donation.donation_images.push(donationImage);
        await donation.save();
      }

      const msg = [
        {
          msg: "Donation successfully created",
        },
      ];

      return res.status(200).json(responseFormat.format(msg, true));
    } catch (err) {
      return res
        .status(500)
        .json(responseFormat.format(err?.errors ?? err, false));
    }
  },
};

module.exports = DonationController;
