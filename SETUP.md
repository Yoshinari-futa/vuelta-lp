# セットアップ手順

## 問題の原因

`ERR_CONNECTION_REFUSED`エラーは、開発サーバーが起動していないことを示しています。
依存関係（node_modules）がインストールされていないため、サーバーを起動できません。

## 解決方法

### ステップ1: 依存関係のインストール

ターミナルで以下のコマンドを実行してください：

```bash
cd /Users/yoshinarifuta/lp
npm install
```

もし権限エラーが出る場合は、以下のいずれかを試してください：

**方法1: npmキャッシュをクリア**
```bash
npm cache clean --force
npm install
```

**方法2: ローカルインストールを試す**
```bash
npm install --legacy-peer-deps
```

**方法3: yarnを使用（yarnがインストールされている場合）**
```bash
yarn install
```

### ステップ2: 開発サーバーの起動

依存関係のインストールが完了したら、以下のコマンドで開発サーバーを起動します：

```bash
npm run dev
```

正常に起動すると、以下のようなメッセージが表示されます：

```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Ready in Xs
```

### ステップ3: ブラウザで確認

ブラウザで `http://localhost:3000` を開いてください。

## トラブルシューティング

### npm installが失敗する場合

1. **Node.jsのバージョンを確認**
   ```bash
   node --version
   ```
   Node.js 18以上が必要です。

2. **npmのバージョンを確認**
   ```bash
   npm --version
   ```

3. **プロジェクトディレクトリの権限を確認**
   ```bash
   ls -la /Users/yoshinarifuta/lp
   ```

### ポート3000が既に使用されている場合

別のポートを使用する場合：
```bash
npm run dev -- -p 3001
```

### その他のエラー

エラーメッセージを確認して、必要に応じて以下を試してください：
- `rm -rf node_modules package-lock.json` を実行してから再度 `npm install`
- Node.jsを再インストール
