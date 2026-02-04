# 動画のダウンロード方法

## 🎥 無料動画素材サイトからダウンロード

以下のサイトからバー/カクテル関連の動画を無料でダウンロードできます：

### 1. Mixkit（推奨）
**URL**: https://mixkit.co/free-stock-video/cocktail/

**手順**:
1. 上記URLにアクセス
2. お気に入りの動画を選択
3. 「Download」ボタンをクリック
4. ダウンロードしたファイルを `hero-background.mp4` にリネーム
5. `public/videos/` フォルダに配置

**おすすめ動画**:
- "Barmaid preparing a cocktail in the bar" (ID: 4295)
- "Cocktail at a bar freshly served" (ID: 43964)

### 2. Pexels
**URL**: https://www.pexels.com/videos/search/cocktail/

**手順**:
1. 上記URLにアクセス
2. 動画を選択してダウンロード
3. `hero-background.mp4` にリネーム
4. `public/videos/` フォルダに配置

### 3. Pixabay
**URL**: https://pixabay.com/videos/search/cocktail/

## 📝 注意事項

- **ファイル名**: `hero-background.mp4` として保存してください
- **ファイルサイズ**: 5MB以下を推奨（大きい場合は最適化してください）
- **形式**: MP4 (H.264) 形式を推奨

## ⚙️ 動画の最適化（オプション）

動画ファイルが大きい場合（5MB以上）は、以下のコマンドで最適化できます：

```bash
# FFmpegがインストールされている場合
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -crf 23 -preset slow -movflags +faststart hero-background.mp4
```

## ✅ 確認方法

動画ファイルを配置したら、ブラウザで `http://localhost:3000` を開いて確認してください。
ローカルファイルが優先的に使用され、ない場合はフォールバック動画が表示されます。
