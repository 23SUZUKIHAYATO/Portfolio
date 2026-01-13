# Portfolio

このリポジトリは簡易なポートフォリオサイトです。以下の構成で動作します。

- HTML: `Index.html`
- スタイル: `css/style.css`
- スライダー: `js/slider.js`
- 画像: `Img/` 配下（お好みの画像を追加）

使い方
- `Img/` に画像を配置します（例: `Portfolio_face1.png`）。
- 画像を増やしたい場合は、`Index.html` の `div.slide` を複製して `src` を差し替えます。
- スライダーは3秒ごとに右へ自動移動し、最後から最初へも連続します。

調整ポイント
- スライダーサイズ: `css/style.css` の `.slider { max-width: 480px; height: 480px; }`
- 画像のフィット: `.slide img { object-fit: contain; }`（トリミングして埋めるなら `cover`）
- 移動間隔: `js/slider.js` の `setInterval(next, 3000)` の数値（ミリ秒）

注意
- `bootstrap/` の読み込みが不要なら `Index.html` のリンクを削除しても構いません。