const StudentRep = require('../models/studentRep');
const Faculty = require('../models/facultyAdvisor');
const CentralOffice = require('../models/centralOffice');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key'; 

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    let user = await StudentRep.findOne({ uid: username });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, role: 'Student Rep' },
        JWT_SECRET,
        { expiresIn: '1h' } // Set token expiration time
      );
      return res.status(200).json({
        success: true,
        message: "Logged in",
        role: "Student Rep",
        token,  
        user
      });
    }

    user = await Faculty.findOne({ eid: username });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, role: 'Faculty' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({
        success: true,
        message: "Logged in",
        role: "Faculty",
        token,  
        user
      });
    }
    
    user = await CentralOffice.findOne({ eid: username });
    
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user._id, role: 'Central Office' },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({
        success: true,
        message: "Logged in",
        role: "Central Office",
        token, 
        user
      });
    }

    return res.status(401).json({
      success: false,
      message: "Wrong credentials"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};
