const express = require('express');
const { createMerchant, getMerchById, getAllMerchant, deleteMerchant } = require('../controllers/merchantController');

const router = express.Router();

router.put('/merchant', createMerchant);
router.get('/merchant/:id', getMerchById);
router.get('/merchant', getAllMerchant);
router.delete('/merchant/:id', deleteMerchant);

module.exports = {
    routes: router
}