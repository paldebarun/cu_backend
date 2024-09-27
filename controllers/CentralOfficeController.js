const Department = require('../models/Department');
const bcrypt = require('bcrypt'); 
const CentralOffice = require('../models/CentralOffice');

exports.createCentralOffice = async (req, res) => {
  try {
    const {
      name,
      department, 
      uid,
      phone,
      emailId,
      experience,
    } = req.body;


    if (!name || !department || !uid || !phone || !emailId || !experience) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, department, uid, phone, emailId, experience.',
      });
    }

    
    const requiredDepartment = await Department.findOne({ name: department });

    if (!requiredDepartment) {
      return res.status(404).json({
        success: false,
        message: 'Department not found, cannot create Central Office.',
      });
    }


    const hashedPassword = await bcrypt.hash(uid, 10);

 
    const newCentralOffice = new CentralOffice({
      name,
      department: requiredDepartment._id,
      uid,
      phone,
      emailId,
      experience,
      password: hashedPassword,
    });


    const savedCentralOffice = await newCentralOffice.save();

    return res.status(201).json({
      success: true,
      message: 'Central Office created successfully',
      centralOffice: savedCentralOffice,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating Central Office: ${error.message}`,
    });
  }
};


exports.getCentralOfficeById = async (req, res) => {
    try {
      const { id } = req.params;
  
    
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Central Office ID is required.',
        });
      }
  
 
      const centralOffice = await CentralOffice.findById(id).populate('department');
  

      if (!centralOffice) {
        return res.status(404).json({
          success: false,
          message: 'Central Office not found.',
        });
      }
  

      return res.status(200).json({
        success: true,
        message: 'Central Office retrieved successfully',
        centralOffice,
      });
  
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Error retrieving Central Office: ${error.message}`,
      });
    }
  };