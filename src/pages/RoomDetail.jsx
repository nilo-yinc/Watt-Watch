import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  ArrowLeft,
  Users,
  Lightbulb,
  Monitor,
  Fan,
  Wind,
  Power,
  Wifi,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Zap,
  TrendingDown
} from 'lucide-react';
import { roomsData } from '../data/mockData';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = roomsData.find(r => r.id === parseInt(id));
  const [ghostView, setGhostView] = useState(false);
  const pageRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Page animation
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // Card animations
    cardsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.3, delay: 0.2 + index * 0.05, ease: 'power2.out' }
        );
      }
    });
  }, []);

  if (!room) {
    return (
      <div className="room-detail-page" ref={pageRef}>
        <button onClick={() => navigate('/dashboard')} className="back-button">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="error-state">
          <AlertCircle size={48} />
          <h2>Room Not Found</h2>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getStatusColor = (efficiency) => {
    if (efficiency > 0.7) return '#10b981'; // Green - efficient
    if (efficiency > 0.4) return '#f59e0b'; // Yellow - needs review
    return '#ef4444'; // Red - waste
  };

  const efficiency = 1 - (room.potentialSavings / (room.energyUsageToday || 1));

  return (
    <div className="room-detail-page" ref={pageRef}>
      <button onClick={() => navigate('/dashboard')} className="back-button">
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      {/* Header */}
      <div className="room-detail-header" ref={el => cardsRef.current[0] = el}>
        <div className="header-content">
          <h1>{room.name}</h1>
          <div className="room-badges">
            <span className="room-type-badge">{room.type}</span>
            <span
              className="efficiency-badge"
              style={{ backgroundColor: `${getStatusColor(efficiency)}20`, color: getStatusColor(efficiency) }}
            >
              {efficiency > 0.7 ? 'Efficient' : efficiency > 0.4 ? 'Needs Review' : 'High Waste'}
            </span>
          </div>
        </div>
        <div className="header-metrics">
          <div className="metric-item">
            <Zap size={20} />
            <div>
              <div className="metric-value">{room.energyUsageToday.toFixed(1)}</div>
              <div className="metric-label">kWh Today</div>
            </div>
          </div>
          <div className="metric-item">
            <TrendingDown size={20} />
            <div>
              <div className="metric-value">{room.potentialSavings.toFixed(1)}</div>
              <div className="metric-label">kWh to Save</div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Info Card */}
      <div className="detail-card" ref={el => cardsRef.current[1] = el}>
        <h2>Room Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <span className="info-label">Room Type</span>
            <span className="info-value">{room.type}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Monitoring Method</span>
            <span className="info-value">{room.monitoringMethod}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Current Occupancy</span>
            <span className="info-value">
              {room.occupancy > 0 ? `${room.occupancy} people` : 'Unoccupied'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Efficiency Level</span>
            <span className="info-value" style={{ color: getStatusColor(efficiency) }}>
              {(efficiency * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Live Status Card */}
      <div className="detail-card" ref={el => cardsRef.current[2] = el}>
        <h2>Live Status</h2>
        <div className="status-section">
          <div className="status-row">
            <Users size={20} />
            <span className="status-label">Occupancy:</span>
            <span className={`status-value ${room.occupancy > 0 ? 'active' : 'inactive'}`}>
              {room.occupancy > 0 ? `Yes (${room.occupancy} people)` : 'No'}
            </span>
          </div>
        </div>

        {/* Appliances */}
        <div className="appliances-section">
          <h3>Active Appliances</h3>
          <div className="appliances-grid">
            {Object.entries(room.appliances).map(([applianceName, status]) => {
              const icons = {
                lights: <Lightbulb size={18} />,
                ac: <Wind size={18} />,
                fan: <Fan size={18} />,
                monitor: <Monitor size={18} />,
                projector: <Monitor size={18} />
              };

              const label = applianceName.charAt(0).toUpperCase() + applianceName.slice(1);

              return (
                <div key={applianceName} className="appliance-item">
                  <div className="appliance-icon">
                    {icons[applianceName] || <Power size={18} />}
                  </div>
                  <div className="appliance-info">
                    <span className="appliance-name">{label}</span>
                    <span className={`appliance-status ${status ? 'on' : 'off'}`}>
                      {status ? 'ON' : 'OFF'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hardware Simulation Panel */}
      <div className="detail-card hardware-card" ref={el => cardsRef.current[3] = el}>
        <h2>
          <Power size={20} />
          Hardware Simulation Panel
        </h2>
        <div className="hardware-content">
          <div className="hardware-status">
            <div className="status-item">
              <Wifi size={20} />
              <div>
                <span className="status-label">IoT Device Status</span>
                <span className="status-badge connected">
                  <span className="badge-dot"></span>
                  Connected
                </span>
              </div>
            </div>
          </div>
          <button className="btn btn-warning">
            <Power size={16} />
            Simulate Power Override
          </button>
          <div className="hardware-note">
            <AlertCircle size={16} />
            <p>In real deployment, this triggers an IoT relay to cut power. ESP32 receives commands from cloud and controls physical relay.</p>
          </div>
        </div>
      </div>

      {/* Privacy & Monitoring Card */}
      {room.monitoringMethod === 'Camera' && (
        <div className="detail-card privacy-card" ref={el => cardsRef.current[4] = el}>
          <h2>
            <Eye size={20} />
            Privacy-First Ghost View
          </h2>
          <div className="ghost-view-content">
            <div className="ghost-view-toggle">
              <span>Ghost View Mode:</span>
              <button
                onClick={() => setGhostView(!ghostView)}
                className={`toggle-btn ${ghostView ? 'active' : ''}`}
              >
                {ghostView ? <Eye size={18} /> : <EyeOff size={18} />}
                {ghostView ? 'ON' : 'OFF'}
              </button>
            </div>

            {ghostView ? (
              <div className="ghost-view-display">
                <div className="ghost-silhouettes">
                  {[...Array(Math.max(1, Math.min(room.occupancy, 5)))].map((_, i) => (
                    <div key={i} className="ghost-silhouette">
                      <Users size={32} />
                    </div>
                  ))}
                </div>
                <p className="ghost-label">Anonymized occupancy visualization</p>
              </div>
            ) : (
              <div className="data-only-mode">
                <CheckCircle size={32} />
                <p>Data-Only Mode</p>
                <p className="mode-description">Showing metrics without visual representation</p>
              </div>
            )}

            <div className="privacy-guarantees">
              <div className="guarantee">
                <CheckCircle size={16} />
                No raw video stored
              </div>
              <div className="guarantee">
                <CheckCircle size={16} />
                All processing is local
              </div>
              <div className="guarantee">
                <CheckCircle size={16} />
                System monitors resources, not individuals
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Non-Camera Monitoring */}
      {room.monitoringMethod !== 'Camera' && (
        <div className="detail-card" ref={el => cardsRef.current[4] = el}>
          <h2>
            <CheckCircle size={20} />
            Monitoring Method
          </h2>
          <div className="non-camera-info">
            <p>This room uses <strong>{room.monitoringMethod}</strong> for energy monitoring.</p>
            <p className="info-note">No camera hardware or visual processing is used in this space.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomDetail;
