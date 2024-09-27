const StudentRep = require('../models/studentRep');
const Faculty = require('../models/facultyAdvisor');
const bcrypt = require('bcrypt'); 
const CentralOffice=require('../models/CentralOffice')
const jwt=require('jsonwebtoken');
const JWT_SECRET="subhra"


exports.login = async (req, res) => {
  try {
    const { uid, password,role } = req.body;

    let user;

    if(role=="studentRep"){
    
     user = await StudentRep.findOne({ eid:uid });
    
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

    return res.status(401).json({
      success: false,
      message: "Wrong credentials"
    });
   
  }

    else if(role=="FacultyAdv"){
    user = await Faculty.findOne({ eid:uid });
    
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
