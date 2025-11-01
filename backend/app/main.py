from __future__ import annotations

import json
import time
from collections import defaultdict, deque
from dataclasses import dataclass
from pathlib import Path
from typing import Deque, Dict

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

STORAGE_DIR = Path(__file__).resolve().parents[2] / "storage"
LEADS_FILE = STORAGE_DIR / "leads.json"
AB_FILE = STORAGE_DIR / "ab.jsonl"
RATE_LIMIT_WINDOW = 60
RATE_LIMIT_COUNT = 30

app = FastAPI(title="SlimiGood Backend", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@dataclass
class RateLimitBucket:
    timestamps: Deque[float]


_client_limits: Dict[str, RateLimitBucket] = defaultdict(lambda: RateLimitBucket(deque()))


def check_rate_limit(identifier: str) -> None:
    bucket = _client_limits[identifier]
    now = time.time()
    window_start = now - RATE_LIMIT_WINDOW
    while bucket.timestamps and bucket.timestamps[0] < window_start:
        bucket.timestamps.popleft()
    if len(bucket.timestamps) >= RATE_LIMIT_COUNT:
        raise HTTPException(status_code=429, detail="Too many requests")
    bucket.timestamps.append(now)


class LeadPayload(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=7, max_length=20)
    email: EmailStr | None = None
    utm_source: str | None = None
    utm_medium: str | None = None
    utm_campaign: str | None = None
    ab_variant: str | None = None
    message: str | None = Field(None, max_length=500)


class ABEvent(BaseModel):
    variant: str
    event: str
    meta: Dict[str, str | int | float | None] | None = None


@app.on_event("startup")
async def ensure_storage() -> None:
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)


@app.get("/api/ping")
async def ping() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/api/health")
async def health() -> Dict[str, str]:
    return {"status": "healthy"}


@app.post("/api/leads")
async def create_lead(payload: LeadPayload, request: Request) -> Dict[str, str]:
    identifier = request.client.host if request.client else "anonymous"
    check_rate_limit(identifier)
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    leads: list[Dict[str, str | None]] = []
    if LEADS_FILE.exists():
        try:
            leads = json.loads(LEADS_FILE.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            leads = []
    entry = {
        "name": payload.name,
        "phone": payload.phone,
        "email": payload.email,
        "utm_source": payload.utm_source,
        "utm_medium": payload.utm_medium,
        "utm_campaign": payload.utm_campaign,
        "ab_variant": payload.ab_variant,
        "message": payload.message,
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    leads.append(entry)
    LEADS_FILE.write_text(json.dumps(leads, ensure_ascii=False, indent=2), encoding="utf-8")
    return {"status": "accepted"}


@app.post("/api/ab")
async def track_ab(event: ABEvent, request: Request) -> Dict[str, str]:
    identifier = request.client.host if request.client else "anonymous"
    check_rate_limit(identifier)
    STORAGE_DIR.mkdir(parents=True, exist_ok=True)
    line = json.dumps(
        {
            "variant": event.variant,
            "event": event.event,
            "meta": event.meta or {},
            "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "ip": identifier,
        },
        ensure_ascii=False,
    )
    with AB_FILE.open("a", encoding="utf-8") as file:
        file.write(line + "\n")
    return {"status": "recorded"}
