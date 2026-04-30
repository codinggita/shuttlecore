require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');
const Incident = require('../models/Incident');
const Discount = require('../models/Discount');
const Driver = require('../models/Driver');
const Cluster = require('../models/Cluster');
const Notification = require('../models/Notification');
const Deployment = require('../models/Deployment');
const Payment = require('../models/Payment');
const EventLog = require('../models/EventLog');
const Dispatch = require('../models/Dispatch');
const SafetyEvent = require('../models/SafetyEvent');
const Rider = require('../models/Rider');
const connectDB = require('../config/database');

connectDB();

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Vehicle.deleteMany();
    await Incident.deleteMany();
    await Discount.deleteMany();
    await Driver.deleteMany();
    await Cluster.deleteMany();
    await Notification.deleteMany();
    await Deployment.deleteMany();
    await Payment.deleteMany();
    await EventLog.deleteMany();
    await Dispatch.deleteMany();
    await SafetyEvent.deleteMany();
    await Rider.deleteMany();

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

    // Create drivers
    const drivers = await Driver.create([
      {
        driverId: 'DRV-001',
        name: 'Michael Johnson',
        email: 'michael.j@shuttlecore.ai',
        phone: '+1-555-0101',
        status: 'available',
        rating: 4.8,
        totalTrips: 1250,
        currentLocation: { lat: 37.7749, lng: -122.4194 },
        earnings: 45000,
        isVerified: true
      },
      {
        driverId: 'DRV-002',
        name: 'Sarah Williams',
        email: 'sarah.w@shuttlecore.ai',
        phone: '+1-555-0102',
        status: 'on_trip',
        rating: 4.9,
        totalTrips: 980,
        currentLocation: { lat: 37.7849, lng: -122.4094 },
        earnings: 38000,
        isVerified: true
      },
      {
        driverId: 'DRV-003',
        name: 'David Chen',
        email: 'david.c@shuttlecore.ai',
        phone: '+1-555-0103',
        status: 'available',
        rating: 4.7,
        totalTrips: 750,
        currentLocation: { lat: 37.7649, lng: -122.4294 },
        earnings: 29000,
        isVerified: true
      }
    ]);

    console.log('✅ Created drivers');

    // Create clusters
    const clusters = await Cluster.create([
      {
        id: '#1',
        name: 'North Financial Plaza',
        location: 'Downtown Financial District',
        coordinates: { lat: 37.7949, lng: -122.3994 },
        passengers: 12,
        shuttlesAssigned: 1,
        status: 'active',
        color: 'bg-emerald-500',
        demand: 'High'
      },
      {
        id: '#2',
        name: 'The Mission Hub',
        location: 'Mission District',
        coordinates: { lat: 37.7649, lng: -122.4194 },
        passengers: 28,
        shuttlesAssigned: 3,
        status: 'active',
        color: 'bg-[#5C5C3D]',
        demand: 'High'
      },
      {
        id: '#3',
        name: 'Sunset Terrace',
        location: 'Sunset District',
        coordinates: { lat: 37.7549, lng: -122.4394 },
        passengers: 8,
        shuttlesAssigned: 0,
        status: 'pending',
        color: 'bg-slate-500',
        demand: 'Medium'
      }
    ]);

    console.log('✅ Created clusters');

    // Create notifications
    const notifications = await Notification.create([
      {
        user: users[0]._id,
        title: 'Ride Confirmed',
        message: 'Your ride to Downtown has been confirmed. Driver will arrive in 5 minutes.',
        type: 'success',
        isRead: false,
        actionUrl: '/ride-history'
      },
      {
        user: users[0]._id,
        title: 'Emergency Alert',
        message: 'Emergency incident reported in your area. Please avoid Downtown Core.',
        type: 'emergency',
        isRead: false,
        actionUrl: '/emergency-stop'
      },
      {
        user: users[1]._id,
        title: 'Payment Successful',
        message: 'Your payment of $89.00 has been processed successfully.',
        type: 'success',
        isRead: true,
        actionUrl: '/ride-history'
      }
    ]);

    console.log('✅ Created notifications');

    // Create deployments
    const deployments = await Deployment.create([
      {
        id: 'DP-001',
        name: 'Morning Rush Deployment',
        location: 'Downtown Core',
        coordinates: { lat: 37.7749, lng: -122.4194 },
        units: [vehicles[0]._id, vehicles[1]._id],
        status: 'completed',
        timeSaved: 494,
        efficiency: 12.4,
        startTime: new Date(Date.now() - 8 * 60 * 60 * 1000),
        endTime: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: 'DP-002',
        name: 'Evening Commute Deployment',
        location: 'Financial District',
        coordinates: { lat: 37.7849, lng: -122.4094 },
        units: [vehicles[2]._id, vehicles[3]._id],
        status: 'active',
        timeSaved: 320,
        efficiency: 10.8,
        startTime: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ]);

    console.log('✅ Created deployments');

    // Create payment methods
    const payments = await Payment.create([
      {
        user: users[0]._id,
        type: 'card',
        provider: 'Visa',
        lastFour: '4242',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true
      },
      {
        user: users[0]._id,
        type: 'card',
        provider: 'Mastercard',
        lastFour: '5555',
        expiryMonth: 8,
        expiryYear: 2024,
        isDefault: false
      },
      {
        user: users[1]._id,
        type: 'card',
        provider: 'Visa',
        lastFour: '1234',
        expiryMonth: 6,
        expiryYear: 2025,
        isDefault: true
      }
    ]);

    console.log('✅ Created payment methods');

    // Create event logs
    const eventLogs = await EventLog.create([
      {
        eventType: 'booking',
        title: 'New Booking Created',
        description: 'User created a new booking from Downtown to Airport',
        severity: 'info',
        relatedId: 'BK-1234567890',
        source: 'system'
      },
      {
        eventType: 'incident',
        title: 'Emergency Incident Reported',
        description: 'Brake system failure reported for Shuttle-402',
        severity: 'critical',
        relatedId: 'EM-402',
        source: 'system'
      },
      {
        eventType: 'deployment',
        title: 'Deployment Initiated',
        description: 'Morning rush deployment started with 2 units',
        severity: 'info',
        relatedId: 'DP-001',
        source: 'operator'
      },
      {
        eventType: 'vehicle',
        title: 'Vehicle Status Change',
        description: 'Vehicle SH-402 changed status to in_transit',
        severity: 'info',
        relatedId: 'SH-402',
        source: 'system'
      }
    ]);

    console.log('✅ Created event logs');

    // Create dispatch queue items
    const dispatchQueue = await Dispatch.create([
      {
        id: 'TX-9012',
        passenger: 'Marcus Thorne',
        origin: 'LHR-T5',
        destination: 'Central Hub',
        priority: 'URGENT',
        autoAssign: 'SV-201',
        status: 'pending',
        estimatedTime: 8,
        distance: 12
      },
      {
        id: 'TX-9013',
        passenger: 'Elena Vance',
        origin: 'District 4',
        destination: 'Skyline Dr',
        priority: 'ROUTINE',
        autoAssign: null,
        status: 'waitlist',
        estimatedTime: 15,
        distance: 8
      },
      {
        id: 'TX-9014',
        passenger: 'James Chen',
        origin: 'Tech Park',
        destination: 'Airport T2',
        priority: 'ROUTINE',
        autoAssign: 'SV-205',
        status: 'assigned',
        vehicle: vehicles[0]._id,
        driver: drivers[0]._id,
        estimatedTime: 22,
        distance: 18
      },
      {
        id: 'TX-9015',
        passenger: 'Sarah Miller',
        origin: 'Union Station',
        destination: 'Financial District',
        priority: 'LOW',
        autoAssign: null,
        status: 'pending',
        estimatedTime: 10,
        distance: 5
      }
    ]);

    console.log('✅ Created dispatch queue items');

    // Create safety events
    const safetyEvents = await SafetyEvent.create([
      {
        unit: 'Unit #8421',
        type: 'Harsh Braking',
        icon: 'emergency_home',
        color: 'red',
        time: '2M AGO',
        description: 'Impact force: 0.85g at 45mph. Driver identified.',
        severity: 'high',
        driver: drivers[0]._id,
        impactForce: 0.85,
        speed: 45,
        speedLimit: 45
      },
      {
        unit: 'Unit #9031',
        type: 'Speed Limit +15',
        icon: 'speed',
        color: 'orange',
        time: '14M AGO',
        description: 'Observed speed 70mph in a 55mph construction zone.',
        severity: 'medium',
        driver: drivers[1]._id,
        speed: 70,
        speedLimit: 55
      },
      {
        unit: 'Unit #1105',
        type: 'Aggressive Turn',
        icon: 'turn_right',
        color: 'slate',
        time: '42M AGO',
        description: 'Lateral g-force exceeded safety threshold on exit 14B.',
        severity: 'low',
        driver: drivers[2]._id
      },
      {
        unit: 'Unit #5521',
        type: 'Lane Departure',
        icon: 'lanes',
        color: 'orange',
        time: '1H AGO',
        description: 'Vehicle drifted across lane markers without signaling.',
        severity: 'medium',
        driver: drivers[0]._id
      }
    ]);

    console.log('✅ Created safety events');

    // Create riders
    const riders = await Rider.create([
      {
        user: users[1]._id,
        name: 'John Doe',
        phone: '+1-555-0123',
        email: 'john@example.com',
        rating: 4.8,
        totalRides: 45,
        preferredVehicle: 'standard',
        homeLocation: '123 Main St, Downtown',
        workLocation: '456 Business Ave, Financial District',
        isVerified: true,
        notes: 'Prefers quiet rides'
      },
      {
        user: users[0]._id,
        name: 'Cmdr. Operative',
        phone: '+1-555-0199',
        email: 'operative@shuttlecore.ai',
        rating: 5.0,
        totalRides: 120,
        preferredVehicle: 'xl',
        homeLocation: 'Systems Command HQ',
        workLocation: 'Systems Command HQ',
        isVerified: true,
        notes: 'VIP user - priority service'
      },
      {
        user: users[1]._id,
        name: 'Jane Smith',
        phone: '+1-555-0456',
        email: 'jane@example.com',
        rating: 4.5,
        totalRides: 28,
        preferredVehicle: 'bike',
        homeLocation: '789 Oak Lane',
        workLocation: '321 Tech Park',
        isVerified: false,
        notes: ''
      }
    ]);

    console.log('✅ Created riders');

    console.log('🎉 Seeding completed successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
