/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const fetch = require('node-fetch');
const dotenv = require('dotenv');

const productModel = require('../models/product');

dotenv.config();

const addProduct = async (req, res) => {
    const productID = req.params.id;
    let jsonProduct;

    if (productID) {
        const product = await fetch(`https://fakestoreapi.com/products/${productID}`);
        jsonProduct = await product.json();
    } else {
        jsonProduct = req.body;
    }
    // eslint-disable-next-line object-curly-newline
    const { id, title, price, description, category, image } = jsonProduct;

    try {
        const existingProduct = await productModel.findOne({ id });

        if (existingProduct) {
            return res.status(400).json({ message: 'Product already exists' });
        }

        const newProduct = await productModel.create({
            id,
            title,
            price,
            category,
            description,
            image,
            userId: req.userId,
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getProducts = async (req, res) => {
    try {
        const { id } = req.params;
        let products;

        if (id) {
            products = await productModel.findOne({ id });
        } else {
            products = await productModel.find();
        }

        if (!products.length && !products) {
            return res.status(404).json({ message: 'Products not found' });
        }
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findOne({ id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // eslint-disable-next-line object-curly-newline
        const { title, price, description, category, image } = req.body;

        const updatedProduct = {
            title,
            price,
            category,
            description,
            image,
        };

        await productModel.findByIdAndUpdate(product._id, updatedProduct, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const removeProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findOne({ id });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await productModel.findByIdAndRemove(product._id);
        res.status(202).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    removeProduct,
};
