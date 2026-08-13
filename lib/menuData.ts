// ========================================
// VUELTA — Menu Data (Single Source of Truth)
// メニューの追加・変更はここだけ編集する
// 最終更新: 2026-08-13（最新PDFに準拠）
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
        price: 1300,
        ingredients: 'SAKURAO / Taketsuru / St-Germain / Lemon / Peach',
        description:
          'A French 75 rebuilt with Hiroshima spirits — SAKURAO gin from Hatsukaichi and Taketsuru sake — brightened with St-Germain, lemon and peach.',
      },
      {
        name: 'The OKONOMIYAKI #2',
        nameJa: 'ザ オコノミヤキ',
        price: 1000,
        ingredients: 'Shochu / Otafuku Sauce / Cabbage Water / Bacon / Aosa',
        description:
          "Okonomiyaki is Hiroshima's post-war soul food. We distilled that legacy into a glass—rich sauce and savory umami, our history served with pride.",
      },
      {
        name: 'VUELTA Lemon Sour',
        nameJa: 'ブエルタ レモンサワー',
        price: 1200,
        ingredients: 'KOME / Lemon / Tonic',
        description:
          "Japan's izakaya-standard lemon sour, rebuilt as a craft cocktail: KOME rice shochu, fresh lemon and tonic.",
      },
      {
        name: 'Shell We?',
        nameJa: 'シェル ウィー？',
        price: 1600,
        ingredients: 'Gin / Dashi Rice Vinegar / Tonic Soda',
        description:
          'Celebrating the world-famous oysters of the Seto Inland Sea. Briny minerals, fresh citrus, and coastal elegance in a glass. Shall we toast?',
      },
      {
        name: "Don't Feed the Deer",
        nameJa: 'ドント フィード ザ ディア',
        price: 1850,
        ingredients: 'Mizunara / Azuki / Chestnut / Milk / Momiji Leaf',
        description:
          "Named after the signs that protect the wild deer of Miyajima island. A dessert cocktail of mizunara oak, azuki red bean, chestnut and milk — the flavors of Miyajima's momiji manju sweets — finished with a red maple leaf.",
      },
      {
        name: 'Tipsy Crane',
        nameJa: 'ヨイヅル',
        price: 2200,
        ingredients: 'Gin / Sake / Campari / Sweet Vermouth',
        description:
          "A Negroni reimagined with Hiroshima sake alongside gin, Campari and sweet vermouth. Named for the origami crane, Hiroshima's symbol of peace.",
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
          'A margarita in spring form: tequila, sakura cherry blossom and lemon.',
      },
      {
        name: 'Electric Buck',
        nameJa: 'デンゲキバック',
        price: 850,
        ingredients: 'Sansho-Gin / Ginger Ale',
        description:
          "Gin infused with sansho — the Japanese pepper that tingles on the tongue — topped with dry ginger ale. The 'electric' in the name is literal.",
      },
      {
        name: 'Yaoyorozu Mule ∞',
        nameJa: 'ヤオヨロズミュール∞',
        price: 1200,
        ingredients: '"WA"PIRITS / Ginger Vinegar / Myoga / Shiso / Ginger',
        description:
          'A Japanese mule of craft "WA"PIRITS with ginger vinegar, myoga and shiso. Named for the yaoyorozu — the eight million gods of Japanese folklore.',
      },
      {
        name: 'Kaku-Gari-Ta',
        nameJa: 'カクガリータ',
        price: 1800,
        ingredients: 'Tequila / Mezcal / KOME / Wasabi',
        description:
          'A margarita gone smoky and savoury: tequila and mezcal layered with KOME rice shochu and the slow-building heat of fresh wasabi.',
      },
    ],
  },
  {
    title: 'ELSEWHERE',
    items: [
      {
        name: '1886',
        nameJa: 'エイティーン・エイティシックス',
        price: 1000,
        ingredients: 'Cherry Brandy / Cynar / Angostura Bitters / Cola',
        description:
          'Not what it seems. A sophisticated botanical cocktail disguised in a classic cola bottle. Expect the unexpected.',
      },
      {
        name: '26 hours',
        nameJa: 'トゥエンティーシックスアワーズ',
        price: 1250,
        ingredients: 'Beefeater 24 / Tomato / Cucumber',
        description:
          'We stay open until the 26th hour—2 AM. Clear tomato, cucumber, and light minerals. Refreshing enough to keep the magic alive until last call.',
      },
      {
        name: 'Smoked Cheese Paloma',
        nameJa: 'スモークチーズパロマ',
        price: 1100,
        ingredients: 'Tequila / Smoked Cheese / Grapefruit / Tonic / Black Pepper',
        description:
          'A savoury paloma of tequila, grapefruit and tonic, layered with smoked cheese and cracked black pepper.',
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
          "Non-alcoholic. Hiroshima lemon — Japan's largest lemon-growing region — with homemade syrup and tonic.",
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
    { name: 'Torikai', nameJa: '鳥飼', description: 'Rice Shochu' },
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
        description: 'A single chocolate bonbon, made to sit beside whisky or a dessert cocktail.',
      },
      {
        name: 'Olives',
        nameJa: 'オリーブ',
        price: 500,
        description: 'The classic partner for gin, whisky and dry cocktails.',
      },
      {
        name: 'Rum Raisin Butter',
        nameJa: 'ラムレーズンバター',
        price: 500,
        description: 'Rum-soaked raisins folded into butter. Sweet, salty and made for whisky.',
      },
      {
        name: 'Gansu',
        nameJa: '草津 坂井屋のガンス',
        price: 500,
        description:
          "Hiroshima's signature crispy fish cutlet with a savory, spicy kick — made by Sakaiya, a fishcake shop in Hiroshima's Kusatsu district.",
      },
      {
        name: 'Hand-Cut Fries',
        nameJa: '手切り生ポテトフライ',
        price: 650,
        description:
          'Cut by hand from fresh potatoes, never frozen. Add Truffle Salt +200 or Sweet Chili +300.',
      },
      {
        name: 'Gansu Tacos',
        nameJa: 'ガンスタコス',
        price: 900,
        priceLabel: '¥900 / 2 pc',
        description:
          'A crispy, golden-fried fish cutlet blended with sweet onions and a savory, spicy kick.',
      },
      {
        name: 'Carnitas Tacos',
        nameJa: 'ポーク カルニタス タコス',
        price: 850,
        priceLabel: '¥850 / 2 pc',
        description: 'Tacos filled with slow-cooked pork carnitas. Two per order.',
      },
      {
        name: 'Cheesy Carnitas',
        nameJa: 'チーズタコス',
        price: 950,
        priceLabel: '¥950 / 2 pc',
        description: 'Pork carnitas tacos with cheese. Two per order.',
      },
    ],
  },
]

