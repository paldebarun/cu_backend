const Communities = require('../models/Communities');
const Department = require('../models/Department');


exports.createCommunity = async (req, res) => {
  try {
    const {
      ProposedCommunityName,
      TypeOfEntity,
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

    if (
      !ProposedCommunityName ||
      !TypeOfEntity ||
      !CategoryOfEntity ||
      !ProposedBy ||
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

    const requiredDepartment = await Department.findOne({ name: proponentDepartment });

    if (requiredDepartment) {
      const newCommunity = new Communities({
        ProposedCommunityName,
        TypeOfEntity,
        CategoryOfEntity,
        ProposedBy,
        proponentName,
        proponentDepartment: requiredDepartment._id,
        natureofEntity,
        proposedFacultyAdvisor: [proposedFacultyAdvisor1, proposedFacultyAdvisor2],
        proposedFacultyCoAdvisor: [proposedFacultyCoAdvisor1, proposedFacultyCoAdvisor2],
        proposedStudentRepresentative: [proposedStudentRepresentative1, proposedStudentRepresentative2],
        proposedStudentJointRepresentative: [proposedStudentJointRepresentative1, proposedStudentJointRepresentative2],
        ProposedDate,
      });

      const savedCommunity = await newCommunity.save();

      return res.status(201).json({
        success: true,
        message: 'Community created successfully',
        community: savedCommunity,
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
      message: `Error creating community: ${error.message}`,
    });
  }
};

exports.findAllCommunities = async (req, res) => {
  try {
    const communities = await Communities.find().populate('proponentDepartment');

    return res.status(200).json({
      success: true,
      message: 'Communities retrieved successfully',
      communities,
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

    const community = await Communities.findById(id).populate('proponentDepartment');

    if (!community) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Community retrieved successfully',
      community,
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
      ProposedCommunityName,
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

    if (
      !ProposedCommunityName ||
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
        ProposedCommunityName,
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
    ).populate('proponentDepartment');

    if (!updatedCommunity) {
      return res.status(404).json({
        success: false,
        message: 'Community not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Community updated successfully',
      community: updatedCommunity,
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
      community: deletedCommunity,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error deleting community: ${error.message}`,
    });
  }
};
