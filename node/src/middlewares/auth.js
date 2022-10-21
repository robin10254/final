/* eslint-disable consistent-return */
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const { SECRET_KEY } = process.env;

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token) {
            // eslint-disable-next-line prefer-destructuring
            token = token.split(' ')[1];

            const user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;

            console.log(user.role);

            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized User' });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized User' });
    }
};

module.exports = {
    auth,
};
