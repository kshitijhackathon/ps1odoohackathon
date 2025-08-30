# Overview

This is a full-stack placement tracking application built with React, Express.js, and PostgreSQL. The system supports three types of users: students, companies, and Training & Placement Officers (TPO). It features a modern UI built with shadcn/ui components and Tailwind CSS, with form validation using Zod schemas. The application uses Drizzle ORM for database operations and is designed to manage placement activities within educational institutions.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS custom properties for theming
- **Form Management**: React Hook Form with Zod validation schemas

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Build System**: esbuild for production builds, tsx for development

## Data Storage
- **Primary Database**: PostgreSQL hosted on Neon (serverless PostgreSQL)
- **ORM**: Drizzle ORM with migrations stored in `/migrations` directory
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Development Storage**: In-memory storage implementation for rapid development

## Authentication & Authorization
- **User Roles**: Three distinct user types (student, company, tpo) with role-specific fields
- **Session Management**: Uses connect-pg-simple for PostgreSQL session storage
- **Validation**: Zod schemas for registration and login validation with role-specific validation rules

## External Dependencies
- **Database Hosting**: Neon Database (serverless PostgreSQL)
- **UI Framework**: Radix UI primitives for accessible components
- **Development Tools**: Replit integration with cartographer and runtime error overlay
- **Build Tools**: Vite for frontend bundling, esbuild for backend compilation
- **Fonts**: Google Fonts integration (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)