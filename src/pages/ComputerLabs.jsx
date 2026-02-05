import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Monitor,
  Cpu,
  AlertTriangle,
  Info,
  CheckCircle
} from 'lucide-react';
import { computerLabData, roomsData } from '../data/mockData';

const ComputerLabs = () => {
  const pageRef = useRef(null);
  const cardsRef = useRef([]);

  const computerLabs = roomsData.filter(room => room.type === 'Computer Lab');
  const labStats = computerLabs.reduce(
    (acc, lab) => {
      const data = computerLabData[lab.name];
      if (!data) return acc;
      acc.totalDesktops += data.totalDesktops;
      acc.desktopsOn += data.desktopsOn;
      if (lab.status === 'waste') acc.wasteLabs += 1;
      return acc;
    },
    { totalDesktops: 0, desktopsOn: 0, wasteLabs: 0 }
  );

  useEffect(() => {
    // Page animation
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // Cards animation
    cardsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.4, delay: index * 0.15, ease: 'power2.out' }
        );
      }
    });
  }, []);

  return (
    <div className="computer-lab-container" ref={pageRef}>
      <div className="computer-lab-header">
        <h1>
          <Monitor size={28} />
          Computer Lab Intelligence
        </h1>
        <p className="header-description">
          Specialized monitoring for detecting hidden energy waste in computer labs
        </p>
      </div>

      <div className="stats-grid" ref={el => cardsRef.current[0] = el}>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
            <Monitor size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{computerLabs.length}</div>
            <div className="stat-label">Labs Monitored</div>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon" style={{ background: '#fef3c7', color: '#92400e' }}>
            <AlertTriangle size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{labStats.wasteLabs}</div>
            <div className="stat-label">Labs With Waste</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#dcfce7', color: '#166534' }}>
            <Cpu size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{labStats.totalDesktops}</div>
            <div className="stat-label">Total Desktops</div>
          </div>
        </div>
        <div className="stat-card danger">
          <div className="stat-icon" style={{ background: '#fee2e2', color: '#991b1b' }}>
            <Cpu size={24} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{labStats.desktopsOn}</div>
            <div className="stat-label">Desktops ON</div>
          </div>
        </div>
      </div>

      {/* Explanation Card */}
      <div className="explanation-card" ref={el => cardsRef.current[1] = el}>
        <h2>What is Hidden Energy Waste?</h2>
        <div className="explanation-content">
          <div className="explanation-item">
            <Info size={20} />
            <div>
              <h3>CPU vs Monitor</h3>
              <p>
                Computer labs often exhibit <strong>"hidden waste"</strong> where CPUs remain active even
                when monitors are powered off. This results in significant energy consumption for minimal usage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Computer Labs Grid */}
      <div className="labs-grid">
        {computerLabs.map((lab, index) => {
          const labData = computerLabData[lab.name];
          
          if (!labData) return null;

          return (
            <div
              key={lab.id}
              className="lab-card"
              ref={el => cardsRef.current[index + 2] = el}
            >
              <div className="lab-header">
                <h3>{lab.name}</h3>
                <span className={lab.status === 'waste' ? 'status-waste' : 'status-efficient'}>
                  {lab.status === 'waste' ? 'Waste Detected' : 'Efficient'}
                </span>
              </div>

              <div className="lab-stats">
                <div className="lab-stat-row">
                  <span className="lab-stat-label">Total Desktops</span>
                  <span className="lab-stat-value">{labData.totalDesktops}</span>
                </div>
                <div className="lab-stat-row">
                  <span className="lab-stat-label">Desktops ON</span>
                  <span className="lab-stat-value">{labData.desktopsOn}</span>
                </div>
                <div className="lab-stat-row">
                  <span className="lab-stat-label">Monitors ON</span>
                  <span className="lab-stat-value">{labData.monitorsOn}</span>
                </div>
                <div className={`lab-stat-row ${labData.hiddenWaste ? 'warning' : ''}`}>
                  <span className="lab-stat-label">CPUs Active</span>
                  <span className="lab-stat-value">{labData.cpusActive}</span>
                </div>
                <div className={`lab-stat-row ${labData.hiddenWaste ? 'danger' : ''}`}>
                  <span className="lab-stat-label">Estimated Waste</span>
                  <span className="lab-stat-value">{labData.estimatedWasteWatts} W</span>
                </div>
              </div>

              {labData.hiddenWaste && (
                <div className="hidden-waste-alert">
                  <AlertTriangle size={16} />
                  <div className="alert-content">
                    <h3>Hidden Waste Detected</h3>
                    <p>{labData.cpusActive - labData.monitorsOn} CPUs running without displays</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="explanation-card" ref={el => cardsRef.current[computerLabs.length + 2] = el}>
        <h2>How to Reduce Hidden Waste</h2>
        <div className="explanation-content">
          <div className="explanation-item">
            <CheckCircle size={18} />
            <div>
              <h3>Shutdown Schedules</h3>
              <p>Configure computers to automatically shutdown during off-hours.</p>
            </div>
          </div>
          <div className="explanation-item">
            <CheckCircle size={18} />
            <div>
              <h3>Student Education</h3>
              <p>Train users to properly shutdown systems, not just monitors.</p>
            </div>
          </div>
          <div className="explanation-item">
            <CheckCircle size={18} />
            <div>
              <h3>Power Management</h3>
              <p>Enable aggressive CPU power states and sleep modes.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="privacy-note">
        <Info size={20} />
        <p>
          Computer lab intelligence uses smart plug monitoring and CPU state detection. All simulations shown are for prototype demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default ComputerLabs;
