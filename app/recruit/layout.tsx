import type { Metadata } from 'next'
import { SITE_ORIGIN } from '@/lib/site-seo'

export const metadata: Metadata = {
  title: 'Recruit | VUELTA In Hiroshima',
  description: 'Join VUELTA team. We are looking for passionate people who love food and hospitality. English speakers welcome. Located in Hiroshima city center.',
  openGraph: {
    title: 'Recruit | VUELTA In Hiroshima',
    description: 'Join VUELTA team. We are looking for passionate people who love food and hospitality.',
    type: 'website',
    url: `${SITE_ORIGIN}/recruit`,
    siteName: 'VUELTA',
    images: [
      {
        url: '/images/ogp.png',
        width: 1200,
        height: 630,
        alt: 'VUELTA Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recruit | VUELTA In Hiroshima',
    description: 'Join VUELTA team. We are looking for passionate people who love food and hospitality.',
    images: ['/images/ogp.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${SITE_ORIGIN}/recruit`,
  },
}

export default function RecruitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
