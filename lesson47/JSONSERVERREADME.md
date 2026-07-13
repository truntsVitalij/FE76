# JSON Server — гайд по mock REST API

Материал для занятия: как поднять локальный REST API из одного JSON-файла и подключить к нему React-приложение.

> **JSON Server** — npm-пакет, который превращает `db.json` в полноценный REST API с CRUD-операциями. Удобен для диплома и учебных проектов, когда своего backend ещё нет.

---

## Содержание

1. [Что такое JSON Server](#что-такое-json-server)
2. [Когда использовать](#когда-использовать)
3. [Установка](#установка)
4. [Структура db.json](#структура-dbjson)
5. [Запуск сервера](#запуск-сервера)
6. [Автоматические REST-маршруты](#автоматические-rest-маршруты)
7. [Примеры запросов через fetch](#примеры-запросов-через-fetch)
8. [Фильтрация, сортировка, пагинация](#фильтрация-сортировка-пагинация)
9. [Связи между таблицами](#связи-между-таблицами)
10. [Кастомные маршруты (routes.json)](#кастомные-маршруты-routesjson)
11. [Middleware — задержка и авторизация](#middleware--задержка-и-авторизация)
12. [Интеграция с React + Redux Thunk](#интеграция-с-react--redux-thunk)
13. [Пример для CRM онлайн-школы](#пример-для-crm-онлайн-школы)
14. [Ограничения](#ограничения)
15. [Полезные ссылки](#полезные-ссылки)

---

## Что такое JSON Server

**JSON Server** читает файл `db.json` и автоматически создаёт REST API.

```
db.json  →  json-server  →  http://localhost:3000
```

Каждый ключ верхнего уровня в `db.json` становится отдельным ресурсом:

```json
{
  "students": [...],
  "lessons": [...],
  "transactions": [...]
}
```

Появятся маршруты:

```
GET    /students
GET    /students/1
POST   /students
PUT    /students/1
PATCH  /students/1
DELETE /students/1
```

> **Одной фразой:** вы описываете данные в JSON, а `json-server` даёт вам backend «на минуту» — без Node, Express и базы данных.

---

## Когда использовать

| Ситуация | Подходит? |
|----------|-----------|
| Диплом / учебный проект без своего сервера | ✅ |
| Прототип CRM, блога, каталога | ✅ |
| Отработка `fetch`, Redux Thunk, loading/error | ✅ |
| Настоящая авторизация и безопасность | ❌ |
| Продакшен | ❌ |
| Сложная бизнес-логика (списание баланса, роли) | ⚠️ частично через middleware |

**Сравнение с альтернативами:**

| Инструмент | Плюс | Минус |
|------------|------|-------|
| **json-server** | Полный CRUD локально, просто | Только на вашем компьютере |
| **Supabase** | Настоящий backend в облаке | Нужна настройка таблиц |
| **Fake API for Devs** | Уже в интернете | Мало кастомизации |

---

## Установка

### Вариант 1 — в конкретный проект (рекомендуется)

```bash
npm install json-server@0.17.4 --save-dev
```

> Используем версию **0.17.4** — она стабильная и поддерживает `--routes`, `--middlewares`, `_embed`.

### Вариант 2 — глобально

```bash
npm install -g json-server@0.17.4
```

### Скрипт в package.json

```json
{
  "scripts": {
    "dev": "vite",
    "api": "json-server --watch db.json --port 3001",
    "dev:all": "npm run api & npm run dev"
  }
}
```

Теперь API можно запускать отдельно:

```bash
npm run api
```

---

## Структура db.json

Файл `db.json` лежит в корне проекта (или в папке `mock/`).

### Массив = коллекция (несколько записей)

```json
{
  "students": [
    { "id": 1, "name": "Анна", "balance": 500 },
    { "id": 2, "name": "Пётр", "balance": 1200 }
  ]
}
```

### Объект = один ресурс (не коллекция)

```json
{
  "settings": {
    "schoolName": "English Online",
    "lessonPrice": 25
  }
}
```

Для объекта доступны только `GET`, `PUT`, `PATCH` — без `POST` и `DELETE`.

### Правила

1. У каждой записи в массиве должен быть уникальный `id`
2. `id` может быть числом или строкой
3. При `POST` без `id` — `json-server` сгенерирует его сам
4. Изменения при `--watch` **сохраняются обратно в db.json**

---

## Запуск сервера

```bash
npx json-server --watch db.json --port 3001
```

Вывод в терминале:

```
\{^_^}/ hi!

Loading db.json
Done

Resources
http://localhost:3001/students
http://localhost:3001/lessons

Home
http://localhost:3001
```

Откройте `http://localhost:3001` в браузере — увидите веб-интерфейс для просмотра и редактирования данных.

### Полезные флаги

| Флаг | Описание |
|------|----------|
| `--watch` | Перезагрузка при изменении `db.json` |
| `--port 3001` | Порт (по умолчанию 3000) |
| `--routes routes.json` | Кастомные URL |
| `--middlewares auth.js` | Своя логика (auth, delay) |
| `--host 0.0.0.0` | Доступ из локальной сети |

---

## Автоматические REST-маршруты

Если в `db.json` есть `"students": [...]`, появляются маршруты:

| Метод | URL | Действие |
|-------|-----|----------|
| `GET` | `/students` | Список всех учеников |
| `GET` | `/students/1` | Один ученик по id |
| `POST` | `/students` | Создать ученика |
| `PUT` | `/students/1` | Полностью заменить запись |
| `PATCH` | `/students/1` | Частично обновить запись |
| `DELETE` | `/students/1` | Удалить ученика |

То же самое работает для любого ключа: `lessons`, `transactions`, `users` и т.д.

---

## Примеры запросов через fetch

Базовый URL:

```ts
const API_URL = 'http://localhost:3001';
```

### GET — получить список

```ts
const response = await fetch(`${API_URL}/students`);
const students = await response.json();

// students = [{ id: 1, name: 'Анна', balance: 500 }, ...]
```

### GET — одна запись

```ts
const response = await fetch(`${API_URL}/students/1`);
const student = await response.json();
```

### POST — создать

```ts
const response = await fetch(`${API_URL}/students`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Мария',
    phone: '+375291234567',
    balance: 0,
  }),
});

const newStudent = await response.json();
// json-server сам добавит id
```

### PATCH — обновить часть полей

```ts
await fetch(`${API_URL}/students/1`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ balance: 300 }),
});
```

### DELETE — удалить

```ts
await fetch(`${API_URL}/students/1`, {
  method: 'DELETE',
});
```

### Обработка ошибок

```ts
const response = await fetch(`${API_URL}/students/999`);

if (!response.ok) {
  throw new Error(`Ошибка: ${response.status}`);
}

const student = await response.json();
```

---

## Фильтрация, сортировка, пагинация

`json-server` поддерживает query-параметры из коробки.

### Фильтрация

```ts
// ученики с балансом 500
fetch(`${API_URL}/students?balance=500`);

// уроки конкретного ученика
fetch(`${API_URL}/lessons?studentId=1`);

// уроки со статусом scheduled
fetch(`${API_URL}/lessons?status=scheduled`);
```

### Сортировка

```ts
// по имени (возрастание)
fetch(`${API_URL}/students?_sort=name&_order=asc`);

// по балансу (убывание)
fetch(`${API_URL}/students?_sort=balance&_order=desc`);
```

### Пагинация

```ts
// страница 2, по 10 записей
fetch(`${API_URL}/students?_page=2&_limit=10`);
```

### Поиск по нескольким полям

```ts
// имя содержит "ан" (регистр не важен)
fetch(`${API_URL}/students?q=ан`);
```

### Комбинирование

```ts
fetch(`${API_URL}/lessons?teacherId=2&status=completed&_sort=date&_order=desc`);
```

---

## Связи между таблицами

Если урок ссылается на ученика через `studentId`, можно подтянуть связанные данные.

**db.json:**

```json
{
  "students": [
    { "id": 1, "name": "Анна", "balance": 500 }
  ],
  "lessons": [
    { "id": 1, "studentId": 1, "date": "2026-07-15", "status": "scheduled", "price": 25 }
  ]
}
```

**Запрос с вложенным student:**

```ts
fetch(`${API_URL}/lessons?_embed=student`);
```

**Ответ:**

```json
[
  {
    "id": 1,
    "studentId": 1,
    "date": "2026-07-15",
    "status": "scheduled",
    "price": 25,
    "student": {
      "id": 1,
      "name": "Анна",
      "balance": 500
    }
  }
]
```

Обратная связь — `_embed=lessons` на `/students`.

---

## Кастомные маршруты (routes.json)

Иногда нужны URL как у настоящего API: `/api/students` вместо `/students`.

**routes.json:**

```json
{
  "/api/*": "/$1",
  "/api/students": "/students",
  "/api/students/:id": "/students/:id",
  "/api/lessons": "/lessons"
}
```

**Запуск:**

```bash
npx json-server --watch db.json --routes routes.json --port 3001
```

Теперь работают оба варианта:

```
GET /students
GET /api/students
```

---

## Middleware — задержка и авторизация

Middleware — промежуточная функция, которая выполняется **до** обработки запроса.

### Имитация задержки сети

**delay.js:**

```js
module.exports = (req, res, next) => {
  setTimeout(next, 800); // 800 мс задержка
};
```

```bash
npx json-server --watch db.json --middlewares delay.js --port 3001
```

### Простая проверка токена

**auth.js:**

```js
module.exports = (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }

  const token = req.headers.authorization;

  if (token !== 'Bearer fake-jwt-token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
```

На фронте:

```ts
fetch(`${API_URL}/students`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer fake-jwt-token',
  },
  body: JSON.stringify({ name: 'Тест' }),
});
```

### Кастомный login (server.js)

Для полноценной имитации авторизации лучше свой `server.js`:

```js
const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  const db = router.db;
  const user = db.get('users').find({ email, password }).value();

  if (!user) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }

  res.json({
    token: 'fake-jwt-token',
    user: { id: user.id, name: user.name, role: user.role },
  });
});

server.use(router);

server.listen(3001, () => {
  console.log('JSON Server running on http://localhost:3001');
});
```

**package.json:**

```json
{
  "scripts": {
    "api": "node server.js"
  }
}
```

---

## Интеграция с React + Redux Thunk

### 1. API-слой

```ts
// src/api/studentsApi.ts
const API_URL = 'http://localhost:3001';

export async function fetchStudents() {
  const response = await fetch(`${API_URL}/students`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить учеников');
  }

  return response.json();
}

export async function createStudent(student: { name: string; balance: number }) {
  const response = await fetch(`${API_URL}/students`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    throw new Error('Не удалось создать ученика');
  }

  return response.json();
}
```

### 2. Action types

```ts
// src/store/actions/studentsActions.ts
export const FETCH_STUDENTS_START = 'students/FETCH_START';
export const FETCH_STUDENTS_SUCCESS = 'students/FETCH_SUCCESS';
export const FETCH_STUDENTS_ERROR = 'students/FETCH_ERROR';
```

### 3. Thunk

```ts
import { fetchStudents } from '../../api/studentsApi';
import {
  FETCH_STUDENTS_START,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_ERROR,
} from './studentsActions';

export const loadStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_START });

  try {
    const students = await fetchStudents();
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: students });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_ERROR,
      payload: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
```

### 4. Reducer

```ts
const initialState = {
  list: [],
  loading: false,
  error: null,
};

export function studentsReducer(state = initialState, action) {
  switch (action.type) {
    case 'students/FETCH_START':
      return { ...state, loading: true, error: null };
    case 'students/FETCH_SUCCESS':
      return { ...state, loading: false, list: action.payload };
    case 'students/FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
```

### 5. Компонент

```tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStudents } from '../../store/actions/studentsActions';

export const StudentList = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(loadStudents());
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <ul>
      {list.map((student) => (
        <li key={student.id}>{student.name} — баланс: {student.balance}</li>
      ))}
    </ul>
  );
};
```

### Поток данных

```
StudentList
    │ dispatch(loadStudents())
    ▼
Redux Thunk
    │ fetch('http://localhost:3001/students')
    ▼
json-server
    │ читает db.json, возвращает JSON
    ▼
dispatch(FETCH_STUDENTS_SUCCESS)
    ▼
Reducer обновляет store
    ▼
useSelector → UI перерисовывается
```

---

## Пример для CRM онлайн-школы

Стартовый `db.json` под диплом «CRM для онлайн-школы английского»:

```json
{
  "users": [
    { "id": 1, "email": "admin@school.com", "password": "admin123", "role": "admin", "name": "Админ" },
    { "id": 2, "email": "manager@school.com", "password": "manager123", "role": "manager", "name": "Менеджер" },
    { "id": 3, "email": "teacher@school.com", "password": "teacher123", "role": "teacher", "name": "Преподаватель" }
  ],
  "students": [
    { "id": 1, "name": "Анна Иванова", "phone": "+375291111111", "balance": 500, "managerId": 2 },
    { "id": 2, "name": "Пётр Сидоров", "phone": "+375292222222", "balance": 1200, "managerId": 2 }
  ],
  "lessons": [
    { "id": 1, "studentId": 1, "teacherId": 3, "date": "2026-07-15T10:00:00", "status": "scheduled", "price": 25 },
    { "id": 2, "studentId": 2, "teacherId": 3, "date": "2026-07-16T14:00:00", "status": "completed", "price": 25 }
  ],
  "transactions": [
    { "id": 1, "studentId": 1, "amount": -25, "type": "lesson", "lessonId": 1, "createdAt": "2026-07-15T10:00:00" },
    { "id": 2, "studentId": 2, "amount": 500, "type": "topup", "lessonId": null, "createdAt": "2026-07-10T09:00:00" }
  ]
}
```

### Какие экраны закрывает этот mock

| Экран | Эндпоинт |
|-------|----------|
| Список учеников | `GET /students` |
| Карточка ученика | `GET /students/1` |
| Уроки ученика | `GET /lessons?studentId=1` |
| Расписание преподавателя | `GET /lessons?teacherId=3` |
| Создать урок | `POST /lessons` |
| История транзакций | `GET /transactions?studentId=1` |
| Пользователи (admin) | `GET /users` |

### Бизнес-логика «списание при создании урока»

`json-server` **не умеет** сам списывать баланс при `POST /lessons`. Варианты:

1. **На фронте в Thunk** — создали урок → `PATCH /students/:id` (уменьшить balance) → `POST /transactions`
2. **В server.js** — кастомный `POST /lessons` с логикой списания
3. **Перейти на Supabase** — если нужна настоящая backend-логика

Для диплома вариант 1 или 2 вполне допустим.

---

## Ограничения

| Ограничение | Пояснение |
|-------------|-----------|
| Только локально | API работает на вашем компьютере, в интернет не выкладывается |
| Нет настоящей безопасности | Пароли в `db.json` — только для демо |
| Нет сложной логики из коробки | Списание баланса, роли — через middleware или фронт |
| Один файл данных | Не подходит для больших объёмов |
| Два терминала | Нужно запускать и API (`npm run api`), и фронт (`npm run dev`) |

### CORS

`json-server` по умолчанию разрешает запросы с другого порта (например, Vite на `:5173` → API на `:3001`). Если CORS-ошибка — проверьте, что API запущен.

### Типичные ошибки

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `Failed to fetch` | API не запущен | `npm run api` |
| `404 Not Found` | Неверный URL или id | Проверить `db.json` |
| Пустой массив | Неверный фильтр | Проверить query-параметры |
| `id` не уникален | Дубликаты в db.json | Исправить id вручную |

---

## Полезные ссылки

- JSON Server (GitHub): [github.com/typicode/json-server](https://github.com/typicode/json-server)
- Документация v0.17: [github.com/typicode/json-server/tree/v0.17.4](https://github.com/typicode/json-server/tree/v0.17.4)
- Redux Thunk: [github.com/reduxjs/redux-thunk](https://github.com/reduxjs/redux-thunk)
- Альтернатива в облаке: [supabase.com](https://supabase.com)

---

## Быстрый чеклист

```bash
# 1. Установить
npm install json-server@0.17.4 --save-dev

# 2. Создать db.json в корне проекта

# 3. Добавить скрипт в package.json
# "api": "json-server --watch db.json --port 3001"

# 4. Запустить API
npm run api

# 5. Проверить в браузере
# http://localhost:3001/students

# 6. В React делать fetch на http://localhost:3001
```
