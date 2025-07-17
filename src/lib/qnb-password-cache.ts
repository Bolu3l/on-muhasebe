interface QNBPasswordCache {
  password: string;
  username: string;
  timestamp: number;
  expiryTime: number;
}

const CACHE_KEY = 'qnb_password_cache';
const CACHE_DURATION = 8 * 60 * 60 * 1000; // 8 saat

export class QNBPasswordManager {
  /**
   * Şifreyi cache'e kaydeder
   */
  static savePassword(username: string, password: string): void {
    const cache: QNBPasswordCache = {
      password,
      username,
      timestamp: Date.now(),
      expiryTime: Date.now() + CACHE_DURATION
    };
    
    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.error('QNB şifre cache hatası:', error);
    }
  }

  /**
   * Cache'den şifreyi alır
   */
  static getPassword(username: string): string | null {
    try {
      const cacheData = sessionStorage.getItem(CACHE_KEY);
      if (!cacheData) return null;

      const cache: QNBPasswordCache = JSON.parse(cacheData);
      
      // Kullanıcı adı eşleşiyor mu?
      if (cache.username !== username) {
        this.clearPassword();
        return null;
      }

      // Süre dolmuş mu?
      if (Date.now() > cache.expiryTime) {
        this.clearPassword();
        return null;
      }

      return cache.password;
    } catch (error) {
      console.error('QNB şifre cache okuma hatası:', error);
      return null;
    }
  }

  /**
   * Şifrenin cache'de olup olmadığını kontrol eder
   */
  static hasValidPassword(username: string): boolean {
    return this.getPassword(username) !== null;
  }

  /**
   * Cache'i temizler
   */
  static clearPassword(): void {
    try {
      sessionStorage.removeItem(CACHE_KEY);
    } catch (error) {
      console.error('QNB şifre cache temizleme hatası:', error);
    }
  }

  /**
   * Cache süresini kontrol eder
   */
  static getRemainingTime(): number {
    try {
      const cacheData = sessionStorage.getItem(CACHE_KEY);
      if (!cacheData) return 0;

      const cache: QNBPasswordCache = JSON.parse(cacheData);
      const remaining = cache.expiryTime - Date.now();
      return Math.max(0, remaining);
    } catch (error) {
      return 0;
    }
  }

  /**
   * Cache süresini günceller (şifre kullanıldığında)
   */
  static refreshCache(): void {
    try {
      const cacheData = sessionStorage.getItem(CACHE_KEY);
      if (!cacheData) return;

      const cache: QNBPasswordCache = JSON.parse(cacheData);
      cache.timestamp = Date.now();
      cache.expiryTime = Date.now() + CACHE_DURATION;
      
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (error) {
      console.error('QNB şifre cache güncelleme hatası:', error);
    }
  }
} 