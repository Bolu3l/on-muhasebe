import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// İzin durumları güncellemesinin ne kadar sıkılıkta yapılacağını belirle
const UPDATE_INTERVAL = 60 * 60 * 1000; // 1 saat (milisaniye cinsinden)
let lastUpdate = 0;

export async function middleware(request: NextRequest) {
  const now = Date.now();

  // Belirli aralıklarla izin durumlarını güncelle
  if (now - lastUpdate > UPDATE_INTERVAL) {
    lastUpdate = now;
    
    try {
      // Sunucu tarafında çalışırken
      if (typeof window === "undefined") {
        // İzin durumlarını güncellemek için API'yi çağır
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin}/api/employees/update-leave-status`);
      }
    } catch (error) {
      console.error("İzin durumu güncelleme hatası:", error);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Tüm sayfalarda çalışacak
    "/((?!api|_next/static|_next/image|favicon.ico).*)"
  ],
}; 