# クイックスタートガイド

## 🚀 開発サーバーの起動

プロジェクトディレクトリに移動してからコマンドを実行してください：

```bash
# プロジェクトディレクトリに移動
cd ~/lp

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## 📦 その他のコマンド

```bash
# プロジェクトディレクトリに移動
cd ~/lp

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# 依存関係のインストール（初回のみ）
npm install
```

## ⚠️ よくあるエラー

### `ENOENT: no such file or directory, open 'package.json'`

**原因**: プロジェクトディレクトリにいない

**解決方法**: 
```bash
cd ~/lp
```
を実行してから、再度コマンドを実行してください。

## 📍 現在のディレクトリを確認

```bash
# 現在のディレクトリを確認
pwd

# プロジェクトディレクトリに移動
cd ~/lp

# 再度確認
pwd
# 出力: /Users/yoshinarifuta/lp
```
