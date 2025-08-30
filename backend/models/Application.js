const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Student' 
  },
  job: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job' 
  },
  status: { 
    type: String, 
    enum: ['Applied', 'Test', 'Shortlisted', 'Interview', 'Offer', 'Rejected', 'Placed'] 
  },
  appliedAt: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', applicationSchema);
