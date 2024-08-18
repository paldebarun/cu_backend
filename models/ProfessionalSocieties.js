const mongoose = require('mongoose');

const ProfessionalSocieties = new mongoose.Schema({
    ProposedSocietyName: {
        type: String,
        required: true
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

module.exports = mongoose.model("ProfessionalSocieties", ProfessionalSocieties);
