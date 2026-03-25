import type { Metadata } from 'next'
import MenuGallery from '@/components/MenuGallery'

export const metadata: Metadata = {
  title: 'フルメニュー（画像）| VUELTA',
  description: 'VUELTAの公式メニュー掲示（カクテル・スピリッツ・フード）。',
  openGraph: {
    title: 'フルメニュー | VUELTA',
    description: '公式メニュー画像',
  },
}

export default function MenuGalleryPageJA() {
  return <MenuGallery locale="ja" />
}
