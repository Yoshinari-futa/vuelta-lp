import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// パス名をリクエストヘッダに載せる。
// ルートレイアウトで <html lang="..."> を切り替えるために参照する。
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    // 静的アセット・画像最適化・サイトマップは除外
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images/|fonts/).*)',
  ],
}
