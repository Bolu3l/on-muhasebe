"use client";

import Navbar from "@/components/Navbar";
import LeaveStatusUpdater from "@/components/LeaveStatusUpdater";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [userName, setUserName] = useState("Admin");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Local storage'dan kullanıcı bilgisini al
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user.name) {
          setUserName(user.name);
        }
      } catch (error) {
        console.error("Kullanıcı bilgisi alınırken hata oluştu:", error);
      }
    }

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