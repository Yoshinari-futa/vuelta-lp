// ========================================
// VUELTA — FAQ Data (Single Source of Truth)
// FAQ の追加・変更はここだけ編集する。
// 参照元: app/page.tsx, app/ja/page.tsx（featured のみ表示）,
//         app/faq/page.tsx, app/ja/faq/page.tsx（全件表示 + FAQPage JSON-LD）
// 注意: public/llms.txt の FAQ セクションは本ファイルと内容を一致させること
//       （編集したら llms.txt も手動で更新し、Last updated を書き換える）。
// 事実が未確認の質問は追加しない（推測で回答を書かない）。
// 最終更新: 2026-07-13
// ========================================

export type FaqCategoryKey =
  | 'visit'
  | 'access'
  | 'drinks'
  | 'space'
  | 'payment'
  | 'membership'
  | 'about'

export interface FaqCategoryDef {
  key: FaqCategoryKey
  titleEn: string
  titleJa: string
}

export const faqCategories: FaqCategoryDef[] = [
  { key: 'visit', titleEn: 'Reservations and Visiting', titleJa: '予約と来店' },
  { key: 'access', titleEn: 'Getting Here', titleJa: 'アクセス' },
  { key: 'drinks', titleEn: 'Drinks and Food', titleJa: 'ドリンクとフード' },
  { key: 'space', titleEn: 'The Space', titleJa: '店内と設備' },
  { key: 'payment', titleEn: 'Prices and Payment', titleJa: '料金と支払い' },
  { key: 'membership', titleEn: 'First Drink Pass', titleJa: 'First Drink Pass' },
  { key: 'about', titleEn: 'About Bar VUELTA', titleJa: 'お店について' },
]

export interface FaqEntry {
  /** アンカーID（/faq#id で直接リンク可能。安定させること） */
  id: string
  category: FaqCategoryKey
  /** true = トップページ（/ と /ja）のFAQセクションにも表示 */
  featured?: boolean
  en: { q: string; a: string }
  ja: { q: string; a: string }
}

