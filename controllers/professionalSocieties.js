const ProfessionalSocieties = require('../models/ProfessionalSocieties');
const Department = require('../models/Department');
const Cluster = require('../models/Cluster');
// const mongoose = require('mongoose');


exports.createProfessionalSociety = async (req, res) => {
  try {
    const { name, department, institute, cluster } = req.body;

 
    if (!name || !department || !institute || !cluster) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, department, institute, cluster',
      });
    }

    
    const requiredDepartment = await Department.findOne({ name: department });
    const requiredCluster = await Cluster.findOne({ name: cluster });

    if (!requiredDepartment || !requiredCluster) {
      return res.status(404).json({
        success: false,
        message: 'Either the department or cluster is not valid',
      });
    }


    const newSociety = new ProfessionalSocieties({
      name,
      department: requiredDepartment._id,
      institute,
      cluster: requiredCluster._id,
    });


    const savedSociety = await newSociety.save();


    return res.status(201).json({
      success: true,
      message: 'Professional Society created successfully',
      society: savedSociety,
    });
  } catch (error) {
 
    return res.status(500).json({
      success: false,
      message: `Error creating Professional Society: ${error.message}`,
    });
  }
};


exports.findAllProfessionalSocieties = async (req, res) => {
  try {
 
    const societies = await ProfessionalSocieties.find()
      .populate('department')
      .populate('cluster');

  
    return res.status(200).json({
      success: true,
      message: 'Professional Societies retrieved successfully',
      societies,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: `Error retrieving Professional Societies: ${error.message}`,
    });
  }
};


exports.findProfessionalSocietyById = async (req, res) => {
  try {
    const { id } = req.params;

    
    
   
    const society = await ProfessionalSocieties.findById(id)
      .populate('department')
      .populate('cluster');

   
    if (!society) {
      return res.status(404).json({
        success: false,
        message: 'Professional Society not found',
      });
    }


    return res.status(200).json({
      success: true,
      message: 'Professional Society retrieved successfully',
      society,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: `Error retrieving Professional Society: ${error.message}`,
    });
  }
};


exports.updateProfessionalSocietyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, institute, cluster } = req.body;

    


    if (!name || !department || !institute || !cluster) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, department, institute, cluster',
      });
    }

   
    const requiredDepartment = await Department.findOne({ name: department });
    const requiredCluster = await Cluster.findOne({ name: cluster });

    if (!requiredDepartment || !requiredCluster) {
      return res.status(404).json({
        success: false,
        message: 'Either the department or cluster is not valid',
      });
    }

    
    const updatedSociety = await ProfessionalSocieties.findByIdAndUpdate(
      id,
      {
        name,
        department: requiredDepartment._id,
        institute,
        cluster: requiredCluster._id,
      },
      { new: true, runValidators: true } 
    )
      .populate('department')
      .populate('cluster');

  
    if (!updatedSociety) {
      return res.status(404).json({
        success: false,
        message: 'Professional Society not found',
      });
    }

   
    return res.status(200).json({
      success: true,
      message: 'Professional Society updated successfully',
      society: updatedSociety,
    });
  } catch (error) {
 
    return res.status(500).json({
      success: false,
      message: `Error updating Professional Society: ${error.message}`,
    });
  }
};


exports.deleteProfessionalSocietyById = async (req, res) => {
  try {
    const { id } = req.params;


    

  
    const deletedSociety = await ProfessionalSocieties.findByIdAndDelete(id);

    
    if (!deletedSociety) {
      return res.status(404).json({
        success: false,
        message: 'Professional Society not found',
      });
    }


    return res.status(200).json({
      success: true,
      message: 'Professional Society deleted successfully',
      society: deletedSociety,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      message: `Error deleting Professional Society: ${error.message}`,
    });
  }
};
