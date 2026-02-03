import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Settings,
  Clock,
  Power,
  Bell,
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
  const [units, setUnits] = useState({
    emptyRoomThreshold: 'minutes',
    lightOffDelay: 'minutes',
    acOffDelay: 'minutes',
    scheduleBuffer: 'minutes'
  });
  const [saved, setSaved] = useState(false);
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
    <div className="rules-page" ref={pageRef}>
      <div className="page-header">
        <h1>
          <Settings size={28} />
          Configuration & Rules
        </h1>
        <p className="header-description">
          Customize automation rules and system behavior
        </p>
      </div>

      {/* Explanation Section */}
      <div className="explanation-card" ref={el => cardsRef.current[0] = el}>
        <div className="explanation-icon">
          <Info size={24} />
        </div>
        <div className="explanation-content">
          <h3>How Rules Work</h3>
          <p>
            These configurable rules determine how Watt-Watch responds to energy waste scenarios.
            Adjust thresholds and modes based on your campus operational requirements.
            All changes are simulated for this prototype.
          </p>
        </div>
      </div>

      {/* Rules Grid */}
      <div className="rules-grid">
        {/* Time-Based Thresholds */}
        <div className="rule-section" ref={el => cardsRef.current[1] = el}>
          <div className="section-header">
            <Clock size={24} />
            <h2>Time-Based Thresholds</h2>
          </div>
          
          <div className="rule-item">
            <div className="rule-label">
              <span className="rule-name">Empty Room Detection</span>
              <span className="rule-unit">{rules.emptyRoomThreshold} minutes</span>
            </div>
            <input
              type="range"
              min="5"
              max="120"
              value={rules.emptyRoomThreshold}
              onChange={(e) => handleChange('emptyRoomThreshold', e.target.value)}
              className="rule-slider"
            />
            <p className="rule-description">
              Time to wait after room becomes empty before triggering action
            </p>
          </div>

          <div className="rule-item">
            <div className="rule-label">
              <span className="rule-name">Light Auto-Off Delay</span>
              <span className="rule-unit">{rules.lightOffDelay} minutes</span>
            </div>
            <input
              type="range"
              min="5"
              max="60"
              value={rules.lightOffDelay}
              onChange={(e) => handleChange('lightOffDelay', e.target.value)}
              className="rule-slider"
            />
            <p className="rule-description">
              Minutes after occupancy detection before lights are turned off
            </p>
          </div>

          <div className="rule-item">
            <div className="rule-label">
              <span className="rule-name">AC Auto-Off Delay</span>
              <span className="rule-unit">{rules.acOffDelay} minutes</span>
            </div>
            <input
              type="range"
              min="5"
              max="90"
              value={rules.acOffDelay}
              onChange={(e) => handleChange('acOffDelay', e.target.value)}
              className="rule-slider"
            />
            <p className="rule-description">
              Minutes after occupancy detection before AC is turned off
            </p>
          </div>
        </div>

        {/* Automation Modes */}
        <div className="rule-section" ref={el => cardsRef.current[2] = el}>
          <div className="section-header">
            <Power size={24} />
            <h2>Automation Modes</h2>
          </div>

          <div className="rule-toggle-item">
            <div className="toggle-content">
              <h3>Auto Action Mode</h3>
              <p>Automatically cut power when waste is detected</p>
            </div>
            <button
              className={`toggle-switch ${rules.autoActionMode === 'auto' ? 'active' : ''}`}
              onClick={() => handleChange('autoActionMode', rules.autoActionMode === 'auto' ? 'manual' : 'auto')}
            >
              {rules.autoActionMode === 'auto' ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
            </button>
          </div>
        </div>

        {/* Computer Lab Settings */}
        <div className="rule-section" ref={el => cardsRef.current[3] = el}>
          <div className="section-header">
            <Zap size={24} />
            <h2>Computer Lab Intelligence</h2>
          </div>

          <div className="rule-toggle-item">
            <div className="toggle-content">
              <h3>Hidden Waste Detection</h3>
              <p>Monitor for CPUs active when monitors are OFF</p>
            </div>
            <button
              className={`toggle-switch ${rules.computerLabSettings.hiddenWasteThreshold > 0 ? 'active' : ''}`}
              onClick={() => handleNestedChange('computerLabSettings', 'hiddenWasteThreshold', 
                rules.computerLabSettings.hiddenWasteThreshold > 0 ? 0 : 10)}
            >
              {rules.computerLabSettings.hiddenWasteThreshold > 0 ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
            </button>
          </div>

          <div className="rule-toggle-item">
            <div className="toggle-content">
              <h3>CPU Activity Monitoring</h3>
              <p>Track processor load and idle time</p>
            </div>
            <button
              className={`toggle-switch ${rules.computerLabSettings.cpuActivityMonitoring ? 'active' : ''}`}
              onClick={() => handleNestedToggle('computerLabSettings', 'cpuActivityMonitoring')}
            >
              {rules.computerLabSettings.cpuActivityMonitoring ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
            </button>
          </div>

          <div className="rule-toggle-item">
            <div className="toggle-content">
              <h3>Monitor OFF Alert</h3>
              <p>Alert when monitors are off but CPUs active</p>
            </div>
            <button
              className={`toggle-switch ${rules.computerLabSettings.monitorOffAlert ? 'active' : ''}`}
              onClick={() => handleNestedToggle('computerLabSettings', 'monitorOffAlert')}
            >
              {rules.computerLabSettings.monitorOffAlert ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
            </button>
          </div>
        </div>

        {/* Schedule Settings */}
        <div className="rule-section" ref={el => cardsRef.current[4] = el}>
          <div className="section-header">
            <Clock size={24} />
            <h2>Schedule Buffer</h2>
          </div>

          <div className="rule-item">
            <div className="rule-label">
              <span className="rule-name">Buffer Before Off Hours</span>
              <span className="rule-unit">{rules.scheduleBuffer} minutes</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              value={rules.scheduleBuffer}
              onChange={(e) => handleChange('scheduleBuffer', e.target.value)}
              className="rule-slider"
            />
            <p className="rule-description">
              Minutes before scheduled off-time to prepare for shutdown
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="rules-actions" ref={el => cardsRef.current[5] = el}>
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

      {/* Info Card */}
      <div className="rules-info" ref={el => cardsRef.current[6] = el}>
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
  );
};

export default Rules;
