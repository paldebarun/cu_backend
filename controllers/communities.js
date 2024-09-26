const Communities = require('../models/Communities');
const Department = require('../models/Department');
const Institute = require('../models/Institute');
const Cluster = require('../models/Cluster');
const mongoose = require('mongoose');

exports.createCommunity = async (req, res) => {
  try {
    const {
      ProposedEntityName,
      TypeOfEntity,
      CategoryOfEntity,
      ProposedBy,
      proponentName,
      proponentDepartment,
      EntityDepartment,
      EntityInstitute,
      EntityCluster,
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

    // Check for required fields
    if (
      !ProposedEntityName ||
      !TypeOfEntity ||
      !CategoryOfEntity ||
      !ProposedBy ||
      !proponentName ||
      !proponentDepartment ||
      !EntityDepartment ||
      !EntityInstitute ||
      !EntityCluster ||
      !natureofEntity ||
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

    // Fetch related entities from their respective models
    const requiredDepartment = await Department.findOne({ name: proponentDepartment });
    const requiredCommunityDepartment = await Department.findOne({ name: EntityDepartment });
    const requiredCommunityCluster = await Cluster.findOne({ name: EntityCluster });
    const requiredInstitute = await Institute.findOne({ name: EntityInstitute });

    // Check if related entities exist
    if (requiredDepartment && requiredCommunityDepartment && requiredCommunityCluster && requiredInstitute) {
      const newCommunity = new Communities({
        ProposedEntityName,
        TypeOfEntity,
        CategoryOfEntity,
        ProposedBy,
        proponentName,
        proponentDepartment: requiredDepartment._id,
        EntityDepartment: requiredCommunityDepartment._id,
        EntityInstitute: requiredInstitute._id,
        EntityCluster: requiredCommunityCluster._id,
        natureofEntity,
        proposedFacultyAdvisor: [proposedFacultyAdvisor1, proposedFacultyAdvisor2],
        proposedFacultyCoAdvisor: [proposedFacultyCoAdvisor1, proposedFacultyCoAdvisor2],
        proposedStudentRepresentative: [proposedStudentRepresentative1, proposedStudentRepresentative2],
        proposedStudentJointRepresentative: [
          proposedStudentJointRepresentative1,
          proposedStudentJointRepresentative2,
        ],
        ProposedDate,
      });

      const savedCommunity = await newCommunity.save();

      return res.status(201).json({
        success: true,
        message: 'Community created successfully',
        Entity: savedCommunity,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Either department, institute, or cluster is invalid',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating community: ${error.message}`,
    });
  }
};

exports.findAllCommunities = async (req, res) => {
  try {
    const Entity = await Communities.find().populate('proponentDepartment EntityDepartment EntityInstitute EntityCluster');
    return res.status(200).json({
      success: true,
      message: 'Communities retrieved successfully',
      Entity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error retrieving communities: ${error.message}`,
    });
  }
};

exports.findCommunityById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Community ID is required',
      });
    }

    const community = await Communities.findById(id).populate('proponentDepartment EntityDepartment EntityInstitute EntityCluster');

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Community retrieved successfully',
      Entity:community,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error retrieving community: ${error.message}`,
    });
  }
};

exports.updateCommunityById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      ProposedEntityName,
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Community ID',
      });
    }

    if (
      !ProposedEntityName ||
      !CategoryOfEntity ||
      !proposedFacultyAdvisor1 ||
      !proposedFacultyAdvisor2 ||
      !proposedFacultyCoAdvisor1 ||
      !proposedFacultyCoAdvisor2 ||
      !proposedStudentRepresentative1 ||
      !proposedStudentRepresentative2 ||
      !proposedStudentJointRepresentative1 ||
      !proposedStudentJointRepresentative2
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    const updatedCommunity = await Communities.findByIdAndUpdate(
      id,
      {
        ProposedEntityName,
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

    if (!updatedCommunity) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Community updated successfully',
      Entity: updatedCommunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error updating community: ${error.message}`,
    });
  }
};

exports.deleteCommunityById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Community ID is required',
      });
    }

    const deletedCommunity = await Communities.findByIdAndDelete(id);

    if (!deletedCommunity) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Community deleted successfully',
      Entity: deletedCommunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error deleting community: ${error.message}`,
    });
  }
};
