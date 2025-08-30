const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({quiet: true});
const colors = require('colors');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);



connectDB();

// Auth routes (public)
app.use('/api/auth', require('./routes/auth'));

// Protected routes
app.use('/api/student', require('./routes/student'));
app.use('/api/company', require('./routes/company'));
app.use('/api/tpo', require('./routes/tpo'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Odoo Finals API',
    status: 'Server is running successfully!',
    endpoints: {
      auth: '/api/auth',
      student: '/api/student',
      company: '/api/company',
      tpo: '/api/tpo'
    }
  });
});

// 404 handler - using a more specific pattern
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 5700;
app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`.cyan.underline);
});

module.exports = app;