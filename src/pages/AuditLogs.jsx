import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FileText, Clock, MapPin, Activity, CheckCircle } from 'lucide-react';
import { auditLogs } from '../data/mockData';

const AuditLogs = () => {
  const logsRef = useRef([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const items = logsRef.current.filter(Boolean);
      if (items.length === 0) return;

      const ctx = gsap.context(() => {
        gsap.from(items, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out'
        });
      });

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(delay);
  }, [auditLogs.length]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getActionColor = (action) => {
    if (action.includes('Power OFF')) return '#ef4444';
    if (action.includes('Alert')) return '#f59e0b';
    if (action.includes('Efficiency') || action.includes('Verified')) return '#10b981';
    if (action.includes('Override')) return '#0ea5e9';
    return '#3b82f6';
  };

  const getActionIcon = (action) => {
    if (action.includes('Power OFF')) return '🔌';
    if (action.includes('Alert')) return '⚠️';
    if (action.includes('Efficiency')) return '✓';
    if (action.includes('Override')) return '🔧';
    return '📊';
  };

  return (
    <div className="audit-logs-container">
      <div className="audit-logs-header">
        <div className="header-left">
          <FileText size={32} color="#3b82f6" />
          <div>
            <h1>Audit Logs</h1>
            <p className="audit-subtitle">
              Complete record of all system actions and decisions
            </p>
          </div>
        </div>
        <div className="logs-count">
          <Activity size={20} />
          <span>{auditLogs.length} Total Events</span>
        </div>
      </div>

      <div className="simulation-notice">
        <span className="notice-badge">Simulated Events</span>
        <p>All events shown below are simulated for prototype demonstration purposes</p>
      </div>

      <div className="logs-table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Room</th>
              <th>Action Taken</th>
              <th>Reason</th>
              <th>Confidence</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((log, index) => (
              <tr
                key={log.id}
                ref={el => logsRef.current[index] = el}
                className="log-row"
              >
                <td className="timestamp-cell">
                  <Clock size={16} />
                  <span>{formatTimestamp(log.timestamp)}</span>
                </td>
                <td className="room-cell">
                  <MapPin size={16} />
                  <span>{log.room}</span>
                </td>
                <td className="action-cell">
                  <div
                    className="action-badge"
                    style={{
                      backgroundColor: `${getActionColor(log.action)}20`,
                      color: getActionColor(log.action)
                    }}
                  >
                    <span className="action-icon">{getActionIcon(log.action)}</span>
                    <span>{log.action}</span>
                  </div>
                </td>
                <td className="reason-cell">{log.reason}</td>
                <td className="confidence-cell">
                  <div className="confidence-bar-container">
                    <div
                      className="confidence-bar"
                      style={{
                        width: log.confidence === 'N/A' ? '0%' : log.confidence,
                        backgroundColor: getActionColor(log.action)
                      }}
                    ></div>
                    <span className="confidence-text">{log.confidence}</span>
                  </div>
                </td>
                <td className="status-cell">
                  {log.simulated && (
                    <span className="simulated-badge">
                      <CheckCircle size={14} />
                      Simulated Event
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="logs-footer">
        <div className="footer-info">
          <h3>About Audit Logs</h3>
          <p>
            The audit log maintains a complete, immutable record of all system actions. Each entry includes:
          </p>
          <ul>
            <li><strong>Timestamp:</strong> Exact date and time of the event</li>
            <li><strong>Room:</strong> Location where the action occurred</li>
            <li><strong>Action:</strong> What the system did (alert, power cut, verification, etc.)</li>
            <li><strong>Reason:</strong> Why the action was taken based on detected conditions</li>
            <li><strong>Confidence:</strong> AI/CV confidence level in the detection (when applicable)</li>
          </ul>
          <p className="footer-note">
            In production deployment, these logs would be stored securely and could be exported for
            compliance reporting, energy audits, and system performance analysis.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
