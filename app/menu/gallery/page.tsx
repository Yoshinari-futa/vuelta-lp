import type { Metadata } from 'next'
import MenuGallery from '@/components/MenuGallery'

export const metadata: Metadata = {
  title: 'Full Menu (Images) | VUELTA',
  description: 'Official VUELTA cocktail, spirits, and food menu boards.',
  openGraph: {
    title: 'Full Menu | VUELTA',
    description: 'Official menu images',
  },
}

export default function MenuGalleryPage() {
  return <MenuGallery locale="en" />
}
