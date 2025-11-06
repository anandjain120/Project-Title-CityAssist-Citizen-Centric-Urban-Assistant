import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/map', label: 'Map', icon: '🗺️' },
    { path: '/report', label: 'Report', icon: '📝' },
    { path: '/notifications', label: 'Notifications', icon: '🔔' },
    { path: '/services', label: 'Services', icon: '🏢' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">CityAssist</h1>
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <span className="user-name">{user?.name}</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">{children}</main>

      <nav className="nav-mobile">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-mobile-item ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

