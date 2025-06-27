import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    console.log('=== DATABASE DEBUG TEST ===');
    
    // Database bağlantısını test et
    const dbTest = await prisma.$queryRaw`SELECT NOW() as current_time`;
    console.log('Database bağlantısı başarılı:', dbTest);
    
    // Employee tablosunun yapısını kontrol et
    const tableInfo = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'Employee' 
      ORDER BY ordinal_position;
    `;
    console.log('Employee tablo yapısı:', tableInfo);
    
    // Mevcut employee kayıtlarını say
    const employeeCount = await prisma.employee.count();
    console.log('Mevcut employee sayısı:', employeeCount);
    
    // Basit employee listesi çek (eğer varsa)
    let employees: any[] = [];
    try {
      employees = await prisma.employee.findMany({
        take: 3,
        select: {
          id: true,
          name: true,
          position: true,
          salary: true
        }
      });
      console.log('Employee samples:', employees);
    } catch (empError) {
      console.log('Employee listeleme hatası:', empError);
    }
    
    return NextResponse.json({
      status: "success",
      database: {
        connection: "OK",
        time: dbTest,
        tableStructure: tableInfo,
        employeeCount,
        sampleEmployees: employees
      }
    });
    
  } catch (error) {
    console.error('Database debug hatası:', error);
    
    return NextResponse.json({
      status: "error",
      message: "Database debug başarısız",
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
} 