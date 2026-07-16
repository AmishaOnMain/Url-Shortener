const mongoose = require("mongoose");

const validator= require("validator")

const urlSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      validate: {
        validator:function(value){
          return validator.isUrl(value)
        },
        message: "Invalid URL"
      }
    },

    shortCode: {
      type: String,
      required: true,
      unique: true,
    },

    accessCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Url", urlSchema);
