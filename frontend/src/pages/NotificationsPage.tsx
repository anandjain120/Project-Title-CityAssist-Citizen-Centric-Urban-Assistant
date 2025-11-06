import { useState, useEffect } from 'react';
import './NotificationsPage.css';

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Mock notifications - replace with actual API call
    // TODO: Replace with actual API call
    setNotifications([
      {
        id: '1',
        type: 'report',
        title: 'Report Update',
        message: 'Your pothole report (TKT-123456) is now in progress.',
        read: false,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        actionUrl: '/reports/TKT-123456',
      },
      {
        id: '2',
        type: 'alert',
        title: 'Air Quality Alert',
        message: 'AQI is moderate in your area today.',
        read: false,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: '3',
        type: 'utility',
        title: 'Water Service Restored',
        message: 'Water service has been restored in your area.',
        read: true,
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
    ]);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // TODO: Call API to mark as read
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    // TODO: Call API to mark all as read
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount} unread</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllAsRead} className="btn btn-secondary btn-sm">
            Mark all as read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="empty-state">
          <p>No notifications yet</p>
        </div>
      ) : (
        <div className="notifications-list">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <h3 className="notification-title">{notification.title}</h3>
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">
                  {new Date(notification.timestamp).toLocaleString()}
                </span>
              </div>
              {!notification.read && <div className="unread-indicator" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

