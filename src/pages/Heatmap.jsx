import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Thermometer, Calendar, Zap, Users } from 'lucide-react';
import { roomsData } from '../data/mockData';

const Heatmap = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('today');
  const pageRef = useRef(null);
  const cellRefs = useRef([]);

  useEffect(() => {
    // Page animation
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // Grid cell animations
    cellRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.3, delay: 0.2 + index * 0.05, ease: 'back.out(1.7)' }
        );
      }
    });
  }, [timeFilter]);

  const getEfficiencyStatus = (room) => {
    // Calculate efficiency based on energy usage and occupancy
    if (room.occupancy === 0 && room.energyUsageToday > 1.5) {
      return { status: 'waste', label: 'High Waste', color: '#ef4444' };
    }
    if (room.potentialSavings > 2) {
      return { status: 'review', label: 'Review Needed', color: '#f59e0b' };
    }
    return { status: 'efficient', label: 'Efficient', color: '#10b981' };
  };

  const stats = {
    efficient: roomsData.filter(r => getEfficiencyStatus(r).status === 'efficient').length,
    review: roomsData.filter(r => getEfficiencyStatus(r).status === 'review').length,
    waste: roomsData.filter(r => getEfficiencyStatus(r).status === 'waste').length
  };

  return (
    <div className="heatmap-container" ref={pageRef}>
      <div className="heatmap-header">
        <div>
          <h1>
            <Thermometer size={28} />
            Energy Heatmap
          </h1>
          <p className="heatmap-description">
            Visual map of energy efficiency across all monitored spaces
          </p>
        </div>
        <div className="time-filter">
          <Calendar size={16} />
          <button
            className={`filter-btn ${timeFilter === 'today' ? 'active' : ''}`}
            onClick={() => setTimeFilter('today')}
          >
            Today
          </button>
          <button
            className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
            onClick={() => setTimeFilter('week')}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="heatmap-legend">
        <h3>Legend</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
            <span>Efficient</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>Review Needed</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
            <span>High Waste</span>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="heatmap-grid">
        {roomsData.map((room, index) => {
          const efficiency = getEfficiencyStatus(room);
          return (
            <div
              key={room.id}
              ref={el => cellRefs.current[index] = el}
              className="heatmap-cell"
              style={{ backgroundColor: efficiency.color }}
              onClick={() => navigate(`/room/${room.id}`)}
              title={`${room.name} - ${efficiency.label}`}
            >
              <div className="cell-content">
                <span className="cell-name">{room.name}</span>
                <span className="cell-status">{efficiency.label}</span>
                <span className="cell-occupancy">
                  <Zap size={12} /> {room.energyUsageToday.toFixed(1)} kWh
                </span>
                {room.occupancy > 0 && (
                  <span className="cell-occupancy">
                    <Users size={12} /> {room.occupancy} people
                  </span>
                )}
                {room.occupancy === 0 && efficiency.status === 'waste' && (
                  <span className="cell-warning">Empty</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Statistics Summary */}
      <div className="heatmap-summary">
        <div className="summary-card">
          <h3>Summary</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <div className="summary-stat-value" style={{ color: '#10b981' }}>{stats.efficient}</div>
              <div className="summary-stat-label">Efficient Rooms</div>
            </div>
            <div className="summary-stat">
              <div className="summary-stat-value" style={{ color: '#f59e0b' }}>{stats.review}</div>
              <div className="summary-stat-label">Need Review</div>
            </div>
            <div className="summary-stat">
              <div className="summary-stat-value" style={{ color: '#ef4444' }}>{stats.waste}</div>
              <div className="summary-stat-label">High Waste</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
