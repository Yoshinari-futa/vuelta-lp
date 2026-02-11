import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recruit | VUELTA In Hiroshima',
  description: 'Join VUELTA team. We are looking for passionate people who love food and hospitality. English speakers welcome. Located in Hiroshima city center.',
  openGraph: {
    title: 'Recruit | VUELTA In Hiroshima',
    description: 'Join VUELTA team. We are looking for passionate people who love food and hospitality.',
    type: 'website',
    url: 'https://vuelta-bar.com/recruit',
    siteName: 'VUELTA',
    images: [
      {
        url: '/images/vuelta-logo.png',
        width: 900,
        height: 306,
        alt: 'VUELTA Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recruit | VUELTA In Hiroshima',
    description: 'Join VUELTA team. We are looking for passionate people who love food and hospitality.',
    images: ['/images/vuelta-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://vuelta-bar.com/recruit',
  },
}

export default function RecruitLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
