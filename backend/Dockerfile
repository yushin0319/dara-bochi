FROM python:3.11-slim

# poetryインストール（公式手順に近いやつ）
RUN pip install --no-cache-dir poetry

# 作業ディレクトリ
WORKDIR /app

# Poetryのキャッシュ有効化
ENV POETRY_VIRTUALENVS_CREATE=false \
    POETRY_NO_INTERACTION=1

# pyproject.toml と poetry.lock（あれば）を先にコピーして依存解決
COPY pyproject.toml poetry.lock* ./
RUN poetry install --no-root

# 残りのコードをコピー
COPY . .

# 本番実行コマンド（開発用なら --reload）
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
