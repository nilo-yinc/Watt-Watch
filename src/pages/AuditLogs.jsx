import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  FileText,
  Clock,
  Building2,
  Activity,
  MessageSquare,
  Filter,
  Download
} from 'lucide-react';
import { auditLogs } from '../data/mockData';

const AuditLogs = () => {
  const pageRef = useRef(null);
  const tableRef = useRef(null);
  const rowRefs = useRef([]);
  const [filteredLogs, setFilteredLogs] = React.useState(auditLogs);

  useEffect(() => {
    // Page animation
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // Table animation
    gsap.fromTo(tableRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: 'power2.out' }
    );

    // Row animations
    rowRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.3, delay: 0.3 + index * 0.05, ease: 'power2.out' }
        );
      }
    });
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
      time: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    };
  };

  const getConfidenceColor = (level) => {
    if (level >= 95) return 'confidence-high';
    if (level >= 85) return 'confidence-medium';
    return 'confidence-low';
  };

  const getActionIcon = (action) => {
    if (action.includes('reduction')) return <Activity size={16} />;
    if (action.includes('Alert')) return <MessageSquare size={16} />;
    if (action.includes('verified')) return <Activity size={16} />;
    if (action.includes('activated')) return <Activity size={16} />;
    return <FileText size={16} />;
  };

  return (
    <div className="audit-logs-container" ref={pageRef}>
      <div className="audit-logs-header">
        <div className="header-left">
          <FileText size={28} />
          <div>
            <h1>Audit Logs</h1>
            <p className="audit-subtitle">
              Complete history of all system actions and automated decisions
            </p>
          </div>
        </div>
        <div className="logs-count">
          <Activity size={16} /> {filteredLogs.length} Entries
        </div>
      </div>

      <div className="simulation-notice">
        <span className="notice-badge">Simulated</span>
        All entries are generated for prototype demonstration purposes.
      </div>

      <div className="logs-controls">
        <button className="btn btn-secondary btn-sm">
          <Filter size={16} />
          Filter
        </button>
        <button className="btn btn-secondary btn-sm">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="logs-table-container" ref={tableRef}>
        <table className="logs-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Room</th>
              <th>Action</th>
              <th>Reason</th>
              <th>Confidence</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log, index) => {
              const ts = formatTimestamp(log.timestamp);
              return (
                <tr
                  key={log.id}
                  ref={el => rowRefs.current[index] = el}
                >
                  <td className="timestamp-cell">
                    <Clock size={14} />
                    <div className="timestamp">
                      <span className="date">{ts.date}</span>
                      <span className="time">{ts.time}</span>
                    </div>
                  </td>
                  <td className="room-cell">
                    <Building2 size={14} />
                    <span>{log.room}</span>
                  </td>
                  <td className="action-cell">
                    <div className="action-badge">
                      {getActionIcon(log.action)}
                      <span>{log.action}</span>
                    </div>
                  </td>
                  <td className="reason-cell">
                    <span>{log.reason}</span>
                  </td>
                  <td className="confidence-cell">
                    {log.confidence !== null ? (
                      <div className="confidence-bar-container">
                        <div
                          className="confidence-bar"
                          style={{
                            width: `${log.confidence}%`,
                            background: log.confidence >= 95 ? '#10b981' : log.confidence >= 85 ? '#f59e0b' : '#ef4444'
                          }}
                        ></div>
                        <span className="confidence-text">{log.confidence}%</span>
                      </div>
                    ) : (
                      <span className="confidence-text">—</span>
                    )}
                  </td>
                  <td className="status-cell">
                    {log.simulated && (
                      <span className="simulated-badge">
                        <span className="badge-dot"></span>
                        Simulated
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="logs-footer">
        <div className="footer-info">
          <h3>About System Logs</h3>
          <p>
            Audit logs provide a complete, immutable record of all system actions. Each entry includes
            the timestamp, affected room, action taken, reasoning, and confidence level of automated decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
