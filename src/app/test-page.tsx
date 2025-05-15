'use client';

import { useState, useEffect } from 'react';

type DataItem = {
  id: string;
  [key: string]: any;
};

type DataState = {
  invoices: DataItem[];
  expenses: DataItem[];
  recurring: DataItem[];
};

/**
 * Bu sayfa, veritabanı verilerini doğrudan görüntüler
 * Client component olduğundan, sadece useState ve useEffect kullanarak verileri getirecek
 * En temel şekilde verilerin gelip gelmediğini kontrol edeceğiz
 */
export default function TestPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataState>({
    invoices: [],
    expenses: [],
    recurring: []
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/test-db');
        if (!response.ok) {
          throw new Error('API yanıtı başarısız');
        }
        const result = await response.json();
        console.log('API yanıtı:', result);
        
        setData({
          invoices: result.examples.invoice ? [result.examples.invoice] : [],
          expenses: result.examples.expense ? [result.examples.expense] : [],
          recurring: result.examples.recurring ? [result.examples.recurring] : []
        });
        setError(null);
      } catch (err: any) {
        console.error('Veri getirme hatası:', err);
        setError(err.message || 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-10">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">Hata: {error}</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Veritabanı Test Sayfası</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Faturalar</h2>
        {data.invoices.length === 0 ? (
          <p>Fatura bulunamadı</p>
        ) : (
          <ul className="list-disc pl-5">
            {data.invoices.map(invoice => (
              <li key={invoice.id} className="mb-2">
                <strong>ID:</strong> {invoice.id}, <strong>Numara:</strong> {invoice.invoiceNumber}, <strong>Tutar:</strong> {String(invoice.totalAmount)}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Giderler</h2>
        {data.expenses.length === 0 ? (
          <p>Gider bulunamadı</p>
        ) : (
          <ul className="list-disc pl-5">
            {data.expenses.map(expense => (
              <li key={expense.id} className="mb-2">
                <strong>ID:</strong> {expense.id}, <strong>Başlık:</strong> {expense.title}, <strong>Tutar:</strong> {String(expense.amount)}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Düzenli İşlemler</h2>
        {data.recurring.length === 0 ? (
          <p>Düzenli işlem bulunamadı</p>
        ) : (
          <ul className="list-disc pl-5">
            {data.recurring.map(recurring => (
              <li key={recurring.id} className="mb-2">
                <strong>ID:</strong> {recurring.id}, <strong>Başlık:</strong> {recurring.title}, <strong>Tutar:</strong> {String(recurring.amount)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 