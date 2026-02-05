import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { category, name, company, email, message } = body

    // バリデーション
    if (!category || !name || !email || !message) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    const categoryLabel = category === 'recruit' ? '採用について' : category === 'reservation' ? '予約について' : 'その他'

    // メール本文（HTML形式）
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
</head>
<body style="font-family: sans-serif; line-height: 1.6; color: #333;">
  <h2 style="color: #1a3a2e;">お問い合わせが届きました</h2>
  
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">お問い合わせカテゴリ</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${categoryLabel}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">お名前</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">会社名</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${company || '未入力'}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">メールアドレス</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top;">お問い合わせ内容</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; white-space: pre-wrap;">${message}</td>
    </tr>
  </table>
</body>
</html>
    `.trim()

    // プレーンテキスト版
    const emailText = `
お問い合わせが届きました。

【お問い合わせカテゴリ】
${categoryLabel}

【お名前】
${name}

【会社名】
${company || '未入力'}

【メールアドレス】
${email}

【お問い合わせ内容】
${message}
    `.trim()

    // Resend APIを使用してメール送信
    // 環境変数 RESEND_API_KEY が必要です
    const resendApiKey = process.env.RESEND_API_KEY

    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'VUELTA <noreply@vuelta-bar.com>',
          to: ['head_office@vuelta-hr.com'],
          reply_to: email,
          subject: `【お問い合わせ】${categoryLabel} - ${name}様`,
          html: emailHtml,
          text: emailText,
        }),
      })

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json()
        console.error('Resend API error:', errorData)
        throw new Error('メール送信に失敗しました')
      }
    } else {
      // APIキーが設定されていない場合はログ出力のみ
      console.log('=== お問い合わせメール ===')
      console.log(`To: head_office@vuelta-hr.com`)
      console.log(`Subject: 【お問い合わせ】${categoryLabel} - ${name}様`)
      console.log(emailText)
      console.log('========================')
      console.log('注意: RESEND_API_KEYが設定されていないため、メールは送信されませんでした。')
    }

    return NextResponse.json(
      { message: 'お問い合わせを受け付けました' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}
