const Club = require('../models/club');
const Department = require('../models/Department');
const Communities = require('../models/Communities');
const Cluster = require('../models/Cluster');
const Institute = require('../models/Institute');
const Faculty = require('../models/facultyAdvisor');
const bcrypt = require('bcrypt'); 

exports.createFaculty = async (req, res) => {
  try {
    const {
      institute,
      name,
      department,
      eid,
      phone,
      emailId,
      experience,
      achievements,
      entityType,
      entityName,
      cluster
    } = req.body;

    if (!name || !department || !entityType || !entityName || !eid || !phone || !emailId || !experience || !achievements || !cluster || !institute) {
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

    const hashedPassword = await bcrypt.hash(eid, 10);

    let newFaculty;
    if (entityType === "Club") {
      newFaculty = new Faculty({
        name,
        department: requiredDepartment._id,
        institute: requiredInstitute._id,
        cluster: requiredCluster._id,
        eid,
        phone,
        emailId,
        experience,
        achievements,
        club: requiredEntity._id,
        password: hashedPassword
      });
    } else {
      newFaculty = new Faculty({
        name,
        department: requiredDepartment._id,
        institute: requiredInstitute._id,
        cluster: requiredCluster._id,
        eid,
        phone,
        emailId,
        experience,
        achievements,
        community: requiredEntity._id,
        password: hashedPassword
      });
    }

    const savedFaculty = await newFaculty.save();

    return res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      faculty: savedFaculty,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating faculty: ${error.message}`,
    });
  }
};


exports.getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    

    // Find the faculty advisor by ID
    const facultyAdvisor = await Faculty.findById(id)
      .populate('department')
      .populate('institute')
      .populate('cluster')
       // If it's associated with a community

    // If no faculty advisor found
    if (!facultyAdvisor) {
      return res.status(404).json({
        success: false,
        message: 'Faculty advisor not found',
      });
    }

    // If faculty advisor is found
    return res.status(200).json({
      success: true,
      facultyAdvisor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error fetching faculty advisor: ${error.message}`,
    });
  }
};
