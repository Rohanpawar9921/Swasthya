import express from 'express';
import SensorData from '../models/SensorData.js';

const router = express.Router();

// Get all sensor data
router.get('/', async (req, res) => {
  try {
    const sensorData = await SensorData.find().sort({ timestamp: -1 }).limit(50);
    res.json(sensorData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get latest sensor data
router.get('/latest', async (req, res) => {
  try {
    const latestData = await SensorData.find().sort({ timestamp: -1 }).limit(10);
    res.json(latestData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get sensor data by location
router.get('/location/:area', async (req, res) => {
  try {
    const data = await SensorData.find({ 'location.area': req.params.area })
      .sort({ timestamp: -1 })
      .limit(20);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new sensor data entry
router.post('/', async (req, res) => {
  const sensorData = new SensorData(req.body);
  
  try {
    const newData = await sensorData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get statistics
router.get('/stats', async (req, res) => {
  try {
    const stats = await SensorData.aggregate([
      {
        $group: {
          _id: null,
          avgAQI: { $avg: '$airQuality.AQI' },
          maxAQI: { $max: '$airQuality.AQI' },
          minAQI: { $min: '$airQuality.AQI' },
          totalAdmissions: { $sum: '$healthImpact.hospitalAdmissions' },
          avgHealthScore: { $avg: '$healthImpact.healthImpactScore' }
        }
      }
    ]);
    res.json(stats[0] || {});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
