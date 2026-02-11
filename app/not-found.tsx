import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h2 className="font-annam text-2xl md:text-4xl text-vuelta-gold mb-4">
          Not Found
        </h2>
        <p className="font-annam text-vuelta-text-light mb-8">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors font-annam rounded inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
