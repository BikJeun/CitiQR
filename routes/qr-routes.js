const express = require('express');
const { createqrcode } = require('../controllers/qrController');

const router = express.Router();

router.put('/qr/:userId/:id/:vouchId', createqrcode);

module.exports = {
    routes: router
}