// GIB CS-XML V3 Fatura formatı için TypeScript interfaces ve XML builder

// Temel tip tanımları
export interface IdTipi {
  value: string;
  schemeId?: string;
}

export interface TutarTipi {
  value: number;
  paraBirimi: string;
}

export interface MiktarTipi {
  value: number;
  birimKodu?: string;
}

export interface TarihTipi {
  value: string; // YYYY-MM-DD formatı
}

export interface ZamanTipi {
  value: string; // HH:MM:SS formatı
}

// Adres bilgileri
export interface AdresTipi {
  sabitTanimlamaNumarasi?: IdTipi;
  postaKutusu?: string;
  kapiNo?: string;
  caddeSokak?: string;
  blok?: string;
  binaAdi?: string;
  binaNo?: string;
  ilce: string;
  sehir: string;
  postaKodu?: string;
  kasabaKoy?: string;
  mahalle?: string;
  ulke: string;
}

// Taraf bilgileri (satici/alici)
export interface TarafBilgileriTipi {
  webSitesi?: string;
  naceKodu?: string;
  aliciSaticiTanimi: IdTipi[];
  unvan?: string;
  postaAdresi: AdresTipi;
  vergiDairesi?: string;
  etiket?: string;
}

// Mal/Hizmet bilgileri
export interface MalHizmetBilgileriTipi {
  aciklama?: string;
  adi: string;
  anahtarKelime?: string;
  markaAdi?: string;
  modelAdi?: string;
  aliciUrunKodu?: IdTipi;
  saticiUrunKodu?: IdTipi;
  ureticiUrunKodu?: IdTipi;
  alternatifUrunKodu?: IdTipi[];
  mensei?: string;
  emtiaSiniflandirmaBilgisi?: string[];
}

// Vergi türü
export interface VergiTuruTipi {
  vergiTuruAdi?: string;
  muafiyetSebebiKodu?: string;
  muafiyetSebebi?: string;
  vergiAdi?: string;
  vergikodu?: string;
}

// Vergi bilgisi
export interface VergiTipi {
  matrah?: TutarTipi;
  vergiTutari: TutarTipi;
  sira?: number;
  belgeParaBilirmiVergiTutari?: TutarTipi;
  oran?: number;
  miktarTarifeBilgisi?: MiktarTipi;
  tutarTarifeBilgisi?: TutarTipi;
  vergiTuru: VergiTuruTipi;
}

// Vergiler
export interface VergilerTipi {
  toplamVergiTutari: TutarTipi;
  vergi?: VergiTipi[];
}

// Fatura satırı
export interface FaturaSatirTipi {
  siraNo: IdTipi;
  not?: string[];
  miktar: MiktarTipi;
  malHizmetMiktari: TutarTipi;
  malHizmetBilgileri: MalHizmetBilgileriTipi;
  birimFiyat: TutarTipi;
  vergiler?: VergilerTipi;
  tevkifatlar?: VergilerTipi[];
}

// Parasal toplamlar
export interface ParasalToplamlarTipi {
  toplamMalHizmetTutari: TutarTipi;
  vergiHaricTutar: TutarTipi;
  vergiDahilTutar: TutarTipi;
  toplamIskontoTutari?: TutarTipi;
  toplamArtirimTutari?: TutarTipi;
  yuvarlamaTutari?: TutarTipi;
  odenecekTutar: TutarTipi;
}

