/* eslint-disable comma-dangle */
const express = require('express');

const {
    addProduct,
    getProducts,
    updateProduct,
    removeProduct,
} = require('../controllers/productControllers');
const auth = require('../middlewares/auth');

const productRouter = express.Router();

try {
    productRouter.post('/add/:id', auth.authfunc(['superadmin']), addProduct); // add product from fakeAPI
    productRouter.post('/add', auth.authfunc(['superadmin']), addProduct); // add product from req
    productRouter.get('/:id', auth.authfunc(['superadmin']), getProducts); // get product by product ID
    productRouter.get('/', auth.authfunc(['superadmin', 'admin', 'user']), getProducts); // get products
    productRouter.patch('/update/:id', auth.authfunc(['superadmin']), updateProduct);
    productRouter.delete('/remove/:id', auth.authfunc(['superadmin']), removeProduct);
} catch (error) {
    console.log(error);
}

module.exports = productRouter;
