const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyAdvisor'); 


router.post('/create', facultyController.createFaculty);

router.get('/fetch/:id',facultyController.getFacultyById);

module.exports = router;