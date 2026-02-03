import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, AlertTriangle, BarChart3, Monitor,
  Map, Settings, Shield, FileText, Zap, LogOut
} from 'lucide-react';

const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/alerts', icon: AlertTriangle, label: 'Alerts' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/computer-labs', icon: Monitor, label: 'Computer Labs' },
    { path: '/heatmap', icon: Map, label: 'Heatmap' },
    { path: '/rules', icon: Settings, label: 'Rules' },
    { path: '/privacy', icon: Shield, label: 'Privacy' },
    { path: '/audit-logs', icon: FileText, label: 'Audit Logs' }
  ];

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <Zap size={32} className="logo-icon" />
            <div className="logo-text">
              <h1>Watt-Watch</h1>
              <p>Energy Auditor</p>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="user-details">
              <p className="user-name">{user?.name || 'Admin'}</p>
              <p className="user-email">{user?.email || 'admin@wattwatch.ai'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
