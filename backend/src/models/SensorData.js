import mongoose from 'mongoose';

const sensorDataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  location: {
    area: {
      type: String,
      required: true
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  airQuality: {
    AQI: {
      type: Number,
      required: true
    },
    PM10: Number,
    PM25: Number,
    NO2: Number,
    SO2: Number,
    O3: Number
  },
  weather: {
    temperature: Number,
    humidity: Number,
    windSpeed: Number
  },
  healthImpact: {
    respiratoryCases: Number,
    cardiovascularCases: Number,
    hospitalAdmissions: Number,
    healthImpactScore: Number,
    healthImpactClass: {
      type: String,
      enum: ['Very Low', 'Low', 'Moderate', 'High', 'Very High']
    }
  }
}, {
  timestamps: true
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

export default SensorData;
