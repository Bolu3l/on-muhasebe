"use client";

import { useState } from "react";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sistem Ayarları</h1>
      </div>
      
      <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Genel Ayarlar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            href="/dashboard/settings/bonus-types"
            className="p-4 border border-gray-200 dark:border-dark-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-150"
          >
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Prim Tipleri</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Özel prim tiplerini ekleyin ve yönetin
            </p>
          </Link>
          
          <div className="p-4 border border-gray-200 dark:border-dark-border rounded-lg opacity-60 cursor-not-allowed">
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Şirket Bilgileri</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Şirket bilgilerinizi düzenleyin (Yakında)
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-dark-border rounded-lg opacity-60 cursor-not-allowed">
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Vergiler ve KDV</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Vergi oranlarını yapılandırın (Yakında)
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-dark-card shadow-sm rounded-lg p-6 border border-gray-200 dark:border-dark-border">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Gelişmiş Ayarlar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-dark-border rounded-lg opacity-60 cursor-not-allowed">
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Kullanıcı Yönetimi</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Kullanıcıları ve izinleri yönetin (Yakında)
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-dark-border rounded-lg opacity-60 cursor-not-allowed">
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Yedekleme</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Veri yedekleme ve kurtarma (Yakında)
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-dark-border rounded-lg opacity-60 cursor-not-allowed">
            <h3 className="font-medium text-gray-900 dark:text-white mb-1">Sistem Günlükleri</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sistem olaylarını ve hataları görüntüleyin (Yakında)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 