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
├── app
│   ├── main.py          # API本体（FastAPI）
├── src
│   ├── App.tsx          # フロントエンドルート
│   └── components
│       └── BouncyBall.tsx   # PixiJSのボールアニメーション
├── Dockerfile           # バックエンド用（FastAPI）
├── poetry.lock
└── pyproject.toml       # Poetry構成ファイル
```

## 実行

```bash
uvicorn app.main:app --reload --port 8000
```

フロントエンドは別途 Vite で起動（`localhost:5173`）。

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

## Docker 構築

※後日追記予定（FastAPI バックエンドの Dockerfile は準備済み）

## LICENSE

MIT
