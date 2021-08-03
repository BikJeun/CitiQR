const express = require('express');
const { createUser, getAllUser, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.put('/user', createUser);
router.get('/users', getAllUser);
router.get('/userById/:id', getUserById);
router.put('/updateUser/:id', updateUser);
router.delete('/deleteUser/:id', deleteUser)

module.exports = {
    routes: router
}