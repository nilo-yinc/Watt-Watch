import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  ArrowLeft, Users, Lightbulb, Monitor, Fan, Wind,
  Power, Wifi, Eye, EyeOff, AlertCircle, CheckCircle
} from 'lucide-react';
import { rooms } from '../data/mockData';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const room = rooms.find(r => r.id === parseInt(id));
  const [relayState, setRelayState] = useState(room?.relayState || 'on');
  const [ghostView, setGhostView] = useState(room?.ghostViewEnabled || false);
  const contentRef = useRef(null);
  const relayButtonRef = useRef(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!contentRef.current) return;

      const ctx = gsap.context(() => {
        gsap.from(contentRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        });
      });

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(delay);
  }, []);

  if (!room) {
    return (
      <div className="room-detail-container">
        <div className="error-state">
          <AlertCircle size={48} />
          <h2>Room Not Found</h2>
          <button onClick={() => navigate('/dashboard')} className="back-button">
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleRelayToggle = () => {
    const newState = relayState === 'on' ? 'off' : 'on';

    gsap.to(relayButtonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        setRelayState(newState);
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'efficient': return '#10b981';
      case 'waste': return '#ef4444';
      case 'review': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  return (
    <div className="room-detail-container">
      <button onClick={() => navigate('/dashboard')} className="back-button">
        <ArrowLeft size={20} /> Back to Dashboard
      </button>

      <div ref={contentRef} className="room-detail-content">
        <div className="room-detail-header">
          <div>
            <h1>{room.name}</h1>
            <div className="room-meta">
              <span className="room-type-badge">{room.type}</span>
              <span
                className="status-badge"
                style={{
                  backgroundColor: `${getStatusColor(room.status)}20`,
                  color: getStatusColor(room.status)
                }}
              >
                {room.status === 'efficient' ? 'Efficient' : room.status === 'waste' ? 'Wasting Energy' : 'Needs Review'}
              </span>
            </div>
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-card">
            <h2>Room Information</h2>
            <div className="info-rows">
              <div className="info-row">
                <span className="info-label">Room Name:</span>
                <span className="info-value">{room.name}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Room Type:</span>
                <span className="info-value">{room.type}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Monitoring Method:</span>
                <span className="info-value">{room.monitoringMethod}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Auto-Action Mode:</span>
                <span className="info-value">
                  {room.autoActionMode ? (
                    <span className="enabled">✓ Enabled</span>
                  ) : (
                    <span className="disabled">Alert Only</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-card">
            <h2>Live Status <span className="simulated-label">(Simulated)</span></h2>
            <div className="status-rows">
              <div className="status-row">
                <Users size={20} />
                <span className="status-label">Occupancy Detected:</span>
                <span className={`status-value ${room.occupancy > 0 ? 'active' : 'inactive'}`}>
                  {room.occupancy > 0 ? `Yes (${room.occupancy} people)` : 'No'}
                </span>
              </div>

              <div className="appliances-status">
                <h3>Appliance States:</h3>

                {room.type === 'Computer Lab' ? (
                  <>
                    <div className="appliance-row">
                      <Lightbulb size={18} />
                      <span>Lights</span>
                      <span className={room.applianceStates.lights ? 'status-on' : 'status-off'}>
                        {room.applianceStates.lights ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    <div className="appliance-row critical">
                      <Monitor size={18} />
                      <span>Desktops</span>
                      <div className="desktop-details">
                        <div>Total ON: <strong>{room.applianceStates.desktops.totalOn}</strong></div>
                        <div className="warning-text">
                          Monitor OFF: <strong>{room.applianceStates.desktops.monitorsOff}</strong>
                        </div>
                        <div className="danger-text">
                          CPU ACTIVE: <strong>{room.applianceStates.desktops.cpuActive}</strong> (Hidden Waste)
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="appliance-row">
                      <Lightbulb size={18} />
                      <span>Lights</span>
                      <span className={room.applianceStates.lights ? 'status-on' : 'status-off'}>
                        {room.applianceStates.lights ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    {room.applianceStates.projector !== undefined && (
                      <div className="appliance-row">
                        <Monitor size={18} />
                        <span>Projector</span>
                        <span className={room.applianceStates.projector ? 'status-on' : 'status-off'}>
                          {room.applianceStates.projector ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    )}
                    {room.applianceStates.ac !== undefined && (
                      <div className="appliance-row">
                        <Wind size={18} />
                        <span>AC</span>
                        <span className={room.applianceStates.ac ? 'status-on' : 'status-off'}>
                          {room.applianceStates.ac ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    )}
                    {room.applianceStates.fan !== undefined && (
                      <div className="appliance-row">
                        <Fan size={18} />
                        <span>Fan</span>
                        <span className={room.applianceStates.fan ? 'status-on' : 'status-off'}>
                          {room.applianceStates.fan ? 'ON' : 'OFF'}
                        </span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="detail-card hardware-panel">
            <h2>🔌 Hardware Simulation Panel</h2>
            <div className="hardware-content">
              <div className="hardware-status">
                <div className="hardware-row">
                  <Wifi size={20} className={room.esp32Status === 'connected' ? 'status-connected' : 'status-disconnected'} />
                  <span>ESP32 Status:</span>
                  <span className={`status-badge ${room.esp32Status === 'connected' ? 'connected' : 'disconnected'}`}>
                    {room.esp32Status === 'connected' ? 'Connected (Simulated)' : 'Disconnected'}
                  </span>
                </div>
                <div className="hardware-row">
                  <Power size={20} />
                  <span>Relay State:</span>
                  <span className={`relay-state ${relayState === 'on' ? 'relay-on' : 'relay-off'}`}>
                    {relayState.toUpperCase()}
                  </span>
                </div>
              </div>

              <button
                ref={relayButtonRef}
                onClick={handleRelayToggle}
                className={`relay-button ${relayState === 'on' ? 'relay-button-on' : 'relay-button-off'}`}
              >
                <Power size={20} />
                {relayState === 'on' ? 'Simulate Power OFF via IoT' : 'Simulate Power ON via IoT'}
              </button>

              <div className="hardware-explanation">
                <AlertCircle size={16} />
                <p>
                  In real deployment, this action triggers an ESP32 relay to cut power to the appliances in this room.
                  The ESP32 microcontroller receives commands from the cloud and controls the physical relay switch.
                </p>
              </div>
            </div>
          </div>

          {room.monitoringMethod === 'Camera' && (
            <div className="detail-card">
              <h2>🌱 Privacy-First Ghost View</h2>
              <div className="ghost-view-content">
                <div className="ghost-view-toggle">
                  <span>Ghost View:</span>
                  <button
                    onClick={() => setGhostView(!ghostView)}
                    className={`toggle-button ${ghostView ? 'toggle-on' : 'toggle-off'}`}
                  >
                    {ghostView ? <Eye size={18} /> : <EyeOff size={18} />}
                    {ghostView ? 'ON' : 'OFF'}
                  </button>
                </div>

                {ghostView ? (
                  <div className="ghost-view-display">
                    <div className="ghost-silhouettes">
                      {[...Array(Math.min(room.occupancy, 5))].map((_, i) => (
                        <div key={i} className="ghost-silhouette">
                          <Users size={32} />
                        </div>
                      ))}
                      {room.occupancy === 0 && (
                        <div className="empty-room-indicator">
                          <AlertCircle size={32} />
                          <p>No occupancy detected</p>
                        </div>
                      )}
                    </div>
                    <p className="ghost-view-label">Anonymized occupancy detection - no personal identification</p>
                  </div>
                ) : (
                  <div className="data-only-mode">
                    <CheckCircle size={32} />
                    <p>Data-Only Mode</p>
                    <p className="mode-description">Showing occupancy count only without visual representation</p>
                  </div>
                )}

                <div className="privacy-note">
                  <p>✓ No raw video stored</p>
                  <p>✓ All processing is local</p>
                  <p>✓ System monitors resources, not individuals</p>
                </div>
              </div>
            </div>
          )}

          {room.monitoringMethod !== 'Camera' && (
            <div className="detail-card">
              <h2>Monitoring Method</h2>
              <div className="non-camera-info">
                <CheckCircle size={32} color="#10b981" />
                <p>This room is monitored using non-camera methods.</p>
                <p className="method-detail">Method: <strong>{room.monitoringMethod}</strong></p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
