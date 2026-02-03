import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Shield, Camera, CheckCircle, Lock, Eye, Server } from 'lucide-react';
import { privacyCompliance } from '../data/mockData';

const Privacy = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      const ctx = gsap.context(() => {
        gsap.from(cards, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out'
        });
      });

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <div className="privacy-header-icon">
          <Shield size={48} color="#10b981" />
        </div>
        <h1>Privacy & Compliance</h1>
        <p className="privacy-subtitle">
          Watt-Watch prioritizes privacy while delivering intelligent energy monitoring
        </p>
      </div>

      <div className="privacy-grid">
        <div ref={el => cardsRef.current[0] = el} className="privacy-card highlight">
          <div className="privacy-card-header">
            <CheckCircle size={28} color="#10b981" />
            <h2>Privacy-First Architecture</h2>
          </div>
          <div className="compliance-list">
            {privacyCompliance.complianceStatements.map((statement, index) => (
              <div key={index} className="compliance-item">
                <CheckCircle size={18} color="#10b981" />
                <span>{statement}</span>
              </div>
            ))}
          </div>
        </div>

        <div ref={el => cardsRef.current[1] = el} className="privacy-card">
          <div className="privacy-card-header">
            <Camera size={28} color="#3b82f6" />
            <h2>Camera-Enabled Rooms</h2>
          </div>
          <p className="card-description">
            The following rooms use computer vision for occupancy detection
          </p>
          <div className="rooms-list">
            {privacyCompliance.camerasEnabled.map((room, index) => (
              <div key={index} className="room-item">
                <div className="room-item-header">
                  <Camera size={16} />
                  <strong>{room.roomName}</strong>
                </div>
                <p className="room-reason">{room.reason}</p>
              </div>
            ))}
          </div>
          <div className="privacy-note">
            <Lock size={16} />
            <span>All camera processing is done locally on edge devices</span>
          </div>
        </div>

        <div ref={el => cardsRef.current[2] = el} className="privacy-card">
          <div className="privacy-card-header">
            <CheckCircle size={28} color="#10b981" />
            <h2>Non-Camera Monitoring</h2>
          </div>
          <p className="card-description">
            These rooms use alternative monitoring methods that do not involve cameras
          </p>
          <div className="rooms-list">
            {privacyCompliance.noCameraRooms.map((room, index) => (
              <div key={index} className="room-item">
                <div className="room-item-header">
                  <CheckCircle size={16} color="#10b981" />
                  <strong>{room.roomName}</strong>
                </div>
                <p className="room-reason">Method: {room.method}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={el => cardsRef.current[3] = el} className="privacy-card info">
          <div className="privacy-card-header">
            <Eye size={28} color="#0ea5e9" />
            <h2>What We Monitor</h2>
          </div>
          <div className="monitor-list">
            <div className="monitor-item">
              <div className="monitor-icon allowed">
                <CheckCircle size={20} />
              </div>
              <div>
                <strong>We Monitor:</strong>
                <p>Room occupancy count, appliance power states, energy consumption patterns</p>
              </div>
            </div>
            <div className="monitor-item">
              <div className="monitor-icon not-allowed">
                <Eye size={20} />
              </div>
              <div>
                <strong>We Do NOT Monitor:</strong>
                <p>Individual identities, facial features, personal activities, or private conversations</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={el => cardsRef.current[4] = el} className="privacy-card">
          <div className="privacy-card-header">
            <Server size={28} color="#f59e0b" />
            <h2>Data Processing</h2>
          </div>
          <div className="processing-flow">
            <div className="flow-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Edge Processing</h3>
                <p>All computer vision processing happens locally on edge devices (ESP32-CAM)</p>
              </div>
            </div>
            <div className="flow-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Anonymized Data</h3>
                <p>Only occupancy counts and appliance states are transmitted to the cloud</p>
              </div>
            </div>
            <div className="flow-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>No Video Storage</h3>
                <p>Raw video feeds are never stored or transmitted anywhere</p>
              </div>
            </div>
            <div className="flow-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Secure Communication</h3>
                <p>All data transmission uses encrypted channels (TLS/SSL)</p>
              </div>
            </div>
          </div>
        </div>

        <div ref={el => cardsRef.current[5] = el} className="privacy-card highlight">
          <div className="privacy-card-header">
            <Lock size={28} color="#10b981" />
            <h2>Compliance & Standards</h2>
          </div>
          <div className="compliance-badges">
            <div className="badge">
              <CheckCircle size={20} color="#10b981" />
              <span>GDPR Compliant</span>
            </div>
            <div className="badge">
              <CheckCircle size={20} color="#10b981" />
              <span>Campus Privacy Policy</span>
            </div>
            <div className="badge">
              <CheckCircle size={20} color="#10b981" />
              <span>No Personal Data Collection</span>
            </div>
            <div className="badge">
              <CheckCircle size={20} color="#10b981" />
              <span>Local Processing First</span>
            </div>
          </div>
          <p className="compliance-footer">
            Watt-Watch is designed with privacy as a core principle, ensuring compliance with
            all applicable data protection regulations while delivering effective energy monitoring.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
