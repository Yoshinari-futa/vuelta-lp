/** @type {import('next').NextConfig} */
const MENU_DRIVE =
  'https://drive.google.com/file/d/1STItXugGFLlRoRHlxrEYCg7iN9w9wFoo/view?usp=sharing'

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // ローカル（next dev）では外部リダイレクトを無効化し、接続トラブルを避ける
    if (process.env.NODE_ENV !== 'production') {
      return []
    }
    return [
      { source: '/menu', destination: MENU_DRIVE, permanent: true },
      { source: '/menu/gallery', destination: MENU_DRIVE, permanent: true },
      { source: '/ja/menu', destination: MENU_DRIVE, permanent: true },
      { source: '/ja/menu/gallery', destination: MENU_DRIVE, permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
}

module.exports = nextConfig
