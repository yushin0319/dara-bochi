# dara-bochi frontend

タイマー UI の React アプリ（TypeScript 7 / React 19 / Vite 8 / MUI v9 / PixiJS 8）。構成・API・デプロイはルートの [README](../README.md) を参照。

Lint は ESLint ではなく Biome（`frontend/biome.json`）。

## コマンド

```bash
bun install
bun run dev          # Vite 開発サーバー（:5173）
bun run build        # tsc -b && vite build
bun run lint         # biome check .
```
