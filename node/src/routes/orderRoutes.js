const express = require('express');

// eslint-disable-next-line object-curly-newline
const { addOrder, getOrders, updateOrder, removeOrder } = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.post('/add', addOrder);
orderRouter.get('/', getOrders); // get orders
orderRouter.get('/:id', getOrders); // get order by user ID
orderRouter.patch('/update/:id', updateOrder);
orderRouter.delete('/remove/:id', removeOrder);

module.exports = orderRouter;
