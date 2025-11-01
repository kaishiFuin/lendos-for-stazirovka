from __future__ import annotations

import json
import time
from pathlib import Path
from typing import Dict

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr

ROOT = Path(__file__).resolve().parents[2]
STORAGE_DIR = ROOT / 'storage'
LEADS_FILE = STORAGE_DIR / 'leads.json'
AB_FILE = STORAGE_DIR / 'ab.jsonl'

RATE_LIMIT = 5
RATE_LIMIT_WINDOW = 60


class LeadPayload(BaseModel):
  name: str
  email: EmailStr
  phone: str
  utm_source: str | None = None
  ab_variant: str | None = None


class RateLimiter:
  def __init__(self, limit: int, window: int) -> None:
    self.limit = limit
    self.window = window
    self.cache: Dict[str, list[float]] = {}

  def check(self, key: str) -> bool:
    now = time.monotonic()
    timestamps = self.cache.setdefault(key, [])
    self.cache[key] = [ts for ts in timestamps if now - ts < self.window]
    if len(self.cache[key]) >= self.limit:
      return False
    self.cache[key].append(now)
    return True


def append_json_line(file_path: Path, data: dict) -> None:
  file_path.parent.mkdir(parents=True, exist_ok=True)
  with file_path.open('a', encoding='utf-8') as handle:
    handle.write(json.dumps(data, ensure_ascii=False) + '\n')


def persist_lead(payload: LeadPayload) -> None:
  LEADS_FILE.parent.mkdir(parents=True, exist_ok=True)
  leads: list[dict]
  if LEADS_FILE.exists():
    leads = json.loads(LEADS_FILE.read_text(encoding='utf-8'))
  else:
    leads = []
  leads.append({
    'name': payload.name,
    'email': payload.email,
    'phone': payload.phone,
    'utm_source': payload.utm_source,
    'ab_variant': payload.ab_variant,
    'timestamp': time.time(),
  })
  LEADS_FILE.write_text(json.dumps(leads, ensure_ascii=False, indent=2), encoding='utf-8')
  append_json_line(AB_FILE, {
    'event': 'lead_submitted',
    'email': payload.email,
    'ab_variant': payload.ab_variant,
    'timestamp': time.time(),
  })


app = FastAPI(title='SlimiGood API', version='0.1.0')

app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*'],
)

rate_limiter = RateLimiter(limit=RATE_LIMIT, window=RATE_LIMIT_WINDOW)


@app.get('/api/ping')
def ping() -> dict[str, str]:
  return {'status': 'ok'}


@app.get('/api/health')
def health() -> dict[str, str]:
  return {'status': 'healthy'}


@app.post('/api/leads', status_code=201)
def create_lead(payload: LeadPayload, request: Request) -> dict[str, str]:
  client_ip = request.client.host if request.client else 'unknown'
  if not rate_limiter.check(client_ip):
    raise HTTPException(status_code=429, detail='Too many requests')
  persist_lead(payload)
  return {'status': 'created'}
