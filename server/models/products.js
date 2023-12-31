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
            ref: "stores",
            required: true
        },
        UserId: {
            type: String,
            required: true
        },
        stripeProduct: {
            type: Object,
            required: true
        },
        stripePrice: {
            type: Object,
            required: true
        },
        ProductImage: {
            type: String,
            required: true
        }
    }
);

const ProductModel = mongoose.model("products", ProductSchema);
module.exports = ProductModel;