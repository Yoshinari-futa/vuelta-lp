# VUELTA - Premium Cocktail Bar Landing Page

Double Chicken Pleaseのような高級感とモダンさを兼ね備えたバーのランディングページです。

## 技術スタック

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (アニメーション)

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動（127.0.0.1:3000 にバインド）
npm run dev
```

ブラウザで **[http://127.0.0.1:3000/](http://127.0.0.1:3000/)** または [http://localhost:3000](http://localhost:3000) を開いてください。

### 表示できない・500 エラーになるとき

`.next` のキャッシュが壊れていることがあります。次で消してから再起動してください。

```bash
cd Webアプリ/lp   # リポジトリルートから
npm run dev:clean
# または: rm -rf .next && npm run dev
```

別プロセスが **3000** を使っている場合（`EADDRINUSE`）:

```bash
# いちばん簡単：3000 を掴んでいる node を止めてから起動（macOS / Linux）
npm run dev:fresh
```

または **別ポート** で起動:

```bash
npm run dev:3001
# → http://127.0.0.1:3001/
```

手動で止める場合: `lsof -i :3000` で PID を確認し、そのターミナルの `Ctrl+C` か `kill <PID>`。

## デザインコンセプト

- **ダークモード基調**: ミニマルで洗練されたダークテーマ
- **タイポグラフィ**: セリフ体（Playfair Display）とサンセリフ体（Inter）の組み合わせ
- **大胆な余白**: 情報の価値を高めるホワイトスペース
- **スクロールアニメーション**: 要素がふわっと浮き出るフェードイン効果
- **ホバーエフェクト**: 滑らかな色変化と画像の拡大効果

## セクション構成

1. **Hero Section**: 全画面のメインビジュアルとキャッチコピー
2. **Brand Concept**: ストーリーを感じさせる画像とテキストレイアウト
3. **Featured Menu**: グリッドを崩した雑誌風ギャラリー
4. **Location/Access**: シンプルで機能的な情報配置
5. **Footer**: ミニマルで整理されたリンク集

## ビルド

```bash
npm run build
npm start
```
