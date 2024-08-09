const express = require('express');
const router = express.Router();
const { generatePaymentLink } = require('../controllers/paymentController');


router.post('/generate-payment-link', generatePaymentLink);

module.exports = router;
