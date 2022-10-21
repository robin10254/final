/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const dotenv = require('dotenv');

const orderModel = require('../models/order');

dotenv.config();

const addOrder = async (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { id, date, products } = req.body;

    try {
        const existingOrder = await orderModel.findOne({ id });

        if (existingOrder) {
            return res.status(400).json({ message: 'Order already exists' });
        }

        const newOrder = await orderModel.create({
            id,
            date,
            products,
            userId: req.id,
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getOrders = async (req, res) => {
    try {
        const { id } = req.params;
        let orders;

        if (id) {
            orders = await orderModel.SomeValue.find({}).select({ id });
        } else {
            orders = await orderModel.find();
        }

        if (!orders.length) {
            return res.status(404).json({ message: 'Orders not found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findOne({ id });

        if (!order) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // eslint-disable-next-line object-curly-newline
        const { title, price, description, category, image } = req.body;

        const updatedOrder = {
            title,
            price,
            category,
            description,
            image,
        };

        await orderModel.findByIdAndUpdate(order._id, updatedOrder, { new: true });
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const removeOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findOne({ id });

        if (!order) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await orderModel.findByIdAndRemove(order._id);
        res.status(202).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    addOrder,
    getOrders,
    updateOrder,
    removeOrder,
};
