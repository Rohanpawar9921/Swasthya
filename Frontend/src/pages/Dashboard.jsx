import { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [sensorData, setSensorData] = useState([]);
  const [latestData, setLatestData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [healthInputStats, setHealthInputStats] = useState(null);

  const API_URL = 'http://localhost:5000/api/sensor-data';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    fetchData();
    // Fetch data every 30 seconds for "real-time" updates
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const [dataRes, statsRes, healthStatsRes] = await Promise.all([
        fetch(`${API_URL}/latest`),
        fetch(`${API_URL}/stats`),
        fetch('http://localhost:5000/api/health-input/stats', {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        })
      ]);

      const data = await dataRes.json();
      const statsData = await statsRes.json();
      const healthStats = await healthStatsRes.json();

      setSensorData(data);
      setLatestData(data[0]);
      setStats(statsData);
      setHealthInputStats(healthStats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getAQIClass = (aqi) => {
    if (aqi <= 50) return 'good';
    if (aqi <= 100) return 'moderate';
    if (aqi <= 150) return 'unhealthy-sensitive';
    if (aqi <= 200) return 'unhealthy';
    if (aqi <= 300) return 'very-unhealthy';
    return 'hazardous';
  };

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  };

  if (loading) {
    return (
      <div className="dashboard loading">
        <div className="loader"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Background */}
      <div className="dashboard-background">
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
      </div>

      {/* Header */}
      <header className="dashboard-header glass">
        <div className="header-content">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="header-right">
            {isAuthenticated && (
              <div className="user-info">
                <span className="user-badge">
                  👤 {user?.name} ({user?.role})
                </span>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            )}
            <div className="live-indicator">
              <span className="pulse-dot"></span>
              <span>Live Data</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="dashboard-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Real-Time <span className="gradient-text">Analytics</span>
          </h1>
          <p className="hero-subtitle">
            Monitor air quality metrics and health correlations across multiple locations in real-time
          </p>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="stats-section">
        {stats && (
          <>
            <div className="stat-card-lg glass">
              <div className="stat-label">Average AQI</div>
              <div className={`stat-value aqi-${getAQIClass(stats.avgAQI)}`}>
                {Math.round(stats.avgAQI)}
              </div>
              <div className="stat-sublabel">{getAQILabel(stats.avgAQI)}</div>
            </div>

            <div className="stat-card-lg glass">
              <div className="stat-label">Total Admissions</div>
              <div className="stat-value">{stats.totalAdmissions}</div>
              <div className="stat-sublabel">Hospital Cases</div>
            </div>

            <div className="stat-card-lg glass">
              <div className="stat-label">Health Impact Score</div>
              <div className="stat-value">{stats.avgHealthScore?.toFixed(1) || 'N/A'}</div>
              <div className="stat-sublabel">Average</div>
            </div>

            <div className="stat-card-lg glass">
              <div className="stat-label">Max AQI Recorded</div>
              <div className={`stat-value aqi-${getAQIClass(stats.maxAQI)}`}>
                {stats.maxAQI}
              </div>
              <div className="stat-sublabel">Peak Level</div>
            </div>
          </>
        )}
      </section>

      {/* Health Input Statistics */}
      {healthInputStats && (
        <section className="health-stats-section">
          <div className="section-header">
            <h2>📋 Health Reports Submitted</h2>
          </div>
          <div className="health-stats-grid">
            <div className="health-stat-card glass">
              <div className="stat-icon">👥</div>
              <div className="stat-number">{healthInputStats.userSubmissions || 0}</div>
              <div className="stat-label">User Reports</div>
            </div>
            <div className="health-stat-card glass">
              <div className="stat-icon">🏥</div>
              <div className="stat-number">{healthInputStats.hospitalSubmissions || 0}</div>
              <div className="stat-label">Hospital Reports</div>
            </div>
            <div className="health-stat-card glass">
              <div className="stat-icon">📊</div>
              <div className="stat-number">{healthInputStats.totalSubmissions || 0}</div>
              <div className="stat-label">Total Reports</div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Reading */}
      {latestData && (
        <section className="latest-section">
          <div className="section-header">
            <h2>Latest Reading - {latestData.location.area}</h2>
            <span className="timestamp">
              {new Date(latestData.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="metrics-grid">
            <div className="metric-card glass">
              <div className="metric-icon">🌫️</div>
              <div className="metric-label">PM2.5</div>
              <div className="metric-value">{latestData.airQuality.PM25} <span>µg/m³</span></div>
            </div>

            <div className="metric-card glass">
              <div className="metric-icon">💨</div>
              <div className="metric-label">PM10</div>
              <div className="metric-value">{latestData.airQuality.PM10} <span>µg/m³</span></div>
            </div>

            <div className="metric-card glass">
              <div className="metric-icon">⚗️</div>
              <div className="metric-label">NO₂</div>
              <div className="metric-value">{latestData.airQuality.NO2} <span>ppb</span></div>
            </div>

            <div className="metric-card glass">
              <div className="metric-icon">🌡️</div>
              <div className="metric-label">SO₂</div>
              <div className="metric-value">{latestData.airQuality.SO2} <span>ppb</span></div>
            </div>

            <div className="metric-card glass">
              <div className="metric-icon">☀️</div>
              <div className="metric-label">O₃</div>
              <div className="metric-value">{latestData.airQuality.O3} <span>ppb</span></div>
            </div>

            <div className="metric-card glass">
              <div className="metric-icon">🌡️</div>
              <div className="metric-label">Temperature</div>
              <div className="metric-value">{latestData.weather.temperature}°<span>C</span></div>
            </div>

            <div className="metric-card glass">
              <div className="metric-icon">💧</div>
              <div className="metric-label">Humidity</div>
              <div className="metric-value">{latestData.weather.humidity}<span>%</span></div>
            </div>

            <div className="metric-card glass">
              <div className="metric-icon">🌪️</div>
              <div className="metric-label">Wind Speed</div>
              <div className="metric-value">{latestData.weather.windSpeed} <span>km/h</span></div>
            </div>
          </div>

          {/* Health Impact */}
          <div className="health-impact glass">
            <h3>Health Impact - {latestData.healthImpact.healthImpactClass}</h3>
            <div className="health-stats">
              <div className="health-stat">
                <span className="health-icon">🫁</span>
                <div>
                  <div className="health-value">{latestData.healthImpact.respiratoryCases}</div>
                  <div className="health-label">Respiratory Cases</div>
                </div>
              </div>
              <div className="health-stat">
                <span className="health-icon">❤️</span>
                <div>
                  <div className="health-value">{latestData.healthImpact.cardiovascularCases}</div>
                  <div className="health-label">Cardiovascular Cases</div>
                </div>
              </div>
              <div className="health-stat">
                <span className="health-icon">🏥</span>
                <div>
                  <div className="health-value">{latestData.healthImpact.hospitalAdmissions}</div>
                  <div className="health-label">Hospital Admissions</div>
                </div>
              </div>
              <div className="health-stat">
                <span className="health-icon">📊</span>
                <div>
                  <div className="health-value">{latestData.healthImpact.healthImpactScore}</div>
                  <div className="health-label">Impact Score</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Charts */}
      <section className="charts-section">
        <div className="chart-container glass">
          <div className="chart-header">
            <h3>AQI Trend</h3>
            <button 
              className="btn-learn"
              onClick={() => navigate('/charts/aqi-trend')}
            >
              📚 Learn About This Chart
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData.reverse()}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                stroke="rgba(255,255,255,0.7)"
              />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="airQuality.AQI" 
                stroke="#ff6b6b" 
                strokeWidth={2}
                name="AQI"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glass">
          <div className="chart-header">
            <h3>Pollutants Comparison</h3>
            <button 
              className="btn-learn"
              onClick={() => navigate('/charts/pollutants')}
            >
              📚 Learn About This Chart
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sensorData.slice(0, 5)}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="location.area" 
                stroke="rgba(255,255,255,0.7)"
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Bar dataKey="airQuality.PM25" fill="#8884d8" name="PM2.5" />
              <Bar dataKey="airQuality.PM10" fill="#82ca9d" name="PM10" />
              <Bar dataKey="airQuality.NO2" fill="#ffc658" name="NO₂" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container glass full-width">
          <div className="chart-header">
            <h3>Health Impact Analysis</h3>
            <button 
              className="btn-learn"
              onClick={() => navigate('/charts/health-impact')}
            >
              📚 Learn About This Chart
            </button>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="timestamp" 
                tickFormatter={(time) => new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                stroke="rgba(255,255,255,0.7)"
              />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  border: '1px solid rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="healthImpact.respiratoryCases" stroke="#ff6b6b" name="Respiratory" />
              <Line type="monotone" dataKey="healthImpact.cardiovascularCases" stroke="#4ecdc4" name="Cardiovascular" />
              <Line type="monotone" dataKey="healthImpact.hospitalAdmissions" stroke="#ffe66d" name="Admissions" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="dashboard-footer glass">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Swasthya</h4>
            <p>Real-time air quality monitoring and health impact analysis platform</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/learn-more">Learn More</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <a href="https://www.who.int/health-topics/air-pollution" target="_blank" rel="noopener noreferrer">WHO Air Quality</a>
            <a href="https://www.epa.gov/air-quality" target="_blank" rel="noopener noreferrer">EPA Standards</a>
            <a href="https://cpcb.nic.in/" target="_blank" rel="noopener noreferrer">CPCB India</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>📧 support@swasthya.com</p>
            <p>📞 +91 123 456 7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Swasthya. All rights reserved. | Built for a healthier tomorrow</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
