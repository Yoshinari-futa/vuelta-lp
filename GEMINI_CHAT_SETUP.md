# Gemini AI チャットボックス セットアップガイド

VUELTAのウェブサイトに24時間自動回答できるチャットボックスを実装しました。GoogleのGemini AIを使用しています。

## 📋 セットアップ手順

### ステップ1: Google AI StudioでAPIキーを取得

1. [Google AI Studio](https://makersuite.google.com/app/apikey) にアクセス
2. Googleアカウントでログイン
3. 「Create API Key」をクリック
4. プロジェクトを選択（または新規作成）
5. APIキーをコピー

### ステップ2: 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成（既に存在する場合は追加）：

```env
GEMINI_API_KEY=your_api_key_here
```

**重要**: `.env.local` ファイルは `.gitignore` に含まれているため、Gitにコミットされません。

### ステップ3: 開発サーバーの再起動

環境変数を追加したら、開発サーバーを再起動してください：

```bash
npm run dev
```

## 🎯 機能

- **24時間自動回答**: Gemini AIがVUELTAに関する質問に自動で回答
- **会話履歴の保持**: 会話の流れを理解して適切な回答を提供
- **レスポンシブデザイン**: モバイルとデスクトップの両方に対応
- **VUELTA情報の自動提供**: 営業時間、場所、メニューなどの情報を自動で提供

## 💬 チャットボックスの動作

チャットボックスは以下の情報を自動で提供できます：

- 営業時間とアクセス情報
- メニューと価格
- 予約方法（Instagram DMへの誘導）
- 店舗のコンセプトや雰囲気
- その他VUELTAに関する一般的な質問

## 🔧 カスタマイズ

### システムプロンプトの変更

`app/api/chat/route.ts` の `systemPrompt` を編集することで、AIの回答スタイルや提供する情報をカスタマイズできます。

### UIのカスタマイズ

`app/components/ChatBox.tsx` を編集することで、チャットボックスのデザインや動作を変更できます。

## 📊 API使用量とコスト

Gemini APIは無料枠がありますが、使用量に応じて課金される場合があります。詳細は [Google AI Studio](https://makersuite.google.com/) を確認してください。

## 🐛 トラブルシューティング

### エラー: "Gemini API key is not configured"

- `.env.local` ファイルが正しく作成されているか確認
- 環境変数名が `GEMINI_API_KEY` であることを確認
- 開発サーバーを再起動（環境変数の変更を反映するため）

### エラー: "Failed to get response from AI"

- APIキーが正しいか確認
- APIキーの使用制限に達していないか確認
- ネットワーク接続を確認

### チャットボックスが表示されない

- ブラウザのコンソールでエラーを確認
- `ChatBox` コンポーネントが正しくインポートされているか確認

## 🔐 セキュリティ注意事項

- **絶対に** `.env.local` ファイルをGitにコミットしないでください
- APIキーは機密情報です。公開リポジトリにアップロードしないでください
- 本番環境では、環境変数を安全に管理するサービス（Vercel、Netlifyなど）を使用してください

## 📚 参考資料

- [Google AI Studio](https://makersuite.google.com/)
- [Gemini API ドキュメント](https://ai.google.dev/docs)
- [@google/generative-ai パッケージ](https://www.npmjs.com/package/@google/generative-ai)
