import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Monitor,
  Cpu,
  AlertTriangle,
  Zap,
  Power,
  Info,
  CheckCircle
} from 'lucide-react';
import { computerLabData, roomsData } from '../data/mockData';

const ComputerLabs = () => {
  const pageRef = useRef(null);
  const cardsRef = useRef([]);

  const computerLabs = roomsData.filter(room => room.type === 'Computer Lab');

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
    <div className="computer-labs-page" ref={pageRef}>
      <div className="page-header">
        <h1>
          <Monitor size={28} />
          Computer Lab Intelligence
        </h1>
        <p className="header-description">
          Specialized monitoring for detecting hidden energy waste in computer labs
        </p>
      </div>

      {/* Explanation Card */}
      <div className="explanation-card" ref={el => cardsRef.current[0] = el}>
        <div className="explanation-icon">
          <Info size={24} />
        </div>
        <div className="explanation-content">
          <h3>What is Hidden Energy Waste?</h3>
          <p>
            Computer labs often exhibit <strong>"hidden waste"</strong> where CPUs remain active even 
            when monitors are powered off. Students or staff shutdown displays to save power, but forget to 
            shut down the computer itself. This results in significant energy consumption for minimal usage.
          </p>
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
              className={`lab-card ${lab.status === 'waste' ? 'waste-detected' : 'efficient'}`}
              ref={el => cardsRef.current[index + 1] = el}
            >
              <div className="lab-header">
                <h3>{lab.name}</h3>
                <div className="lab-status">
                  {lab.status === 'waste' ? (
                    <span className="status-warning">
                      <AlertTriangle size={16} />
                      Waste Detected
                    </span>
                  ) : (
                    <span className="status-good">
                      <CheckCircle size={16} />
                      Efficient
                    </span>
                  )}
                </div>
              </div>

              <div className="lab-stats">
                <div className="stat-row">
                  <div className="stat-item">
                    <Monitor size={20} />
                    <div className="stat-info">
                      <span className="stat-value">{labData.totalDesktops}</span>
                      <span className="stat-label">Total Desktops</span>
                    </div>
                  </div>
                  <div className="stat-item">
                    <Power size={20} />
                    <div className="stat-info">
                      <span className="stat-value">{labData.desktopsOn}</span>
                      <span className="stat-label">Desktops ON</span>
                    </div>
                  </div>
                </div>

                <div className="waste-breakdown">
                  <h4>Power State Analysis</h4>
                  <div className="breakdown-grid">
                    <div className="breakdown-item monitors">
                      <div className="breakdown-icon">
                        <Monitor size={18} />
                      </div>
                      <div className="breakdown-info">
                        <span className="breakdown-value">{labData.monitorsOn}</span>
                        <span className="breakdown-label">Monitors ON</span>
                      </div>
                    </div>
                    <div className="breakdown-item cpus">
                      <div className="breakdown-icon">
                        <Cpu size={18} />
                      </div>
                      <div className="breakdown-info">
                        <span className="breakdown-value">{labData.cpusActive}</span>
                        <span className="breakdown-label">CPUs Active</span>
                      </div>
                    </div>
                  </div>
                </div>

                {labData.hiddenWaste && (
                  <div className="hidden-waste-alert">
                    <AlertTriangle size={16} />
                    <div>
                      <strong>Hidden Waste Detected!</strong>
                      <p>{labData.cpusActive - labData.monitorsOn} CPUs running without displays</p>
                    </div>
                  </div>
                )}

                <div className="power-metrics">
                  <div className="metric">
                    <span className="metric-label">Estimated Waste:</span>
                    <span className="metric-value">
                      <Zap size={14} />
                      {labData.estimatedWasteWatts} W
                    </span>
                  </div>
                  <div className="metric">
                    <span className="metric-label">Avg CPU Usage:</span>
                    <span className="metric-value">{labData.avgCpuUsage}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="tips-section" ref={el => cardsRef.current[computerLabs.length + 1] = el}>
        <h2>How to Reduce Hidden Waste</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-number">1</div>
            <h4>Shutdown Schedules</h4>
            <p>Configure computers to automatically shutdown during off-hours</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">2</div>
            <h4>Student Education</h4>
            <p>Train users to properly shutdown systems, not just monitors</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">3</div>
            <h4>Power Management</h4>
            <p>Enable aggressive CPU power states and sleep modes</p>
          </div>
          <div className="tip-card">
            <div className="tip-number">4</div>
            <h4>Monitoring Alert</h4>
            <p>Alert IT staff when CPUs remain active without user input</p>
          </div>
        </div>
      </div>

      {/* Info Note */}
      <div className="lab-info-note">
        <Info size={20} />
        <p>
          Computer lab intelligence uses smart plug monitoring and CPU state detection.
          All simulations shown are for prototype demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default ComputerLabs;
