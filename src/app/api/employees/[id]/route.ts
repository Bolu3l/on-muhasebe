import { NextRequest, NextResponse } from "next/server";
import { employeeOperations } from "@/lib/supabase-db";

// GET - ID'ye göre çalışan getir (Supabase)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Çalışan detayları istendi - Supabase kullanılıyor, ID: ${id}`);

    const employee = await employeeOperations.getById(id);

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Decimal değerleri sayıya dönüştür
    const processedEmployee = {
      ...employee,
      salary: employee.salary ? Number(employee.salary.toString()) : 0
    };

    console.log(`Çalışan detayları Supabase'den başarıyla getirildi: ${id}`);
    return NextResponse.json(processedEmployee);
  } catch (error: any) {
    console.error("Çalışan Supabase'den getirilirken hata:", error);
    
    // Supabase no rows returned error
    if (error.code === 'PGRST116') {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: "Çalışan getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - Çalışanı güncelle (Supabase)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`Çalışan güncelleme isteği - Supabase kullanılıyor, ID: ${id}`);

    // Çalışanın var olup olmadığını kontrol et
    try {
      const existingEmployee = await employeeOperations.getById(id);
      if (!existingEmployee) {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
    }

    // Verileri hazırla
    const updateData: any = { 
      updatedAt: new Date().toISOString() 
    };
    
    if (body.name) updateData.name = body.name;
    if (body.position) updateData.position = body.position;
    if (body.department) updateData.department = body.department;
    if (body.startDate) updateData.startDate = new Date(body.startDate).toISOString();
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.taxId !== undefined) updateData.taxId = body.taxId;
    if (body.socialSecurityNumber !== undefined) updateData.socialSecurityNumber = body.socialSecurityNumber;
    if (body.bankAccount !== undefined) updateData.bankAccount = body.bankAccount;
    if (body.status) updateData.status = body.status;
    
    // Maaş varsa ve geçerliyse güncelle
    if (body.salary) {
      const salary = parseFloat(body.salary);
      if (!isNaN(salary)) {
        updateData.salary = salary;
      }
    }

    // Çalışanı Supabase'de güncelle
    const updatedEmployee = await employeeOperations.update(id, updateData);

    // Decimal değerleri sayıya dönüştür
    const processedEmployee = {
      ...updatedEmployee,
      salary: updatedEmployee.salary ? Number(updatedEmployee.salary.toString()) : 0
    };

    console.log(`Çalışan Supabase'de başarıyla güncellendi: ${id}`);
    return NextResponse.json(processedEmployee);
  } catch (error: any) {
    console.error("Çalışan Supabase'de güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Çalışan güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Çalışanı sil (Supabase)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Çalışan silme isteği - Supabase kullanılıyor, ID: ${id}`);

    // Çalışanın var olup olmadığını kontrol et
    try {
      const existingEmployee = await employeeOperations.getById(id);
      if (!existingEmployee) {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
    }

    // Çalışanı Supabase'den sil (ilişkili kayıtlar cascade silinecek)
    await employeeOperations.delete(id);

    console.log(`Çalışan Supabase'den başarıyla silindi: ${id}`);
    return NextResponse.json(
      { message: "Çalışan başarıyla silindi" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Çalışan Supabase'den silinirken hata:", error);
    return NextResponse.json(
      { error: "Çalışan silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 