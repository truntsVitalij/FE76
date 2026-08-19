# Ответы: Собеседование Junior Frontend (JS + React + TS) — 2026

Ответы к [INTERVIEWQUESTIONS.md](./INTERVIEWQUESTIONS.md). Используйте на занятии **после** того, как студенты попробовали сами.

---

## Содержание

0. [Как проходит собеседование — для преподавателя](#0-как-проходит-собеседование--для-преподавателя)
1. [JavaScript — ответы](#1-javascript--ответы)
2. [TypeScript — ответы](#2-typescript--ответы)
3. [React — ответы](#3-react--ответы)
4. [Браузер, HTTP — ответы](#4-браузер-http--ответы)
5. [Инструменты — ответы](#5-инструменты--ответы)
6. [Алгоритмы — решения](#6-алгоритмы--решения)
7. [Чтение кода — ответы](#7-чтение-кода--ответы)
8. [Live coding — образцы решений](#8-live-coding--образцы-решений)
9. [Поведенческие — ориентиры](#9-поведенческие--ориентиры)

---

## 0. Как проходит собеседование — для преподавателя

### Red flags на junior-собесе

| Сигнал | Почему плохо |
| ------ | ------------ |
| Не может объяснить код в pet-project | Скопировал / AI без понимания |
| Не знает, что делает `useEffect` в его проекте | Hooks «магия» |
| Путает `==` и `===`, не слышал про event loop | Слабая база JS |
| Молчит на live coding | Коммуникация важнее идеального решения |

### Green flags

- Проговаривает мысли и edge cases
- Честно говорит «не знаю», но строит логичную догадку
- Задаёт уточняющие вопросы к задаче
- Pet-project с README и деплоем

---

## 1. JavaScript — ответы

### JS-01 — `let`, `const`, `var`

| | `var` | `let` | `const` |
|--|-------|-------|---------|
| Scope | function | block | block |
| Hoisting | да (undefined) | TDZ | TDZ |
| Переприсвоение | да | да | нет* |

\* `const` не даёт переприсвоить переменную, но объект можно мутировать.

**Temporal Dead Zone** — от начала блока до объявления `let`/`const` переменная недоступна → `ReferenceError`.

---

### JS-02 — `==` vs `===`

`===` сравнивает значение **и тип** без приведения. `==` приводит типы.

```javascript
0 == false;        // true
0 === false;       // false
null == undefined; // true
null === undefined;// false
```

На собесе: «Почти всегда `===`».

---

### JS-03 — Closure

Функция «помнит» переменные внешней области после выхода из неё.

```javascript
function makeMultiplier(factor) {
  return (n) => n * factor;
}
const double = makeMultiplier(2);
double(5); // 10
```

Зачем: приватное состояние, callbacks, фабрики функций.

---

### JS-04 — `this`

Определяется **контекстом вызова**. Arrow function берёт `this` с места создания.

```javascript
const obj = { name: 'Anna', greet() { return this.name; } };
obj.greet(); // 'Anna'
const fn = obj.greet;
fn(); // undefined (strict mode)
obj.greet.call({ name: 'Bob' }); // 'Bob'
```

---

### JS-05 — Event loop

Sync код → **все microtasks** (`Promise.then`) → macrotask (`setTimeout`) → снова microtasks.

```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');
// 1 → 4 → 3 → 2
```

---

### JS-06 — Promise / async-await

Promise — объект асинхронного результата. `async/await` — синтаксис поверх Promise.

- `Promise.all` — все или первая ошибка
- `Promise.allSettled` — все со статусами

---

### JS-07 — Hoisting

`function foo() {}` — hoisted целиком. `var x` — hoisted как `undefined`. `let`/`const` — TDZ до строки объявления.

---

### JS-08 — `map`, `filter`, `reduce`

| Метод | Результат |
| ----- | --------- |
| `map` | новый массив той же длины |
| `filter` | подмножество |
| `reduce` | одно агрегированное значение |

`forEach` — side effects, не возвращает новый массив.

---

### JS-09 — Spread / Rest

Spread разворачивает: `[...a, 3]`. Rest собирает: `function f(...args)`.

---

### JS-10 — `null` vs `undefined`

`undefined` — «не задано». `null` — «намеренно пусто».

---

### JS-11 — Деструктуризация

```javascript
const { name: userName = 'Guest' } = user;
const [first, , third] = arr;
```

---

### JS-12 — `?.` и `??`

`?.` — безопасный доступ. `??` — default только для `null`/`undefined` (не для `0`/`''` как `||`).

---

### JS-13 — Shallow / Deep copy

`[...arr]`, `{ ...obj }` — shallow. `structuredClone(obj)` — deep (с оговорками).

---

### JS-14 — Map / Set

Set — уникальность, O(1) `has`. Map — ключ любого типа, O(1) `get`.

---

### JS-15 — Debounce / Throttle

Debounce — вызов после паузы (поиск). Throttle — не чаще N ms (scroll).

---

## 2. TypeScript — ответы

### TS-01
Ловит ошибки до runtime, автодополнение, контракты API, безопасный рефакторинг.

### TS-02
`interface` — extends, merging. `type` — union, intersection, примитивы. Оба OK для props.

### TS-03
Union: `string | number`. Intersection: `A & B`.

### TS-04
`as` — type assertion, обманывает компилятор. Осторожно.

### TS-05
`any` отключает проверки. `unknown` требует narrowing перед использованием.

### TS-06
```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
```

### TS-07
`Partial<T>`, `Pick<T, K>`, `Omit<T, K>` — utility types для partial/update DTO.

### TS-08
Narrowing: `typeof`, `in`, discriminated unions сужают тип в ветке `if`.

### TS-09
Props через `type`/`interface`. `React.ReactNode` — всё, что можно отрендерить.

### TS-10
Union literals предпочтительнее enum в React: меньше runtime-кода.

---

## 3. React — ответы

### REACT-01
React строит Virtual DOM, diff с предыдущим, минимальные патчи реального DOM.

### REACT-02
Функции + hooks вместо классов: проще, стандарт индустрии с 2019+.

### REACT-03
Hooks только на верхнем уровне и только в React-функциях. `if` ломает порядок hooks.

### REACT-04
`useState` → re-render. `useRef` → `.current` без re-render (DOM, timer id).

### REACT-05
`useEffect` — side effects после render. Cleanup — перед следующим run и unmount.

### REACT-06
Controlled: `value` + `onChange` из state. Uncontrolled: ref к DOM.

### REACT-07
Drilling → composition, Context, state manager.

### REACT-08
`React.memo` — skip re-render при тех же props (shallow). Не везде.

### REACT-09
`useCallback` — memo функции. `useMemo` — memo значения.

### REACT-10
Key — stable id, не index при insert/delete/reorder.

### REACT-11
Router: URL ↔ component. Nested routes + `<Outlet />`.

### REACT-12
State: data / loading / error. `useEffect` + fetch или TanStack Query.

### REACT-13
Server Components — render на сервере, без client JS. `'use client'` — hooks, browser APIs.

### REACT-14
Общий state у ближайшего родителя, props down, callbacks up.

### REACT-15
`<form onSubmit>` + `e.preventDefault()`. `type="submit"` vs `type="button"`.

---

## 4. Браузер, HTTP — ответы

### WEB-01
DNS → TCP/TLS → HTTP → HTML parse → DOM/CSSOM → render → JS.

### WEB-02
HTTPS = HTTP + TLS (шифрование).

### WEB-03
CORS — браузер блокирует cross-origin без `Access-Control-Allow-Origin`.

### WEB-04
GET — читать. POST — создать/отправить body.

### WEB-05
200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error.

### WEB-06
localStorage уязвим к XSS. HttpOnly cookie — JS не читает, нужна защита от CSRF.

### WEB-07
Cookie: `HttpOnly`, `Secure`, `SameSite`.

### WEB-08
`fetch` — native Promises. `axios` — interceptors, удобный API.

### WEB-09
DOM — дерево HTML. React обновляет через reconciliation.

### WEB-10
Semantic HTML, alt, labels, keyboard, контраст.

---

## 5. Инструменты — ответы

### TOOL-01
commit — локальный snapshot. push — на remote.

### TOOL-02
Branch — параллельная разработка. PR — merge + review.

### TOOL-03
package.json — deps и scripts. node_modules — установленные пакеты.

### TOOL-04
dependencies — runtime. devDependencies — dev/test/build.

### TOOL-05
Vite — быстрый ESM dev-server, HMR.

### TOOL-06
ESLint — качество. Prettier — формат.

### TOOL-07
RTL — тестируем поведение пользователя, не implementation details.

### TOOL-08
CI — auto test/lint. CD — auto deploy.

---

## 6. Алгоритмы — решения

### ALGO-01
Big O — рост времени/памяти. Linear search O(n), binary search O(log n).

### ALGO-02
Array — порядок, index O(1). Map — частый lookup по ключу O(1) avg.

### ALGO-03 — sum

```typescript
function sum(nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}
```

### ALGO-04 — findMax

```typescript
function findMax(nums: number[]): number {
  if (!nums.length) throw new Error('empty');
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) max = nums[i];
  }
  return max;
}
```

### ALGO-05 — reverseString

```typescript
function reverseString(s: string): string {
  return [...s].reverse().join('');
}
```

### ALGO-06 — isPalindrome

```typescript
function isPalindrome(s: string): boolean {
  const n = s.toLowerCase();
  let left = 0;
  let right = n.length - 1;
  while (left < right) {
    if (n[left] !== n[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

### ALGO-07 — fizzBuzz

```typescript
function fizzBuzz(n: number): string[] {
  const out: string[] = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) out.push('FizzBuzz');
    else if (i % 3 === 0) out.push('Fizz');
    else if (i % 5 === 0) out.push('Buzz');
    else out.push(String(i));
  }
  return out;
}
```

### ALGO-08 — unique

```typescript
function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}
```

### ALGO-09 — hasPairWithSum

```typescript
function hasPairWithSum(nums: number[], target: number): boolean {
  const seen = new Set<number>();
  for (const n of nums) {
    if (seen.has(target - n)) return true;
    seen.add(n);
  }
  return false;
}
```

### ALGO-10 — charCount

```typescript
function charCount(s: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const char of s) {
    counts[char] = (counts[char] ?? 0) + 1;
  }
  return counts;
}
```

### ALGO-11 — isBalanced

```typescript
function isBalanced(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };
  for (const char of s) {
    if ('([{'.includes(char)) stack.push(char);
    else if (')]}'.includes(char) && stack.pop() !== pairs[char]) return false;
  }
  return stack.length === 0;
}
```

### ALGO-12 — binarySearch

```typescript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

---

## 7. Чтение кода — ответы

### CODE-01
`'object'`, `'object'`, `'number'`

### CODE-02
`false`, `true` (float precision)

### CODE-03
`3, 3, 3`. Fix: `let i` вместо `var i` → `0, 1, 2`

### CODE-04
`start` → `end` → `promise` → `timeout`

### CODE-05
`30` (одна ссылка на объект)

### CODE-06
`1`, `2`, `1` (разные замыкания)

### CODE-07
`3`, `4`

### CODE-08
Баг: `key={index}`. Fix: `key={user.id}`

### CODE-09
Баг: `useEffect` без deps → бесконечный fetch. Fix: `[query]` + debounce

### CODE-10
`false`. Типизация корректна.

---

## 8. Live coding — образцы решений

### LIVE-01 — Counter

```tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button type="button" onClick={() => setCount((c) => c - 1)}>-</button>
      <span>{count}</span>
      <button type="button" onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}
```

### LIVE-02 — TodoInput

```tsx
import { FormEvent, useState } from 'react';

export function TodoInput() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<string[]>([]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos((prev) => [...prev, text.trim()]);
    setText('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, i) => (
          <li key={`${todo}-${i}`}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}
```

### LIVE-03 — useFetch

```typescript
import { useEffect, useState } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then((json: T) => { if (!cancelled) setData(json); })
      .catch((e: Error) => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [url]);

  return { data, loading, error };
}
```

### LIVE-04 — groupBy

```typescript
function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = String(item[key]);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}
```

### LIVE-05 — filterByName

```typescript
function filterByName<T extends { name: string }>(items: T[], query: string): T[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((i) => i.name.toLowerCase().includes(q));
}
```

### LIVE-06 — Button

```tsx
type ButtonProps = {
  variant: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export function Button({ variant, disabled, onClick, children }: ButtonProps) {
  return (
    <button type="button" className={`btn--${variant}`} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
```

### LIVE-07 — Debounced search

```tsx
import { useEffect, useState } from 'react';

export function DebouncedSearch() {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    if (!debounced) return;
    fetch(`/api/search?q=${encodeURIComponent(debounced)}`);
  }, [debounced]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### LIVE-08 — buildTree

```typescript
type Item = { id: string; parentId: string | null; name: string };
type TreeNode = Item & { children: TreeNode[] };

function buildTree(items: Item[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const item of items) {
    map.set(item.id, { ...item, children: [] });
  }
  for (const item of items) {
    const node = map.get(item.id)!;
    if (item.parentId === null) roots.push(node);
    else map.get(item.parentId)?.children.push(node);
  }
  return roots;
}
```

---

## 9. Поведенческие — ориентиры

### SOFT-01 — О себе
Кто ты → стек → что ищешь → 1 достижение. 30–60 секунд.

### SOFT-02 — Почему Frontend / React
Конкретно: визуальный результат, экосистема, опыт в diplom.

### SOFT-03 — Pet-project (STAR)
Situation, Task, Action, Result. Пример: Spotify auth, hooks, deploy.

### SOFT-04 — Конфlict
Проблема → твоё действие → результат → урок. Без обвинений.

### SOFT-05 — Не знаю
Честно + логическая догадка + вопрос уточнения.

### SOFT-06 — Обучение
MDN, React docs, pet-project, алгоритмы, code review.

### SOFT-07 — Code review
Воспринимаю как обучение, уточняю «почему».

### SOFT-08 — Вопросы employer
Стек, onboarding junior, ментор, типичная задача в первый месяц.

---

## Mock interview за 30 мин (шпаргалка)

| Время | Блок |
| ----- | ---- |
| 5 мин | SOFT-01 + SOFT-03 |
| 10 мин | JS-03, JS-05, REACT-03, REACT-05 |
| 10 мин | ALGO-09 + LIVE-01 |
| 5 мин | CODE-04 + CODE-09 |

Если легко — добавить TS-02 и REACT-13 (RSC).
