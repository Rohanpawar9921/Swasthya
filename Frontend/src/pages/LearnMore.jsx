import { Link } from 'react-router-dom';
import './LearnMore.css';

function LearnMore() {
  return (
    <div className="learn-more">
      {/* Background */}
      <div className="learn-background">
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
        <div className="sphere sphere-3"></div>
      </div>

      {/* Navigation */}
      <nav className="nav-glass">
        <div className="nav-container">
          <Link to="/" className="back-link">← Back to Home</Link>
          <div className="nav-title">Scientific Analysis</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="learn-hero">
        <h1 className="page-title">
          The Science Behind <span className="gradient-text">Air Quality Monitoring</span>
        </h1>
        <p className="page-subtitle">
          Understanding the critical impact of air pollutants on human health and why continuous monitoring is essential
        </p>
      </section>

      {/* Content Sections */}
      <div className="content-wrapper">
        
        {/* Why Monitor Section */}
        <section className="content-section glass">
          <div className="section-icon">🔬</div>
          <h2>Why Monitor Air Quality?</h2>
          <p>
            Air pollution is one of the world's leading environmental health risks, responsible for an estimated 
            7 million premature deaths annually according to the World Health Organization (WHO). Real-time monitoring 
            enables early warning systems, helps vulnerable populations take protective measures, and provides 
            data-driven insights for public health policy.
          </p>
          <div className="highlight-box">
            <strong>Key Fact:</strong> Long-term exposure to air pollution reduces life expectancy by an average of 
            1-2 years globally, with higher impacts in urban areas.
          </div>
        </section>

        {/* Pollutants Overview */}
        <section className="content-section glass">
          <div className="section-icon">🌫️</div>
          <h2>Major Air Pollutants & Health Impacts</h2>

          <div className="pollutant-grid">
            {/* PM2.5 */}
            <div className="pollutant-card">
              <h3>PM2.5 (Fine Particulate Matter)</h3>
              <div className="pollutant-detail">
                <strong>What is it?</strong>
                <p>Particles smaller than 2.5 micrometers - about 30 times smaller than human hair width.</p>
              </div>
              <div className="pollutant-detail">
                <strong>Sources:</strong>
                <p>Vehicle emissions, industrial processes, wildfires, combustion of fossil fuels</p>
              </div>
              <div className="pollutant-detail">
                <strong>Health Impact:</strong>
                <ul>
                  <li>Penetrates deep into lungs and enters bloodstream</li>
                  <li>Causes respiratory diseases (asthma, bronchitis, COPD)</li>
                  <li>Increases cardiovascular disease risk by 10-30%</li>
                  <li>Linked to premature death in people with heart/lung disease</li>
                  <li>Associated with cognitive decline and neurological disorders</li>
                </ul>
              </div>
            </div>

            {/* PM10 */}
            <div className="pollutant-card">
              <h3>PM10 (Coarse Particulate Matter)</h3>
              <div className="pollutant-detail">
                <strong>What is it?</strong>
                <p>Particles smaller than 10 micrometers, including dust, pollen, and mold.</p>
              </div>
              <div className="pollutant-detail">
                <strong>Sources:</strong>
                <p>Construction sites, roads, fields, smokestacks, fires</p>
              </div>
              <div className="pollutant-detail">
                <strong>Health Impact:</strong>
                <ul>
                  <li>Irritates airways, causing coughing and difficulty breathing</li>
                  <li>Aggravates asthma and triggers attacks</li>
                  <li>Reduces lung function in children</li>
                  <li>Increases respiratory infections</li>
                </ul>
              </div>
            </div>

            {/* NO2 */}
            <div className="pollutant-card">
              <h3>NO₂ (Nitrogen Dioxide)</h3>
              <div className="pollutant-detail">
                <strong>What is it?</strong>
                <p>A reddish-brown gas with a characteristic sharp, biting odor.</p>
              </div>
              <div className="pollutant-detail">
                <strong>Sources:</strong>
                <p>Vehicle emissions, power plants, industrial facilities</p>
              </div>
              <div className="pollutant-detail">
                <strong>Health Impact:</strong>
                <ul>
                  <li>Inflames airways in respiratory system</li>
                  <li>Reduces immunity to lung infections</li>
                  <li>Increases susceptibility to respiratory infections in children</li>
                  <li>Contributes to development of asthma</li>
                  <li>Long-term exposure linked to decreased lung function</li>
                </ul>
              </div>
            </div>

            {/* SO2 */}
            <div className="pollutant-card">
              <h3>SO₂ (Sulfur Dioxide)</h3>
              <div className="pollutant-detail">
                <strong>What is it?</strong>
                <p>A colorless gas with a pungent, irritating smell.</p>
              </div>
              <div className="pollutant-detail">
                <strong>Sources:</strong>
                <p>Coal and oil combustion, metal smelting, diesel engines</p>
              </div>
              <div className="pollutant-detail">
                <strong>Health Impact:</strong>
                <ul>
                  <li>Causes respiratory problems and breathing difficulties</li>
                  <li>Aggravates existing heart disease</li>
                  <li>Particularly harmful to people with asthma</li>
                  <li>Can cause eye irritation</li>
                </ul>
              </div>
            </div>

            {/* O3 */}
            <div className="pollutant-card">
              <h3>O₃ (Ground-level Ozone)</h3>
              <div className="pollutant-detail">
                <strong>What is it?</strong>
                <p>A secondary pollutant formed when NOx and VOCs react in sunlight.</p>
              </div>
              <div className="pollutant-detail">
                <strong>Sources:</strong>
                <p>Not directly emitted; formed from vehicle and industrial emissions</p>
              </div>
              <div className="pollutant-detail">
                <strong>Health Impact:</strong>
                <ul>
                  <li>Damages lung tissue and reduces lung function</li>
                  <li>Triggers asthma attacks and worsens COPD</li>
                  <li>Increases hospital admissions for respiratory issues</li>
                  <li>Makes lungs more susceptible to infection</li>
                  <li>Can cause permanent lung damage with long-term exposure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Disease Correlation */}
        <section className="content-section glass">
          <div className="section-icon">🏥</div>
          <h2>Air Pollution & Disease Correlation</h2>
          
          <div className="disease-grid">
            <div className="disease-card">
              <h3>Respiratory Diseases</h3>
              <p>
                <strong>Scientific Evidence:</strong> Studies show a 15-20% increase in respiratory hospital 
                admissions during high pollution days. Children in polluted areas are 40% more likely to develop 
                asthma compared to those in cleaner environments.
              </p>
              <div className="stat-highlight">
                40% higher asthma risk in polluted areas
              </div>
            </div>

            <div className="disease-card">
              <h3>Cardiovascular Diseases</h3>
              <p>
                <strong>Scientific Evidence:</strong> Long-term exposure to PM2.5 pollution increases heart attack 
                risk by 24%. Every 10 µg/m³ increase in PM2.5 is associated with a 4-6% increase in cardiovascular 
                mortality.
              </p>
              <div className="stat-highlight">
                24% higher heart attack risk
              </div>
            </div>

            <div className="disease-card">
              <h3>Cancer</h3>
              <p>
                <strong>Scientific Evidence:</strong> The International Agency for Research on Cancer (IARC) 
                classified outdoor air pollution as carcinogenic to humans. PM2.5 exposure is linked to lung 
                cancer incidence.
              </p>
              <div className="stat-highlight">
                Classified as Group 1 carcinogen by WHO
              </div>
            </div>

            <div className="disease-card">
              <h3>Neurological Impact</h3>
              <p>
                <strong>Scientific Evidence:</strong> Recent studies link air pollution to cognitive decline, 
                dementia, and Parkinson's disease. Children exposed to high pollution show reduced cognitive 
                development.
              </p>
              <div className="stat-highlight">
                Linked to 21% higher dementia risk
              </div>
            </div>
          </div>
        </section>

        {/* Why Real-Time Monitoring */}
        <section className="content-section glass">
          <div className="section-icon">📊</div>
          <h2>Importance of Real-Time Monitoring</h2>
          
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-number">1</div>
              <div className="benefit-content">
                <h3>Early Warning System</h3>
                <p>Real-time data allows authorities to issue health advisories before pollution reaches dangerous levels, protecting vulnerable populations.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-number">2</div>
              <div className="benefit-content">
                <h3>Evidence-Based Policy</h3>
                <p>Continuous monitoring provides the data needed to develop effective pollution control policies and measure their impact.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-number">3</div>
              <div className="benefit-content">
                <h3>Public Awareness</h3>
                <p>Transparent air quality data empowers citizens to make informed decisions about outdoor activities and health protection.</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-number">4</div>
              <div className="benefit-content">
                <h3>Healthcare Planning</h3>
                <p>Hospitals can anticipate increased admissions during pollution events and allocate resources accordingly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="content-section glass highlight-section">
          <div className="section-icon">💡</div>
          <h2>How Swasthya Helps</h2>
          <p className="large-text">
            Our platform combines IoT sensor networks with federated learning to provide real-time air quality 
            monitoring while correlating it with health data from hospitals - all while maintaining patient privacy.
          </p>
          
          <div className="solution-features">
            <div className="feature-item">
              <span className="feature-icon">🌐</span>
              <span>Real-time IoT sensor network across multiple locations</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Privacy-preserving federated learning for health data</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📈</span>
              <span>Advanced correlation analysis between pollution and health impacts</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Instant alerts and actionable insights for decision-makers</span>
            </div>
          </div>

          <div className="cta-section">
            <Link to="/dashboard" className="btn-primary">View Live Dashboard</Link>
          </div>
        </section>

        {/* References */}
        <section className="content-section glass references-section">
          <h3>Scientific References</h3>
          <ul className="references-list">
            <li>World Health Organization (WHO). "Air Pollution Data." 2024.</li>
            <li>International Agency for Research on Cancer (IARC). "Outdoor Air Pollution." 2023.</li>
            <li>American Heart Association. "Particulate Matter and Cardiovascular Disease." 2023.</li>
            <li>The Lancet. "Global Burden of Disease from Air Pollution." 2024.</li>
            <li>Environmental Health Perspectives. "Long-term Effects of Air Pollution on Neurological Health." 2024.</li>
          </ul>
        </section>

      </div>

      {/* Footer */}
      <footer className="footer glass">
        <div className="footer-content-learn">
          <div className="footer-section-learn">
            <h4>Swasthya</h4>
            <p>Real-time air quality monitoring and health impact analysis platform for a healthier tomorrow.</p>
          </div>
          <div className="footer-section-learn">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/learn-more">Learn More</Link>
            <Link to="/login">Login</Link>
          </div>
          <div className="footer-section-learn">
            <h4>Resources</h4>
            <a href="https://www.who.int/health-topics/air-pollution" target="_blank" rel="noopener noreferrer">WHO Guidelines</a>
            <a href="https://www.epa.gov/air-quality" target="_blank" rel="noopener noreferrer">EPA Standards</a>
            <a href="https://cpcb.nic.in/" target="_blank" rel="noopener noreferrer">CPCB India</a>
          </div>
          <div className="footer-section-learn">
            <h4>Contact</h4>
            <p>📧 support@swasthya.com</p>
            <p>📞 +91 123 456 7890</p>
            <p>📍 Mumbai, India</p>
          </div>
        </div>
        <div className="footer-bottom-learn">
          <p>© 2025 Swasthya. All rights reserved. Committed to cleaner air and healthier communities.</p>
        </div>
      </footer>
    </div>
  );
}

export default LearnMore;
