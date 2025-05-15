import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/db';
import { createWorker } from 'tesseract.js';
import { handleApiError } from '@/lib/api-utils';

// pdf-parse'ı direkt modül olarak import etmeyelim
// bunun yerine kendi güvenli wrapper'ımızı yazalım
const pdfParse = async (dataBuffer: Buffer) => {
  try {
    // pdf-parse modülünü dinamik olarak import edelim
    // bu şekilde import sırasında test kodları çalışmayacak
    const pdfParseModule = await import('pdf-parse/lib/pdf-parse.js');
    const parse = pdfParseModule.default || pdfParseModule;
    
    // Test dosyalarına erişim olmadan doğrudan parse işlemini yapıyoruz
    const result = await parse(dataBuffer, {
      max: 0, // Sayfa sınırı yok
      version: 'default'
    });
    
    return result;
  } catch (error: any) {
    console.error('PDF işleme hatası:', error);
    throw new Error(`PDF işleme hatası: ${error.message}`);
  }
};

// Dosya depolama yolu
const STORAGE_PATH = process.env.INVOICE_STORAGE_PATH || path.join(process.cwd(), 'storage', 'invoices');

// OCR işlemi için gerçek entegrasyon
async function performOCR(filePath: string): Promise<string> {
  try {
    console.log('OCR işlemi başlatılıyor:', filePath);

    // PDF dosyasını okuma
    const dataBuffer = await fs.readFile(filePath);
    
    // İlk önce pdf-parse ile içeriği almayı deneyelim
    try {
      // Güvenli PDF parser'ı kullan
      const pdfData = await pdfParse(dataBuffer);
      
      // Eğer içerik varsa ve yeterince uzunsa, OCR yapmaya gerek yok
      if (pdfData.text && pdfData.text.length > 100) {
        console.log('PDF metni başarıyla çıkarıldı (pdf-parse ile)');
        return pdfData.text;
      }
    } catch (pdfError) {
      console.log('PDF-parse ile metin çıkarılamadı, Tesseract OCR deneniyor:', pdfError);
    }
    
    // Tesseract OCR ile işleme - React 19 ve Next.js 15 için güncellenmiş kod
    console.log('Tesseract OCR başlatılıyor...');
    
    try {
      // Tesseract.js v6.0.1 API'si
    const worker = await createWorker('tur+eng');
    
      // Doğrudan dosya yolu yerine buffer kullanarak işleme
      const { data } = await worker.recognize(dataBuffer);
    await worker.terminate();
    
    console.log('OCR tamamlandı');
    return data.text;
    } catch (ocrError) {
      console.error('Tesseract OCR işlemi sırasında hata:', ocrError);
      throw ocrError;
    }
  } catch (error) {
    console.error('OCR işlemi sırasında hata:', error);
    return `OCR HATASI: ${error instanceof Error ? error.message : String(error)}`;
  }
}

