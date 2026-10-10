'use client'

import { useEffect, useState } from 'react'
import { CONTACT_EMAIL } from '@/lib/site-seo'

type Lang = 'en' | 'ja'
type Status = 'idle' | 'sending' | 'sent' | 'error'

const COPY = {
  ja: {
    topicLabel: 'ご用件',
    topics: [
      { value: 'private', label: '少人数の貸切' },
      { value: 'request', label: 'ご要望' },
      { value: 'question', label: 'ご質問' },
      { value: 'other', label: 'その他' },
    ],
    name: 'お名前',
    email: 'メールアドレス',
    date: '日にち',
    datePh: '例: 11月中旬の金曜',
    guests: '人数',
    guestsPh: '例: 8名',
    message: '内容',
    messagePh: { private: 'だいたいの時間や、ご希望があれば。', other: '' },
    required: '必須',
    submit: '送信する',
    sending: '送信しています',
    sentTitle: '送信しました',
    sentBody: `${CONTACT_EMAIL} からお返事します。`,
    error: `送れませんでした。お手数ですが ${CONTACT_EMAIL} に直接メールしてください。`,
    invalid: 'お名前、メールアドレス、内容を入れてください。',
  },
  en: {
    topicLabel: 'About',
    topics: [
      { value: 'private', label: 'Private hire' },
      { value: 'request', label: 'A request' },
      { value: 'question', label: 'A question' },
      { value: 'other', label: 'Something else' },
    ],
    name: 'Name',
    email: 'Email',
    date: 'Date',
    datePh: 'e.g. a Friday in mid-November',
    guests: 'Group size',
    guestsPh: 'e.g. 8',
    message: 'Message',
    messagePh: { private: 'Rough timing, and anything else we should know.', other: '' },
    required: 'Required',
    submit: 'Send',
    sending: 'Sending',
    sentTitle: 'Sent',
    sentBody: `We will reply from ${CONTACT_EMAIL}.`,
    error: `It did not go through. Please email us directly at ${CONTACT_EMAIL}.`,
    invalid: 'Please fill in your name, email and message.',
  },
} as const

const LABEL = 'block font-annam text-xs uppercase tracking-[.25em] text-vuelta-text-light mb-2'
const LABEL_JA = 'block font-japanese text-sm text-vuelta-text-light mb-2'
const INPUT =
  'w-full bg-transparent border-0 border-b border-vuelta-gold/30 rounded-none px-0 py-2 font-japanese text-base text-vuelta-text placeholder:text-vuelta-text-light/50 focus:outline-none focus:border-vuelta-gold transition-colors'

export default function ContactForm({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const [topic, setTopic] = useState<string>('private')
  const [status, setStatus] = useState<Status>('idle')
  const [note, setNote] = useState('')
  const [startedAt, setStartedAt] = useState(0)

  useEffect(() => setStartedAt(Date.now()), [])

  const labelClass = lang === 'ja' ? LABEL_JA : LABEL

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const payload = {
      topic,
      name: String(f.get('name') || ''),
      email: String(f.get('email') || ''),
      date: String(f.get('date') || ''),
      guests: String(f.get('guests') || ''),
      message: String(f.get('message') || ''),
      website: String(f.get('website') || ''),
      startedAt,
      lang,
    }
    if (!payload.name.trim() || !payload.email.trim() || !payload.message.trim()) {
      setNote(t.invalid)
      return
    }
    setStatus('sending')
    setNote('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(String(res.status))
      setStatus('sent')
    } catch {
      setStatus('error')
      setNote(t.error)
    }
  }

  if (status === 'sent') {
    return (
      <div className="text-center py-16 border-y border-vuelta-gold/30" role="status">
        <p className="font-annam text-3xl sm:text-4xl tracking-wide text-vuelta-gold">{t.sentTitle}</p>
        <p className="font-japanese text-sm sm:text-base text-vuelta-text-light mt-4 leading-relaxed">{t.sentBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-9">
      <fieldset>
        <legend className={labelClass}>{t.topicLabel}</legend>
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-1">
          {t.topics.map((o) => (
            <label key={o.value} className="cursor-pointer">
              <input
                type="radio"
                name="topic"
                value={o.value}
                checked={topic === o.value}
                onChange={() => setTopic(o.value)}
                className="sr-only peer"
              />
              <span className="font-japanese text-base pb-1 border-b text-vuelta-text-light border-transparent peer-checked:text-vuelta-gold peer-checked:border-vuelta-gold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-vuelta-gold transition-colors">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="cf-name" className={labelClass}>{t.name}</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" required maxLength={80} className={INPUT} />
      </div>

      <div>
        <label htmlFor="cf-email" className={labelClass}>{t.email}</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" required maxLength={200} className={INPUT} />
      </div>

      {topic === 'private' && (
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_10rem] gap-9 sm:gap-6">
          <div>
            <label htmlFor="cf-date" className={labelClass}>{t.date}</label>
            <input id="cf-date" name="date" type="text" maxLength={60} placeholder={t.datePh} className={INPUT} />
          </div>
          <div>
            <label htmlFor="cf-guests" className={labelClass}>{t.guests}</label>
            <input id="cf-guests" name="guests" type="text" maxLength={30} placeholder={t.guestsPh} className={INPUT} />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="cf-message" className={labelClass}>{t.message}</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          maxLength={3000}
          placeholder={topic === 'private' ? t.messagePh.private : t.messagePh.other}
          className={`${INPUT} resize-y leading-relaxed`}
        />
      </div>

      {/* スパム対策（人には見えない） */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {note && (
        <p className="font-japanese text-sm text-[#8a3b2e] leading-relaxed" role="alert">
          {note}
        </p>
      )}

      <div className="text-center pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`inline-block px-12 py-4 bg-vuelta-gold text-white rounded-full hover:bg-vuelta-gold-light disabled:opacity-60 transition-all duration-300 text-sm tracking-wider ${lang === 'ja' ? 'font-japanese' : 'font-annam uppercase'}`}
        >
          {status === 'sending' ? t.sending : t.submit}
        </button>
      </div>
    </form>
  )
}
