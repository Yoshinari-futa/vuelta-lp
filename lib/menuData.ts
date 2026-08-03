// ========================================
// VUELTA — Menu Data (Single Source of Truth)
// メニューの追加・変更はここだけ編集する
// 最終更新: 2026-08-03（最新PDFに準拠 + 全品説明文）
// ========================================

export interface MenuItem {
  name: string
  nameJa?: string
  /** 単品価格（税込）。サブスク対象など個別価格なしの品は省略 */
  price?: number
  /** "¥900 / 2 pc" のような特殊表記。指定時はこの文字列をそのまま表示する */
  priceLabel?: string
  description?: string
  descriptionJa?: string
  /** 材料リスト（カクテル用） */
  ingredients?: string
}

export interface MenuCategory {
  title: string
  /** カテゴリ説明（例: "Serving: Neat, Rocks, ..."） */
  subtitle?: string
  items: MenuItem[]
}

// ── COVER CHARGE ──────────────────────────

export const coverCharge: MenuCategory = {
  title: 'COVER CHARGE',
  items: [
    {
      name: 'Cover Charge',
      nameJa: 'お通し（席料）',
      price: 300,
      description: 'A traditional Japanese bar seating fee per person.',
    },
  ],
}

// ── RECOMMEND ─────────────────────────────

export const recommend: MenuCategory = {
  title: 'RECOMMEND',
  items: [
    {
      name: 'Hiroshima Cocktail Journey',
      nameJa: 'ヒロシマ カクテル ジャーニー',
      price: 4000,
      descriptionJa: '広島を、飲んで旅する。',
      description:
        "Drink your way through Hiroshima in three acts. 1st: Tipsy Crane, Hiroshima sake as a Negroni. 2nd: Shell We?, Miyajima oysters as a gin sonic. 3rd: The OKONOMIYAKI, Hiroshima's soul food in a glass. Plus one dish of your choice.",
    },
    {
      name: 'Short Journey',
      nameJa: 'ショート ジャーニー',
      priceLabel: '+¥600',
      descriptionJa: '寄り道も、旅のうち。',
      description: 'A detour is still a journey. Two tacos with any cocktail.',
    },
  ],
}

// ── COCKTAILS ─────────────────────────────