// Geliştirilmiş NLP ile metinden bilgi çıkarma
function extractInvoiceData(text: string) {
  console.log('Metin analiz ediliyor:', text.substring(0, 300) + '...');
  
  const patterns = {
    invoiceNumber: [
      /fatura\s+no\s*:?\s*([A-Z0-9-]+)/i,
      /invoice\s+no\s*:?\s*([A-Z0-9-]+)/i,
      /belge\s+no\s*:?\s*([A-Z0-9-]+)/i,
      /fatura numarası\s*:?\s*([A-Z0-9-]+)/i
    ],
    invoiceDate: [
      /fatura\s+tarihi\s*:?\s*(\d{1,2}[.\/-]\d{1,2}[.\/-]\d{2,4})/i,
      /tarih\s*:?\s*(\d{1,2}[.\/-]\d{1,2}[.\/-]\d{2,4})/i,
      /düzenleme\s+tarihi\s*:?\s*(\d{1,2}[.\/-]\d{1,2}[.\/-]\d{2,4})/i
    ],
    dueDate: [
      /vade\s+tarihi\s*:?\s*(\d{1,2}[.\/-]\d{1,2}[.\/-]\d{2,4})/i,
      /son\s+ödeme\s+tarihi\s*:?\s*(\d{1,2}[.\/-]\d{1,2}[.\/-]\d{2,4})/i
    ],
    amount: [
      /mal hizmet toplam\s*:?\s*([\d.,]+)/i,
      /ara toplam\s*:?\s*([\d.,]+)/i,
      /ara tutar\s*:?\s*([\d.,]+)/i,
      /subtotal\s*:?\s*([\d.,]+)/i,
      /mal hizmet toplam tutar[ıi]?\s*:?\s*([\d.,]+)/i
    ],
    taxRate: [
      /kdv\s*oran[ıi]?\s*:?\s*(%?\s*\d+)/i,
      /kdv\s*\(%?(\d+)[.,]?(\d*)\)?:?/i,
      /vergi oran[ıi]?\s*:?\s*(%?\s*\d+)/i,
      /hesaplanan\s+kdv[^(%]*\(%?(\d+)[.,]?(\d*)\)?/i
    ],
    taxAmount: [
      /kdv tutar[ıi]?\s*:?\s*([\d.,]+)/i,
      /kdv\s*:?\s*([\d.,]+)/i,
      /vergi tutar[ıi]?\s*:?\s*([\d.,]+)/i,
      /hesaplanan\s+kdv[^:]*:?\s*([\d.,]+)/i,
      /hesaplanan\s+kdv[^(]*\([^)]*\)([\d.,]+)/i
    ],
    totalAmount: [
      /vergiler dahil toplam tutar\s*:?\s*([\d.,]+)/i,
      /ödenecek tutar\s*:?\s*([\d.,]+)/i,
      /genel toplam\s*:?\s*([\d.,]+)/i,
      /toplam tutar\s*:?\s*([\d.,]+)/i
    ]
  };
  
  // Sonuçları saklamak için nesne
  const results: any = {};
  
  // Ham metni debug için kaydet
  results.debugRawText = text;
  
  // Satır bazlı analiz için metni satırlara böl
  const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  // Temel alanları regex ile çıkar (satıcı ve alıcı hariç)
  for (const [field, regexPatterns] of Object.entries(patterns)) {
    for (const pattern of regexPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        results[field] = match[1].trim();
        console.log(`${field} bulundu:`, results[field]);
        break; // İlk eşleşmede dur
      }
    }
  }
  
  // "Hesaplanan KDV GERCEK(%20)23.508,80 TL" gibi satırları özel olarak işle
  for (const line of lines) {
    if (line.toLowerCase().includes('hesaplanan kdv')) {
      console.log('KDV satırı bulundu:', line);
      
      // KDV oranını bul: (%XX) formatında
      const kdvOranMatch = line.match(/\(%(\d+)[.,]?(\d*)\)/);
      if (kdvOranMatch && !results.taxRate) {
        results.taxRate = `%${kdvOranMatch[1]}`;
        console.log(`taxRate satır analizinden bulundu:`, results.taxRate);
      }
      
      // KDV tutarını bul: Parantezden sonraki sayı - iyileştirilmiş regex
      // "(%20)23.508,80 TL" formatına dikkat et
      const kdvTutarMatch = line.match(/\([^)]*\)([\d,.]+)/);
      if (kdvTutarMatch && !results.taxAmount) {
        results.taxAmount = kdvTutarMatch[1].replace(/[^\d.,]/g, '').trim();
        console.log(`taxAmount satır analizinden bulundu:`, results.taxAmount);
      } else {
        console.log('KDV tutarı regex eşleşmedi:', line);
        
        // Ekstra debug: Sayısal değerleri içeren tüm parçaları bul
        const allNumbers = line.match(/[\d.,]+/g);
        if (allNumbers && allNumbers.length > 1) {
          // İkinci sayısal değer genellikle KDV tutarıdır
          console.log('Potansiyel sayısal değerler:', allNumbers);
          if (allNumbers.length >= 2) {
            results.taxAmount = allNumbers[1].replace(/[^\d.,]/g, '').trim();
            console.log(`taxAmount alternatif yöntemle bulundu:`, results.taxAmount);
          }
        }
      }
    }
  }
  
  // ------ ALICI TESPİTİ ------
  // SAYIN ifadesini ara
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].toLowerCase().includes('sayin') || 
        lines[i].toLowerCase().includes('sayın') || 
        lines[i].toLowerCase().includes('alici') || 
        lines[i].toLowerCase().includes('alıcı')) {
      // SAYIN kelimesinin kendisinde ise sonraki satırı al
      if ((lines[i].toLowerCase() === 'sayin' || lines[i].toLowerCase() === 'sayın') && i + 1 < lines.length) {
        results.buyer = lines[i + 1];
      } 
      // SAYIN kelimesi satırın içindeyse aynı satırın devamını al
      else if (lines[i].toLowerCase().includes('sayin:') || 
               lines[i].toLowerCase().includes('sayın:') || 
               lines[i].toLowerCase().includes('alici:') || 
               lines[i].toLowerCase().includes('alıcı:')) {
        const parts = lines[i].split(':');
        if (parts.length > 1) {
          results.buyer = parts[1].trim();
        }
      }
      // Başka bir durum varsa en uygun şekilde işle
      else if (i + 1 < lines.length) {
        results.buyer = lines[i + 1];
      }
      
      // Alıcıyı temizle ve standardize et
      if (results.buyer) {
        results.buyer = results.buyer.trim()
          .replace(/^(VKN|TCKN|VD|V\.D\.|VERGİ DAİRESİ)[^a-zA-Z0-9]+/i, '')
          .replace(/^(SAYIN|ALICI)[^a-zA-Z0-9]+/i, '')
          .trim();
        
        console.log(`buyer bulundu ve temizlendi:`, results.buyer);
        break;
      }
    }
  }
  
  // ------ SATICI TESPİTİ ------
  // Yöntem 1: "E-Dönüşüm Merkezi" sonrası satırı kontrol et
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('E-Dönüşüm Merkezi') || 
        lines[i].toLowerCase().includes('satan') || 
        lines[i].toLowerCase().includes('satıcı')) {
      
      // E-Dönüşüm Merkezi durumunda
      if (lines[i].includes('E-Dönüşüm Merkezi')) {
        if (i + 1 < lines.length && lines[i + 1].length > 0) {
          let sellerName = lines[i + 1];
          
          // Şirketin devamı bir sonraki satırda olabilir (LİMİTED ŞİRKETİ vb.)
          if (i + 2 < lines.length && 
              (lines[i + 2].includes("LİMİTED") || 
               lines[i + 2].includes("ŞİRKETİ") || 
               lines[i + 2].includes("A.Ş") || 
               lines[i + 2].includes("LTD"))) {
            sellerName += " " + lines[i + 2];
          }
          
          results.seller = sellerName;
        }
      }
      // SATAN veya SATICI durumunda
      else if (lines[i].toLowerCase().includes('satan:') || 
               lines[i].toLowerCase().includes('satıcı:')) {
        const parts = lines[i].split(':');
        if (parts.length > 1) {
          results.seller = parts[1].trim();
        }
      } 
      // Başka bir durum (SATAN veya SATICI tek kelime olarak varsa)
      else if ((lines[i].toLowerCase() === 'satan' || lines[i].toLowerCase() === 'satıcı') && 
                i + 1 < lines.length) {
        results.seller = lines[i + 1];
      }
      
      // Satıcıyı temizle ve standardize et
      if (results.seller) {
        results.seller = results.seller.trim()
          .replace(/^(VKN|TCKN|VD|V\.D\.|VERGİ DAİRESİ)[^a-zA-Z0-9]+/i, '')
          .replace(/^(SATAN|SATICI)[^a-zA-Z0-9]+/i, '')
          .trim();
        
        console.log(`seller bulundu ve temizlendi:`, results.seller);
        break;
      }
    }
  }
  
  // Tarih alanlarını normalize et
  if (results.invoiceDate) {
    results.invoiceDate = normalizeDate(results.invoiceDate);
    console.log(`invoiceDate normalize edildi:`, results.invoiceDate);
  }
  
  if (results.dueDate) {
    results.dueDate = normalizeDate(results.dueDate);
    console.log(`dueDate normalize edildi:`, results.dueDate);
  }
  
  // Tarih normalize fonksiyonu
  function normalizeDate(dateStr: string): string {
    if (!dateStr) return '';
    
    // Tarihteki gereksiz karakterleri temizle
    dateStr = dateStr.replace(/[^\d\.\/\-]/g, '');
    
    // GG.AA.YYYY formatını standardize et
    if (dateStr.match(/^\d{1,2}\.\d{1,2}\.\d{4}$/)) {
      return dateStr;
    }
    
    // GG/AA/YYYY formatını standardize et
    if (dateStr.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
      return dateStr.replace(/\//g, '.');
    }
    
    // YYYY-AA-GG formatını standardize et
    const dashMatch = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (dashMatch) {
      const [_, year, month, day] = dashMatch;
      return `${day}.${month}.${year}`;
    }
    
    return dateStr;
  }
  
  // Tutar bilgileri için para birimi temizleme
  ['amount', 'taxAmount', 'totalAmount'].forEach(field => {
    if (results[field]) {
      // Para birimini ve gereksiz karakterleri temizle (TL, ₺, €, $ vb.)
      results[field] = results[field].replace(/[^\d.,]/g, '').trim();
    }
  });
  
  // KDV tutarını özel olarak kontrol et
  if (!results.taxAmount && text.includes('Hesaplanan KDV')) {
    const kdvMatch = text.match(/Hesaplanan KDV[^:]*:?\s*([\d.,]+)/i);
    if (kdvMatch && kdvMatch[1]) {
      results.taxAmount = kdvMatch[1].replace(/[^\d.,]/g, '').trim();
      console.log(`taxAmount özel yöntemle bulundu:`, results.taxAmount);
    }
  }
  
  // Tüm sonuçları döndür
  console.log('Çıkarılan fatura verileri:', results);
  return results;
}

