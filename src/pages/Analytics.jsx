import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import {
  TrendingUp,
  Leaf,
  DollarSign,
  Zap,
  Info
} from 'lucide-react';
import { energyAnalytics, dashboardKPIs } from '../data/mockData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const kpiRefs = useRef([]);
  const chartRefs = useRef([]);
  const pageRef = useRef(null);

  // Theme-aware colors
  const chartColors = {
    primary: '#0ea5e9',
    success: '#10b981',
    warning: '#f97316',
    danger: '#ef4444',
    text: '#1f2937',
    textMuted: '#6b7280',
    border: '#e5e7eb'
  };

  const kpis = [
    {
      label: 'Total Energy Saved',
      value: dashboardKPIs.energySavedToday,
      unit: 'kWh',
      icon: TrendingUp,
      color: '#10b981'
    },
    {
      label: 'Estimated Cost Saved',
      value: dashboardKPIs.estimatedCostSaved,
      prefix: '₹',
      icon: DollarSign,
      color: '#0ea5e9'
    },
    {
      label: 'CO₂ Reduction',
      value: dashboardKPIs.co2Reduced,
      unit: 'kg',
      icon: Leaf,
      color: '#059669'
    },
    {
      label: 'Energy Waste Detected',
      value: dashboardKPIs.activeWasteCases,
      unit: 'cases',
      icon: Zap,
      color: '#f97316'
    }
  ];

  useEffect(() => {
    // Page animation
    gsap.fromTo(pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // KPI cards animation
    kpiRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: index * 0.1, ease: 'power2.out' }
        );

        // Animate numbers
        const valueElement = ref.querySelector('.kpi-number');
        if (valueElement) {
          const finalValue = parseFloat(kpis[index].value);
          gsap.to(
            { val: 0 },
            {
              val: finalValue,
              duration: 1.5,
              delay: index * 0.1 + 0.2,
              ease: 'power2.out',
              onUpdate: function() {
                valueElement.textContent = this.targets()[0].val.toFixed(
                  typeof finalValue === 'number' && finalValue % 1 !== 0 ? 1 : 0
                );
              }
            }
          );
        }
      }
    });

    // Charts animation
    chartRefs.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.3 + index * 0.1, ease: 'power2.out' }
        );
      }
    });
  }, []);

  const lineChartData = {
    labels: energyAnalytics.energySavedOverTime.labels,
    datasets: [
      {
        label: 'Energy Saved (kWh)',
        data: energyAnalytics.energySavedOverTime.data,
        borderColor: chartColors.success,
        backgroundColor: `${chartColors.success}15`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: chartColors.success,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        filler: {
          above: `${chartColors.success}15`
        }
      }
    ]
  };

  const barChartData = {
    labels: energyAnalytics.wasteByRoom.labels,
    datasets: [
      {
        label: 'Energy Waste (kWh)',
        data: energyAnalytics.wasteByRoom.data,
        backgroundColor: [
          chartColors.danger,
          `${chartColors.danger}dd`,
          `${chartColors.danger}bb`,
          `${chartColors.danger}99`,
          `${chartColors.danger}77`
        ],
        borderRadius: 8,
        borderSkipped: false
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: chartColors.text,
          font: { size: 12, weight: '500' },
          boxWidth: 12,
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: `${chartColors.text}dd`,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: chartColors.border,
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        cornerRadius: 8
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: chartColors.border,
          drawBorder: false
        },
        ticks: {
          color: chartColors.textMuted,
          font: { size: 12 }
        }
      },
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: chartColors.textMuted,
          font: { size: 12 }
        }
      }
    }
  };

  return (
    <div className="analytics-container" ref={pageRef}>
      <div className="analytics-header">
        <h1>
          <TrendingUp size={28} />
          Energy Analytics
        </h1>
        <p className="header-description">
          Real-time insights into campus energy usage and savings
        </p>
      </div>

      <div className="analytics-note">
        <Info size={18} />
        Values are estimated using standard appliance wattage assumptions.
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div
              key={index}
              className="kpi-card"
              ref={el => kpiRefs.current[index] = el}
            >
              <div className="kpi-icon" style={{ background: `${kpi.color}15`, color: kpi.color }}>
                <Icon size={24} />
              </div>
              <div className="kpi-content">
                <span className="kpi-value">
                  {kpi.prefix && <span className="kpi-prefix">{kpi.prefix}</span>}
                  <span className="kpi-number">0</span>
                  {kpi.unit && <span className="kpi-unit">{kpi.unit}</span>}
                </span>
                <span className="kpi-label">{kpi.label}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        <div className="chart-card" ref={el => chartRefs.current[0] = el}>
          <h2>Energy Saved Over Time</h2>
          <p className="chart-description">Weekly trend of energy saved across campus</p>
          <div className="chart-container">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card" ref={el => chartRefs.current[1] = el}>
          <h2>Energy Waste by Room</h2>
          <p className="chart-description">Top rooms with detected energy waste</p>
          <div className="chart-container">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="chart-card wide" ref={el => chartRefs.current[2] = el}>
        <h2>Monthly Trend</h2>
        <p className="chart-description">Cumulative energy savings by week</p>
        <div className="chart-container">
          <Bar
            data={{
              labels: energyAnalytics.monthlyTrend.labels,
              datasets: [
                {
                  label: 'Cumulative Savings (kWh)',
                  data: energyAnalytics.monthlyTrend.data,
                  backgroundColor: chartColors.primary,
                  borderRadius: 8,
                  borderSkipped: false
                }
              ]
            }}
            options={chartOptions}
          />
        </div>
      </div>

      <div className="analytics-note">
        <Info size={18} />
        Actual savings may vary based on real-world conditions. CO₂ calculations use average grid emission factors.
      </div>
    </div>
  );
};

export default Analytics;
