const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        ProductName: {
            type: String,
            required: true,
        },
        ProductDescription: {
            type: String,
            required: true,
        },
        ProductPrice: {
            type: Number,
            required: true,
        },
        ProductTags: {
            type: Array,
            required: false,
        },
        Store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StoreModel",
            required: true
        }
    }
);

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;