# Market Insights Co. - AI-Powered Market Research Platform

## Overview

Market Insights Co. is a modern AI-powered market research platform that provides lightning-fast delivery of comprehensive market analysis at unbeatable pricing. The application serves as a landing page and user portal for a market research service that leverages artificial intelligence to deliver actionable business insights, consumer behavior analysis, and competitive intelligence.

The platform is built as a full-stack web application featuring a React-based frontend with a Node.js/Express backend, designed to showcase market research services, handle user authentication, and facilitate report purchases. The application emphasizes speed, affordability, and AI-driven insights as its core value propositions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side application is built using React 18 with TypeScript, utilizing a component-based architecture with functional components and hooks. The application uses Wouter for lightweight client-side routing instead of React Router, providing navigation between key pages (Home, About, Services, Pricing, Login). State management is handled through React's built-in hooks and React Query for server state management.

The UI framework is built on shadcn/ui components, which provides a comprehensive set of accessible, customizable components based on Radix UI primitives. This choice ensures consistent design, accessibility compliance, and rapid development. The styling system uses Tailwind CSS with a dark theme design system, featuring a modern dark blue color scheme with custom CSS variables for theming.

### Backend Architecture
The server-side architecture follows a simple Express.js structure with TypeScript support. The application uses a monolithic approach with clear separation between client and server code. The backend is configured for session-based authentication using PostgreSQL session storage via connect-pg-simple.

The server implements a middleware-based architecture with request logging, error handling, and development-specific tooling. The routing system is designed to be RESTful with API endpoints prefixed under `/api`. Currently, the backend serves as a foundation with storage interfaces defined but minimal business logic implemented.

### Database Design
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The database schema is defined in a shared module accessible by both client and server code. Currently, the schema includes a basic users table with fields for authentication (id, username, password).

Database migrations are managed through Drizzle Kit, with configuration pointing to a Neon serverless PostgreSQL instance. The setup supports both development and production environments through environment variable configuration.

### Build and Development System
The application uses Vite as the build tool for both development and production builds. The development setup includes hot module replacement, TypeScript checking, and integration with Replit's development environment through specialized plugins.

The build process compiles the frontend assets to a dist/public directory while the backend is bundled using esbuild for production deployment. The configuration supports both ESM modules and proper path resolution for the monorepo structure.

### Component Architecture
The frontend follows a structured component organization with:
- UI components in `/components/ui` (shadcn/ui components)
- Page components in `/pages` 
- Shared utilities and hooks in `/lib` and `/hooks`
- Layout components like Header and Footer for consistent navigation

The component design emphasizes reusability, accessibility, and consistent theming throughout the application.

## External Dependencies

### Core Framework Dependencies
- **React 18**: Frontend framework with TypeScript support
- **Express.js**: Backend web framework for Node.js
- **Vite**: Build tool and development server with HMR support
- **Wouter**: Lightweight client-side routing library

### UI and Styling Dependencies
- **shadcn/ui**: Component library built on Radix UI primitives
- **Radix UI**: Headless UI components for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for managing component variants
- **clsx & tailwind-merge**: Utilities for conditional CSS classes

### Database and ORM
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe ORM with PostgreSQL support
- **Drizzle Kit**: Database migration and introspection tools
- **@neondatabase/serverless**: Neon database client for serverless environments

### State Management and Data Fetching
- **TanStack React Query**: Server state management and caching
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime type validation and schema definition
- **@hookform/resolvers**: Zod integration for React Hook Form

### Development and Build Tools
- **TypeScript**: Static type checking for JavaScript
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS & Autoprefixer**: CSS processing and vendor prefixing

### Authentication and Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **ws**: WebSocket library for Neon database connections

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

The application is designed to be deployed on Replit with seamless integration for development, testing, and production environments. The architecture supports easy scaling and modification while maintaining type safety and developer experience.