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

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps-container">
          <div className="step-card glass">
            <div className="step-number">01</div>
            <div className="step-icon">🌡️</div>
            <h3>Data Collection</h3>
            <p>IoT sensors continuously monitor air quality parameters (PM2.5, PM10, NO₂, SO₂, O₃) across multiple locations</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card glass">
            <div className="step-number">02</div>
            <div className="step-icon">🏥</div>
            <h3>Health Data Integration</h3>
            <p>Hospital systems securely share disease patterns using federated learning without exposing patient data</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card glass">
            <div className="step-number">03</div>
            <div className="step-icon">🤖</div>
            <h3>AI Analysis</h3>
            <p>Machine learning models identify correlations between pollution levels and respiratory/cardiovascular cases</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card glass">
            <div className="step-number">04</div>
            <div className="step-icon">📊</div>
            <h3>Real-Time Insights</h3>
            <p>Dashboard displays live trends, predictions, and health advisories for informed decision-making</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact">
        <div className="impact-content">
          <div className="impact-text">
            <h2 className="section-title">Making a Real Impact</h2>
            <p className="impact-description">
              Air pollution is one of the leading causes of preventable deaths worldwide. 
              Our platform bridges the gap between environmental data and public health, 
              enabling governments, hospitals, and citizens to take proactive measures.
            </p>
            <div className="impact-stats">
              <div className="impact-stat">
                <div className="impact-stat-number">7M+</div>
                <div className="impact-stat-label">Annual deaths from air pollution globally</div>
              </div>
              <div className="impact-stat">
                <div className="impact-stat-number">90%</div>
                <div className="impact-stat-label">World population breathing polluted air</div>
              </div>
              <div className="impact-stat">
                <div className="impact-stat-number">24/7</div>
                <div className="impact-stat-label">Real-time monitoring & alerts</div>
              </div>
            </div>
          </div>
          <div className="impact-visual glass">
            <div className="visual-chart">
              <div className="chart-line"></div>
              <div className="chart-area"></div>
              <div className="chart-points">
                <div className="chart-point" style={{ left: '10%', bottom: '30%' }}></div>
                <div className="chart-point" style={{ left: '30%', bottom: '50%' }}></div>
                <div className="chart-point" style={{ left: '50%', bottom: '40%' }}></div>
                <div className="chart-point" style={{ left: '70%', bottom: '70%' }}></div>
                <div className="chart-point" style={{ left: '90%', bottom: '60%' }}></div>
              </div>
            </div>
            <div className="visual-label">Air Quality vs Health Impact Correlation</div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="use-cases">
        <h2 className="section-title">Who Benefits?</h2>
        <div className="use-cases-grid">
          <div className="use-case-card glass">
            <div className="use-case-icon">🏛️</div>
            <h3>Government Bodies</h3>
            <ul>
              <li>Policy formulation based on real data</li>
              <li>Resource allocation for healthcare</li>
              <li>Public health emergency preparedness</li>
              <li>Environmental regulation enforcement</li>
            </ul>
          </div>
          <div className="use-case-card glass">
            <div className="use-case-icon">🏥</div>
            <h3>Healthcare Providers</h3>
            <ul>
              <li>Predict patient admission spikes</li>
              <li>Optimize resource management</li>
              <li>Patient advisory based on AQI</li>
              <li>Research on pollution-health links</li>
            </ul>
          </div>
          <div className="use-case-card glass">
            <div className="use-case-icon">👨‍👩‍👧‍👦</div>
            <h3>Citizens</h3>
            <ul>
              <li>Real-time air quality information</li>
              <li>Health risk notifications</li>
              <li>Activity planning recommendations</li>
              <li>Awareness about local pollution</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content glass">
          <h2>Start Monitoring Air Quality Today</h2>
          <p>Join the movement towards data-driven public health decisions</p>
          <div className="cta-buttons">
            <Link to={isAuthenticated ? "/dashboard" : "/signup"} className="btn-cta-primary">
              {isAuthenticated ? "Go to Dashboard" : "Get Started"}
            </Link>
            <Link to="/learn-more" className="btn-cta-secondary">
              Explore Features
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer glass">
        <div className="footer-content-home">
          <div className="footer-section-home">
            <h4>Swasthya</h4>
            <p>Real-time air quality monitoring and health impact analysis platform for a healthier tomorrow.</p>
          </div>
          <div className="footer-section-home">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/learn-more">Learn More</Link>
            {!isAuthenticated && <Link to="/signup">Sign Up</Link>}
          </div>
          <div className="footer-section-home">
            <h4>Resources</h4>
            <a href="https://www.who.int/health-topics/air-pollution" target="_blank" rel="noopener noreferrer">WHO Guidelines</a>
            <a href="https://www.epa.gov/air-quality" target="_blank" rel="noopener noreferrer">EPA Standards</a>
            <a href="https://cpcb.nic.in/" target="_blank" rel="noopener noreferrer">CPCB India</a>
          </div>
          <div className="footer-section-home">
            <h4>Contact</h4>
            <p>📧 support@swasthya.com</p>
            <p>📞 +91 123 456 7890</p>
            <p>📍 Mumbai, India</p>
          </div>
        </div>
        <div className="footer-bottom-home">
          <p>© 2025 Swasthya. All rights reserved. Built for better public health decisions.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;