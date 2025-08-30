const Company = require('../models/Company');
const Job = require('../models/Jobs');
const Application = require('../models/Application');
const Offer = require('../models/Offer');

const CompanyController = {
  // Create Job
  createJob: async (req, res) => {
    try {
      const {
        title,
        description,
        location,
        package,
        eligibilityCriteria,
        deadline,
        compensation,
        timeline
      } = req.body;

      const companyId = req.userId; // Fixed: using req.userId

      const job = new Job({
        title,
        description,
        location,
        package,
        eligibilityCriteria,
        company: companyId,
        deadline,
        compensation,
        timeline
      });

      await job.save();

      // Add job to company
      await Company.findByIdAndUpdate(companyId, {
        $push: { jobs: job._id }
      });

      res.json({
        success: true,
        message: 'Job created successfully',
        job
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  // Get Jobs
  getJobs: async (req, res) => {
    try {
      const companyId = req.userId; // Fixed: using req.userId
      const jobs = await Job.find({ company: companyId })
        .populate('applications')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        jobs
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
      const companyId = req.userId; // Fixed: using req.userId
      const applications = await Application.find()
        .populate({
          path: 'job',
          match: { company: companyId }
        })
        .populate('student')
        .sort({ appliedAt: -1 });

      // Filter applications for this company
      const companyApplications = applications.filter(app => app.job);

      res.json({
        success: true,
        applications: companyApplications
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  // Create Offer
  createOffer: async (req, res) => {
    try {
      const {
        studentId,
        jobId,
        offerLetterURL,
        package
      } = req.body;

      const companyId = req.userId; // Fixed: using req.userId

      const offer = new Offer({
        student: studentId,
        job: jobId,
        company: companyId,
        offerLetterURL,
        package
      });

      await offer.save();

      res.json({
        success: true,
        message: 'Offer created successfully',
        offer
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  },

  // Update Offer
  updateOffer: async (req, res) => {
    try {
      const { offerId } = req.params;
      const updateData = req.body;

      const offer = await Offer.findByIdAndUpdate(
        offerId,
        updateData,
        { new: true, runValidators: true }
      );

      if (!offer) {
        return res.status(404).json({
          success: false,
          message: 'Offer not found'
        });
      }

      res.json({
        success: true,
        message: 'Offer updated successfully',
        offer
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
};

module.exports = CompanyController;
