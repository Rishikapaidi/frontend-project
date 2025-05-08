# Community Service Dashboard

A modern React application for managing community services and bookings.

## Features

- **Service Discovery**: Browse, search, and filter community services
- **Booking Management**: Create, view, and cancel service bookings
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works on mobile, tablet, and desktop devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/community-service-dashboard.git
cd community-service-dashboard
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the mock API server
```bash
npm run server
# or
yarn server
```

4. Start the development server
```bash
npm start
# or
yarn start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The application is integrated with a RESTful API that provides the following functionality:



### User Endpoints
- Get User Profile (`/user/profile`)
- Update User Profile (`/user/profile`)

### Service Endpoints
- Get All Services (`/services`)
- Get Service by ID (`/services/:id`)
- Get Services by Category (`/services?category=:category`)
- Get Service Categories (`/services/categories`)
- Search Services (`/services?q=:query`)
- Get Services by Location (`/services?lat=:lat&lng=:lng&radius=:radius`)

### Booking Endpoints
- Get All Bookings (`/bookings`)
- Get Booking by ID (`/bookings/:id`)
- Get Customer Bookings (`/bookings/customer`)
- Get Provider Bookings (`/bookings/provider`)
- Create Booking (`/bookings`)
- Get Booking Status (`/bookings/:id/status`)
- Cancel Booking (`/bookings/:id/cancel`)

## Configuration

API configuration can be modified in `src/services/apiConfig.ts`:

- Change `USE_MOCK` to `false` to use a real API instead of the mock server
- Update `REAL_API_URL` with your actual API URL
- Add an API key if required

## Technology Stack

- **React** - UI library
- **TypeScript** - Type checking
- **React Router** - Navigation
- **Axios** - API requests
- **Tailwind CSS** - Styling
- **JSON Server** - Mock API (for development)

## Project Structure

```
community-service-dashboard/
├── public/                 # Static files
│   └── data/               # Mock data for JSON server
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── context/            # React context providers
│   ├── pages/              # Main application pages
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Application component
│   └── index.tsx           # Entry point
└── README.md               # Project documentation
```

## Authentication Flow

The application uses JWT (JSON Web Tokens) for authentication:

1. User logs in with email and password
2. Server returns access token and refresh token
3. Access token is stored in memory and included in API requests
4. Refresh token is used to get a new access token when needed
5. CSRF protection is included for POST, PUT, and DELETE requests



## Acknowledgments

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
