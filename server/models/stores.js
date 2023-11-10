const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
    {
        BusinessName: {
            type: String,
            required: true,
        },
        Address: {
            type: String,
            required: true,
        },
        Suburb: {
            type: String,
            required: true,
        },
        City: {
            type: String,
            required: true,
        },
        Email: {
            type: String,
            required: true,
        },
        Phone: {
            type: String,
            required: true,
        },
        BusinessDescription: {
            type: String,
            required: true,
        },
        BusinessTags: {
            type: Array,
            required: true,
        },
        BusinessCategories: {
            type: Array,
            required: true,
        },
        LinkWebsite: {
            type: String,
            required: false,
        },
        LinkFB: {
            type: String,
            required: false,
        },
        LinkTwitter: {
            type: String,
            required: false,
        },
        LinkInstagram: {
            type: String,
            required: false,
        },
        UserId: {
            type: String,
            required: true
        }
    }
);

const StoreModel = mongoose.model("stores", StoreSchema);
module.exports = StoreModel;