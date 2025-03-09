const axios = require('axios');

// POST /ai/predict: Predict fuel consumption and emissions
exports.predictFuel = async (req, res) => {
  try {
    const { distance, trafficSeverity, fuelEfficiency } = req.body;

    // Send data to the AI model server
    const response = await axios.post('http://localhost:8000/predict', {
      distance,
      normalized_traffic_severity: trafficSeverity,
      combined_fuel_efficiency: fuelEfficiency,
    });

    // Return AI predictions
    res.status(200).json(response.data); 
  } catch (error) {
    // adding error for if the model doesn't work
    console.error("AI Model Error:", error.response?.data || error.message);
    res.status(500).json({ error: 'Prediction failed', details: error.message });
  }
};
