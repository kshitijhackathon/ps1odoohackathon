const Student = require('../models/Student');
const Application = require('../models/Application');
const Job = require('../models/Jobs');

const StudentController = {
  // Dashboard
  getDashboard: async (req, res) => {
    try {
      const studentId = req.userId; // Fixed: using req.userId instead of req.user.userId
      
      console.log('Dashboard request - userId:', studentId);
      console.log('Request headers:', req.headers);
      console.log('Request method:', req.method);
      console.log('Request URL:', req.url);
      
      if (!studentId) {
        return res.status(400).json({
          success: false,
          error: 'No userId found in request'
        });
      }
      
      const student = await Student.findById(studentId).populate('applications');
      
      console.log('Student found:', student);
      
      if (!student) {
        return res.status(404).json({
          success: false,
          error: 'Student not found',
          searchedId: studentId
        });
      }
      
      const stats = {
        totalApplications: student.applications ? student.applications.length : 0,
        pendingApplications: student.applications ? student.applications.filter(app => app.status === 'Applied').length : 0,
        shortlistedApplications: student.applications ? student.applications.filter(app => app.status === 'Shortlisted').length : 0,
        placedApplications: student.applications ? student.applications.filter(app => app.status === 'Placed').length : 0
      };

      res.json({
        success: true,
        student,
        stats
      });
    } catch (error) {
      console.log('Dashboard error:', error);
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // Update Profile
  updateProfile: async (req, res) => {
    try {
      const { name, branch, cgpa, skills, phone, address } = req.body;
      const studentId = req.userId; // Fixed: using req.userId

      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        { name, branch, cgpa, skills, phone, address },
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: 'Profile updated successfully',
        student: updatedStudent
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // Upload Resume
  uploadResume: async (req, res) => {
    try {
      const { title, description, url } = req.body;
      const studentId = req.userId; // Fixed: using req.userId

      const student = await Student.findById(studentId);
      student.resumes.push({
        title,
        description,
        url,
        uploadedAt: new Date()
      });
      await student.save();

      res.json({
        success: true,
        message: 'Resume uploaded successfully'
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // View Resumes
  viewResumes: async (req, res) => {
    try {
      const studentId = req.userId; // Fixed: using req.userId
      const student = await Student.findById(studentId);
      
      res.json({
        success: true,
        resumes: student.resumes
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // Apply for Job
  applyForJob: async (req, res) => {
    try {
      const { jobId } = req.params;
      const studentId = req.userId; // Fixed: using req.userId

      // Check if already applied
      const existingApplication = await Application.findOne({
        student: studentId,
        job: jobId
      });

      if (existingApplication) {
        return res.status(400).json({
          success: false,
          message: 'Already applied for this job'
        });
      }

      // Create new application
      const application = new Application({
        student: studentId,
        job: jobId,
        status: 'Applied'
      });
      await application.save();

      // Add to student's applications
      await Student.findByIdAndUpdate(studentId, {
        $push: { applications: application._id }
      });

      // Add to job's applications
      await Job.findByIdAndUpdate(jobId, {
        $push: { applications: application._id }
      });

      res.json({
        success: true,
        message: 'Application submitted successfully',
        application
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  },

  // Get Applications
  getApplications: async (req, res) => {
    try {
      const studentId = req.userId; // Fixed: using req.userId
      const applications = await Application.find({ student: studentId })
        .populate('job')
        .sort({ appliedAt: -1 });

      res.json({
        success: true,
        applications
      });
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }
};

module.exports = StudentController;
