import express from 'express';
import HealthInput from '../models/HealthInput.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Submit health data - only for users and hospitals
router.post('/submit', authenticate, authorize('user', 'hospital'), async (req, res) => {
  try {
    const { location, symptom, disease, hospitalData } = req.body;
    const { role, name, email, _id } = req.user;

    // Validate based on role
    if (role === 'user') {
      // Users can only submit single symptom and disease
      if (!symptom || !disease) {
        return res.status(400).json({ 
          message: 'Symptom and disease are required for user submissions' 
        });
      }
      if (hospitalData && hospitalData.length > 0) {
        return res.status(403).json({ 
          message: 'Users cannot submit hospital data' 
        });
      }
    } else if (role === 'hospital') {
      // Hospitals can submit multiple entries
      if (!hospitalData || hospitalData.length === 0) {
        return res.status(400).json({ 
          message: 'Hospital data array is required for hospital submissions' 
        });
      }
      // Validate each hospital entry
      for (const entry of hospitalData) {
        if (!entry.symptom || !entry.disease) {
          return res.status(400).json({ 
            message: 'Each hospital entry must have symptom and disease' 
          });
        }
      }
    }

    // Validate location
    if (!location || !location.area) {
      return res.status(400).json({ message: 'Location area is required' });
    }

    const healthInput = new HealthInput({
      userId: _id,
      userRole: role,
      userName: name,
      userEmail: email,
      location,
      symptom: role === 'user' ? symptom : undefined,
      disease: role === 'user' ? disease : undefined,
      hospitalData: role === 'hospital' ? hospitalData : undefined
    });

    await healthInput.save();

    res.status(201).json({
      message: 'Health data submitted successfully',
      data: healthInput
    });
  } catch (error) {
    console.error('Error submitting health data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's submissions
router.get('/my-submissions', authenticate, async (req, res) => {
  try {
    const submissions = await HealthInput.find({ 
      userId: req.user._id 
    }).sort({ submittedAt: -1 }).limit(50);

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all submissions - for government (analytics)
router.get('/all', authenticate, authorize('government'), async (req, res) => {
  try {
    const { status, role, limit = 100 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (role) filter.userRole = role;

    const submissions = await HealthInput.find(filter)
      .sort({ submittedAt: -1 })
      .limit(parseInt(limit));

    res.json(submissions);
  } catch (error) {
    console.error('Error fetching all submissions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get statistics - for all authenticated users
router.get('/stats', authenticate, async (req, res) => {
  try {
    const totalSubmissions = await HealthInput.countDocuments();
    const userSubmissions = await HealthInput.countDocuments({ userRole: 'user' });
    const hospitalSubmissions = await HealthInput.countDocuments({ userRole: 'hospital' });
    
    // Get recent submission count
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentSubmissions = await HealthInput.countDocuments({
      submittedAt: { $gte: last24Hours }
    });

    // Get top symptoms and diseases
    const topSymptoms = await HealthInput.aggregate([
      { $match: { userRole: 'user', symptom: { $exists: true } } },
      { $group: { _id: '$symptom', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const topDiseases = await HealthInput.aggregate([
      { $match: { userRole: 'user', disease: { $exists: true } } },
      { $group: { _id: '$disease', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      totalSubmissions,
      userSubmissions,
      hospitalSubmissions,
      recentSubmissions,
      topSymptoms,
      topDiseases
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
