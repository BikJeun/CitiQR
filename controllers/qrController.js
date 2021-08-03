const firebase = require('../db');
const Qr = require('../models/qr');
const firestore = firebase.firestore();
const voucherController = require('./voucherController');

const createQr = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const voucher = voucherController.getVoucherDetails(req.params.merchId, req.params.voucherId);
        const voucherId = voucherController.createPurchasedVoucher(userId) //to create method in controller to get back the ID

        const data = req.body;
        await firestore.collection('users').doc(userId).collection('vouchers').doc(voucherId).set(data);
        res.send("QR Created Successfully");

    } catch (error) {
        res.status(400).send(error.message);
    }
}

