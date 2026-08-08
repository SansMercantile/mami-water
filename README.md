# MAMI_WATA Frontend - Water Systems & Hydraulics Management

## Overview

MAMI_WATA is the Water Systems & Hydraulics Management platform. This frontend provides real-time monitoring of water systems, hydraulic operations, flow rates, pressure levels, and system contamination.

## Features

- **Water Management**: Monitor water quality and flow rates
- **Hydraulic Systems**: Track hydraulic pressure and performance
- **Monitoring**: Real-time operational metrics
- **Performance Analytics**: Detailed trends and analytics
- **Alert Management**: System alerts and anomaly detection
- **Real-time Health Checks**: Monitor backend API availability

## Local Development

### Prerequisites

- Node.js 20+ with npm
- MAMI_WATA backend running on `http://localhost:8000` (or set `REACT_APP_API_BASE_URL`)

### Setup

```bash
cd mami_wata/frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

### Environment Variables

Create a `.env.local` file:

```
REACT_APP_API_BASE_URL=http://localhost:8000
```

## Docker Deployment

### Build

```bash
docker build -t mami-wata-frontend:latest .
```

### Run

```bash
docker run -p 3010:3000 \
  -e REACT_APP_API_BASE_URL=http://mami-wata-backend:8000 \
  mami-wata-frontend:latest
```

### Docker Compose

From repository root:

```bash
docker compose -f docker-compose.frontends.yml up mami-wata
```

MAMI_WATA frontend will be available at `http://localhost:3010`

## Technology Stack

- **React** 18.3 - UI framework
- **Tailwind CSS** - Styling with water theme
- **Lucide Icons** - Icon library
- **Axios** - HTTP client
- **React Router** - Navigation

## Project Structure

```
mami_wata/frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── hydraulics/
│   ├── pages/
│   │   └── Dashboard.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   └── integration.test.js
├── Dockerfile
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── .gitignore
```

## Testing

```bash
npm test
```

## Build for Production

```bash
npm run build
```

## Support

For issues or questions about the MAMI_WATA system, refer to the main constellation documentation.
