const express = require('express');
const router = express.Router();
const {CreateInstitute,findAllInstitute,findInstituteById,updateInstituteById,deleteInstituteById }= require('../controllers/institute');


router.post('/institutes', CreateInstitute );

router.get('/institutes', findAllInstitute);

router.get('/institutes/:id', findInstituteById);

router.put('/institutes/:id', updateInstituteById);

router.delete('/institutes/:id', deleteInstituteById);

module.exports = router;
