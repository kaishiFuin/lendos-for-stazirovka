# SlimiGood Landing

Прототип посадочной страницы для SlimiGood с A/B-тестированием, калькулятором ИМТ и микровзаимодействиями.

## Стек

- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion
- lucide-react
- Vitest

## Запуск

```bash
npm install
npm run dev
npm run build
npm run preview
npm run test
```

## Примечания

- Все изображения подключаются через внешние HTTPS-ссылки.
- Шрифт Inter подгружается с Google Fonts.
- Формы отправляют данные только в `localStorage` и `console.log`.
- Таймер скидки и атрибуция кампаний сохраняются в `localStorage`.
- Квиз и FAQ подгружаются лениво для оптимизации бандла.
