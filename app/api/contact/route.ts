import { NextRequest, NextResponse } from 'next/server'
import { CONTACT_EMAIL } from '@/lib/site-seo'

/**
 * お問い合わせフォーム（/contact, /ja/contact）の受け口。
 * 届け先は Slack（square-bot → 布田さん DM）。返信は head_office@ から手動で行う。
 * 環境変数: SLACK_BOT_TOKEN, SLACK_CONTACT_CHANNEL
 * 送れなかった時は必ずエラーを返す（受け付けたふりをしない）。
 */

const TOPIC_LABELS: Record<string, string> = {
  private: '少人数の貸切',
  request: 'ご要望',
  question: 'ご質問',
  other: 'その他',
}

const LIMITS = { name: 80, email: 200, date: 60, guests: 30, message: 3000 }

const clean = (v: unknown, max: number) =>
  typeof v === 'string' ? v.trim().slice(0, max) : ''

// Slack mrkdwn の制御文字を無害化
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  }

  // スパム対策: 見えない欄に入力がある、または表示から3秒未満の送信は捨てる（成功扱いで返す）
  const elapsed = Date.now() - Number(body.startedAt || 0)
  if (clean(body.website, 200) || !(elapsed > 3000)) {
    return NextResponse.json({ ok: true })
  }

  const topic = TOPIC_LABELS[clean(body.topic, 20)] ? clean(body.topic, 20) : 'other'
  const name = clean(body.name, LIMITS.name)
  const email = clean(body.email, LIMITS.email)
  const date = clean(body.date, LIMITS.date)
  const guests = clean(body.guests, LIMITS.guests)
  const message = clean(body.message, LIMITS.message)
  const lang = body.lang === 'en' ? 'en' : 'ja'

  if (!name || !EMAIL_RE.test(email) || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  const token = process.env.SLACK_BOT_TOKEN
  const channel = process.env.SLACK_CONTACT_CHANNEL
  if (!token || !channel) {
    console.error('contact: SLACK_BOT_TOKEN / SLACK_CONTACT_CHANNEL が未設定')
    return NextResponse.json({ error: 'not_configured' }, { status: 500 })
  }

  const label = TOPIC_LABELS[topic]
  const replySubject = encodeURIComponent(`Re: Bar VUELTA ${lang === 'en' ? 'Inquiry' : 'お問い合わせ'}`)
  const lines = [
    `*vuelta.jp からお問い合わせ*（${label}${lang === 'en' ? '、英語ページ' : ''}）`,
    `お名前: ${esc(name)}`,
    `メール: ${esc(email)}`,
    date && `日にち: ${esc(date)}`,
    guests && `人数: ${esc(guests)}`,
  ].filter(Boolean)

  const blocks = [
    { type: 'section', text: { type: 'mrkdwn', text: lines.join('\n') } },
    { type: 'section', text: { type: 'mrkdwn', text: `>${esc(message).replace(/\n/g, '\n>')}` } },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `<mailto:${encodeURIComponent(email)}?subject=${replySubject}|${esc(email)} に返信する>（${CONTACT_EMAIL} から送ってください）`,
        },
      ],
    },
  ]

  try {
    const res = await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        channel,
        text: `vuelta.jp からお問い合わせ（${label}）${name}様`,
        blocks,
        unfurl_links: false,
      }),
    })
    const data = await res.json()
    if (!data.ok) {
      console.error('contact: Slack error', data.error)
      return NextResponse.json({ error: 'send_failed' }, { status: 502 })
    }
  } catch (err) {
    console.error('contact: Slack request failed', err)
    return NextResponse.json({ error: 'send_failed' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
