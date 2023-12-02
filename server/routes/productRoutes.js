const express = require("express");
const router = express.Router();
const ProductModel = require("../models/products");
const StoreModel = require("../models/stores");
const STRIPE_SECRET = process.env.STRIPE_SECRET;
const stripe = require('stripe')(STRIPE_SECRET)

// Get all products
router.get("/getAllProducts", async (req, res) => {
    try {
        const products = await ProductModel.find().populate('Store').exec();
        res.json({
            count: products.length,
            data: products
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Get all products by store
router.get("/getProductsByStore/:storeId", async (req, res) => {
    try {
        const storeId = req.params.storeId;
        const products = await ProductModel.find({Store: storeId});
        return res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Get product by id
router.get("/getProduct/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json(product)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
});

// Create new product
router.post("/createProduct", async (req, res) => {
    try {
        const {
            ProductName,
            ProductDescription,
            ProductPrice,
            ProductTags,
            ProductCategories
        } = req.body;

        const UserId = req.query.UserId;

        const AssociatedStore = await StoreModel.findOne({UserId});

        if (!AssociatedStore) {
            return res.status(404).json({message: "Store not found"});
        }

        if (!ProductName || !ProductDescription || !ProductPrice || !ProductTags || !ProductCategories) {
            return res.status(400).json({ message: "Please provide all neccessary fields"})
        }

        if (!UserId) {
            return res.status(401).json({ message: "Unauthorized, user id not provided"})
        }

        const product = new ProductModel({
            ProductName,
            ProductDescription,
            ProductPrice,
            ProductTags,
            ProductCategories,
            Store: AssociatedStore,
            UserId
        });

        const stripeProduct = await stripe.products.create({
            name: ProductName,
            type: 'good'
        });

        const stripePrice = await stripe.prices.create({
            product: stripeProduct.id,
            unit_amount: ProductPrice * 100,
            currency: 'nzd'
        });

        await product.save();
        return res.status(201).json({message: "Product created successfully", product});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message})
    }
});

// Update product by id
router.put("/updateProduct/:id", async (req, res) => {
    try {
        const {...updatedFields} = req.body;
        const UserId = req.query.UserId;
        const { id } = req.params;

        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found"})
        }

        if (!UserId) {
            return res.status(401).json({ message: "Unauthorized, user id not provided"})
        }

        if(UserId !== product.UserId) {
            return res.status(403).json({ message: "Unauthorized. UserId does not match"})
        }

        const updatedProduct = await ProductModel.findByIdAndUpdate(id, updatedFields, {
            new: true
        });

        if(!updatedProduct) {
            return res.status(404).json({ message: "Product not found"})
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error})
    }
});

// Delete product by id
router.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await ProductModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: "Product not found"});
        }
        return res.status(200).json({message: "Product deleted successfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
})

// Filter products by category and/or tags
router.get('/filterProducts', async (req, res) => {
    try {
        const { category, tags } = req.query;
        let query = {};
        if (category) {
            query.ProductCategories = category;
        }
        if (tags) {
            const tagsArray = tags.split(','); 
            query.ProductTags = { $in: tagsArray };
        }
        const filteredProducts = await ProductModel.find(query);
        res.json(filteredProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Stripe payment for product
router.post('/checkout/:id', async (req, res) => {
    try {

        const productId = req.params.id;
        const { StoreId } = req.body;

        const product = await ProductModel.findById(productId).populate('Store');

        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        const associatedStore = await StoreModel.findById(StoreId);
        console.log({associatedStore})
        console.log(StoreId)

        if (!associatedStore) {
            return res.status(404).json({message: "Store not found"});
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.ProductPrice * 100,
            currency: 'nzd',
            transfer_data: {
                destination: associatedStore.StripeId
            }
        })

        const session = await stripe.checkout.sessions.create({
            line_items: [{
                price: paymentIntent.amount,
                quantity: 1,
            }],
            mode: 'payment',
            success_url: 'http://localhost:3000/',
            cancel_url: 'http://localhost:3000/'
        })
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

// Delete all products with StoreId
router.delete('/deleteAssociatedProducts', async (req, res) => {
    try {
        const { storeId } = req.query;
        await ProductModel.deleteMany({ Store: storeId });
        return res.status(200).json({message: "Products deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

// Export
module.exports = router;