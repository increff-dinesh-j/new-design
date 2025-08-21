# Project Overview of another project just take inference from it

## Name
React Boilerplate - Complete Project Reference

## Description
Comprehensive documentation of the React boilerplate project. This document serves as the primary reference for Cursor to understand the complete current state of the project, including all implemented components, services, routing, and architectural decisions.

## Key Stakeholders
- Shubham Omar (EM)
- Ramanatan M (lead)
- Cursor (dev)

## Technology Stack (Current Implementation)

### Core Dependencies
- React 18.2.0 - Frontend library
- TypeScript 5.7.2 - Type safety and developer experience
- Vite 6.2.0 - Build tool and dev server
- TailwindCSS 3 - Utility-first CSS framework
- @heroui/react 2.7.6 - Tailwind UI component library

### State Management & Forms
- Zustand 5.0.3 - State management
- React Hook Form 7.55.0 - Form handling (configured but not yet implemented)
- Zod 3.24.2 - Schema validation (configured but not yet implemented)

### Routing & Navigation
- React Router 7.5.0 - Client-side routing with protected routes

### HTTP & API
- Axios 1.8.4 - HTTP client with comprehensive error handling

### UI & Animation
- Framer Motion 11.5.6 - Animation library (installed but not yet used)
- React Toastify 11.0.5 - Toast notifications

### Development Tools
- ESLint 9.21.0 - Code linting
- @vitejs/plugin-react-swc 3.8.0 - Fast compilation
- rollup-plugin-visualizer 5.14.0 - Bundle analysis
- vite-plugin-compression 0.5.1 - Build optimization

## Repository Structure

```
react-boilerplate/
├── memory-bank/                    # Project documentation system
│   ├── 00-project-overview.md      # This comprehensive project reference
│   ├── 01-architecture.md          # System architecture and patterns
│   ├── 02-coding-rules.md          # Development standards
│   ├── 03-angular-react.md         # Migration guidelines
│   └── 04-heroui.md               # Component documentation links
├── src/
│   ├── App.tsx                     # Root application component
│   ├── main.tsx                    # Application entry point
│   ├── route.tsx                   # Routing configuration
│   ├── index.css                   # Global styles
│   ├── vite-env.d.ts              # Vite type definitions
│   ├── assets/                     # Static assets
│   │   ├── config/
│   │   │   └── config.json         # Application configuration
│   │   └── images/                 # Image assets
│   ├── common/                     # Shared utilities and services
│   │   ├── auth/
│   │   │   ├── auth.store.ts       # Authentication state management
│   │   │   └── AuthGaurd.tsx       # Route protection component
│   │   ├── hooks/
│   │   │   ├── useLifecycle.ts     # Angular lifecycle migration hook
│   │   │   └── useLocalStorage.ts  # Local storage hook
│   │   ├── services/
│   │   │   ├── abstract.service.ts  # HTTP request abstraction
│   │   │   ├── api.service.ts      # API endpoints
│   │   │   ├── config.service.ts   # Configuration management
│   │   │   └── rest.service.ts     # REST service utilities
│   │   ├── stores/
│   │   │   └── overlay.store.ts    # Overlay state management
│   │   ├── types/                  # TypeScript type definitions
│   │   │   ├── api.ts             # API types
│   │   │   ├── auth.ts            # Authentication types
│   │   │   ├── config.ts          # Configuration types
│   │   │   ├── enums.ts           # Application enums
│   │   │   └── message.ts         # Message types
│   │   └── utils/
│   │       ├── encryption.ts       # Encryption utilities
│   │       ├── localstorage.ts    # Local storage utilities
│   │       └── util.ts            # General utilities
│   ├── components/                 # Reusable UI components
│   │   ├── Overlay.tsx            # Loading/blocking overlay
│   │   ├── Snackbar.tsx           # Notification snackbar
│   │   └── Toast.tsx              # Toast notification wrapper
│   └── pages/                      # Page components
│       ├── AboutPage.tsx          # About page (public)
│       ├── CartPage.tsx           # Cart page (protected)
│       ├── HomePage.tsx           # Home page (public)
│       ├── OrdersPage.tsx         # Orders page (protected)
│       ├── ProductDetailsPage.tsx # Product details (not routed)
│       └── ProductsPage.tsx       # Products page (protected)
├── public/
│   └── favicon.ico                # Site favicon
├── scripts/                       # Build and utility scripts
│   ├── release.sh                # Release automation
│   ├── remove-node-modules.sh    # Dependency cleanup
│   └── utils.sh                  # Script utilities
├── package.json                   # Project dependencies and scripts
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.app.json             # App-specific TypeScript config
├── tsconfig.node.json            # Node-specific TypeScript config
├── tailwind.config.js            # TailwindCSS configuration
├── postcss.config.js             # PostCSS configuration
├── eslint.config.js              # ESLint configuration
├── index.html                    # HTML template
├── Dockerfile                    # Docker configuration
├── nginx.conf                    # Nginx configuration
├── proxy-conf.ts                 # Proxy configuration
└── README.md                     # Project documentation
```

## Routing System (Current Implementation)

### Router Configuration
- Uses React Router 7.5.0 with `createBrowserRouter`
- Route-based title management via loaders
- Protected routes wrapped with AuthGuard component

### Public Routes
- `/` - HomePage (accessible to all users)
- `/about` - AboutPage (accessible to all users)

### Protected Routes (Require Authentication)
- `/products` - ProductsPage (product listing)
- `/cart` - CartPage (shopping cart)
- `/orders` - OrdersPage (order history)

