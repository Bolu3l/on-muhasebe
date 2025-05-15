/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Şimdilik experimental özellikleri kapatalım
    optimizeCss: false,
  },
  // Next.js 15 ile gelen yeni hata bileşenleri yapılandırması
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    // Geliştirme sürecinde tip hatalarını görmezden gel
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  }
};

module.exports = nextConfig; 