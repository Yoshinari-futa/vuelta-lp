import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recruit | VUELTA BAR In Hiroshima',
  description: 'Join VUELTA BAR team. We are looking for passionate people who love food and hospitality. English speakers welcome. Located in Hiroshima city center.',
  openGraph: {
    title: 'Recruit | VUELTA BAR In Hiroshima',
    description: 'Join VUELTA BAR team. We are looking for passionate people who love food and hospitality.',
    type: 'website',
    url: 'https://vuelta-bar.com/recruit',
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
