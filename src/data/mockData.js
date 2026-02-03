// Room Data
export const roomsData = [
  {
    id: 1,
    name: "Lecture Hall A",
    type: "Classroom",
    monitoringMethod: "Camera",
    status: "efficient",
    occupancy: 85,
    appliances: {
      lights: { status: true, wattage: 400 },
      projector: { status: true, wattage: 300 },
      ac: { status: true, wattage: 800 }
    },
    monitoringType: "Edge AI",
    energyUsageToday: 2.8,
    potentialSavings: 0.5
  },
  {
    id: 2,
    name: "Computer Lab 101",
    type: "Computer Lab",
    monitoringMethod: "Smart Plug",
    status: "waste",
    occupancy: 0,
    appliances: {
      lights: { status: true, wattage: 300 },
      desktops: { status: true, wattage: 3000, count: 25, monitorsOn: 5 }
    },
    monitoringType: "Smart Plugs",
    energyUsageToday: 4.2,
    potentialSavings: 3.5
  },
  {
    id: 3,
    name: "Seminar Hall",
    type: "Classroom",
    monitoringMethod: "Camera",
    status: "review",
    occupancy: 12,
    appliances: {
      lights: { status: true, wattage: 250 },
      ac: { status: true, wattage: 600 }
    },
    monitoringType: "Edge AI",
    energyUsageToday: 1.5,
    potentialSavings: 0.8
  },
  {
    id: 4,
    name: "Physics Lab",
    type: "Lab",
    monitoringMethod: "Camera",
    status: "efficient",
    occupancy: 15,
    appliances: {
      lights: { status: true, wattage: 350 },
      equipment: { status: true, wattage: 2000 }
    },
    monitoringType: "Edge AI",
    energyUsageToday: 3.1,
    potentialSavings: 1.2
  },
  {
    id: 5,
    name: "Hostel Block A - Common Room",
    type: "Hostel",
    monitoringMethod: "Sensor",
    status: "waste",
    occupancy: 0,
    appliances: {
      lights: { status: true, wattage: 200 },
      tv: { status: true, wattage: 150 },
      fans: { status: true, wattage: 300 }
    },
    monitoringType: "PIR Sensors",
    energyUsageToday: 2.1,
    potentialSavings: 1.8
  },
  {
    id: 6,
    name: "Admin Office",
    type: "Office",
    monitoringMethod: "Schedule",
    status: "efficient",
    occupancy: 3,
    appliances: {
      lights: { status: true, wattage: 200 },
      computer: { status: true, wattage: 500 }
    },
    monitoringType: "Schedule-based",
    energyUsageToday: 1.2,
    potentialSavings: 0.3
  },
  {
    id: 7,
    name: "Library Reading Room",
    type: "Library",
    monitoringMethod: "Camera",
    status: "efficient",
    occupancy: 45,
    appliances: {
      lights: { status: true, wattage: 350 },
      ac: { status: true, wattage: 700 }
    },
    monitoringType: "Edge AI",
    energyUsageToday: 2.9,
    potentialSavings: 0.7
  },
  {
    id: 8,
    name: "Computer Lab 202",
    type: "Computer Lab",
    monitoringMethod: "Smart Plug",
    status: "waste",
    occupancy: 2,
    appliances: {
      lights: { status: true, wattage: 300 },
      desktops: { status: true, wattage: 2640, count: 28, monitorsOn: 8 }
    },
    monitoringType: "Smart Plugs",
    energyUsageToday: 3.8,
    potentialSavings: 3.2
  },
  {
    id: 9,
    name: "Faculty Lounge",
    type: "Office",
    monitoringMethod: "Schedule",
    status: "review",
    occupancy: 5,
    appliances: {
      lights: { status: true, wattage: 200 },
      ac: { status: true, wattage: 500 }
    },
    monitoringType: "Schedule-based",
    energyUsageToday: 1.8,
    potentialSavings: 0.9
  },
  {
    id: 10,
    name: "Chemistry Lab",
    type: "Lab",
    monitoringMethod: "Sensor",
    status: "efficient",
    occupancy: 20,
    appliances: {
      lights: { status: true, wattage: 400 },
      fume_hood: { status: true, wattage: 1500 }
    },
    monitoringType: "PIR Sensors",
    energyUsageToday: 3.5,
    potentialSavings: 1.0
  },
  {
    id: 11,
    name: "Lecture Hall B",
    type: "Classroom",
    monitoringMethod: "Camera",
    status: "efficient",
    occupancy: 72,
    appliances: {
      lights: { status: true, wattage: 450 },
      projector: { status: true, wattage: 300 },
      ac: { status: true, wattage: 900 }
    },
    monitoringType: "Edge AI",
    energyUsageToday: 3.2,
    potentialSavings: 0.6
  }
];

// Dashboard KPIs
export const dashboardKPIs = {
  totalRooms: 11,
  activeWasteCases: 4,
  energySavedToday: 42.5,
  estimatedCostSaved: 340.00,
  co2Reduced: 28.5
};

// Energy analytics data
export const energyAnalytics = {
  energySavedOverTime: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [35, 42, 38, 45, 52, 28, 42.5]
  },
  wasteByRoom: {
    labels: ['Comp Lab 101', 'Comp Lab 202', 'Hostel Common', 'Library', 'Faculty Lounge'],
    data: [28.5, 22.1, 5.1, 8.3, 3.2]
  },
  monthlyTrend: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [180, 220, 195, 282]
  }
};

