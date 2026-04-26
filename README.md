# dara-bochi

「だらだら」した時間を計測して世界の総計に加算する Web アプリ。GitHub description: 「だらだらを数値化する」。タイマー停止で経過時間を加算、サーバー再起動でリセット（DB なし）。

## スタック

- Backend: Python 3.11 / FastAPI / slowapi（レート制限）/ uvicorn
- Frontend: TypeScript / React 19 / Vite 8 / MUI v9 / PixiJS 8（Canvas アニメ）
- デプロイ: Render（BE: Web Service / FE: Static Site）

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
- CORS は `localhost:5173` + Render 本番 URL を許可

## 開発

```bash
# Backend (uv)
cd backend
uv sync
uv run uvicorn app.main:app --reload --port 8000

# Frontend (npm)
cd frontend
npm install
npm run dev          # :5173
npm run build
npm run lint         # Biome
```

## デプロイ

- Render が GitHub push を検知して自動デプロイ
- CI: `.github/workflows/test.yml` / PR レビュー: `gemini-review.yml`

## 運用ルール

- DB なし: サーバー再起動で `total_seconds` がリセット（仕様）
- main 直 commit 禁止、PR 経由でマージ
