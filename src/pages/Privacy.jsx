import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Shield,
  Camera,
  Radio,
  CheckCircle,
  Eye,
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
    <div className="privacy-container" ref={pageRef}>
      <div className="privacy-header">
        <div className="privacy-header-icon">
          <Shield size={36} />
        </div>
        <h1>Privacy & Compliance</h1>
        <p className="privacy-subtitle">
          Understanding how Watt-Watch protects privacy while monitoring energy usage
        </p>
      </div>

      <div className="privacy-grid" ref={el => sectionsRef.current[0] = el}>
        <div className="privacy-card">
          <div className="privacy-card-header">
            <Server size={20} />
            <h2>Local Processing</h2>
          </div>
          <p className="card-description">All video analysis happens on edge devices. No raw footage leaves the room.</p>
        </div>
        <div className="privacy-card">
          <div className="privacy-card-header">
            <UserX size={20} />
            <h2>No Individual Tracking</h2>
          </div>
          <p className="card-description">System counts occupancy only. No facial recognition or person identification.</p>
        </div>
        <div className="privacy-card highlight">
          <div className="privacy-card-header">
            <Lock size={20} />
            <h2>Data Minimization</h2>
          </div>
          <p className="card-description">Only aggregate statistics are stored. No personal data collected or retained.</p>
        </div>
        <div className="privacy-card info">
          <div className="privacy-card-header">
            <Eye size={20} />
            <h2>Transparency</h2>
          </div>
          <p className="card-description">Clear signage in monitored rooms. Full disclosure of monitoring methods.</p>
        </div>
      </div>

      <div className="privacy-grid" ref={el => sectionsRef.current[1] = el}>
        <div className="privacy-card info">
          <div className="privacy-card-header">
            <Camera size={20} />
            <h2>Camera-Enabled Rooms</h2>
          </div>
          <p className="card-description">
            These rooms use edge AI cameras for occupancy detection. <strong>No video is stored or transmitted.</strong>
          </p>
          <ul className="rooms-list">
            {privacyData.cameraRooms.map((room, index) => (
              <li key={index} className="room-item">
                <div className="room-item-header">
                  <span>{room.name}</span>
                </div>
                <div className="room-reason">Processing: {room.processingType}</div>
                <div className="room-reason">Data Retention: {room.dataRetention}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="privacy-card">
          <div className="privacy-card-header">
            <Radio size={20} />
            <h2>Non-Camera Rooms</h2>
          </div>
          <p className="card-description">
            These rooms use alternative monitoring methods without cameras. <strong>Zero visual monitoring.</strong>
          </p>
          <ul className="rooms-list">
            {privacyData.nonCameraRooms.map((room, index) => (
              <li key={index} className="room-item">
                <div className="room-item-header">
                  <span>{room.name}</span>
                </div>
                <div className="room-reason">Method: {room.method}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="privacy-card" ref={el => sectionsRef.current[2] = el}>
        <div className="privacy-card-header">
          <FileText size={20} />
          <h2>Compliance Statements</h2>
        </div>
        <div className="compliance-list">
          {privacyData.complianceStatements.map((statement, index) => (
            <div key={index} className="compliance-item">
              <CheckCircle size={18} />
              <span>{statement}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="privacy-card" ref={el => sectionsRef.current[3] = el}>
        <div className="privacy-card-header">
          <Shield size={20} />
          <h2>How Data Flows</h2>
        </div>
        <div className="processing-flow">
          <div className="flow-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Capture</h3>
              <p>Camera captures video feed locally</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Process</h3>
              <p>Edge AI extracts occupancy count only</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Transmit</h3>
              <p>Only count data sent to dashboard</p>
            </div>
          </div>
          <div className="flow-step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Discard</h3>
              <p>Original video immediately discarded</p>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-note">
        <p>
          Watt-Watch is designed with privacy as a core principle. For questions or concerns, contact campus administration.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
