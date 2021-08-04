const firebase = require('../db');
const admin = require('../dbAdmin');
const Merchant = require('../models/merchant');
const Voucher = require('../models/voucher');
const firestore = firebase.firestore();
// const firestoreAdmin = admin.firestore();
const merchantController = require('../controllers/merchantController');

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

//DECREMENT OF VOUCHER HAVE ISSUES
const updateVoucherUponPurchase = async (req, res, next) => {
    try {
        const merchId = req.params.id; //Merch ID
        const vouchId = req.params.vouchId;
        const userId = req.params.userId;
        const data = req.body;
        const voucherArr = [];
        const voucher = await firestore.collection('merchants').doc(merchId).collection('vouchers').doc(vouchId);
        console.log(voucher.get('qty'));
        await voucher.update({
            qty: admin.firestore.FieldValue.increment(-1)
        });

        const datas = await firestore.collection('merchants').doc(merchId).collection('vouchers').doc(vouchId).get();
        datas = JSON.parse(datas);
        datas.forEach(vouch => {
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
        await firestore.collection('users').doc(userId).collection('merchants').doc(merchId).collection('vouchers').doc(vouchId).set(datas);
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

const getAllVouchersByUserByMerchant = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const merchid = req.params.id;
        const data = await firestore.collection('users').doc(userId).collection('merchants').doc(merchid).collection('vouchers').get();
        const voucherArr = [];
        if (data.empty) {
            res.status(400).send("No Voucher Record found");
        } else {
            data.forEach(vouch => {
                const voucher = new Voucher(
                    vouch.id,
                    vouch.data().value,
                    vouch.data().qty,
                    vouch.data().expiry,
                    vouch.data().isAvailable,
                    vouch.data().isGenerated,
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

async function getAllVouchersByUserByMerchantInternal(userId, merchId) {
    const data = await firestore.collection('users').doc(userId).collection('merchants').doc(merchId).collection('vouchers');
    const allVouchers = await data.get();
    const voucherArr = [];
    if (allVouchers.empty) {
        res.status(400).send("No Voucher Record found");
    } else {
        allVouchers.forEach(vouch => {
            const voucher = new Voucher(
                vouch.id,
                vouch.data().value,
                vouch.data().qty,
                vouch.data().expiry,
                vouch.data().isAvailable,
                vouch.data().isGenerated,
                vouch.data().price

            );
            voucherArr.push(voucher);
        });
    }
    return voucherArr;
}

//its returning before the data fully returns
// 2 prints before 1
async function getAllVouchers(merchantArr, userId) {
    const voucherArr = [];
    merchantArr.forEach(async merchId => {
        const vouchers = await getAllVouchersByUserByMerchantInternal(userId, merchId);
        voucherArr.push(vouchers);
        console.log("1.", voucherArr);
    });
    console.log("2.", voucherArr);
    return voucherArr;
}

//fetching empty vouchers
const getAllVouchersFromUsers = async (req, res, next) => {
    try {
        const merchants = await merchantController.getAllMerchantInternal();
        console.log(merchants);
        const merchantArr = [];
        merchants.forEach(merch => {
            merchantArr.push(merch.id);
        })

        var voucherArr = [];
        const userId = req.params.userId;
        voucherArr = await getAllVouchers(merchantArr, userId);

        console.log("final", voucherArr);

        res.send(voucherArr);

    } catch (error) {
        res.status(400).send(error.message);
    }

}



module.exports = {
    createVouchers,
    getAllVouchersByMerchant,
    updateVoucher,
    deleteVoucher,
    getVoucherByVoucherId,
    updateVoucherUponPurchase,
    getAllVouchersByUserByMerchant,
    getAllVouchersFromUsers,
    getAllVouchersByUserByMerchantInternal
}