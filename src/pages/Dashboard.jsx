import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { 
  Building2, 
  AlertTriangle, 
  Zap, 
  DollarSign,
  Lightbulb,
  Monitor,
  Thermometer,
  Fan,
  Tv,
  Users,
  ArrowRight,
  Info,
  Camera,
  Plug,
  Radio,
  Calendar,
  Wind
} from 'lucide-react';
import { roomsData, dashboardKPIs } from '../data/mockData';

const Dashboard = () => {
  const kpiRefs = useRef([]);
  const roomCardsRef = useRef([]);
  const bannerRef = useRef(null);

  useEffect(() => {
    // Animate banner
    gsap.fromTo(bannerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    // Animate KPI cards with counter
    kpiRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: index * 0.1, ease: 'power2.out' }
        );
      }
    });

    // Animate numbers
    animateCounter('rooms-count', dashboardKPIs.totalRooms);
    animateCounter('waste-count', dashboardKPIs.activeWasteCases);
    animateCounter('energy-count', dashboardKPIs.energySavedToday, 1);
    animateCounter('cost-count', dashboardKPIs.estimatedCostSaved, 2);

    // Animate room cards
    roomCardsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.4 + index * 0.05, ease: 'power2.out' }
        );
      }
    });
  }, []);

  const animateCounter = (id, target, decimals = 0) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(
        { value: 0 },
        {
          value: target,
          duration: 2,
          delay: 0.5,
          ease: 'power2.out',
          onUpdate: function() {
            element.textContent = this.targets()[0].value.toFixed(decimals);
          }
        }
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'efficient': return 'status-green';
      case 'waste': return 'status-red';
      case 'review': return 'status-yellow';
      default: return 'status-grey';
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

  const getMonitoringIcon = (method) => {
    switch (method) {
      case 'Camera': return <Camera size={14} />;
      case 'Smart Plug': return <Plug size={14} />;
      case 'Sensor': return <Radio size={14} />;
      case 'Schedule': return <Calendar size={14} />;
      default: return <Zap size={14} />;
    }
  };

  const getApplianceIcon = (type) => {
    switch (type) {
      case 'lights': return <Lightbulb size={16} />;
      case 'projector': 
      case 'desktops':
      case 'computers': return <Monitor size={16} />;
      case 'ac': return <Thermometer size={16} />;
      case 'fans': return <Fan size={16} />;
      case 'tv': return <Tv size={16} />;
      case 'equipment': return <Monitor size={16} />;
      case 'fume_hood': return <Wind size={16} />;
      default: return <Zap size={16} />;
    }
  };

  const handleCardHover = (ref, isEnter) => {
    if (ref) {
      gsap.to(ref, {
        y: isEnter ? -8 : 0,
        boxShadow: isEnter 
          ? '0 20px 40px rgba(0, 0, 0, 0.12)' 
          : '0 4px 15px rgba(0, 0, 0, 0.08)',
        duration: 0.3,
        ease: 'power2.out'
      });
    }
  };

  return (
    <div className="dashboard-page">
      {/* Simulation Banner */}
      <div className="simulation-banner" ref={bannerRef}>
        <Info size={18} />
        <span>All data shown is simulated for prototype demonstration. No real IoT hardware connected.</span>
      </div>

      {/* KPI Section */}
      <section className="kpi-section">
        <h2 className="section-title">Campus Overview</h2>
        <div className="kpi-grid">
          <div 
            className="kpi-card kpi-blue"
            ref={el => kpiRefs.current[0] = el}
          >
            <div className="kpi-icon">
              <Building2 size={24} />
            </div>
            <div className="kpi-content">
              <span className="kpi-value" id="rooms-count">0</span>
              <span className="kpi-label">Total Rooms Monitored</span>
            </div>
          </div>

          <div 
            className="kpi-card kpi-red"
            ref={el => kpiRefs.current[1] = el}
          >
            <div className="kpi-icon">
              <AlertTriangle size={24} />
            </div>
            <div className="kpi-content">
              <span className="kpi-value" id="waste-count">0</span>
              <span className="kpi-label">Active Energy Waste Cases</span>
            </div>
          </div>

          <div 
            className="kpi-card kpi-green"
            ref={el => kpiRefs.current[2] = el}
          >
            <div className="kpi-icon">
              <Zap size={24} />
            </div>
            <div className="kpi-content">
              <span className="kpi-value">
                <span id="energy-count">0</span>
                <span className="kpi-unit">kWh</span>
              </span>
              <span className="kpi-label">Energy Saved Today</span>
            </div>
          </div>

          <div 
            className="kpi-card kpi-orange"
            ref={el => kpiRefs.current[3] = el}
          >
            <div className="kpi-icon">
              <DollarSign size={24} />
            </div>
            <div className="kpi-content">
              <span className="kpi-value">
                ₹<span id="cost-count">0</span>
              </span>
              <span className="kpi-label">Estimated Cost Saved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="rooms-section">
        <h2 className="section-title">Room Status Overview</h2>
        <div className="rooms-grid">
          {roomsData.map((room, index) => (
            <div
              key={room.id}
              className="room-card"
              ref={el => roomCardsRef.current[index] = el}
              onMouseEnter={() => handleCardHover(roomCardsRef.current[index], true)}
              onMouseLeave={() => handleCardHover(roomCardsRef.current[index], false)}
            >
              <div className="room-header">
                <div className="room-info">
                  <h3 className="room-name">{room.name}</h3>
                  <span className="room-type">{room.type}</span>
                </div>
                <span className={`status-badge ${getStatusColor(room.status)}`}>
                  {getStatusLabel(room.status)}
                </span>
              </div>

              <div className="room-monitoring">
                <span className="monitoring-label">
                  {getMonitoringIcon(room.monitoringMethod)}
                  {room.monitoringMethod}
                </span>
              </div>

              <div className="room-details">
                <div className="detail-item">
                  <Users size={16} />
                  <span>{room.occupancy > 0 ? `${room.occupancy} people` : 'Empty'}</span>
                </div>
                <div className="detail-item">
                  <Zap size={16} />
                  <span>{room.energyUsageToday} kWh</span>
                </div>
              </div>

              <div className="appliances">
                <span className="appliances-label">Active appliances:</span>
                <div className="appliances-list">
                  {Object.entries(room.appliances).map(([key, value]) => (
                    value.status && (
                      <span key={key} className="appliance-badge" title={key}>
                        {getApplianceIcon(key)}
                      </span>
                    )
                  ))}
                </div>
              </div>

              <Link to={`/room/${room.id}`} className="view-details-btn">
                View Details <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
