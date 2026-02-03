export const rooms = [
  {
    id: 1,
    name: "Classroom 101",
    type: "Classroom",
    monitoringMethod: "Camera",
    status: "efficient",
    occupancy: 45,
    activeAppliances: ["lights", "projector", "ac"],
    autoActionMode: true,
    applianceStates: {
      lights: true,
      projector: true,
      ac: true
    },
    esp32Status: "connected",
    relayState: "on",
    ghostViewEnabled: true
  },
  {
    id: 2,
    name: "Computer Lab A",
    type: "Computer Lab",
    monitoringMethod: "Smart Plug",
    status: "waste",
    occupancy: 0,
    activeAppliances: ["lights", "desktops"],
    autoActionMode: false,
    applianceStates: {
      lights: true,
      desktops: {
        monitorsOff: 15,
        cpuActive: 15,
        totalOn: 15
      }
    },
    esp32Status: "connected",
    relayState: "on",
    ghostViewEnabled: false
  },
  {
    id: 3,
    name: "Hostel Room 204",
    type: "Hostel",
    monitoringMethod: "Sensor",
    status: "waste",
    occupancy: 0,
    activeAppliances: ["lights", "fan"],
    autoActionMode: true,
    applianceStates: {
      lights: true,
      fan: true
    },
    esp32Status: "connected",
    relayState: "on",
    ghostViewEnabled: false
  },
  {
    id: 4,
    name: "Physics Lab 302",
    type: "Lab",
    monitoringMethod: "Camera",
    status: "review",
    occupancy: 3,
    activeAppliances: ["lights", "equipment"],
    autoActionMode: false,
    applianceStates: {
      lights: true,
      equipment: true
    },
    esp32Status: "connected",
    relayState: "on",
    ghostViewEnabled: true
  },
  {
    id: 5,
    name: "Faculty Office 15",
    type: "Office",
    monitoringMethod: "Schedule",
    status: "efficient",
    occupancy: 2,
    activeAppliances: ["lights", "computer"],
    autoActionMode: true,
    applianceStates: {
      lights: true,
      computer: true
    },
    esp32Status: "connected",
    relayState: "on",
    ghostViewEnabled: false
  },
  {
    id: 6,
    name: "Classroom 205",
    type: "Classroom",
    monitoringMethod: "Camera",
    status: "waste",
    occupancy: 0,
    activeAppliances: ["lights", "projector", "ac"],
    autoActionMode: true,
    applianceStates: {
      lights: true,
      projector: true,
      ac: true
    },
    esp32Status: "connected",
    relayState: "on",
    ghostViewEnabled: true
  },
  {
    id: 7,
    name: "Computer Lab B",
    type: "Computer Lab",
    monitoringMethod: "Smart Plug",
    status: "waste",
    occupancy: 5,
    activeAppliances: ["lights", "desktops"],
    autoActionMode: true,
    applianceStates: {
      lights: true,
      desktops: {
        monitorsOff: 25,
        cpuActive: 25,
        totalOn: 30
      }
    },
    esp32Status: "connected",
    relayState: "on",
    ghostViewEnabled: false
  },
  {
    id: 8,
    name: "Library Reading Hall",
    type: "Library",
    monitoringMethod: "Camera",
    status: "efficient",
    occupancy: 32,
    activeAppliances: ["lights", "ac"],
    autoActionMode: true,
    applianceStates: {
      lights: true,
      ac: true
    },
    esp32Status: "connected",
    relayState: "on",
    ghostViewEnabled: true
  }
];

export const alerts = [
  {
    id: 1,
    roomId: 2,
    roomName: "Computer Lab A",
    roomType: "Computer Lab",
    appliance: "Desktops (15 units)",
    duration: "2h 35m",
    severity: "high",
    timestamp: "2026-01-27T10:30:00",
    reason: "Room empty but desktops still active",
    autoActionSimulated: true
  },
  {
    id: 2,
    roomId: 3,
    roomName: "Hostel Room 204",
    roomType: "Hostel",
    appliance: "Lights + Fan",
    duration: "4h 12m",
    severity: "medium",
    timestamp: "2026-01-27T08:15:00",
    reason: "No occupancy detected",
    autoActionSimulated: true
  },
  {
    id: 3,
    roomId: 6,
    roomName: "Classroom 205",
    roomType: "Classroom",
    appliance: "AC + Projector + Lights",
    duration: "1h 45m",
    severity: "high",
    timestamp: "2026-01-27T11:00:00",
    reason: "Empty classroom with all appliances on",
    autoActionSimulated: true
  },
  {
    id: 4,
    roomId: 7,
    roomName: "Computer Lab B",
    roomType: "Computer Lab",
    appliance: "Desktops (25 hidden waste)",
    duration: "3h 20m",
    severity: "high",
    timestamp: "2026-01-27T09:45:00",
    reason: "Monitors OFF but CPUs still active",
    autoActionSimulated: true
  }
];