### Route Protection Implementation
- `AuthGaurd.tsx` component wraps protected routes
- Session validation with 2-minute caching
- Automatic redirect to login on authentication failure
- Local storage integration for session persistence

## Implemented Components

### Core Application Components
1. **App.tsx** - Root component with providers
   - HeroUIProvider for UI components
   - RouterProvider for navigation
   - Toast containers for notifications
   - Overlay component integration

2. **Overlay.tsx** - Loading/blocking overlay
   - Zustand store integration
   - Click-to-close functionality
   - Z-index management for modals

### Page Components
- **HomePage.tsx** - Landing page (public)
- **AboutPage.tsx** - About page (public)
- **ProductsPage.tsx** - Product listing (protected)
- **CartPage.tsx** - Shopping cart (protected)
- **OrdersPage.tsx** - Order history (protected)
- **ProductDetailsPage.tsx** - Product details (component only, no route)

### Notification Components
- **Toast.tsx** - Toast notification wrapper
- **Snackbar.tsx** - Processing/status notifications

## Services & State Management

### HTTP Services
1. **abstract.service.ts** - Core HTTP abstraction
   - Axios-based request handling
   - Comprehensive error handling (401, 403, 404, 500, etc.)
   - Request queuing and overlay management
   - Automatic toast notifications
   - Request cancellation support

2. **api.service.ts** - API endpoint definitions
3. **config.service.ts** - Configuration management
4. **rest.service.ts** - REST utilities

### State Management (Zustand)
1. **overlay.store.ts** - Overlay visibility state
   - `isVisible` - overlay display state
   - `closeOnClick` - click-to-close behavior
   - Actions: `showOverlay`, `hideOverlay`, `setCloseOnClick`

2. **auth.store.ts** - Authentication state
   - User data management
   - Session state tracking

### Custom Hooks
1. **useLifecycle.ts** - Angular migration helper
   - `onInit` - component initialization (ngOnInit equivalent)
   - `onViewInit` - view initialization (ngAfterViewInit equivalent)
   - `onDestroy` - cleanup (ngOnDestroy equivalent)

2. **useLocalStorage.ts** - Local storage management

## Authentication System

### AuthGuard Implementation
- Session validation with API calls
- 2-minute caching to reduce API requests
- Local storage for session persistence
- Automatic redirection on authentication failure
- Integration with REST service redirect URLs

### Session Management
- `lastCheckTime` tracking in local storage
- `currentUserObj` caching for offline access
- Automatic session refresh logic

## Notification System

### Toast Notifications
- React Toastify integration
- Multiple containers for different notification types
- Z-index management for proper layering
- Limit of 3 notifications for snackbar container
- Stacked notifications for toast container

### Snackbar Integration
- Processing notifications during API calls
- Success/error status updates
- Unique ID system for request tracking

## Build & Development Configuration

### Available Scripts
```bash
npm run dev                 # Start development server
npm run build              # Production build with TypeScript check
npm run build-dev          # Development build
npm run build-prod-dev     # Production build in dev mode
npm run build-dev-prod     # Development build in prod mode
npm run lint               # Run ESLint
npm run preview            # Preview production build
npm run remove-node-modules # Clean dependencies
npm run analyze            # Bundle analysis
```

### Development Tools Setup
- **Vite** - Fast development server with HMR
- **SWC** - Fast compilation instead of Babel
- **ESLint** - Code quality enforcement
- **TypeScript** - Type checking and IntelliSense
- **TailwindCSS** - Utility-first styling
- **PostCSS** - CSS processing with autoprefixer

## Memory Bank System

### Documentation Files
1. **00-project-overview.md** - This comprehensive project reference
2. **01-architecture.md** - System architecture and design patterns
3. **02-coding-rules.md** - Development standards and guidelines
4. **03-angular-react.md** - Migration strategy and rules
5. **04-heroui.md** - Component documentation links

### Cursor Integration
- Memory resets between sessions require reading ALL memory bank files
- Files are numbered for priority and reading order
- This file (00) is the primary reference that must be read first
- Contains complete current state and implementation details

## Getting Started

### Prerequisites
- Node.js (compatible with package.json engines)
- npm or yarn package manager

### Installation & Development
```bash
# Clone repository
git clone <repository-url>
cd react-boilerplate

# Clean and install dependencies
npm run remove-node-modules

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Analyze bundle
npm run analyze
```

### Key Features Ready for Use
- ✅ React + TypeScript + Vite setup
- ✅ TailwindCSS + HeroUI integration
- ✅ Protected routing with authentication
- ✅ Comprehensive error handling
- ✅ Toast/Snackbar notification system
- ✅ Zustand state management
- ✅ HTTP service abstraction
- ✅ Angular migration helpers
- ✅ Development tooling (ESLint, TypeScript)

### Ready for Implementation
- 🔄 React Hook Form integration (configured)
- 🔄 Zod validation schemas (configured)
- 🔄 Framer Motion animations (installed)
- 🔄 Additional page components
- 🔄 Business logic implementation

## Next Steps & Recommendations

1. **Immediate Development**
   - Implement form handling with React Hook Form + Zod
   - Add business logic to page components
   - Create additional reusable components using HeroUI

2. **Architecture Enhancements**
   - Add more Zustand stores for feature-specific state
   - Implement lazy loading for page components
   - Add error boundaries for better error handling

3. **UX Improvements**
   - Integrate Framer Motion for smooth animations
   - Enhance loading states and skeleton screens
   - Implement responsive design patterns

This documentation serves as the definitive reference for the current project state and should be updated as the project evolves.