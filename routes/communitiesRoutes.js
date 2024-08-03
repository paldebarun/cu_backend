const express = require('express');
const router = express.Router();
const {
  createCommunity,
  findAllCommunities,
  findCommunityById,
  updateCommunityById,
  deleteCommunityById
} = require('../controllers/communities');


router.post('/communities', createCommunity);


router.get('/communities', findAllCommunities);

// Route to find a community by ID
router.get('/communities/:id', findCommunityById);

// Route to update a community by ID
router.put('/communities/:id', updateCommunityById);

// Route to delete a community by ID
router.delete('/communities/:id', deleteCommunityById);

module.exports = router;
