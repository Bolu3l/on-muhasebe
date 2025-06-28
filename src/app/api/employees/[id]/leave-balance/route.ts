import { NextRequest, NextResponse } from "next/server";
import { employeeOperations, employeeLeaveBalanceOperations } from "@/lib/supabase-db";
import { v4 as uuidv4 } from 'uuid';

// GET - Personelin izin bakiyesini getir (Supabase)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`İzin bakiyesi istendi - Supabase kullanılıyor, EmployeeID: ${id}`);

    // Önce çalışanın var olup olmadığını kontrol et - Supabase
    try {
      const employee = await employeeOperations.getById(id);
      if (!employee) {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') { // Supabase: no rows returned
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
    }

    // İzin bakiyesini Supabase'den getir
    let leaveBalance = await employeeLeaveBalanceOperations.getByEmployeeId(id);

    // Eğer izin bakiyesi yoksa, varsayılan değerlerle oluştur
    if (!leaveBalance) {
      const currentYear = new Date().getFullYear();
      
      leaveBalance = await employeeLeaveBalanceOperations.create({
        id: uuidv4(), // UUID ekle
        employeeId: id,
        year: currentYear,
        annualLeaveTotal: 14, // Türkiye'de yasal olarak en az 14 gün
        annualLeaveUsed: 0,
        sickLeaveTotal: 5,
        sickLeaveUsed: 0,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    console.log(`İzin bakiyesi Supabase'den başarıyla getirildi`);
    return NextResponse.json(leaveBalance);
  } catch (error) {
    console.error("İzin bakiyesi Supabase'den getirilirken hata:", error);
    return NextResponse.json(
      { error: "İzin bakiyesi getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - İzin bakiyesini güncelle (Supabase)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`İzin bakiyesi güncelleme - Supabase kullanılıyor, EmployeeID: ${id}`, body);

    // Önce çalışanın var olup olmadığını kontrol et - Supabase
    try {
      const employee = await employeeOperations.getById(id);
      if (!employee) {
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
    } catch (error: any) {
      if (error.code === 'PGRST116') { // Supabase: no rows returned
        return NextResponse.json(
          { error: "Çalışan bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
    }

    // İzin bakiyesini Supabase'den kontrol et
    let leaveBalance = await employeeLeaveBalanceOperations.getByEmployeeId(id);

    if (!leaveBalance) {
      // İzin bakiyesi yoksa, yeni oluştur
      const currentYear = new Date().getFullYear();
      
      leaveBalance = await employeeLeaveBalanceOperations.create({
        id: uuidv4(), // UUID ekle
        employeeId: id,
        year: currentYear,
        annualLeaveTotal: body.annualLeaveTotal !== undefined ? body.annualLeaveTotal : 14,
        annualLeaveUsed: body.annualLeaveUsed !== undefined ? body.annualLeaveUsed : 0,
        sickLeaveTotal: body.sickLeaveTotal !== undefined ? body.sickLeaveTotal : 5,
        sickLeaveUsed: body.sickLeaveUsed !== undefined ? body.sickLeaveUsed : 0,
        lastUpdated: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } else {
      // İzin bakiyesi varsa, güncelle - Supabase
      const updateData = {
        ...(body.year !== undefined && { year: body.year }),
        ...(body.annualLeaveTotal !== undefined && { annualLeaveTotal: body.annualLeaveTotal }),
        ...(body.annualLeaveUsed !== undefined && { annualLeaveUsed: body.annualLeaveUsed }),
        ...(body.sickLeaveTotal !== undefined && { sickLeaveTotal: body.sickLeaveTotal }),
        ...(body.sickLeaveUsed !== undefined && { sickLeaveUsed: body.sickLeaveUsed }),
        lastUpdated: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      leaveBalance = await employeeLeaveBalanceOperations.update(id, updateData);
    }

    console.log(`İzin bakiyesi Supabase'de başarıyla güncellendi`);
    return NextResponse.json(leaveBalance);
  } catch (error) {
    console.error("İzin bakiyesi Supabase'de güncellenirken hata:", error);
    return NextResponse.json(
      { error: "İzin bakiyesi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 