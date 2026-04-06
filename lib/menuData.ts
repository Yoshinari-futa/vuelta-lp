// ========================================
// VUELTA — Menu Data (Single Source of Truth)
// メニューの追加・変更はここだけ編集する
// ========================================

export interface MenuItem {
  name: string
  nameJa?: string
  price: number
  /** "1,000 / 2 pc" のような特殊表記 */
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

// ── FOOD ──────────────────────────────────

export const foodCategories: MenuCategory[] = [
  {
    title: 'RECOMMEND',
    items: [
      {
        name: 'Gansu Tacos (Hiroshima Soul Food)',
        nameJa: 'ガンスタコス',
        price: 1000,
        priceLabel: '1,000 / 2 pc',
        description:
          'A crispy, golden-fried fish cutlet blended with sweet onions and a savory, spicy kick.',
      },
      {
        name: 'Carnitas Tacos',
        nameJa: 'ポーク カルニタス タコス',
        price: 900,
        priceLabel: '900 / 2 pc',
      },
      {
        name: 'Cheesy Melt Carnitas',
        nameJa: 'チーズタコス',
        price: 950,
        priceLabel: '950 / 2 pc',
      },
    ],
  },
  {
    title: 'THE REPERTOIRE',
    items: [
      {
        name: 'Hiroshima Heritage: Sakai-ya\'s "Gansu"',
        nameJa: '草津 坂井屋のガンス',
        price: 550,
        description:
          "Hiroshima's signature crispy fish cutlet with a savory, spicy kick.",
      },
      {
        name: 'Sweet Potato Crisps Honey Mascarpone',
        nameJa: 'チップス ハニーマスカルポーネ',
        price: 600,
      },
      {
        name: 'The Manhattan Legacy Spinach',
        nameJa: 'ベンジャミンステーキハウス風スピナッチ',
        price: 650,
      },
    ],
  },
  {
    title: 'SMALL TALK',
    items: [
      { name: 'Olives', nameJa: 'オリーブ', price: 600 },
      { name: 'Cashews', nameJa: 'カシューナッツ', price: 500 },
      {
        name: 'Homemade Rum Raisin Butter',
        nameJa: '自家製ラムレーズンバター',
        price: 600,
      },
      {
        name: 'Crispy Chickpea Fritters',
        nameJa: 'ひよこ豆のフリット',
        price: 600,
        description: 'Crispy fried, topped with freshly shaved Parmesan.',
      },
      {
        name: 'Hand-Cut Fries',
        nameJa: '手切り生ポテトフライ',
        price: 600,
        description: 'Black Truffle +200 / Sweet Chili +500',
      },
    ],
  },
]

// ── SIGNATURE COCKTAILS ───────────────────

export const signatureCocktails: MenuCategory = {
  title: 'SIGNATURE COCKTAILS',
  items: [
    {
      name: 'The OKONOMIYAKI',
      nameJa: 'ザ オコノミヤキ',
      price: 1200,
      ingredients: 'Dashi-Infused Vodka / Spiced Clam Tomato / Campari / Lemon',
      description:
        "Okonomiyaki is Hiroshima's post-war soul food. We distilled that legacy into a glass. Savory dashi and rich sauce—our history, served with pride.",
    },
    {
      name: '1886',
      nameJa: 'エイティーン・エイティシックス',
      price: 1000,
      ingredients: 'Cherry Brandy / Amer Picon / Angostura Bitters / Cola',
      description:
        'Not what it seems. A sophisticated botanical cocktail disguised in a classic cola bottle. Expect the unexpected.',
    },
    {
      name: 'Shell We?',
      nameJa: 'シェル ウィー？',
      price: 1500,
      ingredients: 'SAKURAO Gin / Shiro-Dashi / Rice Vinegar / Lemon / Tonic Soda',
      description:
        "Celebrating the world-famous oysters of the Seto Inland Sea. Briny minerals, fresh citrus, and coastal elegance in a glass. Shall we toast?",
    },
    {
      name: '26 hours',
      nameJa: 'トゥエンティーシックスアワーズ',
      price: 1200,
      ingredients: 'Beefeater 24 / Clarified Tomato / Cucumber / Soda',
      description:
        'We stay open until the 26th hour—2 AM. Clear tomato, cucumber, and light minerals. Refreshing enough to keep the magic alive until last call.',
    },
  ],
}

// ── COCKTAILS ─────────────────────────────

export const cocktails: MenuCategory = {
  title: 'COCKTAILS',
  items: [
    {
      name: 'Spring Bloom Margarita',
      nameJa: 'サクラマルガリータ',
      price: 950,
      ingredients: 'Tequila Silver / Sakura Liqueur / Lemon / Sakura Petal',
    },
    {
      name: 'Setouchi Fizz',
      nameJa: 'セトウチフィズ',
      price: 950,
      ingredients: 'Setouchi Lemon Gin / Fresh Lemon / Soda',
    },
    {
      name: 'Electric Buck',
      nameJa: 'デンゲキバック',
      price: 850,
      ingredients: 'Sansho-Infused Gin / Dry Ginger Ale',
    },
    {
      name: 'Tipsy Crane',
      nameJa: 'ヨイヅル',
      price: 1500,
      ingredients: 'Sakurao Gin / Kamotsuru Sake / Campari / Sweet Vermouth / Sakura Bitters',
    },
    {
      name: 'Yaoyorozu Mule ∞',
      nameJa: 'ヤオヨロズミュール∞',
      price: 1400,
      ingredients: 'WAPIRITS TUMUGI / Ginger Vinegar / Myoga / Shiso / Ginger beer',
    },
    {
      name: 'Smoked Cheese Paloma',
      nameJa: 'スモークチーズパロマ',
      price: 1200,
      ingredients: 'Agaveros Tequila / Smoked Cheese / Grapefruit / Tonic / Black Pepper',
    },
    {
      name: 'VUELTA Archive Project',
      nameJa: '恩送りの一杯',
      price: 800,
      description: 'Pay it forward / Message Card / Sharing Kindness',
      descriptionJa:
        '大手町の夜に一杯の「お節介」を。ショップカードのメッセージと共に、あなたの善意をアーカイブへ。',
    },
  ],
}

// ── SPIRITS & DRINKS ──────────────────────

export const spiritsCategories: MenuCategory[] = [
  {
    title: 'BEER',
    subtitle: 'BOTTLE',
    items: [
      { name: 'Sapporo Lager "AKABOSHI"', nameJa: 'サッポロ 赤星', price: 850 },
    ],
  },
  {
    title: 'WHISKY',
    subtitle: 'Serving: Neat, Rocks, Mizuwari (Water), or Highball (Soda)',
    items: [
      { name: 'Kaku', nameJa: '角', price: 650 },
      {
        name: 'Taketsuru Pure Malt',
        nameJa: '竹鶴',
        price: 1450,
        description: "The Founder's Roots (Born in Hiroshima)",
      },
      { name: 'Yamazaki NV', nameJa: '山崎', price: 900 },
      { name: 'Yamazaki 12y', nameJa: '山崎12年', price: 1200 },
    ],
  },
  {
    title: 'GIN',
    subtitle: 'Serving: Gin Tonic, Gin Soda, Rocks, or Neat',
    items: [
      { name: 'SAKURAO', nameJa: '桜尾', price: 650 },
      { name: 'Monkey 47', nameJa: 'モンキー47', price: 1650 },
    ],
  },
  {
    title: 'SHOCHU',
    subtitle: 'Serving: Rocks, Mizuwari (Water), or Highball (Soda)',
    items: [
      { name: 'DAIYAMA', nameJa: 'だいやめ', price: 700, description: 'Sweet Potato' },
      { name: 'Torikai', nameJa: '鳥飼（米）', price: 900, description: 'Rice' },
    ],
  },
  {
    title: 'SAKE',
    items: [
      {
        name: 'Taketsuru',
        nameJa: '竹鶴',
        price: 800,
        description:
          "The origin of a legacy. A bold, traditional sake from the birthplace of the 'Father of Japanese Whisky'.",
      },
      {
        name: 'Kamotsuru "Tokusei Gold" Daiginjo',
        nameJa: '賀茂鶴 大吟醸 特製ゴールド',
        price: 1000,
        description:
          'Iconic sake with Sakura gold flakes. Famously enjoyed by world leaders. Smooth and elegant.',
      },
    ],
  },
  {
    title: 'CHAMPAGNE',
    items: [
      {
        name: 'Perrier-Jouët Belle Epoque',
        nameJa: 'ペリエ ジュエ ベル エポック',
        price: 50000,
      },
      {
        name: 'Dom Pérignon Vintage',
        nameJa: 'ドン ペリニヨン ヴィンテージ',
        price: 65000,
      },
      {
        name: 'Louis Roederer Cristal',
        nameJa: 'ルイ ロデレール クリスタル',
        price: 80000,
      },
    ],
  },
]
