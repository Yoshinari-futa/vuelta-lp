# 動画・画像の配置ガイド

## 🎬 動画の配置場所の推奨

### 1. **Heroセクションの背景動画（最推奨）**
**場所：** `app/page.tsx` の28-32行目あたり

**効果：**
- 第一印象を強く残す
- バーの雰囲気を即座に伝える
- エンゲージメント向上

**実装例：**
```tsx
<section className="relative h-screen flex items-center justify-center overflow-hidden">
  {/* 背景動画 */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
    poster="/images/video-poster.jpg"
  >
    <source src="/videos/hero-background.mp4" type="video/mp4" />
    <source src="/videos/hero-background.webm" type="video/webm" />
  </video>
  
  {/* オーバーレイ（テキストの可読性を確保） */}
  <div className="absolute inset-0 bg-white/20 z-[1]"></div>
  
  {/* 既存のコンテンツ */}
  <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
    {/* ... */}
  </div>
</section>
```

### 2. **Brand Conceptセクションの動画**
**場所：** `app/page.tsx` の128-142行目あたり（現在の画像プレースホルダーの場所）

**効果：**
- コンセプト「クロスロード」を視覚的に表現
- ストーリー性の強化

**実装例：**
```tsx
<FadeInUp delay={0.2}>
  <div className="relative aspect-[4/5] bg-vuelta-gray overflow-hidden group rounded-lg">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      poster="/images/concept-video-poster.jpg"
    >
      <source src="/videos/concept.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all duration-500" />
  </div>
</FadeInUp>
```

### 3. **カクテル制作動画（オプション）**
**場所：** `app/page.tsx` の231-270行目あたり（Signature Cocktailsセクション）

**効果：**
- カクテルの価値を高める
- インタラクティブな体験

**実装例：**
```tsx
<div className="relative aspect-[3/4] bg-vuelta-light overflow-hidden mb-4 rounded-lg group">
  <video
    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
    loop
    muted
    playsInline
  >
    <source src="/videos/cocktail-making.mp4" type="video/mp4" />
  </video>
  {/* 通常時は静止画を表示 */}
  <Image
    src={item.image}
    alt={item.name}
    fill
    className="object-cover group-hover:opacity-0 transition-opacity duration-500"
  />
</div>
```

---

## 📸 自分で撮影した画像に変更する方法

### ステップ1: 画像ファイルを配置

1. **画像ファイルを準備**
   - 推奨形式：`.jpg`, `.png`, `.webp`
   - 推奨サイズ：
     - Hero背景：1920x1080px以上
     - カクテル画像：600x800px（3:4のアスペクト比）
     - その他：用途に応じて

2. **画像を配置する場所**
   ```
   public/
     images/
       cocktails/
         shell-we.jpg
         okonomiyaki.jpg
         aki-amber.jpg
         miyajima-velvet.jpg
       hero-background.jpg
       concept-image.jpg
   ```

### ステップ2: コードを変更

#### カクテル画像の変更

**ファイル：** `app/page.tsx` の232-236行目

**変更前：**
```tsx
{ name: 'Shell We?', description: '...', price: '¥750', image: 'https://images.unsplash.com/...' },
```

**変更後：**
```tsx
{ name: 'Shell We?', description: '...', price: '¥750', image: '/images/cocktails/shell-we.jpg' },
```

**全てのカクテル画像を変更：**
```tsx
{[
  { name: 'Shell We?', description: 'Oyster Shell Gin, Lemon, Soda, Smoke Salt', price: '¥750', image: '/images/cocktails/shell-we.jpg' },
  { name: 'The OKONOMIYAKI', description: 'Dashi Vodka, Roasted Cabbage, Burnt Sauce, Tomato', price: '¥900', image: '/images/cocktails/okonomiyaki.jpg' },
  { name: 'AKI AMBER', description: 'Hojicha Gin, Sake, Hassaku, Soda', price: '¥800', image: '/images/cocktails/aki-amber.jpg' },
  { name: 'Miyajima Velvet', description: 'Signature blend', price: '¥1,200', image: '/images/cocktails/miyajima-velvet.jpg' },
].map((item, index) => {
```

