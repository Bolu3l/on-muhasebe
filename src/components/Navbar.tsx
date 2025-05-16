"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { Dispatch, SetStateAction, useState, useRef, useEffect } from "react";

interface NavbarProps {
  userName: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({ userName, isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
  const pathname = usePathname() || '';
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Menü dışına tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Faturalar", href: "/dashboard/invoices" },
    { name: "Giderler", href: "/dashboard/expenses" },
    { name: "Personel", href: "/dashboard/employees" },
    { name: "Düzenli İşlemler", href: "/dashboard/recurring" },
    { name: "Raporlar", href: "/dashboard/reports" },
  ];

  // Bir yolun aktif olup olmadığını kontrol eden fonksiyon
  const isActive = (path: string) => {
    if (path === '/dashboard' && pathname === '/dashboard') {
      return true;
    }
    // Alt sayfalarda olunduğunda da üst menü aktif olsun (örn: /dashboard/invoices/create -> Faturalar menüsü aktif)
    return pathname.startsWith(path) && path !== '/dashboard';
  };

  return (
    <div className="flex">
      {/* Sol Sidebar */}
      <aside className={`bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border w-64 fixed h-full transition-all duration-300 ${isSidebarOpen ? 'left-0' : '-left-64'} z-30`}>
        <div className="p-4 border-b border-gray-200 dark:border-dark-border">
          <Link href="/dashboard" className="text-xl font-bold text-gray-900 dark:text-dark-text">
            AI Muhasebe
          </Link>
        </div>
        <nav className="py-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-6 py-3 text-sm transition-all duration-200 ${
                isActive(item.href)
                  ? 'bg-gray-100 dark:bg-gray-800 border-l-4 border-gray-400 dark:border-gray-600 font-medium text-gray-900 dark:text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Üst Navbar */}
      <header className="fixed top-0 right-0 left-0 bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border shadow-sm py-2 px-4 z-20 flex justify-between items-center h-14">
        <div className={`transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'ml-0'}`}>
          {/* Sidebar Toggle Butonu */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-md opacity-75 hover:opacity-100 text-gray-700 dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Sağ kısım: Tema ve Kullanıcı */}
        <div className="flex items-center space-x-4">
          {/* Tema değiştirme butonu */}
          <ThemeToggle />
          
          {/* Kullanıcı avatarı ve dropdown menü */}
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{userName} Kullanıcı</span>
              
              {/* Dropdown oku */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown menüsü */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-card rounded-md shadow-lg z-50 border border-gray-100 dark:border-gray-700">
                <div className="py-1">
                  <Link 
                    href="/dashboard/settings" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Ayarlar
                  </Link>
                  <Link 
                    href="/dashboard/settings/bonus-types" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Prim Tipleri
                  </Link>
                  <Link 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 opacity-60"
                    onClick={(e) => { e.preventDefault(); setUserMenuOpen(false); }}
                  >
                    Profil (Yakında)
                  </Link>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <Link 
                    href="/login" 
                    className="block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Çıkış Yap
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobil Kenar Çubuğu Kapatma Örtüsü */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
} 