// Ana fatura yapısı
export interface FaturaTipi {
  xsdVersion?: string;
  ublVersionNumarasi?: string;
  ublOzellestirmeNumarasi?: string;
  tercihEdilenSeriNo?: string;
  faturaTuru: string; // TEMELFATURA, TICARIFATURA
  faturaNo?: string;
  suret?: boolean;
  faturaId?: string; // ETTN (UUID)
  faturaTarihi: TarihTipi;
  faturaZamani?: ZamanTipi;
  faturaTipi: string; // SATIS, ISTISNA, OZELMATRAH, ARACTESCIL, TEVKIFAT, IADE
  faturaNot?: string[];
  paraBirimi: string;
  vergiParaBirimi?: string;
  fiyatlandirmaParaBirimi?: string;
  odemeParaBirimi?: string;
  alternatifOdemeParaBirimi?: string;
  altFaturaTipi?: string;
  satici: TarafBilgileriTipi;
  alici: TarafBilgileriTipi;
  // QNB örneğindeki eksik elementler
  odemeSekli?: {
    kod: string;
    aliciHesapBilgileri?: {
      hesapNo: string;
      hesapDovizBirimi: string;
      aciklama?: string;
    };
  };
  odemeKosullari?: {
    not?: string;
    sonOdemeTarihi?: string;
  };
  vergiler: VergilerTipi[];
  tevkifatlar?: VergilerTipi[];
  parasalToplamlar: ParasalToplamlarTipi;
  faturaSatir: FaturaSatirTipi[];
}

// XML Builder fonksiyonları
export class CSXmlBuilder {
  
  private static buildIdElement(name: string, id: IdTipi): string {
    const schemeAttr = id.schemeId ? ` schemeId="${id.schemeId}"` : '';
    return `<${name}${schemeAttr}>${id.value}</${name}>`;
  }

  private static buildTutarElement(name: string, tutar: TutarTipi): string {
    return `<${name} paraBirimi="${tutar.paraBirimi}">${tutar.value}</${name}>`;
  }

  private static buildMiktarElement(name: string, miktar: MiktarTipi): string {
    const birimAttr = miktar.birimKodu ? ` birimKodu="${miktar.birimKodu}"` : '';
    return `<${name}${birimAttr}>${miktar.value}</${name}>`;
  }

  private static buildAdresElement(adres: AdresTipi): string {
    let xml = '<postaAdresi>';
    
    if (adres.sabitTanimlamaNumarasi) {
      xml += this.buildIdElement('sabitTanimlamaNumarasi', adres.sabitTanimlamaNumarasi);
    }
    if (adres.postaKutusu) xml += `<postaKutusu>${adres.postaKutusu}</postaKutusu>`;
    if (adres.kapiNo) xml += `<kapiNo>${adres.kapiNo}</kapiNo>`;
    if (adres.caddeSokak) xml += `<caddeSokak>${adres.caddeSokak}</caddeSokak>`;
    if (adres.blok) xml += `<blok>${adres.blok}</blok>`;
    if (adres.binaAdi) xml += `<binaAdi>${adres.binaAdi}</binaAdi>`;
    if (adres.binaNo) xml += `<binaNo>${adres.binaNo}</binaNo>`;
    
    xml += `<ilce>${adres.ilce}</ilce>`;
    xml += `<sehir>${adres.sehir}</sehir>`;
    
    if (adres.postaKodu) xml += `<postaKodu>${adres.postaKodu}</postaKodu>`;
    if (adres.kasabaKoy) xml += `<kasabaKoy>${adres.kasabaKoy}</kasabaKoy>`;
    if (adres.mahalle) xml += `<mahalle>${adres.mahalle}</mahalle>`;
    
    xml += `<ulke>${adres.ulke}</ulke>`;
    xml += '</postaAdresi>';
    
    return xml;
  }

  private static buildTarafElement(name: string, taraf: TarafBilgileriTipi): string {
    let xml = `<${name}>`;
    
    if (taraf.webSitesi) xml += `<webSitesi>${taraf.webSitesi}</webSitesi>`;
    if (taraf.naceKodu) xml += `<naceKodu>${taraf.naceKodu}</naceKodu>`;
    
    // aliciSaticiTanimi - her zaman array
    for (const tanim of taraf.aliciSaticiTanimi) {
      xml += this.buildIdElement('aliciSaticiTanimi', tanim);
    }
    
    if (taraf.unvan) xml += `<unvan>${taraf.unvan}</unvan>`;
    
    xml += this.buildAdresElement(taraf.postaAdresi);
    
    if (taraf.vergiDairesi) xml += `<vergiDairesi>${taraf.vergiDairesi}</vergiDairesi>`;
    if (taraf.etiket) xml += `<etiket>${taraf.etiket}</etiket>`;
    
    xml += `</${name}>`;
    return xml;
  }

