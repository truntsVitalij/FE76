# Redux Toolkit (RTK) — гайд и сравнение с базовым Redux

Материал для занятия: официальный современный способ работы с Redux — меньше кода, встроенная типизация, async из коробки.

> **Redux Toolkit** — обёртка над классическим Redux от команды Redux. Сейчас это **рекомендуемый** способ использовать Redux в новых проектах, включая диплом.

---

## Содержание

1. [Что такое Redux Toolkit](#что-такое-redux-toolkit)
2. [Зачем он появился](#зачем-он-появился)
3. [Основные API](#основные-api)
4. [Структура проекта с RTK](#структура-проекта-с-rtk)
5. [Пример: counter на RTK](#пример-counter-на-rtk)
6. [Пример: users на RTK](#пример-users-на-rtk)
7. [Асинхронные запросы — createAsyncThunk](#асинхронные-запросы--createasyncthunk)
8. [Типизация в RTK](#типизация-в-rtk)
9. [RTK vs базовый Redux — сравнение](#rtk-vs-базовый-redux--сравнение)
10. [Плюсы и минусы RTK](#плюсы-и-минусы-rtk)
11. [Когда что использовать](#когда-что-использовать)
12. [Пример для CRM + json-server](#пример-для-crm--json-server)
13. [Полезные ссылки](#полезные-ссылки)

---

## Что такое Redux Toolkit

**Redux Toolkit (RTK)** — официальный набор инструментов для Redux:

| API | Заменяет в базовом Redux |
|-----|--------------------------|
| `configureStore` | `createStore` + `combineReducers` + `applyMiddleware` |
| `createSlice` | отдельные action types + action creators + reducer |
| `createAsyncThunk` | ручной thunk с `FETCH_START / SUCCESS / ERROR` |
| `createAction` | ручной action creator |
| `createReducer` | switch/case reducer |

### Пакеты

```bash
npm install @reduxjs/toolkit react-redux
```

`@reduxjs/toolkit` уже включает:
- `redux`
- `redux-thunk`
- `immer` (для «мутабельного» синтаксиса в reducer)
- DevTools из коробки

> **Одной фразой:** RTK делает то же самое, что базовый Redux, но в 2–3 раза меньше файлов и boilerplate.

---

## Зачем он появился

В базовом Redux (как в `test-redux`) на один слайс уходит много кода:

```
store/
  actions/
    counterActions.ts    ← константы + action creators
  reducers/
    counterReducer.ts    ← switch/case + spread
  index.ts               ← createStore + combineReducers
```

Типичные боли:
- много однотипного кода
- `{ ...state, list: [...] }` в каждом case
- ручная настройка thunk middleware
- ручная типизация `RootState`, `AppDispatch`, action unions
- три action type на каждый fetch: `START`, `SUCCESS`, `ERROR`

RTK решает это через `createSlice` и `createAsyncThunk`.

---

## Основные API

### configureStore

Создаёт store с настройками по умолчанию:

```ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import usersReducer from './slices/usersSlice';

export const store = configureStore({
  reducers: {
    counter: counterReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Внутри автоматически:
- подключает `redux-thunk`
- включает Redux DevTools
- проверяет мутации state (в dev-режиме)

### createSlice

Один файл вместо `actions/` + `reducers/`:

```ts
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',           // префикс для type: 'counter/increment'
  initialState: { value: 0 },
  reducers: {
    increment(state) {
      state.value += 1;      // выглядит как мутация, но Immer делает иммутабельную копию
    },
  },
});

export const { increment } = counterSlice.actions;
export default counterSlice.reducer;
```

### createAsyncThunk

Стандартный способ для `fetch`:

```ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStudents = createAsyncThunk(
  'students/fetchAll',
  async () => {
    const response = await fetch('http://localhost:3001/students');
    return response.json();
  },
);
```

Автоматически создаёт action types:
- `students/fetchAll/pending`
- `students/fetchAll/fulfilled`
- `students/fetchAll/rejected`

---

## Структура проекта с RTK

```
src/
├── types/
│   ├── user.ts
│   └── student.ts
├── store/
│   ├── slices/
│   │   ├── counterSlice.ts
│   │   ├── usersSlice.ts
│   │   └── studentsSlice.ts
│   ├── hooks.ts          ← useAppDispatch, useAppSelector
│   └── index.ts          ← configureStore, RootState, AppDispatch
├── api/
│   └── studentsApi.ts    ← опционально: чистые fetch-функции
└── main.tsx              ← <Provider store={store}>
```

### Сравнение структур

| Базовый Redux | Redux Toolkit |
|---------------|---------------|
| `actions/counterActions.ts` | — |
| `reducers/counterReducer.ts` | `slices/counterSlice.ts` |
| `actions/index.ts` (AppAction) | не нужен |
| `createStore` + `combineReducers` | `configureStore` |
| ручной thunk | `createAsyncThunk` |

---

## Пример: counter на RTK

### Базовый Redux (test-redux)

**actions/counterActions.ts** — 23 строки:

```ts
export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';
export const INCREMENT_BY_VALUE = 'counter/INCREMENT_BY_VALUE';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const incrementByValue = (value: number) => ({
  type: INCREMENT_BY_VALUE,
  payload: value,
});
```

**reducers/counterReducer.ts** — 32 строки:

```ts
export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value === 0 ? state.value : state.value - 1 };
    case INCREMENT_BY_VALUE:
      return { ...state, value: state.value + action.payload };
    default:
      return state;
  }
};
```

### Redux Toolkit — один файл

**slices/counterSlice.ts:**

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value += 1;
    },
    decrement(state) {
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    incrementByValue(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByValue } = counterSlice.actions;
export default counterSlice.reducer;
```

### Использование в компоненте — одинаково

```tsx
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { increment, decrement, incrementByValue } from '../../store/slices/counterSlice';

export const Counter = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <p>Count: {value}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByValue(5))}>+5</button>
    </div>
  );
};
```

---

## Пример: users на RTK

### Базовый Redux

```ts
// actions
export const increment = (id: number) => ({ type: INCREMENT, payload: id });

// reducer
case INCREMENT:
  return {
    ...state,
    list: state.list.map((user) =>
      user.id === action.payload
        ? { ...user, counter: user.counter + 1 }
        : user,
    ),
  };
```

### Redux Toolkit

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user';

type UsersState = {
  list: User[];
};

const initialState: UsersState = {
  list: [
    { id: 1, name: 'John Doe', counter: 0 },
    { id: 2, name: 'Jane Doe', counter: 0 },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      const user = state.list.find((u) => u.id === action.payload);
      if (user) {
        user.counter += 1;
      }
    },
    decrement(state, action: PayloadAction<number>) {
      const user = state.list.find((u) => u.id === action.payload);
      if (user && user.counter > 0) {
        user.counter -= 1;
      }
    },
  },
});

export const { increment, decrement } = usersSlice.actions;
export default usersSlice.reducer;
```

Обратите внимание: `state.list.find(...)` и `user.counter += 1` — **выглядят как мутация**, но RTK через **Immer** создаёт иммутабельную копию. Правила Redux соблюдены.

---

## Асинхронные запросы — createAsyncThunk

### Базовый Redux — много кода

```ts
// 3 константы
export const FETCH_STUDENTS_START = 'students/FETCH_START';
export const FETCH_STUDENTS_SUCCESS = 'students/FETCH_SUCCESS';
export const FETCH_STUDENTS_ERROR = 'students/FETCH_ERROR';

// thunk
export const fetchStudents = () => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_START });
  try {
    const res = await fetch('http://localhost:3001/students');
    const data = await res.json();
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_STUDENTS_ERROR, payload: error.message });
  }
};

// reducer — ещё 3 case
case FETCH_STUDENTS_START: return { ...state, loading: true };
case FETCH_STUDENTS_SUCCESS: return { ...state, loading: false, list: action.payload };
case FETCH_STUDENTS_ERROR: return { ...state, loading: false, error: action.payload };
```

### Redux Toolkit — компактно

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Student } from '../../types/student';

const API_URL = 'http://localhost:3001';

export const fetchStudents = createAsyncThunk<Student[]>(
  'students/fetchAll',
  async () => {
    const response = await fetch(`${API_URL}/students`);

    if (!response.ok) {
      throw new Error('Не удалось загрузить учеников');
    }

    return response.json();
  },
);

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

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  },
});

export default studentsSlice.reducer;
```

### В компоненте

```tsx
useEffect(() => {
  dispatch(fetchStudents());
}, [dispatch]);
```

`dispatch(fetchStudents())` — TypeScript знает, что это async thunk. Никаких ручных `FETCH_START`.

---

## Типизация в RTK

В базовом Redux типы пишутся вручную (см. [REDUXTYPINGREADME.md](./REDUXTYPINGREADME.md)):
- `CounterAction` union
- `ReturnType<typeof rootReducer>`
- `AppThunk<ReturnType>`

В RTK большая часть выводится автоматически:

```ts
// store/index.ts
export const store = configureStore({ reducers: { ... } });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

```ts
// store/hooks.ts
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

### PayloadAction

```ts
incrementByValue(state, action: PayloadAction<number>) {
  state.value += action.payload; // payload: number
}
```

### Типизация createAsyncThunk

```ts
export const fetchStudents = createAsyncThunk<Student[], void, { rejectValue: string }>(
  'students/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/students`);
      if (!response.ok) throw new Error();
      return await response.json();
    } catch {
      return rejectWithValue('Ошибка загрузки');
    }
  },
);
```

---

## RTK vs базовый Redux — сравнение

### Один и тот же counter

| Аспект | Базовый Redux | Redux Toolkit |
|--------|---------------|---------------|
| Файлов на слайс | 2 (`actions` + `reducer`) | 1 (`slice`) |
| Строк кода | ~55 | ~30 |
| Action types | пишем вручную | генерирует `createSlice` |
| Action creators | пишем вручную | экспорт из `slice.actions` |
| Иммутабельность | `{ ...state, value: ... }` | `state.value += 1` (Immer) |
| Store setup | `createStore` + middleware | `configureStore` |
| Async | ручной thunk | `createAsyncThunk` |
| DevTools | настраиваем вручную | включены по умолчанию |
| TypeScript | много ручной работы | вывод типов из коробки |

### Data Flow — одинаковый

```
UI → dispatch(action) → reducer → new state → useSelector → UI
```

RTK **не меняет архитектуру** Redux. Меняет только **способ записи** кода.

### Терминология

| Базовый Redux | Redux Toolkit |
|---------------|---------------|
| Action type constant | `name` + имя reducer в `createSlice` |
| Action creator | `slice.actions.increment` |
| Reducer function | `createSlice({ reducers })` |
| `combineReducers` | `configureStore({ reducers })` |
| Thunk function | `createAsyncThunk` |
| `extraReducers` | — (обработка чужих actions, например async) |

---

## Плюсы и минусы RTK

### ✅ Плюсы RTK

| Плюс | Пояснение |
|------|-----------|
| **Меньше boilerplate** | `createSlice` объединяет actions + reducer |
| **Официальный стандарт** | Redux docs рекомендуют RTK для всех новых проектов |
| **Immer** | Пишем `state.x = y` вместо spread — код читается проще |
| **createAsyncThunk** | Стандартный паттерн для API без ручных `START/SUCCESS/ERROR` |
| **configureStore** | Thunk + DevTools из коробки |
| **Типизация проще** | `PayloadAction`, автовывод `RootState` |
| **Меньше ошибок** | Action types генерируются, опечатки почти невозможны |
| **Подходит для диплома** | Критерий «Redux / toolkit» закрывается полностью |

### ❌ Минусы RTK

| Минус | Пояснение |
|-------|-----------|
| **Скрывает детали** | Immer и автогенерация actions — не видно «как под капотом» |
| **Магия Immer** | Новички могут не понять, почему «мутация» работает |
| **`extraReducers`** | Синтаксис `builder.addCase` сложнее switch/case на старте |
| **Абстракция** | Сложнее дебажить, если не знаешь базовый Redux |
| **Размер бандла** | Чуть больше из-за Immer (~5 KB gzip) |
| **Не для обучения основ** | Если цель — понять Redux с нуля, лучше сначала базовый |

### ✅ Плюсы базового Redux

| Плюс | Пояснение |
|------|-----------|
| **Прозрачность** | Видно каждый шаг: action → reducer → store |
| **Обучение** | Понимаешь, *почему* RTK устроен именно так |
| **Контроль** | Полный контроль над каждым action type |
| **Простота концепции** | Меньше абстракций — только функции и объекты |

### ❌ Минусы базового Redux

| Минус | Пояснение |
|-------|-----------|
| **Много файлов** | actions + reducers + types на каждый слайс |
| **Boilerplate** | `{ ...state, list: state.list.map(...) }` везде |
| **Ручной thunk** | 3 action type на каждый запрос |
| **Ручная типизация** | Action unions, AppThunk — много работы |
| **Легко ошибиться** | Опечатка в `type`, забытый `default` case |

---

## Когда что использовать

| Ситуация | Рекомендация |
|----------|--------------|
| Учебный проект, первое знакомство с Redux | **Базовый Redux** — понять основы |
| Дипломный проект | **Redux Toolkit** — меньше кода, современный стандарт |
| CRM с API (json-server / Supabase) | **Redux Toolkit** + `createAsyncThunk` |
| Маленький проект (3–4 экрана) | Можно обойтись `useState` + Context |
| Большой проект (14+ экранов) | **Redux Toolkit** однозначно |
| Нужно понять, что делает RTK | Сначала базовый, потом RTK |

### Рекомендуемый путь обучения

```
1. Базовый Redux (lesson46)     → понять store, action, reducer, dispatch
2. Типизация (REDUXTYPINGREADME) → убрать any
3. Redux Toolkit (этот гайд)    → писать то же самое, но быстрее
4. json-server + createAsyncThunk → полноценный API-слой
```

---

## Пример для CRM + json-server

Структура store для диплома «CRM онлайн-школы»:

```
store/
  slices/
    authSlice.ts         ← login, logout, role
    studentsSlice.ts     ← CRUD учеников
    lessonsSlice.ts      ← расписание
    transactionsSlice.ts ← финансы
  hooks.ts
  index.ts
