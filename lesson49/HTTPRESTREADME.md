# HTTP / HTTPS, REST API, клиент–сервер, fetch / axios

Материал для занятия: как браузер общается с сервером, что такое REST и как делать HTTP-запросы из React.

> **Одной фразой:** клиент (React) отправляет **HTTP-запрос** на сервер → сервер отвечает **статус-кодом + данными (часто JSON)** → клиент обновляет UI. REST — договорённость, _как_ называть URL и методы. `fetch` / `axios` — инструменты, которыми мы этот запрос отправляем.

---

## Содержание

1. [Клиент–серверная архитектура](#клиентсерверная-архитектура)
2. [Что такое HTTP и HTTPS](#что-такое-http-и-https)
3. [Структура HTTP-запроса и ответа](#структура-http-запроса-и-ответа)
4. [HTTP-методы](#http-методы)
5. [Статус-коды](#статус-коды)
6. [Headers](#headers)
7. [Что такое REST API](#что-такое-rest-api)
8. [CRUD и REST](#crud-и-rest)
9. [URL, query params, path params](#url-query-params-path-params)
10. [JSON как формат данных](#json-как-формат-данных)
11. [CORS — коротко](#cors--коротко)
12. [fetch API](#fetch-api)
13. [axios](#axios)
14. [fetch vs axios](#fetch-vs-axios)
15. [Обработка ошибок](#обработка-ошибок)
16. [Примеры в React](#примеры-в-react)
17. [Связь с Redux Thunk / RTK](#связь-с-redux-thunk--rtk)
18. [Типичные ошибки](#типичные-ошибки)
19. [Чеклист](#чеклист)
20. [Полезные ссылки](#полезные-ссылки)

---

## Клиент–серверная архитектура

### Кто есть кто

| Роль       | Что это                                                         | Пример                                    |
| ---------- | --------------------------------------------------------------- | ----------------------------------------- |
| **Клиент** | Приложение, которое **запрашивает** данные / действия           | Браузер + React, мобильное приложение     |
| **Сервер** | Приложение, которое **хранит** данные и **отвечает** на запросы | Node/Express, json-server, Django, Spring |
| **API**    | Договорённый интерфейс общения (URL + методы + формат)          | `GET /students`, `POST /blogs`            |

```
┌─────────────┐         HTTP/HTTPS          ┌─────────────┐
│   Клиент    │  ──── request (GET/POST) ──▶ │   Сервер    │
│  (React)    │  ◀── response (JSON+status)─ │ (API / DB)  │
└─────────────┘                              └─────────────┘
```

### Почему так

- Клиент **не хранит** всю базу у себя (безопасность, актуальность, размер).
- Сервер — единый источник правды: список блогов, пользователи, заказы.
- Один API могут использовать веб, мобилка, админка.

### Frontend vs Backend

| Frontend (клиент)  | Backend (сервер)           |
| ------------------ | -------------------------- |
| UI, формы, роутинг | Бизнес-логика, БД, auth    |
| React, Vite        | Node, Express, json-server |
| `fetch` / `axios`  | Эндпоинты `/api/...`       |

> В `blog-application` клиент — React + Redux, сервер — например `jsonplaceholder` или `json-server` на `localhost:3001`.

---

## Что такое HTTP и HTTPS

### HTTP

**HTTP** (HyperText Transfer Protocol) — протокол обмена сообщениями между клиентом и сервером.

- Работает поверх TCP/IP.
- Запрос → ответ (request–response).
- По умолчанию порт **80**.

```
http://localhost:3001/students
│      │         │     │
│      │         │     └─ путь (path / resource)
│      │         └─ порт
│      └─ хост
└─ схема (protocol)
```

### HTTPS

**HTTPS** = HTTP + **TLS/SSL** (шифрование).

|                      | HTTP                        | HTTPS                    |
| -------------------- | --------------------------- | ------------------------ |
| Шифрование           | ❌ данные «как есть»        | ✅ зашифрованы           |
| Порт по умолчанию    | 80                          | **443**                  |
| URL                  | `http://...`                | `https://...`            |
| Для продакшена       | ❌ не рекомендуется         | ✅ обязательно           |
| Локальная разработка | ✅ часто `http://localhost` | можно, но не обязательно |

> **Важно:** HTTPS не меняет REST и `fetch` — меняется только безопасность канала. В коде URL просто начинается с `https://`.

### DNS и путь запроса (упрощённо)

```
1. Браузер: «куда идти?» → DNS → IP сервера
2. Устанавливается соединение (для HTTPS — ещё TLS handshake)
3. Отправляется HTTP-запрос
4. Сервер обрабатывает и отдаёт HTTP-ответ
5. Клиент парсит JSON и обновляет UI
```

---

## Структура HTTP-запроса и ответа

### Запрос (Request)

```
GET /students/1 HTTP/1.1
Host: localhost:3001
Accept: application/json
Authorization: Bearer <token>

(тело запроса для GET обычно пустое)
```

Состав:

| Часть          | Пример                          | Зачем                            |
| -------------- | ------------------------------- | -------------------------------- |
| **Метод**      | `GET`, `POST`                   | Что сделать                      |
| **URL / path** | `/students/1`                   | К какому ресурсу                 |
| **Headers**    | `Content-Type`, `Authorization` | Метаданные                       |
| **Body**       | `{ "name": "Ivan" }`            | Данные (обычно у POST/PUT/PATCH) |

### Ответ (Response)

```
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 1,
  "name": "Ivan"
}
```

| Часть           | Пример                           | Зачем           |
| --------------- | -------------------------------- | --------------- |
| **Status code** | `200`, `404`, `500`              | Успех / ошибка  |
| **Headers**     | `Content-Type: application/json` | Формат тела     |
| **Body**        | JSON-объект / массив             | Полезные данные |

---

## HTTP-методы

| Метод      | Смысл             | Есть body? | Идемпотентный?\* | Типичный CRUD          |
| ---------- | ----------------- | ---------- | ---------------- | ---------------------- |
| **GET**    | Прочитать         | Обычно нет | ✅               | Read                   |
| **POST**   | Создать           | Да         | ❌               | Create                 |
| **PUT**    | Заменить целиком  | Да         | ✅               | Update (полная замена) |
| **PATCH**  | Изменить частично | Да         | ⚠️               | Update (часть полей)   |
| **DELETE** | Удалить           | Редко      | ✅               | Delete                 |

\* _Идемпотентный_ — повтор того же запроса даёт тот же результат (два `DELETE /1` — ресурс и так удалён).

### PUT vs PATCH

```ts
// PUT — отправляем весь объект
PUT /students/1
{ "id": 1, "name": "Ivan", "email": "ivan@mail.ru", "group": "FE76" }

// PATCH — только то, что меняем
PATCH /students/1
{ "email": "new@mail.ru" }
```

### Безопасные методы

**GET** считается _safe_ — не должен менять данные на сервере. Не делайте `GET /students/delete/1` — это антипаттерн REST.

---

## Статус-коды

Группы:

| Диапазон | Смысл                                  |
| -------- | -------------------------------------- |
| **1xx**  | Информационные (редко нужны на фронте) |
| **2xx**  | Успех                                  |
| **3xx**  | Редирект                               |
| **4xx**  | Ошибка клиента (неправильный запрос)   |
| **5xx**  | Ошибка сервера                         |

### Часто используемые

| Код           | Название                  | Когда                                |
| ------------- | ------------------------- | ------------------------------------ |
| **200**       | OK                        | Успешный GET / PUT / PATCH / DELETE  |
| **201**       | Created                   | Успешный POST (ресурс создан)        |
| **204**       | No Content                | Успех без тела (часто DELETE)        |
| **400**       | Bad Request               | Невалидные данные                    |
| **401**       | Unauthorized              | Нет / неверный токен                 |
| **403**       | Forbidden                 | Токен есть, но прав нет              |
| **404**       | Not Found                 | Ресурс не найден                     |
| **409**       | Conflict                  | Конфликт (например, email уже занят) |
| **422**       | Unprocessable Entity      | Ошибка валидации                     |
| **429**       | Too Many Requests         | Rate limit                           |
| **500**       | Internal Server Error     | Упало на сервере                     |
| **502 / 503** | Bad Gateway / Unavailable | Сервер недоступен                    |

> **Важно для fetch:** `fetch` **не бросает ошибку** на `404` / `500`. Ошибка сети — да, HTTP-ошибка — нужно проверять `response.ok` / `response.status` самим.

---

## Headers

Частые заголовки:

| Header          | Кто шлёт        | Зачем                            |
| --------------- | --------------- | -------------------------------- |
| `Content-Type`  | клиент / сервер | Формат тела (`application/json`) |
| `Accept`        | клиент          | Какой формат хотим получить      |
| `Authorization` | клиент          | Токен: `Bearer eyJhbGci...`      |
| `Cache-Control` | сервер / клиент | Кэширование                      |
| `CORS` headers  | сервер          | Разрешить кросс-доменные запросы |

Пример с JSON:

```ts
headers: {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
}
```

---

## Что такое REST API

**REST** (Representational State Transfer) — стиль проектирования API вокруг **ресурсов** (сущностей), а не «процедур».

Идея:

- У каждого ресурса есть URL: `/students`, `/students/1`, `/blogs/5/comments`
- Действие задаётся **HTTP-методом**, а не словом в URL
- Ответ — представление ресурса (часто JSON)

### REST-стиль vs «не REST»

```
✅ Хорошо (REST):
GET    /students
GET    /students/1
POST   /students
PATCH  /students/1
DELETE /students/1

❌ Плохо (RPC-стиль в URL):
GET /getAllStudents
GET /getStudentById?id=1
POST /createStudent
POST /deleteStudent
```

### Примеры запросов

```http
GET /students HTTP/1.1
Host: localhost:3001
Accept: application/json
```

```http
GET /students/1 HTTP/1.1
Host: localhost:3001
Accept: application/json
```

```http
GET /students?group=FE&_page=1&_limit=10 HTTP/1.1
Host: localhost:3001
Accept: application/json
```

```http
POST /students HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{
  "name": "Anna",
  "group": "FE76"
}
```

```http
PUT /students/1 HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{
  "id": 1,
  "name": "Anna",
  "group": "FE76"
}
```

```http
PATCH /students/1 HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{
  "group": "FE77"
}
```

```http
DELETE /students/1 HTTP/1.1
Host: localhost:3001
Authorization: Bearer eyJhbGci...
```

```http
GET /blogs/5/comments HTTP/1.1
Host: localhost:3001
Accept: application/json
```

```http
POST /blogs/5/comments HTTP/1.1
Host: localhost:3001
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{
  "text": "Nice post",
  "authorId": 3
}
```

### Принципы (практический минимум)

| Принцип          | На практике                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Ресурсы          | URL = существительные во мн. числе (`/blogs`)                                                  |
| Stateless        | Сервер не хранит «сессию запроса» на клиенте; каждый запрос самодостаточен (часто через токен) |
| Единый интерфейс | Одинаковые методы и статус-коды                                                                |
| JSON             | Стандартный формат тела                                                                        |

> REST — не библиотека и не протокол. Это **соглашения**. HTTP — транспорт.

---

## CRUD и REST

| CRUD       | HTTP                         | Пример        |
| ---------- | ---------------------------- | ------------- |
| **C**reate | `POST /blogs`                | Создать пост  |
| **R**ead   | `GET /blogs`, `GET /blogs/1` | Список / один |
| **U**pdate | `PUT` / `PATCH /blogs/1`     | Изменить      |
| **D**elete | `DELETE /blogs/1`            | Удалить       |

То же самое в json-server (см. [lesson47/JSONSERVERREADME.md](../lesson47/JSONSERVERREADME.md)):

```
GET    http://localhost:3001/students
POST   http://localhost:3001/students
PUT    http://localhost:3001/students/1
PATCH  http://localhost:3001/students/1
DELETE http://localhost:3001/students/1
```

---

## URL, query params, path params

### Path params

Часть пути — идентификатор ресурса:

```
GET /students/42
            └─ path param: id = 42
```

### Query params

Фильтры, пагинация, поиск — после `?`:

```
GET /students?group=FE76&_sort=name&_order=asc&_page=1&_limit=10
              │           │
              │           └─ query string
              └─ ?
```

В коде:

```ts
const params = new URLSearchParams({
  group: "FE76",
  _page: "1",
  _limit: "10",
});

const url = `http://localhost:3001/students?${params.toString()}`;
```

| Тип   | Где             | Пример               |
| ----- | --------------- | -------------------- |
| Path  | `/resource/:id` | `/blogs/5`           |
| Query | `?key=value`    | `/blogs?author=Ivan` |

---

## JSON как формат данных

**JSON** (JavaScript Object Notation) — текстовый формат обмена данными.

```json
{
  "id": 1,
  "title": "Hello",
  "published": true,
  "tags": ["react", "redux"]
}
```

В JS:

```ts
const data = await response.json(); // строка JSON → объект
const body = JSON.stringify({ title: "Hello" }); // объект → строка для body
```

|                        |                         |
| ---------------------- | ----------------------- |
| На проводе             | текст                   |
| В коде после `.json()` | обычный объект / массив |
| `Content-Type`         | `application/json`      |

---

## CORS — коротко

**CORS** (Cross-Origin Resource Sharing) — политика браузера: страница с `http://localhost:5173` **не может** свободно ходить на `http://localhost:3001`, пока сервер не разрешит.

```
Origin клиента:  http://localhost:5173   (Vite)
API сервера:     http://localhost:3001   (json-server)
→ разные origin → нужен CORS на сервере
```

Что видит фронтендер:

```
Access to fetch at 'http://localhost:3001/students' from origin 'http://localhost:5173'
has been blocked by CORS policy
```

Решения:

| Решение                       | Когда                                 |
| ----------------------------- | ------------------------------------- |
| Настроить CORS на сервере     | Настоящий backend                     |
| Proxy в Vite (`server.proxy`) | Локальная разработка                  |
| json-server                   | Обычно CORS уже ок для простых кейсов |

> CORS — **ограничение браузера**, не «баг fetch». Postman / curl CORS не блокируют.

---

## fetch API

**`fetch`** — встроенный в браузер API для HTTP-запросов. Ничего устанавливать не нужно.

Возвращает **Promise&lt;Response&gt;**.

### GET

```ts
const response = await fetch("https://jsonplaceholder.typicode.com/posts");

if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

const data = await response.json();
```

Как в `blog-application`:

```ts
const response = await fetch("https://jsonplaceholder.typicode.com/posts");
const data = await response.json();
```

### POST

```ts
const response = await fetch("http://localhost:3001/students", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Ivan",
    email: "ivan@mail.ru",
  }),
});

if (!response.ok) {
  throw new Error("Не удалось создать студента");
}

const created = await response.json(); // часто с id от сервера
```

### PUT / PATCH

```ts
await fetch(`http://localhost:3001/students/${id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "new@mail.ru" }),
});
```

### DELETE

```ts
const response = await fetch(`http://localhost:3001/students/${id}`, {
  method: "DELETE",
});

if (!response.ok) {
  throw new Error("Не удалось удалить");
}
```

### Разбор Response

| Свойство / метод   | Что даёт                    |
| ------------------ | --------------------------- |
| `response.ok`      | `true` при статусе 200–299  |
| `response.status`  | Число: `200`, `404`, `500`  |
| `response.json()`  | Promise с распарсенным JSON |
| `response.text()`  | Promise со строкой          |
| `response.headers` | Заголовки ответа            |

### AbortController — отмена запроса

```ts
const controller = new AbortController();

fetch(url, { signal: controller.signal });

// отмена (например, при unmount)
controller.abort();
```

---

## axios

**axios** — популярная HTTP-библиотека поверх Promise. Нужна установка:

```bash
npm install axios
```

### GET

```ts
import axios from "axios";

const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts");
```

### POST

```ts
const { data } = await axios.post("http://localhost:3001/students", {
  name: "Ivan",
  email: "ivan@mail.ru",
});
```

Тело — **объект**: axios сам делает `JSON.stringify` и ставит `Content-Type`.

### PUT / PATCH / DELETE

```ts
await axios.put(`/students/${id}`, student);
await axios.patch(`/students/${id}`, { email: "new@mail.ru" });
await axios.delete(`/students/${id}`);
```

### Instance — базовый URL и headers

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// использование
const { data } = await api.get("/students");
await api.post("/students", { name: "Ivan" });
```

### Interceptors — токен и ошибки централизованно

```ts
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // например, разлогинить
    }
    return Promise.reject(error);
  },
);
```

### Query params в axios

```ts
await api.get("/students", {
  params: { group: "FE76", _page: 1, _limit: 10 },
});
// → /students?group=FE76&_page=1&_limit=10
```

---

## fetch vs axios

| Аспект            | fetch                       | axios                       |
| ----------------- | --------------------------- | --------------------------- |
| Установка         | Встроен                     | `npm i axios`               |
| Размер бандла     | 0                           | ~маленький пакет            |
| Авто-JSON body    | ❌ `JSON.stringify` вручную | ✅ объект → JSON            |
| Авто-парсинг      | ❌ `await response.json()`  | ✅ `response.data`          |
| Ошибка на 404/500 | ❌ не reject                | ✅ reject (исключение)      |
| Timeout           | вручную / AbortController   | `timeout: 5000`             |
| Interceptors      | нет из коробки              | ✅ request/response         |
| Upload progress   | сложнее                     | проще                       |
| Для учёбы         | ✅ достаточно               | ✅ удобнее на росте проекта |

### Когда что

| Ситуация                                 | Выбор                             |
| ---------------------------------------- | --------------------------------- |
| Учебный проект, диплом, простой CRUD     | **fetch** — достаточно            |
| Много эндпоинтов, токены, единый baseURL | **axios** (или обёртка над fetch) |
| Хочется минимум зависимостей             | **fetch**                         |
| Уже есть axios в команде                 | **axios**                         |

> Оба делают одно и то же: HTTP-запрос. Разница — в удобстве API и обработке ошибок.

---

## Обработка ошибок

### fetch — правильный паттерн

```ts
async function fetchStudents() {
  try {
    const response = await fetch("http://localhost:3001/students");

    // 1) HTTP-ошибки — сами
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}`);
    }

    // 2) Парсинг
    return await response.json();
  } catch (error) {
    // сеть / abort / наш throw
    console.error(error);
    throw error;
  }
}
```

### axios — ошибки из коробки

```ts
try {
  const { data } = await api.get("/students");
  return data;
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error(error.response?.status); // 404, 500...
    console.error(error.response?.data);
  }
  throw error;
}
```

### Состояния на UI

| Состояние       | UI                  |
| --------------- | ------------------- |
| `loading: true` | спиннер / skeleton  |
| `error: string` | сообщение об ошибке |
| `data`          | список / карточка   |

В Redux это обычно три action: `STARTED` / `SUCCESS` / `ERROR` или `pending` / `fulfilled` / `rejected` в RTK.

---

## Примеры в React

### useEffect + fetch

```tsx
import { useEffect, useState } from "react";

type Student = { id: number; name: string };

export const StudentList = () => {
  const [list, setList] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3001/students");
        if (!response.ok) throw new Error("Не удалось загрузить");
        const data: Student[] = await response.json();
        setList(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {list.map((s) => (
        <li key={s.id}>{s.name}</li>
      ))}
    </ul>
  );
};
```

### Создание через форму

```tsx
const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  const response = await fetch("http://localhost:3001/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    setError("Ошибка создания");
    return;
  }

  const created = await response.json();
  setList((prev) => [...prev, created]);
};
```

### Тот же запрос через axios

```ts
const { data } = await api.post<Student>("/students", { name, email });
setList((prev) => [...prev, data]);
```

---

## Связь с Redux Thunk / RTK

HTTP-слой не зависит от Redux — Redux только решает, **куда положить** результат.

### Базовый Redux + thunk (как в blog-application)

```ts
export const fetchBlogList = () => async (dispatch) => {
  dispatch(fetchBlogListStarted());

  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  dispatch(updateBlogList(data));
  dispatch(fetchBlogListFinished());
};
```

См. [lesson47/REDUXTHUNKREADME.md](../lesson47/REDUXTHUNKREADME.md).

### Redux Toolkit + createAsyncThunk

```ts
export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const response = await fetch("http://localhost:3001/students");
  if (!response.ok) throw new Error("Ошибка загрузки");
  return response.json();
});
```

См. [lesson48/REDUXTOOLKITREADME.md](../lesson48/REDUXTOOLKITREADME.md).

### Рекомендуемая структура

```
src/
  api/
    studentsApi.ts    ← чистые fetch/axios функции
  store/
    slices/
      studentsSlice.ts ← thunk вызывает api.*
  pages/
    StudentList.tsx   ← dispatch / useSelector
```

```ts
// api/studentsApi.ts
export const getStudents = async (): Promise<Student[]> => {
  const response = await fetch("http://localhost:3001/students");
  if (!response.ok) throw new Error("Ошибка загрузки");
  return response.json();
};

// slice
export const fetchStudents = createAsyncThunk("students/fetchAll", () =>
  getStudents(),
);
```

Так HTTP не размазан по компонентам и thunk'ам.

---

## Типичные ошибки

### 1. Забыли `await response.json()`

```ts
// ❌ data — Response, не массив
const data = await fetch(url);

// ✅
const response = await fetch(url);
const data = await response.json();
```

### 2. Не проверили `response.ok`

```ts
// ❌ при 404 код «успешно» парсит HTML/JSON ошибки
const data = await response.json();

// ✅
if (!response.ok) throw new Error(`HTTP ${response.status}`);
```

### 3. POST без `Content-Type` и stringify

```ts
// ❌ сервер не поймёт объект
body: { name: 'Ivan' }

// ✅
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ name: 'Ivan' }),
```

### 4. Путать GET и POST

```ts
// ❌ менять данные через GET
fetch("/students/delete/1");

// ✅
fetch("/students/1", { method: "DELETE" });
```

### 5. Жёстко прошитый URL без base

```ts
// ⚠️ сложно менять окружение
fetch("http://localhost:3001/students");

// ✅ константа / env
const API_URL = import.meta.env.VITE_API_URL;
fetch(`${API_URL}/students`);
```

### 6. Игнорировать CORS

Ошибка CORS лечится на **сервере** или через **proxy**, а не «ещё одним fetch».

### 7. HTTP на продакшене

Локально `http://localhost` — ок. Публичный сайт — только **HTTPS**.

---

## Чеклист

```bash
# 1. Понять клиент → HTTP → сервер → JSON → UI

# 2. Знать методы: GET POST PUT PATCH DELETE

# 3. Знать коды: 200 201 400 401 403 404 500

# 4. REST: /students, /students/1 — существительные + метод

# 5. fetch:
#    - method, headers, body
#    - response.ok
#    - response.json()

# 6. axios (опционально):
#    npm i axios
#    api = axios.create({ baseURL })

# 7. Ошибки + loading на UI

# 8. Для Redux: вынести fetch в thunk / createAsyncThunk
# 9. Для учёбы: json-server = локальный REST API
```

### Мини-шпаргалка fetch

```ts
// READ
const r = await fetch(`${API}/items`);
if (!r.ok) throw new Error(String(r.status));
const list = await r.json();

// CREATE
const r = await fetch(`${API}/items`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

// UPDATE
await fetch(`${API}/items/${id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(patch),
});

// DELETE
await fetch(`${API}/items/${id}`, { method: "DELETE" });
```

---

## Полезные ссылки

| Ресурс                   | Ссылка                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| MDN — HTTP               | [developer.mozilla.org/en-US/docs/Web/HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)                                              |
| MDN — fetch              | [developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)                            |
| MDN — CORS               | [developer.mozilla.org/en-US/docs/Web/HTTP/CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)                                    |
| HTTP status codes        | [httpstatuses.com](https://httpstatuses.com) / [developer.mozilla.org/.../Status](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) |
| axios docs               | [axios-http.com](https://axios-http.com/)                                                                                                   |
| JSONPlaceholder          | [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/)                                                                       |
| json-server (наш гайд)   | [../lesson47/JSONSERVERREADME.md](../lesson47/JSONSERVERREADME.md)                                                                          |
| Redux Thunk (наш гайд)   | [../lesson47/REDUXTHUNKREADME.md](../lesson47/REDUXTHUNKREADME.md)                                                                          |
| Redux Toolkit (наш гайд) | [../lesson48/REDUXTOOLKITREADME.md](../lesson48/REDUXTOOLKITREADME.md)                                                                      |

---

## Итог

| Тема          | Главная мысль                                            |
| ------------- | -------------------------------------------------------- |
| Клиент–сервер | React спрашивает, API отвечает                           |
| HTTP / HTTPS  | Протокол запрос–ответ; HTTPS = шифрование                |
| REST          | Ресурсы в URL + методы HTTP + JSON                       |
| Статус-коды   | 2xx успех, 4xx клиент, 5xx сервер                        |
| fetch         | Встроен, проверяй `ok`, парси `.json()`                  |
| axios         | Удобнее на масштабе: instance, interceptors, авто-ошибки |
| Redux         | Хранит результат запроса; сам HTTP — в api/thunk         |
