const Club = require('../models/club');
const Department=require('../models/Department');
const Cluster=require('../models/Cluster');
const mongoose=require('mongoose');
const Institute=require('../models/Institute');




exports.createClub = async (req, res) => {
  try {
    const { name, department, institute, cluster } = req.body;

   
    if (!name || !department || !institute || !cluster) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, department, institute, cluster',
      });
    }

    const requiredDepartment=await Department.findOne({name:department});
    const requiredCluster=await Cluster.findOne({name:cluster});
    const requiredInstitute=await Institute.findOne({name:institute});


    if(requiredCluster && requiredDepartment && requiredInstitute ){


    const newClub = new Club({
      name,
      department:requiredDepartment._id,
      institute:requiredInstitute._id,
      cluster:requiredCluster._id,
    });

  
    const savedClub = await newClub.save();


    return res.status(201).json({
      success: true,
      message: 'Club created successfully',
      club: savedClub,
    });

}
  else{
    return res.status(404).json({
        success:false,
        message:"either cluster or department or institute required is not valid"
    })
  }
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: `Error creating club: ${error.message}`,
    });
  }
};


exports.findAllClubs = async (req, res) => {
  try {
    
    const clubs = await Club.find().populate('department cluster institute');

   
    return res.status(200).json({
      success: true,
      message: 'Clubs retrieved successfully',
      clubs,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: `Error retrieving clubs: ${error.message}`,
    });
  }
};


exports.findClubById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the club ID
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Club ID is required',
      });
    }

   


    const club = await Club.findById(id).populate('department cluster');


    if (!club) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }


    return res.status(200).json({
      success: true,
      message: 'Club retrieved successfully',
      club,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      message: `Error retrieving club: ${error.message}`,
    });
  }
};


exports.updateClubById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const newId=new mongoose.Types.ObjectId(id);


    if (!newId) {
      return res.status(400).json({
        success: false,
        message: 'Club ID is required',
      });
    }


   


    if (!name  ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name',
      });
    }


    const updatedClub = await Club.findByIdAndUpdate(
        newId,
      { name },
      { new: true, runValidators: true } 
    ).populate('department cluster institute');


    if (!updatedClub) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

   
    return res.status(200).json({
      success: true,
      message: 'Club updated successfully',
      club: updatedClub,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      message: `Error updating club: ${error.message}`,
    });
  }
};


exports.deleteClubById = async (req, res) => {
  try {
    const { id } = req.params;


    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Club ID is required',
      });
    }

   

 
    const deletedClub = await Club.findByIdAndDelete(id);

  
    if (!deletedClub) {
      return res.status(404).json({
        success: false,
        message: 'Club not found',
      });
    }

    
    return res.status(200).json({
      success: true,
      message: 'Club deleted successfully',
      club: deletedClub,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: `Error deleting club: ${error.message}`,
    });
  }
};