export const analyticsData = {
  energySavedOverTime: [
    { date: "Jan 20", energy: 45 },
    { date: "Jan 21", energy: 67 },
    { date: "Jan 22", energy: 89 },
    { date: "Jan 23", energy: 102 },
    { date: "Jan 24", energy: 125 },
    { date: "Jan 25", energy: 143 },
    { date: "Jan 26", energy: 167 },
    { date: "Jan 27", energy: 189 }
  ],
  wasteByRoom: [
    { room: "Computer Lab A", waste: 45 },
    { room: "Computer Lab B", waste: 38 },
    { room: "Classroom 205", waste: 32 },
    { room: "Hostel 204", waste: 25 },
    { room: "Physics Lab", waste: 18 }
  ],
  kpis: {
    totalEnergySaved: 1847,
    co2Reduction: 1293,
    costSavings: 18470
  }
};

export const auditLogs = [
  {
    id: 1,
    timestamp: "2026-01-27T11:30:15",
    room: "Computer Lab A",
    action: "Power OFF via IoT Relay",
    reason: "Empty room detected for >30 minutes",
    confidence: "98%",
    simulated: true
  },
  {
    id: 2,
    timestamp: "2026-01-27T11:15:42",
    room: "Classroom 205",
    action: "Alert Sent to Admin",
    reason: "High energy waste detected",
    confidence: "95%",
    simulated: true
  },
  {
    id: 3,
    timestamp: "2026-01-27T10:45:23",
    room: "Hostel Room 204",
    action: "Power OFF via IoT Relay",
    reason: "No occupancy for 4+ hours",
    confidence: "99%",
    simulated: true
  },
  {
    id: 4,
    timestamp: "2026-01-27T10:30:11",
    room: "Computer Lab B",
    action: "Hidden Waste Alert",
    reason: "25 CPUs active with monitors OFF",
    confidence: "97%",
    simulated: true
  },
  {
    id: 5,
    timestamp: "2026-01-27T09:55:08",
    room: "Library Reading Hall",
    action: "Efficiency Verified",
    reason: "Optimal usage detected",
    confidence: "100%",
    simulated: true
  },
  {
    id: 6,
    timestamp: "2026-01-27T09:30:45",
    room: "Physics Lab 302",
    action: "Manual Override Applied",
    reason: "Lab equipment requires continuous power",
    confidence: "N/A",
    simulated: true
  }
];

export const computerLabStats = {
  totalLabs: 3,
  totalDesktops: 120,
  desktopsOn: 45,
  monitorsOffCpuOn: 40,
  hiddenWasteDetected: true,
  estimatedWaste: "32 kWh/day"
};

export const privacyCompliance = {
  camerasEnabled: [
    { roomName: "Classroom 101", reason: "High occupancy monitoring" },
    { roomName: "Classroom 205", reason: "High occupancy monitoring" },
    { roomName: "Physics Lab 302", reason: "Safety and resource monitoring" },
    { roomName: "Library Reading Hall", reason: "Occupancy detection" }
  ],
  noCameraRooms: [
    { roomName: "Computer Lab A", method: "Smart Plug Monitoring" },
    { roomName: "Computer Lab B", method: "Smart Plug Monitoring" },
    { roomName: "Hostel Room 204", method: "PIR Sensor" },
    { roomName: "Faculty Office 15", method: "Schedule-based" }
  ],
  complianceStatements: [
    "No raw video footage is stored on any server",
    "All computer vision processing happens locally on edge devices",
    "System monitors resource usage, not individual identities",
    "Full compliance with campus privacy regulations",
    "Anonymous occupancy counting only - no facial recognition"
  ]
};

export const configRules = {
  emptyRoomThreshold: 30,
  autoActionEnabled: true,
  alertOnlyMode: false,
  hiddenWasteDetection: true,
  nightModeStart: "22:00",
  nightModeEnd: "06:00"
};
