import mongoose from 'mongoose';

const healthInputSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userRole: {
    type: String,
    enum: ['user', 'hospital'],
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
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
  // For regular users (single input)
  symptom: {
    type: String,
    trim: true
  },
  disease: {
    type: String,
    trim: true
  },
  // For hospitals (multiple inputs)
  hospitalData: [{
    symptom: {
      type: String,
      trim: true
    },
    disease: {
      type: String,
      trim: true
    },
    patientCount: {
      type: Number,
      default: 1
    },
    category: {
      type: String,
      enum: ['respiratory', 'cardiovascular', 'other'],
      default: 'other'
    }
  }],
  status: {
    type: String,
    enum: ['pending', 'processed', 'archived'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
healthInputSchema.index({ userId: 1, submittedAt: -1 });
healthInputSchema.index({ userRole: 1, status: 1 });
healthInputSchema.index({ 'location.area': 1 });

const HealthInput = mongoose.model('HealthInput', healthInputSchema);

export default HealthInput;
