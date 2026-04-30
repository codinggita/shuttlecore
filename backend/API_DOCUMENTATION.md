# ShuttleCore Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "organization": "Optional",
  "role": "user"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "organization": "Optional",
    "role": "user",
    "avatar": ""
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "organization": "",
    "role": "user",
    "avatar": ""
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Bookings

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicleId": "vehicle_id_here",
  "pickup": "123 Main St",
  "dropoff": "456 Oak Ave",
  "paymentMethod": "card",
  "discountCode": "WELCOME20",
  "bookingType": "now",
  "reserveDate": null,
  "reserveTime": null
}
```

**Response:**
```json
{
  "success": true,
  "booking": {
    "id": "BK-1234567890",
    "vehicle": {
      "id": "vehicle_id",
      "name": "Standard Ride",
      "type": "standard",
      "basePrice": 89
    },
    "pickup": "123 Main St",
    "dropoff": "456 Oak Ave",
    "price": 71,
    "paymentMethod": "card",
    "discount": {
      "code": "WELCOME20",
      "percentage": 20
    },
    "status": "confirmed",
    "bookingType": "now",
    "timestamp": "2024-01-15T10:30:00.000Z",
    "reserveDate": null,
    "reserveTime": null
  }
}
```

#### Get All Bookings
```http
GET /api/bookings
Authorization: Bearer <token>
```

#### Get Single Booking
```http
GET /api/bookings/:id
Authorization: Bearer <token>
```

#### Update Booking Status
```http
PUT /api/bookings/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "confirmed"
}
```

#### Cancel Booking
```http
DELETE /api/bookings/:id
Authorization: Bearer <token>
```

### Vehicles

#### Get All Vehicles
```http
GET /api/vehicles
```

**Response:**
```json
{
  "success": true,
  "vehicles": [
    {
      "id": "vehicle_id",
      "unitId": "SH-402",
      "type": "standard",
      "name": "Standard Ride",
      "basePrice": 89,
      "capacity": 4,
      "features": ["2 min pickup", "Verified drivers", "Live tracking"],
      "image": "https://...",
      "status": "available",
      "battery": 85,
      "speed": 0,
      "heading": "N/A",
      "lastUpdate": "Just now"
    }
  ]
}
```

#### Get Single Vehicle
```http
GET /api/vehicles/:id
```

#### Update Vehicle Status (Admin/Operator only)
```http
PUT /api/vehicles/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in_transit",
  "battery": 80,
  "speed": 25,
  "heading": "Northbound",
  "currentLocation": {
    "lat": 37.7749,
    "lng": -122.4194
  }
}
```

#### Create Vehicle (Admin only)
```http
POST /api/vehicles
Authorization: Bearer <token>
Content-Type: application/json

{
  "unitId": "SH-999",
  "type": "standard",
  "name": "New Vehicle",
  "basePrice": 89,
  "capacity": 4,
  "features": ["Feature 1", "Feature 2"],
  "image": "https://..."
}
```

### Incidents

#### Get All Incidents
```http
GET /api/incidents
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "incidents": [
    {
      "id": "EM-402",
      "type": "Brake System Failure",
      "severity": "critical",
      "unit": "Shuttle-402",
      "location": "Downtown Core - 5th Ave",
      "coordinates": {
        "lat": 34.0522,
        "lng": -118.2437
      },
      "passengers": 4,
      "battery": 12,
      "speed": 0,
      "heading": "N/A",
      "lastUpdate": "4s ago",
      "description": "Emergency regenerative braking engaged...",
      "nearbyUnits": ["SH-102 (2m)", "SH-881 (5m)"],
      "logs": [
        { "time": "14:02:11", "msg": "CORE_BOOT: Emergency Protocol Engaged" }
      ],
      "status": "active"
    }
  ]
}
```

#### Get Single Incident
```http
GET /api/incidents/:id
Authorization: Bearer <token>
```

#### Create Incident (Admin/Operator only)
```http
POST /api/incidents
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "Sensor Failure",
  "severity": "high",
  "unit": "Shuttle-402",
  "location": "Downtown",
  "coordinates": { "lat": 34.0522, "lng": -118.2437 },
  "passengers": 2,
  "description": "Description here"
}
```

#### Resolve Incident (Admin/Operator only)
```http
PUT /api/incidents/:id/resolve
Authorization: Bearer <token>
```

#### Update Incident (Real-time data)
```http
PUT /api/incidents/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "battery": 15,
  "speed": 0,
  "lastUpdate": "Just now"
}
```

### Drivers

#### Get All Drivers (Admin/Operator only)
```http
GET /api/drivers
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "drivers": [
    {
      "id": "driver_id",
      "driverId": "DRV-001",
      "name": "Michael Johnson",
      "email": "michael.j@shuttlecore.ai",
      "phone": "+1-555-0101",
      "vehicle": {
        "id": "vehicle_id",
        "unitId": "SH-402",
        "name": "Standard Ride",
        "type": "standard"
      },
      "status": "available",
      "rating": 4.8,
      "totalTrips": 1250,
      "currentLocation": { "lat": 37.7749, "lng": -122.4194 },
      "earnings": 45000,
      "isVerified": true
    }
  ]
}
```

#### Get Single Driver
```http
GET /api/drivers/:id
Authorization: Bearer <token>
```

#### Update Driver Status (Admin/Operator only)
```http
PUT /api/drivers/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "on_trip",
  "currentLocation": { "lat": 37.7749, "lng": -122.4194 }
}
```

#### Create Driver (Admin only)
```http
POST /api/drivers
Authorization: Bearer <token>
Content-Type: application/json

