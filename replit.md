# LearnScope - Peer-to-Peer Learning Platform

## Overview

LearnScope is a full-stack web application designed to facilitate peer-to-peer learning among college students. The platform combines modern web technologies to create an interactive learning environment where students can ask questions, receive answers, and participate in live help sessions through video calls.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern development
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** for utility-first styling with custom design system
- **shadcn/ui** component library for consistent UI components
- **Wouter** for lightweight client-side routing
- **TanStack Query** for efficient server state management and caching
- **React Hook Form** with Zod validation for form handling and validation

### Backend Architecture
- **Node.js** with Express.js for the server framework
- **TypeScript** throughout the backend for type safety
- **Replit Auth** with OpenID Connect for secure authentication
- **PostgreSQL** with Drizzle ORM for database operations
- **Session-based authentication** with secure cookie management
- **RESTful API** design for client-server communication

### Database Design
- **PostgreSQL** as the primary database
- **Drizzle ORM** for type-safe database operations
- **Session storage** for authentication state management
- **Relational data model** with proper indexing for performance

## Key Components

### Authentication System
- **OpenID Connect** integration with Replit Auth
- **College ID verification** to ensure trusted community members
- **Session management** with secure cookie handling
- **User profile management** with comprehensive user data

### Learning Features
- **Community Q&A** system with questions, answers, and voting
- **Live Help Sessions** with real-time video calling capabilities
- **Subject categorization** (Computer Science, Mathematics, Chemistry, Physics, English, Biology)
- **User progress tracking** and reward system
- **Activity feeds** and notifications

### Real-time Features
- **WebSocket support** for live session coordination
- **Real-time notifications** for help requests
- **Live session status updates**

### UI/UX Design
- **Responsive design** optimized for mobile and desktop
- **Dark/light mode** support through CSS variables
- **Accessibility** considerations with proper ARIA labels
- **Modern design system** with consistent spacing and typography

## Data Flow

1. **User Authentication**: Users authenticate through Replit Auth with college ID verification
2. **Dashboard**: Authenticated users access a personalized dashboard with learning metrics
3. **Community Interaction**: Users can browse questions, post answers, and engage with content
4. **Live Help**: Real-time matching system connects students for video help sessions
5. **Progress Tracking**: System tracks user activities and updates reward points

## External Dependencies

### Authentication
- **Replit Auth** for secure user authentication
- **OpenID Connect** for standardized authentication flow

### Database
- **PostgreSQL** (via Neon or similar provider)
- **Drizzle ORM** for database abstraction

### UI Components
- **Radix UI** primitives for accessible component foundation
- **Lucide React** for consistent iconography
- **Tailwind CSS** for styling

### Development Tools
- **Vite** for development server and build process
- **TypeScript** for type checking
- **ESLint** and **Prettier** for code quality

## Deployment Strategy

### Development
- **Replit** integration for seamless development environment
- **Hot module replacement** for fast development cycles
- **Environment variable** management for different stages

### Production
- **Static asset** optimization through Vite
- **Server-side rendering** considerations for SEO
- **Database migrations** through Drizzle Kit
- **Environment-specific** configurations

### Security
- **HTTPS** enforcement for all communications
- **CSRF protection** through proper session handling
- **Input validation** on both client and server sides
- **Rate limiting** for API endpoints

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025. Initial setup