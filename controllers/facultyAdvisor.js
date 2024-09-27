const Faculty = require('../models/facultyAdvisor');
const bcrypt = require('bcrypt');

exports.createFaculty = async (req, res, requiredDepartment, requiredCluster, requiredInstitute, savedEntity) => {
  try {
    const {
      proposedFacultyAdvisor,
      proposedFacultyCoAdvisor
    } = req.body;

    if (!proposedFacultyAdvisor || !proposedFacultyCoAdvisor) {
      return res.status(400).json({
        success: false,
        message: 'Faculty advisors are required',
      });
    }

    const advisors = [...proposedFacultyAdvisor, ...proposedFacultyCoAdvisor];

    for (const advisor of advisors) {
      let { ProposedFacultyAdvisorName, ProposedFacultyAdvisorEid,ProposedFacultyCoAdvisorEid, MobileNumber, emailId } = advisor;
      var hashedPassword;
      if(ProposedFacultyAdvisorEid){
       hashedPassword = await bcrypt.hash(ProposedFacultyAdvisorEid, 10);
      }
      else{

        hashedPassword = await bcrypt.hash(ProposedFacultyCoAdvisorEid,10);
        ProposedFacultyAdvisorEid = ProposedFacultyCoAdvisorEid;
      }

      const newFaculty = new Faculty({
        name:ProposedFacultyAdvisorName,
        department: requiredDepartment._id,
        institute: requiredInstitute._id,
        cluster: requiredCluster._id,
        eid:ProposedFacultyAdvisorEid,
        phone:MobileNumber,
        emailId,
        club: savedEntity._id,
        password: hashedPassword,
      });

      await newFaculty.save();
    }

    return{
      success: true,
      message: 'Faculty advisor created successfully',
    };
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error creating Faculty advisor: ${error.message}`,
    });
  } 
};


exports.getFacultyById = async (req, res) => {
  try {
    const { id } = req.params;

    

    // Find the faculty advisor by ID
    const facultyAdvisor = await Faculty.findById(id)
      .populate('department')
      .populate('institute')
      .populate('cluster')
       // If it's associated with a community

    // If no faculty advisor found
    if (!facultyAdvisor) {
      return res.status(404).json({
        success: false,
        message: 'Faculty advisor not found',
      });
    }

    // If faculty advisor is found
    return res.status(200).json({
      success: true,
      facultyAdvisor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Error fetching faculty advisor: ${error.message}`,
    });
  }
};