  private static buildMalHizmetElement(malHizmet: MalHizmetBilgileriTipi): string {
    let xml = '<malHizmetBilgileri>';
    
    if (malHizmet.aciklama) xml += `<aciklama>${malHizmet.aciklama}</aciklama>`;
    xml += `<adi>${malHizmet.adi}</adi>`;
    if (malHizmet.anahtarKelime) xml += `<anahtarKelime>${malHizmet.anahtarKelime}</anahtarKelime>`;
    if (malHizmet.markaAdi) xml += `<markaAdi>${malHizmet.markaAdi}</markaAdi>`;
    if (malHizmet.modelAdi) xml += `<modelAdi>${malHizmet.modelAdi}</modelAdi>`;
    
    if (malHizmet.aliciUrunKodu) xml += this.buildIdElement('aliciUrunKodu', malHizmet.aliciUrunKodu);
    if (malHizmet.saticiUrunKodu) xml += this.buildIdElement('saticiUrunKodu', malHizmet.saticiUrunKodu);
    if (malHizmet.ureticiUrunKodu) xml += this.buildIdElement('ureticiUrunKodu', malHizmet.ureticiUrunKodu);
    
    if (malHizmet.alternatifUrunKodu) {
      for (const kod of malHizmet.alternatifUrunKodu) {
        xml += this.buildIdElement('alternatifUrunKodu', kod);
      }
    }
    
    if (malHizmet.mensei) xml += `<mensei>${malHizmet.mensei}</mensei>`;
    
    if (malHizmet.emtiaSiniflandirmaBilgisi) {
      for (const sinif of malHizmet.emtiaSiniflandirmaBilgisi) {
        xml += `<emtiaSiniflandirmaBilgisi>${sinif}</emtiaSiniflandirmaBilgisi>`;
      }
    }
    
    xml += '</malHizmetBilgileri>';
    return xml;
  }

  private static buildVergiElement(vergi: VergiTipi): string {
    let xml = '<vergi>';
    
    if (vergi.matrah) xml += this.buildTutarElement('matrah', vergi.matrah);
    xml += this.buildTutarElement('vergiTutari', vergi.vergiTutari);
    if (vergi.sira) xml += `<sira>${vergi.sira}</sira>`;
    if (vergi.belgeParaBilirmiVergiTutari) xml += this.buildTutarElement('belgeParaBilirmiVergiTutari', vergi.belgeParaBilirmiVergiTutari);
    if (vergi.oran) xml += `<oran>${vergi.oran}</oran>`;
    if (vergi.miktarTarifeBilgisi) xml += this.buildMiktarElement('miktarTarifeBilgisi', vergi.miktarTarifeBilgisi);
    if (vergi.tutarTarifeBilgisi) xml += this.buildTutarElement('tutarTarifeBilgisi', vergi.tutarTarifeBilgisi);
    
    // Vergi türü
    xml += '<vergiTuru>';
    if (vergi.vergiTuru.vergiTuruAdi) xml += `<vergiTuruAdi>${vergi.vergiTuru.vergiTuruAdi}</vergiTuruAdi>`;
    if (vergi.vergiTuru.muafiyetSebebiKodu) xml += `<muafiyetSebebiKodu>${vergi.vergiTuru.muafiyetSebebiKodu}</muafiyetSebebiKodu>`;
    if (vergi.vergiTuru.muafiyetSebebi) xml += `<muafiyetSebebi>${vergi.vergiTuru.muafiyetSebebi}</muafiyetSebebi>`;
    if (vergi.vergiTuru.vergiAdi) xml += `<vergiAdi>${vergi.vergiTuru.vergiAdi}</vergiAdi>`;
    if (vergi.vergiTuru.vergikodu) xml += `<vergikodu>${vergi.vergiTuru.vergikodu}</vergikodu>`;
    xml += '</vergiTuru>';
    
    xml += '</vergi>';
    return xml;
  }

