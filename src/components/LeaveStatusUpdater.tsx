"use client";

import { useEffect } from "react";

// İzin durumlarını güncellemek için kullanılacak bileşen
// Sayfa her yenilendiğinde ve belirli aralıklarla çalışır
export default function LeaveStatusUpdater() {
  useEffect(() => {
    // Sayfa yüklendiğinde bir kez çalışır
    updateLeaveStatus();

    // Belirli aralıklarla otomatik günceller (örneğin her saat)
    const interval = setInterval(() => {
      updateLeaveStatus();
    }, 60 * 60 * 1000); // 1 saat

    return () => clearInterval(interval);
  }, []);

  // İzin durumlarını güncellemek için API'yi çağırır
  const updateLeaveStatus = async () => {
    try {
      const response = await fetch('/api/employees/update-leave-status');
      const data = await response.json();
      
      if (response.ok) {
        console.log("İzin durumları güncellendi:", data);
      } else {
        console.error("İzin durumları güncellenirken hata:", data.error);
      }
    } catch (error) {
      console.error("İzin durumları güncellenirken bir hata oluştu:", error);
    }
  };

  // Bu bileşen görsel bir öğe oluşturmaz, arka planda çalışır
  return null;
} 