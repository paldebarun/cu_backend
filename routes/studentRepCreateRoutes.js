const express = require('express');
const router = express.Router();
const studentRepController = require('../controllers/studentRepresentative'); 

router.post('/create', studentRepController.createStudentRep);

module.exports = router;