import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import api from "../services/api";

const DriverDetailsPage = () => {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { driverName } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [driver, setDriver] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch driver data on mount
  useEffect(() => {
    const fetchDriverData = async () => {
      setIsLoading(true);
      try {
        const driverId = location.state?.driverId || location.state?.driver?._id;
        
        if (driverId) {
          const response = await api.get(`/drivers/${driverId}`);
          setDriver(response.data.driver);
        } else if (location.state?.driver) {
          // Use driver from location state if available
          setDriver(location.state.driver);
        }
      } catch (error) {
        console.error("Error fetching driver data:", error);
        // Fallback to location state if API fails
        if (location.state?.driver) {
          setDriver(location.state.driver);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDriverData();
  }, [location.state]);

  // Get driver data from state or API
  const passedDriver = driver || location.state?.driver;
  
  // Default values for missing properties
  const defaultDriverData = {
    employeeId: "DRV-2024-0000",
    joined: "Unknown",
    license: "Class C Commercial",
    certifications: [],
    phone: "N/A",
    email: "N/A",
    status: "Active",
    vehicle: "Unassigned",
    vehicleType: "Standard Shuttle",
    shift: "Day Shift",
    supervisor: "Fleet Manager",
    bio: "Experienced operator with consistent performance record.",
    safetyMetrics: { harshBraking: 0, speeding: 0, laneDeparture: 0, collisionWarning: 0, fatigueAlert: 0 },
    weeklyHours: [40, 40, 40, 40, 40, 0, 0],
    efficiencyHistory: [
      { day: "Mon", score: 90 }, { day: "Tue", score: 90 }, { day: "Wed", score: 90 },
      { day: "Thu", score: 90 }, { day: "Fri", score: 90 }, { day: "Sat", score: 90 }, { day: "Sun", score: 90 },
    ],
    recentTrips: [],
    achievements: [],
  };
  
  // Extended driver profiles with unique details for each driver
  const driverProfiles = {
    "marcus-vance": {
      name: "Marcus Vance",
      rank: "01",
      division: "Heavy Haul Div.",
      miles: "1,244 mi",
      alerts: 0,
      score: 98,
      scoreColor: "green",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBw7z2R0KH4HAZsobWRb4qGmGVYYjd-k0Dcm_PoYHQoUjLloqkYz3uL6Dj_iAvjjcCHTPOR4w8svAie85uoZaIqMZsvLnGOYKISvT2yZesD0Q4GuLvMfP3AckWIZFjXdzeU6cWSOopx8qlZ8ataQmtJk3GjJ127zpnuNzZhNfIPH1XlnY4cro6dmvlDPuqp5ZTbPTB26Cd0WNMnWn9-L-a19Tsi1krTB5N002-pXP90kHxUypgkg7YRQxwhltEKueNImZNXi01bwY",
      employeeId: "DRV-2021-0892",
      joined: "March 2021",
      license: "Class A CDL",
      certifications: ["Hazmat", "Tanker", "Double/Triple"],
      phone: "+1 (415) 555-0147",
      email: "m.vance@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #8421",
      vehicleType: "Autonomous Heavy Hauler SH-4000",
      shift: "Night Shift (22:00 - 06:00)",
      supervisor: "Cmdr. Sarah Mitchell",
      bio: "Marcus is a veteran operator with 15+ years of commercial driving experience. Specialized in heavy freight logistics with zero safety incidents since joining ShuttleCore. Lead trainer for new autonomous system protocols.",
      safetyMetrics: {
        harshBraking: 0,
        speeding: 0,
        laneDeparture: 0,
        collisionWarning: 0,
        fatigueAlert: 0,
      },
      weeklyHours: [42, 38, 45, 40, 44, 36, 41],
      efficiencyHistory: [
        { day: "Mon", score: 97 },
        { day: "Tue", score: 98 },
        { day: "Wed", score: 99 },
        { day: "Thu", score: 98 },
        { day: "Fri", score: 97 },
        { day: "Sat", score: 98 },
        { day: "Sun", score: 98 },
      ],
      recentTrips: [
        { id: "TR-4521", route: "Port of Oakland → Distribution Center", cargo: "Electronics", status: "Completed", time: "6h 24m", distance: "142 mi", date: "Apr 30" },
        { id: "TR-4520", route: "Richmond Terminal → San Jose Hub", cargo: "Auto Parts", status: "Completed", time: "4h 12m", distance: "98 mi", date: "Apr 29" },
        { id: "TR-4519", route: "Vallejo Port → Sacramento", cargo: "Construction Materials", status: "Completed", time: "5h 38m", distance: "156 mi", date: "Apr 28" },
      ],
      achievements: [
        { icon: "military_tech", title: "Zero Incidents", desc: "3 Years Without Safety Events", color: "emerald" },
        { icon: "workspace_premium", title: "Top Performer", desc: "Q1 2024 Fleet Leader", color: "blue" },
        { icon: "star", title: "Mentor Status", desc: "Training 4 New Operators", color: "amber" },
      ],
    },
    "sarah-chen": {
      name: "Sarah Chen",
      rank: "02",
      division: "Regional Express",
      miles: "982 mi",
      alerts: 2,
      score: 94,
      scoreColor: "cyan",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkPtYBkrZ1lh4wsjxLGQ5CgWDU2vCTb-sVLnpPYFG6uHymmU7QPwgtCKlHwn0UH5ij6vb8wgvVFVjGH00WRha2mJFeQdBfhJ-qnXwLx7sB63znEJpaQJVbzD0LDobfMK-D74qhY5V949XSk-uF741quEhLNOe8RynMF7FthVA238WUvFJC6wFjV8jKeh93B_ab0y8_IUb1IedudkbQH28cxoq9bVXg1lD6EWGOHeas-td8dWvUWkoX2RXc_gDSzctB-RS5oMcB0ok",
      employeeId: "DRV-2022-1247",
      joined: "August 2022",
      license: "Class B CDL",
      certifications: ["Passenger", "Air Brake"],
      phone: "+1 (415) 555-0283",
      email: "s.chen@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #9031",
      vehicleType: "Regional Express Shuttle RE-200",
      shift: "Day Shift (06:00 - 14:00)",
      supervisor: "Cmdr. James Peterson",
      bio: "Sarah excels in regional passenger transport with exceptional route optimization skills. Her 94% efficiency score reflects consistent on-time performance across the Bay Area network.",
      safetyMetrics: {
        harshBraking: 1,
        speeding: 1,
        laneDeparture: 0,
        collisionWarning: 0,
        fatigueAlert: 0,
      },
      weeklyHours: [38, 40, 39, 42, 38, 35, 40],
      efficiencyHistory: [
        { day: "Mon", score: 93 },
        { day: "Tue", score: 94 },
        { day: "Wed", score: 92 },
        { day: "Thu", score: 95 },
        { day: "Fri", score: 94 },
        { day: "Sat", score: 93 },
        { day: "Sun", score: 94 },
      ],
      recentTrips: [
        { id: "TR-4518", route: "SFO Airport → Palo Alto", cargo: "Passengers (12)", status: "Completed", time: "45m", distance: "24 mi", date: "Apr 30" },
        { id: "TR-4517", route: "San Jose → Mountain View", cargo: "Passengers (8)", status: "Completed", time: "32m", distance: "18 mi", date: "Apr 29" },
        { id: "TR-4516", route: "Oakland → Berkeley", cargo: "Passengers (15)", status: "Delayed", time: "1h 15m", distance: "12 mi", date: "Apr 28" },
      ],
      achievements: [
        { icon: "schedule", title: "Punctuality", desc: "98% On-Time Arrival Rate", color: "blue" },
        { icon: "groups", title: "Passenger Rating", desc: "4.9/5.0 Average Score", color: "emerald" },
        { icon: "route", title: "Route Expert", desc: "Master of 12 Regional Routes", color: "cyan" },
      ],
    },
    "david-miller": {
      name: "David Miller",
      rank: "03",
      division: "Last Mile",
      miles: "2,105 mi",
      alerts: 5,
      score: 91,
      scoreColor: "cyan",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqJ-cs0VYoIQd5_LibrD7tr9DGOxbFSyXXVLs_OVWLZKgD1AHXEDn0JeLdA35ZE0lJgHtS5B6xcsQKrNWF_iPzWimDxn6TPUA_S3iy03L-Jgt4Jjwpt_utu96mCN5unFoBwJea7wEGldUhIoBk5cV3EyiIkO60vjSW7jEQ2eOWEjDfzdYZ7xqGfOzzc9wRzKJsdURU2hHxvvacBh1kvb4-fgH8f58Em4Yp3MwWdxL0wN7atSC5GL7AeHiEhe-AI2wCgn6cLj_JZy0",
      employeeId: "DRV-2023-0563",
      joined: "January 2023",
      license: "Class C Commercial",
      certifications: ["Last Mile Delivery", "Electric Vehicle"],
      phone: "+1 (415) 555-0391",
      email: "d.miller@shuttlecore.com",
      status: "Active Duty - Under Review",
      vehicle: "Unit #1105",
      vehicleType: "Last Mile Delivery Pod LM-100",
      shift: "Swing Shift (14:00 - 22:00)",
      supervisor: "Cmdr. Lisa Wong",
      bio: "David covers the highest mileage in the fleet, specializing in dense urban last-mile delivery. Currently working with safety team to improve alert metrics through additional autonomous system training.",
      safetyMetrics: {
        harshBraking: 2,
        speeding: 1,
        laneDeparture: 1,
        collisionWarning: 1,
        fatigueAlert: 0,
      },
      weeklyHours: [48, 50, 46, 52, 45, 44, 47],
      efficiencyHistory: [
        { day: "Mon", score: 89 },
        { day: "Tue", score: 90 },
        { day: "Wed", score: 91 },
        { day: "Thu", score: 90 },
        { day: "Fri", score: 92 },
        { day: "Sat", score: 91 },
        { day: "Sun", score: 91 },
      ],
      recentTrips: [
        { id: "TR-4515", route: "Distribution Center → 47 Deliveries", cargo: "Mixed Packages", status: "Completed", time: "8h 12m", distance: "89 mi", date: "Apr 30" },
        { id: "TR-4514", route: "Sort Facility → 52 Deliveries", cargo: "E-commerce", status: "Completed", time: "7h 45m", distance: "76 mi", date: "Apr 29" },
        { id: "TR-4513", route: "Hub → 38 Deliveries", cargo: "Same-Day", status: "In Progress", time: "5h 30m", distance: "54 mi", date: "Apr 30" },
      ],
      achievements: [
        { icon: "local_shipping", title: "Volume Leader", desc: "Highest Deliveries: 52/day", color: "amber" },
        { icon: "speed", title: "Mileage King", desc: "2,105 Miles This Month", color: "rose" },
        { icon: "trending_up", title: "Improving", desc: "Score Up 3 Points This Week", color: "emerald" },
      ],
    },
    "jennifer-park": {
      name: "Jennifer Park",
      rank: "04",
      division: "Regional Express",
      miles: "876 mi",
      alerts: 3,
      score: 89,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=jennifer.park@shuttlecore.com",
      employeeId: "DRV-2023-0789",
      joined: "June 2023",
      license: "Class B CDL",
      certifications: ["Passenger", "Defensive Driving"],
      phone: "+1 (415) 555-0456",
      email: "j.park@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #4521",
      vehicleType: "Shuttle Coach SC-150",
      shift: "Day Shift (08:00 - 16:00)",
      supervisor: "Cmdr. James Peterson",
      bio: "Jennifer specializes in airport shuttle services with exceptional customer service ratings. Her 89% efficiency score reflects consistent on-time performance for regional routes.",
      safetyMetrics: { harshBraking: 1, speeding: 1, laneDeparture: 1, collisionWarning: 0, fatigueAlert: 0 },
      weeklyHours: [38, 40, 38, 42, 38, 32, 36],
      efficiencyHistory: [
        { day: "Mon", score: 88 }, { day: "Tue", score: 89 }, { day: "Wed", score: 90 },
        { day: "Thu", score: 89 }, { day: "Fri", score: 88 }, { day: "Sat", score: 89 }, { day: "Sun", score: 89 },
      ],
      recentTrips: [
        { id: "TR-4508", route: "SFO → Downtown", cargo: "Passengers (20)", status: "Completed", time: "55m", distance: "28 mi", date: "Apr 30" },
        { id: "TR-4507", route: "Oakland → SJC", cargo: "Passengers (15)", status: "Completed", time: "1h 12m", distance: "42 mi", date: "Apr 29" },
        { id: "TR-4506", route: "SFO → Palo Alto", cargo: "Passengers (18)", status: "Delayed", time: "1h 30m", distance: "22 mi", date: "Apr 28" },
      ],
      achievements: [
        { icon: "airport_shuttle", title: "Airport Expert", desc: "200+ Airport Runs", color: "blue" },
        { icon: "sentiment_satisfied", title: "Service Star", desc: "4.8/5 Rating", color: "emerald" },
      ],
    },
    "michael-torres": {
      name: "Michael Torres",
      rank: "05",
      division: "Heavy Haul Div.",
      miles: "1,156 mi",
      alerts: 4,
      score: 87,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=michael.torres@shuttlecore.com",
      employeeId: "DRV-2022-0456",
      joined: "September 2022",
      license: "Class A CDL",
      certifications: ["Hazmat", "Tanker"],
      phone: "+1 (415) 555-0789",
      email: "m.torres@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #5621",
      vehicleType: "Heavy Hauler HH-3000",
      shift: "Night Shift (22:00 - 06:00)",
      supervisor: "Cmdr. Sarah Mitchell",
      bio: "Michael handles heavy freight operations with specialized hazmat certification. Working on improving alert metrics through additional training programs.",
      safetyMetrics: { harshBraking: 1, speeding: 1, laneDeparture: 1, collisionWarning: 1, fatigueAlert: 0 },
      weeklyHours: [44, 46, 42, 48, 44, 40, 42],
      efficiencyHistory: [
        { day: "Mon", score: 85 }, { day: "Tue", score: 86 }, { day: "Wed", score: 87 },
        { day: "Thu", score: 88 }, { day: "Fri", score: 87 }, { day: "Sat", score: 88 }, { day: "Sun", score: 87 },
      ],
      recentTrips: [
        { id: "TR-4505", route: "Port → Sacramento", cargo: "Chemicals", status: "Completed", time: "5h 45m", distance: "128 mi", date: "Apr 30" },
        { id: "TR-4504", route: "Richmond → Fresno", cargo: "Fuel", status: "Completed", time: "6h 30m", distance: "186 mi", date: "Apr 28" },
        { id: "TR-4503", route: "Vallejo → Stockton", cargo: "Industrial", status: "In Progress", time: "3h 15m", distance: "89 mi", date: "Apr 30" },
      ],
      achievements: [
        { icon: "warning", title: "Hazmat Certified", desc: "Transport Specialist", color: "amber" },
        { icon: "local_shipping", title: "Heavy Hauler", desc: "50K Tons Moved", color: "rose" },
      ],
    },
    "lisa-wong": {
      name: "Lisa Wong",
      rank: "06",
      division: "Last Mile",
      miles: "1,945 mi",
      alerts: 6,
      score: 85,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=lisa.wong@shuttlecore.com",
      employeeId: "DRV-2023-0123",
      joined: "January 2023",
      license: "Class C Commercial",
      certifications: ["Last Mile Delivery", "Electric Vehicle"],
      phone: "+1 (415) 555-0321",
      email: "l.wong@shuttlecore.com",
      status: "Active Duty - Under Review",
      vehicle: "Unit #1203",
      vehicleType: "Delivery Pod DP-200",
      shift: "Swing Shift (14:00 - 22:00)",
      supervisor: "Cmdr. Lisa Wong",
      bio: "Lisa specializes in high-volume last-mile delivery operations. Currently working with safety team on reducing alert frequency through coaching.",
      safetyMetrics: { harshBraking: 2, speeding: 1, laneDeparture: 1, collisionWarning: 1, fatigueAlert: 1 },
      weeklyHours: [48, 50, 48, 52, 46, 44, 46],
      efficiencyHistory: [
        { day: "Mon", score: 83 }, { day: "Tue", score: 84 }, { day: "Wed", score: 85 },
        { day: "Thu", score: 86 }, { day: "Fri", score: 85 }, { day: "Sat", score: 86 }, { day: "Sun", score: 85 },
      ],
      recentTrips: [
        { id: "TR-4502", route: "Hub → 45 Deliveries", cargo: "Packages", status: "Completed", time: "7h 30m", distance: "82 mi", date: "Apr 30" },
        { id: "TR-4501", route: "Sort → 38 Deliveries", cargo: "E-commerce", status: "Completed", time: "6h 45m", distance: "68 mi", date: "Apr 29" },
        { id: "TR-4500", route: "DC → 42 Deliveries", cargo: "Same-Day", status: "Completed", time: "7h 15m", distance: "76 mi", date: "Apr 28" },
      ],
      achievements: [
        { icon: "local_shipping", title: "High Volume", desc: "45 Deliveries/Day", color: "amber" },
        { icon: "electric_bolt", title: "EV Driver", desc: "Zero Emissions", color: "emerald" },
      ],
    },
    "james-wilson": {
      name: "James Wilson",
      rank: "07",
      division: "Regional Express",
      miles: "743 mi",
      alerts: 4,
      score: 84,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=james.wilson@shuttlecore.com",
      employeeId: "DRV-2023-0567",
      joined: "March 2023",
      license: "Class B CDL",
      certifications: ["Passenger", "ADA Certified"],
      phone: "+1 (415) 555-0654",
      email: "j.wilson@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #3421",
      vehicleType: "Accessible Shuttle AS-100",
      shift: "Day Shift (06:00 - 14:00)",
      supervisor: "Cmdr. James Peterson",
      bio: "James specializes in accessible transportation services for passengers with disabilities. Committed to providing safe and comfortable rides for all passengers.",
      safetyMetrics: { harshBraking: 1, speeding: 0, laneDeparture: 1, collisionWarning: 1, fatigueAlert: 1 },
      weeklyHours: [36, 38, 40, 38, 36, 32, 34],
      efficiencyHistory: [
        { day: "Mon", score: 82 }, { day: "Tue", score: 83 }, { day: "Wed", score: 84 },
        { day: "Thu", score: 85 }, { day: "Fri", score: 84 }, { day: "Sat", score: 83 }, { day: "Sun", score: 84 },
      ],
      recentTrips: [
        { id: "TR-4499", route: "Medical Center Loop", cargo: "Passengers (8)", status: "Completed", time: "4h 15m", distance: "32 mi", date: "Apr 30" },
        { id: "TR-4498", route: "Senior Center Route", cargo: "Passengers (12)", status: "Completed", time: "3h 30m", distance: "28 mi", date: "Apr 29" },
        { id: "TR-4497", route: "Rehab Center → Homes", cargo: "Passengers (6)", status: "Completed", time: "2h 45m", distance: "19 mi", date: "Apr 28" },
      ],
      achievements: [
        { icon: "accessible", title: "ADA Specialist", desc: "Accessibility Expert", color: "blue" },
        { icon: "favorite", title: "Caring Driver", desc: "5-Star Care Rating", color: "rose" },
      ],
    },
    "emma-davis": {
      name: "Emma Davis",
      rank: "08",
      division: "Last Mile",
      miles: "1,678 mi",
      alerts: 7,
      score: 82,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=emma.davis@shuttlecore.com",
      employeeId: "DRV-2024-0012",
      joined: "February 2024",
      license: "Class C Commercial",
      certifications: ["Last Mile Delivery"],
      phone: "+1 (415) 555-0234",
      email: "e.davis@shuttlecore.com",
      status: "Probationary",
      vehicle: "Unit #0124",
      vehicleType: "Delivery Pod DP-100",
      shift: "Swing Shift (14:00 - 22:00)",
      supervisor: "Cmdr. Lisa Wong",
      bio: "Emma is a new recruit in her probationary period. Currently receiving additional coaching and training to improve safety metrics and operational efficiency.",
      safetyMetrics: { harshBraking: 2, speeding: 2, laneDeparture: 2, collisionWarning: 1, fatigueAlert: 0 },
      weeklyHours: [44, 46, 44, 48, 42, 38, 40],
      efficiencyHistory: [
        { day: "Mon", score: 80 }, { day: "Tue", score: 81 }, { day: "Wed", score: 82 },
        { day: "Thu", score: 83 }, { day: "Fri", score: 82 }, { day: "Sat", score: 81 }, { day: "Sun", score: 82 },
      ],
      recentTrips: [
        { id: "TR-4496", route: "Hub → 35 Deliveries", cargo: "Packages", status: "Completed", time: "6h 30m", distance: "65 mi", date: "Apr 30" },
        { id: "TR-4495", route: "Sort → 32 Deliveries", cargo: "Retail", status: "Delayed", time: "7h 15m", distance: "58 mi", date: "Apr 29" },
        { id: "TR-4494", route: "DC → 28 Deliveries", cargo: "Groceries", status: "Completed", time: "5h 45m", distance: "52 mi", date: "Apr 28" },
      ],
      achievements: [
        { icon: "school", title: "New Recruit", desc: "In Training", color: "amber" },
        { icon: "trending_up", title: "Learning", desc: "Improving Weekly", color: "cyan" },
      ],
    },
    "alex-johnson": {
      name: "Alex Johnson",
      rank: "09",
      division: "Heavy Haul Div.",
      miles: "1,089 mi",
      alerts: 5,
      score: 80,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=alex.johnson@shuttlecore.com",
      employeeId: "DRV-2022-0890",
      joined: "August 2022",
      license: "Class A CDL",
      certifications: ["Heavy Haul", "Oversized Load"],
      phone: "+1 (415) 555-0890",
      email: "a.johnson@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #8910",
      vehicleType: "Heavy Hauler HH-5000",
      shift: "Night Shift (22:00 - 06:00)",
      supervisor: "Cmdr. Sarah Mitchell",
      bio: "Alex handles oversized and heavy cargo transportation. Experienced in long-haul operations with focus on construction equipment and industrial machinery.",
      safetyMetrics: { harshBraking: 1, speeding: 1, laneDeparture: 1, collisionWarning: 1, fatigueAlert: 1 },
      weeklyHours: [46, 48, 44, 50, 46, 42, 44],
      efficiencyHistory: [
        { day: "Mon", score: 78 }, { day: "Tue", score: 79 }, { day: "Wed", score: 80 },
        { day: "Thu", score: 81 }, { day: "Fri", score: 80 }, { day: "Sat", score: 81 }, { day: "Sun", score: 80 },
      ],
      recentTrips: [
        { id: "TR-4493", route: "Construction Site → Yard", cargo: "Excavator", status: "Completed", time: "8h 00m", distance: "145 mi", date: "Apr 30" },
        { id: "TR-4492", route: "Port → Construction Zone", cargo: "Steel Beams", status: "Completed", time: "6h 30m", distance: "112 mi", date: "Apr 28" },
        { id: "TR-4491", route: "Yard → Project Site", cargo: "Crane Parts", status: "In Progress", time: "4h 15m", distance: "89 mi", date: "Apr 30" },
      ],
      achievements: [
        { icon: "construction", title: "Heavy Lifter", desc: "Oversized Specialist", color: "rose" },
        { icon: "schedule", title: "Night Owl", desc: "Night Shift Expert", color: "purple" },
      ],
    },
    "chris-martinez": {
      name: "Chris Martinez",
      rank: "10",
      division: "Regional Express",
      miles: "923 mi",
      alerts: 2,
      score: 88,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=chris.martinez@shuttlecore.com",
      employeeId: "DRV-2023-0901",
      joined: "July 2023",
      license: "Class B CDL",
      certifications: ["Passenger", "Express Route"],
      phone: "+1 (415) 555-0901",
      email: "c.martinez@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #9010",
      vehicleType: "Express Shuttle ES-120",
      shift: "Day Shift (08:00 - 16:00)",
      supervisor: "Cmdr. James Peterson",
      bio: "Chris is a reliable express route driver with consistent on-time performance and excellent customer feedback.",
      safetyMetrics: { harshBraking: 0, speeding: 1, laneDeparture: 0, collisionWarning: 0, fatigueAlert: 1 },
      weeklyHours: [38, 40, 38, 40, 38, 36, 38],
      efficiencyHistory: [
        { day: "Mon", score: 87 }, { day: "Tue", score: 88 }, { day: "Wed", score: 89 },
        { day: "Thu", score: 88 }, { day: "Fri", score: 87 }, { day: "Sat", score: 88 }, { day: "Sun", score: 88 },
      ],
      recentTrips: [
        { id: "TR-4490", route: "Downtown → Airport", cargo: "Passengers (16)", status: "Completed", time: "35m", distance: "18 mi", date: "Apr 30" },
        { id: "TR-4489", route: "Business District Loop", cargo: "Passengers (22)", status: "Completed", time: "1h 20m", distance: "24 mi", date: "Apr 29" },
      ],
      achievements: [
        { icon: "schedule", title: "On Time", desc: "98% Punctuality", color: "blue" },
        { icon: "thumb_up", title: "Rated", desc: "4.7/5 Stars", color: "emerald" },
      ],
    },
    "patricia-brown": {
      name: "Patricia Brown",
      rank: "11",
      division: "Last Mile",
      miles: "1,834 mi",
      alerts: 6,
      score: 86,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=patricia.brown@shuttlecore.com",
      employeeId: "DRV-2022-1123",
      joined: "November 2022",
      license: "Class C Commercial",
      certifications: ["Last Mile Delivery", "Package Handling"],
      phone: "+1 (415) 555-1123",
      email: "p.brown@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #2311",
      vehicleType: "Delivery Pod DP-300",
      shift: "Swing Shift (14:00 - 22:00)",
      supervisor: "Cmdr. Lisa Wong",
      bio: "Patricia is a high-efficiency delivery driver specializing in same-day deliveries with excellent route optimization skills.",
      safetyMetrics: { harshBraking: 2, speeding: 1, laneDeparture: 2, collisionWarning: 1, fatigueAlert: 0 },
      weeklyHours: [46, 48, 46, 48, 44, 42, 44],
      efficiencyHistory: [
        { day: "Mon", score: 85 }, { day: "Tue", score: 86 }, { day: "Wed", score: 86 },
        { day: "Thu", score: 87 }, { day: "Fri", score: 86 }, { day: "Sat", score: 86 }, { day: "Sun", score: 86 },
      ],
      recentTrips: [
        { id: "TR-4488", route: "Hub → 48 Deliveries", cargo: "Packages", status: "Completed", time: "7h 45m", distance: "86 mi", date: "Apr 30" },
        { id: "TR-4487", route: "Sort → 44 Deliveries", cargo: "E-commerce", status: "Completed", time: "7h 15m", distance: "78 mi", date: "Apr 29" },
      ],
      achievements: [
        { icon: "speed", title: "Fast", desc: "48 Stops/Day", color: "amber" },
        { icon: "route", title: "Optimizer", desc: "Best Route Planner", color: "blue" },
      ],
    },
    "robert-taylor": {
      name: "Robert Taylor",
      rank: "12",
      division: "Heavy Haul Div.",
      miles: "1,245 mi",
      alerts: 3,
      score: 87,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=robert.taylor@shuttlecore.com",
      employeeId: "DRV-2021-1212",
      joined: "December 2021",
      license: "Class A CDL",
      certifications: ["Heavy Haul", "Long Distance"],
      phone: "+1 (415) 555-1212",
      email: "r.taylor@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #1212",
      vehicleType: "Long Haul LH-4500",
      shift: "Night Shift (22:00 - 06:00)",
      supervisor: "Cmdr. Sarah Mitchell",
      bio: "Robert is an experienced long-haul driver specializing in interstate freight transportation with an impeccable safety record.",
      safetyMetrics: { harshBraking: 1, speeding: 0, laneDeparture: 1, collisionWarning: 1, fatigueAlert: 0 },
      weeklyHours: [44, 46, 44, 46, 42, 40, 42],
      efficiencyHistory: [
        { day: "Mon", score: 86 }, { day: "Tue", score: 87 }, { day: "Wed", score: 87 },
        { day: "Thu", score: 88 }, { day: "Fri", score: 87 }, { day: "Sat", score: 87 }, { day: "Sun", score: 87 },
      ],
      recentTrips: [
        { id: "TR-4486", route: "LA → SF Freight", cargo: "Manufactured Goods", status: "Completed", time: "8h 30m", distance: "382 mi", date: "Apr 30" },
        { id: "TR-4485", route: "Oakland → Sacramento", cargo: "Industrial Equipment", status: "Completed", time: "5h 45m", distance: "156 mi", date: "Apr 28" },
      ],
      achievements: [
        { icon: "social_distance", title: "Long Haul", desc: "100K+ Miles", color: "rose" },
        { icon: "verified", title: "Safe", desc: "3 Years No Incidents", color: "emerald" },
      ],
    },
    "derek-russell": {
      name: "Derek Russell",
      rank: "40",
      division: "Regional Express",
      miles: "567 mi",
      alerts: 1,
      score: 92,
      scoreColor: "slate",
      img: "https://i.pravatar.cc/150?u=derek.russell@shuttlecore.com",
      employeeId: "DRV-2024-4001",
      joined: "January 2024",
      license: "Class B CDL",
      certifications: ["Passenger", "Defensive Driving"],
      phone: "+1 (415) 555-4001",
      email: "d.russell@shuttlecore.com",
      status: "Active Duty",
      vehicle: "Unit #4001",
      vehicleType: "Shuttle Coach SC-200",
      shift: "Day Shift (06:00 - 14:00)",
      supervisor: "Cmdr. James Peterson",
      bio: "Derek is a rising star in the fleet with a perfect safety record and exceptional customer service ratings. A true example of excellence.",
      safetyMetrics: { harshBraking: 0, speeding: 0, laneDeparture: 0, collisionWarning: 1, fatigueAlert: 0 },
      weeklyHours: [36, 38, 36, 38, 36, 34, 36],
      efficiencyHistory: [
        { day: "Mon", score: 91 }, { day: "Tue", score: 92 }, { day: "Wed", score: 92 },
        { day: "Thu", score: 93 }, { day: "Fri", score: 92 }, { day: "Sat", score: 92 }, { day: "Sun", score: 92 },
      ],
      recentTrips: [
        { id: "TR-4401", route: "Airport Shuttle Loop", cargo: "Passengers (18)", status: "Completed", time: "2h 30m", distance: "32 mi", date: "Apr 30" },
        { id: "TR-4400", route: "Hotel Circuit", cargo: "Passengers (24)", status: "Completed", time: "3h 15m", distance: "28 mi", date: "Apr 29" },
      ],
      achievements: [
        { icon: "military_tech", title: "Perfect", desc: "Zero Incidents", color: "emerald" },
        { icon: "star", title: "Top Rated", desc: "5.0/5.0 Stars", color: "amber" },
      ],
    },
  };

  const driver = passedDriver 
    ? { ...defaultDriverData, ...passedDriver }
    : (driverProfiles[driverName] || driverProfiles["marcus-vance"]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  const menuItems = [
    { id: "simulation", label: "Simulation", icon: "model_training", path: "/dashboard" },
    { id: "bookride", label: "Book My Ride", icon: "local_taxi", path: "/book-ride" },
    { id: "ridehistory", label: "Ride History", icon: "history", path: "/ride-history" },
    { id: "analytics", label: "AI Dispatch", icon: "query_stats", path: "/ai-dispatch" },
    { id: "heatmaps", label: "Demand Heatmaps", icon: "local_fire_department", path: "/demand-heatmaps" },
    { id: "fleet", label: "Fleet Management", icon: "airport_shuttle", path: "/fleet" },
    { id: "safety", label: "Safety & Security", icon: "verified_user", path: "/safety" },
  ];

  const incidentTypes = [
    { name: "Harsh Braking", value: driver.safetyMetrics.harshBraking, color: "#f43f5e" },
    { name: "Speeding", value: driver.safetyMetrics.speeding, color: "#f59e0b" },
    { name: "Lane Departure", value: driver.safetyMetrics.laneDeparture, color: "#3b82f6" },
    { name: "Collision Warn", value: driver.safetyMetrics.collisionWarning, color: "#8b5cf6" },
    { name: "Fatigue Alert", value: driver.safetyMetrics.fatigueAlert, color: "#10b981" },
  ];

  const COLORS = ["#f43f5e", "#f59e0b", "#3b82f6", "#8b5cf6", "#10b981"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-main)] overflow-hidden transition-colors duration-300 relative font-sans">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 sidebar-bg flex flex-col transition-all duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-10 hover:opacity-80 transition-opacity" title="Back to Home">
            <div className="w-9 h-9 bg-[var(--primary)] rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-black/20 transition-all">
              <span className="material-symbols-outlined text-white text-xl">rocket_launch</span>
            </div>
            <span className="text-xl font-black tracking-tighter text-main">SHUTTLE<span className="text-[var(--text-main)] opacity-70">CORE</span></span>
          </Link>

          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-black text-muted uppercase tracking-[0.2em] mb-4 opacity-50">Operational Hub</p>
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
                className={`nav-link w-full group ${location.pathname === item.path ? "nav-link-active" : "nav-link-inactive"}`}
              >
                <span className={`material-symbols-outlined transition-colors ${location.pathname === item.path ? "opacity-100" : "opacity-70 group-hover:opacity-100"}`}>{item.icon}</span>
                <span className="font-bold text-[13px]">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgba(244, 63, 94, 0.1)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 flex items-center justify-center gap-3 text-[11px] font-black text-rose-500 border-2 border-rose-500/30 rounded-2xl transition-all uppercase tracking-[0.2em] bg-rose-500/5 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
          >
            <span className="material-symbols-outlined text-lg animate-pulse">emergency_home</span>
            Emergency Stop
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="dashboard-card !p-4 !rounded-2xl bg-[var(--surface-muted)] border-[var(--border)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD55HcRKzMuoQrlgQh1yQeMdyIi4jA_kfYQVnebkaZniNplKPT0Kw00a9787eqzziKaz_k8lYkJfXu8-0uVnFtUhRAEqqsg1LkniZinWJJVP5n0Eyn6GYKsv_sHVUP2RO9Uzpq1zsnhQXAhGcDQ0lWh4mhDYDfg0CI4ozsDpf8HPlIJBFxhtxycjBE5bKxoJCy7emXTwc37hibY95aATNAUeF9aIWo8exvA8iRgIYw51Ek_Yz04IA7j6g_eERd-xHtSe55DvZbI9Bw" alt="Profile" className="w-10 h-10 rounded-full border border-white/20" />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[var(--surface)]"></div>
              </div>
              <div>
                <p className="text-[13px] font-black text-main leading-tight">Cmdr. Operative</p>
                <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Systems Lead</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleLogout} className="w-full py-2 flex items-center justify-center gap-2 text-[10px] font-black text-muted hover:text-rose-400 transition-colors uppercase tracking-widest border border-[var(--border)] rounded-lg hover:bg-rose-400/5">
              <span className="material-symbols-outlined text-xs">logout</span>
              Terminate Session
            </motion.button>
          </motion.div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-4 md:px-8 header-bg transition-colors duration-300 z-30">
          <div className="flex items-center gap-4 flex-1">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden icon-btn">
              <span className="material-symbols-outlined">menu</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl text-[11px] font-black text-muted hover:text-[var(--text-main)] hover:border-[var(--primary)] transition-all"
            >
              <span className="material-symbols-outlined text-sm">dashboard</span>
              <span className="hidden sm:inline">Dashboard</span>
            </motion.button>
            <button onClick={() => navigate("/safety")} className="text-muted hover:text-[var(--text-main)] transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
            </button>
            <div>
              <h1 className="text-xl font-black text-main tracking-tighter">Operator Profile</h1>
              <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Fleet ID: {driver.employeeId}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleTheme} className="icon-btn" title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
              <span className="material-symbols-outlined">{theme === "dark" ? "light_mode" : "dark_mode"}</span>
            </motion.button>
            <div className="relative">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/notifications")} className="icon-btn relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-emerald-500 rounded-full border-2 border-[var(--background)] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
              </motion.button>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="icon-btn hidden xs:flex">
              <span className="material-symbols-outlined">settings</span>
            </motion.button>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="max-w-[1400px] mx-auto">
            {/* Profile Header Card */}
            <motion.div variants={itemVariants} className="dashboard-card !p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/5 rounded-full blur-3xl"></div>
              <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[var(--surface-light)] shadow-xl">
                    <img src={driver.img} alt={driver.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black ${driver.score >= 95 ? "bg-emerald-500 text-white" : driver.score >= 90 ? "bg-blue-500 text-white" : "bg-amber-500 text-white"}`}>
                    {driver.rank}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 mb-4">
                    <div>
                      <h2 className="text-2xl font-black text-main tracking-tight">{driver.name}</h2>
                      <p className="text-[13px] text-muted font-medium">{driver.division} • {driver.license}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${driver.status.includes("Active") ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                        {driver.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-[13px] text-muted leading-relaxed max-w-2xl">{driver.bio}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-muted uppercase tracking-wider mb-1">Safety Score</p>
                    <p className={`text-4xl font-black ${driver.score >= 95 ? "text-emerald-400" : driver.score >= 90 ? "text-blue-400" : "text-amber-400"}`}>{driver.score}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats Row */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {[
                { icon: "calendar_today", label: "Joined", value: driver.joined },
                { icon: "local_shipping", label: "Current Vehicle", value: driver.vehicle },
                { icon: "schedule", label: "Shift", value: driver.shift },
                { icon: "speed", label: "Monthly Miles", value: driver.miles },
                { icon: "verified", label: "Certifications", value: driver.certifications.length.toString() },
                { icon: "supervisor_account", label: "Supervisor", value: driver.supervisor.split(" ").pop() },
              ].map((stat, i) => (
                <div key={i} className="dashboard-card !p-4 text-center">
                  <span className="material-symbols-outlined text-[var(--primary)] text-lg mb-2">{stat.icon}</span>
                  <p className="text-[9px] font-black text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-[13px] font-black text-main truncate">{stat.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Tab Navigation */}
            <motion.div variants={itemVariants} className="flex gap-2 mb-6 border-b border-[var(--border)]">
              {[
                { id: "overview", label: "Overview", icon: "dashboard" },
                { id: "safety", label: "Safety Analytics", icon: "shield" },
                { id: "trips", label: "Trip History", icon: "route" },
                { id: "achievements", label: "Achievements", icon: "emoji_events" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 text-[11px] font-black uppercase tracking-wider flex items-center gap-2 transition-all border-b-2 ${activeTab === tab.id ? "border-[var(--primary)] text-[var(--primary)]" : "border-transparent text-muted hover:text-[var(--text-main)]"}`}
                >
                  <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === "overview" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Efficiency Chart */}
                  <motion.div variants={itemVariants} className="dashboard-card !p-6">
                    <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[var(--primary)]">trending_up</span>
                      Weekly Efficiency Trend
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={driver.efficiencyHistory}>
                          <defs>
                            <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                              <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.3} />
                          <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                          <YAxis domain={[80, 100]} stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              borderColor: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "12px",
                            }}
                          />
                          <Area type="monotone" dataKey="score" stroke="var(--primary)" strokeWidth={3} fill="url(#efficiencyGradient)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>

                  {/* Certifications */}
                  <motion.div variants={itemVariants} className="dashboard-card !p-6">
                    <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[var(--primary)]">workspace_premium</span>
                      Certifications
                    </h3>
                    <div className="space-y-3">
                      {driver.certifications.map((cert, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-emerald-400">check_circle</span>
                          </div>
                          <div>
                            <p className="text-[13px] font-black text-main">{cert}</p>
                            <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Verified</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-[var(--border)]">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[var(--primary)]">badge</span>
                        </div>
                        <div>
                          <p className="text-[13px] font-black text-main">{driver.license}</p>
                          <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Active License</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === "safety" && (
                <div>
                  {/* Safety Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Total Incidents", value: Object.values(driver.safetyMetrics).reduce((a, b) => a + b, 0), color: "text-rose-400" },
                      { label: "Safety Score", value: `${driver.score}%`, color: driver.score >= 95 ? "text-emerald-400" : driver.score >= 90 ? "text-blue-400" : "text-amber-400" },
                      { label: "Alerts This Month", value: driver.alerts, color: driver.alerts === 0 ? "text-emerald-400" : driver.alerts <= 2 ? "text-blue-400" : "text-amber-400" },
                      { label: "Miles Driven", value: driver.miles, color: "text-[var(--primary)]" },
                    ].map((stat, i) => (
                      <motion.div key={i} variants={itemVariants} className="dashboard-card !p-4 text-center">
                        <p className="text-[9px] font-black text-muted uppercase tracking-wider mb-2">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Incident Breakdown */}
                  <motion.div variants={itemVariants} className="dashboard-card !p-6">
                    <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-rose-400">warning</span>
                      Safety Incident Breakdown
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={incidentTypes} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={true} vertical={false} opacity={0.3} />
                          <XAxis type="number" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                          <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} width={100} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              borderColor: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "12px",
                            }}
                          />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {incidentTypes.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {incidentTypes.filter(i => i.value > 0).map((type, i) => (
                        <span key={i} className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider" style={{ backgroundColor: `${type.color}20`, color: type.color, border: `1px solid ${type.color}40` }}>
                          {type.name}: {type.value}
                        </span>
                      ))}
                      {incidentTypes.filter(i => i.value > 0).length === 0 && (
                        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Perfect Record - No Incidents
                        </span>
                      )}
                    </div>
                  </motion.div>

                  {/* Weekly Hours */}
                  <motion.div variants={itemVariants} className="dashboard-card !p-6">
                    <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-blue-400">schedule</span>
                      Weekly Hours Logged
                    </h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => ({ day, hours: driver.weeklyHours[i] }))}>
                          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.3} />
                          <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                          <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "rgba(15, 23, 42, 0.9)",
                              borderColor: "rgba(255, 255, 255, 0.1)",
                              borderRadius: "12px",
                            }}
                          />
                          <Bar dataKey="hours" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 flex justify-between items-center pt-4 border-t border-[var(--border)]">
                      <span className="text-[10px] text-muted uppercase font-black tracking-wider">Total Hours This Week</span>
                      <span className="text-xl font-black text-[var(--primary)]">{driver.weeklyHours.reduce((a, b) => a + b, 0)}h</span>
                    </div>
                  </motion.div>

                  {/* Safety Timeline */}
                  <motion.div variants={itemVariants} className="dashboard-card !p-6 lg:col-span-2">
                    <h3 className="text-[13px] font-black text-main mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined text-amber-400">timeline</span>
                      Recent Safety Events
                    </h3>
                    <div className="space-y-4">
                      {[
                        { date: "Today", time: "08:45 AM", event: "Pre-trip inspection completed", type: "success", icon: "check_circle" },
                        { date: "Yesterday", time: "03:30 PM", event: "Speed limit adherence: 100%", type: "success", icon: "speed" },
                        { date: "Apr 28", time: "11:20 AM", event: "Automatic brake assist activated", type: "warning", icon: "emergency_brake" },
                        { date: "Apr 26", time: "09:15 AM", event: "Lane departure warning triggered", type: "warning", icon: "swap_calls" },
                        { date: "Apr 25", time: "05:45 PM", event: "Fatigue detection system check", type: "info", icon: "bedtime" },
                      ].map((event, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${event.type === "success" ? "bg-emerald-500/10" : event.type === "warning" ? "bg-amber-500/10" : "bg-blue-500/10"}`}>
                            <span className={`material-symbols-outlined ${event.type === "success" ? "text-emerald-400" : event.type === "warning" ? "text-amber-400" : "text-blue-400"}`}>{event.icon}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[13px] font-bold text-main">{event.event}</p>
                            <p className="text-[10px] text-muted uppercase font-bold tracking-wider">{event.date} at {event.time}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${event.type === "success" ? "bg-emerald-500/10 text-emerald-400" : event.type === "warning" ? "bg-amber-500/10 text-amber-400" : "bg-blue-500/10 text-blue-400"}`}>
                            {event.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  </div>
                </div>
              )}

              {activeTab === "trips" && (
                <div>
                  {/* Trip Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Total Trips", value: driver.recentTrips.length, icon: "route", color: "text-[var(--primary)]" },
                      { label: "Completed", value: driver.recentTrips.filter(t => t.status === "Completed").length, icon: "check_circle", color: "text-emerald-400" },
                      { label: "Delayed", value: driver.recentTrips.filter(t => t.status === "Delayed").length, icon: "schedule", color: "text-rose-400" },
                      { label: "In Progress", value: driver.recentTrips.filter(t => t.status === "In Progress").length, icon: "pending", color: "text-amber-400" },
                    ].map((stat, i) => (
                      <motion.div key={i} variants={itemVariants} className="dashboard-card !p-4 text-center">
                        <span className={`material-symbols-outlined ${stat.color} text-lg mb-2`}>{stat.icon}</span>
                        <p className="text-[9px] font-black text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div variants={itemVariants} className="dashboard-card !p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-[13px] font-black text-main flex items-center gap-2">
                        <span className="material-symbols-outlined text-[var(--primary)]">history</span>
                        Recent Trips
                      </h3>
                      <button className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-[10px] font-black uppercase tracking-wider hover:opacity-90 transition-all">
                        View All Trips
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[var(--border)]">
                            <th className="text-left py-3 px-4 text-[10px] font-black text-muted uppercase tracking-wider">Trip ID</th>
                            <th className="text-left py-3 px-4 text-[10px] font-black text-muted uppercase tracking-wider">Route</th>
                            <th className="text-left py-3 px-4 text-[10px] font-black text-muted uppercase tracking-wider">Cargo</th>
                            <th className="text-left py-3 px-4 text-[10px] font-black text-muted uppercase tracking-wider">Status</th>
                            <th className="text-left py-3 px-4 text-[10px] font-black text-muted uppercase tracking-wider">Duration</th>
                            <th className="text-left py-3 px-4 text-[10px] font-black text-muted uppercase tracking-wider">Distance</th>
                            <th className="text-left py-3 px-4 text-[10px] font-black text-muted uppercase tracking-wider">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {driver.recentTrips.map((trip, i) => (
                            <motion.tr key={trip.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="border-b border-[var(--border)]/50 hover:bg-[var(--surface-muted)] transition-colors">
                              <td className="py-4 px-4">
                                <span className="text-[11px] font-mono text-muted">{trip.id}</span>
                              </td>
                              <td className="py-4 px-4">
                                <p className="text-[13px] font-bold text-main">{trip.route}</p>
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-[var(--surface-muted)] border border-[var(--border)] text-muted">
                                  {trip.cargo}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${trip.status === "Completed" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : trip.status === "Delayed" ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                                  {trip.status}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-[11px] font-bold text-muted">{trip.time}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-[11px] font-bold text-[var(--primary)]">{trip.distance || "N/A"}</span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="text-[11px] font-bold text-muted">{trip.date || "Today"}</span>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                      {driver.recentTrips.length === 0 && (
                        <div className="text-center py-12">
                          <span className="material-symbols-outlined text-4xl text-muted opacity-30 mb-4">local_shipping</span>
                          <p className="text-[13px] font-bold text-muted">No recent trips recorded</p>
                          <p className="text-[11px] text-muted opacity-60 mt-1">Trip history will appear here</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              )}

              {activeTab === "achievements" && (
                <div>
                  {/* Achievement Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Total Badges", value: driver.achievements.length, icon: "emoji_events", color: "text-[var(--primary)]" },
                      { label: "Earned This Month", value: driver.achievements.filter(a => a.earnedRecently).length || 2, icon: "stars", color: "text-amber-400" },
                      { label: "Current Streak", value: "12 days", icon: "local_fire_department", color: "text-rose-400" },
                      { label: "Rank Progress", value: "84%", icon: "trending_up", color: "text-emerald-400" },
                    ].map((stat, i) => (
                      <motion.div key={i} variants={itemVariants} className="dashboard-card !p-4 text-center">
                        <span className={`material-symbols-outlined ${stat.color} text-lg mb-2`}>{stat.icon}</span>
                        <p className="text-[9px] font-black text-muted uppercase tracking-wider mb-1">{stat.label}</p>
                        <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Achievement Cards */}
                  <div className={driver.achievements.length > 0 ? "grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" : ""}>
                  {driver.achievements.length === 0 && (
                    <div className="text-center py-12 dashboard-card mb-6">
                      <span className="material-symbols-outlined text-4xl text-muted opacity-30 mb-4">emoji_events</span>
                      <p className="text-[13px] font-bold text-muted">No achievements yet</p>
                      <p className="text-[11px] text-muted opacity-60 mt-1">Complete milestones to earn badges</p>
                    </div>
                  )}
                  {driver.achievements.map((achievement, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className={`dashboard-card !p-6 text-center border-2 ${achievement.color === "emerald" ? "border-emerald-500/20 bg-emerald-500/5" : achievement.color === "blue" ? "border-blue-500/20 bg-blue-500/5" : achievement.color === "amber" ? "border-amber-500/20 bg-amber-500/5" : "border-rose-500/20 bg-rose-500/5"}`}
                    >
                      <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${achievement.color === "emerald" ? "bg-emerald-500/10" : achievement.color === "blue" ? "bg-blue-500/10" : achievement.color === "amber" ? "bg-amber-500/10" : "bg-rose-500/10"}`}>
                        <span className={`material-symbols-outlined text-3xl ${achievement.color === "emerald" ? "text-emerald-400" : achievement.color === "blue" ? "text-blue-400" : achievement.color === "amber" ? "text-amber-400" : "text-rose-400"}`}>
                          {achievement.icon}
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-main mb-2">{achievement.title}</h3>
                      <p className="text-[11px] text-muted uppercase font-bold tracking-wider">{achievement.desc}</p>
                    </motion.div>
                  ))}
                </div>
                </div>
              )}
            </div>

            {/* Contact Info Footer */}
            <motion.div variants={itemVariants} className="mt-8 dashboard-card !p-6">
              <h3 className="text-[13px] font-black text-main mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--primary)]">contact_mail</span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-4 p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                  <span className="material-symbols-outlined text-muted">email</span>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Email</p>
                    <p className="text-[13px] font-bold text-main">{driver.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                  <span className="material-symbols-outlined text-muted">phone</span>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Phone</p>
                    <p className="text-[13px] font-bold text-main">{driver.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-[var(--surface-muted)] rounded-xl border border-[var(--border)]">
                  <span className="material-symbols-outlined text-muted">person</span>
                  <div>
                    <p className="text-[10px] text-muted uppercase font-bold tracking-wider">Supervisor</p>
                    <p className="text-[13px] font-bold text-main">{driver.supervisor}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Footer */}
            <footer className="mt-12 border-t border-[var(--border)] py-12">
              <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <Link to="/" className="flex items-center gap-2 text-[var(--text-main)] font-black tracking-tighter text-2xl font-manrope hover:opacity-80 transition-opacity">
                  <span className="material-symbols-outlined text-xl">arrow_back</span> ShuttleCore
                </Link>
                <div className="flex flex-wrap justify-center gap-8">
                  {[{ label: "Services", to: "/services" }, { label: "FAQ", to: "/faq" }, { label: "Payments", to: "/payments" }, { label: "Privacy", to: "/privacy" }].map((l) => (
                    <Link key={l.label} to={l.to} className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors uppercase font-black tracking-[0.2em]">{l.label}</Link>
                  ))}
                </div>
                <span className="text-[11px] text-[var(--text-muted)] font-bold opacity-40">© 2024 ShuttleCore Logistics Systems.</span>
              </div>
            </footer>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default DriverDetailsPage;
