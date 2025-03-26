from fastapi import FastAPI
from pydantic import BaseModel

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://dara-bochi.onrender.com",
]  # Vite開発用

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # ここに許可するフロントURLを入れる
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 世界の累計だらけ秒数（リセット前提）
total_seconds = 0


class TimeData(BaseModel):
    seconds: int


@app.post("/add_time")
def add_time(data: TimeData):
    global total_seconds
    total_seconds += data.seconds
    return {"message": "added", "new_total": total_seconds}


@app.get("/get_total")
def get_total():
    return {"total_seconds": total_seconds}
