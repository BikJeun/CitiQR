const express = require('express');
const { createqrcode, updateqrcode } = require('../controllers/qrController');

const router = express.Router();

router.put('/qr/:userId/:id/:vouchId', createqrcode);
router.put('/qr/:userId/:qrId', updateqrcode);


module.exports = {
    routes: router
}
