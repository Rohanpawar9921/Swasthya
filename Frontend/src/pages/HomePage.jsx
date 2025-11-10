import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';

function HomePage() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="homepage">
      {/* Animated background */}
      <div className="background-animation">
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
        <div className="sphere sphere-3"></div>
      </div>

      {/* Navigation */}
      <nav className="nav-glass">
        <div className="nav-container">
          <div className="logo">
            <span className="logo-icon">🌍</span>
            <span className="logo-text">Swasthya</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            {isAuthenticated ? (
              <>
                <span className="user-badge">
                  👤 {user?.name} ({user?.role})
                </span>
                <button onClick={handleLogout} className="btn-glass">Logout</button>
              </>
            ) : (
              <Link to="/login" className="btn-glass">Login</Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Real-Time Air Quality &<br />
            <span className="gradient-text">Health Correlation Analysis</span>
          </h1>
          <p className="hero-subtitle">
            Analyzing the relationship between live air pollution levels and disease spread
            using IoT sensors and federated learning for better public health decisions.
          </p>
          <div className="hero-buttons">
            <Link to="/dashboard" className="btn-primary">
              View Dashboard
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/learn-more" className="btn-secondary">
              Learn More
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card glass">
              <div className="stat-icon">📊</div>
              <div className="stat-number">24/7</div>
              <div className="stat-label">Live Monitoring</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-icon">🏥</div>
              <div className="stat-number">5+</div>
              <div className="stat-label">Hospital Partners</div>
            </div>
            <div className="stat-card glass">
              <div className="stat-icon">🌡️</div>
              <div className="stat-number">50+</div>
              <div className="stat-label">IoT Sensors</div>
            </div>
          </div>
        </div>

        {/* 3D Card */}
        <div className="hero-visual">
          <div className="floating-card glass-strong">
            <div className="card-header">
              <span className="pulse-dot"></span>
              <span>Live Data</span>
            </div>
            <div className="metric-display">
              <div className="metric">
                <span className="metric-label">AQI</span>
                <span className="metric-value aqi-high">178</span>
              </div>
              <div className="metric">
                <span className="metric-label">PM2.5</span>
                <span className="metric-value">89 µg/m³</span>
              </div>
            </div>
            <div className="mini-chart">
              <div className="chart-bar" style={{ height: '40%' }}></div>
              <div className="chart-bar" style={{ height: '60%' }}></div>
              <div className="chart-bar" style={{ height: '80%' }}></div>
              <div className="chart-bar" style={{ height: '65%' }}></div>
              <div className="chart-bar" style={{ height: '75%' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <div className="feature-card glass">
            <div className="feature-icon">🔒</div>
            <h3>Federated Learning</h3>
            <p>Privacy-preserving machine learning ensures hospital data stays local</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">📡</div>
            <h3>IoT Integration</h3>
            <p>Real-time air quality monitoring from distributed sensor networks</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">📈</div>
            <h3>Live Analytics</h3>
            <p>Interactive dashboards with real-time correlation insights</p>
          </div>
          <div className="feature-card glass">
            <div className="feature-icon">☁️</div>
            <h3>Cloud Powered</h3>
            <p>Scalable AWS infrastructure for reliable data processing</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer glass">
        <p>© 2025 Swasthya. Built for better public health decisions.</p>
      </footer>
    </div>
  );
}

export default HomePage;