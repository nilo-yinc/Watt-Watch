import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  FileText,
  Clock,
  Building2,
  Activity,
  MessageSquare,
  Gauge,
  Filter,
  Download
} from 'lucide-react';
import { auditLogs } from '../data/mockData';

const AuditLogs = () => {
  const pageRef = useRef(null);
  const tableRef = useRef(null);
  const rowRefs = useRef([]);

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
    if (action.includes('override')) return <Gauge size={16} />;
    if (action.includes('activated')) return <Activity size={16} />;
    return <FileText size={16} />;
  };

  return (
    <div className="audit-logs-page" ref={pageRef}>
      <div className="page-header">
        <h1>
          <FileText size={28} />
          Audit Logs
        </h1>
        <p className="header-description">
          Complete history of all system actions and automated decisions
        </p>
      </div>

      {/* Filters */}
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

      {/* Logs Table */}
      <div className="logs-table-wrapper" ref={tableRef}>
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
            {auditLogs.map((log, index) => {
              const ts = formatTimestamp(log.timestamp);
              return (
                <tr
                  key={log.id}
                  className="log-row"
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
                      <div className={`confidence-indicator ${getConfidenceColor(log.confidence)}`}>
                        <Gauge size={14} />
                        <span>{log.confidence}%</span>
                      </div>
                    ) : (
                      <span className="confidence-na">—</span>
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

      {/* Info Footer */}
      <div className="logs-footer">
        <h3>About System Logs</h3>
        <p>
          Audit logs provide a complete, immutable record of all system actions. Each entry includes
          the timestamp, affected room, action taken, reasoning, and confidence level of automated decisions.
          These logs are essential for compliance, troubleshooting, and energy audits.
        </p>
      </div>
    </div>
  );
};

export default AuditLogs;
