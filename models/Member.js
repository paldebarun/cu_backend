const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  approval: {
    type: Boolean,
    default: false,
  },
  entityType: {
    type: String,
    required: true,
    enum: ['Club', 'Communities', 'ProfessionalSocieties', 'DepartmentalSocieties'],
  },
  entityRef: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'entityType', 
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiry: {
    type: Date,
    required: true,
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
