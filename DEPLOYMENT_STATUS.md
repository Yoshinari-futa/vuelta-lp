# デプロイ前チェック結果・公開手順

**チェック日時**: 2025年1月31日

## ✅ 実施したチェック項目

| 項目 | 結果 |
|------|------|
| ビルド | ✅ 成功 |
| 型チェック | ✅ 問題なし |
| メタデータ（OG画像） | ✅ metadataBase 追加済み |
| EN/JA Hero配置 | ✅ VUELTA 表示位置統一済み |
| 言語切り替え | ✅ scrollbar-gutter でレイアウトシフト防止 |

## 🔧 実施した修正

1. **app/layout.tsx**: `metadataBase: new URL('https://vuelta-bar.com')` を追加（OG/Twitter画像のURL解決）
2. **app/globals.css**: `scrollbar-gutter: stable` を追加（EN/JA切り替え時のずれ防止）
3. **app/ja/page.tsx**: Hero セクションのパディングを EN と揃えて VUELTA 表示位置を統一

## 📤 コミット済みの変更

```
Fix: 言語切り替え時のレイアウトシフト、VUELTA位置統一、metadataBase追加

- app/components/LanguageSelector.tsx
- app/globals.css
- app/ja/page.tsx
- app/layout.tsx
- app/page.tsx
- app/recruit/page.tsx
- package.json
```

## 🚀 公開の手順（要実施）

GitHub へのプッシュには認証が必要なため、**ローカルで以下を実行してください**：

### 1. GitHub へプッシュ

```bash
cd /Users/yoshinarifuta/lp
git push origin main
```

- 認証が求められた場合：GitHub Personal Access Token を使用
- または GitHub Desktop からプッシュ

### 2. Vercel でデプロイ

**方法A: Vercel ダッシュボード（推奨）**

1. https://vercel.com にアクセス
2. GitHub でログイン
3. 「Add New...」→「Project」
4. `Yoshinari-futa/vuelta-lp` をインポート
5. 設定確認後「Deploy」をクリック
6. 2〜3分でデプロイ完了

**方法B: 初回のみ設定した場合**

GitHub と連携済みなら、`git push` 後に自動デプロイされます。

### 3. デプロイ後の確認

- [ ] ホームページ（`/`）が表示される
- [ ] 日本語ページ（`/ja`）が表示される
- [ ] リクルート（`/recruit`）が表示される
- [ ] EN/JA 切り替えが正常に動作する
- [ ] モバイル表示を確認する
