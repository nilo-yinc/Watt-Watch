import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TrendingUp, Leaf, DollarSign, BarChart3 } from 'lucide-react';
import { analyticsData } from '../data/mockData';

const Analytics = () => {
  const kpiRef = useRef([]);
  const chartsRef = useRef([]);

  const kpis = [
    {
      label: 'Total Energy Saved',
      value: analyticsData.kpis.totalEnergySaved,
      unit: 'kWh',
      icon: TrendingUp,
      color: '#10b981'
    },
    {
      label: 'Estimated CO₂ Reduction',
      value: analyticsData.kpis.co2Reduction,
      unit: 'kg',
      icon: Leaf,
      color: '#059669'
    },
    {
      label: 'Estimated Cost Savings',
      value: analyticsData.kpis.costSavings,
      prefix: '$',
      icon: DollarSign,
      color: '#0ea5e9'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(kpiRef.current, {
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
              valueElement.textContent = Math.round(obj.value);
            }
          });
        }
      });

      gsap.from(chartsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.4,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, []);

  const maxEnergy = Math.max(...analyticsData.energySavedOverTime.map(d => d.energy));
  const maxWaste = Math.max(...analyticsData.wasteByRoom.map(d => d.waste));

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Energy Analytics</h1>
        <div className="analytics-note">
          <BarChart3 size={18} />
          <span>Values are estimated using standard appliance wattage assumptions</span>
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
                  {kpi.unit && <span className="kpi-unit">{kpi.unit}</span>}
                </div>
                <div className="kpi-label">{kpi.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="charts-grid">
        <div ref={el => chartsRef.current[0] = el} className="chart-card">
          <h2>Energy Saved Over Time</h2>
          <div className="chart-container">
            <div className="line-chart">
              <div className="chart-y-axis">
                <span>{maxEnergy}</span>
                <span>{Math.round(maxEnergy / 2)}</span>
                <span>0 kWh</span>
              </div>
              <div className="chart-area">
                <svg viewBox="0 0 400 200" className="line-chart-svg">
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <path
                    d={analyticsData.energySavedOverTime.map((d, i) => {
                      const x = (i / (analyticsData.energySavedOverTime.length - 1)) * 380 + 10;
                      const y = 180 - (d.energy / maxEnergy) * 160;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d={analyticsData.energySavedOverTime.map((d, i) => {
                      const x = (i / (analyticsData.energySavedOverTime.length - 1)) * 380 + 10;
                      const y = 180 - (d.energy / maxEnergy) * 160;
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ') + ' L 390 180 L 10 180 Z'}
                    fill="url(#lineGradient)"
                  />
                  {analyticsData.energySavedOverTime.map((d, i) => {
                    const x = (i / (analyticsData.energySavedOverTime.length - 1)) * 380 + 10;
                    const y = 180 - (d.energy / maxEnergy) * 160;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#10b981"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                    );
                  })}
                </svg>
                <div className="chart-x-axis">
                  {analyticsData.energySavedOverTime.map((d, i) => (
                    <span key={i}>{d.date}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={el => chartsRef.current[1] = el} className="chart-card">
          <h2>Energy Waste by Room</h2>
          <div className="chart-container">
            <div className="bar-chart">
              {analyticsData.wasteByRoom.map((d, i) => (
                <div key={i} className="bar-item">
                  <div className="bar-container">
                    <div
                      className="bar"
                      style={{
                        height: `${(d.waste / maxWaste) * 100}%`,
                        backgroundColor: '#f59e0b'
                      }}
                    >
                      <span className="bar-value">{d.waste} kWh</span>
                    </div>
                  </div>
                  <span className="bar-label">{d.room}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
