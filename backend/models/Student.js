const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String,
    required: true 
  },
  rollNumber: { 
    type: String,
    required: true
  },
  branch: { 
    type: String
    // made optional for initial registration
  },
  graduationYear: { 
    type: Number,
    required: true 
  },
  cgpa: { 
    type: Number
    // made optional for initial registration
  },
  skills: [{ 
    type: String 
  }],
  // relations
  applications: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Application' 
  }],
  resumes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Resume' 
  }],
  placementHistory: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PlacementHistory' 
  }]
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);