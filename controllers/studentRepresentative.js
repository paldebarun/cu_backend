const Club = require('../models/club');
const Department = require('../models/Department');
const Communities = require('../models/Communities');
const Cluster = require('../models/Cluster');
const Institute = require('../models/Institute');
const StudentRep = require('../models/studentRep');
const bcrypt = require('bcrypt'); 

exports.createStudentRep = async (req, res) => {
  try {
    const {
      institute,
      name,
      department,
      uid,
      phone,
      emailId,
      experience,
      achievements,
      entityType,
      entityName,
      cluster
    } = req.body;

    if (!name || !department || !entityType || !entityName || !uid || !phone || !emailId || !experience || !achievements || !cluster || !institute) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, department, entity type, entity name, etc.',
      });
    }

    const requiredDepartment = await Department.findOne({ name: department });
    const requiredCluster = await Cluster.findOne({ name: cluster });
    const requiredInstitute = await Institute.findOne({ name: institute });
    
    if (!requiredDepartment || !requiredCluster || !requiredInstitute) {
      return res.status(404).json({
        success: false,
        message: 'Either cluster, department, or institute is not valid.',
      });
    }

    let requiredEntity;
    if (entityType === "Club") {
      requiredEntity = await Club.findOne({ name: entityName });
    } else if (entityType === "Community") {
      requiredEntity = await Communities.findOne({ name: entityName });
    }

    if (!requiredEntity) {
      return res.status(404).json({
        success: false,
        message: `${entityType} not found.`,
      });
    }

    const hashedPassword = await bcrypt.hash(uid, 10);

    let newStudentRep;
    if (entityType === "Club") {
      newStudentRep = new StudentRep({
        name,
        department: requiredDepartment._id,
        institute: requiredInstitute._id,
        cluster: requiredCluster._id,
        uid,
        phone,
        emailId,
        experience,
        achievements,
        club: requiredEntity._id,
        password: hashedPassword
      });
    } else {
      newStudentRep = new StudentRep({
        name,
        department: requiredDepartment._id,
        institute: requiredInstitute._id,
        cluster: requiredCluster._id,
        uid,
        phone,
        emailId,
        experience,
        achievements,
        community: requiredEntity._id,
        password: hashedPassword
      });
    }

    const savedStudent = await newStudentRep.save();

    return res.status(201).json({
      success: true,
      message: 'StudentRep created successfully',
      studentRep: savedStudent,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating student representative: ${error.message}`,
    });
  }
};
