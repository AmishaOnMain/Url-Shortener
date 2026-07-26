const mongoose = require("mongoose");
const validator = require("validator");

const urlSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: [true, "URL is required"],
            trim: true,
            validate: {
                validator: function (value) {
                    return validator.isURL(value, {
                        require_protocol: true,
                    });
                },
                message: "Please provide a valid URL",
            },
        },

        shortCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        accessCount: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Url", urlSchema);