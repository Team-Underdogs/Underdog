const express = require("express");
const router = express.Router();
const StoreModel = require("../models/stores");

// Get all stores
router.get("/getAllStores", async (req, res) => {
    try {
        const stores = await StoreModel.find();
        res.json({
            count: stores.length,
            data: stores,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
});

// Get one store by id
router.get("/getStore/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const store = await StoreModel.findById(id);
        if (!store) {
            return res.status(404).json({ message: "Store not found"});
        }
        res.status(200).json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
});

// Create new store
router.post("/createStore", async (req, res) => {
    const {
        BusinessName,
        BusinessDescription,
        BusinessTags
    } = req.body;
    const store = new StoreModel({
        BusinessName,
        BusinessDescription,
        BusinessTags
    });
    try {
        const newStore = await store.save();
        res.status(201).json(newStore);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message});
    }
});

// Update a store
router.put("/updateStore/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const store = await StoreModel.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!store) {
            return res.status(404).json({message: "Store not found"});
        }
        res.status(200).json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
})

// Delete a store
router.delete("/deleteStore/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const store = await StoreModel.findByIdAndDelete(id);
        if (!store) {
            return res.status(404).json({message: "Store not found"});
        }
        res.status(200).json({message: "Store deleted"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
});

// Export
module.exports = router;