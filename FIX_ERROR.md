# エラー解決手順

## 問題
`Operation not permitted`エラーが発生しています。これは`node_modules`の権限問題です。

## 解決方法

### ステップ1: node_modulesとpackage-lock.jsonを削除

ターミナルで以下のコマンドを実行してください：

```bash
cd /Users/yoshinarifuta/lp
rm -rf node_modules package-lock.json
```

もし権限エラーが出る場合は、`sudo`を使用するか、Finderから手動で削除してください。

### ステップ2: 依存関係を再インストール

```bash
npm install
```

### ステップ3: 開発サーバーを起動

```bash
npm run dev
```

## 代替方法

もし上記の方法で解決しない場合：

1. **Next.jsのバージョンを確認**
   ```bash
   npm list next
   ```

2. **Next.jsを最新バージョンに更新**
   ```bash
   npm install next@latest
   ```

3. **node_modulesを完全に削除して再インストール**
   ```bash
   sudo rm -rf node_modules package-lock.json
   npm install
   ```

## 注意

`.next`ディレクトリは既に削除済みです。これはビルドキャッシュなので、削除しても問題ありません。
