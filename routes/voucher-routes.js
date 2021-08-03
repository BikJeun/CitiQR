const express = require('express');
const { createVouchers, getAllVouchersByMerchant, updateVoucher, deleteVoucher, getVoucherByVoucherId } = require('../controllers/voucherController');

const router = express.Router();

router.put('/voucher/:id', createVouchers);
router.get('/voucher/:id', getAllVouchersByMerchant);
router.put('/voucher/:id/:vouchId', updateVoucher);
router.delete('/voucher/:id/:vouchId', deleteVoucher);
router.get('/voucherById/:id/:vouchId', getVoucherByVoucherId);

module.exports = {
    routes: router
}