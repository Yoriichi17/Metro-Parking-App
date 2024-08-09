const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');


router.post('/register', vehicleController.register);
router.post('/search', vehicleController.search);
router.post('/delete', vehicleController.delete);


router.get('/get-phone-number/:vehicleNumber', vehicleController.getPhoneNumber);

module.exports = router;