// Active alerts
export const alertsData = [
  {
    id: 1,
    roomId: 2,
    roomName: "Computer Lab 101",
    roomType: "Computer Lab",
    wastingAppliance: "Desktops (25 CPUs active, only 5 monitors on)",
    duration: "45 minutes",
    severity: "high",
    estimatedWaste: 4.2,
    timestamp: "2026-01-28T09:45:00",
    autoActionTaken: true,
    actionDetails: "Alert sent to lab administrator"
  },
  {
    id: 2,
    roomId: 5,
    roomName: "Hostel Block A - Common Room",
    roomType: "Hostel",
    wastingAppliance: "Lights, TV, Fans",
    duration: "2 hours 15 minutes",
    severity: "medium",
    estimatedWaste: 2.1,
    timestamp: "2026-01-28T07:30:00",
    autoActionTaken: false,
    actionDetails: "Pending review"
  },
  {
    id: 3,
    roomId: 8,
    roomName: "Computer Lab 202",
    roomType: "Computer Lab",
    wastingAppliance: "Desktops (28 CPUs active, minimal usage)",
    duration: "30 minutes",
    severity: "high",
    estimatedWaste: 3.5,
    timestamp: "2026-01-28T10:00:00",
    autoActionTaken: true,
    actionDetails: "Power reduction initiated via smart plugs"
  },
  {
    id: 4,
    roomId: 7,
    roomName: "Library Reading Room",
    roomType: "Classroom",
    wastingAppliance: "AC units (low occupancy)",
    duration: "1 hour 30 minutes",
    severity: "low",
    estimatedWaste: 2.1,
    timestamp: "2026-01-28T08:45:00",
    autoActionTaken: false,
    actionDetails: "Scheduled for afternoon adjustment"
  }
];

// Computer Lab Data
export const computerLabData = {
  "Computer Lab 101": {
    totalDesktops: 40,
    desktopsOn: 25,
    monitorsOn: 5,
    cpusActive: 25,
    hiddenWaste: true,
    estimatedWasteWatts: 3000,
    avgCpuUsage: 12,
    idleDesktops: 20
  },
  "Computer Lab 202": {
    totalDesktops: 35,
    desktopsOn: 30,
    monitorsOn: 8,
    cpusActive: 30,
    hiddenWaste: true,
    estimatedWasteWatts: 2640,
    avgCpuUsage: 8,
    idleDesktops: 22
  }
};

// Privacy compliance data
export const privacyData = {
  cameraRooms: [
    { name: "Lecture Hall A", processingType: "Local Edge AI", dataRetention: "None" },
    { name: "Seminar Hall", processingType: "Local Edge AI", dataRetention: "None" },
    { name: "Physics Lab", processingType: "Local Edge AI", dataRetention: "None" },
    { name: "Library Reading Room", processingType: "Local Edge AI", dataRetention: "None" }
  ],
  nonCameraRooms: [
    { name: "Computer Lab 101", method: "Smart Plug Monitoring" },
    { name: "Computer Lab 202", method: "Smart Plug Monitoring" },
    { name: "Physics Lab", method: "PIR Motion Sensors" },
    { name: "Chemistry Lab", method: "PIR Motion Sensors" },
    { name: "Admin Office", method: "Schedule-Based" },
    { name: "Faculty Lounge", method: "Schedule-Based" },
    { name: "Hostel Block A", method: "PIR Motion Sensors" }
  ],
  complianceStatements: [
    "No raw video footage is stored or transmitted",
    "All visual processing happens locally on edge devices",
    "System monitors room resources, not individual people",
    "Occupancy data is anonymized count only",
    "No facial recognition or individual tracking",
    "Data retention limited to aggregate statistics only",
    "Full compliance with campus privacy policies"
  ]
};

// Default Rules/Configuration
export const defaultRules = {
  emptyRoomThreshold: 30,
  lightOffDelay: 15,
  acOffDelay: 20,
  scheduleBuffer: 10,
  autoActionMode: "auto",
  computerLabSettings: {
    hiddenWasteThreshold: 10,
    cpuActivityMonitoring: true,
    monitorOffAlert: true
  }
};

// Audit Logs
export const auditLogs = [
  {
    id: 1,
    timestamp: "2026-01-28T10:15:30",
    room: "Computer Lab 101",
    action: "Power reduction initiated",
    reason: "Hidden waste detected",
    confidence: 98,
    simulated: true
  },
  {
    id: 2,
    timestamp: "2026-01-28T09:45:00",
    room: "Hostel Block A - Common Room",
    action: "Alert generated",
    reason: "No occupancy for 2+ hours",
    confidence: 95,
    simulated: true
  },
  {
    id: 3,
    timestamp: "2026-01-28T10:00:15",
    room: "Computer Lab 202",
    action: "Auto-action applied",
    reason: "Monitors OFF, CPUs active",
    confidence: 97,
    simulated: true
  },
  {
    id: 4,
    timestamp: "2026-01-28T08:30:45",
    room: "Lecture Hall A",
    action: "Efficiency verified",
    reason: "Optimal usage detected",
    confidence: 100,
    simulated: true
  },
  {
    id: 5,
    timestamp: "2026-01-28T07:15:20",
    room: "Library Reading Room",
    action: "Manual override applied",
    reason: "Special event in progress",
    confidence: null,
    simulated: true
  },
  {
    id: 6,
    timestamp: "2026-01-27T22:50:00",
    room: "Chemistry Lab",
    action: "Night mode activated",
    reason: "After hours schedule",
    confidence: 100,
    simulated: true
  }
];
