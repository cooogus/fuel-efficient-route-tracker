from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

# Initialize the Flask application
app = Flask(__name__)
CORS(app) # enable cors for all routes 

# Load the Pre-trained Models
fuel_model = load_model('models/fuel_consumption_model.h5')
co2_model = load_model('models/co2_emissions_model.h5')

# Prediction Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    """
    This endpoint expects a JSON payload with:
      - distance (float)
      - normalized_traffic_severity (float)
      - combined_fuel_efficiency (float)
    It returns:
      - fuel_consumption: Estimated fuel consumption.
      - co2_emissions: Estimated CO₂ emissions.
    """
    data = request.get_json(force=True)
    try:
        distance = float(data['distance'])
        normalized_traffic_severity = float(data['normalized_traffic_severity'])
        combined_fuel_efficiency = float(data['combined_fuel_efficiency'])
    except (KeyError, ValueError):
        return jsonify({
            'error': 'Invalid input. Provide distance, normalized_traffic_severity, and combined_fuel_efficiency as numbers.'
        }), 400

    input_features = np.array([[distance, normalized_traffic_severity, combined_fuel_efficiency]])
    fuel_prediction = fuel_model.predict(input_features)
    co2_prediction = co2_model.predict(input_features)

    response = {
        'fuel_consumption': float(fuel_prediction[0][0]),
        'co2_emissions': float(co2_prediction[0][0])
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
