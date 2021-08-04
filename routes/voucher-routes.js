const express = require('express');
const { createVouchers, getAllVouchersByMerchant, updateVoucher, deleteVoucher, getVoucherByVoucherId, getAllVouchersByUserByMerchant, getAllVouchersFromUsers, updateVoucherUponPurchase } = require('../controllers/voucherController');

const router = express.Router();

router.put('/voucher/createVoucher/:id', createVouchers);
router.get('/voucher/getAllVouchersByMerchant/:id', getAllVouchersByMerchant);
router.put('/voucher/updateVoucher/:id/:vouchId', updateVoucher);
router.put('/voucher/updateVoucherUponPurchase/:id/:vouchId/:userId', updateVoucherUponPurchase);
router.delete('/voucher/deleteVoucher/:id/:vouchId', deleteVoucher);
router.get('/voucher/getVoucherByVoucherId/:id/:vouchId', getVoucherByVoucherId);
router.get('/voucher/getAllVouchersByUserByMerchant/:userId/:id', getAllVouchersByUserByMerchant);
router.get('/voucher/getAllVouchersFromUsers/:userId', getAllVouchersFromUsers);

module.exports = {
    routes: router
}