const express = require("express");
const router = express.Router();
const ServiceModel = require("../models/services");
const StoreModel = require("../models/stores");
const STRIPE_SECRET = process.env.STRIPE_SECRET;
const stripe = require('stripe')(STRIPE_SECRET);
const { authMiddleware, upload } = require('../index.js');

// Get all services
router.get("/getAllServices", async (req, res) => {
    try {
        const services = await ServiceModel.find().populate('Store').exec();
        res.json({
            count: services.length,
            data: services
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

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
router.post("/createService", authMiddleware, upload.single('serviceImage'), async (req, res) => {
    try {
        const {
            ServiceName,
            ServiceDescription,
            ServicePrice,
            ServiceImage
        } = req.body;
        const ServiceTags = req.body.ServiceTags.split(',');
        const ServiceCategories = req.body.ServiceCategories.split(',');
        const UserId = req.query.UserId;

        const AssociatedStore = await StoreModel.findOne({UserId});

        if (!AssociatedStore) {
            return res.status(404).json({message: "Store not found"});
        }

        if (!ServiceName || !ServiceDescription || !ServicePrice || !ServiceTags.length || !ServiceCategories.length) {
            return res.status(400).json({message: "Please provide all neccessary fields"})
        }

        if (!UserId) {
            return res.status(401).json({message: "Unauthorized, user id is not provided"})
        }

        if (!req.file || !req.file.originalname) {
            return res.status(400).json({ message: "Service image not provided" });
        }

        const stripeProduct = await stripe.products.create({
            name: ServiceName,
            type: 'good'
        },
        { stripeAccount: AssociatedStore.StripeId});

        const stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: ServicePrice * 100,
            currency: 'nzd'
        },
        { stripeAccount: AssociatedStore.StripeId })

        const service = new ServiceModel({
            ServiceName,
            ServiceDescription,
            ServicePrice,
            ServiceTags,
            ServiceCategories,
            Store: AssociatedStore,
            stripeProduct,
            stripePrice,
            UserId,
            ServiceImage: req.file.originalname
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

// Stripe payment for service
router.post('/checkout/:id', async (req, res) => {
    try {

        const serviceId = req.params.id;
        const { StoreId } = req.body;

        const service = await ServiceModel.findById(serviceId).populate('Store');

        if (!service) {
            return res.status(404).json({message: 'Service not found'});
        }

        const associatedStore = await StoreModel.findById(StoreId);

        if (!associatedStore) {
            return res.status(404).json({message: "Store not found"});
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price: service?.stripePrice?.id,
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/',
        },
        { stripeAccount: associatedStore.StripeId });
        res.json({ sessionUrl: session.url });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

// Delete service by id
router.delete("/deleteService/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const service = await ServiceModel.findByIdAndDelete(id);
        if (!service) {
            return res.status(404).json({message: "Service not found"});
        }
        return res.status(200).json({message: "Service deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
})

// Filter services by category and/or tags
router.get('/filterServices', async (req, res) => {
    try {
        const { category, tags } = req.query;
        let query = {};
        if (category) {
            query.ServiceCategories = category;
        }
        if (tags) {
            const tagsArray = tags.split(','); 
            query.ServiceTags = { $in: tagsArray };
        }
        const filteredServices = await ServiceModel.find(query);
        res.json(filteredServices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete all services with StoreId
router.delete('/deleteAssociatedServices', async (req, res) => {
    try {
        const { storeId } = req.query;
        await ServiceModel.deleteMany({ Store: storeId });
        return res.status(200).json({message: "Services deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Export
module.exports = router;