const express = require('express');
const router = express.Router();


const {createEvent,getFlagship,getMonthly,getWeekly,getAllEvents,getUnapprovedEvents} = require('../controllers/events');


router.post('/events', createEvent);
router.get('/getallEvents',getAllEvents)
router.get('/flagship',getFlagship);
router.get('/monthly',getMonthly);
router.get('/weekly',getWeekly);
router.get('/unapprovedEvents',getUnapprovedEvents);


module.exports= router;