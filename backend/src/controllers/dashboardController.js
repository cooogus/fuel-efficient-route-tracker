const Route = require('../models/Route');

exports.getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId; // Get logged-in user's ID

    // Aggregate total fuel saved and CO₂ emissions reduced
    const stats = await Route.aggregate([
      { $match: { userId } }, // Filter only routes belonging to this user
      {
        $group: {
          _id: null,
          totalFuelSaved: { $sum: "$fuelSaved" }, // Assuming `fuelSaved` exists in Route model
          totalCO2Reduced: { $sum: "$co2Reduction" } // Assuming `co2Reduction` exists in Route model
        }
      }
    ]);

    if (!stats.length) {
      return res.status(404).json({ error: "No sustainability data found for this user." });
    }

    // Generate improvement suggestions based on efficiency
    const improvementSuggestions = [];
    if (stats[0].totalFuelSaved < 5) {
      improvementSuggestions.push("Consider carpooling or optimizing routes for fuel efficiency.");
    }
    if (stats[0].totalCO2Reduced < 10) {
      improvementSuggestions.push("Explore eco-friendly vehicle options or reduce idling time.");
    }

    res.status(200).json({
      message: "Sustainability dashboard data retrieved successfully",
      totalFuelSaved: stats[0].totalFuelSaved,
      totalCO2Reduced: stats[0].totalCO2Reduced,
      improvementSuggestions
    });

  } catch (error) {
    console.error("Dashboard Error:", error.message);
    res.status(500).json({ error: "Failed to retrieve dashboard data", details: error.message });
  }
};
