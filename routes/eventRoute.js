const express = require('express');
const router = express.Router();


const {createEvent,getFlagship,getMonthly,getWeekly} = require('../controllers/events');


router.post('/events', createEvent);

router.get('/flagship',getFlagship);
router.get('/monthly',getMonthly);
router.get('/weekly',getWeekly);


module.exports= router;