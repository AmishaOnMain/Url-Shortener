const Url = require("../models/Url");
const { nanoid } = require("nanoid");


// ==============================
// CREATE SHORT URL
// ==============================

const createShortUrl = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url || url.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid URL",
            });
        }

        // Check if URL already exists
        const existingUrl = await Url.findOne({ url });

        if (existingUrl) {
            return res.status(200).json({
                success: true,
                data: existingUrl,
            });
        }

        let shortCode;
        let exists = true;

        // Ensure uniqueness
        while (exists) {
            shortCode = nanoid(6);
            exists = await Url.findOne({ shortCode });
        }

        const newUrl = await Url.create({
            url,
            shortCode,
        });

        res.status(201).json({
            success: true,
            data: newUrl,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ==============================
// GET ORIGINAL URL
// ==============================

const getOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        }

        url.accessCount += 1;

        await url.save();

        res.status(200).json({
            success: true,
            data: url,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ==============================
// UPDATE URL
// ==============================

const updateShortUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;
        const { url } = req.body;

        if (!url || url.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid URL",
            });
        }

        const updatedUrl = await Url.findOneAndUpdate(
            { shortCode },
            { url },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedUrl) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        }

        res.status(200).json({
            success: true,
            data: updatedUrl,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ==============================
// DELETE URL
// ==============================

const deleteShortUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const deletedUrl = await Url.findOneAndDelete({
            shortCode,
        });

        if (!deletedUrl) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ==============================
// URL STATS
// ==============================

const getUrlStats = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        }

        res.status(200).json({
            success: true,
            data: {
                id: url._id,
                url: url.url,
                shortCode: url.shortCode,
                accessCount: url.accessCount,
                createdAt: url.createdAt,
                updatedAt: url.updatedAt,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// ==============================
// REDIRECT
// ==============================

const redirectToOriginalUrl = async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                success: false,
                message: "Short URL not found",
            });
        }

        url.accessCount += 1;

        await url.save();

        res.redirect(url.url);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createShortUrl,
    getOriginalUrl,
    updateShortUrl,
    deleteShortUrl,
    getUrlStats,
    redirectToOriginalUrl,
};