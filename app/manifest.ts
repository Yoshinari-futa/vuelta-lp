import type { MetadataRoute } from 'next'

/** PWA manifest — Add to Home Screen, theme bar (MEO/ブランド認知の補助) */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VUELTA — Craft Cocktail Bar Hiroshima',
    short_name: 'VUELTA',
    description:
      'Speakeasy-style craft cocktail bar in Hiroshima. 1 min from Chuden-mae Station.',
    id: '/',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1a3a2e',
    orientation: 'portrait-primary',
    lang: 'en',
    categories: ['food', 'lifestyle'],
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}
