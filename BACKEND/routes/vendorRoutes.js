const express = require('express');
const router = express.Router();

const vendorController = require('../controllers/vendorcontroller');

// Vendor registration
router.post('/register', vendorController.VendorRegister);

// Vendor login
router.post('/login', vendorController.VendorLogin);

module.exports = router;