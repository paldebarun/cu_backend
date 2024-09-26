const mongoose = require('mongoose');

const Communities = new mongoose.Schema({
    ProposedEntityName: {
        type: String,
        required: true
    },

    EntityDepartment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department"
    },
    EntityInstitute:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Institute"
    },
    EntityCluster:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cluster"
    },
   
    TypeOfEntity: {
        type: String,
        required: true
    },
    CategoryOfEntity: {
        type: String,
        enum: ['a', 'b', 'c'],
        required: true
    },
    ProposedBy: {
        type: String,
        enum: ['student', 'faculty'],
        required: true
    },
    proponentName: {
        type: String,
        required: true
    },
    proponentDepartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },
    natureofEntity: {
        type: String,
        enum: ['Domain Specific(Skill Based)', 'Hackathon and Challenge', 'Invention and incubation', 'Social Value and Outreach'],
        required: true
    },
    proposedFacultyAdvisor: [
        {
            ProposedFacultyAdvisorName: String,
            ProposedFacultyAdvisorEid: String,
            MobileNumber: String
        }
    ],
    proposedFacultyCoAdvisor: [
        {
            ProposedFacultyCoAdvisorName: String,
            ProposedFacultyCoAdvisorEid: String,
            MobileNumber: String
        }
    ],
    proposedStudentRepresentative: [
        {
            proposedStudentRepresentativeName: String,
            proposedStudentRepresentativeUid: String,
            MobileNumber: String
        }
    ],
    proposedStudentJointRepresentative: [
        {
            proposedStudentRepresentativeName: String,
            proposedStudentRepresentativeUid: String,
            MobileNumber: String
        }
    ],
    ProposedDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Communities", Communities);
