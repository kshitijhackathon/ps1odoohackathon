const router = require('express').Router();
const { verifyToken, authorizeRoles } = require('../config/auth');
const CompanyController = require('../controllers/CompanyController');

router.use(verifyToken, authorizeRoles('company'));

router.post('/jobs', CompanyController.createJob);
router.get('/jobs', CompanyController.getJobs);
router.get('/applications', CompanyController.getApplications);
router.post('/offers', CompanyController.createOffer);
router.put('/offers/:offerId', CompanyController.updateOffer);

module.exports = router;