const firebase = require('../db');
const Merchant = require('../models/merchant');
const firestore = firebase.firestore();

const createMerchant = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('merchants').doc().set(data);
        res.send("New Merchant Created Successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllMerchant = async (req, res, next) => {
    try {
        const user = await firestore.collection('merchants');
        const data = await user.get();
        const merchArr = [];
        if (data.empty) {
            res.status(400).send("No Merchant Record found");
        } else {
            data.forEach(doc => {
                const merchant = new Merchant(
                    doc.id,
                    doc.data().merchantName,
                    doc.data().email,
                    doc.data().password,
                    doc.data().acctCreationDate,
                    doc.data().role
                );
                merchArr.push(merchant);
            });
            res.send(merchArr);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getAllMerchantInternal() {
    const user = await firestore.collection('merchants');
    const data = await user.get();
    const merchArr = [];
    data.forEach(doc => {
        const merchant = new Merchant(
            doc.id,
            doc.data().merchantName,
            doc.data().email,
            doc.data().password,
            doc.data().acctCreationDate,
            doc.data().role
        );
        merchArr.push(merchant);
    });

    return merchArr;
}

const getMerchById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('merchants').doc(id);
        const data = await user.get();
        if (!data.exists) {
            res.status(400).message("Merchant not found");
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMerchant = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('merchants').doc(id).delete();
        res.send("Merchant Record deleted successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    createMerchant,
    getAllMerchant,
    getMerchById,
    deleteMerchant,
    getAllMerchantInternal
}