{
  "driverId": "DRV-004",
  "name": "New Driver",
  "email": "driver@shuttlecore.ai",
  "phone": "+1-555-0104"
}
```

### Clusters

#### Get All Clusters
```http
GET /api/clusters
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "clusters": [
    {
      "id": "#1",
      "name": "North Financial Plaza",
      "location": "Downtown Financial District",
      "coordinates": { "lat": 37.7949, "lng": -122.3994 },
      "passengers": 12,
      "shuttlesAssigned": 1,
      "status": "active",
      "color": "bg-emerald-500",
      "demand": "High",
      "lastUpdate": "Just now"
    }
  ]
}
```

#### Get Single Cluster
```http
GET /api/clusters/:id
Authorization: Bearer <token>
```

#### Update Cluster (Admin/Operator only)
```http
PUT /api/clusters/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "passengers": 15,
  "shuttlesAssigned": 2,
  "demand": "High",
  "status": "active"
}
```

#### Create Cluster (Admin only)
```http
POST /api/clusters
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Cluster",
  "location": "Downtown",
  "coordinates": { "lat": 37.7749, "lng": -122.4194 },
  "passengers": 10
}
```

### Notifications

#### Get All Notifications
```http
GET /api/notifications
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "notifications": [
    {
      "id": "notif_id",
      "title": "Ride Confirmed",
      "message": "Your ride to Downtown has been confirmed.",
      "type": "success",
      "isRead": false,
      "actionUrl": "/ride-history",
      "metadata": {},
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Mark Notification as Read
```http
PUT /api/notifications/:id/read
Authorization: Bearer <token>
```

#### Mark All Notifications as Read
```http
PUT /api/notifications/read-all
Authorization: Bearer <token>
```

#### Create Notification (Admin only)
```http
POST /api/notifications
Authorization: Bearer <token>
Content-Type: application/json

{
  "user": "user_id",
  "title": "Alert",
  "message": "Notification message",
  "type": "warning"
}
```

### Deployments

#### Get All Deployments (Admin/Operator only)
```http
GET /api/deployments
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "deployments": [
    {
      "id": "DP-001",
      "name": "Morning Rush Deployment",
      "location": "Downtown Core",
      "coordinates": { "lat": 37.7749, "lng": -122.4194 },
      "units": [
        {
          "id": "vehicle_id",
          "unitId": "SH-402",
          "name": "Standard Ride",
          "type": "standard"
        }
      ],
      "status": "completed",
      "timeSaved": 494,
      "efficiency": 12.4,
      "startTime": "2024-01-15T08:00:00.000Z",
      "endTime": "2024-01-15T14:00:00.000Z"
    }
  ]
}
```

#### Get Single Deployment
```http
GET /api/deployments/:id
Authorization: Bearer <token>
```

#### Create Deployment (Admin/Operator only)
```http
POST /api/deployments
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Deployment",
  "location": "Downtown",
  "coordinates": { "lat": 37.7749, "lng": -122.4194 },
  "unitIds": ["vehicle_id_1", "vehicle_id_2"]
}
```

#### Update Deployment (Admin/Operator only)
```http
PUT /api/deployments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed",
  "timeSaved": 500,
  "efficiency": 13.0,
  "endTime": "2024-01-15T14:00:00.000Z"
}
```

### Payments

#### Get All Payment Methods
```http
GET /api/payments
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "payments": [
    {
      "id": "payment_id",
      "type": "card",
      "provider": "Visa",
      "lastFour": "4242",
      "expiryMonth": 12,
      "expiryYear": 2025,
      "isDefault": true
    }
  ]
}
```

#### Add Payment Method
```http
POST /api/payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "card",
  "provider": "Visa",
  "lastFour": "4242",
  "expiryMonth": 12,
  "expiryYear": 2025,
  "isDefault": false
}
```

#### Set Default Payment Method
```http
PUT /api/payments/:id/default
Authorization: Bearer <token>
```

#### Delete Payment Method
```http
DELETE /api/payments/:id
Authorization: Bearer <token>
```

### Event Logs

#### Get All Event Logs (Admin/Operator only)
```http
GET /api/event-logs?eventType=booking&severity=info&limit=100
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "logs": [
    {
      "id": "log_id",
      "eventType": "booking",
      "title": "New Booking Created",
      "description": "User created a new booking from Downtown to Airport",
      "severity": "info",
      "relatedId": "BK-1234567890",
      "metadata": {},
      "source": "system",
      "timestamp": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Create Event Log (Admin only)
```http
POST /api/event-logs
Authorization: Bearer <token>
Content-Type: application/json

{
  "eventType": "booking",
  "title": "Event Title",
  "description": "Event description",
  "severity": "info",
  "relatedId": "BK-1234567890"
}
```

## WebSocket Events

### Client → Server

#### Emergency Trigger
```javascript
socket.emit('emergency_trigger', {
  count: 4,
  location: "Sector 7"
});
```

### Server → Client

#### Connection Established
```javascript
socket.on('connection_established', (data) => {
  // { status: "Nominal", timestamp: "...", message: "..." }
});
```

#### Fleet Location Update (every 2 seconds)
```javascript
socket.on('fleet_location_update', (data) => {
  // { unit: "TX-402", lat: "...", lng: "...", velocity: 45, heading: "Northbound", battery: 85, timestamp: "..." }
});
```

#### Live Map Update (every 1 second) - **NEW**
```javascript
socket.on('live_map_update', (data) => {
  // {
  //   vehicles: [
  //     { unitId: "SH-402", lat: "...", lng: "...", status: "in_transit", speed: 25, heading: "Northbound", battery: 85, timestamp: "..." },
  //     { unitId: "SH-881", lat: "...", lng: "...", status: "available", speed: 0, heading: "N/A", battery: 90, timestamp: "..." }
  //   ],
  //   center: { lat: 37.7749, lng: -122.4194 },
  //   zoom: 13
  // }
});
```

#### Status Change (every 3 seconds)
```javascript
socket.on('status_change', (data) => {
  // { unit: "NY-881", status: "Transit", progress: 75, timestamp: "..." }
});
```

#### Urgent Alert (every 10 seconds)
```javascript
socket.on('urgent_alert', (data) => {
  // { id: "ALRT-123", level: "WARNING", message: "...", time: "..." }
});
```

#### Emergency Broadcast
```javascript
socket.on('emergency_broadcast', (data) => {
  // { count: 4, location: "Sector 7", timestamp: "..." }
});
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

Common status codes:
- 400: Bad Request (validation errors)
- 401: Unauthorized (invalid/missing token)
- 403: Forbidden (insufficient permissions)
- 404: Not Found (resource doesn't exist)
- 500: Server Error

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update .env with your configuration

4. Start MongoDB (ensure it's running on localhost:27017)

5. Seed the database:
```bash
npm run seed
```

6. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Database Models

### User
- firstName, lastName, email, password
- organization, role, avatar, phone
- isActive (boolean)

### Vehicle
- unitId, type, name, basePrice
- capacity, features, image
- status, currentLocation
- battery, speed, heading, lastUpdate

### Booking
- id, user, vehicle
- pickup, dropoff, price
- paymentMethod, discount
- status, bookingType
- reserveDate, reserveTime
- coordinates

### Incident
- id, type, severity, unit
- location, coordinates
- passengers, battery, speed
- heading, lastUpdate
- description, nearbyUnits, logs
- status, resolvedAt

### Discount
- code, description, percentage
- maxDiscount, minOrder
- validFrom, validUntil
- isActive, usageCount, maxUsage

### Driver
- driverId, name, email, phone
- vehicle (reference)
- status, rating, totalTrips
- currentLocation, earnings
- isVerified

### Cluster
- id, name, location
- coordinates, passengers
- shuttlesAssigned, status
- color, demand, lastUpdate

### Notification
- user (reference), title, message
- type, isRead, actionUrl
- metadata

### Deployment
- id, name, location
- coordinates, units (array of vehicle references)
- status, timeSaved, efficiency
- startTime, endTime

### Payment
- user (reference), type, provider
- lastFour, expiryMonth, expiryYear
- isDefault, isActive

### EventLog
- eventType, title, description
- severity, relatedId, metadata
- source
