#!/bin/bash

# node_modulesの権限問題を解決するスクリプト

echo "=== node_modulesの権限問題を解決します ==="
echo ""

# 現在のディレクトリに移動
cd "$(dirname "$0")"

# 1. node_modulesとpackage-lock.jsonを削除
echo "ステップ1: node_modulesとpackage-lock.jsonを削除中..."
rm -rf node_modules package-lock.json
echo "✓ 削除完了"
echo ""

# 2. .nextも削除（念のため）
echo "ステップ2: .nextビルドキャッシュを削除中..."
rm -rf .next
echo "✓ 削除完了"
echo ""

# 3. npmキャッシュをクリア
echo "ステップ3: npmキャッシュをクリア中..."
npm cache clean --force
echo "✓ クリア完了"
echo ""

# 4. 依存関係を再インストール
echo "ステップ4: 依存関係を再インストール中..."
npm install
echo "✓ インストール完了"
echo ""

echo "=== 完了しました ==="
echo "次に 'npm run dev' を実行して開発サーバーを起動してください"
