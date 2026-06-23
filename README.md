# Zenith Full-Stack Next.js Application

Multi-tenant management system built with Next.js 14 App Router and integrated API routes.

## Features

- 🏢 Multi-tenant architecture
- 📊 Modern dashboard with 2x2 grid layout
- 🎨 Beautiful UI with Tailwind CSS
- 📱 Responsive design
- 🔄 Real-time updates
- 🗂️ Full-stack architecture (Frontend + API)
- 🚀 Server-side rendering
- 🔌 Integrated API routes
- 📦 **No database required - uses dummy data**

## Architecture

This is a **full-stack** Next.js application with:
- **Frontend**: React components with App Router
- **Backend**: API routes in `/app/api/` directory
- **Data**: In-memory dummy data (no database required)
- **Deployment**: Single deployment for both frontend and backend

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The app will automatically redirect to the dashboard with pre-loaded dummy data.

## Build for production:
```bash
npm run build
npm start
```

## Project Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx               # Home page (redirects to dashboard)
├── dashboard/
│   └── page.tsx           # Dashboard page
├── api/                   # Backend API routes (using dummy data)
│   ├── users/
│   │   └── route.ts       # User endpoints
│   ├── companies/
│   │   └── route.ts       # Company endpoints
│   ├── products/
│   │   └── route.ts       # Product endpoints
│   ├── payroll-records/
│   │   └── route.ts       # Payroll endpoints
│   ├── employees/
│   │   └── route.ts       # Employee endpoints
│   ├── leads/
│   │   └── route.ts       # Lead endpoints
│   ├── warehouses/
│   │   └── route.ts       # Warehouse endpoints
│   ├── accounts/
│   │   └── route.ts       # Account endpoints
│   ├── journal/
│   │   └── route.ts       # Journal entry endpoints
│   ├── active-modules/
│   │   └── route.ts       # Module management
│   └── health/
│       └── route.ts       # Health check
└── globals.css             # Global styles

components/                    # Reusable components
├── Sidebar.tsx
├── Header.tsx
└── ...

lib/                          # Utilities
├── dummyData.ts            # Dummy data for all entities
└── ...

modules/                       # Feature modules
├── core/
│   └── Dashboard.tsx
├── accounting/
├── inventory/
└── hr/

types.ts                       # TypeScript types
```

## API Endpoints

All API endpoints are available at `/api/` and use dummy data:

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Register new user (returns dummy user)

### Companies
- `GET /api/companies` - Get all companies
- `POST /api/companies` - Create new company (returns dummy company)

### Products
- `GET /api/products?companyId=X` - Get products for company
- `POST /api/products` - Create new product (returns dummy product)
- `PUT /api/products/[id]` - Update product (returns dummy product)
- `DELETE /api/products/[id]` - Delete product (returns success)

### Employees
- `GET /api/employees?companyId=X` - Get employees for company
- `POST /api/employees` - Create new employee (returns dummy employee)
- `PUT /api/employees/[id]` - Update employee (returns dummy employee)
- `DELETE /api/employees/[id]` - Delete employee (returns success)

### Payroll Records
- `GET /api/payroll-records?companyId=X` - Get payroll records
- `POST /api/payroll-records` - Create payroll record (returns dummy record)
- `PUT /api/payroll-records/[id]` - Update payroll record (returns dummy record)
- `DELETE /api/payroll-records/[id]` - Delete payroll record (returns success)

### Leads
- `GET /api/leads?companyId=X` - Get leads for company
- `POST /api/leads` - Create new lead (returns dummy lead)
- `PUT /api/leads/[id]` - Update lead (returns dummy lead)
- `DELETE /api/leads/[id]` - Delete lead (returns success)

### Warehouses
- `GET /api/warehouses?companyId=X` - Get warehouses for company
- `POST /api/warehouses` - Create new warehouse (returns dummy warehouse)
- `PUT /api/warehouses/[id]` - Update warehouse (returns dummy warehouse)
- `DELETE /api/warehouses/[id]` - Delete warehouse (returns success)

### Accounts (Chart of Accounts)
- `GET /api/accounts?companyId=X` - Get accounts for company
- `GET /api/coa?companyId=X` - Get chart of accounts
- `POST /api/accounts` - Create new account (returns dummy account)
- `PUT /api/accounts/[id]` - Update account (returns dummy account)
- `DELETE /api/accounts/[id]` - Delete account (returns success)

### Journal Entries
- `GET /api/journal?companyId=X` - Get journal entries
- `GET /api/journal-entries?companyId=X` - Get all journal entries
- `POST /api/journal` - Create journal entry (returns dummy entry)
- `PUT /api/journal/[id]` - Update journal entry (returns dummy entry)
- `DELETE /api/journal/[id]` - Delete journal entry (returns success)

### Trial Balance
- `GET /api/trial?companyId=X` - Get trial balance

### Active Modules
- `GET /api/active-modules?companyId=X` - Get active modules
- `POST /api/active-modules` - Activate module (returns dummy module)
- `POST /api/companies/[id]/modules/[module]` - Activate module
- `DELETE /api/companies/[id]/modules/[module]` - Deactivate module

### Health
- `GET /api/health` - Health check

## API Integration

The app uses **internal API routes** with dummy data:
- Base URL: `/api/` (no external server needed)
- API client: `lib/api.ts`
- Direct function calls to internal routes
- No external API dependencies
- No database required

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```bash
docker build -t zenith-fullstack .
docker run -p 3000:3000 zenith-fullstack
```

### Traditional Hosting
```bash
./deploy.sh
# or manually:
npm run build
npm start
```

## Dummy Data

The application uses in-memory dummy data located in `lib/dummyData.ts`:
- **Users**: Pre-configured admin user
- **Companies**: Demo company with all modules active
- **Accounts**: Chart of accounts with Arabic account names
- **Products**: Sample products with categories
- **Warehouses**: Sample warehouse locations
- **Employees**: Sample employee records
- **Payroll Records**: Sample payroll data
- **Leads**: Sample sales leads
- **Journal Entries**: Sample journal entries with lines
- **Invoices**: Sample invoice data

## Benefits of Dummy Data Architecture

### 🚀 Performance
- No database connection overhead
- Instant data access
- No network latency
- Optimized bundle sizes

### 🔧 Development
- No database setup required
- No environment variables needed
- Instant development environment
- Easy to test and prototype

### 📦 Deployment
- Single deployment process
- No database management
- Vercel-ready with zero config
- No environment variable management

## Features

### Dashboard
- 📊 2x2 grid layout for stats
- 🎯 Module management
- 👤 User profile section
- 📱 Responsive design

### Modules
- 📈 Accounting (Chart of Accounts, Journal Entries)
- 📦 Inventory (Products, Warehouses)
- 👥 HR (Employees, Payroll)
- 🎯 Sales (Leads, Invoices)

### UI/UX
- 🎨 Modern design with gradients
- ✨ Smooth animations
- 📱 Mobile responsive
- 🌙 RTL support for Arabic
- 🎯 Interactive elements

## Development

- **Framework**: Next.js 14 with App Router
- **API**: Integrated API routes with dummy data
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Full-stack ready
- **Authentication**: Disabled (direct access to dashboard)

