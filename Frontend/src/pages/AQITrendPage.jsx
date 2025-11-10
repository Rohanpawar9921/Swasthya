import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import './ChartPages.css';

function AQITrendPage() {
  const { isAuthenticated } = useAuth();
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
      setSensorData(data);
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
        <h1 className="page-title">Air Quality Index (AQI) Trend Analysis</h1>
      </header>

      {/* Chart Section */}
      <section className="chart-section glass">
        <div className="chart-intro">
          <p>Real-time tracking of Air Quality Index across different locations to identify pollution patterns and health risks.</p>
        </div>
        <div className="chart-container-full">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="location.area" 
                stroke="rgba(255,255,255,0.7)"
                style={{ fontSize: '14px' }}
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
              <Line 
                type="monotone" 
                dataKey="airQuality.AQI" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                name="AQI"
                dot={{ fill: '#8b5cf6', r: 6 }}
              />
            </LineChart>
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
            The Air Quality Index (AQI) is a standardized indicator that tells you how clean or polluted the air is, 
            and what associated health effects might be of concern. Understanding AQI trends helps predict health risks 
            and enables timely protective measures for vulnerable populations.
          </p>
        </section>

        {/* Health Impacts */}
        <section className="info-card glass">
          <div className="info-icon">🏥</div>
          <h2>Health Impacts</h2>
          <ul>
            <li>AQI values above 100 can trigger respiratory symptoms in sensitive individuals</li>
            <li>Prolonged exposure to unhealthy AQI levels increases cardiovascular disease risk</li>
            <li>Children, elderly, and people with pre-existing conditions are most vulnerable</li>
            <li>High AQI correlates with increased hospital admissions for asthma and COPD</li>
            <li>Long-term exposure to poor air quality reduces life expectancy</li>
          </ul>
        </section>

        {/* Understanding AQI Values */}
        <section className="info-card glass full-width">
          <div className="info-icon">📊</div>
          <h2>Understanding AQI Values</h2>
          <div className="aqi-ranges">
            <div className="aqi-range good">
              <div className="range-header">
                <span className="range-value">0-50</span>
                <span className="range-label">Good</span>
              </div>
              <p>Air quality is satisfactory, and air pollution poses little or no risk.</p>
            </div>
            <div className="aqi-range moderate">
              <div className="range-header">
                <span className="range-value">51-100</span>
                <span className="range-label">Moderate</span>
              </div>
              <p>Air quality is acceptable; however, some pollutants may affect sensitive individuals.</p>
            </div>
            <div className="aqi-range unhealthy-sensitive">
              <div className="range-header">
                <span className="range-value">101-150</span>
                <span className="range-label">Unhealthy for Sensitive Groups</span>
              </div>
              <p>Sensitive groups may experience health effects. General public is less likely to be affected.</p>
            </div>
            <div className="aqi-range unhealthy">
              <div className="range-header">
                <span className="range-value">151-200</span>
                <span className="range-label">Unhealthy</span>
              </div>
              <p>Everyone may begin to experience health effects; sensitive groups at greater risk.</p>
            </div>
            <div className="aqi-range very-unhealthy">
              <div className="range-header">
                <span className="range-value">201-300</span>
                <span className="range-label">Very Unhealthy</span>
              </div>
              <p>Health alert: everyone may experience more serious health effects.</p>
            </div>
            <div className="aqi-range hazardous">
              <div className="range-header">
                <span className="range-value">300+</span>
                <span className="range-label">Hazardous</span>
              </div>
              <p>Health warnings of emergency conditions. Entire population is likely to be affected.</p>
            </div>
          </div>
        </section>

        {/* Key Insights */}
        <section className="info-card glass full-width">
          <div className="info-icon">💡</div>
          <h2>Key Insights</h2>
          <ul>
            <li>AQI is calculated based on five major pollutants: PM2.5, PM10, NO₂, SO₂, and O₃</li>
            <li>The highest individual pollutant value determines the overall AQI</li>
            <li>Real-time monitoring enables immediate alerts during pollution spikes</li>
            <li>Location-specific trends help identify pollution hotspots and sources</li>
            <li>Seasonal variations show patterns like winter smog and summer ozone formation</li>
          </ul>
        </section>

        {/* Data Sources */}
        <section className="info-card glass full-width">
          <div className="info-icon">📚</div>
          <h2>Data Sources & Standards</h2>
          <ul className="sources-list">
            <li>World Health Organization (WHO) - Air Quality Guidelines 2021</li>
            <li>US Environmental Protection Agency (EPA) - Air Quality Index Technical Assistance Document</li>
            <li>Central Pollution Control Board (CPCB) - National Air Quality Index</li>
            <li>ISO 14001:2015 - Environmental Management Systems</li>
          </ul>
        </section>
      </div>

      {/* Action Section */}
      <section className="action-section glass">
        <h2>Take Action</h2>
        <p>Understanding AQI is the first step towards protecting your health. Stay informed and take preventive measures.</p>
        <div className="action-buttons">
          <Link to="/learn-more" className="btn-primary">Learn More About Air Quality</Link>
          <Link to="/dashboard" className="btn-secondary">Back to Dashboard</Link>
        </div>
      </section>
    </div>
  );
}

export default AQITrendPage;
