const express = require("express");
const router = express.Router();
const checkJwt = require("../utils/auth");
const ServiceModel = require("../models/services");
const StoreModel = require("../models/stores");

// Get all services = will be called in /getAllProducts

// Get all services by store
router.get("/getServicesByStore/:storeId", async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const services = await ServiceModel.find({Store: storeId});
        return res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Get service by id
router.get("/getService/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const service = await ServiceModel.findById(id);
        if (!service) {
            return res.status(404).json({message: "Service not found"});
        }
        res.status(200).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Create new service
router.post("/createService", async (req, res) => {
    try {
        const {
            ServiceName,
            ServiceDescription,
            ServicePrice,
            ServiceTags,
            ServiceCategories,
            StoreId
        } = req.body;
        const AssociatedStore = await StoreModel.findById(StoreId);

        if (!AssociatedStore) {
            return res.status(404).json({message: "Store not found"});
        }

        const service = new ServiceModel({
            ServiceName,
            ServiceDescription,
            ServicePrice,
            ServiceTags,
            ServiceCategories,
            Store: AssociatedStore
        })
        await service.save();

        return res.status(201).json(service);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
});

// Update service by id
router.put("/updateService/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const service = await ServiceModel.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!service) {
            return res.status(404).json({message: "Service not found"});
        }
        res.status(200).json(service);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Delete service by id
router.delete("/deleteService/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const service = await ServiceModel.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({message: "Service not found"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
})

// Export
module.exports = router;