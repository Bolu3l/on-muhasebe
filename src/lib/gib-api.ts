import * as soap from 'soap';
import { CookieJar } from 'tough-cookie';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

// QNB GİB API Configuration
const GIB_CONFIG = {
  // Test Environment URLs
  USER_SERVICE_WSDL: 'https://erpefaturatest1.qnbesolutions.com.tr/efatura/ws/userService?wsdl',
  CONNECTOR_SERVICE_WSDL: 'https://erpefaturatest1.qnbesolutions.com.tr/efatura/ws/connectorService?wsdl',
  
  // Test Account Credentials
  TEST_ACCOUNT_1: {
    VKN: '0010963799',
    USERNAME: '0010963799',
    PASSWORD: 'Bolu3.12'
  },
  
  TEST_ACCOUNT_2: {
    VKN: '0010963800',
    USERNAME: '0010963800', 
    PASSWORD: 'Bolu3.12'
  },
  
  // ERP Code (Fixed for all companies)
  ERP_CODE: 'CKN31030'
};

// SOAP Client Interface
interface GIBUserService {
  wsLoginAsync(userId: string, password: string, lang: string): Promise<void>;
  logoutAsync(): Promise<void>;
}

interface GIBConnectorService {
  erpBilgileriBelirleAsync(vergiTcKimlikNo: string, erpBilgileri: ERPBilgileri): Promise<void>;
  belgeGonderExtAsync(parametreler: GidenBelgeParametreleri): Promise<BelgeGonderResponse>;
  gidenBelgeDurumSorgulaAsync(vergiTcKimlikNo: string, belgeOid: string): Promise<GidenBelgeDurum>;
  gelenBelgeleriAlExtAsync(parametreler: GelenBelgeParametreleri): Promise<ServiceReturnType[]>;
}

// Data Types
interface ERPBilgileri {
  kod: string;
  aciklama?: string;
}

interface GidenBelgeParametreleri {
  vergiTcKimlikNo: string;
  erpKodu: string;
  belgeTuru: string;
  belgeNo: string;
  veri: Buffer; // Base64 encoded UBL XML
  belgeHash?: string;
  mimeType?: string;
  belgeVersiyon?: string;
  gonderenEtiket?: string;
  alanEtiket?: string;
  subeKodu?: string;
}

interface BelgeGonderResponse {
  belgeOid: string;
}

interface GidenBelgeDurum {
  ettn: string;
  belgeNo: string;
  durum: number;
  gonderimDurumu: number;
  gonderimTarihi: string;
  yanitDurumu: number;
  yanitTarihi: string;
  aciklama: string;
}

interface GelenBelgeParametreleri {
  vergiTcKimlikNo: string;
  erpKodu: string;
  belgeTuru: string;
  sonAlinanBelgeSiraNumarasi?: string;
}

interface ServiceReturnType {
  [key: string]: any;
}

export interface BelgeGonderExtParams {
  belgeNo: string;
  vergiTcKimlikNo: string;
  belgeTuru: 'FATURA' | 'FATURA_UBL' | 'IRSALIYE' | 'IRSALIYE_UBL';
  veri: string; // XML content
  belgeHash: string;
  mimeType: 'application/xml';
  belgeVersiyon: '1.0' | '1.2' | '3.0';
}

export interface BelgeGonderExtResponse {
  success: boolean;
  message?: string;
  result?: any;
  error?: string;
}

/**
 * Create WS-Security header for SOAP requests
 * Based on QNB's PHP implementation
 */
