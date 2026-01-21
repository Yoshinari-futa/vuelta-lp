# GitHubへのプッシュ方法

## 📋 前提条件

1. GitHubアカウントを持っていること
2. Gitがインストールされていること（確認: `git --version`）

## 🚀 手順

### ステップ1: GitHubでリポジトリを作成

1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例: `vuelta-lp`）
4. 説明を追加（オプション）
5. **Public** または **Private** を選択
6. **「Initialize this repository with a README」はチェックしない**
7. 「Create repository」をクリック

### ステップ2: ローカルでGitリポジトリを初期化

ターミナルで以下のコマンドを実行：

```bash
cd /Users/yoshinarifuta/lp

# Gitリポジトリを初期化
git init

# 全てのファイルをステージング
git add .

# 初回コミット
git commit -m "Initial commit: VUELTA landing page"
```

### ステップ3: GitHubリポジトリと接続

GitHubで作成したリポジトリのページから、HTTPSのURLをコピーします。
（例: `https://github.com/your-username/vuelta-lp.git`）

```bash
# リモートリポジトリを追加
git remote add origin https://github.com/your-username/vuelta-lp.git

# ブランチ名をmainに設定（GitHubのデフォルト）
git branch -M main

# GitHubにプッシュ
git push -u origin main
```

### ステップ4: 認証

初回プッシュ時、GitHubの認証が求められます：

**Personal Access Token（推奨）:**
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. 「Generate new token」をクリック
3. スコープで `repo` にチェック
4. トークンを生成してコピー
5. パスワード入力時にトークンを貼り付け

**または SSH鍵を使用:**
```bash
# SSH鍵を生成（まだ持っていない場合）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 公開鍵をコピー
cat ~/.ssh/id_ed25519.pub

# GitHub → Settings → SSH and GPG keys → New SSH key に追加
```

---

## 📝 今後の更新方法

コードを変更した後、GitHubに反映する方法：

```bash
# 変更を確認
git status

# 変更をステージング
git add .

# コミット
git commit -m "変更内容の説明"

# GitHubにプッシュ
git push
```

---

## 🔒 .gitignoreについて

以下のファイルは自動的にGitHubにアップロードされません：

- `node_modules/` - 依存関係（npm installで再生成可能）
- `.next/` - ビルドファイル
- `.env*.local` - 環境変数ファイル
- `.DS_Store` - macOSのシステムファイル

**注意:** フォントファイル（`app/fonts/BTAnnamNeue-Regular.otf`）はアップロードされます。
ライセンスに問題がある場合は、`.gitignore`に追加してください。

---

## 🌐 GitHub Pagesで公開する場合

### 方法1: Vercel（推奨）

1. [Vercel](https://vercel.com)にアカウント作成
2. 「New Project」をクリック
3. GitHubリポジトリを選択
4. 「Deploy」をクリック
5. 自動的にデプロイされます

### 方法2: GitHub Pages

1. リポジトリの「Settings」→「Pages」
2. Sourceを「GitHub Actions」に設定
3. 以下のワークフローファイルを作成：

`.github/workflows/deploy.yml`:
```yaml
name: Deploy Next.js to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

`next.config.js`に以下を追加：
```js
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // ... 既存の設定
}
```

---

## ⚠️ 注意事項

1. **機密情報をコミットしない**
   - APIキー、パスワードなどは`.env.local`に保存
   - `.env.local`は`.gitignore`に含まれています

2. **フォントファイルのライセンス**
   - `BTAnnamNeue-Regular.otf`のライセンスを確認
   - 問題がある場合は`.gitignore`に追加

3. **大きなファイル**
   - 動画ファイルなどはGitHubに直接アップロードしない
   - 代わりにGit LFSや外部ストレージを使用

---

## 🆘 トラブルシューティング

### エラー: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/your-username/vuelta-lp.git
```

### エラー: "failed to push some refs"
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### 認証エラー
- Personal Access Tokenを使用しているか確認
- トークンの有効期限を確認

---

## 📚 参考リンク

- [Git公式ドキュメント](https://git-scm.com/doc)
- [GitHub公式ドキュメント](https://docs.github.com)
- [Next.jsデプロイガイド](https://nextjs.org/docs/deployment)
