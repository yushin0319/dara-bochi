# Pythonベースイメージ
FROM python:3.11-slim

# 作業ディレクトリ作成
WORKDIR /app

# uv を公式イメージから取得
COPY --from=ghcr.io/astral-sh/uv:0.11.7 /uv /usr/local/bin/uv

# 環境設定
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

# 依存解決（キャッシュ効かせる）
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-dev --no-install-project

# アプリのコードをコピー
COPY . .

# 非rootユーザーで実行
RUN useradd --create-home --shell /bin/bash appuser && chown -R appuser:appuser /app
USER appuser

# 使用ポート
EXPOSE 8000

# アプリの起動コマンド（Renderの自動検出用）
CMD ["/app/.venv/bin/uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
