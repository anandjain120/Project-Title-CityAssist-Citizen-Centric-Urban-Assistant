import { Alert } from '../../types';
import './AlertCard.css';

interface AlertCardProps {
  alert: Alert;
}

export default function AlertCard({ alert }: AlertCardProps) {
  const getSeverityClass = (severity: string) => {
    return `alert-card alert-${severity}`;
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      aqi: '🌬️',
      traffic: '🚗',
      utility: '⚡',
      health: '🏥',
    };
    return icons[type] || '📢';
  };

  return (
    <div className={getSeverityClass(alert.severity)}>
      <div className="alert-header">
        <span className="alert-icon">{getTypeIcon(alert.type)}</span>
        <div className="alert-title-section">
          <h3 className="alert-title">{alert.title}</h3>
          <span className="alert-time">
            {new Date(alert.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
      <p className="alert-message">{alert.message}</p>
      {alert.actionUrl && alert.actionLabel && (
        <a href={alert.actionUrl} className="alert-action">
          {alert.actionLabel} →
        </a>
      )}
    </div>
  );
}

