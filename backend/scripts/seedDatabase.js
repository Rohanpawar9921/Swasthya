import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import SensorData from '../src/models/SensorData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env') });

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await SensorData.deleteMany({});
    console.log('🗑️  Cleared existing sensor data');

    // Read sensor data from JSON file
    const sensorDataPath = join(__dirname, '../../iot/sensorData.json');
    const sensorDataRaw = readFileSync(sensorDataPath, 'utf-8');
    const sensorData = JSON.parse(sensorDataRaw);

    // Insert data into MongoDB
    await SensorData.insertMany(sensorData);
    console.log(`✅ Inserted ${sensorData.length} sensor data records`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
