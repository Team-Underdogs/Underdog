const express = require("express");
const router = express.Router();
const StoreModel = require("../models/stores");
const STRIPE_SECRET = process.env.STRIPE_SECRET;
const stripe = require('stripe')(STRIPE_SECRET)

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
    try {
        const {
            BusinessName,
            Address,
            Suburb,
            City,
            Phone,
            BusinessDescription,
            BusinessTags,
            BusinessCategories,
            LinkWebsite = "Not found",
            LinkFB = "Not found",
            LinkTwitter = "Not found",
            LinkInstagram = "Not found"
        } = req.body;
        const UserId = req.query.UserId;
        const Email = req.query.Email

        if (!BusinessName || !Address || !Suburb || !City || !Phone || !BusinessDescription || !BusinessTags || !BusinessCategories) {
            return res.status(400).json({ message: "Please provide all neccessary fields"})
        }

        if (!UserId) {
            return res.status(401).json({ message: "Unauthorized, user id not provided"})
        }

        const account = await stripe.accounts.create({
            type: 'standard',
        })

        const store = new StoreModel({
            BusinessName,
            Address,
            Suburb,
            City,
            Email,
            Phone,
            BusinessDescription,
            BusinessTags,
            BusinessCategories,
            LinkWebsite,
            LinkFB,
            LinkTwitter,
            LinkInstagram,
            UserId,
            StripeId: account.id 
        });
        await store.save();
        return res.status(201).json({ message: "Business created successfully", store})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating business"})
    }
});

// Update a store
router.put("/updateStore/:id", async (req, res) => {
    try {
        const {StripeId, ...updatedFields} = req.body;
        const UserId = req.query.UserId;
        const { id } = req.params;

        const store = await StoreModel.findById(id);

        if (!store) {
            return res.status(404).json({ message: "Store not found"})
        }

        if (!UserId) {
            return res.status(401).json({ message: "Unauthorized, user id not provided"})
        }

        if (UserId !== store.UserId) {
            return res.status(403).json({ message: "Unauthorized. UserId does not match"})
        }

        if (StripeId) {
            updatedFields.StripeAccountId = StripeAccountId;
        }

        const updatedStore = await StoreModel.findByIdAndUpdate(id, updatedFields, {
            new: true
        });

        if(!updatedStore) {
            return res.status(404).json({ message: "Store not found"})
        }
        res.json(updatedStore);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error})
    }
});

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

// Filter businesses by category and/or tags
router.get('/filterBusinesses', async (req, res) => {
    try {
        const { category, tags } = req.query;
        let query = {};
        if (category) {
            query.BusinessCategories = category;
        }
        if (tags) {
            const tagsArray = tags.split(','); 
            query.BusinessTags = { $in: tagsArray };
        }
        const filteredBusinesses = await StoreModel.find(query);
        res.json(filteredBusinesses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}); 

// Export
module.exports = router;