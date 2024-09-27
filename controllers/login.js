const StudentRep = require('../models/studentRep');
const Faculty = require('../models/facultyAdvisor');
const bcrypt = require('bcrypt'); 
const CentralOffice=require('../models/CentralOffice')

exports.login = async (req, res) => {
  try {
    const { uid, password,role } = req.body;

    let user;

    if(role=="studentRep"){
    
     user = await StudentRep.findOne({ eid:uid });
    
    if (user && await bcrypt.compare(password, user.password)) {
      return res.status(200).json({
        success: true,
        message: "Logged in",
        role: "Student Rep",
        user
      });
    }

    return res.status(401).json({
      success: false,
      message: "Wrong credentials"
    });
   
  }

    else if(role=="FacultyAdv"){
    user = await Faculty.findOne({ eid:uid });
    
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
  }

  else {
    user=await CentralOffice.findOne({uid:uid});

    
    if(user && await bcrypt.compare(password,user.password)){
      return res.status(200).json({
        success: true,
        message: "Logged in",
        role: "Cengtral Office",
        user
      });
    }
  

    return res.status(401).json({
      success: false,
      message: "Wrong credentials"
    });
  }
  
     
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`
    });
  }
};
