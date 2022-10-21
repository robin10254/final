const express = require('express');

// eslint-disable-next-line object-curly-newline
const {
    addOrder,
    getOrders,
    updateOrder,
    removeOrder,
    reportOrder,
    changeOrderStatus,
} = require('../controllers/orderController');
const auth = require('../middlewares/auth');

const orderRouter = express.Router();

orderRouter.post('/add', auth, addOrder);
orderRouter.get('/', auth, getOrders); // get orders
orderRouter.get('/:data', auth, getOrders); // get order by user ID
orderRouter.patch('/update/:id', auth, updateOrder);
orderRouter.delete('/remove/:id', auth, removeOrder);
orderRouter.get('/report/:date', auth, reportOrder);
orderRouter.patch('/status/:id', auth, changeOrderStatus);

module.exports = orderRouter;
