require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Incident = require('../models/Incident');
const Discount = require('../models/Discount');
const connectDB = require('../config/database');

connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Vehicle.deleteMany();
    await Incident.deleteMany();
    await Discount.deleteMany();

    console.log('🗑️  Cleared existing data');

    // Create users
    const users = await User.create([
      {
        firstName: 'Cmdr.',
        lastName: 'Operative',
        email: 'operative@shuttlecore.ai',
        password: 'password123',
        organization: 'Systems Command',
        role: 'admin',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw'
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user'
      },
      {
        firstName: 'Driver',
        lastName: 'One',
        email: 'driver1@shuttlecore.ai',
        password: 'password123',
        role: 'driver'
      }
    ]);

    console.log('✅ Created users');

    // Create vehicles
    const vehicles = await Vehicle.create([
      {
        unitId: 'SH-402',
        type: 'standard',
        name: 'Standard Ride',
        basePrice: 89,
        capacity: 4,
        features: ['2 min pickup', 'Verified drivers', 'Live tracking'],
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
        status: 'available',
        battery: 85,
        speed: 0,
        heading: 'N/A'
      },
      {
        unitId: 'SH-881',
        type: 'xl',
        name: 'Shuttle XL',
        basePrice: 195,
        capacity: 6,
        features: ['Extra legroom', 'Group travel', 'Safe & clean'],
        image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800',
        status: 'available',
        battery: 65,
        speed: 5,
        heading: 'Westbound'
      },
      {
        unitId: 'SH-209',
        type: 'bike',
        name: 'Quick Bike',
        basePrice: 45,
        capacity: 1,
        features: ['Traffic-proof', 'Pocket-friendly', 'Helmet provided'],
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800',
        status: 'available',
        battery: 88,
        speed: 18,
        heading: 'Eastbound'
      },
      {
        unitId: 'SH-103',
        type: 'rental',
        name: 'Flex Rentals',
        basePrice: 350,
        capacity: 4,
        features: ['Hourly bookings', 'Unlimited stops', 'Chauffeur included'],
        image: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?w=800',
        status: 'available',
        battery: 92,
        speed: 0,
        heading: 'N/A'
      },
      {
        unitId: 'SH-777',
        type: 'intercity',
        name: 'Intercity Plus',
        basePrice: 2500,
        capacity: 4,
        features: ['One-way/Round trip', 'Top-tier sedans', 'Roadside assistance'],
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
        status: 'available',
        battery: 78,
        speed: 0,
        heading: 'N/A'
      },
      {
        unitId: 'SH-999',
        type: 'parcel',
        name: 'Parcel Express',
        basePrice: 60,
        capacity: 0,
        features: ['Doorstep pickup', 'Insured delivery', 'Proof of delivery'],
        image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
        status: 'available',
        battery: 95,
        speed: 0,
        heading: 'N/A'
      }
    ]);

    console.log('✅ Created vehicles');

    // Create incidents
    const incidents = await Incident.create([
      {
        id: 'EM-402',
        type: 'Brake System Failure',
        severity: 'critical',
        unit: 'Shuttle-402',
        location: 'Downtown Core - 5th Ave',
        coordinates: { lat: 34.0522, lng: -118.2437 },
        passengers: 4,
        battery: 12,
        speed: 0,
        heading: 'N/A',
        lastUpdate: '4s ago',
        description: 'Emergency regenerative braking engaged after hydraulic pressure loss. Vehicle is currently stationary but blocking a primary artery.',
        nearbyUnits: ['SH-102 (2m)', 'SH-881 (5m)', 'MED-01 (8m)'],
        logs: [
          { time: '14:02:11', msg: 'CORE_BOOT: Emergency Protocol Engaged' },
          { time: '14:02:14', msg: 'SENSOR_FAILURE: Lidar_Main_Obstructed' },
          { time: '14:02:18', msg: 'AUTO_HALT: Unit SH-402 Stopped' },
          { time: '14:02:22', msg: 'DISPATCH: Recovery Team MED-01 Enroute' },
          { time: '14:02:25', msg: 'SAT_SYNC: Visual Feed Offline' },
          { time: '14:02:30', msg: 'COMM_LINK: Operative Input Required' }
        ],
        status: 'active'
      },
      {
        id: 'EM-881',
        type: 'Lidar Sensor Obstruction',
        severity: 'high',
        unit: 'Shuttle-881',
        location: 'Pacific Coast Hwy',
        coordinates: { lat: 34.0122, lng: -118.4912 },
        passengers: 0,
        battery: 65,
        speed: 5,
        heading: 'Westbound',
        lastUpdate: '12s ago',
        description: 'Vision system reports total blindness in Sector-B. Autonomous logic holding vehicle in safe-crawl mode.',
        nearbyUnits: ['SH-209 (4m)', 'TECH-04 (12m)'],
        logs: [
          { time: '14:10:05', msg: 'SIGNAL_DEGRADATION: Sector-B Vision compromised' },
          { time: '14:10:08', msg: 'AI_OVERRIDE: Safe-crawl mode engaged' }
        ],
        status: 'active'
      },
      {
        id: 'EM-209',
        type: 'Unauthorized Cabin Entry',
        severity: 'critical',
        unit: 'Shuttle-209',
        location: 'Financial District',
        coordinates: { lat: 34.0488, lng: -118.2518 },
        passengers: 2,
        battery: 88,
        speed: 18,
        heading: 'Eastbound',
        lastUpdate: '1s ago',
        description: 'Rear emergency hatch opened while in transit. AI has locked the vehicle and initiated police dispatch.',
        nearbyUnits: ['SH-402 (10m)', 'SEC-09 (3m)'],
        logs: [
          { time: '14:15:22', msg: 'SECURITY_BREACH: Rear Hatch Sensor Tripped' },
          { time: '14:15:25', msg: 'POLICE_DISPATCH: Automated SOS broadcast' }
        ],
        status: 'active'
      }
    ]);

    console.log('✅ Created incidents');

    // Create discounts
    const discounts = await Discount.create([
      {
        code: 'WELCOME20',
        description: 'Welcome discount for new users',
        percentage: 20,
        maxDiscount: 100,
        minOrder: 50,
        validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        isActive: true
      },
      {
        code: 'RIDE10',
        description: '10% off on all rides',
        percentage: 10,
        maxDiscount: 50,
        minOrder: 30,
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days
        isActive: true
      }
    ]);

    console.log('✅ Created discounts');

    console.log('🎉 Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