function createWSSecurityHeader(username: string, password: string): string {
  const tmCreated = new Date().toISOString();
  const tmExpires = new Date(Date.now() + 180000).toISOString(); // 3 minutes from now
  
  const simpleNonce = Math.random().toString();
  const encodedNonce = Buffer.from(simpleNonce).toString('base64');
  
  // Create password digest: SHA1(nonce + created + password)
  const passDigest = crypto
    .createHash('sha1')
    .update(simpleNonce + tmCreated + password)
    .digest('base64');

  const wsSecurityHeader = `
    <wsse:Security xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd" 
                   xmlns:wsu="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd">
      <wsu:Timestamp wsu:Id="Timestamp-28">
        <wsu:Created>${tmCreated}</wsu:Created>
        <wsu:Expires>${tmExpires}</wsu:Expires>
      </wsu:Timestamp>
      <wsse:UsernameToken>
        <wsse:Username>${username}</wsse:Username>
        <wsse:Password Type="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordDigest">${passDigest}</wsse:Password>
        <wsse:Nonce EncodingType="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary">${encodedNonce}</wsse:Nonce>
        <wsu:Created>${tmCreated}</wsu:Created>
      </wsse:UsernameToken>
    </wsse:Security>
  `;

  return wsSecurityHeader.replace(/\s+/g, ' ').trim();
}

// Main GIB API Class
export class GIBApi {
  private cookieJar: CookieJar;
  private userServiceClient: GIBUserService | null = null;
  private connectorServiceClient: GIBConnectorService | null = null;
  private isLoggedIn = false;
  private currentVKN: string | null = null;

  constructor() {
    this.cookieJar = new CookieJar();
  }

  /**
   * Initialize SOAP clients with cookie support
   */
  async initialize(): Promise<void> {
    try {
      console.log('🔧 GİB API clients initialize ediliyor...');
      
      // Shared cookie jar için options
      const sharedOptions = {
        jar: this.cookieJar
      };

      // User Service Client (Login için)
      this.userServiceClient = await soap.createClientAsync(GIB_CONFIG.USER_SERVICE_WSDL, {
        wsdl_options: sharedOptions
      }) as unknown as GIBUserService;

      // Connector Service Client (Ana işlemler için)  
      this.connectorServiceClient = await soap.createClientAsync(GIB_CONFIG.CONNECTOR_SERVICE_WSDL, {
        wsdl_options: sharedOptions
      }) as unknown as GIBConnectorService;

      console.log('✅ GİB API clients başarıyla initialize edildi');
    } catch (error) {
      console.error('❌ GİB API clients initialize edilemedi:', error);
      throw error;
    }
  }

  /**
   * Login to GIB system with cookie-based authentication
   * C# equivalent: login.wsLogin("KULLANICI ADI", "ŞİFRE", "tr");
   */
  async login(username: string, password: string, vkn: string): Promise<void> {
    try {
      if (!this.userServiceClient || !this.connectorServiceClient) {
        throw new Error('SOAP clients not initialized. Call initialize() first.');
      }

      console.log(`🔐 GİB sistemine login yapılıyor - VKN: ${vkn}, Username: ${username}`);
      
      // Login işlemi (Cookie otomatik olarak saklanır)
      const credentials = {
        userId: username,
        password: password,
        lang: 'tr'
      };
      
      const loginResult = await (this.userServiceClient as any).wsLoginAsync(credentials);
      console.log('🔍 Login result success');
      
      // Cookie'yi connector client'a kopyala
      const userClient = this.userServiceClient as any;
      const connectorClient = this.connectorServiceClient as any;
      
             if (userClient.lastResponseHeaders && userClient.lastResponseHeaders['set-cookie']) {
         console.log('🍪 Cookieleri connector servicee kopyalıyor...');
         // Cookieleri manuel olarak set et
         connectorClient.addHttpHeader('Cookie', userClient.lastResponseHeaders['set-cookie'].join('; '));
      }

      this.isLoggedIn = true;
      this.currentVKN = vkn;
      
      console.log('✅ GİB sistemine başarıyla login yapıldı');
      
      // Login sonrası ERP bilgilerini ayarla
      await this.setERPInfo(vkn);
      
    } catch (error: any) {
      console.error('❌ GİB login başarısız:', error.message);
      console.error('❌ Error type:', error.constructor.name);
      if (error.body) {
        console.error('❌ Error body:', error.body);
      }
      this.isLoggedIn = false;
      this.currentVKN = null;
      throw error;
    }
  }

