import { supabase as supabaseClient, supabaseAdmin } from './supabase'

// Use admin client for server-side operations
const supabase = supabaseAdmin

// Fatura işlemleri
export const invoiceOperations = {
  // Tüm faturaları getir
  async getAll() {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customer:contacts!invoices_contactId_fkey(*),
        client:customers!invoices_customerId_fkey(*),
        items:invoice_items(*),
        files:invoice_files(*)
      `)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Belirli ID'ye sahip faturayı getir
  async getById(id: string) {
    const { data, error } = await supabase
      .from('invoices')
      .select(`
        *,
        customer:contacts!invoices_contactId_fkey(*),
        client:customers!invoices_customerId_fkey(*),
        items:invoice_items(*),
        files:invoice_files(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Fatura oluştur
  async create(invoiceData: any) {
    const { data, error } = await supabase
      .from('invoices')
      .insert(invoiceData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Fatura güncelle
  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('invoices')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Fatura sil
  async delete(id: string) {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Müşteri/Tedarikçi işlemleri
export const contactOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async create(contactData: any) {
    const { data, error } = await supabase
      .from('contacts')
      .insert(contactData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('contacts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Müşteri işlemleri
export const customerOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(customerData: any) {
    const { data, error } = await supabase
      .from('customers')
      .insert(customerData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('customers')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Gider işlemleri
export const expenseOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('expenses')
      .select(`
        *,
        contact:contacts(*)
      `)
      .order('expenseDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('expenses')
      .select(`
        *,
        contact:contacts(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(expenseData: any) {
    const { data, error } = await supabase
      .from('expenses')
      .insert(expenseData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('expenses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Personel işlemleri
export const employeeOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('employees')
      .select('*')
      .order('firstName')
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        salaryPayments:salary_payments(*),
        leaveRequests:leave_requests(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(employeeData: any) {
    const { data, error } = await supabase
      .from('employees')
      .insert(employeeData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('employees')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('employees')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Düzenli işlem operasyonları
export const recurringOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .select(`
        *,
        contact:contacts(*)
      `)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(recurringData: any) {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .insert(recurringData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('recurring_transactions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('recurring_transactions')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Dosya yükleme işlemleri
export const fileOperations = {
  async uploadFile(bucket: string, filePath: string, file: File) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file)
    
    if (error) throw error
    return data
  },

  async getFileUrl(bucket: string, filePath: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath)
    
    return data.publicUrl
  }
}

// Bonus türü işlemleri
export const bonusTypeOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('bonus_types')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('bonus_types')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(bonusTypeData: any) {
    const { data, error } = await supabase
      .from('bonus_types')
      .insert(bonusTypeData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('bonus_types')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('bonus_types')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Maaş ödeme işlemleri
export const salaryPaymentOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('salary_payments')
      .select(`
        *,
        employee:employees(*)
      `)
      .order('paymentDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getByEmployeeId(employeeId: string) {
    const { data, error } = await supabase
      .from('salary_payments')
      .select('*')
      .eq('employeeId', employeeId)
      .order('paymentDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(paymentData: any) {
    const { data, error } = await supabase
      .from('salary_payments')
      .insert(paymentData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('salary_payments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('salary_payments')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// İzin talep işlemleri
export const leaveRequestOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('leave_requests')
      .select(`
        *,
        employee:employees(*)
      `)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('leave_requests')
      .select(`
        *,
        employee:employees(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async getByEmployeeId(employeeId: string) {
    const { data, error } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('employeeId', employeeId)
      .order('startDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getActiveLeaves() {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('leave_requests')
      .select(`
        *,
        employee:employees(*)
      `)
      .eq('status', 'APPROVED')
      .lte('startDate', today)
      .gte('endDate', today)
    
    if (error) throw error
    return data
  },

  async create(leaveData: any) {
    const { data, error } = await supabase
      .from('leave_requests')
      .insert(leaveData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('leave_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('leave_requests')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// İzin bakiye işlemleri
export const employeeLeaveBalanceOperations = {
  async getByEmployeeId(employeeId: string) {
    const { data, error } = await supabase
      .from('employee_leave_balances')
      .select('*')
      .eq('employeeId', employeeId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async create(balanceData: any) {
    const { data, error } = await supabase
      .from('employee_leave_balances')
      .insert(balanceData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(employeeId: string, updateData: any) {
    const { data, error } = await supabase
      .from('employee_leave_balances')
      .update(updateData)
      .eq('employeeId', employeeId)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Makbuz işlemleri
export const receiptExpenseOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('receipt_expenses')
      .select('*')
      .order('expenseDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('receipt_expenses')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(receiptData: any) {
    const { data, error } = await supabase
      .from('receipt_expenses')
      .insert(receiptData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('receipt_expenses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('receipt_expenses')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Fatura dosya işlemleri
export const invoiceFileOperations = {
  async getByInvoiceId(invoiceId: string) {
    const { data, error } = await supabase
      .from('invoice_files')
      .select('*')
      .eq('invoiceId', invoiceId)
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('invoice_files')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(fileData: any) {
    const { data, error } = await supabase
      .from('invoice_files')
      .insert(fileData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('invoice_files')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
} 