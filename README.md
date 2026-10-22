# 04-react-query

Додаток для пошуку фільмів, створений на React та TypeScript. Шукайте фільми за ключовими словами, переглядайте результати у вигляді галереї постерів та відкривайте будь-який фільм у модальному вікні, щоб переглянути детальнішу інформацію. Дані про фільми надходять із [API TMDB](https://www.themoviedb.org/).

**Демо:** https://04-react-query-five-rust.vercel.app/

## Функції

- Пошук фільмів за ключовим словом (обробка форми через типізовану подію `onSubmit`)
- Спливаючі сповіщення у разі порожнього запиту та при відсутності результатів (React Hot Toast)
- Стан завантаження та помилки відображаються відповідно до стану TanStack Query (лоадер показується і під час зміни сторінки)
- Кількість сторінок обмежена 500 — максимум, який підтримує TMDB
- Результати пошуку кешуються TanStack Query окремо за пошуковим запитом і номером сторінки
- Пагінація результатів через React Paginate
- Модальне вікно з фільмами відображається через портал; закривається за допомогою кнопки «×», клавіші `Esc` або кліка по фону
- Прокрутка сторінки заблокована, поки модальне вікно відкрите

## Технології

- [TanStack Query](https://tanstack.com/query/latest) для кешування та керування станом серверних даних
- [React Paginate](https://www.npmjs.com/package/react-paginate) для пагінації

- [Vite](https://vite.dev/) + React + TypeScript
- [axios](https://axios-http.com/) for HTTP requests
- [React Hot Toast](https://react-hot-toast.com/)
- CSS Modules + [modern-normalize](https://github.com/sindresorhus/modern-normalize)
- Prettier + ESLint

## Запуск

1. Склонуйте репозиторій та встановіть залежності:

   ```bash
   npm install
   ```

2. Отримайте API Read Access Token на [TMDB](https://www.themoviedb.org/settings/api) і створіть файл `.env` у кореневій папці проєкту:

   ```env
   VITE_TMDB_TOKEN=your_tmdb_access_token
   ```

3. Запустіть сервер розробки:

   ```bash
   npm run dev
   ```

## Деплой на Vercel

1. Завантажте проєкт у GitHub-репозиторій з назвою `04-react-query`.
2. Імпортуйте репозиторій у [Vercel](https://vercel.com/). Для Vite залиште команду збірки `npm run build`, а директорію публікації — `dist`.
3. У налаштуваннях проєкту Vercel додайте змінну середовища `VITE_TMDB_TOKEN` зі своїм TMDB API Read Access Token і повторно розгорніть застосунок.

## Скрипти

| Команда           | Опис                           |
| ----------------- | ------------------------------ |
| `npm run dev`     | Запустити сервер розробки      |
| `npm run build`   | Перевірити типи та зібрати     |
| `npm run preview` | Переглянути попередній варіант |
| `npm run lint`    | Запустити ESLint               |

## Структура проєкту

```
src/
├── components/
│   ├── App/
│   ├── SearchBar/
│   ├── MovieGrid/
│   ├── MovieModal/
│   ├── Loader/
│   └── ErrorMessage/
├── services/
│   └── movieService.ts
└── types/
    └── movie.ts
```
