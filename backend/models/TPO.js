// models/TPO.js
const mongoose = require('mongoose');

const TPOSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  // password field removed as User model handles authentication
  phone: { 
    type: String 
  },
  address: { 
    type: String 
  },
  instituteName: { 
    type: String, 
    required: true 
  },
  contactNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('TPO', TPOSchema);
