# SlimiGood прототип

SlimiGood — прототип лендинга и микросервиса для приёма лидов. Репозиторий содержит фронтенд на Vite + React + TypeScript + Tailwind и бэкенд на FastAPI. Все ассеты представлены текстовыми форматами — SVG и CSS.

## Структура

- `frontend/` — исходники Vite, компоненты лендинга, стили и вспомогательные либы.
- `public/` — текстовые статические файлы (SVG favicon и og-image, robots, sitemap).
- `backend/` — FastAPI-приложение с конечными точками `/api/leads`, `/api/ping`, `/api/health` и утилиты запуска.
- `seo/` — JSON-LD для OpenGraph и Schema.org.
- `tests/` — чек-листы для ручного тестирования.
- `storage/` — директория для рабочих JSON-файлов (пустая, под git попадает только `.gitkeep`).

## Запуск фронтенда

```bash
npm install
npm run dev
```

- `npm run build` — production-сборка (используется в CI).
- `npm run preview` — предпросмотр сборки.
- `npm run lint` — ESLint по файлам `frontend/src`.
- `npm run test:no-binaries` — проверка отсутствия бинарных файлов.

## Запуск бэкенда

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
./backend/run.sh
```

Бэкенд поднимает FastAPI на `http://localhost:8000`, сохраняет лиды в `storage/leads.json` и события A/B в `storage/ab.jsonl`.

## Как проверить

1. Выполнить `npm install` и `npm run dev`, убедиться, что лендинг открывается.
2. Пройтись по сценариям из [`tests/e2e.spec.md`](tests/e2e.spec.md).
3. Запустить линтер: `npm run lint`.
4. Собрать проект: `npm run build`.
5. Проверить отсутствие бинарных файлов: `npm run test:no-binaries`.

## Политика PR

Этот PR не содержит бинарных файлов; любые будущие графические ассеты добавлять отдельно, после ревью. Перед отправкой PR обязательно запускать `npm run test:no-binaries`.

## Ограничения og-image

`public/og-image.svg` подходит для прототипа. Для продового предпросмотра соцсетей рекомендуется заменить на PNG после мержа.
