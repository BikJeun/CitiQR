const firebase = require('../db');
const Voucher = require('../models/voucher');
const firestore = firebase.firestore();

const createVouchers = async (req, res, next) => {
    try {
        //TODO: add code to ensure that merchant is logged in

        const merchId = req.params.id;
        const data = req.body;
        await firestore.collection('merchants').doc(merchId).collection('vouchers').doc().set(data);
        res.send("Voucher Created Successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllVouchersByMerchant = async (req, res, next) => {
    try {
        const merchid = req.params.id;
        const data = await firestore.collection('merchants').doc(merchid).collection('vouchers').get();
        const voucherArr = [];
        if (data.empty) {
            res.status(400).send("No Voucher Record found");
        } else {
            data.forEach(vouch => {
                const voucher = new Voucher(
                    vouch.id,
                    vouch.data().merchantName,
                    vouch.data().value,
                    vouch.data().qty,
                    vouch.data().expiry,
                    vouch.data().isAvailable,
                    vouch.data().price

                );
                voucherArr.push(voucher);
            });
            res.send(voucherArr);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateVoucher = async (req, res, next) => {
    try {
        const merchId = req.params.id; //Merch ID
        const vouchId = req.params.vouchId;
        const data = req.body;
        const updatedVoucher = await firestore.collection('merchants').doc(merchId).collection('vouchers').doc(vouchId);
        await updatedVoucher.update(data);
        res.send("Voucher details updated");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteVoucher = async (req, res, next) => {
    try {
        const merchId = req.params.id; //Merch ID
        const vouchId = req.params.vouchId;
        await firestore.collection('merchants').doc(merchId).collection('vouchers').doc(vouchId).delete();
        res.send("Voucher deleted successfully!");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getVoucherByVoucherId = async (req, res, next) => {
    try {
        const merchId = req.params.id; //Merch ID
        const vouchId = req.params.vouchId;
        const data = await firestore.collection('merchants').doc(merchId).collection('vouchers').get(vouchId);

        res.send(data);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

function getVoucherDetails(merchId, vouchId) {
    //to call the service to get the voucher
    return getVoucherByVoucherId;
}




module.exports = {
    createVouchers,
    getAllVouchersByMerchant,
    updateVoucher,
    deleteVoucher,
    getVoucherByVoucherId,
    getVoucherDetails
}