# Watt-Watch ⚡

A comprehensive energy monitoring and management system built with React. Watt-Watch helps you track, analyze, and optimize energy consumption across different rooms and facilities.

## Features

- **Real-time Dashboard**: Monitor energy consumption in real-time across all monitored spaces
- **Room Details**: View detailed energy metrics for individual rooms
- **Alerts System**: Get notified about unusual energy consumption patterns
- **Analytics**: Deep dive into energy usage patterns with charts and visualizations
- **Computer Lab Monitoring**: Specialized monitoring for computer labs and IT spaces
- **Heatmap Visualization**: Visual representation of energy usage across facilities
- **Configuration**: Customize monitoring settings and thresholds
- **Audit Logs**: Track all system activities and changes
- **Privacy Controls**: Manage data privacy settings

## Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Routing**: React Router DOM 7.13.0
- **Charts**: Chart.js 4.5.1 with react-chartjs-2
- **Animations**: GSAP 3.14.2
- **Icons**: Lucide React 0.563.0
- **Linting**: ESLint with React plugins

## Getting Started

### Prerequisites

- Node.js (version 16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nilo-yinc/Watt-Watch.git
cd Watt-Watch
```

2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint to check code quality:
```bash
npm run lint
```

## Project Structure

```
Watt-Watch/
├── public/          # Static assets
├── src/
│   ├── assets/      # Images, fonts, etc.
│   ├── components/  # Reusable React components
│   ├── context/     # React context providers (e.g., AuthContext)
│   ├── data/        # Mock data and constants
│   ├── pages/       # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── RoomDetail.jsx
│   │   ├── Alerts.jsx
│   │   ├── Analytics.jsx
│   │   ├── ComputerLab.jsx
│   │   ├── Heatmap.jsx
│   │   ├── Configuration.jsx
│   │   ├── Privacy.jsx
│   │   └── AuditLogs.jsx
│   ├── App.jsx      # Main application component
│   ├── App.css      # Application styles
│   └── main.jsx     # Application entry point
├── index.html
├── package.json
└── vite.config.js
```

## Authentication

The application includes authentication functionality through the AuthContext. Users need to log in to access the monitoring features.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the repository owner.