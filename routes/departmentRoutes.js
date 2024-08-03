const express = require('express');
const router = express.Router();
const {CreateDepartment,findAllDepartments,findDepartmentById,updateDepartmentById,deleteDepartmentById }= require('../controllers/department');


router.post('/departments', CreateDepartment );

router.get('/departments', findAllDepartments);

router.get('/departments/:id', findDepartmentById);

router.put('/departments/:id', updateDepartmentById);

router.delete('/departments/:id', deleteDepartmentById);

module.exports = router;
