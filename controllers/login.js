const StudentRep = require('../models/studentRep');
const Faculty = require('../models/facultyAdvisor');
const bcrypt = require('bcrypt'); 


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    let user = await StudentRep.findOne({ emailId:email });
    
    if (user && await bcrypt.compare(password, user.password)) {
      return res.status(200).json({
        success: true,
        message: "Logged in",
        role: "Student Rep",
        user
      });
    }
    
    user = await Faculty.findOne({ emailId:email });
    
    if (user && await bcrypt.compare(password, user.password)) {
      return res.status(200).json({
        success: true,
        message: "Logged in",
        role: "Faculty",
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
