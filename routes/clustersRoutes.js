const express = require('express');
const router = express.Router();
const{findAllClusters,CreateCluster,findClusterById,updateClusterById,DeleteCluster} = require('../controllers/clusters');


router.post('/clusters', CreateCluster);

router.get('/clusters', findAllClusters);

router.get('/clusters/:id', findClusterById);

router.put('/clusters/:id',updateClusterById);

router.delete('/clusters/:id', DeleteCluster);

module.exports = router;
