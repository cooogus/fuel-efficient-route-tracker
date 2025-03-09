const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware'); // Protects the route

const router = express.Router();

// GET /dashboard - Fetch aggregated user sustainability statistics
router.get('/', authMiddleware, getDashboardStats);

module.exports = router;
