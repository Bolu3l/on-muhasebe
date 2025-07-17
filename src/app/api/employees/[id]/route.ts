import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { validateToken } from "@/lib/auth";

// GET - ID'ye göre çalışan getir (Prisma)
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Çalışan detayları istendi - Prisma kullanılıyor, ID: ${id}`);

    // Auth token'ını kontrol et
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    // Kullanıcının çalışanını getir (ilişkili verilerle birlikte)
    const employee = await prisma.employee.findFirst({
      where: { 
        id: id,
        userId: decoded.userId // Güvenlik: Sadece kendi çalışanını görebilsin
      },
      include: {
        salaryPayments: {
          orderBy: { paymentDate: 'desc' },
          take: 10 // Son 10 maaş ödemesi
        },
        leaveRequests: {
          orderBy: { startDate: 'desc' },
          take: 20 // Son 20 izin talebi
        }
      }
    });

    if (!employee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Decimal değerleri sayıya dönüştür ve name alanını oluştur
    const processedEmployee = {
      ...employee,
      name: `${employee.firstName} ${employee.lastName}`.trim(), // firstName ve lastName'i birleştir
      salary: employee.salary ? Number(employee.salary.toString()) : 0,
      // Related data'lardaki decimal değerleri de dönüştür
      salaryPayments: employee.salaryPayments?.map((payment: any) => ({
        ...payment,
        grossSalary: payment.grossSalary ? Number(payment.grossSalary.toString()) : 0,
        incomeTax: payment.incomeTax ? Number(payment.incomeTax.toString()) : 0,
        socialSecurity: payment.socialSecurity ? Number(payment.socialSecurity.toString()) : 0,
        unemploymentInsurance: payment.unemploymentInsurance ? Number(payment.unemploymentInsurance.toString()) : 0,
        netSalary: payment.netSalary ? Number(payment.netSalary.toString()) : 0,
        bonus: payment.bonus ? Number(payment.bonus.toString()) : 0
      })) || [],
      leaveRequests: employee.leaveRequests?.map((leave: any) => ({
        ...leave,
        // Leave request'lerde decimal alan yok, olduğu gibi bırak
      })) || []
    };

    console.log(`Çalışan detayları Prisma'dan başarıyla getirildi: ${id}`);
    return NextResponse.json(processedEmployee);
  } catch (error: any) {
    console.error("Çalışan Prisma'dan getirilirken hata:", error);
    
    return NextResponse.json(
      { error: "Çalışan getirilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// PATCH - Çalışanı güncelle (Prisma)
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const body = await req.json();
    console.log(`Çalışan güncelleme isteği - Prisma kullanılıyor, ID: ${id}`);

    // Auth token'ını kontrol et
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    // Çalışanın var olup olmadığını ve kullanıcının çalışanı olup olmadığını kontrol et
    const existingEmployee = await prisma.employee.findFirst({
      where: { 
        id: id,
        userId: decoded.userId // Güvenlik: Sadece kendi çalışanını güncelleyebilsin
      }
    });
    
    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Verileri hazırla
    const updateData: any = {};
    
    if (body.firstName) updateData.firstName = body.firstName;
    if (body.lastName) updateData.lastName = body.lastName;
    if (body.position) updateData.position = body.position;
    if (body.department) updateData.department = body.department;
    if (body.startDate) updateData.startDate = new Date(body.startDate);
    if (body.endDate) updateData.endDate = new Date(body.endDate);
    if (body.email !== undefined) updateData.email = body.email;
    if (body.phone !== undefined) updateData.phone = body.phone;
    if (body.address !== undefined) updateData.address = body.address;
    if (body.tcNumber !== undefined) updateData.tcNumber = body.tcNumber;
    if (body.sgkNumber !== undefined) updateData.sgkNumber = body.sgkNumber;
    if (body.status) updateData.status = body.status;
    
    // Maaş varsa ve geçerliyse güncelle
    if (body.salary) {
      const salary = parseFloat(body.salary);
      if (!isNaN(salary)) {
        updateData.salary = salary;
      }
    }

    // Çalışanı Prisma'da güncelle
    const updatedEmployee = await prisma.employee.update({
      where: { id: id },
      data: updateData
    });

    // Decimal değerleri sayıya dönüştür ve name alanını oluştur
    const processedEmployee = {
      ...updatedEmployee,
      name: `${updatedEmployee.firstName} ${updatedEmployee.lastName}`.trim(), // firstName ve lastName'i birleştir
      salary: updatedEmployee.salary ? Number(updatedEmployee.salary.toString()) : 0
    };

    console.log(`Çalışan Prisma'da başarıyla güncellendi: ${id}`);
    return NextResponse.json(processedEmployee);
  } catch (error: any) {
    console.error("Çalışan Prisma'da güncellenirken hata:", error);
    return NextResponse.json(
      { error: "Çalışan güncellenirken bir hata oluştu" },
      { status: 500 }
    );
  }
}

// DELETE - Çalışanı sil (Prisma)
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    console.log(`Çalışan silme isteği - Prisma kullanılıyor, ID: ${id}`);

    // Auth token'ını kontrol et
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'Token gerekli' }, { status: 401 });
    }
    
    const decoded = validateToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Geçersiz token' }, { status: 401 });
    }

    // Çalışanın var olup olmadığını ve kullanıcının çalışanı olup olmadığını kontrol et
    const existingEmployee = await prisma.employee.findFirst({
      where: { 
        id: id,
        userId: decoded.userId // Güvenlik: Sadece kendi çalışanını silebilsin
      }
    });
    
    if (!existingEmployee) {
      return NextResponse.json(
        { error: "Çalışan bulunamadı" },
        { status: 404 }
      );
    }

    // Çalışanı Prisma'dan sil (ilişkili kayıtlar cascade silinecek)
    await prisma.employee.delete({
      where: { id: id }
    });

    console.log(`Çalışan Prisma'dan başarıyla silindi: ${id}`);
    return NextResponse.json(
      { message: "Çalışan başarıyla silindi" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Çalışan Prisma'dan silinirken hata:", error);
    return NextResponse.json(
      { error: "Çalışan silinirken bir hata oluştu" },
      { status: 500 }
    );
  }
} 