import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Settings,
  Clock,
  Power,
  Zap,
  Save,
  RotateCcw,
  Info,
  CheckCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { defaultRules } from '../data/mockData';

const Rules = () => {
  const [rules, setRules] = useState(defaultRules);
  const [saved, setSaved] = useState(false);
  const [timeUnits, setTimeUnits] = useState({
    emptyRoomThreshold: 'minutes',
    lightOffDelay: 'minutes',
    acOffDelay: 'minutes',
    scheduleBuffer: 'minutes'
  });
  const pageRef = useRef(null);
  const cardsRef = useRef([]);

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
          { opacity: 1, y: 0, duration: 0.4, delay: index * 0.1, ease: 'power2.out' }
        );
      }
    });
  }, []);

  const handleToggle = (key) => {
    setRules(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
    setSaved(false);
  };

  const handleNestedToggle = (parent, key) => {
    setRules(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: !prev[parent][key]
      }
    }));
    setSaved(false);
  };

  const handleChange = (key, value) => {
    setRules(prev => ({
      ...prev,
      [key]: isNaN(value) ? value : parseInt(value)
    }));
    setSaved(false);
  };

  const handleNestedChange = (parent, key, value) => {
    setRules(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: isNaN(value) ? value : parseInt(value)
      }
    }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setRules(defaultRules);
    setSaved(false);
  };

  return (
    <div className="configuration-container" ref={pageRef}>
      <div className="configuration-header">
        <div>
          <h1>
            <Settings size={28} />
            Configuration & Rules
          </h1>
          <p className="config-description">
            Customize automation rules and system behavior
          </p>
        </div>
        <div className="config-info">
          <Info size={16} />
          All changes are simulated for this prototype.
        </div>
      </div>

      <div className="config-grid">
        <div className="config-card" ref={el => cardsRef.current[0] = el}>
          <div className="config-card-header">
            <div className="config-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}>
              <Clock size={20} />
            </div>
            <h2>Time-Based Thresholds</h2>
          </div>
          <p className="config-description-text">Adjust how long the system waits before acting on inactivity.</p>

          <label className="toggle-label">Empty Room Detection</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <input
              type="range"
              min="5"
              max="120"
              value={rules.emptyRoomThreshold}
              onChange={(e) => handleChange('emptyRoomThreshold', e.target.value)}
              className="threshold-slider"
              style={{ flex: 1 }}
            />
            <select
              value={timeUnits.emptyRoomThreshold}
              onChange={(e) => setTimeUnits({...timeUnits, emptyRoomThreshold: e.target.value})}
              className="time-unit-select"
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', minWidth: '90px' }}
            >
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
            </select>
          </div>
          <div className="threshold-display">
            <span className="threshold-value">{rules.emptyRoomThreshold}</span>
            <span className="threshold-unit">{timeUnits.emptyRoomThreshold}</span>
          </div>
          <div className="config-helper">
            Time to wait after room becomes empty before triggering action.
          </div>

          <label className="toggle-label">Light Auto-Off Delay</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <input
              type="range"
              min="5"
              max="60"
              value={rules.lightOffDelay}
              onChange={(e) => handleChange('lightOffDelay', e.target.value)}
              className="threshold-slider"
              style={{ flex: 1 }}
            />
            <select
              value={timeUnits.lightOffDelay}
              onChange={(e) => setTimeUnits({...timeUnits, lightOffDelay: e.target.value})}
              className="time-unit-select"
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', minWidth: '90px' }}
            >
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
            </select>
          </div>
          <div className="threshold-display">
            <span className="threshold-value">{rules.lightOffDelay}</span>
            <span className="threshold-unit">{timeUnits.lightOffDelay}</span>
          </div>
          <div className="config-helper">
            Minutes after occupancy detection before lights are turned off.
          </div>

          <label className="toggle-label">AC Auto-Off Delay</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <input
              type="range"
              min="5"
              max="90"
              value={rules.acOffDelay}
              onChange={(e) => handleChange('acOffDelay', e.target.value)}
              className="threshold-slider"
              style={{ flex: 1 }}
            />
            <select
              value={timeUnits.acOffDelay}
              onChange={(e) => setTimeUnits({...timeUnits, acOffDelay: e.target.value})}
              className="time-unit-select"
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', minWidth: '90px' }}
            >
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
            </select>
          </div>
          <div className="threshold-display">
            <span className="threshold-value">{rules.acOffDelay}</span>
            <span className="threshold-unit">{timeUnits.acOffDelay}</span>
          </div>
          <div className="config-helper">
            Minutes after occupancy detection before AC is turned off.
          </div>
        </div>

        <div className="config-card" ref={el => cardsRef.current[1] = el}>
          <div className="config-card-header">
            <div className="config-icon" style={{ background: '#fef3c7', color: '#92400e' }}>
              <Power size={20} />
            </div>
            <h2>Automation Modes</h2>
          </div>
          <p className="config-description-text">Control whether the system acts automatically or requires approval.</p>
          <div className="config-control">
            <span className="toggle-label">Auto Action Mode</span>
            <button
              className={`toggle-button ${rules.autoActionMode === 'auto' ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => handleChange('autoActionMode', rules.autoActionMode === 'auto' ? 'manual' : 'auto')}
            >
              {rules.autoActionMode === 'auto' ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
              {rules.autoActionMode === 'auto' ? 'AUTO' : 'MANUAL'}
            </button>
          </div>
        </div>

        <div className="config-card" ref={el => cardsRef.current[2] = el}>
          <div className="config-card-header">
            <div className="config-icon" style={{ background: '#dcfce7', color: '#166534' }}>
              <Zap size={20} />
            </div>
            <h2>Computer Lab Intelligence</h2>
          </div>
          <p className="config-description-text">Detect hidden waste and keep labs efficient.</p>

          <div className="config-control">
            <span className="toggle-label">Hidden Waste Detection</span>
            <button
              className={`toggle-button ${rules.computerLabSettings.hiddenWasteThreshold > 0 ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => handleNestedChange('computerLabSettings', 'hiddenWasteThreshold', rules.computerLabSettings.hiddenWasteThreshold > 0 ? 0 : 10)}
            >
              {rules.computerLabSettings.hiddenWasteThreshold > 0 ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
              {rules.computerLabSettings.hiddenWasteThreshold > 0 ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="config-control">
            <span className="toggle-label">CPU Activity Monitoring</span>
            <button
              className={`toggle-button ${rules.computerLabSettings.cpuActivityMonitoring ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => handleNestedToggle('computerLabSettings', 'cpuActivityMonitoring')}
            >
              {rules.computerLabSettings.cpuActivityMonitoring ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
              {rules.computerLabSettings.cpuActivityMonitoring ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="config-control">
            <span className="toggle-label">Monitor OFF Alert</span>
            <button
              className={`toggle-button ${rules.computerLabSettings.monitorOffAlert ? 'toggle-on' : 'toggle-off'}`}
              onClick={() => handleNestedToggle('computerLabSettings', 'monitorOffAlert')}
            >
              {rules.computerLabSettings.monitorOffAlert ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
              {rules.computerLabSettings.monitorOffAlert ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        <div className="config-card" ref={el => cardsRef.current[3] = el}>
          <div className="config-card-header">
            <div className="config-icon" style={{ background: '#e2e8f0', color: '#475569' }}>
              <Clock size={20} />
            </div>
            <h2>Schedule Buffer</h2>
          </div>
          <p className="config-description-text">Prepare for scheduled shutdowns.</p>
          <label className="toggle-label">Buffer Before Off Hours</label>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
            <input
              type="range"
              min="0"
              max="60"
              value={rules.scheduleBuffer}
              onChange={(e) => handleChange('scheduleBuffer', e.target.value)}
              className="threshold-slider"
              style={{ flex: 1 }}
            />
            <select
              value={timeUnits.scheduleBuffer}
              onChange={(e) => setTimeUnits({...timeUnits, scheduleBuffer: e.target.value})}
              className="time-unit-select"
              style={{ padding: '8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '12px', minWidth: '90px' }}
            >
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
            </select>
          </div>
          <div className="threshold-display">
            <span className="threshold-value">{rules.scheduleBuffer}</span>
            <span className="threshold-unit">{timeUnits.scheduleBuffer}</span>
          </div>
          <div className="config-helper">
            Minutes before scheduled off-time to prepare for shutdown.
          </div>
        </div>
      </div>

      <div className="config-footer" ref={el => cardsRef.current[4] = el}>
        <div className="config-control">
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={18} />
            Save Rules
          </button>
          <button className="btn btn-secondary" onClick={handleReset}>
            <RotateCcw size={18} />
            Reset to Default
          </button>
          {saved && (
            <div className="save-confirmation">
              <CheckCircle size={18} />
              <span>Rules saved successfully</span>
            </div>
          )}
        </div>
      </div>

      <div className="config-footer" ref={el => cardsRef.current[5] = el}>
        <div className="config-note">
          <Info size={20} />
          <div>
            <h3>Pro Tip</h3>
            <p>
              Different room types may benefit from different rule configurations.
              Computer labs might need more aggressive hidden waste detection,
              while offices could use schedule-based automation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rules;
