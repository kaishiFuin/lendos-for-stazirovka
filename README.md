# SlimiGood Prototype

Прототип лендинга SlimiGood на стеке Vite + React + TypeScript + Tailwind и мини-бэкенде FastAPI для приёма лидов.

## Структура

- `frontend/` — клиентская часть, компоненты и логика A/B-теста.
- `backend/` — FastAPI-приложение с эндпоинтами `/api/ping`, `/api/health`, `/api/leads`.
- `public/` — текстовые SVG-ассеты (favicon и og-image).
- `seo/` — JSON-LD для микроразметки.
- `tests/` — сценарии ручного тестирования.
- `storage/` — директория для рабочих JSON-файлов (в гит не входит).

## Установка и запуск

```bash
npm install
npm run dev
```

Фронтенд запускается на `http://localhost:5173`. Бэкенд:

```bash
python -m venv .venv
source .venv/bin/activate
pip install fastapi "uvicorn[standard]"
./backend/run.sh
```

API доступно на `http://localhost:8000`.

## Скрипты

- `npm run dev` — запуск Vite в режиме разработки.
- `npm run build` — продакшен-сборка фронтенда.
- `npm run preview` — предпросмотр собранной версии.
- `npm run lint` — проверка линтером.
- `npm run test:no-binaries` — проверка отсутствия бинарных файлов в дереве.

## Как проверить

Перед отправкой PR выполните:

1. `npm run lint`
2. `npm run build`
3. `npm run test:no-binaries`
4. Пройдите сценарии из `tests/e2e.spec.md`

## Политика PR

Этот PR не содержит бинарных файлов; любые будущие графические ассеты добавлять отдельно, после ревью. Для продового предпросмотра og-картинку рекомендуется заменить на PNG уже после мержа.

## SEO

Микроразметка хранится в `seo/product.json`. Убедитесь, что `<head>` страницы подключает нужные метатеги и указывает `og:image` на `/og-image.svg`.