export const faqEntries: FaqEntry[] = [
  // ── 予約と来店 ──────────────────────────
  {
    id: 'english-spoken',
    category: 'visit',
    featured: true,
    en: {
      q: 'Is English spoken at Bar VUELTA?',
      a: 'Yes. Our English is not perfect, but we will do our best, and international guests are very welcome.',
    },
    ja: {
      q: '英語は通じますか？',
      a: 'はい。完璧ではありませんが英語で対応します。海外からのお客様も歓迎しています。',
    },
  },
  {
    id: 'reservation-needed',
    category: 'visit',
    featured: true,
    en: {
      q: 'Do I need a reservation?',
      a: 'Walk-ins are welcome. For groups or guaranteed seating, you can book online.',
    },
    ja: {
      q: '予約は必要ですか？',
      a: 'ウォークイン歓迎です。グループや確実な着席をご希望の場合はオンラインでご予約いただけます。',
    },
  },
  {
    id: 'how-to-reserve',
    category: 'visit',
    featured: true,
    en: {
      q: 'How do I make a reservation?',
      a: 'You can book online through our Square reservation page, linked from the Reserve button on this site. Walk-ins are also welcome whenever we have space.',
    },
    ja: {
      q: '予約はどうすればできますか？',
      a: 'サイト内の「予約」ボタンから、Squareの予約ページでオンライン予約ができます。空席があればウォークインも歓迎です。',
    },
  },
  {
    id: 'private-hire',
    category: 'visit',
    featured: true,
    en: {
      q: 'Can I book the whole bar for a private party?',
      a: 'Yes. We take private hire and group bookings. Please contact us in advance and we will arrange it.',
    },
    ja: {
      q: '貸切や団体予約はできますか？',
      a: 'はい。貸切や団体のご予約も承っています。事前にご相談ください。',
    },
  },
  {
    id: 'opening-hours',
    category: 'visit',
    featured: true,
    en: {
      q: 'What are the opening hours?',
      a: 'Open 18:00 to 02:00 (last order 01:00), closed on Thursdays.',
    },
    ja: {
      q: '営業時間は？',
      a: '18:00から02:00（ラストオーダー1:00）。木曜定休です。',
    },
  },
  {
    id: 'open-sunday-monday',
    category: 'visit',
    en: {
      q: 'Is Bar VUELTA open on Sundays and Mondays?',
      a: 'Yes. Our only closing day is Thursday, so we are open on both Sunday and Monday from 18:00. Many bars in Hiroshima rest early in the week, so we are a good option when other doors are closed.',
    },
    ja: {
      q: '日曜日や月曜日も営業していますか？',
      a: 'はい。定休日は木曜日のみで、日曜日も月曜日も18:00から営業しています。日曜日や月曜日はお休みのバーも多いので、開いているお店をお探しの夜にもどうぞ。',
    },
  },
  {
    id: 'late-night',
    category: 'visit',
    en: {
      q: 'How late is Bar VUELTA open? Can I drop in after midnight?',
      a: 'We are open until 2:00 AM, with last order at 1:00 AM. Our cocktail "26 hours" is named after staying open until the 26th hour of the day. A late drink after dinner or a night out is very welcome.',
    },
    ja: {
      q: '深夜でも入れますか？何時まで飲めますか？',
      a: '深夜2:00まで営業しています（ラストオーダー1:00）。カクテル「26 hours」の名前は、26時＝深夜2時まで開けていることに由来します。遅い時間の一杯もお待ちしています。',
    },
  },
  {
    id: 'solo-guests',
    category: 'visit',
    featured: true,
    en: {
      q: 'Can I come alone?',
      a: 'Yes. It is a small, counter-led space that is comfortable for solo guests.',
    },
    ja: {
      q: '一人でも入れますか？',
      a: 'はい。カウンター中心の小さな空間で、お一人でも過ごしやすいです。',
    },
  },
  {
    id: 'date-anniversary',
    category: 'visit',
    featured: true,
    en: {
      q: 'Is Bar VUELTA good for a date or an anniversary?',
      a: 'Yes. The calm, counter-led room suits dates and anniversaries as well as a relaxed drink on your own.',
    },
    ja: {
      q: 'デートや記念日に使えますか？',
      a: 'はい。落ち着いたカウンター中心の空間で、デートや記念日にも、気軽な一人飲みにも合います。',
    },
  },
  {
    id: 'tattoos',
    category: 'visit',
    en: {
      q: 'Are tattoos OK at Bar VUELTA?',
      a: 'Yes, absolutely. Guests with tattoos are welcome just as they are — no covering needed. Many of our guests are travellers from overseas.',
    },
    ja: {
      q: 'タトゥーが入っていても入店できますか？',
      a: 'はい、問題ありません。タトゥーのある方もそのままお入りいただけます。海外からのお客様も多くいらっしゃるお店です。',
    },
  },
  {
    id: 'dress-code',
    category: 'visit',
    en: {
      q: 'Is there a dress code?',
      a: 'No dress code. Come as you are — casual clothes straight from sightseeing are perfectly fine.',
    },
    ja: {
      q: 'ドレスコードはありますか？',
      a: 'ありません。観光の途中の普段着のまま、お気軽にお立ち寄りください。',
    },
  },
  {
    id: 'children',
    category: 'visit',
    en: {
      q: 'Can I bring children?',
      a: 'We are sorry, but children are not allowed. Bar VUELTA is an adults-only space for a quiet drink.',
    },
    ja: {
      q: '子供連れでも入れますか？',
      a: '申し訳ありませんが、お子様のご入店はご遠慮いただいています。大人のための時間と空間としてお楽しみください。',
    },
  },
  {
    id: 'cancellation',
    category: 'visit',
    en: {
      q: 'Can I cancel a reservation?',
      a: 'Yes. If your plans change, just let us know by phone or Instagram DM.',
    },
    ja: {
      q: '予約のキャンセルはできますか？',
      a: 'はい、キャンセルできます。ご都合が変わった場合は、お電話またはInstagramのDMでお気軽にご連絡ください。',
    },
  },

  // ── アクセス ────────────────────────────
  {
    id: 'access-chuden-mae',
    category: 'access',
    featured: true,
    en: {
      q: 'How do I get to Bar VUELTA from Chuden-mae Station?',
      a: 'It is a 1-minute walk from the Chuden-mae tram stop, on the 2nd floor of the Kakee Building (room 201), 3-3-5 Otemachi, Naka-ku, Hiroshima.',
    },
    ja: {
      q: '中電前駅からの行き方は？',
      a: '路面電車「中電前」から徒歩1分。広島市中区大手町3-3-5 掛江ビル2階(201号)です。',
    },
  },
  {
    id: 'peace-park',
    category: 'access',
    featured: true,
    en: {
      q: 'Is Bar VUELTA near the Peace Memorial Park?',
      a: 'Yes. We are in central Naka-ku, within walking distance of the Peace Memorial Park, so it is an easy stop for a drink after sightseeing.',
    },
    ja: {
      q: '平和記念公園から近いですか？',
      a: 'はい。広島市中区の中心部にあり、平和記念公園から徒歩圏内です。観光のあとの一杯にも便利です。',
    },
  },
  {
    id: 'parking',
    category: 'access',
    featured: true,
    en: {
      q: 'Is there parking?',
      a: 'We do not have our own car park, but there are coin parking lots nearby.',
    },
    ja: {
      q: '駐車場はありますか？',
      a: '専用の駐車場はありませんが、近くにコインパーキングがあります。',
    },
  },
  {
    id: 'nearby-hotels',
    category: 'access',
    en: {
      q: 'Which hotels is Bar VUELTA close to?',
      a: 'THE KNOT HIROSHIMA is about a 1-minute walk away, and ANA Crowne Plaza Hiroshima is about 5 minutes on foot. From the Hilton Hiroshima it is about a 15-minute walk, or around 5 minutes by taxi.',
    },
    ja: {
      q: '近くのホテルから歩いて行けますか？',
      a: 'はい。THE KNOT HIROSHIMAからは徒歩1分ほど、ANAクラウンプラザホテル広島からは徒歩5分ほどです。ヒルトン広島からは徒歩15分ほど、タクシーなら5分ほどで着きます。',
    },
  },

  // ── ドリンクとフード ────────────────────
  {
    id: 'drinks-lineup',
    category: 'drinks',
    featured: true,
    en: {
      q: 'What kind of drinks do you serve?',
      a: 'Craft cocktails made with local Hiroshima ingredients such as Sakurao Gin and Hiroshima lemon, plus finger food and tacos.',
    },
    ja: {
      q: 'どんなお酒がありますか？',
      a: '桜尾ジンや広島レモンなど広島の地元食材を使ったクラフトカクテルが中心です。タコスなどのフードもあります。',
    },
  },
  {
    id: 'signature-cocktails',
    category: 'drinks',
    featured: true,
    en: {
      q: 'What are your signature cocktails?',
      a: 'Signatures include The OKONOMIYAKI (Hiroshima soul food in a glass) and Shell We? (Hiroshima oysters, the sea in a glass). Cocktails range roughly from 950 to 1,600 yen.',
    },
    ja: {
      q: 'おすすめや名物のカクテルは？',
      a: '看板は「The OKONOMIYAKI」（広島のソウルフードを一杯に）と「Shell We?」（広島の牡蠣、海を一杯に）です。カクテルはおよそ950円から1,600円です。',
    },
  },
  {
    id: 'okonomiyaki-cocktail',
    category: 'drinks',
    en: {
      q: 'What is "The OKONOMIYAKI" cocktail?',
      a: "Our signature cocktail that turns okonomiyaki, Hiroshima's post-war soul food, into a drink (1,200 yen). Dashi-infused vodka meets spiced clam tomato, Campari and lemon, finished with bacon grilled with Otafuku sauce — savory umami in a glass.",
    },
    ja: {
      q: '「The OKONOMIYAKI」とはどんなカクテルですか？',
      a: '広島のソウルフード、お好み焼きをグラスの中に表現した看板カクテルです（1,200円）。出汁を移したウォッカに、スパイスを効かせたクラムトマトとカンパリ、レモンを重ね、おたふくソースを絡めて焼いたベーコンを添えています。',
    },
  },
  {
    id: 'shell-we-cocktail',
    category: 'drinks',
    en: {
      q: 'What is the "Shell We?" cocktail?',
      a: 'An original cocktail celebrating the famous oysters of the Seto Inland Sea (1,600 yen). SAKURAO Gin from Hiroshima meets shiro-dashi, rice vinegar, lemon and tonic soda — briny minerals and fresh citrus in a glass.',
    },
    ja: {
      q: '「Shell We?」とはどんなカクテルですか？',
      a: '瀬戸内海の名物である牡蠣をテーマにしたオリジナルカクテルです（1,600円）。広島の桜尾ジンに白だしと米酢、レモン、トニックソーダを合わせ、磯のミネラルと柑橘の爽やかさを一杯にしました。',
    },
  },
  {
    id: 'local-spirits',
    category: 'drinks',
    en: {
      q: 'Do you serve local Hiroshima spirits and sake?',
      a: 'Yes. We carry SAKURAO Gin from Hatsukaichi, Togouchi whisky and Kamotsuru sake, and our cocktails feature local ingredients such as Hiroshima lemon.',
    },
    ja: {
      q: '広島の地酒や地ウイスキーはありますか？',
      a: 'はい。廿日市の桜尾ジン、戸河内ウイスキー、賀茂鶴の日本酒など、広島の造り手のお酒を揃えています。カクテルにも広島レモンをはじめ地元の素材を使っています。',
    },
  },
  {
    id: 'non-alcoholic',
    category: 'drinks',
    featured: true,
    en: {
      q: 'Do you have non-alcoholic drinks?',
      a: 'Yes. We make non-alcoholic cocktails, so guests who do not drink can enjoy the bar too.',
    },
    ja: {
      q: 'ノンアルコールはありますか？',
      a: 'はい。ノンアルコールカクテルもご用意しています。お酒を飲まない方もお楽しみいただけます。',
    },
  },
  {
    id: 'food-menu',
    category: 'drinks',
    en: {
      q: 'Do you serve food?',
      a: "We are not a full restaurant, but we serve bar food that pairs well with cocktails — Gansu (Hiroshima's crispy fish cutlet), hand-cut fries, tacos and more.",
    },
    ja: {
      q: '食事はできますか？',
      a: '本格的なお食事処ではありませんが、草津 坂井屋のガンスや手切りのポテトフライ、タコスなど、お酒に合うフードをご用意しています。',
    },
  },
  {
    id: 'english-menu',
    category: 'drinks',
    en: {
      q: 'Is there an English menu?',
      a: 'Yes. Our menu is written in English with Japanese alongside, so international guests can order comfortably.',
    },
    ja: {
      q: '英語のメニューはありますか？',
      a: 'はい。メニューは英語と日本語を併記しています。海外からのお客様にもそのままお使いいただけます。',
    },
  },
  {
    id: 'allergies-vegetarian',
    category: 'drinks',
    en: {
      q: 'Do you accommodate allergies or vegetarian guests?',
      a: 'Yes. Please tell the staff about any allergies or vegetarian requests when you order, and we will accommodate you.',
    },
    ja: {
      q: 'アレルギーやベジタリアンへの対応はできますか？',
      a: 'はい、対応します。アレルギーのある方やベジタリアンの方は、ご注文の際にスタッフへお気軽にお伝えください。',
    },
  },

  // ── 店内と設備 ──────────────────────────
  {
    id: 'seats',
    category: 'space',
    featured: true,
    en: {
      q: 'How many seats does Bar VUELTA have?',
      a: 'Eight counter seats plus a standing area for about eight more, an intimate room made for conversation.',
    },
    ja: {
      q: '席数はどのくらいですか？',
      a: 'カウンター8席と、立ち飲みスペースが8名ほど。会話を楽しむための親密な広さです。',
    },
  },
  {
    id: 'smoking',
    category: 'space',
    featured: true,
    en: {
      q: 'Can I smoke at Bar VUELTA?',
      a: 'Yes, smoking is allowed inside the bar.',
    },
    ja: {
      q: '喫煙はできますか？',
      a: 'はい。店内で喫煙いただけます。',
    },
  },
  {
    id: 'wifi',
    category: 'space',
    featured: true,
    en: {
      q: 'Is there Wi-Fi?',
      a: 'Yes, free Wi-Fi is available for our guests.',
    },
    ja: {
      q: 'Wi-Fiは使えますか？',
      a: 'はい。お客様は無料でWi-Fiをご利用いただけます。',
    },
  },
  {
    id: 'photos',
    category: 'space',
    en: {
      q: 'Can I take photos inside?',
      a: 'Yes, feel free. You are welcome to photograph your cocktails and the room. We only ask you to be considerate of other guests in the frame.',
    },
    ja: {
      q: '店内で写真を撮ってもいいですか？',
      a: 'はい、ご自由にどうぞ。カクテルや店内の撮影も歓迎です。他のお客様が写り込む場合だけ、ご配慮をお願いします。',
    },
  },
  {
    id: 'luggage',
    category: 'space',
    en: {
      q: 'Can I bring a suitcase or large bags?',
      a: 'Yes. We have space inside for suitcases and larger bags, so stopping by before or after your hotel check-in is no problem.',
    },
    ja: {
      q: 'スーツケースなど大きな荷物があっても大丈夫ですか？',
      a: 'はい。店内に荷物を置けるスペースがありますので、チェックイン前後のお立ち寄りも歓迎です。',
    },
  },
  {
    id: 'phone-charging',
    category: 'space',
    en: {
      q: 'Can I charge my phone?',
      a: 'Yes, we can charge your phone while you drink — just ask the staff.',
    },
    ja: {
      q: 'スマホの充電はできますか？',
      a: 'はい、充電できます。お気軽にスタッフへお声がけください。',
    },
  },

  // ── 料金と支払い ────────────────────────
  {
    id: 'cover-charge',
    category: 'payment',
    featured: true,
    en: {
      q: 'Is there a cover charge?',
      a: 'Yes. There is a cover charge of 300 yen per person.',
    },
    ja: {
      q: 'チャージ（席料）はかかりますか？',
      a: 'はい。お一人様300円のチャージをいただいています。',
    },
  },
  {
    id: 'payment-methods',
    category: 'payment',
    featured: true,
    en: {
      q: 'What payment methods can I use?',
      a: 'Cash, credit cards (Visa, Mastercard, AMEX) and electronic money.',
    },
    ja: {
      q: '支払い方法は？',
      a: '現金、クレジットカード（Visa、Mastercard、AMEX）、電子マネーがご利用いただけます。',
    },
  },
  {
    id: 'cashless',
    category: 'payment',
    en: {
      q: 'Can I pay cashless, without Japanese yen in hand?',
      a: 'Yes. We accept credit cards (Visa, Mastercard, AMEX) and electronic money, so a cashless visit is no problem. Cash is welcome too.',
    },
    ja: {
      q: '現金がなくても支払えますか？',
      a: 'はい。クレジットカード（Visa、Mastercard、AMEX）や電子マネーがご利用いただけますので、キャッシュレスでも安心です。もちろん現金もご利用いただけます。',
    },
  },
  {
    id: 'budget',
    category: 'payment',
    en: {
      q: 'How much should I budget for a visit?',
      a: 'Cocktails range roughly from 950 to 1,600 yen, plus a 300 yen cover charge per person. As a guide, two cocktails come to about 2,500 to 3,500 yen.',
    },
    ja: {
      q: '予算はどのくらい見ておけばいいですか？',
      a: 'カクテルはおよそ950円から1,600円、チャージがお一人様300円です。2杯ほどで2,500円から3,500円が目安です。',
    },
  },
  {
    id: 'tipping',
    category: 'payment',
    en: {
      q: 'Do I need to tip?',
      a: 'No. Tipping is not customary in Japan and we do not expect it at Bar VUELTA. Instead there is a small cover charge of 300 yen per person.',
    },
    ja: {
      q: 'チップは必要ですか？',
      a: '不要です。日本にはチップの習慣がなく、当店でもいただいていません。席料としてお一人様300円のチャージのみ頂戴しています。',
    },
  },
  {
    id: 'receipt',
    category: 'payment',
    en: {
      q: 'Can I get a receipt?',
      a: 'Yes, receipts are available — just ask when you pay. Please note that we are not registered as a qualified invoice issuer under the Japanese invoice system.',
    },
    ja: {
      q: '領収書はもらえますか？',
      a: 'はい、領収書をご用意できます。お会計の際にお申し付けください。なお、適格請求書（インボイス）発行事業者の登録は行っていません。',
    },
  },

  // ── First Drink Pass ────────────────────
  {
    id: 'first-drink-pass',
    category: 'membership',
    featured: true,
    en: {
      q: 'What is the First Drink Pass?',
      a: 'A membership for 1,980 yen per month that includes one free drink on each day you visit, a simple reason to come back often.',
    },
    ja: {
      q: 'First Drink Passとは何ですか？',
      a: '月額1,980円のメンバーシップで、ご来店ごとに1杯無料になります。気軽に通える仕組みです。',
    },
  },
  {
    id: 'pass-signup',
    category: 'membership',
    en: {
      q: 'How do I sign up for the First Drink Pass?',
      a: 'You can sign up online from the First Drink Pass page on this site. It costs 1,980 yen per month and includes one free drink on each day you visit.',
    },
    ja: {
      q: 'First Drink Passはどこで申し込めますか？',
      a: '公式サイトのFirst Drink Passページからオンラインでお申し込みいただけます。月額1,980円で、ご来店ごとに1杯無料になります。',
    },
  },

  // ── お店について ────────────────────────
  {
    id: 'vuelta-meaning',
    category: 'about',
    en: {
      q: 'What does "VUELTA" mean?',
      a: 'VUELTA is Spanish for "return" — a reunion, a coming back around. The name holds our hope to be a place where travellers and locals meet, and to which everyone returns. In Japanese it is written ブエルタ.',
    },
    ja: {
      q: '店名「VUELTA」の意味は？',
      a: 'スペイン語で「再会」「回帰」「循環」を意味します。旅人と地元の人が出会い、また帰ってくる場所でありたいという想いを込めました。読み方は「ブエルタ」です。',
    },
  },
  {
    id: 'opened-when',
    category: 'about',
    en: {
      q: 'When did Bar VUELTA open?',
      a: 'Bar VUELTA opened in March 2026 in Otemachi, Naka-ku, Hiroshima.',
    },
    ja: {
      q: 'いつオープンしたお店ですか？',
      a: '2026年3月に広島市中区大手町にオープンしたクラフトカクテルバーです。',
    },
  },
]

/** トップページ（/ と /ja）のFAQセクションに表示する質問 */
export const featuredFaqs: FaqEntry[] = faqEntries.filter((f) => f.featured)

/** カテゴリごとの質問リスト（/faq ページの表示順） */
export function faqsByCategory(): { category: FaqCategoryDef; entries: FaqEntry[] }[] {
  return faqCategories
    .map((category) => ({
      category,
      entries: faqEntries.filter((f) => f.category === category.key),
    }))
    .filter((group) => group.entries.length > 0)
}
