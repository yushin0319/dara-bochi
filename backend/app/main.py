import os

from fastapi import FastAPI, Request
from pydantic import BaseModel, Field
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 世界累計への悪意ある加算を抑止（IPベース、10回/分）
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

_default_origins = "http://localhost:5173,http://127.0.0.1:5173,https://dara-bochi.onrender.com"
origins = os.environ.get("ALLOWED_ORIGINS", _default_origins).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ここに許可するフロントURLを入れる
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 世界の累計だらけ秒数（リセット前提）
app.state.total_seconds = 0


class TimeData(BaseModel):
    seconds: int = Field(ge=0, le=86400)


@app.post("/add_time")
@limiter.limit("10/minute")
def add_time(data: TimeData, request: Request):
    request.app.state.total_seconds += data.seconds
    return {"message": "added", "new_total": request.app.state.total_seconds}


@app.get("/get_total")
def get_total(request: Request):
    return {"total_seconds": request.app.state.total_seconds}
