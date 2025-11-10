import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import './ChartDetail.css';

function ChartDetail({ chartData, onClose }) {
  const { type, title, description, data, importance, healthImpacts, interpretation, sources } = chartData;

  const renderChart = () => {
    switch (type) {
      case 'aqi-trend':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data}>
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
        );

      case 'pollutants':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={data}>
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
              <Bar dataKey="airQuality.PM25" fill="#60a5fa" name="PM2.5" />
              <Bar dataKey="airQuality.PM10" fill="#34d399" name="PM10" />
              <Bar dataKey="airQuality.NO2" fill="#f59e0b" name="NO₂" />
              <Bar dataKey="airQuality.SO2" fill="#ef4444" name="SO₂" />
              <Bar dataKey="airQuality.O3" fill="#a78bfa" name="O₃" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'health-impact':
        return (
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data}>
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
                dataKey="healthData.respiratoryCases" 
                stroke="#60a5fa" 
                strokeWidth={3}
                name="Respiratory Cases"
                dot={{ fill: '#60a5fa', r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="healthData.cardiovascularCases" 
                stroke="#ef4444" 
                strokeWidth={3}
                name="Cardiovascular Cases"
                dot={{ fill: '#ef4444', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="chart-detail-overlay">
      <div className="chart-detail-container">
        {/* Header */}
        <div className="chart-detail-header">
          <div className="header-left">
            <h1>{title}</h1>
            <p className="chart-description">{description}</p>
          </div>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        {/* Chart Section */}
        <div className="chart-detail-chart glass">
          {renderChart()}
        </div>

        {/* Information Sections */}
        <div className="chart-detail-content">
          <div className="info-grid">
            {/* Why This Matters */}
            <div className="info-card glass">
              <div className="info-icon">🎯</div>
              <h2>Why This Matters</h2>
              <p>{importance}</p>
            </div>

            {/* Health Impacts */}
            <div className="info-card glass">
              <div className="info-icon">🏥</div>
              <h2>Health Impacts</h2>
              <ul>
                {healthImpacts.map((impact, index) => (
                  <li key={index}>{impact}</li>
                ))}
              </ul>
            </div>

            {/* How to Interpret */}
            <div className="info-card glass full-width">
              <div className="info-icon">📊</div>
              <h2>How to Interpret This Data</h2>
              <div className="interpretation-content">
                {interpretation.ranges && (
                  <div className="ranges">
                    <h3>Understanding the Values:</h3>
                    <div className="range-items">
                      {interpretation.ranges.map((range, index) => (
                        <div key={index} className={`range-item ${range.class}`}>
                          <span className="range-value">{range.value}</span>
                          <span className="range-label">{range.label}</span>
                          <span className="range-desc">{range.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {interpretation.notes && (
                  <div className="interpretation-notes">
                    <h3>Key Observations:</h3>
                    <ul>
                      {interpretation.notes.map((note, index) => (
                        <li key={index}>{note}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Data Sources */}
            <div className="info-card glass full-width">
              <div className="info-icon">📚</div>
              <h2>Data Sources & Standards</h2>
              <ul className="sources-list">
                {sources.map((source, index) => (
                  <li key={index}>{source}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Section */}
          <div className="action-section glass">
            <h2>Take Action</h2>
            <p>Understanding this data is the first step. Here's what you can do:</p>
            <div className="action-buttons">
              <Link to="/learn-more" className="btn-primary">Learn More About Air Quality</Link>
              <button onClick={onClose} className="btn-secondary">Back to Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartDetail;