```

### authSlice.ts

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type UserRole = 'admin' | 'manager' | 'teacher';

type AuthState = {
  user: { id: number; name: string; role: UserRole } | null;
  token: string | null;
};

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
```

### studentsSlice.ts (с API)

```ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Student } from '../../types/student';

const API_URL = 'http://localhost:3001';

export const fetchStudents = createAsyncThunk<Student[]>(
  'students/fetchAll',
  async () => {
    const response = await fetch(`${API_URL}/students`);
    if (!response.ok) throw new Error('Ошибка загрузки');
    return response.json();
  },
);

export const createStudent = createAsyncThunk<Student, Omit<Student, 'id'>>(
  'students/create',
  async (student) => {
    const response = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    });
    return response.json();
  },
);

const studentsSlice = createSlice({
  name: 'students',
  initialState: {
    list: [] as Student[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка';
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default studentsSlice.reducer;
```

### store/index.ts

```ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import studentsReducer from './slices/studentsSlice';
import lessonsReducer from './slices/lessonsSlice';
import transactionsReducer from './slices/transactionsSlice';

export const store = configureStore({
  reducers: {
    auth: authReducer,
    students: studentsReducer,
    lessons: lessonsReducer,
    transactions: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Ролевая навигация через selector

```ts
// store/selectors/authSelectors.ts
import type { RootState } from '../index';

