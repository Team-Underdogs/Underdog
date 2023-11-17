const express = require("express");
const router = express.Router();
const checkJwt = require("../utils/auth");
const ProductModel = require("../models/products");
const StoreModel = require("../models/stores");

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
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message})
    }
})

// Export
module.exports = router;