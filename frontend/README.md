# CityAssist Frontend (PWA)

Progressive Web App for CityAssist - Citizen-Centric Urban Assistant

## Features

- ✅ Mobile-first responsive design
- ✅ PWA with offline support
- ✅ Real-time notifications
- ✅ Interactive maps with traffic data
- ✅ Report submission with image upload
- ✅ Personalized alerts and recommendations
- ✅ Local services directory

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Testing

```bash
npm test
npm run test:coverage
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── services/        # API services
├── store/           # State management (Zustand)
├── types/           # TypeScript types
└── utils/           # Utility functions
```

## Environment Variables

Create a `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ML_SERVICE_URL=http://localhost:8000
```

## Features

### Pages

1. **Login** - User authentication
2. **Onboarding** - Profile creation
3. **Home** - Personalized alerts feed
4. **Map** - Commuter assistant with traffic
5. **Report** - Submit civic issues
6. **Notifications** - Manage notifications
7. **Services** - Local services directory
8. **Profile** - User profile management

## PWA Features

- Service Worker for offline support
- Web App Manifest
- Installable on mobile devices
- Push notifications (FCM/Browser Push)

## API Integration

All API calls are made through `src/services/api.ts`. Mock data is used for development until backend services are available.

## Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- Semantic HTML

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

[Specify License]