  private static buildVergilerElement(name: string, vergiler: VergilerTipi): string {
    let xml = `<${name}>`;
    xml += this.buildTutarElement('toplamVergiTutari', vergiler.toplamVergiTutari);
    
    if (vergiler.vergi) {
      for (const vergi of vergiler.vergi) {
        xml += this.buildVergiElement(vergi);
      }
    }
    
    xml += `</${name}>`;
    return xml;
  }

  private static buildFaturaSatirElement(satir: FaturaSatirTipi): string {
    let xml = '<faturaSatir>';
    
    // CS-XML belgelendirmesine göre DOĞRU faturaSatir element sıralaması:
    xml += this.buildIdElement('siraNo', satir.siraNo);
    
    if (satir.not) {
      for (const not of satir.not) {
        xml += `<not>${not}</not>`;
      }
    }
    
    xml += this.buildMiktarElement('miktar', satir.miktar);
    xml += this.buildTutarElement('malHizmetMiktari', satir.malHizmetMiktari);
    
    // DOĞRU SIRA: Vergiler malHizmetBilgileri'nden ÖNCE gelmeli
    if (satir.vergiler) {
      xml += this.buildVergilerElement('vergiler', satir.vergiler);
    }
    
    if (satir.tevkifatlar) {
      for (const tevkifat of satir.tevkifatlar) {
        xml += this.buildVergilerElement('tevkifatlar', tevkifat);
      }
    }
    
    // DOĞRU SIRA: malHizmetBilgileri ve birimFiyat EN SONDA
    xml += this.buildMalHizmetElement(satir.malHizmetBilgileri);
    xml += this.buildTutarElement('birimFiyat', satir.birimFiyat);
    
    // altFaturaSatiri burada olacak (şu anda yok ama opsiyonel)
    
    xml += '</faturaSatir>';
    return xml;
  }

  private static buildParasalToplamlarElement(toplamlar: ParasalToplamlarTipi): string {
    let xml = '<parasalToplamlar>';
    
    xml += this.buildTutarElement('toplamMalHizmetTutari', toplamlar.toplamMalHizmetTutari);
    xml += this.buildTutarElement('vergiHaricTutar', toplamlar.vergiHaricTutar);
    xml += this.buildTutarElement('vergiDahilTutar', toplamlar.vergiDahilTutar);
    
    if (toplamlar.toplamIskontoTutari) xml += this.buildTutarElement('toplamIskontoTutari', toplamlar.toplamIskontoTutari);
    if (toplamlar.toplamArtirimTutari) xml += this.buildTutarElement('toplamArtirimTutari', toplamlar.toplamArtirimTutari);
    if (toplamlar.yuvarlamaTutari) xml += this.buildTutarElement('yuvarlamaTutari', toplamlar.yuvarlamaTutari);
    
    xml += this.buildTutarElement('odenecekTutar', toplamlar.odenecekTutar);
    
    xml += '</parasalToplamlar>';
    return xml;
  }

