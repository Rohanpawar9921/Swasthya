import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './HealthInputModal.css';

function HealthInputModal({ isOpen, onClose, onSubmitSuccess }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // User form state (single entry)
  const [userForm, setUserForm] = useState({
    location: '',
    symptom: '',
    disease: ''
  });

  // Hospital form state (multiple entries)
  const [hospitalEntries, setHospitalEntries] = useState([
    { symptom: '', disease: '', patientCount: 1, category: 'other' }
  ]);
  const [hospitalLocation, setHospitalLocation] = useState('');

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/health-input/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location: { area: userForm.location },
          symptom: userForm.symptom,
          disease: userForm.disease
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit data');
      }

      setSuccess('Your health data has been submitted successfully!');
      setUserForm({ location: '', symptom: '', disease: '' });
      
      setTimeout(() => {
        onSubmitSuccess && onSubmitSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleHospitalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/health-input/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          location: { area: hospitalLocation },
          hospitalData: hospitalEntries
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit data');
      }

      setSuccess('Hospital data has been submitted successfully!');
      setHospitalLocation('');
      setHospitalEntries([{ symptom: '', disease: '', patientCount: 1, category: 'other' }]);
      
      setTimeout(() => {
        onSubmitSuccess && onSubmitSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addHospitalEntry = () => {
    setHospitalEntries([...hospitalEntries, { symptom: '', disease: '', patientCount: 1, category: 'other' }]);
  };

  const removeHospitalEntry = (index) => {
    if (hospitalEntries.length > 1) {
      setHospitalEntries(hospitalEntries.filter((_, i) => i !== index));
    }
  };

  const updateHospitalEntry = (index, field, value) => {
    const updated = [...hospitalEntries];
    updated[index][field] = value;
    setHospitalEntries(updated);
  };

  if (!isOpen) return null;
  if (!user) return null; // Safety check

  return (
    <div className="health-modal-overlay" onClick={onClose}>
      <div className="health-modal glass" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {user?.role === 'hospital' ? '🏥 Submit Hospital Data' : '📋 Report Health Issue'}
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && (
          <div className="alert alert-error">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            ✓ {success}
          </div>
        )}

        {user?.role === 'user' && (
          <form onSubmit={handleUserSubmit} className="health-form">
            <div className="form-group">
              <label>📍 Your Location</label>
              <input
                type="text"
                placeholder="e.g., Mumbai, Andheri"
                value={userForm.location}
                onChange={(e) => setUserForm({ ...userForm, location: e.target.value })}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>🤒 Symptom</label>
              <input
                type="text"
                placeholder="e.g., Cough, Fever, Breathing difficulty"
                value={userForm.symptom}
                onChange={(e) => setUserForm({ ...userForm, symptom: e.target.value })}
                required
                disabled={loading}
              />
              <small>Describe your primary symptom</small>
            </div>

            <div className="form-group">
              <label>🏥 Disease/Condition</label>
              <input
                type="text"
                placeholder="e.g., Asthma, Bronchitis, Cold"
                value={userForm.disease}
                onChange={(e) => setUserForm({ ...userForm, disease: e.target.value })}
                required
                disabled={loading}
              />
              <small>If diagnosed, mention the condition</small>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        )}

        {user?.role === 'hospital' && (
          <form onSubmit={handleHospitalSubmit} className="health-form">
            <div className="form-group">
              <label>📍 Hospital Location</label>
              <input
                type="text"
                placeholder="e.g., Mumbai, Andheri"
                value={hospitalLocation}
                onChange={(e) => setHospitalLocation(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="hospital-entries">
              <div className="entries-header">
                <h3>Patient Cases ({hospitalEntries.length})</h3>
                <button 
                  type="button" 
                  className="btn-add-entry" 
                  onClick={addHospitalEntry}
                  disabled={loading}
                >
                  + Add Entry
                </button>
              </div>

              {hospitalEntries.map((entry, index) => (
                <div key={index} className="hospital-entry glass-inner">
                  <div className="entry-header">
                    <span className="entry-number">Entry #{index + 1}</span>
                    {hospitalEntries.length > 1 && (
                      <button 
                        type="button" 
                        className="btn-remove" 
                        onClick={() => removeHospitalEntry(index)}
                        disabled={loading}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Symptom</label>
                      <input
                        type="text"
                        placeholder="Primary symptom"
                        value={entry.symptom}
                        onChange={(e) => updateHospitalEntry(index, 'symptom', e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label>Disease</label>
                      <input
                        type="text"
                        placeholder="Diagnosed condition"
                        value={entry.disease}
                        onChange={(e) => updateHospitalEntry(index, 'disease', e.target.value)}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Patient Count</label>
                      <input
                        type="number"
                        min="1"
                        value={entry.patientCount}
                        onChange={(e) => updateHospitalEntry(index, 'patientCount', parseInt(e.target.value))}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="form-group">
                      <label>Category</label>
                      <select
                        value={entry.category}
                        onChange={(e) => updateHospitalEntry(index, 'category', e.target.value)}
                        disabled={loading}
                      >
                        <option value="respiratory">Respiratory</option>
                        <option value="cardiovascular">Cardiovascular</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? 'Submitting...' : `Submit ${hospitalEntries.length} Case(s)`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default HealthInputModal;
