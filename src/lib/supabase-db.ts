import { supabase, supabaseAdmin } from './supabase'

// Fatura işlemleri
export const invoiceOperations = {
  // Tüm faturaları getir
  async getAll() {
    const { data, error } = await supabase
      .from('Invoice')
      .select(`
        *,
        customer:Contact!Invoice_customerId_fkey(*),
        supplier:Contact!Invoice_supplierId_fkey(*),
        items:InvoiceItem(*),
        files:InvoiceFile(*)
      `)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Belirli ID'ye sahip faturayı getir
  async getById(id: string) {
    const { data, error } = await supabase
      .from('Invoice')
      .select(`
        *,
        customer:Contact!Invoice_customerId_fkey(*),
        supplier:Contact!Invoice_supplierId_fkey(*),
        items:InvoiceItem(*),
        files:InvoiceFile(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Fatura oluştur
  async create(invoiceData: any) {
    const { data, error } = await supabase
      .from('Invoice')
      .insert(invoiceData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Fatura güncelle
  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('Invoice')
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
      .from('Invoice')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Müşteri/Tedarikçi işlemleri
export const contactOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('Contact')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async create(contactData: any) {
    const { data, error } = await supabase
      .from('Contact')
      .insert(contactData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('Contact')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  }
}

// Gider işlemleri
export const expenseOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('Expense')
      .select(`
        *,
        Contact(*)
      `)
      .order('expenseDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('Expense')
      .select(`
        *,
        Contact(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(expenseData: any) {
    const { data, error } = await supabase
      .from('Expense')
      .insert(expenseData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('Expense')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('Expense')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Personel işlemleri
export const employeeOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('Employee')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('Employee')
      .select(`
        *,
        salaryPayments:SalaryPayment(*),
        leaveRequests:LeaveRequest(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(employeeData: any) {
    const { data, error } = await supabase
      .from('Employee')
      .insert(employeeData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('Employee')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('Employee')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Düzenli işlem operasyonları
export const recurringOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('RecurringTransaction')
      .select(`
        *,
        Contact(*)
      `)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(recurringData: any) {
    const { data, error } = await supabase
      .from('RecurringTransaction')
      .insert(recurringData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('RecurringTransaction')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('RecurringTransaction')
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
      .from('BonusType')
      .select('*')
      .order('name')
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('BonusType')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(bonusTypeData: any) {
    const { data, error } = await supabase
      .from('BonusType')
      .insert(bonusTypeData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('BonusType')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('BonusType')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Maaş ödeme işlemleri
export const salaryPaymentOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('SalaryPayment')
      .select(`
        *,
        Employee(*)
      `)
      .order('paymentDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getByEmployeeId(employeeId: string) {
    const { data, error } = await supabase
      .from('SalaryPayment')
      .select('*')
      .eq('employeeId', employeeId)
      .order('paymentDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async create(paymentData: any) {
    const { data, error } = await supabase
      .from('SalaryPayment')
      .insert(paymentData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('SalaryPayment')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('SalaryPayment')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// İzin talep işlemleri
export const leaveRequestOperations = {
  async getAll() {
    const { data, error } = await supabase
      .from('LeaveRequest')
      .select(`
        *,
        Employee(*)
      `)
      .order('createdAt', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('LeaveRequest')
      .select(`
        *,
        Employee(*)
      `)
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async getByEmployeeId(employeeId: string) {
    const { data, error } = await supabase
      .from('LeaveRequest')
      .select('*')
      .eq('employeeId', employeeId)
      .order('startDate', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getActiveLeaves() {
    const today = new Date().toISOString().split('T')[0]
    const { data, error } = await supabase
      .from('LeaveRequest')
      .select(`
        *,
        Employee(*)
      `)
      .eq('status', 'APPROVED')
      .lte('startDate', today)
      .gte('endDate', today)
    
    if (error) throw error
    return data
  },

  async create(leaveData: any) {
    const { data, error } = await supabase
      .from('LeaveRequest')
      .insert(leaveData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('LeaveRequest')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('LeaveRequest')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// İzin bakiye işlemleri
export const employeeLeaveBalanceOperations = {
  async getByEmployeeId(employeeId: string) {
    const { data, error } = await supabase
      .from('EmployeeLeaveBalance')
      .select('*')
      .eq('employeeId', employeeId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async create(balanceData: any) {
    const { data, error } = await supabase
      .from('EmployeeLeaveBalance')
      .insert(balanceData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(employeeId: string, updateData: any) {
    const { data, error } = await supabase
      .from('EmployeeLeaveBalance')
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
      .from('ReceiptExpense')
      .select('*')
      .order('date', { ascending: false })
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('ReceiptExpense')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(receiptData: any) {
    const { data, error } = await supabase
      .from('ReceiptExpense')
      .insert(receiptData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async update(id: string, updateData: any) {
    const { data, error } = await supabase
      .from('ReceiptExpense')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('ReceiptExpense')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
}

// Fatura dosya işlemleri
export const invoiceFileOperations = {
  async getByInvoiceId(invoiceId: string) {
    const { data, error } = await supabase
      .from('InvoiceFile')
      .select('*')
      .eq('invoiceId', invoiceId)
    
    if (error) throw error
    return data
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('InvoiceFile')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  async create(fileData: any) {
    const { data, error } = await supabase
      .from('InvoiceFile')
      .insert(fileData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('InvoiceFile')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  }
} 