import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartPages.css';

function PollutantsPage() {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000/api/sensor-data';

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_URL}/latest`);
      const data = await response.json();
      setSensorData(data.slice(0, 5)); // Show top 5 locations
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="chart-page loading">
        <div className="loader"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="chart-page">
      {/* Background */}
      <div className="chart-background">
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
        <div className="sphere sphere-3"></div>
      </div>

      {/* Header */}
      <header className="chart-header glass">
        <Link to="/dashboard" className="back-link">← Back to Dashboard</Link>
        <h1 className="page-title">Pollutants Comparison Analysis</h1>
      </header>

      {/* Chart Section */}
      <section className="chart-section glass">
        <div className="chart-intro">
          <p>Comparative analysis of major air pollutants (PM2.5, PM10, NO₂, SO₂, O₃) to understand pollution composition and sources.</p>
        </div>
        <div className="chart-container-full">
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="location.area" 
                stroke="rgba(255,255,255,0.7)"
                style={{ fontSize: '14px' }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                style={{ fontSize: '14px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 23, 42, 0.95)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  color: 'white'
                }}
              />
              <Legend />
              <Bar dataKey="airQuality.PM25" fill="#60a5fa" name="PM2.5 (µg/m³)" />
              <Bar dataKey="airQuality.PM10" fill="#34d399" name="PM10 (µg/m³)" />
              <Bar dataKey="airQuality.NO2" fill="#f59e0b" name="NO₂ (µg/m³)" />
              <Bar dataKey="airQuality.SO2" fill="#ef4444" name="SO₂ (µg/m³)" />
              <Bar dataKey="airQuality.O3" fill="#a78bfa" name="O₃ (µg/m³)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Information Grid */}
      <div className="info-grid">
        {/* Why This Matters */}
        <section className="info-card glass">
          <div className="info-icon">🎯</div>
          <h2>Why This Matters</h2>
          <p>
            Different pollutants have different sources and health impacts. Understanding the pollutant mix helps identify 
            pollution sources (industrial, vehicular, biomass burning) and enables targeted intervention strategies. Each 
            pollutant affects the body differently, requiring specific health advisories.
          </p>
        </section>

        {/* Pollutant Details */}
        <section className="info-card glass">
          <div className="info-icon">🔬</div>
          <h2>Pollutant Types</h2>
          <div className="pollutant-list">
            <div className="pollutant-item">
              <strong style={{ color: '#60a5fa' }}>PM2.5</strong>
              <p>Fine particles (&lt;2.5μm) that penetrate deep into lungs</p>
            </div>
            <div className="pollutant-item">
              <strong style={{ color: '#34d399' }}>PM10</strong>
              <p>Coarse particles (&lt;10μm) from dust and construction</p>
            </div>
            <div className="pollutant-item">
              <strong style={{ color: '#f59e0b' }}>NO₂</strong>
              <p>Nitrogen Dioxide from vehicle emissions and combustion</p>
            </div>
            <div className="pollutant-item">
              <strong style={{ color: '#ef4444' }}>SO₂</strong>
              <p>Sulfur Dioxide from industrial processes and fuel burning</p>
            </div>
            <div className="pollutant-item">
              <strong style={{ color: '#a78bfa' }}>O₃</strong>
              <p>Ground-level Ozone formed by sunlight reacting with pollutants</p>
            </div>
          </div>
        </section>

        {/* Health Impacts */}
        <section className="info-card glass full-width">
          <div className="info-icon">🏥</div>
          <h2>Health Impacts by Pollutant</h2>
          <ul>
            <li><strong>PM2.5:</strong> Penetrates deep into lungs causing respiratory and cardiovascular diseases, linked to premature death</li>
            <li><strong>PM10:</strong> Causes breathing difficulties, aggravates asthma and bronchitis, eye irritation</li>
            <li><strong>NO₂:</strong> Irritates airways, reduces lung function, increases susceptibility to respiratory infections</li>
            <li><strong>SO₂:</strong> Causes breathing problems, especially for asthmatics and during physical activity</li>
            <li><strong>O₃:</strong> Triggers asthma attacks, reduces lung function, causes chest pain and throat irritation</li>
          </ul>
        </section>

        {/* Interpretation */}
        <section className="info-card glass full-width">
          <div className="info-icon">📊</div>
          <h2>How to Interpret This Data</h2>
          <ul>
            <li>PM2.5 is the primary indicator for health risk assessment due to its ability to penetrate deep into the body</li>
            <li>High PM10 without high PM2.5 often indicates dust or construction activity</li>
            <li>Elevated NO₂ levels typically indicate heavy traffic congestion and vehicular emissions</li>
            <li>SO₂ spikes often correlate with industrial activities and fossil fuel combustion</li>
            <li>O₃ forms during sunny days from reactions between NOx and volatile organic compounds (photochemical smog)</li>
            <li>Simultaneous elevation of multiple pollutants indicates severe air quality episodes requiring immediate action</li>
          </ul>
        </section>

        {/* Data Sources */}
        <section className="info-card glass full-width">
          <div className="info-icon">📚</div>
          <h2>Data Sources & Standards</h2>
          <ul className="sources-list">
            <li>WHO Global Air Quality Guidelines (2021) - Pollutant-specific health thresholds</li>
            <li>National Ambient Air Quality Standards (NAAQS) - Regulatory limits for each pollutant</li>
            <li>US EPA - Criteria Air Pollutants documentation and health effects</li>
            <li>Research: Health Effects Institute studies on pollutant-specific impacts</li>
          </ul>
        </section>
      </div>

      {/* Action Section */}
      <section className="action-section glass">
        <h2>Take Action</h2>
        <p>Understanding pollutant composition helps you make informed decisions about outdoor activities and protective measures.</p>
        <div className="action-buttons">
          <Link to="/learn-more" className="btn-primary">Learn More About Air Quality</Link>
          <Link to="/dashboard" className="btn-secondary">Back to Dashboard</Link>
        </div>
      </section>
    </div>
  );
}

export default PollutantsPage;
