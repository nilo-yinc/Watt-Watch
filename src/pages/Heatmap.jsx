import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Calendar, MapPin } from 'lucide-react';
import { rooms } from '../data/mockData';

const Heatmap = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('today');
  const gridRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)'
      });
    });

    return () => ctx.revert();
  }, [timeFilter]);

  const getHeatmapColor = (status) => {
    switch (status) {
      case 'efficient':
        return {
          bg: '#10b981',
          label: 'Efficient',
          intensity: 'low'
        };
      case 'waste':
        return {
          bg: '#ef4444',
          label: 'High Waste',
          intensity: 'high'
        };
      case 'review':
        return {
          bg: '#f59e0b',
          label: 'Review',
          intensity: 'medium'
        };
      default:
        return {
          bg: '#6b7280',
          label: 'Unknown',
          intensity: 'none'
        };
    }
  };

  const groupedRooms = rooms.reduce((acc, room) => {
    if (!acc[room.type]) {
      acc[room.type] = [];
    }
    acc[room.type].push(room);
    return acc;
  }, {});

  return (
    <div className="heatmap-container">
      <div className="heatmap-header">
        <div>
          <h1>Campus Energy Heatmap</h1>
          <p className="heatmap-description">
            Visual representation of energy efficiency across campus
          </p>
        </div>

        <div className="time-filter">
          <Calendar size={18} />
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

      <div className="heatmap-legend">
        <h3>Legend:</h3>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
            <span>Efficient</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
            <span>Needs Review</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
            <span>High Waste</span>
          </div>
        </div>
      </div>

      <div className="heatmap-content">
        {Object.entries(groupedRooms).map(([type, typeRooms]) => (
          <div key={type} className="room-type-section">
            <h2 className="room-type-title">
              <MapPin size={20} />
              {type}s
            </h2>
            <div className="heatmap-grid">
              {typeRooms.map((room, index) => {
                const heatData = getHeatmapColor(room.status);
                return (
                  <div
                    key={room.id}
                    ref={el => gridRef.current.push(el)}
                    className="heatmap-cell"
                    style={{
                      backgroundColor: heatData.bg,
                      opacity: heatData.intensity === 'high' ? 1 : heatData.intensity === 'medium' ? 0.8 : 0.6
                    }}
                    onClick={() => navigate(`/room/${room.id}`)}
                  >
                    <div className="cell-content">
                      <span className="cell-name">{room.name}</span>
                      <span className="cell-status">{heatData.label}</span>
                      {room.occupancy > 0 && (
                        <span className="cell-occupancy">{room.occupancy} people</span>
                      )}
                      {room.occupancy === 0 && room.status === 'waste' && (
                        <span className="cell-warning">Empty but Active</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="heatmap-summary">
        <div className="summary-card">
          <h3>Current Status Summary</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <div className="summary-stat-value" style={{ color: '#10b981' }}>
                {rooms.filter(r => r.status === 'efficient').length}
              </div>
              <div className="summary-stat-label">Efficient Rooms</div>
            </div>
            <div className="summary-stat">
              <div className="summary-stat-value" style={{ color: '#f59e0b' }}>
                {rooms.filter(r => r.status === 'review').length}
              </div>
              <div className="summary-stat-label">Need Review</div>
            </div>
            <div className="summary-stat">
              <div className="summary-stat-value" style={{ color: '#ef4444' }}>
                {rooms.filter(r => r.status === 'waste').length}
              </div>
              <div className="summary-stat-label">High Waste</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
