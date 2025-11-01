from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List

from fastapi import Body, FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from slowapi import Limiter
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

STORAGE_DIR = Path(__file__).resolve().parents[2] / 'storage'
LEADS_PATH = STORAGE_DIR / 'leads.json'
AB_LOG_PATH = STORAGE_DIR / 'ab.jsonl'

limiter = Limiter(key_func=get_remote_address, default_limits=['10/minute'])


class LeadPayload(BaseModel):
  full_name: str = Field(..., min_length=2, max_length=120)
  email: EmailStr
  phone: str = Field(..., min_length=5, max_length=32)
  goal: str = Field(..., min_length=3, max_length=250)
  utm_source: str | None = Field(default=None, max_length=120)
  utm_medium: str | None = Field(default=None, max_length=120)
  utm_campaign: str | None = Field(default=None, max_length=120)
  ab_variant: str | None = Field(default=None, max_length=32)


class LeadResponse(BaseModel):
  status: str
  received_at: datetime


class EventPayload(BaseModel):
  name: str = Field(..., min_length=2, max_length=80)
  properties: Dict[str, Any] = Field(default_factory=dict)
  ab_variant: str | None = Field(default=None, max_length=32)


app = FastAPI(title='SlimiGood Backend', version='1.0.0')
app.state.limiter = limiter

app.add_middleware(
  CORSMiddleware,
  allow_origins=['*'],
  allow_credentials=True,
  allow_methods=['*'],
  allow_headers=['*'],
)


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):  # type: ignore[override]
  return limiter._rate_limit_exceeded_handler(request, exc)  # pylint: disable=protected-access


def _ensure_storage() -> None:
  STORAGE_DIR.mkdir(exist_ok=True)
  if not LEADS_PATH.exists():
    LEADS_PATH.write_text('[]', encoding='utf-8')
  if not AB_LOG_PATH.exists():
    AB_LOG_PATH.write_text('', encoding='utf-8')


def _append_lead(data: Dict[str, Any]) -> None:
  _ensure_storage()
  leads: List[Dict[str, Any]] = []
  if LEADS_PATH.exists():
    try:
      leads = json.loads(LEADS_PATH.read_text(encoding='utf-8'))
    except json.JSONDecodeError:
      leads = []
  leads.append(data)
  LEADS_PATH.write_text(json.dumps(leads, ensure_ascii=False, indent=2), encoding='utf-8')


def _append_event(data: Dict[str, Any]) -> None:
  _ensure_storage()
  with AB_LOG_PATH.open('a', encoding='utf-8') as handle:
    handle.write(json.dumps(data, ensure_ascii=False) + '\n')


@app.get('/api/ping')
async def ping() -> Dict[str, str]:
  return {'status': 'ok'}


@app.get('/api/health')
async def health() -> Dict[str, str]:
  return {'status': 'healthy'}


@app.post('/api/leads', response_model=LeadResponse)
@limiter.limit('3/minute')
async def submit_lead(payload: LeadPayload, request: Request) -> LeadResponse:
  timestamp = datetime.now(timezone.utc)
  lead_record = {
    **payload.dict(),
    'received_at': timestamp.isoformat(),
    'client_host': request.client.host if request.client else None,
  }
  _append_lead(lead_record)
  return LeadResponse(status='received', received_at=timestamp)


@app.post('/api/events', status_code=status.HTTP_202_ACCEPTED)
@limiter.limit('20/minute')
async def track_event(payload: EventPayload = Body(...)) -> Dict[str, str]:
  event_record = {
    **payload.dict(),
    'received_at': datetime.now(timezone.utc).isoformat(),
  }
  _append_event(event_record)
  return {'status': 'queued'}
