const express = require('express');

const {
    addProduct,
    getProducts,
    updateProduct,
    removeProduct,
} = require('../controllers/productControllers');
const auth = require('../middlewares/auth');

const productRouter = express.Router();

productRouter.post('/add/:id', auth, addProduct); // add product by id
productRouter.post('/add', auth, addProduct); // add product from input
productRouter.get('/', auth, getProducts); // get products
productRouter.get('/:id', auth, getProducts); // get product by product ID
productRouter.patch('/update/:id', auth, updateProduct);
productRouter.delete('/remove/:id', auth, removeProduct);

module.exports = productRouter;
