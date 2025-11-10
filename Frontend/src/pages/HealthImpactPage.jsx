import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './ChartPages.css';

function HealthImpactPage() {
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
        <h1 className="page-title">Health Impact Correlation Analysis</h1>
      </header>

      {/* Chart Section */}
      <section className="chart-section glass">
        <div className="chart-intro">
          <p>Correlation between air quality metrics and health impacts, showing how pollution affects respiratory and cardiovascular health.</p>
        </div>
        <div className="chart-container-full">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={sensorData}>
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
                label={{ value: 'Impact Index', angle: -90, position: 'insideLeft', style: { fill: 'rgba(255,255,255,0.7)' } }}
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
                dataKey="healthImpact.respiratoryCases" 
                stroke="#60a5fa" 
                name="Respiratory Cases"
                strokeWidth={3}
                dot={{ fill: '#60a5fa', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="healthImpact.cardiovascularCases" 
                stroke="#ef4444" 
                name="Cardiovascular Cases"
                strokeWidth={3}
                dot={{ fill: '#ef4444', r: 5 }}
                activeDot={{ r: 7 }}
              />
              <Line 
                type="monotone" 
                dataKey="healthImpact.hospitalAdmissions" 
                stroke="#fbbf24" 
                name="Hospital Admissions"
                strokeWidth={3}
                dot={{ fill: '#fbbf24', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Information Grid */}
      <div className="info-grid">
        {/* Why This Matters */}
        <section className="info-card glass">
          <div className="info-icon">🫀</div>
          <h2>Why This Matters</h2>
          <p>
            Air pollution is a leading environmental cause of premature death globally. Understanding the health impact 
            correlation helps individuals, healthcare providers, and policymakers anticipate health risks, plan resources, 
            and implement protective measures. This data shows the direct link between air quality and public health outcomes.
          </p>
        </section>

        {/* Health Impact Categories */}
        <section className="info-card glass">
          <div className="info-icon">🏥</div>
          <h2>Impact Categories</h2>
          <div className="impact-levels">
            <div className="impact-level" style={{ borderLeft: '4px solid #10b981' }}>
              <strong>Low Risk (0-30)</strong>
              <p>Minimal health impact. Safe for all groups including sensitive populations.</p>
            </div>
            <div className="impact-level" style={{ borderLeft: '4px solid #f59e0b' }}>
              <strong>Moderate Risk (31-60)</strong>
              <p>Sensitive groups may experience minor effects. Monitor symptoms.</p>
            </div>
            <div className="impact-level" style={{ borderLeft: '4px solid #ef4444' }}>
              <strong>High Risk (61+)</strong>
              <p>Everyone may experience effects. Sensitive groups should limit outdoor exposure.</p>
            </div>
          </div>
        </section>

        {/* Respiratory Impact */}
        <section className="info-card glass full-width">
          <div className="info-icon">🫁</div>
          <h2>Respiratory Health Impact</h2>
          <ul>
            <li><strong>Acute Effects:</strong> Coughing, throat irritation, chest tightness, difficulty breathing, wheezing</li>
            <li><strong>Asthma:</strong> Triggers asthma attacks, increases medication need, reduces lung function in asthmatics</li>
            <li><strong>COPD:</strong> Worsens chronic obstructive pulmonary disease symptoms, increases hospital admissions</li>
            <li><strong>Respiratory Infections:</strong> Increases susceptibility to bronchitis, pneumonia, and other infections</li>
            <li><strong>Children:</strong> Impaired lung development, increased school absences, higher infection rates</li>
            <li><strong>Long-term:</strong> Reduced lung function, chronic bronchitis, increased lung cancer risk</li>
          </ul>
        </section>

        {/* Cardiovascular Impact */}
        <section className="info-card glass full-width">
          <div className="info-icon">💔</div>
          <h2>Cardiovascular Health Impact</h2>
          <ul>
            <li><strong>Heart Attacks:</strong> Increases risk of myocardial infarction, especially in those with existing heart disease</li>
            <li><strong>Stroke:</strong> Elevated stroke risk due to increased blood pressure and arterial inflammation</li>
            <li><strong>Blood Pressure:</strong> Raises blood pressure, contributes to hypertension development</li>
            <li><strong>Heart Rhythm:</strong> Can trigger arrhythmias and irregular heartbeat in susceptible individuals</li>
            <li><strong>Atherosclerosis:</strong> Accelerates plaque buildup in arteries, increasing cardiovascular disease risk</li>
            <li><strong>Heart Failure:</strong> Worsens symptoms in existing heart failure patients, increases hospitalization</li>
          </ul>
        </section>

        {/* Vulnerable Populations */}
        <section className="info-card glass full-width">
          <div className="info-icon">⚠️</div>
          <h2>Vulnerable Populations</h2>
          <ul>
            <li><strong>Children:</strong> Developing respiratory systems make them particularly susceptible to air pollution</li>
            <li><strong>Elderly:</strong> Age-related decline in lung and heart function increases vulnerability</li>
            <li><strong>Pregnant Women:</strong> Air pollution linked to low birth weight, preterm birth, developmental issues</li>
            <li><strong>Existing Conditions:</strong> People with asthma, COPD, heart disease face amplified risks</li>
            <li><strong>Outdoor Workers:</strong> Extended exposure time increases cumulative health impacts</li>
            <li><strong>Low Socioeconomic Status:</strong> Limited access to healthcare and protective measures</li>
          </ul>
        </section>

        {/* Protective Measures */}
        <section className="info-card glass full-width">
          <div className="info-icon">🛡️</div>
          <h2>Protective Measures</h2>
          <ul>
            <li>Monitor AQI daily and plan outdoor activities accordingly</li>
            <li>Use N95/N99 masks during high pollution episodes (AQI &gt; 150)</li>
            <li>Keep indoor air clean with air purifiers (HEPA filters recommended)</li>
            <li>Limit outdoor exercise during peak pollution hours (typically 6-10 AM, 6-10 PM)</li>
            <li>Keep windows closed on high pollution days, use AC with recirculation</li>
            <li>Stay hydrated and maintain good nutrition to support immune system</li>
            <li>Consult healthcare provider if you have respiratory or cardiovascular conditions</li>
            <li>Create a clean air refuge room at home with air purification</li>
          </ul>
        </section>

        {/* Data Sources */}
        <section className="info-card glass full-width">
          <div className="info-icon">📚</div>
          <h2>Research & Data Sources</h2>
          <ul className="sources-list">
            <li>World Health Organization (WHO) - Global Air Quality and Health Studies</li>
            <li>Lancet Commission on Pollution and Health - Comprehensive health impact assessments</li>
            <li>American Heart Association - Cardiovascular effects of air pollution research</li>
            <li>American Lung Association - Respiratory health impact documentation</li>
            <li>EPA NAAQS - National Ambient Air Quality Standards health criteria</li>
            <li>Health Effects Institute - Independent air quality health research</li>
          </ul>
        </section>
      </div>

      {/* Action Section */}
      <section className="action-section glass">
        <h2>Protect Your Health</h2>
        <p>Understanding health impacts empowers you to take proactive steps to protect yourself and your family from air pollution.</p>
        <div className="action-buttons">
          <Link to="/learn-more" className="btn-primary">Health Guidelines</Link>
          <Link to="/dashboard" className="btn-secondary">Back to Dashboard</Link>
        </div>
      </section>
    </div>
  );
}

export default HealthImpactPage;
