# Vite.js — введение, преимущества, установка, настройка, Docker

Материал для занятия: современный инструмент сборки и dev-сервер для фронтенда.

> **Одной фразой:** **Vite** поднимает dev-сервер за доли секунды (нативные ES-модули + esbuild), а на прод собирает через **Rollup**. Create React App / Webpack «из коробки» для нового React-проекта сегодня обычно заменяют именно Vite.

---

## Содержание

1. [Введение в Vite.js](#введение-в-vitejs)
2. [Преимущества Vite.js по сравнению с другими инструментами](#преимущества-vitejs-по-сравнению-с-другими-инструментами)
3. [Установка и настройка окружения](#установка-и-настройка-окружения)
4. [Настройка проекта с использованием Vite.js](#настройка-проекта-с-использованием-vitejs)
5. [Запуск контейнера и разработка](#запуск-контейнера-и-разработка)
6. [Типичные команды](#типичные-команды)
7. [Типичные ошибки](#типичные-ошибки)
8. [Чеклист](#чеклист)
9. [Полезные ссылки](#полезные-ссылки)
10. [Краткий словарь](#краткий-словарь)

---

## Введение в Vite.js

### Что это

**Vite** (фр. «быстрый», произносится roughly «вит») — инструмент от создателя Vue (Evan You) для:

1. **Development** — молниеносный dev-сервер с HMR (Hot Module Replacement).
2. **Production** — оптимизированная сборка бандла (Rollup под капотом).

Официальный сайт: [vite.dev](https://vite.dev/).

### Зачем вообще «сборщик»

Браузер не понимает JSX/TS «как есть», не склеивает сотни `import` в один оптимальный файл для продакшена. Нужен слой:

```
исходники (React, TS, CSS modules)
        ↓
   Vite (dev / build)
        ↓
то, что отдаём браузеру
```

### Как Vite работает в dev (упрощённо)

```
┌─────────────┐     HTTP      ┌──────────────────┐
│   Браузер   │ ◀──────────▶  │  Vite Dev Server │
│  localhost  │   ES modules  │  (+ esbuild)     │
└─────────────┘               └──────────────────┘
                                     │
                                     ▼
                              ваши .tsx / .css
```

1. Браузер запрашивает страницу.
2. Vite отдаёт код как **нативные ESM** (`import` / `export`).
3. Файлы обрабатываются **по запросу** (не весь проект сразу).
4. Зависимости из `node_modules` (React и т.д.) один раз пребандлятся через **esbuild** → кэш `.vite`.
5. При сохранении файла — **HMR**: обновляется модуль без полной перезагрузки страницы.

### Как Vite работает в production

```bash
npm run build
```

- Собирает оптимизированный бандл (минификация, code-splitting, хэши в именах файлов).
- Результат в папке `dist/` — статику можно отдать nginx / GitHub Pages / Vercel.

### Шаблоны (scaffolding)

Vite умеет стартовать проекты под разные стеки:

| Шаблон | Команда (фрагмент) |
|--------|--------------------|
| React + TS | `react-ts` |
| React + JS | `react` |
| Vue | `vue` / `vue-ts` |
| Svelte | `svelte` |
| Vanilla | `vanilla` / `vanilla-ts` |

В курсе и в `diplom` — **React + TypeScript**.

---

## Преимущества Vite.js по сравнению с другими инструментами

### Кого сравниваем

| Инструмент | Роль |
|------------|------|
| **Webpack** (+ CRA) | Классический бандлер; CRA долго был стандартом React |
| **Parcel** | «Zero config» бандлер |
| **esbuild / SWC** | Очень быстрые компиляторы (Vite использует esbuild в dev) |
| **Next.js / Remix** | Фреймворки с своим пайплайном (не прямой заменитель Vite для SPA) |

### Почему Vite быстрее в разработке

| | Webpack / CRA (типично) | Vite |
|--|-------------------------|------|
| Старт dev | Сначала бандлит почти всё | Сразу сервер, модули по запросу |
| Холодный старт | Секунды–минуты на большом проекте | Обычно < 1 с |
| HMR | Часто тяжелее | Точечное обновление ESM |
| Конфиг | Часто сложный | Простой `vite.config.ts` |
| Prebundling deps | Бандл всего | esbuild только для зависимостей |

### Плюсы Vite

1. **Скорость DX** — меньше ждать «Compiling…».
2. **Прозрачный ESM** — ближе к тому, как устроен современный браузер.
3. **Из коробки:** TS, JSX, CSS/CSS Modules, PostCSS, static assets, env (`import.meta.env`).
4. **Плагины** — экосистема Rollup/Vite (`@vitejs/plugin-react`, SSL, PWA…).
5. **Один инструмент** на dev + build (не нужно отдельно настраивать Webpack только ради HMR).
6. **Официальная рекомендация** для SPA React вне Next (см. React docs → Create a React App alternatives).

### Минусы / ограничения (честно)

| Минус | Комментарий |
|-------|-------------|
| Нужен современный Node | LTS-версия |
| Не «фреймворк» | Нет SSR/роутинга «из коробки» как у Next — это бандлер + dev-server |
| Старый IE | Не цель Vite |
| Очень кастомный legacy Webpack | Миграция может занять время |

### Краткая таблица «когда что»

| Задача | Обычно берут |
|--------|----------------|
| SPA React/Vue учебный / диплом | **Vite** |
| SSR, SEO, fullstack React | Next.js / Remix |
| Уже огромный Webpack monorepo | Часто остаются на Webpack или мигрируют поэтапно |
| Только транспиляция без dev UX | esbuild / SWC напрямую |

---

## Установка и настройка окружения

### Что нужно установить

| ПО | Зачем | Проверка |
|----|--------|----------|
| **Node.js** (LTS, ≥ 20 рекомендуется) | Запуск Vite и npm | `node -v` |
| **npm** (идёт с Node) | Пакеты | `npm -v` |
| (опц.) **pnpm** / **yarn** | Альтернативные клиенты | `pnpm -v` |
| (опц.) **Docker Desktop** | Контейнер для разработки | `docker -v` |
| Редактор | VS Code / Cursor | — |
| Браузер | Chrome / Firefox | — |

Скачать Node: [nodejs.org](https://nodejs.org/).

> На macOS часто ставят через [nvm](https://github.com/nvm-sh/nvm) или официальный `.pkg`.

### Создание проекта

**Вариант A — официальный scaffold (рекомендуется):**

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

Интерактивно (без флагов):

```bash
npm create vite@latest
```

Спросит имя проекта, фреймворк (React), вариант (TypeScript).

**Вариант B — как в репозитории курса** (`diplom` уже на Vite):

```bash
cd diplom
npm install
npm run dev
```

### Структура свежего Vite + React + TS

```text
my-app/
├── index.html          # вход HTML (не в public/, а в корне — так устроен Vite)
├── package.json
├── vite.config.ts      # конфиг Vite
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── public/             # статика as-is (favicon и т.п.)
└── src/
    ├── main.tsx        # entry JS/TS
    ├── App.tsx
    ├── App.css
    └── assets/
```

Важно: в `index.html` есть:

```html
<script type="module" src="/src/main.tsx"></script>
```

Vite стартует от HTML → подтягивает модули.

### Scripts в `package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

| Скрипт | Что делает |
|--------|------------|
| `dev` | Dev-сервер + HMR |
| `build` | Проверка типов + сборка в `dist/` |
| `preview` | Локально посмотреть production-сборку |

---

## Настройка проекта с использованием Vite.js

### Базовый `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Плагин `@vitejs/plugin-react` включает Fast Refresh для React.

### Частые опции (как в `diplom`)

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1', // слушать адрес
    port: 8888,        // порт
    open: true,        // (опц.) открыть браузер
  },
  preview: {
    port: 4173,
  },
  resolve: {
    alias: {
      '@': '/src', // удобные импорты: import x from '@/components/...'
    },
  },
})
```

Пример alias с `path` (надёжнее):

```ts
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(root, 'src'),
    },
  },
})
```

### Переменные окружения

Файлы: `.env`, `.env.development`, `.env.production`.

Правило Vite: в клиент попадают только переменные с префиксом **`VITE_`**.

```bash
# .env
VITE_API_URL=http://127.0.0.1:3001
```

```ts
const api = import.meta.env.VITE_API_URL
```

Не кладите в `VITE_*` секреты (client_secret Spotify и т.п.) — они попадут в бандл.

### Proxy к API (dev)

Чтобы обойти CORS на локалке:

```ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

Запрос с фронта на `/api/students` уйдёт на `http://localhost:3001/students`.

### CSS / CSS Modules / статике

| Что | Как |
|-----|-----|
| Глобальный CSS | `import './index.css'` |
| CSS Modules | `import styles from './App.module.css'` → `styles.title` |
| Картинки | `import logo from './logo.svg'` или из `public/` |
| SVG как URL / компонент | через плагины или `?react` (зависит от настройки) |

### Path / base для деплоя не в корень

Если сайт лежит на `https://example.com/my-app/`:

```ts
export default defineConfig({
  base: '/my-app/',
  plugins: [react()],
})
```

### HTTPS на локалке (опционально)

```bash
npm i -D @vitejs/plugin-basic-ssl
```

```ts
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: { https: true },
})
```

### TypeScript

Vite **не** делает type-check во время `vite` / `vite build` сам по себе — за это отвечает `tsc -b` в скрипте `build`. В IDE ошибки типов видны сразу.

---

## Запуск контейнера и разработка

Ниже — два режима: обычный локальный запуск и **Docker-контейнер** (удобно, когда Node не ставят на машину или нужна одинаковая среда у всей группы).

### A. Локальная разработка (без Docker)

```bash
cd my-app          # или diplom
npm install
npm run dev
```

Откройте URL из терминала, например:

- `http://localhost:5173` — порт Vite по умолчанию  
- `http://127.0.0.1:8888` — как в `diplom`

Сохраняете файл → HMR обновляет страницу.

Остановка: `Ctrl + C` в терминале.

Production-проверка локально:

```bash
npm run build
npm run preview
```

### B. Docker: идея

```
Ваш Mac                         Docker
┌─────────────┐               ┌─────────────────────┐
│ Браузер     │ ── :5173 ──▶  │ Container: Node+Vite│
│ редактор    │   volume      │ npm run dev         │
│ (код на диске)◀────────────▶│ /app = ваш проект   │
└─────────────┘               └─────────────────────┘
```

Код монтируется **volume**, чтобы правки с хоста сразу видел Vite внутри контейнера.

### Dockerfile (dev)

В корне Vite-проекта (`my-app/Dockerfile`):

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

Флаг `--host 0.0.0.0` обязателен: иначе Vite слушает только localhost **внутри** контейнера, и с хоста порт не достучится.

### `.dockerignore`

```text
node_modules
dist
.git
*.md
.env.local
```

### Сборка и запуск контейнера

```bash
# из папки проекта
docker build -t vite-dev .

docker run --rm -it \
  -p 5173:5173 \
  -v "$(pwd)":/app \
  -v /app/node_modules \
  vite-dev
```

| Флаг | Зачем |
|------|--------|
| `-p 5173:5173` | Проброс порта на хост |
| `-v "$(pwd)":/app` | Живой код с машины |
| `-v /app/node_modules` | Анонимный volume: не затирать `node_modules` контейнера хостовыми |

Браузер: `http://localhost:5173`.

### docker-compose (удобнее для занятия)

`docker-compose.yml`:

```yaml
services:
  web:
    build: .
    ports:
      - "5173:5173"
    volumes:
      - .:/app
      - /app/node_modules
    command: npm run dev -- --host 0.0.0.0 --port 5173
```

Запуск:

```bash
docker compose up --build
```

Остановка:

```bash
docker compose down
```

### Если порт как в diplom (8888)

В `vite.config.ts`:

```ts
server: {
  host: true, // или '0.0.0.0'
  port: 8888,
},
```

В compose:

```yaml
ports:
  - "8888:8888"
command: npm run dev -- --host 0.0.0.0 --port 8888
```

### Production-образ (кратко)

Многоступенчатая сборка: собрать статику → отдать nginx.

```dockerfile
# build
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

# serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Для учёбы чаще достаточно **dev-контейнера** или просто `npm run dev` без Docker.

### Режим разработки: что делать день за днём

1. Поднять Vite (`npm run dev` или `docker compose up`).
2. Писать компоненты в `src/`.
3. Смотреть HMR в браузере.
4. Перед сдачей / деплоем: `npm run build` (ошибки TS + бандл).
5. При необходимости — `preview` или nginx-контейнер.

---

## Типичные команды

```bash
# создать проект
npm create vite@latest my-app -- --template react-ts

# зависимости
npm install

# разработка
npm run dev

# сборка
npm run build

# посмотреть prod-сборку
npm run preview

# docker
docker compose up --build
```

---

## Типичные ошибки

| Проблема | Причина / решение |
|----------|-------------------|
| `command not found: vite` | Запускайте через `npm run dev`, не глобальный vite |
| Порт занят | Смените `server.port` или убейте процесс на порту |
| Docker: страница не открывается | Забыли `--host 0.0.0.0` / `host: true` |
| HMR не работает в Docker | Проверьте volume + иногда `server.watch.usePolling: true` (Docker Desktop / FS events) |
| `env` undefined | Нет префикса `VITE_` или не перезапустили dev-server |
| Белый экран после deploy | Неверный `base` в конфиге |
| CSS Modules «не работают» | Опечатка в имени класса / селектор не совпадает с DOM (не вина Vite) |

Polling для Docker (если HMR тупит):

```ts
server: {
  host: true,
  watch: {
    usePolling: true,
  },
},
```

---

## Чеклист

```text
# 1. Node LTS установлен (node -v, npm -v)
# 2. Проект: npm create vite@latest … --template react-ts
# 3. npm install && npm run dev
# 4. Понимать: dev = ESM + esbuild, build = Rollup → dist/
# 5. vite.config.ts: plugins react, server host/port
# 6. Секреты не в VITE_*
# 7. Docker: --host 0.0.0.0 + проброс порта + volume
# 8. Перед сдачей: npm run build без ошибок
```

---

## Полезные ссылки

| Ресурс | Зачем |
|--------|--------|
| [vite.dev](https://vite.dev/) | Документация |
| [Guide → Why Vite](https://vite.dev/guide/why.html) | Зачем Vite |
| [Env variables](https://vite.dev/guide/env-and-mode.html) | `import.meta.env` |
| [Server options](https://vite.dev/config/server-options.html) | host, port, proxy |
| [React plugin](https://github.com/vitejs/vite-plugin-react) | `@vitejs/plugin-react` |
| [diplom/vite.config.ts](../diplom/vite.config.ts) | Пример из курса |

---

## Краткий словарь

| Термин | Одной строкой |
|--------|----------------|
| Vite | Dev-server + bundler для современного фронта |
| esbuild | Быстрый компилятор; Vite пребандлит им deps |
| Rollup | Бандлер production-сборки Vite |
| HMR | Подмена модуля без полной перезагрузки |
| ESM | Нативные `import`/`export` в браузере |
| `dist/` | Папка с результатом `vite build` |
| `import.meta.env` | Env-переменные Vite |
| scaffold | Каркас проекта (`create vite`) |
| volume | Монтирование папки хоста в Docker |
| `--host 0.0.0.0` | Слушать все интерфейсы (нужно в контейнере) |

---

> В курсе вы уже пользуетесь Vite в `diplom` и `test-storybook`. Этот урок закрепляет *почему* он быстрый и *как* поднять тот же стек с нуля или в Docker.
