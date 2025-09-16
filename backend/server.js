import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
console.log("Product at import (typeof):", typeof Product);
console.log("Product at import (raw):", Product);

dotenv.config();

const app = express();

app.use(express.json());

app.post("/api/products", async (req, res) => {
    const product =  req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    try {
        const newProduct = new Product(product)
        await newProduct.save();
        res.status(201).json({ success:true, data: newProduct});
    } catch (error) {
        console.error("Error in Create product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
})