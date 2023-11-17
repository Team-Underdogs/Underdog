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
            ServiceCategories
        } = req.body;

        const UserId = req.query.UserId;

        const AssociatedStore = await StoreModel.findOne({UserId});

        if (!AssociatedStore) {
            return res.status(404).json({message: "Store not found"});
        }

        if (!ServiceName || !ServiceDescription || !ServicePrice || !ServiceTags || !ServiceCategories) {
            return res.status(400).json({message: "Please provide all neccessary fields"})
        }

        if (!UserId) {
            return res.status(401).json({message: "Unauthorized, user id is not provided"})
        }

        const service = new ServiceModel({
            ServiceName,
            ServiceDescription,
            ServicePrice,
            ServiceTags,
            ServiceCategories,
            Store: AssociatedStore,
            UserId
        })
        await service.save();
        return res.status(201).json({message: "Service created successfully", service});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
});

// Update service by id
router.put("/updateService/:id", async (req, res) => {
    try {
        const {...updatedFields} = req.body;
        const UserId = req.query.UserId;
        const { id } = req.params;

        const service = await ServiceModel.findById(id);

        if (!service) {
            return res.status(404).json({ message: "Service not found"})
        }

        if (!UserId) {
            return res.status(401).json({ message: "Unauthorized, user id not provided"})
        }

        if(UserId !== service.UserId) {
            return res.status(403).json({ message: "Unauthorized. UserId does not match"})
        }

        const updatedService = await ServiceModel.findByIdAndUpdate(id, updatedFields, {
            new: true
        });

        if(!updatedService) {
            return res.status(404).json({ message: "Service not found"})
        }
        res.json(updatedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error})
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