import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import LearnMore from './pages/LearnMore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AQITrendPage from './pages/AQITrendPage';
import PollutantsPage from './pages/PollutantsPage';
import HealthImpactPage from './pages/HealthImpactPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/charts/aqi-trend" element={<AQITrendPage />} />
        <Route path="/charts/pollutants" element={<PollutantsPage />} />
        <Route path="/charts/health-impact" element={<HealthImpactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
