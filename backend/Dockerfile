# Pythonベースイメージ
FROM python:3.11-slim

# 作業ディレクトリ作成
WORKDIR /app

# poetryのインストール
RUN pip install poetry

# Poetryの環境設定（仮想環境をグローバルに）
ENV POETRY_VIRTUALENVS_CREATE=false \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# pyproject.tomlとpoetry.lockだけ先にコピーして依存解決（キャッシュ効かせる）
COPY pyproject.toml poetry.lock* ./
RUN poetry install --no-root

# アプリのコードをコピー
COPY . .

# 使用ポート
EXPOSE 8000

# アプリの起動コマンド（Renderの自動検出用）
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
