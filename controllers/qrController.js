const firebase = require('../db');
const Qr = require('../models/qr');
const firestore = firebase.firestore();
const voucherController = require('./voucherController');

const createqrcode = async (req, res, next) => {
    try {
        const merchId = req.params.id; //Merch ID
        const vouchId = req.params.vouchId;
        const userId = req.params.userId;
        const data = req.body;
        const updatedVoucher = await firestore.collection('users').doc(userId).collection('merchants').doc(merchId).collection('vouchers').doc(vouchId);
        await updatedVoucher.update(data);
        const createQR = await firestore.collection('users').doc(userId).collection('merchants').doc(merchId).collection('vouchers').doc(vouchId).collection('qr').doc().set(data);
        await createQR.update(data);
        res.send("QR code created successfully updated");
    } catch (error) {
        res.status(400).send(error.message);
    }
}




module.exports = {
    createqrcode
}

