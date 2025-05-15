import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <h1 className="text-3xl font-bold mb-4">AI Muhasebe Asistanı</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">İşletmeniz için akıllı ve kullanımı kolay muhasebe çözümü</p>
      
      <div className="flex gap-4">
        <a 
          href="/dashboard" 
          className="btn btn-primary"
        >
          Dashboard'a Git
        </a>
        
        <button className="btn btn-secondary">
          Daha Fazla Bilgi
        </button>
      </div>
      
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Kolay Muhasebe</h2>
          <p className="text-gray-600 dark:text-gray-400">Faturalarınızı ve giderlerinizi kolayca takip edin.</p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">AI Destekli</h2>
          <p className="text-gray-600 dark:text-gray-400">Yapay zeka ile finansal analizler ve tahminler.</p>
        </div>
        
        <div className="card">
          <h2 className="text-xl font-semibold mb-2">Mobil Erişim</h2>
          <p className="text-gray-600 dark:text-gray-400">Her yerden erişim sağlayın ve işlerinizi yönetin.</p>
        </div>
      </div>
    </div>
  );
}