// GET metodu ekleyelim (test için)
export async function GET() {
  try {
  return NextResponse.json({ message: 'Fatura tarama API çalışıyor' });
  } catch (error) {
    return handleApiError(error as Error);
  }
}

// POST metodunu doğru şekilde export edelim
export async function POST(request: NextRequest) {
  try {
    // Depolama dizininin var olduğundan emin ol
    try {
      await fs.mkdir(STORAGE_PATH, { recursive: true });
    } catch (err) {
      console.error(`Depolama dizini oluşturulamadı: ${err}`);
    }

    // FormData'dan dosyayı al
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Dosya bulunamadı' }, { status: 400 });
    }

    // Dosya tipini kontrol et
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Sadece PDF dosyaları kabul edilir' }, { status: 400 });
    }

    // Dosyayı sunucuya kaydet
    const fileId = uuidv4();
    const fileName = `${fileId}-${file.name}`;
    const filePath = path.join(STORAGE_PATH, fileName);
    
    // Dosya içeriğini oku
    const buffer = await file.arrayBuffer();
    await fs.writeFile(filePath, Buffer.from(buffer));

    console.log(`Dosya başarıyla kaydedildi: ${filePath}`);

    try {
    // OCR işlemi
    const ocrText = await performOCR(filePath);
    
    // NLP ile bilgi çıkarma
    const extractedData = extractInvoiceData(ocrText);

      // API ile uyumlu alan isimlerine dönüştür
      const transformedData = {
      ...extractedData,
        issuerName: extractedData.seller || '',  // seller -> issuerName
        recipientName: extractedData.buyer || '', // buyer -> recipientName
      tempFileId: fileId,
      tempFileName: fileName,
      fileSize: file.size,
      fileType: file.type
      };
      
      console.log('Verilerin son hali:', JSON.stringify(transformedData, null, 2));

      // Veritabanına kaydetmeden, çıkarılan bilgileri ve dosya bilgisini döndür
      return NextResponse.json(transformedData);
    } catch (processError) {
      console.error('Dosya işleme hatası:', processError);
      
      // Hata durumunda oluşturulan geçici dosyayı temizle
      try {
        await fs.unlink(filePath);
        console.log(`Hata nedeniyle geçici dosya silindi: ${filePath}`);
      } catch (unlinkError) {
        console.error('Geçici dosya silinemedi:', unlinkError);
      }
      
      throw processError;
    }
  } catch (error) {
    return handleApiError(error as Error);
  }
} 