# React Boilerplate

A modern React application with TypeScript, Tailwind CSS, and Ant Design. This boilerplate is the frontend part for a Todo application with social/email login that integrates with a NestJS backend API.
The NestJS backend is available in the [nestjs-boilerplate](https://github.com/mones-cse/nestjs-boilerplate).

## Features

- 🔐 Google OAuth authentication
- 📝 Todo management with CRUD operations
- 🎨 Ant Design UI components
- 🎯 TypeScript for type safety
- 🚀 Vite for fast development
- 📦 State management with Zustand
- 🔄 Data fetching with TanStack Query
- 🎨 Tailwind CSS for styling

## Prerequisites

- Node.js (v20.x or higher)
- pnpm (v9.x or higher)
- Backend API running (see nestjs-boilerplate)

## Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Create .env.local:
   ```bash
   cp .env.example .env.local
   ```
3. Update `.env.local` with your values:

   ```bash
   VITE_API_URL=http://localhost:3000
   ```

4. Start development server:
   ```bash
   pnpm run dev
   ```

## Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

## Project Structure

```
src/
├── components/   # Reusable components
├── pages/        # Page components
├── services/     # API services
├── store/        # Zustand stores
├── hooks/        # Custom hooks
├── types/        # TypeScript types
├── router/       # Route configuration
└── utils/        # Utility functions
```

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Ant Design
- TanStack Query
- Zustand
- React Router v6
- Axios
- Zod
- ESLint
- Prettier

## License

MIT
