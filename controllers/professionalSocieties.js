const ProfessionalSocieties = require('../models/ProfessionalSocieties');
const Department = require('../models/Department');
const Institute = require('../models/Institute');
const Cluster = require('../models/Cluster');

const mongoose = require('mongoose');

exports.createProfessionalSociety = async (req, res) => {
  try {
    const {
      ProposedEntityName,
      TypeOfEntity,
      EntityDepartment,
      EntityInstitute,
      EntityCluster,
      CategoryOfEntity,
      ProposedBy,
      proponentName,
      proponentDepartment,
      natureofEntity,
      proposedFacultyAdvisor1,
      proposedFacultyAdvisor2,
      proposedFacultyCoAdvisor1,
      proposedFacultyCoAdvisor2,
      proposedStudentRepresentative1,
      proposedStudentRepresentative2,
      proposedStudentJointRepresentative1,
      proposedStudentJointRepresentative2,
      ProposedDate,
    } = req.body;

    // Check if all required fields are present
    if (
      !ProposedEntityName ||
      !TypeOfEntity ||
      !CategoryOfEntity ||
      !ProposedBy ||
      !EntityDepartment ||
      !EntityInstitute ||
      !EntityCluster ||
      !proponentName ||
      !natureofEntity ||
      !proponentDepartment ||
      !proposedFacultyAdvisor1 ||
      !proposedFacultyAdvisor2 ||
      !proposedStudentRepresentative1 ||
      !proposedStudentRepresentative2 ||
      !proposedStudentJointRepresentative1 ||
      !proposedStudentJointRepresentative2 ||
      !proposedFacultyCoAdvisor1 ||
      !proposedFacultyCoAdvisor2 ||
      !ProposedDate
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Find the department by name
    const requiredDepartment = await Department.findOne({ name: proponentDepartment });
    const requiredEntityDepartment = await Department.findOne({ name: EntityDepartment });
    const requiredEntityCluster = await Cluster.findOne({ name: EntityCluster });
    const requiredInstitute = await Institute.findOne({ name: EntityInstitute });


    if (requiredDepartment) {
      const newSociety = new ProfessionalSocieties({
        ProposedEntityName,
        TypeOfEntity,
        CategoryOfEntity,
        ProposedBy,
        EntityDepartment:requiredEntityDepartment._id,
        EntityInstitute:requiredInstitute._id,
        EntityCluster:requiredEntityCluster._id,
        proponentName,
        proponentDepartment: requiredDepartment._id,
        natureofEntity,
        proposedFacultyAdvisor: [proposedFacultyAdvisor1, proposedFacultyAdvisor2],
        proposedFacultyCoAdvisor: [proposedFacultyCoAdvisor1, proposedFacultyCoAdvisor2],
        proposedStudentRepresentative: [proposedStudentRepresentative1, proposedStudentRepresentative2],
        proposedStudentJointRepresentative: [proposedStudentJointRepresentative1, proposedStudentJointRepresentative2],
        ProposedDate,
      });

      // Save the new Professional Society
      const savedSociety = await newSociety.save();

      return res.status(201).json({
        success: true,
        message: 'Professional Society created successfully',
        Entity: savedSociety,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Invalid department',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating Professional Society: ${error.message}`,
    });
  }
};

exports.findAllProfessionalSocieties = async (req, res) => {
  try {
    // Retrieve all Professional Societies and populate the department reference
    const societies = await ProfessionalSocieties.find().populate('proponentDepartment EntityDepartment EntityInstitute EntityCluster');

    return res.status(200).json({
      success: true,
      message: 'Professional Societies retrieved successfully',
      Entity:societies,
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

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Professional Society ID format',
      });
    }

    // Find the society by ID and populate the department reference
    const society = await ProfessionalSocieties.findById(id).populate('proponentDepartment EntityDepartment EntityInstitute EntityCluster');

    if (!society) {
      return res.status(404).json({
        success: false,
        message: 'Professional Society not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Professional Society retrieved successfully',
      Entity:society,
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
    const {
      ProposedSocietyName,
      CategoryOfEntity,
      proposedFacultyAdvisor1,
      proposedFacultyAdvisor2,
      proposedFacultyCoAdvisor1,
      proposedFacultyCoAdvisor2,
      proposedStudentRepresentative1,
      proposedStudentRepresentative2,
      proposedStudentJointRepresentative1,
      proposedStudentJointRepresentative2,
    } = req.body;

    // Check if all required fields are present
    if (
      !ProposedSocietyName ||
      !CategoryOfEntity ||
      !proposedFacultyAdvisor1 ||
      !proposedFacultyAdvisor2 ||
      !proposedStudentRepresentative1 ||
      !proposedStudentRepresentative2 ||
      !proposedStudentJointRepresentative1 ||
      !proposedStudentJointRepresentative2 ||
      !proposedFacultyCoAdvisor1 ||
      !proposedFacultyCoAdvisor2
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Update the Professional Society by ID
    const updatedSociety = await ProfessionalSocieties.findByIdAndUpdate(
      id,
      {
        ProposedSocietyName,
        CategoryOfEntity,
        proposedFacultyAdvisor: [proposedFacultyAdvisor1, proposedFacultyAdvisor2],
        proposedFacultyCoAdvisor: [proposedFacultyCoAdvisor1, proposedFacultyCoAdvisor2],
        proposedStudentRepresentative: [proposedStudentRepresentative1, proposedStudentRepresentative2],
        proposedStudentJointRepresentative: [
          proposedStudentJointRepresentative1,
          proposedStudentJointRepresentative2,
        ],
      },
      { new: true, runValidators: true }
    ).populate('proponentDepartment EntityDepartment EntityInstitute EntityCluster');

    if (!updatedSociety) {
      return res.status(404).json({
        success: false,
        message: 'Professional Society not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Professional Society updated successfully',
      Entity: updatedSociety,
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

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Professional Society ID format',
      });
    }

    // Find and delete the Professional Society by ID
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
      Entity: deletedSociety,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error deleting Professional Society: ${error.message}`,
    });
  }
};
