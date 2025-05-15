'use client';

import { useState, useEffect } from 'react';

export default function DebugPage() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<string | null>(null);

  // API çağrısını yap
  async function callApi(endpoint: string) {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`API endpoint çağrılıyor: ${endpoint}`);
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error(`API yanıtı başarısız: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('API yanıtı:', data);
      
      setApiData(data);
      setTestResult(`API yanıtı başarılı: ${endpoint}`);
      
      return data;
    } catch (err: any) {
      console.error('API çağrısı hatası:', err);
      setError(err.message || 'Bilinmeyen hata');
      setTestResult(`API hatası: ${err.message}`);
      
      return null;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Debugger Sayfası</h1>
      
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold">API Test</h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => callApi('/api/db-check')}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            DB-CHECK
          </button>
          
          <button
            onClick={() => callApi('/api/test-db')}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            TEST-DB
          </button>

          <button
            onClick={async () => {
              const data = await callApi('/api/test-db');
              if (data && data.examples && data.examples.invoice) {
                setTestResult(`Fatura örneği bulundu: ID=${data.examples.invoice.id}, Tutar=${data.examples.invoice.totalAmount}`);
              } else {
                setTestResult('Fatura örneği bulunamadı!');
              }
            }}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Fatura Örneği Bul
          </button>
        </div>
        
        {testResult && (
          <div className={`p-3 rounded ${testResult.includes('hatası') ? 'bg-red-100' : 'bg-green-100'}`}>
            {testResult}
          </div>
        )}
        
        {loading && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin h-5 w-5 border-t-2 border-blue-500 rounded-full"></div>
            <span>Yükleniyor...</span>
          </div>
        )}
        
        {error && (
          <div className="p-3 bg-red-100 text-red-800 rounded">
            <strong>Hata:</strong> {error}
          </div>
        )}
      </div>
      
      {apiData && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">API Yanıtı:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(apiData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 