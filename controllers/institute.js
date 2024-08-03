const Institute = require('../models/Institute');



exports.CreateInstitute = async (req, res) => {
  try {
    
    const { name } = req.body;


    if (!name) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Institute name is required',
      });
    }

    
    const newInstitute = new Institute({ name });

    
    const savedInstitute = await newInstitute.save();


    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Institute created successfully',
      Institute: savedInstitute,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      status: 500,
      message: `Institute couldn't be saved due to this error: ${error.message}`,
    });
  }
};

exports.findAllInstitute = async (req, res) => {
    try {
     
      const institutes = await Institute.find();
  
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Institute retrieved successfully',
        institutes,
      });
    } catch (error) {
   
      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while retrieving institute: ${error.message}`,
      });
    }
  };

  exports.findInstituteById = async (req, res) => {
    try {
  
      const { id } = req.params;
  
      
      if (!id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Institute ID is required',
        });
      }
  
  
     
  

      const institute = await Institute.findById(id);
  

      if (!institute) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Institute not found',
        });
      }
  
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Institute retrieved successfully',
        institute,
      });
    } catch (error) {

      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while retrieving the institute: ${error.message}`,
      });
    }
  };



exports.updateInstituteById = async (req, res) => {
    try {

      const { id } = req.params;
  

      if (!id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Institute ID is required',
        });
      }

  
      const { name } = req.body;
  
  
      if (!name) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Institute name is required',
        });
      }
  
    
      const updatedInstitute = await Institute.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true } 
      );
  
      
      if (!updatedInstitute) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Institute not found',
        });
      }
  
      
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Institute updated successfully',
        institute: updatedInstitute,
      });
    } catch (error) {
   
      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while updating the institute: ${error.message}`,
      });
    }
  };
  

  
exports.deleteInstituteById = async (req, res) => {
    try {
     
      const { id } = req.params;
  
      
      if (!id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Institute ID is required',
        });
      }
  
      
     
  
     
      const deletedInstitute = await Institute.findByIdAndDelete(id);
  
      
      if (!deletedInstitute) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Institute not found',
        });
      }
  
    
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Institute deleted successfully',
        institute: deletedInstitute,
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while deleting the institute: ${error.message}`,
      });
    }
  };
  

