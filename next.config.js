/** @type {import('next').NextConfig} */
const MENU_DRIVE =
  'https://drive.google.com/file/d/1STItXugGFLlRoRHlxrEYCg7iN9w9wFoo/view?usp=sharing'

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
        ],
      },
    ]
  },
  async redirects() {
    // ローカル（next dev）では外部リダイレクトを無効化し、接続トラブルを避ける
    if (process.env.NODE_ENV !== 'production') {
      return []
    }
    return [
      // 非www → www 301リダイレクト（Vercelのドメイン設定でも対応推奨）
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'vuelta.jp' }],
        destination: 'https://www.vuelta.jp/:path*',
        permanent: true,
      },
      // /menu は app/menu/page.tsx でサイト内レンダリング（SEO向上）
      // 旧 Google Drive リダイレクトは廃止
      { source: '/menu/gallery', destination: '/menu', permanent: true },
      { source: '/ja/menu', destination: '/menu', permanent: true },
      { source: '/ja/menu/gallery', destination: '/menu', permanent: true },
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
