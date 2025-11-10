# Quick Start Guide - Swasthya MVP

## 🚀 Running the Application

### Step 1: Start the Backend Server

Open a terminal and run:

```bash
cd "c:\Users\Rohan\FULL STACK DEV\Projects\Major Projects\Swasthya\backend"
npm start
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected Successfully
```

### Step 2: Frontend is Already Running

The frontend Vite server is already running on `http://localhost:5173`

If it's not running, open a new terminal:

```bash
cd "c:\Users\Rohan\FULL STACK DEV\Projects\Major Projects\Swasthya\Frontend"
npm run dev
```

### Step 3: Access the Application

1. **Homepage**: Open browser to `http://localhost:5173`
   - You'll see a modern glassmorphism homepage with animated background
   - Click "View Dashboard" button

2. **Dashboard**: Navigate to `http://localhost:5173/dashboard`
   - View real-time air quality metrics
   - See interactive charts with AQI trends
   - Monitor health impact data

## 📊 What You'll See

### Homepage Features:
- ✅ 3D glassmorphism design
- ✅ Animated gradient background
- ✅ Navigation bar
- ✅ Hero section with stats
- ✅ Features showcase
- ✅ Floating data card preview

### Dashboard Features:
- ✅ Live data indicator
- ✅ Statistics cards (Average AQI, Hospital Admissions, etc.)
- ✅ Latest sensor readings with location
- ✅ Air quality metrics (PM2.5, PM10, NO₂, SO₂, O₃)
- ✅ Weather data
- ✅ Health impact analysis
- ✅ Interactive charts:
  - AQI trend over time
  - Pollutants comparison by location
  - Health impact correlation

## 🗄️ Database

The MongoDB database has been seeded with 8 sample sensor data records from different locations:
- Central Business District
- Industrial Zone
- Residential Area - North
- Highway Junction
- Coastal Area
- Park Area

## 🔧 Useful Commands

### Backend
```bash
# Start server
npm start

# Seed database with sample data
npm run seed

# Development mode with auto-reload
npm run dev
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎨 Design Elements

The application features:
- **Glassmorphism**: Frosted glass effect with backdrop blur
- **3D Elements**: Floating spheres and cards with depth
- **Smooth Animations**: Fade-ins, hover effects, and transitions
- **Responsive**: Works on desktop, tablet, and mobile
- **Color-coded Data**: AQI levels with appropriate colors (Good=green, Hazardous=red)

## 🧪 Testing

The application is ready to use! Here's what's working:

✅ Backend server running on port 5000
✅ MongoDB connection established
✅ Database seeded with sample data
✅ Frontend served on port 5173
✅ API integration working
✅ Charts and visualizations rendering
✅ Responsive design implemented

## 📱 Supported Browsers

- Chrome (Recommended)
- Firefox
- Edge
- Safari

## ⚠️ Known Issues

- Tailwind CSS PostCSS warning (does not affect functionality)
- Use only CSS for styling as requested

## 🎯 Next Steps

The MVP is complete! Here's what you can do next:

1. **Explore the Dashboard**: Navigate through different sections
2. **Check the API**: Test endpoints using browser or Postman
3. **Customize Data**: Modify `iot/sensorData.json` and re-seed
4. **Enhance UI**: Add more glassmorphism effects or animations
5. **Add Features**: Implement user authentication, more charts, etc.

## 💡 Tips

- The dashboard auto-refreshes data every 30 seconds
- AQI colors indicate health risk levels
- Charts are interactive - hover for details
- Backend logs show in the terminal where it's running

---

Enjoy exploring Swasthya! 🌍💚
