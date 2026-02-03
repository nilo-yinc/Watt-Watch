import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  AlertTriangle,
  Clock,
  Zap,
  ArrowRight,
  CheckCircle,
  XCircle,
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

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'alert-high';
      case 'medium': return 'alert-medium';
      case 'low': return 'alert-low';
      default: return 'alert-grey';
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
    <div className="alerts-page">
      <div className="page-header" ref={headerRef}>
        <div className="header-content">
          <h1>
            <AlertTriangle size={28} />
            Energy Waste Alerts
          </h1>
          <p className="header-description">
            Active alerts requiring attention. All actions are simulated for demonstration.
          </p>
        </div>
        <div className="header-stats">
          <div className="stat">
            <span className="stat-value">{alertsData.length}</span>
            <span className="stat-label">Active Alerts</span>
          </div>
          <div className="stat">
            <span className="stat-value">
              {alertsData.reduce((sum, a) => sum + a.estimatedWaste, 0).toFixed(1)}
            </span>
            <span className="stat-label">kWh Wasting</span>
          </div>
        </div>
      </div>

      <div className="alerts-list">
        {alertsData.map((alert, index) => (
          <div
            key={alert.id}
            className={`alert-card ${getSeverityColor(alert.severity)}`}
            ref={el => alertsRef.current[index] = el}
          >
            <div className="alert-header">
              <div className="alert-severity">
                {getSeverityIcon(alert.severity)}
                <span className="severity-label">{alert.severity.toUpperCase()}</span>
              </div>
              <span className="simulated-badge">
                <Zap size={12} /> Auto Action Simulated
              </span>
            </div>

            <div className="alert-body">
              <div className="alert-main">
                <h3 className="alert-room">{alert.roomName}</h3>
                <span className="alert-room-type">{alert.roomType}</span>
              </div>

              <div className="alert-details">
                <div className="detail-item">
                  <span className="detail-label">Wasting Appliance</span>
                  <span className="detail-value">{alert.wastingAppliance}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Duration</span>
                  <span className="detail-value">
                    <Clock size={14} /> {formatDuration(alert.duration)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Est. Waste</span>
                  <span className="detail-value waste">{alert.estimatedWaste} kWh</span>
                </div>
              </div>

              <div className="alert-action-status">
                {alert.autoActionTaken ? (
                  <div className="action-taken">
                    <CheckCircle size={16} />
                    <span>{alert.actionDetails}</span>
                  </div>
                ) : (
                  <div className="action-pending">
                    <Clock size={16} />
                    <span>{alert.actionDetails}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="alert-footer">
              <span className="alert-time">
                Detected at {formatTimestamp(alert.timestamp)}
              </span>
              <Link to={`/room/${alert.roomId}`} className="view-room-btn">
                View Room <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {alertsData.length === 0 && (
        <div className="empty-state">
          <Zap size={48} />
          <h2>No Active Alerts</h2>
          <p>All rooms are operating efficiently!</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
