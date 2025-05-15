export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-xl">Yükleniyor...</span>
    </div>
  );
} 