/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

dotenv.config();

const { SECRET_KEY } = process.env;

const authfunc = (permissions) => async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token) {
            // eslint-disable-next-line prefer-destructuring
            token = token.split(' ')[1];

            const user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;

            const existingUser = await userModel.findOne({ _id: user.id });

            if (permissions.includes(existingUser.role)) {
                next();
            } else {
                return res.status(401).json({ message: 'Unauthorized User' });
            }
        } else {
            return res.status(401).json({ message: 'Unauthorized User' });
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized User' });
    }
};

module.exports = { authfunc };
