# Swasthya - Air Quality & Health Correlation Analysis

A full-stack MERN application that analyzes the relationship between live air pollution levels and disease spread using IoT sensors and federated learning.

## 🚀 Features

- **Modern Glassmorphism UI** - Beautiful 3D glassmorphism design with smooth animations
- **Real-time Data Visualization** - Interactive charts showing AQI, pollutants, and health metrics
- **MongoDB Backend** - Scalable data storage with Express.js REST API
- **IoT Integration** - Support for real-time sensor data ingestion
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## 📁 Project Structure

```
Swasthya/
├── backend/                 # Express.js server
│   ├── src/
│   │   ├── server.js       # Main server file
│   │   ├── models/         # MongoDB models
│   │   └── routes/         # API routes
│   ├── scripts/
│   │   └── seedDatabase.js # Database seeding script
│   └── .env                # Environment variables
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   └── package.json
└── iot/                    # IoT sensor data
    └── sensorData.json     # Sample sensor data
```

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Recharts (Data Visualization)
- Vite (Build Tool)
- Pure CSS (Glassmorphism Styling)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose ODM
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v20.19+ or v22.12+)
- MongoDB Atlas Account (or local MongoDB)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
```

5. Seed the database with sample IoT data:
```bash
npm run seed
```

5. Start the backend server:
```bash
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd Frontend
```

2. Dependencies are already installed

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🎯 Usage

### Accessing the Application

1. **Homepage**: Navigate to `http://localhost:5173`
   - Modern glassmorphism landing page
   - Features overview
   - Navigation to dashboard

2. **Dashboard**: Click "View Dashboard" or go to `http://localhost:5173/dashboard`
   - Real-time AQI and pollution metrics
   - Interactive charts and graphs
   - Health impact analysis
   - Location-based data

### API Endpoints

- `GET /api/sensor-data` - Get all sensor data (limited to 50 records)
- `GET /api/sensor-data/latest` - Get latest 10 sensor readings
- `GET /api/sensor-data/location/:area` - Get data by location area
- `GET /api/sensor-data/stats` - Get aggregated statistics
- `POST /api/sensor-data` - Add new sensor data

### Testing the API

```bash
# Get latest sensor data
curl http://localhost:5000/api/sensor-data/latest

# Get statistics
curl http://localhost:5000/api/sensor-data/stats
```

## 📊 Data Metrics

The system monitors:

### Air Quality
- AQI (Air Quality Index)
- PM10 & PM2.5 (Particulate Matter)
- NO₂ (Nitrogen Dioxide)
- SO₂ (Sulfur Dioxide)
- O₃ (Ozone)

### Weather
- Temperature
- Humidity
- Wind Speed

### Health Impact
- Respiratory Cases
- Cardiovascular Cases
- Hospital Admissions
- Health Impact Score
- Health Impact Classification

## 🎨 Design Features

- **3D Glassmorphism**: Modern glass-like UI components with backdrop blur
- **Animated Background**: Floating gradient spheres with smooth animations
- **Responsive Layout**: Mobile-first design that works on all devices
- **Live Data Indicators**: Real-time pulse animations
- **Interactive Charts**: Smooth, animated Recharts visualizations
- **Color-coded AQI**: Easy-to-understand health risk levels

## 🔄 Adding New Sensor Data

1. Add data to `iot/sensorData.json` following the existing format
2. Run the seed script: `cd backend && npm run seed`
3. Refresh the dashboard to see new data

## 🚧 Future Enhancements

- [ ] Federated Learning Integration
- [ ] WebSocket for real-time updates
- [ ] User Authentication (Government/Hospital portals)
- [ ] AWS Deployment
- [ ] ML Model Integration
- [ ] Mobile App
- [ ] Email Alerts for High AQI

## 📝 Environment Variables

Create a `.env` file in the backend directory:
```
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
```

Replace `your_mongodb_connection_string_here` with your actual MongoDB Atlas connection string.

## 🤝 Contributing

This is a full-stack project for air quality and health correlation analysis. Contributions are welcome!

## 📄 License

MIT License

## 👨‍💻 Developer

Built with ❤️ for better public health decisions

---

**Note**: This is an MVP (Minimum Viable Product). The federated learning, IoT sensor integration, and AWS deployment will be implemented in future phases.
