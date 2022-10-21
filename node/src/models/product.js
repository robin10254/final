const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
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

module.exports = mongoose.model('Products', ProductSchema);
