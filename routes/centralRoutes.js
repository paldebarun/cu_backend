const express = require('express');
const router = express.Router();
const central = require('../controllers/central'); 

router.post('/create', central.createCentral);

module.exports = router;