  /**
   * Set ERP information for the session
   * C# equivalent: methods.erpBilgileriBelirle("VKN", erbilgileri_belirle);
   */
  private async setERPInfo(vkn: string): Promise<void> {
    try {
      if (!this.connectorServiceClient) {
        throw new Error('Connector service client not initialized.');
      }

      console.log(`⚙️ ERP bilgileri belirleniyor - VKN: ${vkn}, ERP Kodu: ${GIB_CONFIG.ERP_CODE}`);
      
      const erpBilgileri: ERPBilgileri = {
        kod: GIB_CONFIG.ERP_CODE,
        aciklama: 'QNB eFinans ERP Entegrasyonu'
      };

      // SOAP parametreleri object olarak geç
      const erpParams = {
        vergiTcKimlikNo: vkn,
        erpBilgileri: erpBilgileri
      };

      await (this.connectorServiceClient as any).erpBilgileriBelirleAsync(erpParams);
      
      console.log('✅ ERP bilgileri başarıyla ayarlandı');
    } catch (error: any) {
      console.error('❌ ERP bilgileri ayarlanamadı:', error.message);
      throw error;
    }
  }

  /**
   * Test login with predefined test account
   */
  async testLogin(accountNumber: 1 | 2 = 1): Promise<void> {
    const testAccount = accountNumber === 1 ? GIB_CONFIG.TEST_ACCOUNT_1 : GIB_CONFIG.TEST_ACCOUNT_2;
    
    await this.login(testAccount.USERNAME, testAccount.PASSWORD, testAccount.VKN);
  }

  /**
   * Logout from GIB system
   */
  async logout(): Promise<void> {
    try {
      if (!this.userServiceClient) {
        throw new Error('User service client not initialized.');
      }

      console.log('🔐 GİB sisteminden logout yapılıyor...');
      
      await this.userServiceClient.logoutAsync();
      
      this.isLoggedIn = false;
      this.currentVKN = null;
      
      console.log('✅ GİB sisteminden başarıyla logout yapıldı');
    } catch (error) {
      console.error('❌ GİB logout başarısız:', error);
      throw error;
    }
  }

  /**
   * Send e-invoice using belgeGonderExt method
   */
  async sendInvoice(invoiceData: GidenBelgeParametreleri): Promise<BelgeGonderResponse> {
    try {
      if (!this.isLoggedIn || !this.connectorServiceClient) {
        throw new Error('Not logged in or connector service not initialized.');
      }

      console.log(`📤 E-fatura gönderiliyor - Belge No: ${invoiceData.belgeNo}`);
      
      // ERP kodunu otomatik olarak ekle
      invoiceData.erpKodu = GIB_CONFIG.ERP_CODE;
      
      const response = await this.connectorServiceClient.belgeGonderExtAsync(invoiceData);
      
      console.log(`✅ E-fatura başarıyla gönderildi - Belge OID: ${response.belgeOid}`);
      
      return response;
    } catch (error) {
      console.error('❌ E-fatura gönderim başarısız:', error);
      throw error;
    }
  }

