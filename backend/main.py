from __future__ import annotations

import asyncio
import json
from datetime import datetime
from pathlib import Path
from typing import Any, Dict

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

STORAGE_DIR = Path(__file__).resolve().parent.parent / "storage"
LEADS_FILE = STORAGE_DIR / "leads.json"
AB_FILE = STORAGE_DIR / "ab.jsonl"
RATE_LIMIT_PER_MINUTE = 10

app = FastAPI(title="SlimiGood Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

rate_limit_state: Dict[str, list[float]] = {}
lock = asyncio.Lock()


class Lead(BaseModel):
    name: str = Field(..., min_length=1)
    phone: str = Field(..., min_length=5)
    comment: str | None = None


async def check_rate_limit(ip: str) -> None:
    async with lock:
        timestamps = rate_limit_state.setdefault(ip, [])
        now = datetime.utcnow().timestamp()
        window_start = now - 60
        rate_limit_state[ip] = [ts for ts in timestamps if ts > window_start]
        if len(rate_limit_state[ip]) >= RATE_LIMIT_PER_MINUTE:
            raise HTTPException(status_code=429, detail="Too many requests")
        rate_limit_state[ip].append(now)


@app.get("/api/ping")
async def ping() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/api/health")
async def health() -> Dict[str, str]:
    return {"status": "healthy"}


async def append_json_line(path: Path, data: Dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    async with lock:
        with path.open("a", encoding="utf-8") as file:
            file.write(json.dumps(data, ensure_ascii=False) + "\n")


@app.post("/api/leads")
async def create_lead(request: Request, lead: Lead) -> Dict[str, str]:
    client_ip = request.client.host if request.client else "anonymous"
    await check_rate_limit(client_ip)

    payload = lead.dict()
    payload.update({"ip": client_ip, "timestamp": datetime.utcnow().isoformat()})

    LEADS_FILE.parent.mkdir(parents=True, exist_ok=True)
    if LEADS_FILE.exists():
        try:
            with LEADS_FILE.open("r", encoding="utf-8") as file:
                data = json.load(file)
        except json.JSONDecodeError:
            data = []
    else:
        data = []

    data.append(payload)

    with LEADS_FILE.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)

    await append_json_line(AB_FILE, {"event": "lead_created", **payload})

    return {"status": "received"}

