const Department = require('../models/Department');

exports.CreateDepartment = async (req, res) => {
  try {
    
    const { name } = req.body;


    if (!name) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Department name is required',
      });
    }

    
    const newDepartment = new Department({ name });

    
    const savedDepartment = await newDepartment.save();


    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Department created successfully',
      department: savedDepartment,
    });
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      status: 500,
      message: `Department couldn't be saved due to this error: ${error.message}`,
    });
  }
};

exports.findAllDepartments = async (req, res) => {
    try {
     
      const departments = await Department.find();
  
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Departments retrieved successfully',
        departments,
      });
    } catch (error) {
   
      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while retrieving departments: ${error.message}`,
      });
    }
  };

  exports.findDepartmentById = async (req, res) => {
    try {
  
      const { id } = req.params;
  
      
      if (!id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Department ID is required',
        });
      }
  
  
     
  

      const department = await Department.findById(id);
  

      if (!department) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Department not found',
        });
      }
  
  
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Department retrieved successfully',
        department,
      });
    } catch (error) {

      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while retrieving the department: ${error.message}`,
      });
    }
  };



exports.updateDepartmentById = async (req, res) => {
    try {

      const { id } = req.params;
  

      if (!id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Department ID is required',
        });
      }
  
   
     
  
  
      const { name } = req.body;
  
  
      if (!name) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Department name is required',
        });
      }
  
    
      const updatedDepartment = await Department.findByIdAndUpdate(
        id,
        { name },
        { new: true, runValidators: true } 
      );
  
      
      if (!updatedDepartment) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Department not found',
        });
      }
  
      
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Department updated successfully',
        department: updatedDepartment,
      });
    } catch (error) {
   
      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while updating the department: ${error.message}`,
      });
    }
  };
  

  
exports.deleteDepartmentById = async (req, res) => {
    try {
     
      const { id } = req.params;
  
      
      if (!id) {
        return res.status(400).json({
          success: false,
          status: 400,
          message: 'Department ID is required',
        });
      }
  
      
     
  
     
      const deletedDepartment = await Department.findByIdAndDelete(id);
  
      
      if (!deletedDepartment) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: 'Department not found',
        });
      }
  
    
      return res.status(200).json({
        success: true,
        status: 200,
        message: 'Department deleted successfully',
        department: deletedDepartment,
      });
    } catch (error) {
     
      return res.status(500).json({
        success: false,
        status: 500,
        message: `An error occurred while deleting the department: ${error.message}`,
      });
    }
  };
  

