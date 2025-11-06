import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';
import AlertCard from '../components/AlertCard/AlertCard';
import './HomePage.css';

interface Alert {
  id: string;
  type: 'aqi' | 'traffic' | 'utility' | 'health';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
}

export default function HomePage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Mock alerts for development
  useEffect(() => {
    // TODO: Replace with actual API call
    setAlerts([
      {
        id: '1',
        type: 'aqi',
        title: 'Air Quality Alert',
        message: 'AQI is moderate in your area. Consider wearing a mask if you have respiratory issues.',
        severity: 'medium',
        timestamp: new Date().toISOString(),
        actionUrl: '/map',
        actionLabel: 'View Details',
      },
      {
        id: '2',
        type: 'traffic',
        title: 'Traffic Advisory',
        message: 'High congestion on Main Street. Alternate route available.',
        severity: 'high',
        timestamp: new Date().toISOString(),
        actionUrl: '/map',
        actionLabel: 'View Route',
      },
      {
        id: '3',
        type: 'utility',
        title: 'Water Service Update',
        message: 'Water service will be restored by 4 PM today.',
        severity: 'low',
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  // TODO: Replace with actual API call
  // const { data: alertsData } = useQuery('alerts', () => api.notifications.getList());

  return (
    <div className="home-page">
      <div className="home-header">
        <h1>Welcome back!</h1>
        <p>Here's what's happening in your area</p>
      </div>

      <div className="alerts-section">
        <h2>Your Alerts</h2>
        {alerts.length === 0 ? (
          <div className="empty-state">
            <p>No alerts at the moment. You're all set!</p>
          </div>
        ) : (
          <div className="alerts-list">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        )}
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <a href="/report" className="action-card">
            <span className="action-icon">📝</span>
            <span className="action-label">Report Issue</span>
          </a>
          <a href="/map" className="action-card">
            <span className="action-icon">🗺️</span>
            <span className="action-label">View Map</span>
          </a>
          <a href="/services" className="action-card">
            <span className="action-icon">🏢</span>
            <span className="action-label">Local Services</span>
          </a>
          <a href="/notifications" className="action-card">
            <span className="action-icon">🔔</span>
            <span className="action-label">Notifications</span>
          </a>
        </div>
      </div>
    </div>
  );
}

