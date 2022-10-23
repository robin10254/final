/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/user');

dotenv.config();

const { SECRET_KEY } = process.env;

// eslint-disable-next-line consistent-return
const register = async (req, res) => {
    // eslint-disable-next-line object-curly-newline
    const { username, email, password, role } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            role,
        });

        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ email, id: user._id }, SECRET_KEY);

        res.status(201).json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// eslint-disable-next-line consistent-return
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        // console.log(existingUser.role);

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(404).json({ message: 'Invalid Credentials' });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            // eslint-disable-next-line comma-dangle
            SECRET_KEY
        );

        res.status(200).json({ user: existingUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register, login };
