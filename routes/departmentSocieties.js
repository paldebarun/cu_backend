const express = require('express');
const router = express.Router();


const {createDepartmentalSociety,findAllDepartmentalSocieties,findDepartmentalSocietyById,updateDepartmentalSocietyById,deleteDepartmentalSocietyById} = require('../controllers/departmentalSocieties');


router.post('/departmental-societies',createDepartmentalSociety);


router.get('/departmental-societies', findAllDepartmentalSocieties);


router.get('/departmental-societies/:id', findDepartmentalSocietyById);


router.put('/departmental-societies/:id', updateDepartmentalSocietyById);


router.delete('/departmental-societies/:id', deleteDepartmentalSocietyById);

module.exports = router;
