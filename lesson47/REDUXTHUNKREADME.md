# Redux Thunk — гайд по подключению и использованию

Материал для занятия: как добавить асинхронную логику (fetch, API) в классический Redux через middleware `redux-thunk`.

> **Reducer не делает `fetch`.** Для запросов к API используем thunk — функцию, которая внутри себя вызывает `dispatch` обычных actions.

---

## Содержание

1. [Зачем нужен redux-thunk](#зачем-нужен-redux-thunk)
2. [Что такое middleware](#что-такое-middleware)
3. [Что такое thunk](#что-такое-thunk)
4. [Установка](#установка)
5. [Подключение к store](#подключение-к-store)
6. [Как работает thunk — пошагово](#как-работает-thunk--пошагово)
7. [Структура файлов](#структура-файлов)
8. [Написание thunk action](#написание-thunk-action)
9. [Reducer для async-состояния](#reducer-для-async-состояния)
10. [Использование в компоненте](#использование-в-компоненте)
11. [Thunk + json-server](#thunk--json-server)
12. [getState и несколько dispatch](#getstate-и-несколько-dispatch)
13. [Типизация в TypeScript](#типизация-в-typescript)
14. [Типичные ошибки](#типичные-ошибки)
15. [redux-thunk vs createAsyncThunk](#redux-thunk-vs-createasyncthunk)
16. [Полезные ссылки](#полезные-ссылки)

---

## Зачем нужен redux-thunk

### Проблема

В Redux **reducer — чистая синхронная функция**. Он не может:

```ts
// ❌ Так делать нельзя
function studentsReducer(state, action) {
  fetch('/students').then(...);  // side effect в reducer
  return state;
}
```

Reducer должен только: `(state, action) => newState`. Без `fetch`, без `setTimeout`, без `localStorage`.

### Решение

Асинхронную логику выносим в **thunk** — отдельную функцию между компонентом и reducer:

```
Компонент
    │ dispatch(fetchStudents())
    ▼
redux-thunk (middleware)
    │ вызывает async-функцию
    ▼
fetch → dispatch(START) → dispatch(SUCCESS/ERROR)
    ▼
Reducer обновляет state
    ▼
useSelector → UI
```

---

## Что такое middleware

**Middleware** — прослойка между `dispatch(action)` и reducer. Перехватывает action до того, как он дойдёт до reducer.

```
dispatch(action)
    │
    ▼
┌─────────────┐
│ middleware  │  ← redux-thunk живёт здесь
└─────────────┘
    │
    ▼
reducer → new state
```

`redux-thunk` проверяет: если в `dispatch` пришла **функция** (а не объект `{ type }`), он её выполняет. Если объект — пропускает дальше к reducer.

---

## Что такое thunk

**Thunk** — функция, которая возвращает другую функцию.

### Обычный action

```ts
// объект — сразу идёт в reducer
dispatch({ type: 'students/FETCH_SUCCESS', payload: [...] });
```

### Thunk action

```ts
// функция — перехватывается middleware
dispatch(fetchStudents);
```

```ts
// fetchStudents — это функция, возвращающая функцию
export const fetchStudents = () => {
  return async (dispatch) => {
    dispatch({ type: "students/FETCH_START" });

    const response = await fetch("http://localhost:3001/students");
    const data = await response.json();

    dispatch({ type: "students/FETCH_SUCCESS", payload: data });
  };
};
```

Сокращённая запись (то же самое):

```ts
export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: "students/FETCH_START" });
  const response = await fetch("http://localhost:3001/students");
  const data = await response.json();
  dispatch({ type: "students/FETCH_SUCCESS", payload: data });
};
```

---

## Установка

```bash
npm install redux-thunk
```

| Пакет         | Версия | Зачем            |
| ------------- | ------ | ---------------- |
| `redux`       | ^5.x   | store, reducer   |
| `react-redux` | ^9.x   | Provider, хуки   |
| `redux-thunk` | ^3.x   | async middleware |

> В **Redux Toolkit** `redux-thunk` уже внутри `configureStore`. Отдельно ставить не нужно.

---

## Подключение к store

### Без thunk (сейчас в test-redux)

```ts
// store/index.ts
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
});

const store = createStore(rootReducer); // ❌ только синхронные actions
```

### С thunk

```ts
// store/index.ts
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

import { counterReducer } from "./reducers/counterReducer";
import { usersReducer } from "./reducers/usersReducer";
import { studentsReducer } from "./reducers/studentsReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  students: studentsReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk), // ← подключаем middleware
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
```

### Что делает applyMiddleware(thunk)

1. Оборачивает `store.dispatch`
2. Если `dispatch` получает **объект** `{ type: '...' }` → передаёт в reducer
3. Если `dispatch` получает **функцию** → вызывает её с `(dispatch, getState)`

### Несколько middleware

```ts
import { thunk } from "redux-thunk";
import logger from "redux-logger";

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
```

Порядок важен: `thunk` обычно первый.

---

## Как работает thunk — пошагово

```tsx
// 1. Компонент вызывает
dispatch(fetchStudents());
```

```ts
// 2. fetchStudents() возвращает функцию:
async (dispatch) => { ... }
```

```ts
// 3. redux-thunk видит, что dispatch получил функцию, и вызывает:
fetchStudents()(dispatch, getState);
```

```ts
// 4. Внутри thunk:
dispatch({ type: "students/FETCH_START" }); // → reducer: loading = true

const data = await fetch("/students").then((r) => r.json());

dispatch({ type: "students/FETCH_SUCCESS", payload: data }); // → reducer: list = data
```

```tsx
// 5. useSelector подхватывает новый state
const { list, loading } = useSelector((state) => state.students);
```

### Схема

```
dispatch(fetchStudents())
        │
        ▼
   это функция?
   ├── да → thunk middleware выполняет её
   │         │
   │         ├── dispatch(FETCH_START)  → reducer
   │         ├── await fetch(...)       → API
   │         └── dispatch(FETCH_SUCCESS) → reducer
   │
   └── нет → сразу в reducer
```

---

## Структура файлов

После добавления thunk структура `store/`:

```
store/
├── actions/
│   ├── counterActions.ts      ← синхронные actions
│   ├── studentsActions.ts     ← синхронные + thunk actions
│   └── index.ts               ← AppAction union
├── reducers/
│   ├── counterReducer.ts
│   ├── studentsReducer.ts     ← обрабатывает FETCH_START/SUCCESS/ERROR
│   └── index.ts
├── hooks.ts
└── index.ts                   ← createStore + applyMiddleware(thunk)
```

### Разделение ответственности

| Файл                           | Что делает                                       |
| ------------------------------ | ------------------------------------------------ |
| `studentsActions.ts`           | action types, sync creators, **thunk functions** |
| `studentsReducer.ts`           | только `(state, action) => newState`             |
| `studentsApi.ts` (опционально) | чистые `fetch`-функции без Redux                 |

---

## Написание thunk action

### Паттерн: START → SUCCESS / ERROR

Для каждого async-запроса — **три action type**:

```ts
// store/actions/studentsActions.ts

export const FETCH_STUDENTS_START = "students/FETCH_START" as const;
export const FETCH_STUDENTS_SUCCESS = "students/FETCH_SUCCESS" as const;
export const FETCH_STUDENTS_ERROR = "students/FETCH_ERROR" as const;

const API_URL = "http://localhost:3001";

// Thunk — загрузка списка
export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_START });

  try {
    const response = await fetch(`${API_URL}/students`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_ERROR,
      payload: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
```

### Thunk с параметрами

```ts
export const fetchStudentById = (id: number) => async (dispatch) => {
  dispatch({ type: FETCH_STUDENT_START });

  try {
    const response = await fetch(`${API_URL}/students/${id}`);
    const data = await response.json();
    dispatch({ type: FETCH_STUDENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_STUDENT_ERROR, payload: error.message });
  }
};

// Использование
dispatch(fetchStudentById(5));
```

### Thunk для POST (создание)

```ts
export const CREATE_STUDENT = "students/CREATE_SUCCESS" as const;

export const createStudent =
  (student: { name: string; balance: number }) => async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const newStudent = await response.json();
      dispatch({ type: CREATE_STUDENT, payload: newStudent });
    } catch (error) {
      dispatch({ type: FETCH_STUDENTS_ERROR, payload: error.message });
    }
  };
```

### Thunk для PATCH (обновление)

```ts
export const UPDATE_STUDENT = "students/UPDATE_SUCCESS" as const;

export const updateStudent =
  (id: number, changes: Partial<Student>) => async (dispatch) => {
    const response = await fetch(`${API_URL}/students/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });

    const updated = await response.json();
    dispatch({ type: UPDATE_STUDENT, payload: updated });
  };
```

### Thunk для DELETE

```ts
export const DELETE_STUDENT = "students/DELETE_SUCCESS" as const;

export const deleteStudent = (id: number) => async (dispatch) => {
  await fetch(`${API_URL}/students/${id}`, { method: "DELETE" });
  dispatch({ type: DELETE_STUDENT, payload: id });
};
```

---

## Reducer для async-состояния

Thunk dispatch'ит обычные actions — reducer обрабатывает их как всегда.

```ts
// store/reducers/studentsReducer.ts
import {
  FETCH_STUDENTS_START,
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_ERROR,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  DELETE_STUDENT,
} from "../actions/studentsActions";

import type { Student } from "../../types/student";

type StudentsState = {
  list: Student[];
  loading: boolean;
  error: string | null;
};

const initialState: StudentsState = {
  list: [],
  loading: false,
  error: null,
};

export const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_START:
      return { ...state, loading: true, error: null };

    case FETCH_STUDENTS_SUCCESS:
      return { ...state, loading: false, list: action.payload };

    case FETCH_STUDENTS_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CREATE_STUDENT:
      return { ...state, list: [...state.list, action.payload] };

    case UPDATE_STUDENT:
      return {
        ...state,
        list: state.list.map((s) =>
          s.id === action.payload.id ? action.payload : s,
        ),
      };

    case DELETE_STUDENT:
      return {
        ...state,
        list: state.list.filter((s) => s.id !== action.payload),
      };

    default:
      return state;
  }
};
```

### Три состояния UI

| State           | Что показываем          |
| --------------- | ----------------------- |
| `loading: true` | Спиннер / «Загрузка...» |
| `error: '...'`  | Сообщение об ошибке     |
| `list: [...]`   | Данные                  |

---

## Использование в компоненте

```tsx
// components/student-list/student-list.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchStudents } from "../../store/actions/studentsActions";

export const StudentList = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <ul>
      {list.map((student) => (
        <li key={student.id}>
          {student.name} — баланс: {student.balance}
        </li>
      ))}
    </ul>
  );
};
```

### Создание через форму

```tsx
import { createStudent } from "../../store/actions/studentsActions";

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  dispatch(createStudent({ name, balance: 0 }));
};
```

### Повторная загрузка (кнопка Refresh)

```tsx
<button onClick={() => dispatch(fetchStudents())}>Обновить</button>
```

---

## Thunk + json-server

Полный пример связки из [JSONSERVERREADME.md](./JSONSERVERREADME.md):

### 1. Запустить API

```bash
npm run api
# json-server --watch db.json --port 3001
```

### 2. db.json

```json
{
  "students": [
    { "id": 1, "name": "Анна", "balance": 500 },
    { "id": 2, "name": "Пётр", "balance": 1200 }
  ]
}
```

### 3. Thunk

```ts
export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_START });

  const response = await fetch("http://localhost:3001/students");
  const data = await response.json();

  dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: data });
};
```

### 4. Dispatch в компоненте

```tsx
useEffect(() => {
  dispatch(fetchStudents());
}, [dispatch]);
```

### Два терминала

```bash
# Терминал 1 — API
npm run api

# Терминал 2 — React
npm run dev
```

---

## getState и несколько dispatch

Thunk получает не только `dispatch`, но и `getState`:

```ts
export const createLessonWithPayment =
  (lesson: NewLesson) => async (dispatch, getState) => {
    const { students } = getState();
    const student = students.list.find((s) => s.id === lesson.studentId);

    if (!student || student.balance < lesson.price) {
      dispatch({
        type: "lessons/CREATE_ERROR",
        payload: "Недостаточно средств",
      });
      return;
    }

    // 1. Создать урок
    const lessonResponse = await fetch(`${API_URL}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lesson),
    });
    const newLesson = await lessonResponse.json();
    dispatch({ type: "lessons/CREATE_SUCCESS", payload: newLesson });

    // 2. Списать баланс
    await fetch(`${API_URL}/students/${student.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ balance: student.balance - lesson.price }),
    });
    dispatch({
      type: "students/UPDATE_BALANCE",
      payload: { id: student.id, balance: student.balance - lesson.price },
    });

    // 3. Записать транзакцию
    const txResponse = await fetch(`${API_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: student.id,
        amount: -lesson.price,
        type: "lesson",
        lessonId: newLesson.id,
      }),
    });
    const transaction = await txResponse.json();
    dispatch({ type: "transactions/CREATE_SUCCESS", payload: transaction });
  };
```

`getState()` даёт доступ к текущему store **до** dispatch — удобно для проверок и бизнес-логики.

---

## Типизация в TypeScript

Подробный гайд — в [REDUXTYPINGREADME.md](./REDUXTYPINGREADME.md). Кратко:

### AppThunk

```ts
import type { ThunkAction } from "redux-thunk";
import type { RootState } from "../index";
import type { AppAction } from "./index";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, // что возвращает thunk
  RootState, // тип state
  unknown, // extra argument (не используем)
  AppAction // допустимые actions
>;
```

### Типизированный thunk

```ts
export const fetchStudents = (): AppThunk => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_START });
  // ...
};
```

### Типизированный dispatch

```ts
// store/hooks.ts
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
```

Без этого `dispatch(fetchStudents())` может ругаться TypeScript.

---

## Типичные ошибки

### 1. Забыли applyMiddleware(thunk)

```ts
// ❌ dispatch(fetchStudents()) — ничего не произойдёт
const store = createStore(rootReducer);

// ✅
const store = createStore(rootReducer, applyMiddleware(thunk));
```

**Симптом:** thunk вызывается, но fetch не выполняется, state не меняется.

### 2. Вызвали thunk без dispatch

```tsx
// ❌
fetchStudents();

// ✅
dispatch(fetchStudents());
```

### 3. Двойные скобки

```tsx
// ❌ вызывает thunk сразу при рендере
<button onClick={dispatch(fetchStudents())}>

// ✅ передаёт функцию в onClick
<button onClick={() => dispatch(fetchStudents())}>
```

### 4. fetch в reducer

```ts
// ❌ side effect в reducer
case 'FETCH':
  fetch('/students').then(...);

// ✅ fetch только в thunk
```

### 5. Нет обработки ошибок

```ts
// ❌
const data = await fetch("/students").then((r) => r.json());
dispatch({ type: SUCCESS, payload: data });

// ✅
try {
  const response = await fetch("/students");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  dispatch({ type: SUCCESS, payload: data });
} catch (error) {
  dispatch({ type: ERROR, payload: error.message });
}
```

### 6. API не запущен

```
Failed to fetch
```

Решение: `npm run api` в отдельном терминале.

### 7. Не добавили action types в AppAction

После добавления `FETCH_STUDENTS_*` — обновить union type, иначе TypeScript не примет dispatch в reducer.

---

## redux-thunk vs createAsyncThunk

| Аспект          | redux-thunk (базовый)               | createAsyncThunk (RTK)                           |
| --------------- | ----------------------------------- | ------------------------------------------------ |
| Установка       | `redux-thunk` + `applyMiddleware`   | встроен в `@reduxjs/toolkit`                     |
| Action types    | пишем вручную (START/SUCCESS/ERROR) | генерирует `/pending`, `/fulfilled`, `/rejected` |
| Reducer         | 3 case в switch                     | `extraReducers` + `builder.addCase`              |
| Понимание основ | ✅ видно каждый шаг                 | абстракция                                       |
| Объём кода      | больше                              | меньше                                           |

Подробнее про RTK: [REDUXTOOLKITREADME.md](./REDUXTOOLKITREADME.md).

### Когда использовать redux-thunk напрямую

- учебный проект на **базовом Redux** (lesson46)
- нужно понять, как async работает «под капотом»
- диплом с критерием «Redux / thunk»

### Когда переходить на createAsyncThunk

- новый проект с Redux Toolkit
- много API-запросов — меньше boilerplate

---

## Чеклист подключения

```
□ npm install redux-thunk
□ import { thunk } from 'redux-thunk'
□ import { applyMiddleware } from 'redux'
□ createStore(rootReducer, applyMiddleware(thunk))
□ Создать thunk: () => async (dispatch) => { ... }
□ Три action type: START, SUCCESS, ERROR
□ Reducer обрабатывает loading / error / data
□ dispatch(fetchX()) в useEffect или обработчике
□ API запущен (json-server / Supabase)
□ Типизировать AppThunk (TypeScript)
```

---

## Полный минимальный пример

### store/index.ts

```ts
import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { studentsReducer } from "./reducers/studentsReducer";

const rootReducer = combineReducers({ students: studentsReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
```

### store/actions/studentsActions.ts

```ts
export const FETCH_START = "students/FETCH_START";
export const FETCH_SUCCESS = "students/FETCH_SUCCESS";
export const FETCH_ERROR = "students/FETCH_ERROR";

export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_START });
  try {
    const res = await fetch("http://localhost:3001/students");
    const data = await res.json();
    dispatch({ type: FETCH_SUCCESS, payload: data });
  } catch (e) {
    dispatch({ type: FETCH_ERROR, payload: e.message });
  }
};
```

### store/reducers/studentsReducer.ts

```ts
export const studentsReducer = (
  state = { list: [], loading: false, error: null },
  action,
) => {
  switch (action.type) {
    case "students/FETCH_START":
      return { ...state, loading: true, error: null };
    case "students/FETCH_SUCCESS":
      return { ...state, loading: false, list: action.payload };
    case "students/FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

### main.tsx

```tsx
import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}>
  <App />
</Provider>;
```

### StudentList.tsx

```tsx
useEffect(() => {
  dispatch(fetchStudents());
}, [dispatch]);
```

---

## Полезные ссылки

| Ресурс               | Ссылка                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| redux-thunk (GitHub) | [github.com/reduxjs/redux-thunk](https://github.com/reduxjs/redux-thunk)                                                 |
| Redux: Async Logic   | [redux.js.org/tutorials/fundamentals/part-6-async-logic](https://redux.js.org/tutorials/fundamentals/part-6-async-logic) |
| Базовый Redux        | [lesson45/REDUXREADME.md](../lesson45/REDUXREADME.md)                                                                    |
| Типизация thunk      | [REDUXTYPINGREADME.md](./REDUXTYPINGREADME.md)                                                                           |
| Redux Toolkit        | [REDUXTOOLKITREADME.md](./REDUXTOOLKITREADME.md)                                                                         |
| json-server          | [JSONSERVERREADME.md](./JSONSERVERREADME.md)                                                                             |
