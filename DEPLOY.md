# VUELTA LP 公開手順

## 方法1: Vercel CLIを使用したデプロイ

### 1. Vercelアカウントの準備
1. [Vercel](https://vercel.com) にアクセスしてアカウントを作成（GitHubアカウントでログイン可能）

### 2. ログイン
ターミナルで以下のコマンドを実行：

```bash
cd /Users/yoshinarifuta/lp
npx vercel login
```

ブラウザが開くので、Vercelアカウントでログインしてください。

### 3. デプロイの実行
ログイン後、以下のコマンドを実行：

```bash
npx vercel --prod
```

初回実行時：
- プロジェクトの設定を確認（そのままEnterでOK）
- デプロイが完了すると、URLが表示されます

**認証エラーが出る場合：**
- `npx vercel login` を実行して再認証してください
- または、方法2（GitHub経由）を使用することをお勧めします

### 3. 環境変数の設定（必要に応じて）
現在チャットボックスは削除されているため、`GEMINI_API_KEY`は不要ですが、将来使用する場合は：

1. Vercelダッシュボード（https://vercel.com/dashboard）にアクセス
2. プロジェクトを選択
3. Settings → Environment Variables
4. `GEMINI_API_KEY` を追加（値: `AIzaSyBxxrDcaiNGExmkapMN_EPOf1DNGTOiQN8`）

### 4. 本番環境への再デプロイ
```bash
npx vercel --prod
```

## 方法2: GitHub経由でのデプロイ（推奨：継続的デプロイ）

### 1. GitHubリポジトリの作成
```bash
cd /Users/yoshinarifuta/lp
git init
git add .
git commit -m "Initial commit"
```

GitHubでリポジトリを作成後：
```bash
git remote add origin https://github.com/YOUR_USERNAME/vuelta-lp.git
git push -u origin main
```

### 2. VercelでのGitHub連携
1. [Vercel](https://vercel.com) にログイン
2. "Add New..." → "Project"
3. GitHubリポジトリを選択
4. プロジェクト設定を確認：
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`（自動検出）
   - Output Directory: `.next`（自動検出）
5. Environment Variables（必要に応じて）:
   - `GEMINI_API_KEY` = `AIzaSyBxxrDcaiNGExmkapMN_EPOf1DNGTOiQN8`
6. "Deploy" をクリック

### 3. カスタムドメインの設定（オプション）
1. Vercelダッシュボードでプロジェクトを選択
2. Settings → Domains
3. ドメインを追加（例: `vuelta-bar.com`）
4. DNS設定を案内に従って設定

## デプロイ後の確認事項

- [ ] ホームページが正常に表示される
- [ ] リクルートページ（/recruit）が正常に表示される
- [ ] モバイル表示が正常に動作する
- [ ] フォントが正しく読み込まれている
- [ ] 画像が正しく表示される
- [ ] リンクが正常に動作する

## トラブルシューティング

### ビルドエラーが発生する場合
- Vercelのビルドログを確認
- ローカルで `npm run build` を実行してエラーを確認

### フォントが読み込まれない場合
- Google FontsはVercelのビルド環境で自動的に読み込まれます
- カスタムフォント（`これ.ttf`）は `app/fonts/` に配置されていることを確認

### 環境変数が設定されていない場合
- Vercelダッシュボードで環境変数を確認
- 再デプロイを実行

## 次のステップ

デプロイが完了したら：
1. 公開URLを確認
2. モバイルとデスクトップで動作確認
3. 必要に応じてカスタムドメインを設定
4. SEO設定を確認（`app/layout.tsx`のメタデータ）
