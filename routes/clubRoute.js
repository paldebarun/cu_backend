const express = require('express');
const router = express.Router();


const {createClub,findAllClubs,findClubById,updateClubById,deleteClubById} = require('../controllers/clubs');


router.post('/clubs', createClub);


router.get('/clubs', findAllClubs);


router.get('/clubs/:id', findClubById);


router.put('/clubs/:id', updateClubById);


router.delete('/clubs/:id', deleteClubById);

module.exports = router;
