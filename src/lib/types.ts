// Veri modellerimiz için tip tanımlamaları

export interface Transaction {
  id: string;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  status: 'completed' | 'pending';
  category?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
  vatAmount: number;
  totalAmount: number;
  invoiceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  invoiceDate: Date | null;
  dueDate: Date | null;
  totalAmount: number;
  isPaid: boolean;
  paymentDate: Date | null;
  status: string;
  type: string;
  notes: string | null;
  customerId: string | null;
  supplierId: string | null;
  items: InvoiceItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  taxId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Contact {
  id: string;
  name: string;
  taxNumber: string | null;
  taxOffice: string | null;
  address: string | null;
  phone: string | null;
  email: string | null;
  isCustomer: boolean;
  isSupplier: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  title: string;
  description: string | null;
  amount: number;
  expenseDate: Date;
  category: string;
  paymentMethod: string;
  status: string;
  receiptUrl: string | null;
  supplierId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReceiptExpense {
  id: string;
  title: string;
  description: string | null;
  amount: number;
  expenseDate: Date;
  category: string;
  receiptNumber: string | null;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  paymentMethod: string;
  supplierId: string | null;
  receiptImageUrl: string | null;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardData {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
  pendingInvoices: {
    count: number;
    total: number;
  };
  recentTransactions: {
    id: string;
    date: Date;
    description: string;
    amount: number;
    type: string;
  }[];
} 