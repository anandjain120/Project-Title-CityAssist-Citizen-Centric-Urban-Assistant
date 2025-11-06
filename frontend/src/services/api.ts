import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth-storage');
    if (token) {
      try {
        const authData = JSON.parse(token);
        if (authData.state?.token) {
          config.headers.Authorization = `Bearer ${authData.state.token}`;
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      localStorage.removeItem('auth-storage');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Auth
  auth: {
    login: (email: string, password: string) =>
      apiClient.post('/auth/login', { email, password }),
    register: (data: any) => apiClient.post('/auth/register', data),
    refresh: (refreshToken: string) =>
      apiClient.post('/auth/refresh', { refreshToken }),
  },

  // User
  user: {
    getProfile: () => apiClient.get('/users/profile'),
    updateProfile: (data: any) => apiClient.put('/users/profile', data),
    updatePreferences: (data: any) =>
      apiClient.put('/users/preferences', data),
  },

  // Reports
  reports: {
    create: (data: FormData) =>
      apiClient.post('/reports', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }),
    getList: (params?: any) => apiClient.get('/reports', { params }),
    getById: (id: string) => apiClient.get(`/reports/${id}`),
    getTimeline: (id: string) => apiClient.get(`/reports/${id}/timeline`),
  },

  // Notifications
  notifications: {
    getList: (params?: any) => apiClient.get('/notifications', { params }),
    markAsRead: (id: string) => apiClient.put(`/notifications/${id}/read`),
    markAllAsRead: () => apiClient.put('/notifications/read-all'),
    subscribe: (data: any) => apiClient.post('/notifications/subscribe', data),
  },

  // Routing
  routing: {
    getRoute: (origin: any, destination: any, preferences?: any) =>
      apiClient.post('/routing/route', { origin, destination, preferences }),
    getTraffic: (bounds: any) =>
      apiClient.get('/routing/traffic', { params: bounds }),
    getAlternateRoutes: (origin: any, destination: any) =>
      apiClient.post('/routing/alternate', { origin, destination }),
  },

  // Services
  services: {
    getLocal: (location: any, category?: string) =>
      apiClient.get('/services/local', { params: { ...location, category } }),
    getOutages: () => apiClient.get('/services/outages'),
    subscribeToUtility: (utility: string, zone: string) =>
      apiClient.post('/services/subscribe', { utility, zone }),
  },

  // Alerts
  alerts: {
    getAQI: (location: any) => apiClient.get('/alerts/aqi', { params: location }),
    getHealthRecommendations: (profile: any) =>
      apiClient.post('/alerts/health', profile),
  },

  // Upload
  upload: {
    getPresignedUrl: (filename: string, contentType: string) =>
      apiClient.post('/upload/presigned-url', { filename, contentType }),
  },
};

export default apiClient;

