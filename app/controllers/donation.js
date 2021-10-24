const Donation = require("../models/donation");
const Community = require("../models/community");
const DonationDetail = require("../models/donation.detail");
const DonationImage = require("../models/donation.image");
const User = require("../models/user");
// helper
const asyncWrap = require("../helpers/async");
const responseFormat = require("../helpers/response.format");

const DonationController = {
  create: asyncWrap(async (req, res) => {
    const body = JSON.parse(JSON.stringify(req.body));
    const files = req.files;
    const currentUserEmail = req.user.email;
    const userId = await User.findOne({ email: currentUserEmail }, "_id");
    const community = await Community.findById(body.community);
    let totalQuantity = 0;
    let totalWeight = 0;
    let donationDetails = [];
    let donationImages = [];

    if (files.images === undefined) {
      let msg = [
        {
          msg: "Donation image is required",
          location: "body",
        },
      ];
      return res.status(422).json(responseFormat.format(msg, false));
    } else if (!community) {
      let msg = [
        {
          msg: "Invalid community id",
          location: "body",
        },
      ];
      return res.status(422).json(responseFormat.format(msg, false));
    }

    const donation_details = body.donation_details;
    for (let i = 0; i < donation_details.length; i++) {
      let details = JSON.parse(donation_details[i]);
      donationDetails.push({
        product_name: details.product_name,
        quantity: details.quantity,
        weight: details.weight,
      });
      totalQuantity += details.quantity;
      totalWeight += details.weight;
    }

    const donation_images = files.images;
    for (let i = 0; i < donation_images.length; i++) {
      donationImages.push({
        image: donation_images[i].buffer.toString("base64"),
        mimetype: donation_images[i].mimetype,
      });
    }

    const donation = await Donation.create({
      user: userId,
      community: body.community,
      address: body.address,
      recipient_name: body.recipient_name,
      phone_number: body.phone_number,
      category: body.category,
      total_quantity: totalQuantity,
      total_weight: totalWeight,
      pickup_date: Date.now(),
    });

    if (donation) {
      community.donations.push(donation);
      await community.save();

      for (let i = 0; i < donationDetails.length; i++) {
        const donationDetail = await DonationDetail.create({
          ...donationDetails[i],
          donation: donation.id,
        });
        if (donationDetail) {
          donation.donation_details.push(donationDetail);
          await donation.save();
        } else {
          let msg = [
            {
              msg: "Couldn't create donation details",
              location: "body",
            },
          ];
          return res.status(500).json(responseFormat.format(msg, false));
        }
      }

      for (let i = 0; i < donationImages.length; i++) {
        const donationImage = await DonationImage.create({
          ...donationImages[i],
          donation: donation.id,
        });
        if (donationImage) {
          donation.donation_images.push(donationImage);
          await donation.save();
        } else {
          let msg = [
            {
              msg: "Couldn't create donation image",
              location: "body",
            },
          ];
          return res.status(500).json(responseFormat.format(msg, false));
        }
      }
    } else {
      let msg = [
        {
          msg: "Couldn't create donation",
          location: "body",
        },
      ];
      return res.status(500).json(responseFormat.format(msg, false));
    }

    const msg = [
      {
        msg: "Donation successfully created",
      },
    ];

    return res.status(200).json(responseFormat.format(msg, true));
  }),
};

module.exports = DonationController;
