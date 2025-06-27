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

  async create(expenseData: any) {
    const { data, error } = await supabase
      .from('Expense')
      .insert(expenseData)
      .select()
      .single()
    
    if (error) throw error
    return data
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