  public static buildFaturaXml(fatura: FaturaTipi): string {
    let xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
    xml += '<fatura>'; // QNB sistemi namespace'siz bekliyor
    
    if (fatura.xsdVersion) xml += `<xsdVersion>${fatura.xsdVersion}</xsdVersion>`;
    if (fatura.ublVersionNumarasi) xml += `<ublVersionNumarasi>${fatura.ublVersionNumarasi}</ublVersionNumarasi>`;
    if (fatura.ublOzellestirmeNumarasi) xml += `<ublOzellestirmeNumarasi>${fatura.ublOzellestirmeNumarasi}</ublOzellestirmeNumarasi>`;
    if (fatura.tercihEdilenSeriNo) xml += `<tercihEdilenSeriNo>${fatura.tercihEdilenSeriNo}</tercihEdilenSeriNo>`;
    
    xml += `<faturaTuru>${fatura.faturaTuru}</faturaTuru>`;
    if (fatura.faturaNo) xml += `<faturaNo>${fatura.faturaNo}</faturaNo>`;
    if (fatura.suret) xml += `<suret>${fatura.suret}</suret>`;
    if (fatura.faturaId) xml += `<faturaId>${fatura.faturaId}</faturaId>`;
    
    xml += `<faturaTarihi>${fatura.faturaTarihi.value}</faturaTarihi>`;
    if (fatura.faturaZamani) xml += `<faturaZamani>${fatura.faturaZamani.value}</faturaZamani>`;
    
    xml += `<faturaTipi>${fatura.faturaTipi}</faturaTipi>`;
    
    if (fatura.faturaNot) {
      for (const not of fatura.faturaNot) {
        xml += `<faturaNot>${not}</faturaNot>`;
      }
    }
    
    xml += `<paraBirimi>${fatura.paraBirimi}</paraBirimi>`;
    if (fatura.vergiParaBirimi) xml += `<vergiParaBirimi>${fatura.vergiParaBirimi}</vergiParaBirimi>`;
    if (fatura.fiyatlandirmaParaBirimi) xml += `<fiyatlandirmaParaBirimi>${fatura.fiyatlandirmaParaBirimi}</fiyatlandirmaParaBirimi>`;
    if (fatura.odemeParaBirimi) xml += `<odemeParaBirimi>${fatura.odemeParaBirimi}</odemeParaBirimi>`;
    if (fatura.alternatifOdemeParaBirimi) xml += `<alternatifOdemeParaBirimi>${fatura.alternatifOdemeParaBirimi}</alternatifOdemeParaBirimi>`;
    if (fatura.altFaturaTipi) xml += `<altFaturaTipi>${fatura.altFaturaTipi}</altFaturaTipi>`;

    // XSD'ye göre ÖNCE taraf bilgileri gelmeli
    xml += this.buildTarafElement('satici', fatura.satici);
    xml += this.buildTarafElement('alici', fatura.alici);
    
    // XSD'ye göre odemeSekli ve odemeKosullari satici/alici'den SONRA gelmeli
    if (fatura.odemeSekli) {
      xml += `<odemeSekli>`;
      xml += `<kod>${fatura.odemeSekli.kod}</kod>`;
      if (fatura.odemeSekli.aliciHesapBilgileri) {
        xml += `<aliciHesapBilgileri>`;
        xml += `<hesapNo>${fatura.odemeSekli.aliciHesapBilgileri.hesapNo}</hesapNo>`;
        xml += `<hesapDovizBirimi>${fatura.odemeSekli.aliciHesapBilgileri.hesapDovizBirimi}</hesapDovizBirimi>`;
        if (fatura.odemeSekli.aliciHesapBilgileri.aciklama) xml += `<aciklama>${fatura.odemeSekli.aliciHesapBilgileri.aciklama}</aciklama>`;
        xml += `</aliciHesapBilgileri>`;
      }
      xml += `</odemeSekli>`;
    }

    if (fatura.odemeKosullari) {
      xml += `<odemeKosullari>`;
      if (fatura.odemeKosullari.not) xml += `<not>${fatura.odemeKosullari.not}</not>`;
      if (fatura.odemeKosullari.sonOdemeTarihi) xml += `<sonOdemeTarihi>${fatura.odemeKosullari.sonOdemeTarihi}</sonOdemeTarihi>`;
      xml += `</odemeKosullari>`;
    }
    
    // CS-XML belgelendirmesine göre DOĞRU sıralama:
    // 1. iskontoArtirim (35) - optional
    // 2. vergiDovizKuru (36) - optional 
    // 3. fiyatlandirmaDovizKuru (37) - optional
    // 4. odemeDovizKuru (38) - optional
    // 5. alternatifOdemeDovizKuru (39) - optional
    
    // 6. vergiler (40) - ZORUNLU
    for (const vergiler of fatura.vergiler) {
      xml += this.buildVergilerElement('vergiler', vergiler);
    }
    
    // 7. tevkifatlar (41) - optional
    if (fatura.tevkifatlar) {
      for (const tevkifat of fatura.tevkifatlar) {
        xml += this.buildVergilerElement('tevkifatlar', tevkifat);
      }
    }
    
    // 8. parasalToplamlar (42) - ZORUNLU
    xml += this.buildParasalToplamlarElement(fatura.parasalToplamlar);
    
    // 9. faturaSatir (43) - ZORUNLU EN SON!
    for (const satir of fatura.faturaSatir) {
      xml += this.buildFaturaSatirElement(satir);
    }
    
    xml += '</fatura>';
    return xml;
  }

