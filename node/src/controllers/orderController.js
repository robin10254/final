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
            status: 'Pending',
            userId: req.userId,
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
        const { data } = req.params;
        let orders;

        if (data === 'Pending' || data === 'pending') {
            orders = await orderModel.find({ status: 'Pending' });
        } else if (data) {
            orders = await orderModel.find({ userId: data });
        } else {
            orders = await orderModel.find();
        }

        if (!orders.length) {
            return res.status(404).json({ message: 'Orders not found' });
        }

        if (data === 'pending' || data === 'Pending') {
            res.status(200).json({
                Status: 'Pending',
                OrderCount: orders.length,
                OrderList: orders,
            });
        } else if (data) {
            res.status(200).json({ User: data, OrderCount: orders.length, OrderList: orders });
        } else {
            res.status(200).json(orders);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getPendingOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ status: 'Pending' });

        if (!orders.length) {
            return res.status(404).json({ message: 'Orders not found' });
        }

        return res.status(200).json({
            Status: 'Pending',
            OrderCount: orders.length,
            OrderList: orders,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findOne({ id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // eslint-disable-next-line object-curly-newline
        const { date, products } = req.body;

        const updatedOrder = {
            id,
            date,
            products,
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
            return res.status(404).json({ message: 'Order not found' });
        }

        await orderModel.findByIdAndRemove(order._id);
        res.status(202).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const reportOrder = async (req, res) => {
    try {
        const { date } = req.params;
        const orders = await orderModel.find({ date });
        if (!orders.length) {
            return res.status(404).json({ message: 'Orders not found' });
        }
        res.status(200).json({ OrderCount: orders.length, OrderList: orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const changeOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await orderModel.findOne({ id });

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // eslint-disable-next-line object-curly-newline
        const { status } = req.body;

        const updatedOrder = {
            status,
        };

        await orderModel.findByIdAndUpdate(order._id, updatedOrder, { new: true });
        res.status(200).json(await orderModel.findOne({ id }));
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
    reportOrder,
    changeOrderStatus,
    getPendingOrders,
};
