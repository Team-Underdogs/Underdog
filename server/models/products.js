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
            required: true,
        },
        ProductCategories: {
            type: Array,
            required: true,
        },
        Store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StoreModel",
            required: true
        },
        UserId: {
            type: String,
            required: true
        }
    }
);

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;