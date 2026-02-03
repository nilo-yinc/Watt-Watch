import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Settings, Clock, Power, Bell, Moon, Info } from 'lucide-react';
import { configRules } from '../data/mockData';

const Configuration = () => {
  const [rules, setRules] = useState(configRules);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const handleToggle = (key) => {
    setRules(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleThresholdChange = (value) => {
    setRules(prev => ({
      ...prev,
      emptyRoomThreshold: parseInt(value)
    }));
  };

  return (
    <div className="configuration-container">
      <div className="configuration-header">
        <div>
          <h1>Rule Configuration</h1>
          <p className="config-description">
            Configure system behavior and automation rules
          </p>
        </div>
        <div className="config-info">
          <Info size={18} />
          <span>Rules shown are configurable in real deployment</span>
        </div>
      </div>

      <div className="config-grid">
        <div ref={el => cardsRef.current[0] = el} className="config-card">
          <div className="config-card-header">
            <div className="config-icon" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
              <Clock size={24} />
            </div>
            <h2>Empty Room Threshold</h2>
          </div>
          <p className="config-description-text">
            Time duration before an empty room triggers an alert or action
          </p>
          <div className="config-control">
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={rules.emptyRoomThreshold}
              onChange={(e) => handleThresholdChange(e.target.value)}
              className="threshold-slider"
            />
            <div className="threshold-display">
              <span className="threshold-value">{rules.emptyRoomThreshold}</span>
              <span className="threshold-unit">minutes</span>
            </div>
          </div>
          <div className="config-helper">
            System will wait {rules.emptyRoomThreshold} minutes after detecting an empty room before taking action
          </div>
        </div>

        <div ref={el => cardsRef.current[1] = el} className="config-card">
          <div className="config-card-header">
            <div className="config-icon" style={{ backgroundColor: '#10b98120', color: '#10b981' }}>
              <Power size={24} />
            </div>
            <h2>Auto Power Cut</h2>
          </div>
          <p className="config-description-text">
            Automatically cut power to appliances when waste is detected
          </p>
          <div className="config-control">
            <button
              className={`toggle-button ${rules.autoActionEnabled ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => handleToggle('autoActionEnabled')}
            >
              <div className="toggle-slider"></div>
            </button>
            <span className="toggle-label">
              {rules.autoActionEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="config-helper">
            {rules.autoActionEnabled
              ? 'System will automatically trigger IoT relays to cut power'
              : 'System will only send alerts without taking automatic actions'}
          </div>
        </div>

        <div ref={el => cardsRef.current[2] = el} className="config-card">
          <div className="config-card-header">
            <div className="config-icon" style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
              <Bell size={24} />
            </div>
            <h2>Alert Only Mode</h2>
          </div>
          <p className="config-description-text">
            Send notifications instead of taking automated actions
          </p>
          <div className="config-control">
            <button
              className={`toggle-button ${rules.alertOnlyMode ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => handleToggle('alertOnlyMode')}
            >
              <div className="toggle-slider"></div>
            </button>
            <span className="toggle-label">
              {rules.alertOnlyMode ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="config-helper">
            {rules.alertOnlyMode
              ? 'Admins will receive alerts for manual intervention'
              : 'System can take automated actions based on rules'}
          </div>
        </div>

        <div ref={el => cardsRef.current[3] = el} className="config-card">
          <div className="config-card-header">
            <div className="config-icon" style={{ backgroundColor: '#ef444420', color: '#ef4444' }}>
              <Settings size={24} />
            </div>
            <h2>Hidden Waste Detection</h2>
          </div>
          <p className="config-description-text">
            Detect computers with monitors off but CPUs still active
          </p>
          <div className="config-control">
            <button
              className={`toggle-button ${rules.hiddenWasteDetection ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => handleToggle('hiddenWasteDetection')}
            >
              <div className="toggle-slider"></div>
            </button>
            <span className="toggle-label">
              {rules.hiddenWasteDetection ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="config-helper">
            {rules.hiddenWasteDetection
              ? 'Monitoring computer labs for hidden energy waste'
              : 'Hidden waste detection is disabled'}
          </div>
        </div>

        <div ref={el => cardsRef.current[4] = el} className="config-card wide">
          <div className="config-card-header">
            <div className="config-icon" style={{ backgroundColor: '#0f172a20', color: '#0f172a' }}>
              <Moon size={24} />
            </div>
            <h2>Night Mode Schedule</h2>
          </div>
          <p className="config-description-text">
            More aggressive power management during night hours
          </p>
          <div className="config-control time-range">
            <div className="time-input-group">
              <label>Start Time:</label>
              <input
                type="time"
                value={rules.nightModeStart}
                onChange={(e) => setRules(prev => ({ ...prev, nightModeStart: e.target.value }))}
                className="time-input"
              />
            </div>
            <div className="time-input-group">
              <label>End Time:</label>
              <input
                type="time"
                value={rules.nightModeEnd}
                onChange={(e) => setRules(prev => ({ ...prev, nightModeEnd: e.target.value }))}
                className="time-input"
              />
            </div>
          </div>
          <div className="config-helper">
            During night mode ({rules.nightModeStart} - {rules.nightModeEnd}), the system uses more aggressive
            energy-saving rules and shorter wait times
          </div>
        </div>
      </div>

      <div className="config-footer">
        <div className="config-note">
          <Info size={20} />
          <div>
            <h3>About Configuration</h3>
            <p>
              These configuration options demonstrate the flexibility of the Watt-Watch system.
              In real deployment, these rules can be customized per building, floor, or room type
              to match specific operational requirements and policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
