import { NextRequest, NextResponse } from "next/server";
import { employeeOperations, leaveRequestOperations, employeeLeaveBalanceOperations } from "@/lib/supabase-db";
import { v4 as uuidv4 } from 'uuid';

// GET - Personel izin taleplerini getir (Supabase)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`İzin talepleri istendi - Supabase kullanılıyor, EmployeeID: ${id}`);

    // Önce çalışanın var olup olmadığını kontrol et
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

    // İzin taleplerini Supabase'den getir
    const leaveRequests = await leaveRequestOperations.getByEmployeeId(id);

    console.log(`${leaveRequests.length} izin talebi Supabase'den getirildi`);
    return NextResponse.json(leaveRequests);
  } catch (error) {
    console.error("İzin talepleri Supabase'den getirilirken hata:", error);
    return NextResponse.json(
      { error: "İzin talepleri getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// POST - Yeni izin talebi oluştur (Supabase)
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`Yeni izin talebi oluşturma - Supabase kullanılıyor, EmployeeID: ${id}`, body);

    // Gerekli alanların kontrolü
    if (!body.startDate || !body.endDate || !body.type) {
      return NextResponse.json(
        { error: "Başlangıç tarihi, bitiş tarihi ve izin türü gereklidir" },
        { status: 400 }
      );
    }

    // Çalışanın var olup olmadığını kontrol et - Supabase
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

    // Gün sayısını hesapla
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 ile başlangıç günü de dahil

    // İzni doğrudan onaylı olarak oluştur - Supabase
    const leaveRequest = await leaveRequestOperations.create({
      id: uuidv4(), // UUID ekle
      employeeId: id,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      days,
      type: body.type,
      notes: body.notes || null,
      status: "APPROVED", // İzin direkt onaylı olarak kaydedilir
      approvedAt: new Date().toISOString(),
      approvedBy: "Yönetici",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    // İzin bakiyesini güncelle (Yıllık izin veya Hastalık izni için) - Supabase
    if (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK") {
      // İzin bakiyesini Supabase'den getir
      let leaveBalance = await employeeLeaveBalanceOperations.getByEmployeeId(id);

      // İzin bakiyesi yoksa oluştur
      if (!leaveBalance) {
        const currentYear = new Date().getFullYear();
        leaveBalance = await employeeLeaveBalanceOperations.create({
          id: uuidv4(), // UUID ekle
          employeeId: id,
          year: currentYear,
          annualLeaveTotal: 14,  // Türkiye'de yasal olarak en az 14 gün
          annualLeaveUsed: 0,
          sickLeaveTotal: 5,
          sickLeaveUsed: 0,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      // İzin tipine göre bakiyeyi güncelle - Supabase
      if (leaveRequest.type === "ANNUAL") {
        await employeeLeaveBalanceOperations.update(id, {
          annualLeaveUsed: leaveBalance.annualLeaveUsed + days,
          lastUpdated: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else if (leaveRequest.type === "SICK") {
        await employeeLeaveBalanceOperations.update(id, {
          sickLeaveUsed: leaveBalance.sickLeaveUsed + days,
          lastUpdated: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    }

    // Çalışanın izinde olduğunu güncelleyelim - Supabase
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Bugünün başlangıcı

    // İzin bugün veya daha önce başlıyorsa ve bugün veya daha sonra bitiyorsa
    // (yani bugün izin aralığı içindeyse) çalışanın durumunu izinde olarak ayarla
    if (startDate <= today && endDate >= today) {
      await employeeOperations.update(id, {
        status: "ON_LEAVE",
        updatedAt: new Date().toISOString()
      });
    }

    console.log(`İzin talebi Supabase'de başarıyla oluşturuldu: ${leaveRequest.id}`);
    return NextResponse.json(leaveRequest);
  } catch (error) {
    console.error("İzin Supabase'de oluşturulurken hata:", error);
    return NextResponse.json(
      { error: "İzin oluşturulurken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - İzin talebini güncelle (onaylama/reddetme işlemi için) - Supabase
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const employeeId = params.id;
    const body = await req.json();
    console.log(`İzin talebi güncelleme - Supabase kullanılıyor, EmployeeID: ${employeeId}`, body);

    if (!body.leaveRequestId) {
      return NextResponse.json(
        { error: "İzin talebi ID'si gereklidir" },
        { status: 400 }
      );
    }

    // İzin talebini Supabase'den getir
    let leaveRequest;
    let updatedLeaveRequest;
    
    try {
      leaveRequest = await leaveRequestOperations.getById(body.leaveRequestId);
      
      if (!leaveRequest) {
        return NextResponse.json(
          { error: "İzin talebi bulunamadı" },
          { status: 404 }
        );
      }

      // İzin talebinin doğru çalışana ait olduğunu kontrol et
      if (leaveRequest.employeeId !== employeeId) {
        return NextResponse.json(
          { error: "Bu izin talebi belirtilen çalışana ait değil" },
          { status: 403 }
        );
      }

      // İzin talebini Supabase'de güncelle
      const updateData = {
        status: body.status,
        updatedAt: new Date().toISOString(),
        ...(body.status === "APPROVED" && { 
          approvedAt: new Date().toISOString(),
          approvedBy: body.approvedBy || "Sistem"
        }),
        ...(body.notes && { notes: body.notes })
      };

      updatedLeaveRequest = await leaveRequestOperations.update(body.leaveRequestId, updateData);
    } catch (error: any) {
      if (error.code === 'PGRST116') { // Supabase: no rows returned
        return NextResponse.json(
          { error: "İzin talebi bulunamadı" },
          { status: 404 }
        );
      }
      throw error;
    }

    // İzin onaylandıysa ve ANNUAL veya SICK tipindeyse izin bakiyesini güncelle - Supabase
    if (body.status === "APPROVED" && (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK")) {
      // İzin bakiyesini Supabase'den getir
      let leaveBalance = await employeeLeaveBalanceOperations.getByEmployeeId(employeeId);

      // İzin bakiyesi yoksa oluştur
      if (!leaveBalance) {
        const currentYear = new Date().getFullYear();
        leaveBalance = await employeeLeaveBalanceOperations.create({
          id: uuidv4(), // UUID ekle
          employeeId,
          year: currentYear,
          annualLeaveTotal: 14,
          annualLeaveUsed: 0,
          sickLeaveTotal: 5,
          sickLeaveUsed: 0,
          lastUpdated: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      // İzin tipine göre bakiyeyi güncelle - Supabase
      if (leaveRequest.type === "ANNUAL") {
        await employeeLeaveBalanceOperations.update(employeeId, {
          annualLeaveUsed: leaveBalance.annualLeaveUsed + leaveRequest.days,
          lastUpdated: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      } else if (leaveRequest.type === "SICK") {
        await employeeLeaveBalanceOperations.update(employeeId, {
          sickLeaveUsed: leaveBalance.sickLeaveUsed + leaveRequest.days,
          lastUpdated: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } else if (body.status === "REJECTED" && leaveRequest.status === "APPROVED" &&
              (leaveRequest.type === "ANNUAL" || leaveRequest.type === "SICK")) {
      // Daha önce onaylanmış bir izin reddedilirse, bakiyeyi geri al - Supabase
      const leaveBalance = await employeeLeaveBalanceOperations.getByEmployeeId(employeeId);

      if (leaveBalance) {
        if (leaveRequest.type === "ANNUAL") {
          await employeeLeaveBalanceOperations.update(employeeId, {
            annualLeaveUsed: Math.max(0, leaveBalance.annualLeaveUsed - leaveRequest.days),
            lastUpdated: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        } else if (leaveRequest.type === "SICK") {
          await employeeLeaveBalanceOperations.update(employeeId, {
            sickLeaveUsed: Math.max(0, leaveBalance.sickLeaveUsed - leaveRequest.days),
            lastUpdated: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
        }
      }
    }

    console.log(`İzin talebi Supabase'de başarıyla güncellendi: ${body.leaveRequestId}`);
    return NextResponse.json(updatedLeaveRequest);
  } catch (error) {
    console.error("İzin talebi Supabase'de güncellenirken hata:", error);
    return NextResponse.json(
      { error: "İzin talebi güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 