export const selectUserRole = (state: RootState) => state.auth.user?.role;

export const selectNavItems = (state: RootState) => {
  const role = selectUserRole(state);

  switch (role) {
    case 'admin':
      return ['dashboard', 'users', 'schedule', 'transactions', 'settings'];
    case 'manager':
      return ['dashboard', 'students', 'schedule', 'transactions'];
    case 'teacher':
      return ['dashboard', 'my-schedule', 'my-students'];
    default:
      return [];
  }
};
```

---

## Миграция test-redux → RTK

| Было (базовый) | Стало (RTK) |
|----------------|-------------|
| `store/actions/counterActions.ts` | удалить |
| `store/reducers/counterReducer.ts` | `store/slices/counterSlice.ts` |
| `createStore(rootReducer)` | `configureStore({ reducers })` |
| `useSelector((state: any) => ...)` | `useAppSelector((state) => ...)` |
| ручной thunk | `createAsyncThunk` |

Порядок миграции:
1. `npm install @reduxjs/toolkit`
2. Перенести один reducer в `createSlice` (начать с `counter`)
3. Заменить `createStore` на `configureStore`
4. Перенести остальные слайсы
5. Удалить папку `actions/`

---

## Итоговая таблица

| Критерий | Базовый Redux | Redux Toolkit |
|----------|:-------------:|:-------------:|
| Понимание основ | ⭐⭐⭐ | ⭐ |
| Скорость разработки | ⭐ | ⭐⭐⭐ |
| Меньше кода | ⭐ | ⭐⭐⭐ |
| TypeScript | ⭐⭐ | ⭐⭐⭐ |
| Async / API | ⭐⭐ | ⭐⭐⭐ |
| Подходит для диплома | ✅ | ✅✅ |
| Рекомендация Redux team | — | ✅ официально |

---

## Полезные ссылки

| Ресурс | Ссылка |
|--------|--------|
| Redux Toolkit docs | [redux-toolkit.js.org](https://redux-toolkit.js.org/) |
| Quick Start | [redux-toolkit.js.org/tutorials/quick-start](https://redux-toolkit.js.org/tutorials/quick-start) |
| TypeScript | [redux-toolkit.js.org/usage/usage-with-typescript](https://redux-toolkit.js.org/usage/usage-with-typescript) |
| createAsyncThunk | [redux-toolkit.js.org/api/createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk) |
| createSlice | [redux-toolkit.js.org/api/createSlice](https://redux-toolkit.js.org/api/createSlice) |
| Базовый Redux (наш гайд) | [lesson45/REDUXREADME.md](../lesson45/REDUXREADME.md) |
| Типизация базового Redux | [REDUXTYPINGREADME.md](./REDUXTYPINGREADME.md) |
| json-server | [JSONSERVERREADME.md](./JSONSERVERREADME.md) |

---

## Быстрый чеклист

```bash
# 1. Установить
npm install @reduxjs/toolkit react-redux

# 2. Создать slice
# store/slices/counterSlice.ts → createSlice

# 3. Настроить store
# store/index.ts → configureStore

# 4. Типизированные хуки
# store/hooks.ts → useAppDispatch, useAppSelector

# 5. Provider в main.tsx
# <Provider store={store}>

# 6. Для API
# createAsyncThunk + extraReducers
```
