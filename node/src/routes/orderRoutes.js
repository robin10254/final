/* eslint-disable comma-dangle */
const express = require('express');

// eslint-disable-next-line object-curly-newline
const {
    addOrder,
    getOrders,
    updateOrder,
    removeOrder,
    reportOrder,
    changeOrderStatus,
    getPendingOrders,
} = require('../controllers/orderController');
const auth = require('../middlewares/auth');

const orderRouter = express.Router();

try {
    orderRouter.post('/add', auth.authfunc(['user']), addOrder);
    orderRouter.get('/', auth.authfunc(['superadmin', 'admin']), getOrders); // get orders
    orderRouter.get('/pending', auth.authfunc(['superadmin', 'admin']), getPendingOrders); // get order by user ID
    orderRouter.get('/:data', auth.authfunc(['superadmin', 'admin', 'user']), getOrders); // get order by user ID
    orderRouter.patch('/update/:id', auth.authfunc(['user']), updateOrder);
    orderRouter.delete('/remove/:id', auth.authfunc(['admin']), removeOrder);
    orderRouter.get('/report/:date', auth.authfunc(['superadmin']), reportOrder);
    orderRouter.patch('/status/:id', auth.authfunc(['admin']), changeOrderStatus);
} catch (error) {
    console.log(error);
}

module.exports = orderRouter;
