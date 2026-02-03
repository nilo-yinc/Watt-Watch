import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Shield,
  Camera,
  Radio,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Server,
  UserX,
  FileText
} from 'lucide-react';
import { privacyData } from '../data/mockData';

const Privacy = () => {
  const pageRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Page animation
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // Sections animation
    sectionsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, delay: index * 0.1, ease: 'power2.out' }
        );
      }
    });
  }, []);

  return (
    <div className="privacy-page" ref={pageRef}>
      <div className="page-header">
        <h1>
          <Shield size={28} />
          Privacy & Compliance
        </h1>
        <p className="header-description">
          Understanding how Watt-Watch protects privacy while monitoring energy usage
        </p>
      </div>

      {/* Privacy Principles */}
      <div className="privacy-principles" ref={el => sectionsRef.current[0] = el}>
        <h2>Our Privacy Principles</h2>
        <div className="principles-grid">
          <div className="principle-card">
            <div className="principle-icon">
              <Server size={24} />
            </div>
            <h4>Local Processing</h4>
            <p>All video analysis happens on edge devices. No raw footage leaves the room.</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">
              <UserX size={24} />
            </div>
            <h4>No Individual Tracking</h4>
            <p>System counts occupancy only. No facial recognition or person identification.</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">
              <Lock size={24} />
            </div>
            <h4>Data Minimization</h4>
            <p>Only aggregate statistics are stored. No personal data collected or retained.</p>
          </div>
          <div className="principle-card">
            <div className="principle-icon">
              <Eye size={24} />
            </div>
            <h4>Transparency</h4>
            <p>Clear signage in monitored rooms. Full disclosure of monitoring methods.</p>
          </div>
        </div>
      </div>

      {/* Room Monitoring Methods */}
      <div className="monitoring-section" ref={el => sectionsRef.current[1] = el}>
        <h2>Room Monitoring Methods</h2>
        
        <div className="monitoring-grid">
          {/* Camera Rooms */}
          <div className="monitoring-card camera">
            <div className="card-header">
              <Camera size={20} />
              <h3>Camera-Enabled Rooms</h3>
              <span className="room-count">{privacyData.cameraRooms.length} rooms</span>
            </div>
            <div className="card-body">
              <p className="method-description">
                These rooms use edge AI cameras for occupancy detection. 
                <strong> No video is stored or transmitted.</strong>
              </p>
              <ul className="room-list">
                {privacyData.cameraRooms.map((room, index) => (
                  <li key={index}>
                    <span className="room-name">{room.name}</span>
                    <div className="room-details">
                      <span className="detail">
                        <Server size={12} /> {room.processingType}
                      </span>
                      <span className="detail">
                        <FileText size={12} /> Data Retention: {room.dataRetention}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="privacy-features">
                <h4>Privacy Features:</h4>
                <ul>
                  <li><CheckCircle size={14} /> Ghost View shows only anonymized silhouettes</li>
                  <li><CheckCircle size={14} /> Edge processing - no cloud upload</li>
                  <li><CheckCircle size={14} /> Real-time count only, no recording</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Non-Camera Rooms */}
          <div className="monitoring-card non-camera">
            <div className="card-header">
              <Radio size={20} />
              <h3>Non-Camera Rooms</h3>
              <span className="room-count">{privacyData.nonCameraRooms.length} rooms</span>
            </div>
            <div className="card-body">
              <p className="method-description">
                These rooms use alternative monitoring methods without cameras.
                <strong> Zero visual monitoring.</strong>
              </p>
              <ul className="room-list">
                {privacyData.nonCameraRooms.map((room, index) => (
                  <li key={index}>
                    <span className="room-name">{room.name}</span>
                    <div className="room-details">
                      <span className="detail">
                        <Radio size={12} /> {room.method}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="method-types">
                <h4>Methods Used:</h4>
                <div className="method-badges">
                  <span className="method-badge">
                    <Radio size={14} /> PIR Motion Sensors
                  </span>
                  <span className="method-badge">
                    <Radio size={14} /> Smart Plug Monitoring
                  </span>
                  <span className="method-badge">
                    <Radio size={14} /> Schedule-Based
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Statements */}
      <div className="compliance-section" ref={el => sectionsRef.current[2] = el}>
        <h2>Compliance Statements</h2>
        <div className="compliance-list">
          {privacyData.complianceStatements.map((statement, index) => (
            <div key={index} className="compliance-item">
              <CheckCircle size={20} className="compliance-icon" />
              <span>{statement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Flow Diagram */}
      <div className="data-flow-section" ref={el => sectionsRef.current[3] = el}>
        <h2>How Data Flows</h2>
        <div className="data-flow">
          <div className="flow-step">
            <div className="step-icon">
              <Camera size={24} />
            </div>
            <div className="step-content">
              <h4>1. Capture</h4>
              <p>Camera captures video feed locally</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="step-icon">
              <Server size={24} />
            </div>
            <div className="step-content">
              <h4>2. Process</h4>
              <p>Edge AI extracts occupancy count only</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step">
            <div className="step-icon">
              <FileText size={24} />
            </div>
            <div className="step-content">
              <h4>3. Transmit</h4>
              <p>Only count data sent to dashboard</p>
            </div>
          </div>
          <div className="flow-arrow">→</div>
          <div className="flow-step delete">
            <div className="step-icon">
              <EyeOff size={24} />
            </div>
            <div className="step-content">
              <h4>4. Discard</h4>
              <p>Original video immediately discarded</p>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-footer">
        <p>
          Watt-Watch is designed with privacy as a core principle. 
          For questions or concerns, contact campus administration.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
