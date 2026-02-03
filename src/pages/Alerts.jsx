import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { AlertTriangle, Clock, MapPin, Zap } from 'lucide-react';
import { alerts } from '../data/mockData';

const Alerts = () => {
  const navigate = useNavigate();
  const alertsRef = useRef([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const items = alertsRef.current.filter(Boolean);
      if (items.length === 0) return;

      const ctx = gsap.context(() => {
        gsap.from(items, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      });

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(delay);
  }, [alerts.length]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const formatDuration = (duration) => {
    return duration;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="alerts-container">
      <div className="alerts-header">
        <h1>Energy Waste Alerts</h1>
        <div className="alerts-summary">
          <div className="summary-item">
            <AlertTriangle size={20} color="#ef4444" />
            <span>{alerts.length} Active Alerts</span>
          </div>
        </div>
      </div>

      <div className="alerts-list">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            ref={el => alertsRef.current[index] = el}
            className="alert-card"
            onClick={() => navigate(`/room/${alert.roomId}`)}
          >
            <div className="alert-icon" style={{ backgroundColor: `${getSeverityColor(alert.severity)}20` }}>
              <AlertTriangle size={24} color={getSeverityColor(alert.severity)} />
            </div>

            <div className="alert-content">
              <div className="alert-header-row">
                <h3>{alert.roomName}</h3>
                <div className="alert-badges">
                  <span
                    className="severity-badge"
                    style={{
                      backgroundColor: `${getSeverityColor(alert.severity)}20`,
                      color: getSeverityColor(alert.severity)
                    }}
                  >
                    {alert.severity.toUpperCase()}
                  </span>
                  {alert.autoActionSimulated && (
                    <span className="auto-action-badge">
                      Auto Action Simulated
                    </span>
                  )}
                </div>
              </div>

              <div className="alert-details">
                <div className="alert-detail-row">
                  <MapPin size={16} />
                  <span className="detail-label">Room Type:</span>
                  <span className="detail-value">{alert.roomType}</span>
                </div>

                <div className="alert-detail-row">
                  <Zap size={16} />
                  <span className="detail-label">Wasting Appliance:</span>
                  <span className="detail-value">{alert.appliance}</span>
                </div>

                <div className="alert-detail-row">
                  <Clock size={16} />
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">{formatDuration(alert.duration)}</span>
                </div>
              </div>

              <div className="alert-reason">
                <strong>Reason:</strong> {alert.reason}
              </div>

              <div className="alert-footer">
                <span className="alert-timestamp">{formatTimestamp(alert.timestamp)}</span>
                <button className="view-room-btn">View Room Details →</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {alerts.length === 0 && (
        <div className="no-alerts">
          <Zap size={48} color="#10b981" />
          <h2>No Active Alerts</h2>
          <p>All rooms are operating efficiently!</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
