# dara-bochi - だらだら時間共有アプリ

## 概要

ボタンを押してだらだらタイマーを開始し、停止時にその時間を全世界の累計に加算する Web アプリ。Canvas アニメーション（PixiJS）でボールが跳ね回る演出付き。

## 技術スタック

- **Backend**: Python 3.11+ / FastAPI / Uvicorn
- **Frontend**: TypeScript / React 19 / Vite 6 / MUI v6 / PixiJS 8
- **データ**: インメモリ変数（DB なし、再起動でリセット）
- **デプロイ**: Render（BE: Docker, FE: Static Site）

## ディレクトリ構成

```
dara-bochi/
├── backend/
│   ├── app/main.py      # FastAPI（/add_time, /get_total）
│   ├── Dockerfile
│   └── pyproject.toml   # Poetry
└── frontend/
    ├── src/
    │   ├── App.tsx       # タイマー + API 通信
    │   └── components/
    │       └── BouncyBall.tsx  # PixiJS アニメーション
    └── package.json
```

## コマンド

```bash
# Backend
cd backend
poetry install
uvicorn app.main:app --reload --port 8000

# Frontend
cd frontend
npm install
npm run dev          # localhost:5173
npm run build
```

## CI/CD

- `gemini-review.yml`: PR 自動レビュー
- Render: push 時自動デプロイ（BE: Docker, FE: Vite build）

## 本番 URL

- Backend: https://dara-bochi-api.onrender.com
- Frontend: https://dara-bochi.onrender.com
