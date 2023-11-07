const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
    {
        ServiceName: {
            type: String,
            required: true,
        },
        ServiceDescription: {
            type: String,
            required: true,
        },
        ServicePrice: {
            type: Number,
            required: true,
        },
        ServiceTags: {
            type: Array,
            required: true,
        },
        ServiceCategories: {
            type: Array,
            required: true,
        },
        Store: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StoreModel",
            required: true
        }
    }
);

const ServiceModel = mongoose.model("services", ServiceSchema);
module.exports = ServiceModel;