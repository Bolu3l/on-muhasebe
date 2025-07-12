"use client";

import Navbar from "@/components/Navbar";
import LeaveStatusUpdater from "@/components/LeaveStatusUpdater";
import { ReactNode, useEffect, useState } from "react";
import { getCurrentUser, isAuthenticated } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [userName, setUserName] = useState("Admin");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Authentication kontrolü
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    // Kullanıcı bilgilerini al
    const user = getCurrentUser();
    if (user) {
      setUserName(user.name || user.email || "Admin");
    }

    setIsLoading(false);

    // Mobil cihazlarda sidebar kapalı başlasın
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // İlk yüklemede ve ekran boyutu değiştiğinde kontrol et
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* İzin durumlarını güncelleyen bileşen */}
      <LeaveStatusUpdater />
      
      <Navbar 
        userName={userName}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className={`pt-14 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 