  /**
   * Belge gönderme - Extended version with WS-Security
   */
  async sendDocumentExt(params: BelgeGonderExtParams): Promise<BelgeGonderExtResponse> {
    try {
      if (!this.connectorServiceClient) {
        throw new Error('Connector service client not initialized');
      }

      console.log('Belge gönderiliyor...', {
        belgeNo: params.belgeNo,
        vergiTcKimlikNo: params.vergiTcKimlikNo,
        belgeTuru: params.belgeTuru,
        belgeVersiyon: params.belgeVersiyon,
        veriSize: params.veri.length,
        belgeHash: params.belgeHash
      });

      // QNB basit WS-Security header formatı
      const testAccount = GIB_CONFIG.TEST_ACCOUNT_1;
      
      console.log('🔐 QNB WS-Security header ayarlanıyor...');
      
      // QNB'nin gösterdiği basit format
      const wsSecurityHeader = {
        'wsse:Security': {
          attributes: {
            'xmlns:wsse': 'http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd'
          },
          'wsse:UsernameToken': {
            'wsse:Username': testAccount.USERNAME,
            'wsse:Password': testAccount.PASSWORD
          }
        }
      };
      
      // Header'ı temizle ve yeni ekle
      try {
        (this.connectorServiceClient as any).clearSoapHeaders && (this.connectorServiceClient as any).clearSoapHeaders();
        (this.connectorServiceClient as any).addSoapHeader(wsSecurityHeader);
        console.log('✅ QNB WS-Security header eklendi');
      } catch (headerError) {
        console.error('🔐 Header ekleme hatası:', headerError);
        
        // Alternative: setSecurity metodu dene
        try {
          const WSSecurity = require('soap').WSSecurity;
          if (WSSecurity) {
            const wsSecurity = new WSSecurity(testAccount.USERNAME, testAccount.PASSWORD);
            (this.connectorServiceClient as any).setSecurity(wsSecurity);
            console.log('✅ setSecurity ile WSSecurity ayarlandı');
        }
        } catch (wsError) {
          console.error('🔐 setSecurity hatası:', wsError);
        }
      }

      const result = await (this.connectorServiceClient as any).belgeGonderExtAsync({
        parametreler: {
          belgeNo: params.belgeNo,
          vergiTcKimlikNo: params.vergiTcKimlikNo,
          belgeTuru: params.belgeTuru,
          veri: params.veri,
          belgeHash: params.belgeHash,
          mimeType: params.mimeType,
          belgeVersiyon: params.belgeVersiyon
        }
      });

      console.log('Belge gönderme sonucu:', result);

      return {
        success: true,
        result: result,
        message: 'Belge başarıyla gönderildi'
      };

    } catch (error) {
      console.error('Belge gönderme hatası:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
        message: 'Belge gönderme başarısız'
      };
    }
  }

  /**
   * XML içeriğinden hash oluşturma
   */
  static generateHash(xmlContent: string): string {
    return crypto.createHash('md5').update(xmlContent).digest('hex');
  }

  /**
   * Benzersiz belge numarası oluşturma
   */
  static generateBelgeNo(): string {
    return uuidv4();
  }

  /**
   * Fatura XML'ini GIB'e gönderme - High level wrapper
   */
  async sendInvoiceXml(xmlContent: string, vergiTcKimlikNo: string): Promise<BelgeGonderExtResponse> {
    try {
      const belgeNo = GIBApi.generateBelgeNo();
      const belgeHash = GIBApi.generateHash(xmlContent);

      const params: BelgeGonderExtParams = {
        belgeNo,
        vergiTcKimlikNo,
        belgeTuru: 'FATURA_UBL',
        veri: xmlContent,
        belgeHash,
        mimeType: 'application/xml',
        belgeVersiyon: '1.2'
      };

      return await this.sendDocumentExt(params);

    } catch (error) {
      console.error('Fatura XML gönderme hatası:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Bilinmeyen hata',
        message: 'Fatura XML gönderme başarısız'
      };
  }
}

  /**
   * Check invoice status
   */
  async checkInvoiceStatus(belgeOid: string): Promise<GidenBelgeDurum> {
    try {
      if (!this.isLoggedIn || !this.connectorServiceClient || !this.currentVKN) {
        throw new Error('Not logged in or connector service not initialized.');
      }

      console.log(`🔍 Fatura durumu sorgulanıyor - Belge OID: ${belgeOid}`);
      
      const status = await this.connectorServiceClient.gidenBelgeDurumSorgulaAsync(this.currentVKN, belgeOid);
      
      console.log(`✅ Fatura durumu alındı - Durum: ${status.durum}`);
      
      return status;
    } catch (error) {
      console.error('❌ Fatura durumu sorgulanamadı:', error);
      throw error;
    }
  }

  /**
   * Get connection status
   */
  getStatus(): { isLoggedIn: boolean; currentVKN: string | null } {
    return {
      isLoggedIn: this.isLoggedIn,
      currentVKN: this.currentVKN
    };
  }

  /**
   * Get current VKN
   */
  getCurrentVKN(): string {
    if (!this.currentVKN) {
      throw new Error('No current VKN available. Please login first.');
    }
    return this.currentVKN;
  }
}

// Export singleton instance
export const gibApi = new GIBApi();

// Export configuration for external use
export { GIB_CONFIG }; 