  // Validation fonksiyonu
  public static validateFatura(fatura: FaturaTipi): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // Zorunlu alanları kontrol et
    if (!fatura.faturaTuru) errors.push('faturaTuru zorunlu');
    if (!fatura.faturaTarihi?.value) errors.push('faturaTarihi zorunlu');
    if (!fatura.faturaTipi) errors.push('faturaTipi zorunlu');
    if (!fatura.paraBirimi) errors.push('paraBirimi zorunlu');
    if (!fatura.satici) errors.push('satici bilgileri zorunlu');
    if (!fatura.alici) errors.push('alici bilgileri zorunlu');
    if (!fatura.vergiler || fatura.vergiler.length === 0) errors.push('vergiler zorunlu');
    if (!fatura.parasalToplamlar) errors.push('parasalToplamlar zorunlu');
    if (!fatura.faturaSatir || fatura.faturaSatir.length === 0) errors.push('faturaSatir zorunlu');
    
    // Fatura türü kontrolü
    const validFaturaTuru = ['TEMELFATURA', 'TICARIFATURA'];
    if (fatura.faturaTuru && !validFaturaTuru.includes(fatura.faturaTuru)) {
      errors.push('faturaTuru geçersiz (TEMELFATURA veya TICARIFATURA olmalı)');
    }
    
    // Fatura tipi kontrolü
    const validFaturaTipi = ['SATIS', 'ISTISNA', 'OZELMATRAH', 'ARACTESCIL', 'TEVKIFAT', 'IADE'];
    if (fatura.faturaTipi && !validFaturaTipi.includes(fatura.faturaTipi)) {
      errors.push('faturaTipi geçersiz');
    }
    
    // Tarih formatı kontrolü
    if (fatura.faturaTarihi?.value && !/^\d{4}-\d{2}-\d{2}$/.test(fatura.faturaTarihi.value)) {
      errors.push('faturaTarihi formatı geçersiz (YYYY-MM-DD olmalı)');
    }
    
