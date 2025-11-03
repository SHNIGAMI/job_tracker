# Job Tracker

A modern, responsive job application tracking application built with React, TypeScript, and Material-UI.

## Features

- **Dashboard Overview**: Track application statistics and progress
- **Job Management**: Add, edit, and delete job applications
- **Search & Filter**: Find applications by title, company, or location
- **Status Tracking**: Monitor application status (Applied, Interview, Offer, Rejected, Saved)
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Library**: Material-UI (MUI) with Tailwind CSS
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form with Zod validation
- **Backend**: JSON Server (for development)
- **Styling**: Tailwind CSS with custom MUI theme

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/FlamegiserMKA/job-tracker.git
cd job-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. In a separate terminal, start the mock API server:

```bash
npm run server
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start the JSON server for mock API

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Dashboard.tsx    # Statistics dashboard
│   ├── JobCard.tsx      # Individual job card
│   ├── JobForm.tsx      # Add/edit job form
│   ├── Navbar.tsx       # Navigation bar
│   └── SearchAndFilter.tsx # Search and filter component
├── pages/              # Page components
│   ├── Home.tsx        # Main dashboard page
│   └── AddJob.tsx      # Add new job page
├── hooks/              # Custom React hooks
├── schemas/            # Zod validation schemas
└── api/                # API client and endpoints
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
