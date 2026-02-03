import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Thermometer, Calendar, Zap, Users, Activity } from 'lucide-react';
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
    <div className="heatmap-page" ref={pageRef}>
      <div className="page-header">
        <h1>
          <Thermometer size={28} />
          Energy Heatmap
        </h1>
        <p className="header-description">
          Visual map of energy efficiency across all monitored spaces
        </p>
      </div>

      {/* Time Filter */}
      <div className="heatmap-controls">
        <div className="filter-group">
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

      {/* Heatmap Grid */}
      <div className="heatmap-grid-container">
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
                <div className="cell-inner">
                  <div className="cell-name">{room.name}</div>
                  <div className="cell-status">{efficiency.label}</div>
                  <div className="cell-meta">
                    <span className="meta-item">
                      <Zap size={12} />
                      {room.energyUsageToday.toFixed(1)}kWh
                    </span>
                    {room.occupancy > 0 && (
                      <span className="meta-item">
                        <Users size={12} />
                        {room.occupancy}
                      </span>
                    )}
                  </div>
                  {room.occupancy === 0 && efficiency.status === 'waste' && (
                    <div className="cell-alert">Empty</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Statistics Summary */}
      <div className="heatmap-stats">
        <div className="stat-card stat-green">
          <Activity size={24} />
          <div className="stat-content">
            <div className="stat-value">{stats.efficient}</div>
            <div className="stat-label">Efficient Rooms</div>
          </div>
        </div>
        <div className="stat-card stat-yellow">
          <Activity size={24} />
          <div className="stat-content">
            <div className="stat-value">{stats.review}</div>
            <div className="stat-label">Need Review</div>
          </div>
        </div>
        <div className="stat-card stat-red">
          <Activity size={24} />
          <div className="stat-content">
            <div className="stat-value">{stats.waste}</div>
            <div className="stat-label">High Waste</div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="heatmap-info">
        <h3>About Energy Heatmap</h3>
        <p>
          Click any room to view detailed energy data and monitoring information. Rooms are color-coded
          based on current energy efficiency. Green indicates efficient operation, yellow shows rooms
          that need attention, and red flags areas with significant waste (empty rooms consuming energy).
        </p>
      </div>
    </div>
  );
};

export default Heatmap;
