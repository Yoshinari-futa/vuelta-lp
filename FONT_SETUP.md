# ローカルフォントの設定ガイド

## ステップ1: フォントファイルを配置

使用したいフォントファイル（`.woff2`, `.woff`, `.ttf`, `.otf`）を以下のディレクトリに配置してください：

```
app/fonts/
```

## ステップ2: layout.tsxを編集

`app/layout.tsx`を開いて、コメントアウトされている例を参考に、実際のフォントファイル名に合わせて設定してください。

### 単一のフォントファイルの場合

```typescript
const customFont = localFont({
  src: './fonts/YourFont-Regular.woff2',
  variable: '--font-custom',
  display: 'swap',
})
```

### 複数のフォントファイル（Regular, Boldなど）がある場合

```typescript
const customFont = localFont({
  src: [
    {
      path: './fonts/YourFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/YourFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/YourFont-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-custom',
  display: 'swap',
})
```

## ステップ3: bodyタグに追加

`layout.tsx`の`<body>`タグの`className`に、フォントの変数を追加してください：

```typescript
<body className={`${playfair.variable} ${inter.variable} ${customFont.variable} font-sans antialiased`}>
```

## ステップ4: Tailwindで使用

`tailwind.config.js`の`fontFamily`に追加します：

```javascript
fontFamily: {
  serif: ['var(--font-serif)', 'serif'],
  sans: ['var(--font-sans)', 'sans-serif'],
  custom: ['var(--font-custom)', 'sans-serif'], // 追加
},
```

## ステップ5: コンポーネントで使用

Tailwindのクラスで使用できます：

```tsx
<h1 className="font-custom">見出し</h1>
```

または、既存のフォントを置き換える場合：

```tsx
// セリフフォントをカスタムフォントに置き換える場合
<h1 className="font-serif">見出し</h1>
```

## 例：セリフフォントをカスタムフォントに置き換える場合

1. `layout.tsx`で：
```typescript
const customSerif = localFont({
  src: './fonts/CustomSerif-Regular.woff2',
  variable: '--font-serif', // 既存の変数名を使用
  display: 'swap',
})
```

2. `tailwind.config.js`は変更不要（既に`--font-serif`を使用しているため）

3. `page.tsx`で`font-serif`クラスを使用すると、自動的にカスタムフォントが適用されます。
