import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

// İzin durumları güncellemesinin ne kadar sıkılıkta yapılacağını belirle
const UPDATE_INTERVAL = 60 * 60 * 1000; // 1 saat (milisaniye cinsinden)
let lastUpdate = 0;

// Korumalı route'lar
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Authentication kontrolü
  const token = request.cookies.get('auth_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.includes(pathname);

  // Korumalı route'a erişim kontrolü
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Token geçerliliğini kontrol et
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      console.error('Token validation error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Giriş yapmış kullanıcıyı login sayfasından dashboard'a yönlendir
  if (pathname === '/login' && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Token geçersizse login sayfasında kalabilir
    }
  }

  // Root path'i dashboard'a yönlendir eğer giriş yapmışsa
  if (pathname === '/' && token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch (error) {
      // Token geçersizse login sayfasına yönlendir
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Root path'i login sayfasına yönlendir eğer giriş yapmamışsa
  if (pathname === '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const now = Date.now();

  // Belirli aralıklarla izin durumlarını güncelle (sadece authenticated users için)
  if (now - lastUpdate > UPDATE_INTERVAL && token) {
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