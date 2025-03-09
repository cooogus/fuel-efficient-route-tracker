const mongoose = require('mongoose');

// Define the Route schema
const RouteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stops: { type: Array, required: true }, // List of stops
  regularRoute: { type: Object, required: true }, // Regular route data
  // removed required: true from these two fields for now for testing
  // just waiting for ai team to finish the model 
  optimizedRoute: { type: Object}, // Optimized route data
  fuelSaved: { type: Number, default: 0}, // Fuel consumption for optimized route
  co2Reduction: { type: Number, default: 0} // co2 reduction per trip
});

module.exports = mongoose.model('Route', RouteSchema);