export const cocktailCategories: MenuCategory[] = [
  {
    title: 'HIROSHIMA',
    items: [
      {
        name: 'Hiroshima 75',
        nameJa: 'ヒロシマ セブンティファイブ',
        price: 900,
        ingredients: 'SAKURAO / Taketsuru / St-Germain / Lemon / Peach',
        description:
          'Our Hiroshima answer to the French 75. SAKURAO gin and Taketsuru meet elderflower, lemon and a hint of peach — bright, floral, made for your first glass.',
        descriptionJa:
          'フレンチ75の広島版。桜尾ジンと竹鶴に、エルダーフラワーの香りとレモン、桃をひとさじ。最初の一杯にどうぞ。',
      },
      {
        name: 'The OKONOMIYAKI #2',
        nameJa: 'ザ オコノミヤキ',
        price: 1000,
        ingredients: 'Shochu / Otafuku Sauce / Cabbage Water / Bacon / Aosa',
        description:
          "Okonomiyaki is Hiroshima's post-war soul food. We distilled that legacy into a glass—rich sauce and savory umami, our history served with pride.",
        descriptionJa:
          '戦後広島のソウルフード、お好み焼きをグラスの中に。2代目レシピは焼酎にオタフクソースとキャベツウォーター、ベーコンとあおさを添えました。',
      },
      {
        name: 'VUELTA Lemon Sour',
        nameJa: 'ブエルタ レモンサワー',
        price: 1200,
        ingredients: 'KOME / Lemon / Tonic',
        description:
          'The izakaya standard, tuned our way: rice shochu and fresh lemon, topped with tonic instead of soda for a gentle bitter edge.',
        descriptionJa:
          'おなじみのレモンサワーをブエルタ流に。米焼酎と生レモン、割りはソーダではなくトニック。ほのかな苦みであとを引きます。',
      },
      {
        name: 'Shell We?',
        nameJa: 'シェル ウィー？',
        price: 1600,
        ingredients: 'Gin / Dashi Rice Vinegar / Tonic Soda',
        description:
          'Celebrating the world-famous oysters of the Seto Inland Sea. Briny minerals, fresh citrus, and coastal elegance in a glass. Shall we toast?',
        descriptionJa:
          '瀬戸内の牡蠣に着想を得た、開店以来の看板カクテル。ジンに出汁を効かせた米酢とトニックソーダ。磯のミネラルと柑橘をきりっと一杯に。',
      },
      {
        name: "Don't Feed the Dear",
        nameJa: 'ドント フィード ザ ディア',
        price: 1850,
        ingredients: 'Mizunara / Azuki / Chestnut / Milk / Momiji Leaf',
        description:
          "Miyajima in dessert form: mizunara, azuki, chestnut and milk, crowned with a maple leaf. The name borrows the island's famous rule — please don't feed the deer.",
        descriptionJa:
          '宮島をデザートカクテルに。ミズナラに小豆と栗、ミルクを重ね、紅葉をあしらいました。名前は宮島のお約束「鹿にエサをあげないで」から。',
      },
      {
        name: 'Tipsy Crane',
        nameJa: 'ヨイヅル',
        price: 2200,
        ingredients: 'Gin / Sake / Campari / Sweet Vermouth',
        description:
          "A Negroni retold with Hiroshima sake — gin, Campari and sweet vermouth, rounded by the sake's soft rice sweetness. Yoizuru means 'tipsy crane.'",
        descriptionJa:
          'ネグローニを広島の日本酒で仕立て直しました。ジンとカンパリ、スイートベルモットに、日本酒の柔らかな甘みを。ヨイヅルは「ほろ酔いの鶴」のことです。',
      },
    ],
  },
  {
    title: 'JAPAN',
    items: [
      {
        name: 'Cherry Blossoms Margarita',
        nameJa: 'サクラマルガリータ',
        price: 1000,
        ingredients: 'Tequila / Sakura / Lemon',
        description:
          'A margarita gone hanami: tequila, sakura and fresh lemon. Cherry-blossom season in a glass, whatever the month.',
        descriptionJa:
          'マルガリータをお花見仕立てに。テキーラに桜とレモン。グラスの中は、いつ来ても桜の季節です。',
      },
      {
        name: 'Electric Buck',
        nameJa: 'デンゲキバック',
        price: 850,
        ingredients: 'Sansho-Gin / Ginger Ale',
        description:
          "Gin infused with sansho — Japan's tingling mountain pepper — lengthened with dry ginger ale. The 'dengeki' (electric shock) is real.",
        descriptionJa:
          '山椒を漬け込んだジンをドライジンジャーエールで。舌がピリッとしびれる山椒の刺激が、デンゲキの名の由来です。',
      },
      {
        name: 'Yaoyorozu Mule ∞',
        nameJa: 'ヤオヨロズミュール∞',
        price: 1200,
        ingredients: '"WA"PIRITS / Ginger Vinegar / Myoga / Shiso / Ginger',
        description:
          "A Japanese mule layered with myoga, shiso and ginger two ways. Named for the yaoyorozu — the eight million gods said to dwell in all things.",
        descriptionJa:
          'WAPIRITSにミョウガ、しそ、生姜と生姜酢を重ねた和のミュール。名前は八百万の神から取りました。',
      },
      {
        name: 'Kaku-Gari-Ta',
        nameJa: 'カクガリータ',
        price: 1800,
        ingredients: 'Tequila / Mezcal / KOME / Wasabi',
        description:
          "If a margarita is 'maru' — round — ours goes 'kaku': square. Tequila and smoky mezcal, sharpened with rice shochu and a hit of wasabi.",
        descriptionJa:
          'マル（丸）ガリータならぬ、カク（角）ガリータ。テキーラとメスカルの燻香に、米焼酎とわさびのキレを効かせました。',
      },
    ],
  },
  {
    title: 'ELSEWHERE',
    items: [
      {
        name: '1886',
        nameJa: 'エイティーン・エイティシックス',
        price: 950,
        ingredients: 'Cherry Brandy / Cynar / Angostura Bitters / Cola',
        description:
          'Not what it seems: cherry brandy, Cynar and bitters hiding in a classic cola bottle. 1886 is the year Coca-Cola was born.',
        descriptionJa:
          '見た目はコーラ、中身はチェリーブランデーとチナールとビターズ。1886は、コカコーラが生まれた年です。',
      },
      {
        name: '26 hours',
        nameJa: 'トゥエンティーシックスアワーズ',
        price: 1250,
        ingredients: 'Beefeater 24 / Tomato / Cucumber',
        description:
          'We stay open until the 26th hour—2 AM. Clear tomato, cucumber, and light minerals. Refreshing enough to keep the magic alive until last call.',
        descriptionJa:
          '閉店は深夜2時、つまり26時まで。澄み切ったトマトときゅうりの清涼感で、最後の一杯まで軽やかに。',
      },
      {
        name: 'Smoked Cheese Paloma',
        nameJa: 'スモークチーズパロマ',
        price: 1100,
        ingredients: 'Tequila / Smoked Cheese / Grapefruit / Tonic / Black Pepper',
        description:
          'A paloma with a bar-snack soul: tequila and grapefruit under smoked cheese and black pepper. Salty, smoky, oddly perfect.',
        descriptionJa:
          'パロマにスモークチーズと黒胡椒。塩気と燻香がグレープフルーツを引き立てる、おつまみのようなカクテルです。',
      },
    ],
  },
  {
    title: 'MOCKTAILS',
    items: [
      {
        name: 'Hiroshima Lemon Tonic',
        nameJa: '広島檸檬スカッシュ',
        price: 800,
        ingredients: 'Lemon / Homemade Syrup / Tonic',
        description:
          'Hiroshima grows more lemons than anywhere else in Japan. Ours get homemade syrup and tonic — all of the bar, none of the alcohol.',
        descriptionJa:
          'レモンの生産量日本一は広島県。自家製シロップとトニックで仕上げる、ノンアルコールの一杯です。',
      },
    ],
  },
]

