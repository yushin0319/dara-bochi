# dara-bochi

「だらだら」した時間を計測して世界の総計に加算する Web アプリ。GitHub description: 「だらだらを数値化する」。タイマー停止で経過時間を加算、サーバー再起動でリセット（DB なし）。

## スタック

- Backend: Python 3.11–3.12 / FastAPI / slowapi（レート制限）/ uvicorn（uv 管理）
- Frontend: TypeScript 7 / React 19 / Vite 8 / MUI v9 / PixiJS 8（`pixi.js` + `@pixi/react`、Canvas アニメ）/ axios / Biome v2 / Husky + lint-staged
- デプロイ: Render（BE: Docker / FE: Static Site）

## 構成

```
backend/app/
  main.py            FastAPI（POST /add_time / GET /get_total / レート制限）
frontend/
  src/
    App.tsx          タイマー UI + API 通信
    components/
      BouncyBall.tsx  PixiJS で跳ねるボール
```

## API

- `POST /add_time` — `{ seconds: int (0-86400) }` → `{ message, new_total }`、IP 単位 10 req/min（slowapi）
- `GET /get_total` — `{ total_seconds: int }`
- CORS は既定で `http://localhost:5173` / `http://127.0.0.1:5173` / `https://dara-bochi.onrender.com` を許可。環境変数 `ALLOWED_ORIGINS`（カンマ区切り）で上書きできる

## 開発

```bash
# Backend (uv)
cd backend
uv sync
uv run uvicorn app.main:app --reload --port 8000

# Frontend (Bun)
cd frontend
bun install
bun run dev          # :5173
bun run build
bun run lint         # Biome
bun run preview      # build 結果のプレビュー

# Git フック（ルートで 1 回）
bun install          # prepare で Husky を有効化 → pre-commit で frontend の lint-staged（Biome）
```

- フロントの API 接続先は `frontend/src/App.tsx` で `https://dara-bochi-api.onrender.com` に固定されている。ローカルの BE（:8000）に向けるにはここを書き換える

## デプロイ

- Render が GitHub push を検知して自動デプロイ（BE は `backend/Dockerfile` 経由の Docker コンテナ）
- CI: `.github/workflows/ci.yml`（frontend の lint / `tsc -b` / build。BE のテストは無し）+ `codeql.yml`（JS/TS・Python） / PR レビュー: `gemini-review.yml` / Dependabot patch/minor は `dependabot-automerge.yml`

## 運用ルール

- DB なし: サーバー再起動で `total_seconds` がリセット（仕様）
- main 直 commit 禁止、PR 経由でマージ
