# React Testing Library — гайд

Материал для занятия: как тестировать React-компоненты через **поведение пользователя**, а не через внутренности (`state`, `className`).

> **Одной фразой:** RTL рендерит компонент в jsdom → вы ищете элементы **как пользователь** (`getByRole`, текст) → кликаете / вводите → проверяете результат на экране. Раннер — **Vitest** (Vite) или **Jest**.

Связь: общая теория тестов — [lesson51/TESTINGREADME.md](../lesson51/TESTINGREADME.md); Vite — [VITEREADME.md](./VITEREADME.md).

---

## Содержание

1. [Что такое React Testing Library](#что-такое-react-testing-library)
2. [Философия и Guiding Principles](#философия-и-guiding-principles)
3. [Установка (Vite + Vitest)](#установка-vite--vitest)
4. [Установка (Jest)](#установка-jest)
5. [Первый тест](#первый-тест)
6. [Queries: get / query / find](#queries-get--query--find)
7. [Какой query выбрать](#какой-query-выбрать)
8. [user-event: клики и ввод](#user-event-клики-и-ввод)
9. [Асинхронность](#асинхронность)
10. [Мок fetch](#мок-fetch)
11. [Роутер, Context, Redux](#роутер-context-redux)
12. [Тест хуков](#тест-хуков)
13. [Хорошие практики](#хорошие-практики)
14. [Типичные ошибки](#типичные-ошибки)
15. [Чеклист](#чеклист)
16. [Полезные ссылки](#полезные-ссылки)
17. [Краткий словарь](#краткий-словарь)

---

## Что такое React Testing Library

**React Testing Library (RTL)** — набор утилит поверх [DOM Testing Library](https://testing-library.com/).

| Делает | Не делает |
|--------|-----------|
| `render(<Component />)` в виртуальный DOM (jsdom) | Не монтирует «настоящий» браузер как Cypress |
| Поиск узлов по роли, тексту, label | Не рекомендует копаться в `useState` |
| Совместима с Jest / Vitest | Не заменяет e2e |

Пакеты:

| Пакет | Зачем |
|-------|--------|
| `@testing-library/react` | `render`, `screen`, `waitFor` |
| `@testing-library/jest-dom` | матчеры: `toBeInTheDocument()`, `toHaveValue()` |
| `@testing-library/user-event` | реалистичные клики / набор текста |
| `@testing-library/dom` | обычно транзитивно |

---

## Философия и Guiding Principles

Цитата авторов:

> The more your tests resemble the way your software is used, the more confidence they give you.

| ✅ Тестируем | ❌ Избегаем |
|--------------|------------|
| «На экране есть кнопка Sign in» | `wrapper.find('.btn_abc123')` |
| «После клика появился текст Error» | Проверка `useState` / числа рендеров |
| «Инпут с label Email» | Snapshot всего дерева «на всякий случай» |

Почему: рефакторинг CSS/структуры не должен ломать тесты, если UX тот же.

---

## Установка (Vite + Vitest)

Для проектов вроде `diplom` / `test-storybook` логичен **Vitest** (тот же Vite).

```bash
npm i -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### `vite.config.ts`

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
```

Нужны типы Vitest — в `tsconfig` / reference:

```ts
/// <reference types="vitest/config" />
```

(в начале `vite.config.ts`, как у вас в storybook-проекте.)

### `src/test/setup.ts`

```ts
import '@testing-library/jest-dom/vitest'
```

### Скрипт

```json
{
  "scripts": {
    "test": "vitest",
    "test:run": "vitest run"
  }
}
```

---

## Установка (Jest)

Если проект как `lesson51/learn-jest` (без React) — для React-приложения:

```bash
npm i -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

`jest.config.js` (фрагмент):

```js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
}
```

`src/setupTests.js`:

```js
require('@testing-library/jest-dom')
```

---

## Первый тест

Компонент:

```tsx
// Button.tsx
type Props = { label: string; onClick?: () => void }

export function Button({ label, onClick }: Props) {
  return (
    <button type="button" onClick={onClick}>
      {label}
    </button>
  )
}
```

Тест (Vitest):

```tsx
// Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders label', () => {
    render(<Button label="Sign in" />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(<Button label="Sign in" onClick={onClick} />)
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
```

Структура — классический **AAA**: Arrange (`render`) → Act (`click`) → Assert (`expect`).

---

## Queries: get / query / find

Все ищут в контейнере; удобнее через **`screen`** (весь документ после render).

| Метод | Элемент есть | Элемента нет | Несколько |
|-------|--------------|--------------|-----------|
| **`getBy…`** | возвращает | **кидает ошибку** | ошибка |
| **`queryBy…`** | возвращает | **`null`** | ошибка |
| **`findBy…`** | Promise → элемент | Promise reject (после timeout) | ошибка |

Варианты `*AllBy*` — массив элементов.

### Когда что

| Ситуация | Query |
|----------|--------|
| Элемент должен быть сразу | `getBy…` |
| Элемента быть не должно | `expect(queryBy…).not.toBeInTheDocument()` |
| Появится после async (fetch, таймер) | `await findBy…` или `waitFor` |

```tsx
// нет кнопки
expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument()

// появится позже
expect(await screen.findByText(/welcome/i)).toBeInTheDocument()
```

---

## Какой query выбрать

Приоритет из доки Testing Library (сверху — лучше):

1. **`getByRole`** — button, textbox, heading, link…  
2. **`getByLabelText`** — поля форм  
3. **`getByPlaceholderText`** — если нет label (хуже)  
4. **`getByText`** — параграфы, заголовки без роли  
5. **`getByDisplayValue`** — текущее значение инпута  
6. **`getByAltText` / `getByTitle`**  
7. **`getByTestId`** — последний резерв (`data-testid`)

Примеры:

```tsx
screen.getByRole('button', { name: /sign in/i })
screen.getByRole('textbox', { name: /email/i }) // нужен <label htmlFor>
screen.getByLabelText(/password/i)
screen.getByText(/don't have an account/i)
screen.getByTestId('sign-in-form') // только если иначе никак
```

Для доступности: если `getByRole` не находит — часто проблема a11y в разметке, а не в тесте.

---

## user-event: клики и ввод

Предпочтительнее `fireEvent`: ближе к реальному вводу.

```tsx
import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

await user.click(screen.getByRole('button', { name: /submit/i }))
await user.type(screen.getByLabelText(/email/i), 'a@b.com')
await user.clear(screen.getByLabelText(/email/i))
await user.selectOptions(screen.getByLabelText(/city/i), 'Minsk')
await user.keyboard('{Enter}')
```

Всегда `await` у `user.*` (API v14+).

---

## Асинхронность

### `findBy` (самый простой)

```tsx
render(<UserProfile id="1" />)
expect(await screen.findByText(/anna/i)).toBeInTheDocument()
```

### `waitFor`

```tsx
import { waitFor } from '@testing-library/react'

await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument()
})
```

### `waitForElementToBeRemoved`

```tsx
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
```

Не используйте фиксированный `setTimeout` / `sleep` в тестах.

---

## Мок fetch

В компонентных тестах сеть не должна ходить наружу.

### Vitest

```tsx
import { vi, beforeEach, afterEach } from 'vitest'

beforeEach(() => {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ display_name: 'Anna' }),
    }),
  )
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

it('shows user name', async () => {
  render(<Profile />)
  expect(await screen.findByText(/anna/i)).toBeInTheDocument()
  expect(fetch).toHaveBeenCalled()
})
```

### Jest

```js
global.fetch = jest.fn()

fetch.mockResolvedValue({
  ok: true,
  json: async () => ({ display_name: 'Anna' }),
})
```

Для многих эндпоинтов удобнее **MSW** (`msw`) — мок на уровне HTTP, один раз на все тесты.

---

## Роутер, Context, Redux

Компонент с `useNavigate` / `Link` нужно оборачивать.

### React Router

```tsx
import { MemoryRouter } from 'react-router'

render(
  <MemoryRouter initialEntries={['/sign-in']}>
    <SignInForm />
  </MemoryRouter>,
)
```

Хелпер, чтобы не копипастить:

```tsx
function renderWithRouter(ui: React.ReactElement, route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>,
  )
}
```

### Context / Redux

```tsx
render(
  <Provider store={store}>
    <ThemeProvider value="dark">
      <App />
    </ThemeProvider>
  </Provider>,
)
```

Вынесите `renderWithProviders` в `src/test/test-utils.tsx` — как рекомендует RTL.

---

## Тест хуков

```bash
# в @testing-library/react уже есть renderHook
```

```tsx
import { renderHook, act } from '@testing-library/react'

it('toggles value', () => {
  const { result } = renderHook(() => useToggle(false))

  act(() => {
    result.current.toggle()
  })

  expect(result.current.value).toBe(true)
})
```

Хуки с Context — передайте `wrapper` в `renderHook`.

---

## Хорошие практики

1. Один тест — одно поведение.  
2. Имена: `it('shows error when email is empty')`.  
3. `userEvent.setup()` в каждом тесте (или в `beforeEach`).  
4. После `render` — сначала найти элемент, потом действие.  
5. Мокайте **границы** (fetch, localStorage), не внутренности дочерних компонентов без нужды.  
6. Не тестируйте чужие библиотеки (что `button` вызывает DOM click).  
7. Для списка: `getAllByRole('listitem')` + длина / тексты.  
8. Чистите моки в `afterEach`.

---

## Типичные ошибки

| Ошибка | Как правильно |
|--------|----------------|
| `getBy` для отсутствующего элемента | `queryBy` + `not.toBeInTheDocument()` |
| `getBy` для элемента «потом» | `await findBy…` |
| Забыли `await` у `user.click` | всегда `await user.*` |
| Поиск по CSS-module классу | `getByRole` / текст |
| `fireEvent.change` везде | `user.type` |
| Нет `label` у input — flaky a11y queries | добавить `<label htmlFor>` |
| Реальный fetch в CI | `vi.stubGlobal('fetch', …)` / MSW |
| Сравнение с Snapshot огромного DOM | точечные assert'ы |

---

## Чеклист

```text
# 1. Поставить RTL + jest-dom + user-event + jsdom
# 2. setupFiles: import '@testing-library/jest-dom[/vitest]'
# 3. render → screen.getByRole → userEvent → expect
# 4. get / query / find — по ситуации
# 5. Приоритет queries: Role → Label → Text → testid
# 6. Async: findBy / waitFor
# 7. fetch мокать
# 8. Router: MemoryRouter
# 9. Не тестировать implementation details
# 10. npm test / vitest — зелёный CI
```

Мини-шаблон теста:

```tsx
it('…', async () => {
  const user = userEvent.setup()
  render(<Component />)

  await user.click(screen.getByRole('button', { name: /…/i }))

  expect(await screen.findByText(/…/i)).toBeInTheDocument()
})
```

---

## Полезные ссылки

| Ресурс | Зачем |
|--------|--------|
| [Testing Library — React](https://testing-library.com/docs/react-testing-library/intro/) | Официальная дока |
| [Queries cheatsheet](https://testing-library.com/docs/queries/about) | get/query/find |
| [Which query](https://testing-library.com/docs/queries/about/#priority) | Приоритет |
| [user-event](https://testing-library.com/docs/user-event/intro) | Клики и ввод |
| [Common mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) | Kent C. Dodds |
| [Vitest](https://vitest.dev/) | Раннер для Vite |
| [lesson51 — тестирование](../lesson51/TESTINGREADME.md) | Пирамида, TDD, Cypress |

---

## Краткий словарь

| Термин | Одной строкой |
|--------|----------------|
| RTL | React Testing Library |
| `render` | Смонтировать компонент в jsdom |
| `screen` | Объект для поиска по всему выводу |
| `getBy*` | Найти сразу или упасть |
| `queryBy*` | Найти или `null` |
| `findBy*` | Дождаться появления (async) |
| `userEvent` | Имитация действий пользователя |
| jsdom | DOM-окружение в Node/Vitest без браузера |
| `MemoryRouter` | Роутер для тестов без истории браузера |
| MSW | Mock Service Worker — мок сети |

---

> Практика: начните с `Button` / `SignInForm` из Storybook-проекта — `getByRole('button')` + клик. Затем форма: `getByLabelText` + `user.type` + проверка текста ошибки. Сеть — только через мок `fetch`.
