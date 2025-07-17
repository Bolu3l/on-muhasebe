// Database types generated from Prisma schema
export type {
  // Main models
  User,
  Company,
  Invoice,
  InvoiceItem,
  EInvoice,
  InvoiceFile,
  Contact,
  Customer,
  Expense,
  ReceiptExpense,
  RecurringTransaction,
  Employee,
  SalaryPayment,
  LeaveRequest,
  EmployeeLeaveBalance,
  BonusType,
  TaxDeclaration,
  FileStorage,
  ActivityLog,
  
  // Enums
  UserRole,
  InvoiceType,
  InvoiceStatus,
  EInvoiceStatus,
  ContactType,
  CustomerType,
  ExpenseStatus,
  EmployeeStatus,
  PaymentStatus,
  LeaveType,
  LeaveStatus,
  DeclarationType,
  DeclarationStatus,
  FileCategory,
  
  // Prisma client
  PrismaClient,
  
} from '@/generated/prisma';

// Import Prisma namespace separately for input types
import type { Prisma } from '@/generated/prisma';

// Prisma input types re-exported for convenience
export type UserCreateInput = Prisma.UserCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;
export type UserWhereInput = Prisma.UserWhereInput;

export type CompanyCreateInput = Prisma.CompanyCreateInput;
export type CompanyUpdateInput = Prisma.CompanyUpdateInput;
export type CompanyWhereInput = Prisma.CompanyWhereInput;

export type InvoiceCreateInput = Prisma.InvoiceCreateInput;
export type InvoiceUpdateInput = Prisma.InvoiceUpdateInput;
export type InvoiceWhereInput = Prisma.InvoiceWhereInput;
export type InvoiceInclude = Prisma.InvoiceInclude;

export type EmployeeCreateInput = Prisma.EmployeeCreateInput;
export type EmployeeUpdateInput = Prisma.EmployeeUpdateInput;
export type EmployeeWhereInput = Prisma.EmployeeWhereInput;

export type ExpenseCreateInput = Prisma.ExpenseCreateInput;
export type ExpenseUpdateInput = Prisma.ExpenseUpdateInput;
export type ExpenseWhereInput = Prisma.ExpenseWhereInput;

export type CustomerCreateInput = Prisma.CustomerCreateInput;
export type CustomerUpdateInput = Prisma.CustomerUpdateInput;
export type CustomerWhereInput = Prisma.CustomerWhereInput;

// Custom types for API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Dashboard types
export interface DashboardStats {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  totalInvoices: number;
  totalCustomers: number;
  totalEmployees: number;
  pendingInvoices: number;
  overdueInvoices: number;
}

export interface MonthlyStats {
  month: string;
  income: number;
  expense: number;
  profit: number;
}

export interface CategoryStats {
  category: string;
  amount: number;
  percentage: number;
}

// Tax related types
export interface TaxCalculation {
  vatCollected: number;
  vatPaid: number;
  vatBalance: number;
  incomeTax: number;
  corporateTax: number;
  stampTax: number;
}

export interface TaxDuty {
  id: string;
  name: string;
  type: 'kdv' | 'gelir' | 'kurumlar' | 'damga' | 'muhtasar' | 'other';
  dueDate: Date;
  amount: number | null;
  isPaid: boolean;
  period: string;
  status: 'upcoming' | 'due' | 'overdue' | 'paid';
  notes?: string;
}

// Employee related types
export interface EmployeeWithBalance {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  salary: number;
  status: EmployeeStatus;
  leaveBalance?: EmployeeLeaveBalance;
  totalLeaves?: number;
  activeLeaves?: number;
}

export interface PayrollSummary {
  totalGrossSalary: number;
  totalNetSalary: number;
  totalTax: number;
  totalSocialSecurity: number;
  totalBonus: number;
  employeeCount: number;
}

// Invoice related types
export interface InvoiceWithItems {
  id: string;
  invoiceNumber: string;
  invoiceDate: Date;
  dueDate?: Date;
  amount: number;
  vatAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  customer?: Customer;
  contact?: Contact;
  items: InvoiceItem[];
  files?: InvoiceFile[];
}

export interface InvoiceSummary {
  totalInvoices: number;
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
  overdueAmount: number;
  avgInvoiceValue: number;
}

// Financial report types
export interface FinancialReport {
  period: string;
  income: {
    total: number;
    invoices: number;
    recurring: number;
    other: number;
  };
  expenses: {
    total: number;
    invoices: number;
    direct: number;
    receipts: number;
    recurring: number;
    payroll: number;
  };
  profit: {
    gross: number;
    net: number;
    margin: number;
  };
  taxes: {
    vat: number;
    income: number;
    payroll: number;
  };
}

// Authentication types
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companies: Company[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: AuthUser;
  token?: string;
  message?: string;
}

// Form types
export interface ContactFormData {
  name: string;
  taxNumber?: string;
  taxOffice?: string;
  address?: string;
  phone?: string;
  email?: string;
  contactType: ContactType;
  isActive: boolean;
  creditLimit?: number;
  paymentTerms?: string;
  notes?: string;
}

export interface CustomerFormData {
  customerCode: string;
  name: string;
  companyName?: string;
  taxNumber?: string;
  taxOffice?: string;
  address?: string;
  phone?: string;
  email?: string;
  customerType: CustomerType;
  creditLimit?: number;
  discountRate?: number;
  notes?: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  tcNumber: string;
  sgkNumber?: string;
  position: string;
  department: string;
  startDate: Date;
  endDate?: Date;
  salary: number;
  email?: string;
  phone?: string;
  address?: string;
  status: EmployeeStatus;
}

export interface ExpenseFormData {
  title: string;
  description?: string;
  amount: number;
  vatAmount?: number;
  totalAmount: number;
  expenseDate: Date;
  category: string;
  paymentMethod: string;
  status: ExpenseStatus;
  contactId?: string;
  receiptNumber?: string;
  isDeductible: boolean;
}

export interface InvoiceFormData {
  invoiceNumber: string;
  invoiceType: InvoiceType;
  invoiceDate: Date;
  dueDate?: Date;
  customerId?: string;
  contactId?: string;
  items: InvoiceItemFormData[];
  notes?: string;
  currency: string;
  exchangeRate: number;
}

export interface InvoiceItemFormData {
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  discountRate?: number;
  productCode?: string;
  unitOfMeasure: string;
}

// Utility types
export type DateRange = {
  startDate: Date;
  endDate: Date;
};

export type SortOrder = 'asc' | 'desc';

export type FilterOptions = {
  search?: string;
  status?: string;
  category?: string;
  dateRange?: DateRange;
  sortBy?: string;
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
};

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp?: Date;
}

export interface ValidationError {
  field: string;
  message: string;
  value?: any;
}

// File upload types
export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  fileSize: number;
  url: string;
  category: FileCategory;
}
