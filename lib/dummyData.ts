// Dummy data for the ERP system (no database required)

export const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password_hash: 'dummy_hash',
    created_at: new Date().toISOString(),
    memberships: []
  }
];

export const companies = [
  {
    id: '1',
    name: 'Demo Company',
    admin_email: 'admin@example.com',
    created_at: new Date().toISOString(),
    active_modules: [
      { company_id: '1', module_name: 'ACCOUNTING' },
      { company_id: '1', module_name: 'INVENTORY' },
      { company_id: '1', module_name: 'HR' },
      { company_id: '1', module_name: 'SALES' }
    ],
    memberships: []
  }
];

export const accounts = [
  { id: '1', company_id: '1', code: '1101', name: 'الصندوق', type: 'ASSET', balance: 50000 },
  { id: '2', company_id: '1', code: '1102', name: 'البنك', type: 'ASSET', balance: 150000 },
  { id: '3', company_id: '1', code: '1201', name: 'حسابات المدينين', type: 'ASSET', balance: 25000 },
  { id: '4', company_id: '1', code: '2101', name: 'حسابات الدائنين', type: 'LIABILITY', balance: 30000 },
  { id: '5', company_id: '1', code: '3101', name: 'رأس المال', type: 'EQUITY', balance: 200000 },
  { id: '6', company_id: '1', code: '4101', name: 'إيراد المبيعات', type: 'REVENUE', balance: 0 },
  { id: '7', company_id: '1', code: '5101', name: 'مصاريف تشغيلية', type: 'EXPENSE', balance: 0 }
];

export const journalEntries = [
  {
    id: '1',
    company_id: '1',
    date: '2024-01-15',
    reference: 'INV-001',
    description: 'Sales invoice #001',
    created_at: new Date().toISOString(),
    lines: [
      { id: '1', entry_id: '1', account_id: '1', description: 'Cash received', debit: 5000, credit: 0 },
      { id: '2', entry_id: '1', account_id: '6', description: 'Sales revenue', debit: 0, credit: 5000 }
    ]
  }
];

export const products = [
  { id: '1', company_id: '1', name: 'Laptop', sku: 'LAP-001', price: 999.99, stock: 50, category: 'Electronics' },
  { id: '2', company_id: '1', name: 'Mouse', sku: 'MOU-001', price: 29.99, stock: 200, category: 'Electronics' },
  { id: '3', company_id: '1', name: 'Keyboard', sku: 'KEY-001', price: 79.99, stock: 150, category: 'Electronics' },
  { id: '4', company_id: '1', name: 'Monitor', sku: 'MON-001', price: 299.99, stock: 75, category: 'Electronics' },
  { id: '5', company_id: '1', name: 'Desk Chair', sku: 'CHR-001', price: 199.99, stock: 30, category: 'Furniture' }
];

export const warehouses = [
  { id: '1', company_id: '1', name: 'Main Warehouse', location: 'Building A, Floor 1', capacity: 1000 },
  { id: '2', company_id: '1', name: 'Secondary Warehouse', location: 'Building B, Floor 2', capacity: 500 }
];

export const employees = [
  { id: '1', company_id: '1', name: 'John Doe', role: 'Manager', department: 'Management', salary: 5000, status: 'ACTIVE' },
  { id: '2', company_id: '1', name: 'Jane Smith', role: 'Accountant', department: 'Finance', salary: 3500, status: 'ACTIVE' },
  { id: '3', company_id: '1', name: 'Bob Johnson', role: 'Developer', department: 'IT', salary: 4000, status: 'ACTIVE' },
  { id: '4', company_id: '1', name: 'Alice Williams', role: 'Sales Rep', department: 'Sales', salary: 3000, status: 'ACTIVE' }
];

export const payrollRecords = [
  { id: '1', company_id: '1', employee_id: '1', month: 'January 2024', amount: 5000, status: 'PAID', payment_date: '2024-01-31' },
  { id: '2', company_id: '1', employee_id: '2', month: 'January 2024', amount: 3500, status: 'PAID', payment_date: '2024-01-31' },
  { id: '3', company_id: '1', employee_id: '3', month: 'January 2024', amount: 4000, status: 'PAID', payment_date: '2024-01-31' },
  { id: '4', company_id: '1', employee_id: '4', month: 'January 2024', amount: 3000, status: 'PAID', payment_date: '2024-01-31' }
];

export const leads = [
  { id: '1', company_id: '1', name: 'Acme Corp', company_name: 'Acme Corporation', value: 50000, stage: 'QUALIFIED', chance: 75 },
  { id: '2', company_id: '1', name: 'Tech Solutions', company_name: 'Tech Solutions Inc', value: 25000, stage: 'PROPOSAL', chance: 50 },
  { id: '3', company_id: '1', name: 'Global Services', company_name: 'Global Services Ltd', value: 100000, stage: 'NEW', chance: 30 }
];

export const invoices = [
  { id: '1', company_id: '1', customer_name: 'Acme Corp', amount: 5000, status: 'PAID', due_date: '2024-02-15' },
  { id: '2', company_id: '1', customer_name: 'Tech Solutions', amount: 2500, status: 'PENDING', due_date: '2024-02-20' }
];

export const activeModules = [
  { company_id: '1', module_name: 'ACCOUNTING' },
  { company_id: '1', module_name: 'INVENTORY' },
  { company_id: '1', module_name: 'HR' },
  { company_id: '1', module_name: 'SALES' }
];
