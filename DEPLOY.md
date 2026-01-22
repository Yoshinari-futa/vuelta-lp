# VUELTA ランディングページ - デプロイガイド

## 🚀 デプロイ方法

このプロジェクトはNext.jsで構築されており、以下の方法でデプロイできます。

### 推奨: Vercel（最も簡単）

1. **Vercelアカウントの作成**
   - [Vercel](https://vercel.com) にアクセス
   - GitHubアカウントでサインアップ（推奨）

2. **プロジェクトをGitHubにプッシュ**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <あなたのGitHubリポジトリURL>
   git push -u origin main
   ```

3. **Vercelでデプロイ**
   - Vercelダッシュボードで「New Project」をクリック
   - GitHubリポジトリを選択
   - 設定はそのままで「Deploy」をクリック
   - 自動的にビルドとデプロイが開始されます

4. **カスタムドメインの設定（オプション）**
   - Vercelダッシュボードでプロジェクトを開く
   - Settings > Domains からカスタムドメインを追加

### その他のデプロイ方法

#### Netlify
1. [Netlify](https://www.netlify.com) にサインアップ
2. GitHubリポジトリを接続
3. ビルドコマンド: `npm run build`
4. 公開ディレクトリ: `.next`

#### 自社サーバー
1. サーバーにNode.jsをインストール
2. プロジェクトをクローン
3. `npm install` で依存関係をインストール
4. `npm run build` でビルド
5. `npm start` で起動

## 📋 デプロイ前のチェックリスト

- [ ] 本番ビルドが成功することを確認 (`npm run build`)
- [ ] 画像ファイルが正しく配置されていることを確認
- [ ] すべてのリンクが正しく動作することを確認
- [ ] モバイル表示が正しいことを確認
- [ ] SEOメタデータが正しく設定されていることを確認

## 🔧 環境変数

現在、環境変数は不要です。必要に応じて `.env.local` ファイルを作成できます。

## 📝 ビルドコマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start
```

## 🌐 公開後の確認事項

1. **パフォーマンス**
   - Google PageSpeed Insightsで確認
   - Lighthouseでスコアを確認

2. **SEO**
   - Google Search Consoleに登録
   - 構造化データが正しく読み込まれているか確認

3. **アクセシビリティ**
   - WAVEやaxe DevToolsで確認

## 📞 サポート

問題が発生した場合は、Next.jsのドキュメントを参照してください。
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
