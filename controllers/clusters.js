
const mongoose  = require('mongoose');
const Cluster=require('../models/Cluster');


exports.CreateCluster=(req,res)=>{
  try{
   
    const {name}=req.body;
    
    const newCluster=new Cluster({
        name
    });


    const savedCluster= newCluster.save();


    return res.json({
        success:true,
        status:200,
        message:"cluster created successfully",
        savedCluster
    });
   


   
  }
  catch(error){
  return res.json({
    success:false,
    status:300,
    message:`cluster couldn't be saved due to this error: ${error}`
  })

  }
}

exports.DeleteCluster = async (req, res) => {
    try {
      
      const { id } = req.params;
  
     
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Cluster ID is required",
        });
      }
  
      
      const deletedCluster = await Cluster.findByIdAndDelete(id);
  
 
      if (!deletedCluster) {
        return res.status(404).json({
          success: false,
          message: "Cluster not found",
        });
      }
  
   
      return res.status(200).json({
        success: true,
        message: "Cluster deleted successfully",
        deletedCluster,
      });
    } catch (error) {
  
      return res.status(500).json({
        success: false,
        message: `Cluster couldn't be deleted due to this error: ${error}`,
      });
    }
  };


  exports.findAllClusters = async (req, res) => {
    try {
    
      const clusters = await Cluster.find();
  
      
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Clusters retrieved successfully',
        clusters,
      });
    } catch (error) {
      
      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while retrieving clusters: ${error}`,
      });
    }
  };


  exports.findClusterById = async (req, res) => {
    try {
     
      const { id } = req.params;
      
     
      const newId=new mongoose.Types.ObjectId(id);

      console.log("this is id : ",newId);

      if (!newId) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Cluster ID is required',
        });
      }
  
     
      
  
      
      const cluster = await Cluster.findById(newId);
  
   
      if (!cluster) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Cluster not found',
        });
      }
  
    
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Cluster retrieved successfully',
        cluster,
      });
    } catch (error) {

      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while retrieving the cluster: ${error}`,
      });
    }
  };




exports.updateClusterById = async (req, res) => {
  try {
    
    const { id } = req.params;

    
    const { name } = req.body;


    if (!id) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Cluster ID is required',
      });
    }

   
   


    if (!name) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Cluster name is required',
      });
    }

    const updatedCluster = await Cluster.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true } 
    );


    if (!updatedCluster) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Cluster not found',
      });
    }

   
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Cluster updated successfully',
      cluster: updatedCluster,
    });
  } catch (error) {
  
    return res.status(500).json({
      success: false,
      status: 500,
      message: `An error occurred while updating the cluster: ${error.message}`,
    });
  }
};


