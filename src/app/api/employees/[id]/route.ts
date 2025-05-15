import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - ID'ye göre çalışan getir
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        salaryPayments: {
          orderBy: {
            paymentDate: 'desc'
          }
        },
        leaveRequests: {
          orderBy: {
            startDate: 'desc'
          }
        }
      }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Çalışan getirilirken hata:", error);
    return NextResponse.json(
      { error: "Çalışan getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - Çalışanı güncelle
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();

    // Çalışanın var olup olmadığını kontrol et
    const existingEmployee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Verileri hazırla
    const updateData: any = {};
    
    if (body.name) updateData.name = body.name;
    if (body.position) updateData.position = body.position;
    if (body.department) updateData.department = body.department;
    if (body.startDate) updateData.startDate = new Date(body.startDate);
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

    // Çalışanı güncelle
    const updatedEmployee = await prisma.employee.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json(updatedEmployee);
  } catch (error) {
    console.error("Çalışan güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Çalışan güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Çalışanı sil
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    // Çalışanın var olup olmadığını kontrol et
    const existingEmployee = await prisma.employee.findUnique({
      where: { id }
    });

    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Çalışanı sil (ilişkili kayıtlar cascade silinecek)
    await prisma.employee.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: "Çalışan başarıyla silindi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Çalışan silinirken hata:", error);
    return NextResponse.json(
      { error: "Çalışan silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 