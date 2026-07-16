# React Context — гайд и сравнение с Redux

Материал для занятия: встроенный механизм React для передачи данных через дерево компонентов без prop drilling.

> **React Context** — часть React, не требует отдельной библиотеки. Подходит для **локального, редко меняющегося** состояния (тема, язык, auth user). Для **глобального сложного** состояния с API — лучше **Redux**.

---

## Содержание

1. [Что такое Context](#что-такое-context)
2. [Зачем он нужен](#зачем-он-нужен)
3. [Основные API](#основные-api)
4. [Data Flow](#data-flow)
5. [Пример: ThemeContext](#пример-themecontext)
6. [Пример: AuthContext](#пример-authcontext)
7. [useReducer + Context](#usereducer--context)
8. [Типизация Context в TypeScript](#типизация-context-в-typescript)
9. [Context vs Redux — сравнение](#context-vs-redux--сравнение)
10. [Когда Context, когда Redux](#когда-context-когда-redux)
11. [Можно ли вместе](#можно-ли-вместе)
12. [Плюсы и минусы](#плюсы-и-минусы)
13. [Пример для CRM / blog-application](#пример-для-crm--blog-application)
14. [Типичные ошибки](#типичные-ошибки)
15. [Полезные ссылки](#полезные-ссылки)

---

## Что такое Context

**Context** — механизм React, который позволяет «пробросить» данные через дерево компонентов **без передачи props на каждом уровне** (prop drilling).

```
App
├── Header          ← theme нужен, но props через Header не идут
├── Sidebar         ← props через Sidebar не идут
└── Page
    └── Button      ← theme нужен здесь
```

**Без Context:** `App → Page → Button` — `theme` передаётся через каждый уровень.

**С Context:** `App (Provider)` → любой компонент читает через `useContext`.

---

## Зачем он нужен

| Проблема                               | Решение Context                              |
| -------------------------------------- | -------------------------------------------- |
| Prop drilling — props через 5+ уровней | Provider наверху, `useContext` в любом месте |
| Дублирование props                     | Один источник данных                         |
| Локальное «глобальное» состояние       | Theme, locale, auth без Redux                |

Context **не заменяет** Redux. Это другой инструмент с другой областью применения.

---

## Основные API

### createContext

Создаёт объект контекста:

```tsx
import { createContext } from "react";

type Theme = "light" | "dark";

export const ThemeContext = createContext<Theme>("light");
```

### Provider

Оборачивает часть дерева и передаёт значение:

```tsx
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>
```

### useContext

Читает значение из ближайшего Provider выше по дереву:

```tsx
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const theme = useContext(ThemeContext); // 'dark'
```

---

## Data Flow

```
Provider (value={state})
    ↓
  Context
    ↓
useContext() → компонент получает value
    ↓
setState / dispatch → обновление value в Provider
    ↓
все подписанные компоненты re-render
```

**Важно:** Context **не** имеет встроенного store, middleware, DevTools. Это просто «труба» для значения.

---

## Пример: ThemeContext

### context/ThemeContext.tsx

```tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
```

### main.tsx

```tsx
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
```

### Компонент

```tsx
import { useTheme } from "../../context/ThemeContext";

export const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={theme}>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"}
      </button>
    </header>
  );
};
```

---

## Пример: AuthContext

Типичный кейс — текущий пользователь и login/logout:

```tsx
import { createContext, useContext, useState, type ReactNode } from "react";

type User = { id: number; name: string; role: "admin" | "user" };

type AuthContextValue = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: user !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
```

---

## useReducer + Context

Если логика сложнее, чем `useState`, можно комбинировать **useReducer + Context** — «мини-Redux»:

```tsx
import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" };

const counterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const CounterContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export const CounterProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within CounterProvider");
  }
  return context;
};
```

|                   | useState + Context | useReducer + Context           |
| ----------------- | ------------------ | ------------------------------ |
| Простота          | ✅ проще           | сложнее                        |
| Логика обновления | inline в Provider  | в reducer                      |
| Масштаб           | theme, auth        | counter, cart (мало сущностей) |

---

## Типизация Context в TypeScript

### Паттерн: null + custom hook (рекомендуется)

```tsx
const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context; // TypeScript знает: ThemeContextValue
};
```

### Default value (без проверки)

```tsx
const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
});
```

Минус: `useContext` не поймает использование вне Provider.

---

## Context vs Redux — сравнение

### Один и тот же counter

| Аспект        | Context                           | Redux                            |
| ------------- | --------------------------------- | -------------------------------- |
| Установка     | встроен в React                   | `redux` + `react-redux`          |
| Boilerplate   | Provider + hook                   | actions + reducer + store        |
| DevTools      | ❌ нет                            | ✅ Redux DevTools                |
| Middleware    | ❌ нет                            | ✅ thunk и др.                   |
| Async (fetch) | вручную в Provider                | thunk / `createAsyncThunk`       |
| Селекторы     | ❌ нет                            | ✅ `useSelector`                 |
| Re-render     | все consumers при изменении value | точечные подписки через selector |
| Масштаб       | 1–3 простых контекста             | много сущностей, API, CRUD       |
| Тестирование  | reducer вручную                   | actions + reducer из коробки     |

### Data Flow — похож, но не одинаков

**Context:**

```
Provider value → useContext → setState → re-render всех consumers
```

**Redux:**

```
dispatch(action) → reducer → new state → useSelector (точечно) → re-render
```

### Терминология

| Context                            | Redux                            |
| ---------------------------------- | -------------------------------- |
| `createContext`                    | `createStore` / `configureStore` |
| `Provider value={...}`             | `<Provider store={store}>`       |
| `useContext`                       | `useSelector`                    |
| `setState` / `dispatch` в Provider | `dispatch(action)`               |
| `useReducer`                       | reducer / `createSlice`          |

---

## Когда Context, когда Redux

### ✅ Используй Context

| Ситуация                          | Пример                                               |
| --------------------------------- | ---------------------------------------------------- |
| Тема (light/dark)                 | `ThemeContext`                                       |
| Язык интерфейса                   | `LocaleContext`                                      |
| Текущий пользователь (auth shell) | `AuthContext` — `{ user, login, logout }`            |
| Редко меняющиеся данные           | sidebar open/closed, modal open                      |
| Мало потребителей                 | 2–5 компонентов читают одно значение                 |
| Нет async / API в этом слое       | token из localStorage — ок, fetch списка blogs — нет |
| Маленький проект                  | 3–4 экрана, без CRUD                                 |

### ✅ Используй Redux

| Ситуация             | Пример                                   |
| -------------------- | ---------------------------------------- |
| CRUD + API           | blogs, students, products                |
| Много сущностей      | auth + students + lessons + transactions |
| Async запросы        | thunk, loading/error                     |
| Сложное состояние    | фильтры, сортировка, pagination          |
| DevTools для отладки | time-travel, action log                  |
| Большой проект       | CRM, диплом (14+ экранов)                |
| Кэш серверных данных | списки, детали, optimistic updates       |

### Быстрая таблица решений

| Вопрос                       |   Context   |  Redux   |
| ---------------------------- | :---------: | :------: |
| Данные меняются часто?       |     ❌      |    ✅    |
| Нужен fetch / API?           |     ❌      |    ✅    |
| Одна сущность (theme)?       |     ✅      | overkill |
| 5+ сущностей в store?        |     ❌      |    ✅    |
| Нужны DevTools?              |     ❌      |    ✅    |
| Prop drilling на 2 уровня?   | можно props | overkill |
| Prop drilling на 5+ уровней? |     ✅      |    ✅    |

### Правило большого пальца

```
Context  = «настройки приложения» (UI, auth shell)
Redux    = «данные приложения» (списки, формы, API, бизнес-логика)
```

---

## Можно ли вместе

**Да, и так часто делают:**

```tsx
// main.tsx
<AuthProvider>
  {" "}
  {/* Context: кто залогинен */}
  <ThemeProvider>
    {" "}
    {/* Context: тема */}
    <Provider store={store}>
      {" "}
      {/* Redux: blogs, counter, ... */}
      <App />
    </Provider>
  </ThemeProvider>
</AuthProvider>
```

| Слой             | Что хранить                               |
| ---------------- | ----------------------------------------- |
| **AuthContext**  | `user`, `token`, `login()`, `logout()`    |
| **ThemeContext** | `theme`, `toggleTheme()`                  |
| **Redux store**  | blogs, students, cart, filters, API state |

Context для **инфраструктуры UI**, Redux для **бизнес-данных**.

---

## Плюсы и минусы

### ✅ Плюсы Context

| Плюс                        | Пояснение                             |
| --------------------------- | ------------------------------------- |
| Встроен в React             | без `npm install`                     |
| Простой API                 | createContext + Provider + useContext |
| Мало кода                   | для theme/auth — 30–50 строк          |
| Достаточно для UI-состояния | sidebar, modal, locale                |

### ❌ Минусы Context

| Минус                    | Пояснение                                |
| ------------------------ | ---------------------------------------- |
| Нет DevTools             | сложнее отлаживать                       |
| Re-render всех consumers | при изменении value — все подписчики     |
| Нет middleware           | async, logging — вручную                 |
| Плохо масштабируется     | много контекстов = «context hell»        |
| Нет селекторов           | нельзя подписаться на `state.blogs.list` |

### ✅ Плюсы Redux

| Плюс                     | Пояснение                |
| ------------------------ | ------------------------ |
| Предсказуемый data flow  | action → reducer → state |
| DevTools                 | time-travel, action log  |
| Thunk / createAsyncThunk | стандарт для API         |
| Селекторы                | точечные re-render       |
| Масштаб                  | CRM, диплом              |

### ❌ Минусы Redux

| Минус              | Пояснение                    |
| ------------------ | ---------------------------- |
| Boilerplate        | actions, reducers, store     |
| Overkill для theme | избыточен для одного boolean |
| Кривая обучения    | actions, reducers, dispatch  |

---

## Пример для CRM / blog-application

```
Context:
  AuthContext     → user, role, token
  ThemeContext    → light/dark

Redux:
  blogsSlice      → fetch, delete (как в blog-application)
  counterSlice    → increment, decrement
```

Компонент `BlogList`:

- `useAuth()` — проверить role (Context)
- `useAppSelector(state => state.blogs.list)` — список (Redux)
- `dispatch(fetchBlogList())` — загрузка (Redux)

---

## Типичные ошибки

### 1. Хранить в Context то, что должно быть в Redux

```tsx
// ❌ Плохо — список blogs с API в Context
const [blogs, setBlogs] = useState([]);
useEffect(() => { fetch(...).then(setBlogs); }, []);

// ✅ Хорошо — blogs в Redux, theme в Context
```

### 2. Один огромный Context на всё приложение

```tsx
// ❌ Плохо — один AppContext с 20 полями
// Любое изменение → re-render всех consumers

// ✅ Хорошо — разделить: ThemeContext, AuthContext, Redux store
```

### 3. Забыть проверку в custom hook

```tsx
// ❌ useContext может вернуть null
export const useTheme = () => useContext(ThemeContext);

// ✅ throw если вне Provider
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
```

### 4. Создавать новый объект value на каждый render без memo

```tsx
// ❌ Новый объект каждый render → лишние re-render
<ThemeContext.Provider value={{ theme, toggleTheme }}>

// ✅ useMemo для стабильной ссылки (если много consumers)
const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
<ThemeContext.Provider value={value}>
```

---

## Итоговая таблица

| Критерий                    | Context |  Redux   |
| --------------------------- | :-----: | :------: |
| Простота старта             | ⭐⭐⭐  |   ⭐⭐   |
| Theme / locale / auth shell | ⭐⭐⭐  |    ⭐    |
| CRUD + API                  |   ⭐    |  ⭐⭐⭐  |
| DevTools                    |    —    |  ⭐⭐⭐  |
| Масштаб (CRM, диплом)       |   ⭐    |  ⭐⭐⭐  |
| Встроен в React             |   ✅    | ❌ (npm) |

---

## Полезные ссылки

| Ресурс                      | Ссылка                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------ |
| React Context docs          | [react.dev/reference/react/createContext](https://react.dev/reference/react/createContext)                   |
| useContext                  | [react.dev/reference/react/useContext](https://react.dev/reference/react/useContext)                         |
| Passing Data Deeply (React) | [react.dev/learn/passing-data-deeply-with-context](https://react.dev/learn/passing-data-deeply-with-context) |
| Redux Thunk (наш гайд)      | [../lesson47/REDUXTHUNKREADME.md](../lesson47/REDUXTHUNKREADME.md)                                           |
| Redux Typing (наш гайд)     | [../lesson47/REDUXTYPINGREADME.md](../lesson47/REDUXTYPINGREADME.md)                                         |
| json-server (наш гайд)      | [../lesson47/JSONSERVERREADME.md](../lesson47/JSONSERVERREADME.md)                                           |
| Когда не нужен Redux        | [redux.js.org/faq/general](https://redux.js.org/faq/general)                                                 |

---

## Быстрый чеклист

```bash
# Context — без установки, встроен в React

# 1. createContext + тип
# 2. Provider с useState / useReducer
# 3. custom hook (useTheme, useAuth)
# 4. обернуть App в Provider

# Context если: theme, locale, auth user, UI flags
# Redux если: CRUD, API, много сущностей, DevTools
# Вместе: AuthContext + Redux store — нормальная практика
```
