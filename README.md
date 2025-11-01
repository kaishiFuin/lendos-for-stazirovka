# SlimiGood Prototype (Text-Only Assets)

SlimiGood — интерактивный лендинг с A/B-тестированием и формой заявки. Репозиторий содержит фронтенд на Vite + React + TypeScript + Tailwind CSS и лёгкий бэкенд на FastAPI для приёма лидов и сбора аналитики. Все ассеты представлены в текстовом формате (SVG или CSS), бинарные файлы исключены.

## Структура

- `frontend/` — исходники Vite-приложения, компоненты, секции, хуки и утилиты.
- `backend/` — FastAPI-приложение, эндпоинты `/api/leads`, `/api/ping`, `/api/health`, хранилище на JSON-файлах.
- `public/` — текстовые SVG-ассеты (`favicon.svg`, `og-image.svg`).
- `seo/` — SEO-конфигурации и JSON-LD.
- `tests/` — e2e-сценарии и чек-листы.
- `storage/` — рабочая директория для JSON-логов (в гите только `.gitkeep`).

## Быстрый старт

```bash
npm install
npm run dev
```

Фронтенд доступен на `http://localhost:5173`. Для запуска бэкенда используйте `./backend/run.sh` (см. раздел ниже).

## Сборка и предпросмотр

```bash
npm run build
npm run preview
```

## Линтинг и проверки

```bash
npm run lint
npm run test:no-binaries
```

Скрипт `test:no-binaries` гарантирует отсутствие бинарных файлов в дереве репозитория.

## Бэкенд

```bash
cd backend
./run.sh
```

Сервер поднимается на `http://127.0.0.1:8000`. Эндпоинты:

- `GET /api/ping` — проверка доступности.
- `GET /api/health` — статус сервера.
- `POST /api/leads` — приём лидов.

## SEO

Метаданные и JSON-LD лежат в каталоге `seo/`. В `<head>` лендинга подключаются OG-теги, Twitter Cards и product-schema. OG-изображение — `og-image.svg`. Для продового предпросмотра рекомендуется заменить его на PNG после мержа.

## Как проверить

1. `npm run lint`
2. `npm run test:no-binaries`
3. `npm run build`
4. `npm run preview`
5. Выполнить сценарии из `tests/e2e.spec.md`
6. Убедиться, что в PR отсутствуют бинарные файлы (скрипт из шага 2)

## Политика PR

Этот PR не содержит бинарных файлов; любые будущие графические ассеты добавлять отдельно, после ревью.
