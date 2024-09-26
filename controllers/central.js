const CentralOffice = require('../models/centralOffice');
const bcrypt = require('bcrypt');

exports.createCentral = async (req, res) => {
  try {
    const {
      name,
      eid,
      email
      
    } = req.body;

    if (!name || !email || !eid) {
      return res.status(400).json({
        success: false,
        message: 'details are required',
      });
    }



      const hashedPassword = await bcrypt.hash(eid, 10);

      const newcentralOffice = new CentralOffice({
        name,
        eid,
        email,
        password: hashedPassword,
      });

      await newcentralOffice.save();
    

    return res.status(201).json({
      success: true,
      message: 'central office user created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating student representatives: ${error.message}`,
    });
  } 
};
