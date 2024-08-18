const mongoose = require('mongoose');


const Club=new mongoose.Schema({
    ProposedClubName:{
        type:String,
        require:true
    },
    TypeOfEntity:{
     type:String,
     require:true
    },
    CategoryOfEntity:{
        type: String,
        enum: ['a', 'b', 'c'],
        required: true
    },
    ProposedBy:{
     type:String,
     enum:['student','faculty'],
     require:true
    },
    proponentName:{
        type:String,
        require:true
    },
    proponentDepartment:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"Department"
    },
    natureofEntity:{
        type:String,
        enum:['Domain Specific(Skill Based)','Hackathon and Challenge','Invention and incubation','Social Value and Outreach'],
        require:true
    },
    proposedFacultyAdvisor:[
        {
            ProposedFacultyAdvisorName:String,
            ProposedFacultyAdvisorEid:String,
            MobileNumber:String
        }
    ],
    proposedFacultyCoAdvisor:[
        {
            ProposedFacultyCoAdvisorName:String,
            ProposedFacultyCoAdvisorEid:String,
            MobileNumber:String
        }
    ],
    proposedStudentRepresentative:[
        {
            proposedStudentRepresentativeName:String,
            proposedStudentRepresentativeUid:String,
            MobileNumber:String
        }
    ],
    proposedStudentJointRepresentative:[
        {
            proposedStudentRepresentativeName:String,
            proposedStudentRepresentativeUid:String,
            MobileNumber:String
        }
    ],
    ProposedDate:{
        type:Date,
        require:true
    }

})

module.exports=mongoose.model("Club",Club);