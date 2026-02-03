import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Monitor, AlertTriangle, Cpu, Eye, EyeOff } from 'lucide-react';
import { computerLabStats, rooms } from '../data/mockData';

const ComputerLab = () => {
  const navigate = useNavigate();
  const statsRef = useRef([]);
  const labsRef = useRef([]);

  const computerLabs = rooms.filter(r => r.type === 'Computer Lab');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(statsRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      });

      gsap.from(labsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="computer-lab-container">
      <div className="computer-lab-header">
        <h1>Computer Lab Intelligence</h1>
        <p className="header-description">
          Specialized monitoring for detecting hidden energy waste in computer labs
        </p>
      </div>

      <div className="stats-grid">
        <div ref={el => statsRef.current[0] = el} className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
            <Monitor size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{computerLabStats.totalLabs}</div>
            <div className="stat-label">Total Labs Monitored</div>
          </div>
        </div>

        <div ref={el => statsRef.current[1] = el} className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#10b98120', color: '#10b981' }}>
            <Monitor size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{computerLabStats.desktopsOn}</div>
            <div className="stat-label">Desktops Currently ON</div>
          </div>
        </div>

        <div ref={el => statsRef.current[2] = el} className="stat-card warning">
          <div className="stat-icon" style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
            <EyeOff size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{computerLabStats.monitorsOffCpuOn}</div>
            <div className="stat-label">Monitors OFF but CPU ON</div>
          </div>
        </div>

        <div ref={el => statsRef.current[3] = el} className="stat-card danger">
          <div className="stat-icon" style={{ backgroundColor: '#ef444420', color: '#ef4444' }}>
            <AlertTriangle size={28} />
          </div>
          <div className="stat-content">
            <div className="stat-value">{computerLabStats.estimatedWaste}</div>
            <div className="stat-label">Estimated Hidden Waste</div>
          </div>
        </div>
      </div>

      {computerLabStats.hiddenWasteDetected && (
        <div className="hidden-waste-alert">
          <AlertTriangle size={24} />
          <div className="alert-content">
            <h3>Hidden Waste Detected</h3>
            <p>
              System has detected {computerLabStats.monitorsOffCpuOn} desktop computers with monitors turned off
              but CPUs still actively consuming power. This is a common source of energy waste in computer labs.
            </p>
          </div>
        </div>
      )}

      <div className="explanation-card">
        <h2>How It Works</h2>
        <div className="explanation-content">
          <div className="explanation-item">
            <Cpu size={24} color="#3b82f6" />
            <div>
              <h3>Smart Plug Monitoring</h3>
              <p>
                Each computer is connected through a smart plug that monitors power consumption in real-time.
                The system can distinguish between idle, monitor-only, and full-system power states.
              </p>
            </div>
          </div>
          <div className="explanation-item">
            <Eye size={24} color="#10b981" />
            <div>
              <h3>Hidden Waste Detection</h3>
              <p>
                When a monitor is turned off but the CPU continues drawing significant power, the system flags
                it as "hidden waste" - energy consumption that users are unaware of.
              </p>
            </div>
          </div>
          <div className="explanation-item">
            <AlertTriangle size={24} color="#f59e0b" />
            <div>
              <h3>Automated Actions</h3>
              <p>
                When hidden waste is detected for an extended period, the system can automatically power down
                the CPU unit or send alerts to lab administrators for manual intervention.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="labs-section">
        <h2>Computer Labs Overview</h2>
        <div className="labs-grid">
          {computerLabs.map((lab, index) => (
            <div
              key={lab.id}
              ref={el => labsRef.current[index] = el}
              className="lab-card"
              onClick={() => navigate(`/room/${lab.id}`)}
            >
              <div className="lab-header">
                <h3>{lab.name}</h3>
                <span className={`status-badge ${lab.status === 'waste' ? 'status-waste' : 'status-efficient'}`}>
                  {lab.status === 'waste' ? 'Wasting Energy' : 'Efficient'}
                </span>
              </div>

              <div className="lab-stats">
                <div className="lab-stat-row">
                  <span className="lab-stat-label">Total Desktops:</span>
                  <span className="lab-stat-value">{lab.applianceStates.desktops.totalOn}</span>
                </div>
                <div className="lab-stat-row warning">
                  <span className="lab-stat-label">Monitors OFF:</span>
                  <span className="lab-stat-value">{lab.applianceStates.desktops.monitorsOff}</span>
                </div>
                <div className="lab-stat-row danger">
                  <span className="lab-stat-label">CPU Active (Hidden):</span>
                  <span className="lab-stat-value">{lab.applianceStates.desktops.cpuActive}</span>
                </div>
                <div className="lab-stat-row">
                  <span className="lab-stat-label">Occupancy:</span>
                  <span className="lab-stat-value">
                    {lab.occupancy > 0 ? `${lab.occupancy} users` : 'Empty'}
                  </span>
                </div>
              </div>

              <button className="view-lab-btn">View Lab Details →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComputerLab;
