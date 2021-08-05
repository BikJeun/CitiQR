const firebase = require('../db');
const Qr = require('../models/qr');
const firestore = firebase.firestore();


const createqrcode = async (req, res, next) => {
    try {
        const merchId = req.params.id; //Merch ID
        const vouchId = req.params.vouchId;
        const userId = req.params.userId;
        const data = req.body;
        const updatedVoucher = await firestore.collection('users').doc(userId).collection('merchants').doc(merchId).collection('vouchers').doc(vouchId);
        await updatedVoucher.update(data);
        const datas = await firestore.collection('users').doc(userId).collection('merchants').doc(merchId).collection('vouchers').doc(vouchId);
        await uallVouchersSnapshot.update(datas).get();
        allVouchersSnapshot.forEach(vouch => {
            const voucher = new Voucher(
                merchId,
                vouch.id,
                vouch.data().value,
                vouch.data().qty,
                vouch.data().price
            );
            voucherArr.push(voucher);
        })
        const createQR = await firestore.collection('users').doc(userId).collection('merchants').doc(merchId).collection('vouchers').doc(vouchId).collection('qr').doc().set(voucherarr);
        await createQR.update(voucherarr);
        res.send("QR code created successfully updated");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateqrcode = async (req, res, next) => {
    try {
        const qrId = req.params.id; //Merch ID
        const userId = req.params.userId;
        const data = req.body;
        const updatedQR = await firestore.collection('users').doc(userId).collection('merchants').doc(merchId).collection('vouchers').doc(vouchId).collection('qr').doc(qrId);
        await updatedQR.update(data);
        res.send("QR code created successfully updated");
    } catch (error) {
        res.status(400).send(error.message);
    }
}




module.exports = {
    createqrcode, updateqrcode
}

