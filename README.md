<div align="center">

<br/>

```
  ███████╗███╗   ███╗ █████╗ ██████╗ ████████╗    ███████╗██╗  ██╗██╗   ██╗████████╗████████╗██╗     ███████╗
  ██╔════╝████╗ ████║██╔══██╗██╔══██╗╚══██╔══╝    ██╔════╝██║  ██║██║   ██║╚══██╔══╝╚══██╔══╝██║     ██╔════╝
  ███████╗██╔████╔██║███████║██████╔╝   ██║       ███████╗███████║██║   ██║   ██║      ██║   ██║     █████╗  
  ╚════██║██║╚██╔╝██║██╔══██║██╔══██╗   ██║       ╚════██║██╔══██║██║   ██║   ██║      ██║   ██║     ██╔══╝  
  ███████║██║ ╚═╝ ██║██║  ██║██║  ██║   ██║       ███████║██║  ██║╚██████╔╝   ██║      ██║   ███████╗███████╗
  ╚══════╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚══════╝╚═╝  ╚═╝ ╚═════╝    ╚═╝      ╚═╝   ╚══════╝╚══════╝
```

### 🚐 Real-Time Dynamic Office Shuttle Routing

<br/>




<br/>

---

</div>

## 📌 The Problem

Corporate employees commuting to business parks and IT campuses face a daily frustration: **fixed-route shuttles that don't adapt to reality.**

| Pain Point | Impact |
|---|---|
| ⏳ Long waits at pickup points | Lost productivity before the workday even starts |
| 🪑 Empty seats on some routes | Wasted fuel and operational costs |
| 🚍 Overcrowded shuttles on others | Poor employee experience |
| 🛣️ Rigid, unadjusted routes | Inefficient fleet utilization |

Traditional systems are built around schedules — **Smart Shuttle is built around people.**

---

## 💡 The Solution

**Smart Shuttle** is a demand-responsive transportation platform that dynamically routes corporate vehicles based on **live employee requests**, real-time traffic data, and intelligent route optimization.

Instead of employees adjusting to the shuttle, the shuttle adjusts to employees.

```
Employee Request  →  Route Optimization Engine  →  Driver App  →  Real-Time Tracking
```

---

## 🚀 Key Features

<table>
<tr>
<td width="50%">

**🧭 Core Functionality**
- 📍 Real-time ride requests from employees
- 🔄 Dynamic route generation & optimization
- 🚦 Live traffic-aware navigation
- 👥 Smart seat allocation per vehicle
- 🔔 Push notifications for arrivals & delays

</td>
<td width="50%">

**📊 Operations & Management**
- 🖥️ Admin dashboard for full fleet oversight
- 📱 Mobile-first, responsive interface
- 🗺️ Live shuttle tracking on map
- 📈 Route efficiency analytics
- 🧠 AI-based demand prediction *(roadmap)*

</td>
</tr>
</table>

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Smart Shuttle System                      │
├────────────┬────────────┬──────────────┬───────────┬────────────┤
│  Employee  │  Mobile /  │  Backend API │   Route   │  Driver    │
│  Request   │  Web App   │  (Node.js /  │  Engine   │  App       │
│            │            │  Express)    │           │            │
└────────────┴────────────┴──────────────┴───────────┴────────────┘
                                  │
              ┌───────────────────┼──────────────────┐
              │                   │                  │
         ┌────▼────┐        ┌─────▼──────┐    ┌──────▼──────┐
         │ MongoDB  │        │ Google     │    │ Notification │
         │ Firebase │        │ Maps API   │    │ Service      │
         └──────────┘        └────────────┘    └─────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML · CSS · JavaScript · React.js · Tailwind CSS |
| **Backend** | Node.js · Express.js |
| **Database** | MongoDB · Firebase |
| **Maps & Navigation** | Google Maps API · Real-Time Traffic API |
| **Notifications** | Push Notification Service |

---

## 📂 Project Structure

```
Smart-Shuttle/
│
├── 📁 frontend/          # React UI — employee & driver interfaces
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level views
│   │   └── assets/       # Icons, images, fonts
│
├── 📁 backend/           # Express.js server & REST APIs
│   ├── routes/           # API route handlers
│   ├── controllers/      # Business logic
│   ├── models/           # Database schemas
│   └── middleware/       # Auth, logging, error handling
│
├── 📁 database/          # MongoDB schemas & seed data
│
├── 📁 docs/              # Architecture diagrams, API docs
│
├── 📁 assets/            # Project-wide images & branding
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://npmjs.com/) v9+
- [MongoDB](https://www.mongodb.com/) or a Firebase project
- A [Google Maps API key](https://developers.google.com/maps)

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Dharmi-456-design/shuttlecore
cd smart-shuttle
```

**2. Install dependencies**

```bash
npm install
```

**3. Set up environment variables**

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_MAPS_API_KEY=your_api_key
NOTIFICATION_SERVICE_KEY=your_notification_key
```

**4. Start the development server**

```bash
npm start
```

Visit `http://localhost:3000` to access the app.

---

## 🧪 How It Works

```
1. 🧑‍💼  Employee registers & logs in
       ↓
2. 📍  Submits a ride request with pickup location & time
       ↓
3. 🧭  Route Optimization Engine groups nearby requests
       ↓
4. 🚐  Shuttle is dynamically assigned & driver is notified
       ↓
5. 📱  Employee tracks shuttle live on the map
       ↓
6. 🔔  Arrival & delay notifications sent in real-time
```

---

## 🌐 Live Deployment

Check out the live application:
🚀 **[Live Demo on Netlify](https://shuttle-core2.netlify.app/)**


---
## 🎨 Figma Design
 
Explore the full UI/UX design of Smart Shuttle — including wireframes, components, and interactive prototypes.
 
| Design Asset | Link |
|---|---|
| 🖼️ Figma Design | [View on Figma](https://www.figma.com/design/Xv1ZUE3iEw4Y2r0D3eEEsM/Untitled?node-id=652-2&p=f&t=Xoa9GLNwZKz1GHoj-0) |

---

## 📖 API Documentation

Comprehensive API documentation for the Smart Shuttle backend.

| Documentation | Link |
|---|---|
| 📮 Postman Docs | [View on Postman](https://documenter.getpostman.com/view/50839318/2sBXqKofEP) |


---

## 🎯 Roadmap

- [x] Project scaffolding & architecture design
- [ ] Employee ride request flow
- [ ] Real-time route optimization engine
- [ ] Live shuttle tracking with Google Maps
- [ ] Driver mobile interface
- [ ] Admin fleet management dashboard
- [ ] Push notification integration
- [ ] 🤖 AI-based demand forecasting
- [ ] 🌍 Multi-campus / multi-city support
- [ ] 🧾 Automated billing & reporting
- [ ] 🔋 EV fleet integration

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how to get involved:

```bash
# Fork the repo, then:
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change clearly"
git push origin feature/your-feature-name
# Open a Pull Request 🎉
```


---

## 👨‍💻 Author

<table>
<tr>
<td align="center">
<b>Dharmi Patel</b><br/>
🚀 Passionate about solving real-world transportation problems using technology.<br/>
<a href="https://github.com/Dharmi-456-design">GitHub</a>
</td>
</tr>
</table>

---

## ⭐ Support the Project

If Smart Shuttle resonates with you:

- ⭐ **Star** the repository to show support
- 🍴 **Fork** it and build something great
- 🛠️ **Contribute** a fix, feature, or idea


---

<div align="center">

**Built with purpose. Driven by demand. Optimized for people.**

<br/>

*Smart Shuttle — because your commute should work for you.*

</div>
