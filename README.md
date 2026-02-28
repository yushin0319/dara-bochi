# Dara-Bochi

FastAPI, React, PixiJS を用いたサボりを肯定するアプリです。

## 概要

世界中の「だらけ時間」を積み上げて、だらけを価値ある営みにしてしまおうという発想から生まれたアプリ。
ボタンを押して「だらだら」を開始し、PixiJS によるアニメーションとともにローカル時間を計測。停止時にその時間が FastAPI バックエンドに POST され、全世界累計が更新されます。

## API

- `POST /add_time`: ローカルなだらけ時間（秒）を追加します。
- `GET /get_total`: 全世界の累計だらけ時間（秒）を取得します。

## 構成

```
.
├── backend/
│   ├── app/
│   │   └── main.py          # API本体（FastAPI）
│   ├── Dockerfile
│   ├── poetry.lock
│   └── pyproject.toml
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   └── components/
│   │       └── BouncyBall.tsx   # PixiJSのボールアニメーション
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## 実行

### バックエンド

```bash
cd backend && poetry install && uvicorn app.main:app --reload --port 8000
```

### フロントエンド

```bash
cd frontend && npm install && npm run dev
```

フロントエンドは Vite で `localhost:5173` に起動します。

## CORS

- フロント（Vite）の `localhost:5173` からのリクエストを許可しています。

## 使用技術

- **フロントエンド**
  - React + TypeScript
  - @pixi/react（PixiJS ラッパー）
  - MUI（Material UI）
  - Axios（API 通信）
- **バックエンド**
  - FastAPI
  - Poetry 管理

## デプロイ

Render にデプロイ済みです。

- **フロントエンド**: https://dara-bochi.onrender.com
- **バックエンド API**: https://dara-bochi-api.onrender.com

## LICENSE

MIT