// ── SUBSCRIPTION（First Drink Pass 対象ラインナップ）──

export const subscription: MenuCategory = {
  title: 'SUBSCRIPTION',
  subtitle: 'month / ¥1,980',
  items: [
    {
      name: 'The OKONOMIYAKI #2',
      nameJa: 'ザ オコノミヤキ',
      ingredients: 'Shochu / Otafuku Sauce / Cabbage Water / Bacon / Aosa',
    },
    {
      name: '26 hours',
      nameJa: 'トゥエンティーシックスアワーズ',
      ingredients: 'Beefeater 24 / Clarified Tomato / Cucumber / Soda',
    },
    {
      name: 'VUELTA Lemon Sour',
      nameJa: 'ブエルタ レモンサワー',
      ingredients: 'SG KOME / Fresh Lemon / Tonic',
    },
    {
      name: 'Electric Buck',
      nameJa: 'デンゲキバック',
      ingredients: 'Sansho-Infused Gin / Dry Ginger Ale',
    },
    { name: 'Yamazaki NV', nameJa: '山崎NV', description: 'Single Malt Whisky' },
    { name: 'SAKURAO GIN', nameJa: '桜尾ジン', description: 'Hiroshima Dry Gin' },
    { name: 'Nikaido', nameJa: '二階堂', description: 'Barley Shochu, Oita' },
    {
      name: 'Kurokirishima',
      nameJa: '黒霧島',
      description: 'Sweet Potato Shochu, Miyazaki',
    },
    { name: 'Torikai', nameJa: '鳥飼', description: 'Rice Shochu, Kumamoto' },
  ],
}

// ── FOOD ──────────────────────────────────

export const foodCategories: MenuCategory[] = [
  {
    title: 'FOOD',
    items: [
      {
        name: 'Chocolate Bonbon',
        nameJa: 'ボンボンショコラ',
        price: 350,
        priceLabel: '¥350 / pc',
        description:
          'A one-bite chocolate to sit beside your whisky or your last cocktail of the night.',
        descriptionJa: 'ウイスキーや締めの一杯に、ひと粒ずつどうぞ。',
      },
      {
        name: 'Olives',
        nameJa: 'オリーブ',
        price: 500,
        description: 'Simple, briny and always right with a first drink.',
        descriptionJa: '一杯目のお供に。',
      },
      {
        name: 'Rum Raisin Butter',
        nameJa: 'ラムレーズンバター',
        price: 500,
        description:
          'Rum-soaked raisins folded into butter. Sweet meets salty — quietly dangerous with whisky.',
        descriptionJa:
          'ラム酒に漬けたレーズンをバターに合わせました。ウイスキーと、静かに危険な組み合わせです。',
      },
      {
        name: 'Gansu',
        nameJa: '草津 坂井屋のガンス',
        price: 500,
        description:
          "Hiroshima's homegrown fish-cake fry with a peppery kick. Ours comes from Sakaiya, a maker in Kusatsu, Hiroshima.",
        descriptionJa:
          '魚のすり身をピリ辛の衣で揚げた広島の惣菜。草津の坂井屋から仕入れています。',
      },
      {
        name: 'Hand-Cut Fries',
        nameJa: '手切り生ポテトフライ',
        price: 650,
        description:
          'Cut by hand from raw potatoes, never frozen. Truffle Salt +200 / Sweet Chili +300.',
        descriptionJa:
          '冷凍ではなく、生のじゃがいもから手切り。トリュフ塩やスイートチリでどうぞ。',
      },
      {
        name: 'Gansu Tacos',
        nameJa: 'ガンスタコス',
        price: 900,
        priceLabel: '¥900 / 2 pc',
        description:
          'A crispy, golden-fried fish cutlet blended with sweet onions and a savory, spicy kick.',
        descriptionJa:
          '坂井屋のガンスと甘い玉ねぎを合わせた、広島生まれのタコスです。',
      },
      {
        name: 'Carnitas Tacos',
        nameJa: 'ポーク カルニタス タコス',
        price: 850,
        priceLabel: '¥850 / 2 pc',
        description:
          'Pork slow-cooked until tender, then crisped at the edges — the classic carnitas.',
        descriptionJa:
          '豚肉をやわらかく煮込み、香ばしく仕上げた定番のカルニタスです。',
      },
      {
        name: 'Cheesy Carnitas',
        nameJa: 'チーズタコス',
        price: 950,
        priceLabel: '¥950 / 2 pc',
        description: 'Our carnitas taco with melted cheese. Enough said.',
        descriptionJa: 'カルニタスタコスに、とろけるチーズをプラスしました。',
      },
    ],
  },
]

