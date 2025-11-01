# SlimiGood Prototype

Прототип лендинга и бэкенда SlimiGood без двоичных файлов. Стек: Vite + React + TypeScript + Tailwind, FastAPI для приёма заявок.

## Структура

- `frontend/` — исходный код SPA.
- `public/` — SVG-ассеты и SEO-файлы.
- `backend/` — FastAPI c REST-эндпоинтами.
- `seo/` — JSON-LD схема товара.
- `tests/` — текстовые сценарии e2e.
- `storage/` — рабочие файлы (в гит не попадают).

## Запуск

```bash
npm install
npm run dev
```

Бэкенд:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
./backend/run.sh
```

## Сборка и проверка

```bash
npm run build
npm run lint
npm run test:no-binaries
```

Команда `npm run test:no-binaries` запускает `verify-no-binaries.js` и гарантирует отсутствие запрещённых форматов и бинарного содержимого.

## Как проверить

1. `npm run dev` — поднять фронтенд.
2. `./backend/run.sh` — запустить API.
3. Пройти сценарии из `tests/e2e.spec.md`.
4. Убедиться, что `npm run test:no-binaries` завершился успешно.

## Политика PR

- Этот PR не содержит бинарных файлов.
- Любые будущие графические ассеты добавлять отдельно, после ревью.
- Перед отправкой PR обязательно выполнить `npm run test:no-binaries` локально.

## SEO

- OpenGraph изображение: `public/og-image.svg` (для прода желательно заменить на PNG).
- JSON-LD: `seo/product.json`.
- Robots и sitemap — текстовые файлы в `public/`.
