const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
    {
        BusinessName: {
            type: String,
            required: true,
        },
        BusinessDescription: {
            type: String,
            required: true,
        },
        BusinessTags: {
            type: Array,
            required: false,
        },
        ProductList: {
            type: Array,
            required: false,
        }
    }
);

const StoreModel = mongoose.model("stores", StoreSchema);
module.exports = StoreModel;