// ── SPIRITS & DRINKS ──────────────────────

export const spiritsCategories: MenuCategory[] = [
  {
    title: 'BEER',
    items: [
      {
        name: 'Sapporo Lager "AKABOSHI"',
        nameJa: 'サッポロ 赤星',
        price: 700,
        description: "Japan's oldest beer brand, pouring since 1877.",
      },
      {
        name: 'Kirin Lager',
        nameJa: 'キリンラガー',
        price: 700,
        description: 'A Japanese classic since 1888.',
      },
    ],
  },
  {
    title: 'GIN',
    subtitle: 'Tonic, Soda, Rocks, or Neat',
    items: [
      {
        name: 'SAKURAO',
        nameJa: '桜尾',
        price: 650,
        description: 'Dry gin distilled in Hatsukaichi, Hiroshima, with local botanicals.',
      },
      {
        name: 'Monkey 47',
        nameJa: 'モンキー47',
        price: 1650,
        description: 'Black Forest gin with 47 botanicals.',
      },
    ],
  },
  {
    title: 'SHOCHU',
    subtitle: 'Rocks, Water, or Highball',
    items: [
      {
        name: 'Torikai',
        nameJa: '鳥飼（米）',
        price: 800,
        description: 'Rice shochu from Kumamoto with a famously fragrant, ginjo-like aroma.',
      },
    ],
  },
  {
    title: 'SAKE',
    items: [
      {
        name: 'Taketsuru',
        nameJa: '竹鶴',
        price: 700,
        description:
          'From Takehara, Hiroshima — the brewing family that raised Masataka Taketsuru, the father of Japanese whisky.',
      },
    ],
  },
  {
    title: 'JAPANESE WHISKY',
    subtitle: 'Neat, Rocks, Water, or Highball',
    items: [
      {
        name: 'Kaku',
        nameJa: '角',
        price: 600,
        description: "Suntory's yellow-label standard — the whisky behind Japan's highball culture.",
      },
      {
        name: 'Taketsuru Pure Malt',
        nameJa: '竹鶴',
        price: 1000,
        description: "Nikka's malt, named for founder Masataka Taketsuru — a son of Hiroshima.",
      },
      {
        name: 'Yamazaki 12y',
        nameJa: '山崎12年',
        price: 1800,
        description: "From Japan's first malt whisky distillery, founded 1923.",
      },
      {
        name: "Hibiki Blender's Choice",
        nameJa: '響 ブレンダーズチョイス',
        price: 2800,
        description: "Suntory's blending craft at its most polished.",
      },
    ],
  },
  {
    title: 'Japanese Peated Collection',
    subtitle: 'Neat, Rocks, Water, or Highball',
    items: [
      {
        name: 'Yoichi',
        nameJa: '余市',
        price: 1000,
        description: "Nikka's Hokkaido home — still coal-fired, bold and briny.",
      },
      {
        name: 'Hakushu 12y',
        nameJa: '白州12年',
        price: 1800,
        description: "Green and gently smoky, from Suntory's forest distillery.",
      },
      {
        name: 'Akkeshi',
        nameJa: '厚岸',
        price: 2800,
        description: 'Islay-style whisky from an oyster town in eastern Hokkaido.',
      },
    ],
  },
]
