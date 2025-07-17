import jwt from 'jsonwebtoken';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  companies: Array<{
    id: string;
    name: string;
    taxNumber: string;
  }>;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name?: string;
  exp?: number;
  iat?: number;
}

// Client-side token management
export const tokenManager = {
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      // Cookie'ye de kaydet (middleware için)
      const isSecure = window.location.protocol === 'https:';
      document.cookie = `auth_token=${token}; path=/; max-age=604800; ${isSecure ? 'secure;' : ''} samesite=strict`;
    }
  },

  getToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      // Cookie'yi de sil
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  },

  setUser: (user: AuthUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
  },

  getUser: (): AuthUser | null => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('auth_user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (e) {
          console.error('Error parsing user data:', e);
          return null;
        }
      }
    }
    return null;
  }
};

// Token validation
export const validateToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded.exp) return true;
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Login function
export const login = async (email: string, password: string) => {
  console.log('🔍 Login fonksiyonu başlatıldı:', { email, passwordLength: password.length });
  
  try {
    console.log('📡 API isteği gönderiliyor: /api/auth/login');
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    console.log('📊 API yanıtı alındı:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      url: response.url
    });

    const data = await response.json();
    console.log('📋 API yanıt verisi:', data);

    if (!response.ok) {
      console.error('❌ API isteği başarısız:', {
        status: response.status,
        error: data.error,
        debug: data.debug
      });
      throw new Error(data.error || 'Giriş başarısız');
    }

    console.log('✅ Login başarılı, token ve user bilgileri kaydediliyor...');
    
    // Token ve user bilgilerini kaydet
    tokenManager.setToken(data.token);
    tokenManager.setUser(data.user);

    console.log('🎉 Login işlemi tamamlandı');
    return data;
    
  } catch (error) {
    console.error('💥 Login fonksiyonunda hata:', error);
    console.error('🔍 Hata detayları:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};

export const register = async (registerData: {
  email: string;
  password: string;
  name: string;
  companyName: string;
  taxNumber: string;
  taxOffice?: string;
  phone?: string;
  address?: string;
}) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Kayıt başarısız');
  }

  // Token ve user bilgilerini kaydet
  tokenManager.setToken(data.token);
  tokenManager.setUser(data.user);

  return data;
};

// Logout function
export const logout = async () => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenManager.getToken()}`,
      },
    });
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Token'ı her durumda temizle
    tokenManager.removeToken();
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = tokenManager.getToken();
  if (!token) return false;
  
  return !isTokenExpired(token);
};

// Get current user
export const getCurrentUser = (): AuthUser | null => {
  if (!isAuthenticated()) return null;
  return tokenManager.getUser();
};

// Get auth headers for API calls
export const getAuthHeaders = (): Record<string, string> => {
  const token = tokenManager.getToken();
  if (token) {
    return { 'Authorization': `Bearer ${token}` };
  }
  return {};
}; 