#### Brand Conceptセクションの画像変更

**ファイル：** `app/page.tsx` の128-142行目あたり

**変更前：**
```tsx
<div className="absolute inset-0 bg-gradient-to-br from-vuelta-gray via-vuelta-light to-white">
  <div className="absolute inset-0 flex items-center justify-center">
    {/* プレースホルダー */}
  </div>
</div>
```

**変更後：**
```tsx
<Image
  src="/images/concept-image.jpg"
  alt="VUELTA bar interior"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

#### Heroセクションの背景画像変更（動画を使わない場合）

**ファイル：** `app/page.tsx` の30行目あたり

**変更前：**
```tsx
<div className="absolute inset-0 bg-gradient-to-b from-white via-vuelta-gray to-white">
  <div className="absolute inset-0 bg-[url('data:image/svg+xml...')] opacity-20"></div>
</div>
```

**変更後：**
```tsx
<div className="absolute inset-0">
  <Image
    src="/images/hero-background.jpg"
    alt="VUELTA bar"
    fill
    className="object-cover opacity-30"
    priority
    sizes="100vw"
  />
  <div className="absolute inset-0 bg-white/40"></div>
</div>
```

---

## 🎥 動画ファイルの準備

### 動画の要件

1. **形式：**
   - MP4（H.264）: 最も互換性が高い
   - WebM: より小さなファイルサイズ（オプション）

2. **解像度：**
   - Hero背景：1920x1080px（Full HD）
   - その他：用途に応じて

3. **ファイルサイズ：**
   - 5MB以下を目標（読み込み速度のため）

4. **長さ：**
   - 15-30秒のループ動画

5. **音声：**
   - サイレント（音声なし）推奨

### 動画ファイルの配置

```
public/
  videos/
    hero-background.mp4
    hero-background.webm (オプション)
    concept.mp4
    cocktail-making.mp4
```

### 動画の最適化ツール

- **オンラインツール：** HandBrake, FFmpeg
- **コマンドライン（FFmpeg）：**
  ```bash
  # MP4に変換・圧縮
  ffmpeg -i input.mov -vcodec h264 -acodec aac -crf 23 output.mp4
  
  # WebMに変換
  ffmpeg -i input.mov -vcodec libvpx-vp9 -acodec libopus -crf 30 output.webm
  ```

---

## 📝 実装の手順

### 動画を追加する場合

1. **動画ファイルを準備**
   - 上記の要件に従って動画を準備
   - `public/videos/` に配置

2. **コードを変更**
   - `app/page.tsx` の該当箇所に動画タグを追加
   - 上記の実装例を参考に

3. **ポスター画像を追加**
   - 動画の最初のフレームを画像として保存
   - `public/images/` に配置

4. **テスト**
   - ブラウザで確認
   - モバイルでも動作確認

### 画像を変更する場合

1. **画像ファイルを準備**
   - 推奨サイズ・形式で準備
   - `public/images/` の適切なフォルダに配置

2. **コードを変更**
   - `app/page.tsx` の該当箇所の画像パスを変更
   - 上記の例を参考に

3. **テスト**
   - ブラウザで確認
   - 画像が正しく表示されるか確認

---

## ⚠️ 注意事項

1. **ファイルサイズ**
   - 画像・動画は必ず最適化してから使用
   - 大きなファイルは読み込みが遅くなります

2. **Next.js Imageコンポーネント**
   - ローカル画像は `/images/...` の形式で指定
   - 外部URLは `next.config.js` で許可が必要

3. **モバイル対応**
   - モバイルでは動画を無効化する場合がある
   - ポスター画像で代替表示

4. **パフォーマンス**
   - 動画は `loading="lazy"` を使用
   - 必要に応じて遅延読み込みを実装

---

## 🚀 次のステップ

1. 動画・画像ファイルを準備
2. 上記の手順に従って実装
3. ブラウザで確認
4. 必要に応じて最適化

質問があれば、お気軽にお聞きください！