// ── SPIRITS & DRINKS ──────────────────────

export const spiritsCategories: MenuCategory[] = [
  {
    title: 'BEER',
    items: [
      { name: 'Sapporo Lager "AKABOSHI"', nameJa: 'サッポロ 赤星', price: 700 },
      { name: 'Kirin Lager', nameJa: 'キリンラガー', price: 700 },
    ],
  },
  {
    title: 'GIN',
    subtitle: 'Tonic, Soda, Rocks, or Neat',
    items: [
      { name: 'SAKURAO', nameJa: '桜尾', price: 650 },
      { name: 'Monkey 47', nameJa: 'モンキー47', price: 1650 },
    ],
  },
  {
    title: 'SHOCHU',
    subtitle: 'Rocks, Water, or Highball',
    items: [
      { name: 'Torikai', nameJa: '鳥飼（米）', price: 800, description: 'Rice' },
    ],
  },
  {
    title: 'SAKE',
    items: [
      {
        name: 'Taketsuru',
        nameJa: '竹鶴',
        price: 700,
      },
    ],
  },
  {
    title: 'JAPANESE WHISKY',
    subtitle: 'Neat, Rocks, Water, or Highball',
    items: [
      { name: 'Kaku', nameJa: '角', price: 600 },
      {
        name: 'Taketsuru Pure Malt',
        nameJa: '竹鶴',
        price: 1000,
      },
      { name: 'Yamazaki 12y', nameJa: '山崎12年', price: 1800 },
      {
        name: "Hibiki Blender's Choice",
        nameJa: '響 ブレンダーズチョイス',
        price: 2800,
      },
    ],
  },
  {
    title: 'Japanese Peated Collection',
    subtitle: 'Neat, Rocks, Water, or Highball',
    items: [
      { name: 'Yoichi', nameJa: '余市', price: 1000 },
      { name: 'Hakushu 12y', nameJa: '白州12年', price: 1800 },
      { name: 'Akkeshi', nameJa: '厚岸', price: 2800 },
    ],
  },
]
