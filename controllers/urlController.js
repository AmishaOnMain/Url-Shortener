const Url = require("../models/Url");

const { nanoid } = require("nanoid");

// create short url

const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;

    //check if url exists

    if (!url) {
      return res.status(400).json({
        message: "URl is required",
      });
    }

    // generate random short code

    const shortCode = nanoid(6);

    //create database entry

    const newUrl = await Url.create({
      url,
      shortCode,
    });

    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { createShortUrl };
