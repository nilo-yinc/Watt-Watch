import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Activity, AlertTriangle, Zap, DollarSign, Eye, Lightbulb, Monitor, Fan } from 'lucide-react';
import { rooms } from '../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();
  const kpiRef = useRef([]);
  const cardsRef = useRef([]);

  const kpis = [
    {
      label: 'Total Rooms Monitored',
      value: rooms.length,
      icon: Activity,
      color: '#0ea5e9'
    },
    {
      label: 'Active Energy Waste Cases',
      value: rooms.filter(r => r.status === 'waste').length,
      icon: AlertTriangle,
      color: '#f59e0b'
    },
    {
      label: 'Energy Saved Today (kWh)',
      value: 189,
      icon: Zap,
      color: '#10b981'
    },
    {
      label: 'Estimated Cost Saved',
      value: 1847,
      prefix: '$',
      icon: DollarSign,
      color: '#06b6d4'
    }
  ];

  useEffect(() => {
    // Ensure all refs are populated
    const delay = setTimeout(() => {
      const kpiElements = kpiRef.current.filter(Boolean);
      const cardElements = cardsRef.current.filter(Boolean);
      
      if (kpiElements.length === 0 && cardElements.length === 0) return;

      const ctx = gsap.context(() => {
        if (kpiElements.length > 0) {
          gsap.from(kpiElements, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out'
          });

          kpiRef.current.forEach((el, index) => {
            if (el) {
              const valueElement = el.querySelector('.kpi-value');
              const targetValue = kpis[index].value;
              const obj = { value: 0 };

              gsap.to(obj, {
                value: targetValue,
                duration: 2,
                delay: 0.3 + index * 0.1,
                ease: 'power2.out',
                onUpdate: () => {
                  if (valueElement) valueElement.textContent = Math.round(obj.value);
                }
              });
            }
          });
        }

        if (cardElements.length > 0) {
          gsap.from(cardElements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.4,
            ease: 'power3.out'
          });
        }
      });

      return () => ctx.revert();
    }, 50);

    return () => clearTimeout(delay);
  }, [kpis]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'efficient': return '#10b981';
      case 'waste': return '#ef4444';
      case 'review': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'efficient': return 'Efficient';
      case 'waste': return 'Empty but Active';
      case 'review': return 'Needs Review';
      default: return 'Unknown';
    }
  };

  const getApplianceIcon = (appliance) => {
    switch (appliance) {
      case 'lights': return <Lightbulb size={18} />;
      case 'projector': return <Monitor size={18} />;
      case 'desktops': return <Monitor size={18} />;
      case 'fan': return <Fan size={18} />;
      case 'ac': return <Fan size={18} />;
      default: return <Zap size={18} />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Campus Overview</h1>
        <div className="simulation-banner">
          ⚠️ All data shown is simulated for prototype demonstration
        </div>
      </div>

      <div className="kpi-grid">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              ref={el => kpiRef.current[index] = el}
              className="kpi-card"
            >
              <div className="kpi-icon" style={{ backgroundColor: `${kpi.color}20`, color: kpi.color }}>
                <Icon size={24} />
              </div>
              <div className="kpi-content">
                <div className="kpi-value-wrapper">
                  {kpi.prefix && <span className="kpi-prefix">{kpi.prefix}</span>}
                  <span className="kpi-value">{kpi.value}</span>
                </div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rooms-section">
        <h2>Room Status</h2>
        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              ref={el => cardsRef.current[index] = el}
              className="room-card"
              onClick={() => navigate(`/room/${room.id}`)}
            >
              <div className="room-header">
                <div>
                  <h3>{room.name}</h3>
                  <p className="room-type">{room.type}</p>
                </div>
                <div
                  className="status-badge"
                  style={{ backgroundColor: `${getStatusColor(room.status)}20`, color: getStatusColor(room.status) }}
                >
                  {getStatusLabel(room.status)}
                </div>
              </div>

              <div className="room-details">
                <div className="detail-row">
                  <span className="detail-label">Monitoring:</span>
                  <span className="detail-value">{room.monitoringMethod}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Occupancy:</span>
                  <span className="detail-value">
                    {room.occupancy > 0 ? `${room.occupancy} people` : 'Empty'}
                  </span>
                </div>
              </div>

              <div className="appliances-row">
                <span className="appliances-label">Active:</span>
                <div className="appliances-icons">
                  {room.activeAppliances.map((appliance, idx) => (
                    <span key={idx} className="appliance-icon" title={appliance}>
                      {getApplianceIcon(appliance)}
                    </span>
                  ))}
                </div>
              </div>

              <button className="view-details-btn">
                View Details <Eye size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
