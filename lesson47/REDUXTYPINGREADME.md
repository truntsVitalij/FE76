# TypeScript + чистый React-Redux — гайд по типизации

Материал для занятия: как типизировать классический Redux (без Redux Toolkit) в TypeScript-проекте.

> Сейчас в `test-redux` часто встречается `useSelector((state: any) => ...)`. Этот гайд показывает, как убрать `any` и получить автодополнение в IDE.

---

## Содержание

1. [Зачем типизировать Redux](#зачем-типизировать-redux)
2. [Общая схема типов](#общая-схема-типов)
3. [Типы доменных сущностей](#типы-доменных-сущностей)
4. [Типизация actions](#типизация-actions)
5. [Типизация reducer](#типизация-reducer)
6. [RootState и AppDispatch](#rootstate-и-appdispatch)
7. [Типизированные хуки](#типизированные-хуки)
8. [Типизация redux-thunk](#типизация-redux-thunk)
9. [Полный пример на test-redux](#полный-пример-на-test-redux)
10. [Типичные ошибки](#типичные-ошибки)
11. [Чеклист](#чеклист)

---

## Зачем типизировать Redux

### Без типов

```tsx
const count = useSelector((state: any) => state.counter.value);
const userList = useSelector((state: any) => state.users.list);

dispatch({ type: 'INCREMENT' });           // опечатка не ловится
dispatch({ type: 'counter/INCREMENT', payload: 'abc' }); // неверный payload
```

Проблемы:
- IDE не подсказывает поля state
- опечатки в `type` и `payload` ловятся только в рантайме
- рефакторинг опасен — переименовал поле в reducer, а в компоненте осталось старое

### С типами

```tsx
const count = useAppSelector((state) => state.counter.value);   // number
const userList = useAppSelector((state) => state.users.list);     // User[]

dispatch(increment());              // ✅
dispatch(incrementByValue(5));      // ✅
dispatch(incrementByValue('5'));    // ❌ ошибка TypeScript
```

---

## Общая схема типов

```
types/
  user.ts              → User
  blog.ts              → Blog

store/
  actions/
    counterActions.ts  → CounterAction (union type)
    usersActions.ts    → UsersAction (union type)
  reducers/
    counterReducer.ts  → CounterState + reducer
    usersReducer.ts    → UsersState + reducer
    index.ts           → rootReducer
  index.ts             → store, RootState, AppDispatch
  hooks.ts             → useAppDispatch, useAppSelector
```

### Что откуда берётся

| Тип | Откуда |
|-----|--------|
| `User`, `Blog` | пишем вручную в `types/` |
| `CounterAction` | union из action creators |
| `CounterState` | `typeof initialState` или interface |
| `RootState` | `ReturnType<typeof rootReducer>` |
| `AppDispatch` | `typeof store.dispatch` |

---

## Типы доменных сущностей

Отдельные типы для данных предметной области — не смешиваем с Redux-типами.

```ts
// src/types/user.ts
export type User = {
  id: number;
  name: string;
  counter: number;
};
```

```ts
// src/types/blog.ts
export type Blog = {
  id: number;
  title: string;
  content: string;
  isLiked: boolean;
  isFavorite: boolean;
};
```

> **Правило:** `types/` — это «форма данных». `store/` — это «как данные меняются».

---

## Типизация actions

### Шаг 1. Константы type

```ts
// store/actions/counterActions.ts
export const INCREMENT = 'counter/INCREMENT' as const;
export const DECREMENT = 'counter/DECREMENT' as const;
export const INCREMENT_BY_VALUE = 'counter/INCREMENT_BY_VALUE' as const;
```

`as const` делает строку **литеральным типом**, а не просто `string`.

### Шаг 2. Action creators

```ts
export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const incrementByValue = (value: number) => ({
  type: INCREMENT_BY_VALUE,
  payload: value,
});
```

### Шаг 3. Union type для всех actions слайса

```ts
export type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByValue>;
```

`ReturnType<typeof increment>` автоматически выводит:

```ts
{ type: 'counter/INCREMENT' }
```

### Actions с payload (users)

```ts
// store/actions/usersActions.ts
import type { User } from '../../types/user';

export const INCREMENT = 'users/INCREMENT' as const;
export const DECREMENT = 'users/DECREMENT' as const;

export const increment = (id: User['id']) => ({
  type: INCREMENT,
  payload: id,
});

export const decrement = (id: User['id']) => ({
  type: DECREMENT,
  payload: id,
});

export type UsersAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>;
```

### Actions без action creators (blog)

Если action создаётся вручную — описываем тип явно:

```ts
// store/actions/blogActions.ts
export const LIKE_BLOG = 'blog/LIKE_BLOG' as const;
export const UNLIKE_BLOG = 'blog/UNLIKE_BLOG' as const;

export type BlogAction =
  | { type: typeof LIKE_BLOG; payload: number }
  | { type: typeof UNLIKE_BLOG; payload: number };
```

### Общий AppAction (все слайсы)

```ts
// store/actions/index.ts
import type { CounterAction } from './counterActions';
import type { UsersAction } from './usersActions';
import type { BlogAction } from './blogActions';

export type AppAction = CounterAction | UsersAction | BlogAction;
```

---

## Типизация reducer

### State слайса

```ts
// store/reducers/counterReducer.ts
import type { CounterAction } from '../actions/counterActions';
import {
  DECREMENT,
  INCREMENT,
  INCREMENT_BY_VALUE,
} from '../actions/counterActions';

export type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};
```

### Reducer с типами

```ts
export const counterReducer = (
  state: CounterState = initialState,
  action: CounterAction,
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };

    case DECREMENT:
      return {
        ...state,
        value: state.value === 0 ? state.value : state.value - 1,
      };

    case INCREMENT_BY_VALUE:
      return { ...state, value: state.value + action.payload };

    default:
      return state;
  }
};
```

### Что даёт типизация reducer

```ts
case INCREMENT:
  action.payload; // ❌ Property 'payload' does not exist

case INCREMENT_BY_VALUE:
  action.payload; // ✅ number
```

TypeScript **сужает тип** внутри каждого `case`.

### Users reducer

```ts
// store/reducers/usersReducer.ts
import type { User } from '../../types/user';
import type { UsersAction } from '../actions/usersActions';
import { DECREMENT, INCREMENT } from '../actions/usersActions';

export type UsersState = {
  list: User[];
};

const initialState: UsersState = {
  list: [
    { id: 1, name: 'John Doe', counter: 0 },
    { id: 2, name: 'Jane Doe', counter: 0 },
  ],
};

export const usersReducer = (
  state: UsersState = initialState,
  action: UsersAction,
): UsersState => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        list: state.list.map((user) =>
          user.id === action.payload
            ? { ...user, counter: user.counter + 1 }
            : user,
        ),
      };

    case DECREMENT: {
      const index = state.list.findIndex(
        (user) => user.id === action.payload,
      );

      if (index === -1) return state;

      return {
        ...state,
        list: [
          ...state.list.slice(0, index),
          {
            ...state.list[index],
            counter: state.list[index].counter - 1,
          },
          ...state.list.slice(index + 1),
        ],
      };
    }

    default:
      return state;
  }
};
```

### Blog reducer

```ts
// store/reducers/blogReducer.ts
import type { Blog } from '../../types/blog';
import type { BlogAction } from '../actions/blogActions';
import { LIKE_BLOG, UNLIKE_BLOG } from '../actions/blogActions';

export type BlogState = {
  list: Blog[];
};

const initialState: BlogState = {
  list: [
    {
      id: 1,
      title: 'Blog 1',
      content: 'Content 1',
      isLiked: false,
      isFavorite: false,
    },
  ],
};

export const blogReducer = (
  state: BlogState = initialState,
  action: BlogAction,
): BlogState => {
  switch (action.type) {
    case LIKE_BLOG:
      return {
        ...state,
        list: state.list.map((blog) =>
          blog.id === action.payload ? { ...blog, isLiked: true } : blog,
        ),
      };

    case UNLIKE_BLOG:
      return {
        ...state,
        list: state.list.map((blog) =>
          blog.id === action.payload ? { ...blog, isLiked: false } : blog,
        ),
      };

    default:
      return state;
  }
};
```

---

## RootState и AppDispatch

```ts
// store/index.ts
import { combineReducers, createStore } from 'redux';

import { counterReducer } from './reducers/counterReducer';
import { usersReducer } from './reducers/usersReducer';
import { blogReducer } from './reducers/blogReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  blog: blogReducer,
});

export const store = createStore(rootReducer);

// Тип всего state — автоматически из reducer'ов
export type RootState = ReturnType<typeof rootReducer>;

// Тип dispatch — знает все actions
export type AppDispatch = typeof store.dispatch;

export default store;
```

### Что получается в RootState

```ts
type RootState = {
  counter: CounterState;  // { value: number }
  users: UsersState;      // { list: User[] }
  blog: BlogState;        // { list: Blog[] }
};
```

`ReturnType<typeof rootReducer>` — главный трюк: **не нужно** вручную перечислять все поля state.

---

## Типизированные хуки

Стандартные `useDispatch` и `useSelector` из `react-redux` **не знают** ваш `RootState`. Создаём обёртки один раз:

```ts
// store/hooks.ts
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

import type { AppDispatch, RootState } from './index';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

> Для `react-redux` v9+ используется `useDispatch.withTypes<AppDispatch>()`.
> В более старых версиях писали кастомные функции-обёртки.

### Использование в компонентах

**Было:**

```tsx
const count = useSelector((state: any) => state.counter.value);
const dispatch = useDispatch();
```

**Стало:**

```tsx
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { increment, decrement } from '../../store/actions/counterActions';

export const Counter = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
};
```

IDE теперь знает:
- `state.counter` — существует
- `state.counter.value` — `number`
- `dispatch(increment())` — валидный вызов

### App.tsx

```tsx
import { useAppSelector } from './store/hooks';

function App() {
  const count = useAppSelector((state) => state.counter.value);
  const userList = useAppSelector((state) => state.users.list);

  return (
    <section>
      <p>Count: {count}</p>
      <UserList list={userList} />
    </section>
  );
}
```

---

## Типизация redux-thunk

Для асинхронных actions (fetch к json-server) нужен `redux-thunk`.

### Установка

```bash
npm install redux-thunk
```

### ThunkAction

```ts
// store/actions/studentsActions.ts
import type { ThunkAction } from 'redux-thunk';

import type { RootState } from '../index';
import type { AppAction } from './index';
import type { Student } from '../../types/student';

const API_URL = 'http://localhost:3001';

export const FETCH_STUDENTS_START = 'students/FETCH_START' as const;
export const FETCH_STUDENTS_SUCCESS = 'students/FETCH_SUCCESS' as const;
export const FETCH_STUDENTS_ERROR = 'students/FETCH_ERROR' as const;

export type StudentsAction =
  | { type: typeof FETCH_STUDENTS_START }
  | { type: typeof FETCH_STUDENTS_SUCCESS; payload: Student[] }
  | { type: typeof FETCH_STUDENTS_ERROR; payload: string };

// ThunkAction<ReturnType, RootState, ExtraArgument, ActionType>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppAction
>;

export const fetchStudents = (): AppThunk => async (dispatch) => {
  dispatch({ type: FETCH_STUDENTS_START });

  try {
    const response = await fetch(`${API_URL}/students`);

    if (!response.ok) {
      throw new Error('Не удалось загрузить учеников');
    }

    const students: Student[] = await response.json();
    dispatch({ type: FETCH_STUDENTS_SUCCESS, payload: students });
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_ERROR,
      payload: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
```

### Подключение thunk к store

```ts
// store/index.ts
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';

const rootReducer = combineReducers({
  counter: counterReducer,
  users: usersReducer,
  students: studentsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
```

### Dispatch thunk в компоненте

```tsx
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchStudents } from '../../store/actions/studentsActions';

export const StudentList = () => {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.students);

  useEffect(() => {
    dispatch(fetchStudents()); // ✅ TypeScript знает, что это thunk
  }, [dispatch]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <ul>
      {list.map((student) => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  );
};
```

### Обновить AppAction

Когда добавляете новый слайс — не забудьте включить его actions в общий union:

```ts
export type AppAction =
  | CounterAction
  | UsersAction
  | BlogAction
  | StudentsAction;
```

---

## Полный пример на test-redux

### Структура файлов после типизации

```
src/
├── types/
│   ├── user.ts
│   └── blog.ts
├── store/
│   ├── actions/
│   │   ├── counterActions.ts   ← CounterAction
│   │   ├── usersActions.ts     ← UsersAction
│   │   ├── blogActions.ts      ← BlogAction
│   │   └── index.ts            ← AppAction
│   ├── reducers/
│   │   ├── counterReducer.ts   ← CounterState
│   │   ├── usersReducer.ts     ← UsersState
│   │   └── blogReducer.ts      ← BlogState
│   ├── hooks.ts                ← useAppDispatch, useAppSelector
│   └── index.ts                ← store, RootState, AppDispatch
└── components/
    └── counter/
        └── counter.tsx         ← без any
```

### Поток типов

```
User (types/user.ts)
    ↓
UsersState (reducer)
    ↓
RootState (store/index.ts)
    ↓
useAppSelector(state => state.users.list)  →  User[]
```

```
incrementByValue(5) (action creator)
    ↓
CounterAction (union type)
    ↓
counterReducer (switch case)
    ↓
action.payload → number
```

---

## Типичные ошибки

### 1. `state: any` в useSelector

```tsx
// ❌
useSelector((state: any) => state.counter.value);

// ✅
useAppSelector((state) => state.counter.value);
```

### 2. Забыли `as const` на type-константах

```ts
// ❌ type будет string, union не сработает
export const INCREMENT = 'counter/INCREMENT';

// ✅
export const INCREMENT = 'counter/INCREMENT' as const;
```

### 3. Reducer принимает `any` action

```ts
// ❌
export const counterReducer = (state = initialState, action) => {

// ✅
export const counterReducer = (
  state: CounterState = initialState,
  action: CounterAction,
): CounterState => {
```

### 4. Не обновили AppAction после нового слайса

```ts
// Добавили studentsReducer, но забыли:
export type AppAction = CounterAction | UsersAction | BlogAction;
// Нужно:
export type AppAction = CounterAction | UsersAction | BlogAction | StudentsAction;
```

### 5. Разные type-строки в разных слайсах

```ts
// counterActions.ts
export const INCREMENT = 'counter/INCREMENT';

// usersActions.ts
export const INCREMENT = 'users/INCREMENT';
```

Это **нормально** — префикс слайса (`counter/`, `users/`) как раз предотвращает конфликты. TypeScript различает их через union type каждого reducer.

### 6. default case в reducer

```ts
default:
  return state; // ✅ обязателен — иначе TS ругается на неполный switch
```

---

## Чеклист

```
□ Создать types/ для доменных сущностей (User, Blog, Student...)
□ Добавить as const к константам action type
□ Описать Action union через ReturnType<typeof actionCreator>
□ Типизировать state и reducer каждого слайса
□ Экспортировать RootState = ReturnType<typeof rootReducer>
□ Экспортировать AppDispatch = typeof store.dispatch
□ Создать store/hooks.ts с useAppDispatch и useAppSelector
□ Заменить все useSelector/useDispatch на типизированные хуки
□ Убрать все any из Redux-кода
□ Для thunk: установить redux-thunk, описать AppThunk
```

---

## Сравнение: без типов vs с типами

| Место | Без типов | С типами |
|-------|-----------|----------|
| `useSelector` | `(state: any) => ...` | `useAppSelector((state) => ...)` |
| `useDispatch` | `useDispatch()` | `useAppDispatch()` |
| Action | `{ type: 'INCREMNT' }` — тихая ошибка | ошибка на этапе компиляции |
| `payload` | любой тип | строго по action |
| Рефакторинг | ломается незаметно | IDE показывает все места |
| Автодополнение | нет | есть для state и actions |

---

## Полезные ссылки

- Redux TypeScript: [redux.js.org/usage/usage-with-typescript](https://redux.js.org/usage/usage-with-typescript)
- React Redux TypeScript: [react-redux.js.org/using-react-redux/usage-with-typescript](https://react-redux.js.org/using-react-redux/usage-with-typescript)
- Redux Thunk: [github.com/reduxjs/redux-thunk](https://github.com/reduxjs/redux-thunk)
