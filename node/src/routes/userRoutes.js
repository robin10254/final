const express = require('express');
const { register, login } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.get('/login', login);

// noteRouter.get('/', auth, getNote);
// noteRouter.post('/', auth, createNote);
// noteRouter.delete('/:id', auth, deleteNote);
// noteRouter.put('/:id', auth, updateNote);

module.exports = userRouter;
