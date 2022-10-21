const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 27017;

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);

app.get('/', (req, res) => {
    res.send('Final Node Project from Robin');
});

mongoose
    .connect(process.env.MONGO_LIVE_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port no. ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

// module.exports = { config: process.env }; circuller dependency couldn't fixed
