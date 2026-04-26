// ========================================
// VUELTA — Menu Data (Single Source of Truth)
// メニューの追加・変更はここだけ編集する
// 最終更新: 2026-04-26（最新PDFに準拠）
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

// ── FOOD ──────────────────────────────────

export const foodCategories: MenuCategory[] = [
  {
    title: 'THE REPERTOIRE',
    items: [
      {
        name: 'Gansu',
        nameJa: '草津 坂井屋のガンス',
        price: 500,
        description:
          "Hiroshima's signature crispy fish cutlet with a savory, spicy kick.",
      },
      { name: 'Olives', nameJa: 'オリーブ', price: 600 },
      {
        name: 'Rum Raisin Butter',
        nameJa: 'ラムレーズンバター',
        price: 600,
      },
      {
        name: 'Sweet Potato Crisps Mascarpone',
        nameJa: 'チップス ハニーマスカルポーネ',
        price: 650,
      },
      {
        name: 'Spinach',
        nameJa: 'スピナッチ',
        price: 550,
      },
      {
        name: 'Hand-Cut Fries',
        nameJa: '手切り生ポテトフライ',
        price: 650,
        description: 'Truffle Salt +200 / Sweet Chili +300',
      },
      {
        name: 'Gansu Tacos',
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
        name: 'Cheesy Carnitas',
        nameJa: 'チーズタコス',
        price: 950,
        priceLabel: '950 / 2 pc',
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
      name: '26 hours',
      nameJa: 'トゥエンティーシックスアワーズ',
      price: 1250,
      ingredients: 'Beefeater 24 / Clarified Tomato / Cucumber / Soda',
      description:
        'We stay open until the 26th hour—2 AM. Clear tomato, cucumber, and light minerals. Refreshing enough to keep the magic alive until last call.',
    },
    {
      name: '1886',
      nameJa: 'エイティーン・エイティシックス',
      price: 1300,
      ingredients: 'Cherry Brandy / Amer Picon / Angostura Bitters / Cola',
      description:
        'Not what it seems. A sophisticated botanical cocktail disguised in a classic cola bottle. Expect the unexpected.',
    },
    {
      name: 'Shell We?',
      nameJa: 'シェル ウィー？',
      price: 1600,
      ingredients: 'SAKURAO Gin / Shiro-Dashi / Rice Vinegar / Lemon / Tonic Soda',
      description:
        "Celebrating the world-famous oysters of the Seto Inland Sea. Briny minerals, fresh citrus, and coastal elegance in a glass. Shall we toast?",
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
      price: 1000,
      ingredients: 'Tequila Silver / Sakura Liqueur / Lemon / Sakura Petal',
    },
    {
      name: 'Electric Buck',
      nameJa: 'デンゲキバック',
      price: 850,
      ingredients: 'Sansho-Infused Gin / Dry Ginger Ale',
    },
    {
      name: 'Smoked Cheese Paloma',
      nameJa: 'スモークチーズパロマ',
      price: 1100,
      ingredients: 'Agaveros Tequila / Smoked Cheese / Grapefruit / Tonic / Black Pepper',
    },
    {
      name: 'Yaoyorozu Mule ∞',
      nameJa: 'ヤオヨロズミュール∞',
      price: 1200,
      ingredients: 'WAPIRITS TUMUGI / Ginger Vinegar / Myoga / Shiso / Ginger beer',
    },
    {
      name: 'Tipsy Crane',
      nameJa: 'ヨイヅル',
      price: 1500,
      ingredients: 'Sakurao Gin / Kamotsuru Sake / Campari / Sweet Vermouth / Sakura Bitters',
    },
    {
      name: 'Kaku-Gari-Ta',
      nameJa: 'カクガリータ',
      price: 1800,
      ingredients: 'Tequila / Mezcal / SG KOME / Wasabi Salt',
    },
  ],
}

// ── RECOMMEND ─────────────────────────────

export const recommend: MenuCategory = {
  title: 'RECOMMEND',
  items: [
    {
      name: 'VUELTA Lemon Sour',
      nameJa: 'ブエルタ レモンサワー',
      price: 1200,
      ingredients: 'SG KOME / Fresh Lemon / Soda',
    },
    {
      name: 'Hiroshima Cocktail Journey',
      nameJa: 'ヒロシマ カクテル ジャーニー',
      price: 4000,
      ingredients: 'Tipsy Crane / Shell We? / The OKONOMIYAKI + any 1 food of your choice',
      description: 'The best way to begin your night in Hiroshima.',
    },
  ],
}

// ── SPIRITS & DRINKS ──────────────────────

export const spiritsCategories: MenuCategory[] = [
  {
    title: 'BEER',
    items: [
      { name: 'Sapporo Lager "AKABOSHI"', nameJa: 'サッポロ 赤星', price: 850 },
    ],
  },
  {
    title: 'WHISKY',
    subtitle: 'Neat, Rocks, Water, or Highball',
    items: [
      { name: 'Kaku', nameJa: '角', price: 650 },
      {
        name: 'Taketsuru Pure Malt',
        nameJa: '竹鶴',
        price: 1450,
        description: "The Founder's Roots",
      },
      { name: 'Yamazaki NV', nameJa: '山崎', price: 800 },
      { name: 'Yamazaki 12y', nameJa: '山崎12年', price: 1000 },
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
      { name: 'DAIYAME', nameJa: 'だいやめ', price: 700, description: 'Sweet Potato' },
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
      },
      {
        name: 'Kamotsuru',
        nameJa: '賀茂鶴 大吟醸 特製ゴールド',
        price: 1000,
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