    // Zaman formatı kontrolü
    if (fatura.faturaZamani?.value && !/^\d{2}:\d{2}:\d{2}$/.test(fatura.faturaZamani.value)) {
      errors.push('faturaZamani formatı geçersiz (HH:MM:SS olmalı)');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// Yardımcı fonksiyonlar
export function createSampleFatura(): FaturaTipi {
  return {
    xsdVersion: "1.0",
    ublVersionNumarasi: "2.1",
    ublOzellestirmeNumarasi: "TR1.2",
    faturaTuru: "TICARIFATURA", // QNB örneğinde TICARIFATURA
    faturaTarihi: { value: "2025-07-10" },
    faturaZamani: { value: "10:30:00" },
    faturaTipi: "SATIS",
    paraBirimi: "TRY",
    satici: {
      aliciSaticiTanimi: [{ value: "0010963799", schemeId: "VKN" }],
      unvan: "QNB Test Firma (Satici)",
      postaAdresi: {
        ilce: "Beşiktaş",
        sehir: "Istanbul", 
        ulke: "Türkiye",
        caddeSokak: "Satici Test Caddesi No:1",
        mahalle: "Test Mahallesi"
      },
      vergiDairesi: "Beşiktaş Vergi Dairesi"
      // etiket alanını kaldırdık - QNB sisteminde kayıtlı değildi
    },
    alici: {
      aliciSaticiTanimi: [{ value: "0010963800", schemeId: "VKN" }],
      unvan: "QNB Test Müşteri (Alici)",
      postaAdresi: {
        ilce: "Kadıköy",
        sehir: "Istanbul",
        ulke: "Türkiye", 
        caddeSokak: "Alici Test Sokak No:2",
        mahalle: "Müşteri Mahallesi"
      },
      vergiDairesi: "Kadıköy Vergi Dairesi"
      // etiket alanını kaldırdık - QNB sisteminde kayıtlı değildi
    },
    // QNB XSD'ye göre zorunlu ödeme bilgileri
    odemeSekli: {
      kod: "1",
      aliciHesapBilgileri: {
        hesapNo: "5652214414",
        hesapDovizBirimi: "TRL",
        aciklama: "QNB Test Bankası Beşiktaş Şubesi TL Hesabı"
      }
    },
    odemeKosullari: {
      not: "Fatura düzenleme tarihinden itibaren 20 gün içerisinde ödenecektir.",
      sonOdemeTarihi: "2025-07-30"
    },
    vergiler: [{
      toplamVergiTutari: { value: 180.00, paraBirimi: "TRY" },
      vergi: [{
        matrah: { value: 1000.00, paraBirimi: "TRY" },
        vergiTutari: { value: 180.00, paraBirimi: "TRY" },
        oran: 18,
        vergiTuru: {
          vergiAdi: "KDV",
          vergikodu: "0015"
        }
      }]
    }],
    parasalToplamlar: {
      toplamMalHizmetTutari: { value: 1000.00, paraBirimi: "TRY" },
      vergiHaricTutar: { value: 1000.00, paraBirimi: "TRY" },
      vergiDahilTutar: { value: 1180.00, paraBirimi: "TRY" },
      odenecekTutar: { value: 1180.00, paraBirimi: "TRY" }
    },
    faturaSatir: [{
      siraNo: { value: "1" },
      miktar: { value: 1, birimKodu: "C62" },
      malHizmetMiktari: { value: 1000.00, paraBirimi: "TRY" },
      malHizmetBilgileri: {
        adi: "Test Ürün",
        aciklama: "Test açıklama"
      },
      birimFiyat: { value: 1000.00, paraBirimi: "TRY" },
      vergiler: {
        toplamVergiTutari: { value: 180.00, paraBirimi: "TRY" },
        vergi: [{
          matrah: { value: 1000.00, paraBirimi: "TRY" },
          vergiTutari: { value: 180.00, paraBirimi: "TRY" },
          oran: 18,
          vergiTuru: {
            vergiAdi: "KDV",
            vergikodu: "0015"
          }
        }]
      }
    }]
  };
}

// İkinci test faturası - Daha karmaşık örnek
export function createSampleFatura2(): FaturaTipi {
  return {
    xsdVersion: "1.0",
    ublVersionNumarasi: "2.1", 
    ublOzellestirmeNumarasi: "TR1.2",
    faturaTuru: "TICARIFATURA",
    faturaTarihi: { value: "2025-01-15" },
    faturaZamani: { value: "14:45:30" },
    faturaTipi: "SATIS",
    paraBirimi: "TRY",
    satici: {
      aliciSaticiTanimi: [{ value: "0010963799", schemeId: "VKN" }],
      unvan: "ABC Teknoloji Şirketi",
      postaAdresi: {
        ilce: "Şişli",
        sehir: "Istanbul",
        ulke: "Türkiye",
        caddeSokak: "Teknoloji Caddesi No:123",
        mahalle: "İş Merkezi Mahallesi",
        binaNo: "A Blok",
        postaKodu: "34394"
      },
      vergiDairesi: "Şişli Vergi Dairesi"
      // etiket alanını kaldırdık - QNB sisteminde kayıtlı değildi
    },
    alici: {
      aliciSaticiTanimi: [{ value: "0010963800", schemeId: "VKN" }],
      unvan: "XYZ Perakende Mağazası",
      postaAdresi: {
        ilce: "Ümraniye",
        sehir: "Istanbul", 
        ulke: "Türkiye",
        caddeSokak: "Ticaret Sokak No:456",
        mahalle: "Merkez Mahallesi",
        binaNo: "15",
        postaKodu: "34768"
      },
      vergiDairesi: "Ümraniye Vergi Dairesi"
      // etiket alanını kaldırdık - QNB sisteminde kayıtlı değildi
    },
    vergiler: [{
      toplamVergiTutari: { value: 1386.00, paraBirimi: "TRY" },
      vergi: [{
        matrah: { value: 7700.00, paraBirimi: "TRY" },
        vergiTutari: { value: 1386.00, paraBirimi: "TRY" },
        oran: 18,
        vergiTuru: {
          vergiAdi: "KDV",
          vergikodu: "0015"
        }
      }]
    }],
    parasalToplamlar: {
      toplamMalHizmetTutari: { value: 8000.00, paraBirimi: "TRY" },
      vergiHaricTutar: { value: 7700.00, paraBirimi: "TRY" },
      vergiDahilTutar: { value: 9086.00, paraBirimi: "TRY" },
      toplamIskontoTutari: { value: 300.00, paraBirimi: "TRY" },
      odenecekTutar: { value: 9086.00, paraBirimi: "TRY" }
    },
    faturaSatir: [
      {
        siraNo: { value: "1" },
        miktar: { value: 2, birimKodu: "C62" },
        malHizmetMiktari: { value: 3000.00, paraBirimi: "TRY" },
        malHizmetBilgileri: {
          adi: "Laptop Bilgisayar",
          aciklama: "Dell Vostro 15 3000 Series, Intel i5 işlemci, 8GB RAM"
        },
        birimFiyat: { value: 1500.00, paraBirimi: "TRY" },
        vergiler: {
          toplamVergiTutari: { value: 540.00, paraBirimi: "TRY" },
          vergi: [{
            matrah: { value: 3000.00, paraBirimi: "TRY" },
            vergiTutari: { value: 540.00, paraBirimi: "TRY" },
            oran: 18,
            vergiTuru: {
              vergiAdi: "KDV",
              vergikodu: "0015"
            }
          }]
        }
      },
      {
        siraNo: { value: "2" },
        miktar: { value: 5, birimKodu: "C62" },
        malHizmetMiktari: { value: 2500.00, paraBirimi: "TRY" },
        malHizmetBilgileri: {
          adi: "Kablosuz Mouse",
          aciklama: "Logitech MX Master 3, Ergonomik tasarım"
        },
        birimFiyat: { value: 500.00, paraBirimi: "TRY" },
        vergiler: {
          toplamVergiTutari: { value: 405.00, paraBirimi: "TRY" },
          vergi: [{
            matrah: { value: 2250.00, paraBirimi: "TRY" },
            vergiTutari: { value: 405.00, paraBirimi: "TRY" },
            oran: 18,
            vergiTuru: {
              vergiAdi: "KDV",
              vergikodu: "0015"
            }
          }]
        }
      },
      {
        siraNo: { value: "3" },
        miktar: { value: 3, birimKodu: "C62" },
        malHizmetMiktari: { value: 2500.00, paraBirimi: "TRY" },
        malHizmetBilgileri: {
          adi: "USB-C Hub",
          aciklama: "Çoklu port hub, HDMI ve USB 3.0 destekli"
        },
        birimFiyat: { value: 833.33, paraBirimi: "TRY" },
        vergiler: {
          toplamVergiTutari: { value: 441.00, paraBirimi: "TRY" },
          vergi: [{
            matrah: { value: 2450.00, paraBirimi: "TRY" },
            vergiTutari: { value: 441.00, paraBirimi: "TRY" },
            oran: 18,
            vergiTuru: {
              vergiAdi: "KDV",
              vergikodu: "0015"
            }
          }]
        }
      }
    ],
    odemeSekli: {
      kod: "2",
      aliciHesapBilgileri: {
        hesapNo: "1234567890123456",
        hesapDovizBirimi: "TRL",
        aciklama: "Garanti BBVA Teknoloji Şubesi İş Hesabı"
      }
    },
    odemeKosullari: {
      not: "Mal tesliminden itibaren 30 gün vadeli ödeme.",
      sonOdemeTarihi: "2025-02-14"
    }
  };
} 