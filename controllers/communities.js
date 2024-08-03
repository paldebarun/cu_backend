const Communities = require('../models/Communities');
const Department = require('../models/Department');
const Cluster = require('../models/Cluster');


exports.createCommunity = async (req, res) => {
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


    const newCommunity = new Communities({
      name,
      department: requiredDepartment._id,
      institute,
      cluster: requiredCluster._id,
    });


    const savedCommunity = await newCommunity.save();

    
    return res.status(201).json({
      success: true,
      message: 'Community created successfully',
      community: savedCommunity,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: `Error creating Community: ${error.message}`,
    });
  }
};


exports.findAllCommunities = async (req, res) => {
  try {
   
    const communities = await Communities.find()
      .populate('department')
      .populate('cluster');

   
    return res.status(200).json({
      success: true,
      message: 'Communities retrieved successfully',
      communities,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: `Error retrieving Communities: ${error.message}`,
    });
  }
};


exports.findCommunityById = async (req, res) => {
  try {
    const { id } = req.params;


    const community = await Communities.findById(id)
      .populate('department')
      .populate('cluster');

 
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
      message: `Error retrieving Community: ${error.message}`,
    });
  }
};


exports.updateCommunityById = async (req, res) => {
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


    const updatedCommunity = await Communities.findByIdAndUpdate(
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
      message: `Error updating Community: ${error.message}`,
    });
  }
};


exports.deleteCommunityById = async (req, res) => {
  try {
    const { id } = req.params;

  
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
      message: `Error deleting Community: ${error.message}`,
    });
  }
};
