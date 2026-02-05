import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  AlertTriangle,
  Clock,
  Zap,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { alertsData } from '../data/mockData';

const Alerts = () => {
  const alertsRef = useRef([]);
  const headerRef = useRef(null);

  useEffect(() => {
    // Animate header
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    );

    // Animate alerts with stagger
    alertsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.4, delay: 0.1 + index * 0.05, ease: 'power2.out' }
        );
      }
    });
  }, []);

  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'high':
        return { background: '#fee2e2', color: '#991b1b' };
      case 'medium':
        return { background: '#fef3c7', color: '#92400e' };
      case 'low':
        return { background: '#dcfce7', color: '#166534' };
      default:
        return { background: '#e2e8f0', color: '#475569' };
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle size={18} />;
      case 'medium': return <AlertCircle size={18} />;
      case 'low': return <AlertTriangle size={18} />;
      default: return <Zap size={18} />;
    }
  };

  const formatDuration = (duration) => {
    return duration;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="alerts-container">
      <div className="alerts-header" ref={headerRef}>
        <h1>
          <AlertTriangle size={28} />
          Energy Waste Alerts
        </h1>
        <p className="header-description">
          Active alerts requiring attention. All actions are simulated for demonstration.
        </p>
        <div className="alerts-summary">
          <div className="summary-item">
            <AlertTriangle size={16} />
            <span>{alertsData.length} Active Alerts</span>
          </div>
          <div className="summary-item">
            <Zap size={16} />
            <span>{alertsData.reduce((sum, a) => sum + a.estimatedWaste, 0).toFixed(1)} kWh Wasting</span>
          </div>
        </div>
      </div>

      <div className="alerts-list">
        {alertsData.map((alert, index) => (
          <div
            key={alert.id}
            className="alert-card"
            ref={el => alertsRef.current[index] = el}
          >
            <div className="alert-icon" style={getSeverityStyle(alert.severity)}>
              {getSeverityIcon(alert.severity)}
            </div>
            <div className="alert-content">
              <div className="alert-header-row">
                <h3>{alert.roomName}</h3>
                <div className="alert-badges">
                  <span className="severity-badge" style={getSeverityStyle(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="auto-action-badge">
                    <Zap size={12} /> Auto Action
                  </span>
                </div>
              </div>

              <div className="alert-details">
                <div className="alert-detail-row">
                  <AlertTriangle size={14} />
                  <span>{alert.roomType}</span>
                </div>
                <div className="alert-detail-row">
                  <Clock size={14} />
                  <span>{formatDuration(alert.duration)}</span>
                </div>
                <div className="alert-detail-row">
                  <Zap size={14} />
                  <span>{alert.estimatedWaste} kWh waste</span>
                </div>
              </div>

              <div className="alert-reason">
                {alert.wastingAppliance} • {alert.actionDetails}
              </div>

              <div className="alert-footer">
                <span className="alert-timestamp">Detected at {formatTimestamp(alert.timestamp)}</span>
                <Link to={`/room/${alert.roomId}`} className="view-room-btn">
                  View Room <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alertsData.length === 0 && (
        <div className="no-alerts">
          <Zap size={48} />
          <h2>No Active Alerts</h2>
          <p>All rooms are operating efficiently!</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
