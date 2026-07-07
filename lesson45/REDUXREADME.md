# Redux + React Redux — базовое поведение (без Toolkit)

Материал для занятия: классический Redux, подключение через `react-redux`, плюсы и минусы, примеры.

> Мы изучаем **базовый Redux** — без Redux Toolkit. Это помогает понять, как всё устроено «под капотом».

---

## Содержание

1. [Что такое Redux](#что-такое-redux)
2. [Какую проблему решает](#какую-проблему-решает)
3. [Основные термины](#основные-термины)
4. [Как работает Redux (Data Flow)](#как-работает-redux-data-flow)
5. [Подключение к проекту](#подключение-к-проекту)
6. [Примеры использования](#примеры-использования)
7. [Несколько reducers — combineReducers](#несколько-reducers--combinereducers)
8. [Асинхронные запросы (redux-thunk)](#асинхронные-запросы-redux-thunk)
9. [connect vs хуки (useSelector / useDispatch)](#connect-vs-хуки-useselector--usedispatch)
10. [Что хранить в Redux, а что — нет](#что-хранить-в-redux-а-что--нет)
11. [Redux vs Context API](#redux-vs-context-api)
12. [Redux DevTools](#redux-devtools)
13. [Плюсы и минусы](#плюсы-и-минусы)
14. [Полезные ссылки](#полезные-ссылки)

---

## Что такое Redux

**Redux** — JavaScript-библиотека для **централизованного хранения и управления состоянием** приложения.

**React Redux** — официальная библиотека-«мост» между Redux и React. Она даёт `Provider`, хуки `useSelector` / `useDispatch` и HOC `connect`.

| Пакет | Зачем |
|-------|-------|
| `redux` | Store, reducer, dispatch, combineReducers |
| `react-redux` | Подключение store к React-компонентам |
| `redux-thunk` | Асинхронная логика (fetch, setTimeout) |

Ссылки:
- Redux: [redux.js.org](https://redux.js.org/)
- React Redux: [react-redux.js.org](https://react-redux.js.org/)
- Redux Thunk: [github.com/reduxjs/redux-thunk](https://github.com/reduxjs/redux-thunk)

> **Одной фразой:** Redux — это «общая база данных» для фронтенда. Все важные данные лежат в одном store, меняются только через action, а React-компоненты читают state через `react-redux`.

---

## Какую проблему решает

В React состояние обычно живёт внутри компонентов:

```tsx
const [posts, setPosts] = useState([]);
const [user, setUser] = useState(null);
```

Это работает, пока данные нужны **в одном месте**. Но в `blog-application` одни и те же данные часто нужны сразу в нескольких компонентах:

| Данные | Где используются |
|--------|------------------|
| Авторизация | `Header`, `SignIn`, `BlogList` |
| Список постов | `BlogList`, `BlogCard`, `Pagination` |
| Поиск / фильтры | `Header`, `BlogList` |

### Проблема prop drilling

Без Redux данные передают через пропсы «сверху вниз» через компоненты, которым они не нужны:

```
App → MainLayout → BlogList → BlogCard
         ↑ user      ↑ posts    ↑ posts
```

Redux убирает эту цепочку: **любой компонент** читает данные напрямую из store.

---

## Основные термины

| Термин | Что это |
|--------|---------|
| **Store** | Единое хранилище всего state |
| **State** | Текущий объект с данными |
| **Action** | Объект `{ type: '...', payload?: ... }` — «что произошло» |
| **Action Creator** | Функция, которая **создаёт** action |
| **Reducer** | Чистая функция `(state, action) => newState` |
| **Dispatch** | `store.dispatch(action)` — отправить action |
| **Selector** | Функция `(state) => нужныйКусок` |

### Action

```js
{ type: 'INCREMENT' }
{ type: 'POSTS_SET', payload: [...] }
{ type: 'AUTH_LOGIN', payload: { id: 1, name: 'Vitalij' } }
```

Action **описывает событие**, но **не меняет** state.

### Action Creator

```js
// action type — константа, чтобы не опечататься
const INCREMENT = 'INCREMENT';

// action creator — функция, возвращающая action
const increment = () => ({ type: INCREMENT });
```

### Reducer

```js
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { value: state.value + 1 };
    case DECREMENT:
      return { value: state.value - 1 };
    default:
      return state; // всегда возвращаем state, даже если action не наш
  }
}
```

**Правила reducer:**
1. Чистая функция — без side effects (fetch, DOM, localStorage).
2. **Не мутирует** state — возвращает **новый** объект.
3. При неизвестном `action.type` возвращает текущий `state`.

Подробнее: [redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers)

---

## Как работает Redux (Data Flow)

```
┌─────────────┐
│  Component  │  1. Пользователь нажал кнопку
└──────┬──────┘
       │ dispatch(increment())
       ▼
┌─────────────┐
│   Action    │  2. { type: 'INCREMENT' }
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Reducer   │  3. (state, action) => newState
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Store    │  4. { value: 1 }
└──────┬──────┘
       │ useSelector(state => state.counter.value)
       ▼
┌─────────────┐
│  Component  │  5. UI перерисовывается
└─────────────┘
```

### Три принципа Redux

1. **Single source of truth** — один store на всё приложение.
2. **State is read-only** — изменить state можно только через `dispatch`.
3. **Pure reducers** — изменения через чистые функции.

[Три принципа Redux](https://redux.js.org/understanding/thinking-in-redux/three-principles)

---

## Подключение к проекту

### Шаг 1. Установка

```bash
npm install redux react-redux
```

Для асинхронных запросов дополнительно:

```bash
npm install redux-thunk
```

### Шаг 2. Структура папок

```
src/
  store/
    index.js              # createStore, rootReducer
    actions/
      counterActions.js   # action types + action creators
      postsActions.js
    reducers/
      counterReducer.js
      postsReducer.js
      index.js            # combineReducers
  main.tsx                # Provider
  App.tsx
```

### Шаг 3. Action types и action creators

```js
// store/actions/counterActions.js

export const INCREMENT = 'counter/INCREMENT';
export const DECREMENT = 'counter/DECREMENT';
export const RESET = 'counter/RESET';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const reset = () => ({ type: RESET });
```

> **Совет:** префикс `counter/` в type помогает избежать конфликтов имён между reducers.

### Шаг 4. Reducer

```js
// store/reducers/counterReducer.js
import { INCREMENT, DECREMENT, RESET } from '../actions/counterActions';

const initialState = { value: 0 };

export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    case RESET:
      return { ...state, value: 0 };
    default:
      return state;
  }
}
```

Обратите внимание на `{ ...state, value: ... }` — **иммутабельное обновление** через spread.

### Шаг 5. combineReducers + createStore

```js
// store/reducers/index.js
import { combineReducers } from 'redux';
import { counterReducer } from './counterReducer';
import { postsReducer } from './postsReducer';

export const rootReducer = combineReducers({
  counter: counterReducer,
  posts: postsReducer,
});
```

```js
// store/index.js
import { createStore } from 'redux';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer);
```

`combineReducers` собирает несколько reducers в один store:

```js
// итоговый state:
{
  counter: { value: 0 },
  posts: { items: [], page: 1 }
}
```

Документация:
- [combineReducers](https://redux.js.org/api/combinereducers)
- [createStore](https://redux.js.org/api/createstore)

### Шаг 6. Provider в main.tsx

```tsx
// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';
import { store } from './store';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
```

`Provider` делает store доступным для всех дочерних компонентов через React Context.

Документация: [react-redux.js.org/api/provider](https://react-redux.js.org/api/provider)

---

## Примеры использования

### Пример 1. Счётчик

```tsx
// components/Counter/Counter.tsx
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from '../../store/actions/counterActions';

export const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
};
```

**Что происходит:**
1. `useSelector` — подписывается на `state.counter.value`, перерисовывает при изменении.
2. `dispatch(increment())` — отправляет action `{ type: 'counter/INCREMENT' }`.
3. `counterReducer` возвращает новый state.
4. Store обновляется → компонент перерисовывается.

---

### Пример 2. Авторизация

```js
// store/actions/authActions.js
export const AUTH_LOGIN = 'auth/LOGIN';
export const AUTH_LOGOUT = 'auth/LOGOUT';

export const login = (user) => ({ type: AUTH_LOGIN, payload: user });
export const logout = () => ({ type: AUTH_LOGOUT });
```

```js
// store/reducers/authReducer.js
import { AUTH_LOGIN, AUTH_LOGOUT } from '../actions/authActions';

const initialState = {
  user: null,
  isAuthenticated: false,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
```

```tsx
// pages/SignIn/SignIn.tsx
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../store/actions/authActions';

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = () => {
    dispatch(login({ id: 1, name: 'Vitalij' }));
    navigate('/blog');
  };

  return <button onClick={handleSignIn}>Sign in</button>;
};
```

```tsx
// components/Header/Header.tsx
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/actions/authActions';

export const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <header>
      {user ? (
        <>
          <span>Привет, {user.name}</span>
          <button onClick={() => dispatch(logout())}>Выйти</button>
        </>
      ) : (
        <span>Гость</span>
      )}
    </header>
  );
};
```

`SignIn` записывает пользователя, `Header` читает — **без prop drilling**.

---

### Пример 3. Посты (blog-application)

```js
// store/actions/postsActions.js
export const POSTS_SET = 'posts/SET';
export const POSTS_SET_PAGE = 'posts/SET_PAGE';
export const POSTS_SET_SEARCH = 'posts/SET_SEARCH';

export const setPosts = (posts) => ({ type: POSTS_SET, payload: posts });
export const setPage = (page) => ({ type: POSTS_SET_PAGE, payload: page });
export const setSearchQuery = (query) => ({ type: POSTS_SET_SEARCH, payload: query });
```

```js
// store/reducers/postsReducer.js
import { POSTS_SET, POSTS_SET_PAGE, POSTS_SET_SEARCH } from '../actions/postsActions';

const initialState = {
  items: [],
  page: 1,
  searchQuery: '',
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_SET:
      return { ...state, items: action.payload };
    case POSTS_SET_PAGE:
      return { ...state, page: action.payload };
    case POSTS_SET_SEARCH:
      return { ...state, searchQuery: action.payload, page: 1 };
    default:
      return state;
  }
}
```

```tsx
// pages/BlogList/BlogList.tsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, setPage } from '../../store/actions/postsActions';

export const BlogList = () => {
  const { items, page, searchQuery } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then((res) => res.json())
      .then((data) => dispatch(setPosts(data)));
  }, [dispatch, page]);

  const filtered = items.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {filtered.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
      <button onClick={() => dispatch(setPage(page + 1))}>Следующая</button>
    </>
  );
};
```

```tsx
// components/Header/Header.tsx — поиск
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/actions/postsActions';

export const Header = () => {
  const searchQuery = useSelector((state) => state.posts.searchQuery);
  const dispatch = useDispatch();

  return (
    <input
      value={searchQuery}
      onChange={(e) => dispatch(setSearchQuery(e.target.value))}
      placeholder="Поиск..."
    />
  );
};
```

---

## Несколько reducers — combineReducers

Когда в приложении несколько «слайсов» логики, каждый reducer отвечает за свой кусок state:

```js
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  counter: counterReducer,   // state.counter
  auth: authReducer,           // state.auth
  posts: postsReducer,         // state.posts
});
```

Каждый reducer:
- получает **только свой** кусок state;
- не знает о других reducers;
- вызывается при **каждом** dispatch, но реагирует только на «свои» action types.

---

## Асинхронные запросы (redux-thunk)

Reducer **не должен** делать `fetch`. Для асинхронной логики используют **middleware** — `redux-thunk`.

Thunk — это функция, которая возвращает другую функцию:

```js
// store/actions/postsActions.js
export const POSTS_FETCH_START = 'posts/FETCH_START';
export const POSTS_FETCH_SUCCESS = 'posts/FETCH_SUCCESS';
export const POSTS_FETCH_ERROR = 'posts/FETCH_ERROR';

// обычные action creators
const fetchStart = () => ({ type: POSTS_FETCH_START });
const fetchSuccess = (posts) => ({ type: POSTS_FETCH_SUCCESS, payload: posts });
const fetchError = (message) => ({ type: POSTS_FETCH_ERROR, payload: message });

// thunk — функция, возвращающая функцию
export const fetchPosts = (page) => {
  return async (dispatch) => {
    dispatch(fetchStart());

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
      );
      const data = await res.json();
      dispatch(fetchSuccess(data));
    } catch (error) {
      dispatch(fetchError(error.message));
    }
  };
};
```

```js
// store/reducers/postsReducer.js
import { POSTS_FETCH_START, POSTS_FETCH_SUCCESS, POSTS_FETCH_ERROR } from '../actions/postsActions';

const initialState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
};

export function postsReducer(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH_START:
      return { ...state, loading: true, error: null };
    case POSTS_FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case POSTS_FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
```

```js
// store/index.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer, applyMiddleware(thunk));
```

```tsx
// BlogList.tsx
useEffect(() => {
  dispatch(fetchPosts(page));
}, [dispatch, page]);

const { items, loading, error } = useSelector((state) => state.posts);

if (loading) return <p>Загрузка...</p>;
if (error) return <p>Ошибка: {error}</p>;
```

**Как работает thunk:**
1. `dispatch(fetchPosts(1))` — dispatch получает **функцию**, а не объект.
2. `redux-thunk` перехватывает её и вызывает: `fetchPosts(1)(dispatch)`.
3. Внутри thunk делаем `fetch`, потом `dispatch` обычных actions.

Документация:
- [redux-thunk](https://github.com/reduxjs/redux-thunk)
- [Redux async logic](https://redux.js.org/tutorials/fundamentals/part-6-async-logic)

---

## connect vs хуки (useSelector / useDispatch)

`react-redux` даёт два способа подключения компонентов к store.

### Современный способ — хуки (рекомендуется)

```tsx
const count = useSelector((state) => state.counter.value);
const dispatch = useDispatch();
```

- Проще читать и писать.
- Меньше boilerplate.
- Удобно в функциональных компонентах.

Документация:
- [useSelector](https://react-redux.js.org/api/hooks#useselector)
- [useDispatch](https://react-redux.js.org/api/hooks#usedispatch)

### Старый способ — connect (HOC)

```tsx
import { connect } from 'react-redux';
import { increment } from '../store/actions/counterActions';

const Counter = ({ count, onIncrement }) => (
  <div>
    <p>{count}</p>
    <button onClick={onIncrement}>+</button>
  </div>
);

const mapStateToProps = (state) => ({
  count: state.counter.value,
});

const mapDispatchToProps = (dispatch) => ({
  onIncrement: () => dispatch(increment()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```

| | `connect` | `useSelector` + `useDispatch` |
|---|---------|-------------------------------|
| Стиль | HOC, class components | Хуки, функциональные компоненты |
| Boilerplate | `mapStateToProps`, `mapDispatchToProps` | Минимальный |
| Статус | Legacy, но ещё работает | ✅ Рекомендуется |

> **Для занятия:** изучаем оба, в новых проектах используем хуки.

Документация connect: [react-redux.js.org/api/connect](https://react-redux.js.org/api/connect)

---

## Что хранить в Redux, а что — нет

### ✅ Хранить

- Данные пользователя (auth)
- Списки (posts, comments)
- Фильтры, поиск, пагинация — если нужны в нескольких компонентах
- Theme, locale

### ❌ Не хранить

- Значение одного input (если не нужно другим)
- Открыта ли модалка (если только один компонент)
- Hover, focus, анимации
- Данные из URL (`useParams`, `useSearchParams`)

**Правило:** shared state → Redux. Локальное → `useState`.

[Should I use Redux?](https://redux.js.org/faq/general#should-i-use-redux)

---

## Redux vs Context API

| | Redux | Context API |
|---|-------|-------------|
| Назначение | Глобальный state-менеджер | Передача данных вниз |
| DevTools | ✅ | ❌ |
| Middleware / async | ✅ redux-thunk | ❌ |
| Boilerplate | Больше | Меньше |
| Когда | Сложное приложение | Theme, locale |

[React Context](https://react.dev/reference/react/createContext)

---

## Redux DevTools

Расширение для браузера:
- текущий state
- история всех action
- diff до/после
- time-travel (откат state)

Подключение в классическом Redux:

```js
import { createStore } from 'redux';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```

- [Chrome — Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
- [github.com/reduxjs/redux-devtools](https://github.com/reduxjs/redux-devtools)

---

## Плюсы и минусы

### ✅ Плюсы

| Плюс | Пояснение |
|------|-----------|
| **Single source of truth** | Один store |
| **Предсказуемость** | Только action → reducer |
| **Отладка** | Redux DevTools |
| **Нет prop drilling** | Любой компонент читает state |
| **Тестируемость** | Reducer — чистая функция |
| **Понимание основ** | Видно каждый шаг: action → reducer → store |

### ❌ Минусы

| Минус | Пояснение |
|-------|-----------|
| **Много boilerplate** | Отдельные файлы: types, creators, reducers |
| **Иммутабельность вручную** | `{ ...state, x: y }` в каждом case |
| **Избыточен для маленьких проектов** | Todo → `useState` |
| **Кривая обучения** | Много терминов и файлов |
| **Async сложнее** | Нужен thunk middleware |

> **Заметка:** Redux Toolkit появился именно чтобы убрать этот boilerplate. Но базовый Redux помогает понять, **что** Toolkit делает за вас.

---

## Полезные ссылки

### Официальная документация

| Ресурс | Ссылка |
|--------|--------|
| Redux | [redux.js.org](https://redux.js.org/) |
| React Redux | [react-redux.js.org](https://react-redux.js.org/) |
| Redux Thunk | [github.com/reduxjs/redux-thunk](https://github.com/reduxjs/redux-thunk) |

### Туториалы (классический Redux)

| Тема | Ссылка |
|------|--------|
| Redux Fundamentals | [part-1-overview](https://redux.js.org/tutorials/fundamentals/part-1-overview) |
| Actions and Reducers | [part-3-state-actions-reducers](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers) |
| Store | [part-4-store](https://redux.js.org/tutorials/fundamentals/part-4-store) |
| Async Logic | [part-6-async-logic](https://redux.js.org/tutorials/fundamentals/part-6-async-logic) |
| React Redux Quick Start | [react-redux.js.org/tutorials/quick-start](https://react-redux.js.org/tutorials/quick-start) |
| Usage with React | [react-redux.js.org/tutorials/connect](https://react-redux.js.org/tutorials/connect) |

### Видео

| Ресурс | Ссылка |
|--------|--------|
| Redux за 100 секунд | [youtube.com/watch?v=_shA5Xwe38_](https://www.youtube.com/watch?v=_shA5Xwe38_) |
| Redux Tutorial (Net Ninja) | [youtube.com/playlist?list=PL4cUxeIkc9gPJSR9GyG4b34LS0C1QTZmq](https://www.youtube.com/playlist?list=PL4cUxeIkc9gPJSR9GyG4b34LS0C1QTZmq) |

### Mock API

| API | Ссылка |
|-----|--------|
| JSONPlaceholder | [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/) |
| DummyJSON | [dummyjson.com/docs/posts](https://dummyjson.com/docs/posts) |

---

## Итог для занятия

1. **Redux** — store + actions + reducers. State меняется только через dispatch.
2. **React Redux** — `Provider`, `useSelector`, `useDispatch` (или `connect`).
3. **Action** — `{ type, payload }`. **Action creator** — функция, создающая action.
4. **Reducer** — чистая функция, возвращает новый state (не мутирует!).
5. **combineReducers** — несколько reducers в одном store.
6. **redux-thunk** — async-логика вне reducer.
7. Не всё кладём в Redux — только shared state.
