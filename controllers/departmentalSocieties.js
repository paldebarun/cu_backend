const DepartmentalSocieties = require('../models/DepartmentalSocieties');
const Department = require('../models/Department');
const Cluster = require('../models/Cluster');
const mongoose=require('mongoose');

exports.createDepartmentalSociety = async (req, res) => {
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

    
    const newSociety = new DepartmentalSocieties({
      name,
      department: requiredDepartment._id,
      institute,
      cluster: requiredCluster._id,
    });


    const savedSociety = await newSociety.save();

  
    return res.status(201).json({
      success: true,
      message: 'Departmental Society created successfully',
      society: savedSociety,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: `Error creating Departmental Society: ${error.message}`,
    });
  }
};


exports.findAllDepartmentalSocieties = async (req, res) => {
  try {
  
    const societies = await DepartmentalSocieties.find()
      .populate('department')
      .populate('cluster');

    return res.status(200).json({
      success: true,
      message: 'Departmental Societies retrieved successfully',
      societies,
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: `Error retrieving Departmental Societies: ${error.message}`,
    });
  }
};


exports.findDepartmentalSocietyById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Departmental Society ID format',
      });
    }

 
    const society = await DepartmentalSocieties.findById(id)
      .populate('department')
      .populate('cluster');

   
    if (!society) {
      return res.status(404).json({
        success: false,
        message: 'Departmental Society not found',
      });
    }

    
    return res.status(200).json({
      success: true,
      message: 'Departmental Society retrieved successfully',
      society,
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: `Error retrieving Departmental Society: ${error.message}`,
    });
  }
};


exports.updateDepartmentalSocietyById = async (req, res) => {
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

   
    const updatedSociety = await DepartmentalSocieties.findByIdAndUpdate(
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
        message: 'Departmental Society not found',
      });
    }

   
    return res.status(200).json({
      success: true,
      message: 'Departmental Society updated successfully',
      society: updatedSociety,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: `Error updating Departmental Society: ${error.message}`,
    });
  }
};


exports.deleteDepartmentalSocietyById = async (req, res) => {
  try {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Departmental Society ID format',
      });
    }


    const deletedSociety = await DepartmentalSocieties.findByIdAndDelete(id);

  
    if (!deletedSociety) {
      return res.status(404).json({
        success: false,
        message: 'Departmental Society not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Departmental Society deleted successfully',
      society: deletedSociety,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      message: `Error deleting Departmental Society: ${error.message}`,
    });
  }
};
