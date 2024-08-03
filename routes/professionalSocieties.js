const express = require('express');
const router = express.Router();


const professionalSocietiesController = require('../controllers/professionalSocieties');


router.post('/professional-societies', professionalSocietiesController.createProfessionalSociety);


router.get('/professional-societies', professionalSocietiesController.findAllProfessionalSocieties);


router.get('/professional-societies/:id', professionalSocietiesController.findProfessionalSocietyById);


router.put('/professional-societies/:id', professionalSocietiesController.updateProfessionalSocietyById);


router.delete('/professional-societies/:id', professionalSocietiesController.deleteProfessionalSocietyById);

module.exports = router;
