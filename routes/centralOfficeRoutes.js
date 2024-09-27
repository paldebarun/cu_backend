const express = require('express');
const router = express.Router();
const centralOfficeController = require('../controllers/CentralOfficeController'); 

router.post('/create', centralOfficeController.createCentralOffice);
router.get('/get/:id',centralOfficeController.getCentralOfficeById);

module.exports = router;