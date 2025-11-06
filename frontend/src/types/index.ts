export interface User {
  id: string;
  email: string;
  name: string;
  age?: number;
  medicalFlags?: string[];
  commutePatterns?: string[];
}

export interface Alert {
  id: string;
  type: 'aqi' | 'traffic' | 'utility' | 'health';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  actionUrl?: string;
  actionLabel?: string;
}

export interface Report {
  id: string;
  category: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  timeline?: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  status: string;
  message: string;
  timestamp: string;
}

export interface Route {
  origin: {
    lat: number;
    lng: number;
  };
  destination: {
    lat: number;
    lng: number;
  };
  distance: number;
  duration: number;
  alternateRoutes?: Route[];
  trafficInfo?: {
    congestion: number;
    incidents: any[];
  };
}

export interface Service {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  location: {
    lat: number;
    lng: number;
  };
  distance?: number;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
}

