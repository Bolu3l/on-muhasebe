import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Dosya depolama yolu (verilerinizin nerede saklandığına göre ayarlayın)
// Bu değişken, veritabanındaki dosya yolları göreceli ise kullanılacak
const STORAGE_PATH = process.env.INVOICE_STORAGE_PATH || path.join(process.cwd(), 'storage', 'invoices');

// Depolama dizininin var olduğundan emin ol
if (!fs.existsSync(STORAGE_PATH)) {
  try {
    fs.mkdirSync(STORAGE_PATH, { recursive: true });
    console.log(`Depolama dizini oluşturuldu: ${STORAGE_PATH}`);
  } catch (err) {
    console.error(`Depolama dizini oluşturulamadı: ${err}`);
  }
}

// InvoiceFile'dan dosya yolunu getir
async function getInvoiceFilePath(fileId: string) {
  try {
    // InvoiceFile tablosundan dosya yolunu sorgula
    const invoiceFile = await prisma.invoiceFile.findUnique({
      where: { id: fileId }
    });

    if (!invoiceFile) {
      throw new Error(`ID'si ${fileId} olan fatura dosyası bulunamadı`);
    }

    console.log("Veritabanından getirilen dosya bilgisi:", invoiceFile);
    return invoiceFile.fileKey; // fileKey alanını kullan (filePath yerine)
  } catch (error) {
    console.error("Veritabanı sorgusu hatası:", error);
    throw error;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { filePath: string } }
) {
  try {
    const { filePath } = params;
    
    if (!filePath) {
      return NextResponse.json({ error: 'Dosya yolu belirtilmedi' }, { status: 400 });
    }

    console.log('İstenen dosya parametresi:', filePath);

    // Önce bu bir dosya ID'si mi yoksa direkt yol mu kontrol edelim
    let actualFilePath = filePath;
    
    // Eğer bu bir UUID veya ID formatı ise, veritabanından gerçek yolu alalım
    if (/^[a-f0-9\-]+$/i.test(filePath)) {
      try {
        console.log("Bu bir dosya ID'si olabilir, veritabanından yolu alınıyor:", filePath);
        actualFilePath = await getInvoiceFilePath(filePath);
        console.log("Veritabanından alınan dosya yolu:", actualFilePath);
      } catch (dbError) {
        console.log("Veritabanı sorgusu başarısız, parametre doğrudan dosya yolu olarak kabul ediliyor");
        // Hata durumunda parametre değerini olduğu gibi kullan
      }
    }

    // URL-encoded filePath'i decode et
    const decodedPath = decodeURIComponent(actualFilePath);
    console.log('Decoded dosya yolu:', decodedPath);

    // Güvenlik için dosya yolunu normalize et
    const normalizedPath = path.normalize(decodedPath).replace(/^(\.\.(\/|\\|$))+/, '');
    console.log('Normalize edilmiş dosya yolu:', normalizedPath);
    
    // Dosya yolunun mutlak yol mu yoksa göreceli yol mu olduğunu kontrol et
    let fullPath;
    if (path.isAbsolute(normalizedPath)) {
      // Mutlak yol ise doğrudan kullan
      fullPath = normalizedPath;
    } else {
      // Göreceli yol ise STORAGE_PATH ile birleştir
      fullPath = path.join(STORAGE_PATH, normalizedPath);
    }

    console.log('Tam dosya yolu:', fullPath);
    
    // Dosyanın var olup olmadığını kontrol et
    if (!fs.existsSync(fullPath)) {
      console.error('Dosya bulunamadı:', fullPath);
      return NextResponse.json({ 
        error: 'Dosya bulunamadı', 
        requestedPath: decodedPath,
        fullPath: fullPath
      }, { status: 404 });
    }
    
    // Dosyanın içeriğini oku
    const fileBuffer = fs.readFileSync(fullPath);
    
    // Dosya uzantısını al
    const fileExtension = path.extname(fullPath).toLowerCase();
    
    // MIME türünü belirle
    let contentType = 'application/octet-stream'; // Varsayılan
    
    if (fileExtension === '.pdf') {
      contentType = 'application/pdf';
    } else if (['.png', '.jpg', '.jpeg', '.gif'].includes(fileExtension)) {
      contentType = `image/${fileExtension.substring(1)}`;
    } else if (fileExtension === '.html') {
      contentType = 'text/html';
    }
    
    // Dosyayı yanıt olarak gönder
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${path.basename(normalizedPath)}"`,
      },
    });
  } catch (error) {
    console.error('Dosya görüntüleme hatası:', error);
    return NextResponse.json({ 
      error: 'Dosya görüntülenirken bir hata oluştu',
      message: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
} 