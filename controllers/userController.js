const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.send("New User Created Successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const user = await firestore.collection('users');
        const data = await user.get();
        const userArr = [];
        if (data.empty) {
            res.status(400).send("No User Record found");
        } else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().email,
                    doc.data().password,
                    doc.data().acctCreationDate,
                );
                userArr.push(user);
            });
            res.send(userArr);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if (!data.exists) {
            res.status(400).message("User not found");
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const updatedUser = await firestore.collection('users').doc(id);
        await updatedUser.update(data);
        res.send("User Record updated successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send("User Record deleted successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createUser,
    getAllUser,
    getUserById,
    updateUser,
    deleteUser
}