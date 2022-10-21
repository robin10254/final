const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        products: {
            // eslint-disable-next-line prettier/prettier
            items: [{
                    productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Products',
                        required: true,
                    },
                    quantity: {
                        type: Number,
                        required: true,
                    },
                },
            ],
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true,
        },
    },
    // eslint-disable-next-line prettier/prettier
    { timestamps: true },
);

module.exports = mongoose.model('Orders', OrderSchema);
