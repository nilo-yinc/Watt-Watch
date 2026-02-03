import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RoomDetail from './pages/RoomDetail';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import ComputerLab from './pages/ComputerLab';
import Heatmap from './pages/Heatmap';
import Configuration from './pages/Configuration';
import Privacy from './pages/Privacy';
import AuditLogs from './pages/AuditLogs';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="room/:id" element={<RoomDetail />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="computer-lab" element={<ComputerLab />} />
            <Route path="heatmap" element={<Heatmap />} />
            <Route path="configuration" element={<Configuration />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
