import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <h2 className="font-annam text-2xl md:text-4xl text-vuelta-gold mb-4">
          ページが見つかりません
        </h2>
        <p className="font-japanese text-vuelta-text-light mb-8">
          お探しのページは存在しないか、移動された可能性があります。
        </p>
        <Link
          href="/ja"
          className="px-6 py-3 bg-vuelta-gold text-white hover:bg-vuelta-gold-light transition-colors font-japanese rounded inline-block"
        >
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}
