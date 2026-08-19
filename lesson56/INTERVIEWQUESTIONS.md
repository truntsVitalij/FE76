# Собеседование Junior Frontend (JS + React + TS) — 2026

Вопросы и задачи **без ответов**. Сначала попробуйте ответить сами, потом сверьтесь с [INTERVIEWANSWERS.md](./INTERVIEWANSWERS.md).

> **Уровень:** junior (0–1.5 года коммерческого опыта или сильный pet-project / стажировка).

---

## Содержание

0. [Как проходит собеседование в 2026](#0-как-проходит-собеседование-в-2026)
1. [JavaScript — теория](#1-javascript--теория)
2. [TypeScript — теория](#2-typescript--теория)
3. [React — теория](#3-react--теория)
4. [Браузер, HTTP, сеть](#4-браузер-http-сеть)
5. [Инструменты и процесс](#5-инструменты-и-процесс)
6. [Алгоритмы и структуры данных (junior)](#6-алгоритмы-и-структуры-данных-junior)
7. [Разбор кода на собеседовании](#7-разбор-кода-на-собеседовании)
   - [7A. Что выведет этот код?](#7a-что-выведет-этот-код)
   - [7B. Чему равна переменная?](#7b-чему-равна-переменная)
   - [7C. Где в коде ошибка?](#7c-где-в-коде-ошибка)
   - [7D. Что не так и как исправить?](#7d-что-не-так-и-как-исправить)
   - [7E. Что увидит пользователь?](#7e-что-увидит-пользователь)
8. [Live coding — мини-задачи](#8-live-coding--мини-задачи)
9. [Поведенческие вопросы и проект](#9-поведенческие-вопросы-и-проект)

---

## 0. Как проходит собеседование в 2026

Перед вопросами — **контекст**, который стоит объяснить студентам на занятии.

### Типичные этапы

| Этап | Длительность | Что проверяют |
| ---- | ------------ | ------------- |
| **HR / screening** | 15–30 мин | Мотивация, английский (A2–B1), зарплатные ожидания, локация / remote |
| **Технический скрининг** | 30–45 мин | JS/React/TS база, иногда 1–2 простые задачи |
| **Основное тех. интервью** | 60–90 мин | Теория + live coding + разбор pet-project |
| **Live coding / test** | 30–60 мин | Задача в редакторе (CoderPad, HackerRank, Google Doc) |
| **Финал с тимлидом** | 30–60 мин | Культура, архитектурное мышление, fit в команду |

> Не все компании проходят все этапы. Стартап может уложиться в **2 созвона**, банк или продукт — в **3–4**.

### Что изменилось к 2026 году (важно для джунов)

| Тренд | Что это значит на собесе |
| ----- | ------------------------ |
| **React 19 + Server Components** | Спрашивают «Client vs Server Component», `'use client'`, когда RSC уместен |
| **TypeScript по умолчанию** | «Знаешь JS, TS выучишь» — реже; базовые типы, `interface` vs `type` — must have |
| **AI-инструменты (Cursor, Copilot)** | Не запрещают, но просят **объяснить код**, который написали; copy-paste без понимания — red flag |
| **Меньше «leetcode hard» для junior** | Чаще Easy + практика: массивы, строки, `Map`/`Set`, иногда FizzBuzz / palindrome |
| **Портfolio / GitHub** | Pet-project с README, деплоем и 2–3 скринами — сильный плюс |
| **Soft skills** | Коммуникация при решении задачи важнее «молчаливого гения» |

### Форматы задач на junior

```
┌─────────────────────────────────────────────────────────┐
│  ~40%  Теория (устно): замыкания, hooks, event loop     │
│  ~25%  Чтение кода: что выведет, найди баг              │
│  ~25%  Live coding: 1–2 задачи Easy за 20–40 мин        │
│  ~10%  Проект: расскажи, как сделал auth / fetch        │
└─────────────────────────────────────────────────────────┘
```

### Советы перед собесом

- [ ] Повтори **event loop**, **hooks rules**, **== vs ===**, **Promise**
- [ ] Реши **5–10 Easy** на LeetCode / Codewars (массивы, строки, hash map)
- [ ] Подготовь **2-минутный питч** о себе и **5 мин** про pet-project
- [ ] Открой diplom / pet-project — будь готов показать код и объяснить решения
- [ ] На live coding **проговаривай вслух**, что делаешь

---

## 1. JavaScript — теория

### JS-01
Чем `let`, `const` и `var` отличаются? Что такое Temporal Dead Zone?

### JS-02
Чем `==` отличается от `===`? Приведи пример неочевидного сравнения.

### JS-03
Что такое замыкание (closure)? Зачем оно нужно в JavaScript?

### JS-04
Объясни, как работает `this` в JavaScript. Чем отличается обычный вызов функции от вызова через `.call()` / `.bind()`?

### JS-05
Что такое event loop? Чем microtask отличается от macrotask? Какой порядок выполнения в примере с `setTimeout` и `Promise`?

### JS-06
Чем `Promise` отличается от `async/await`? Что такое `Promise.all` и `Promise.allSettled`?

### JS-07
Что такое hoisting? Что «поднимается» для `function declaration` и для `const fn = () => {}`?

### JS-08
Чем отличаются `map`, `filter`, `reduce`? Когда использовать `for...of`, а когда `forEach`?

### JS-09
Что такое spread (`...`) и rest (`...`)? Приведи по одному примеру.

### JS-10
Чем `null` отличается от `undefined`? Когда что использовать?

### JS-11
Что такое деструктуризация? Как задать значение по умолчанию и переименовать переменную?

### JS-12
Что такое optional chaining (`?.`) и nullish coalescing (`??`)? Чем `??` отличается от `||`?

### JS-13
Объясни разницу между **shallow copy** и **deep copy**. Как скопировать массив «на один уровень»?

### JS-14
Что такое `Map` и `Set`? Когда они лучше, чем `Object` и `Array`?

### JS-15
Что такое debounce и throttle? Где применяют на Frontend?

---

## 2. TypeScript — теория

### TS-01
Зачем нужен TypeScript, если есть JavaScript?

### TS-02
Чем `interface` отличается от `type`? Когда что выбрать?

### TS-03
Что такое `union type` и `intersection type`? Приведи примеры.

### TS-04
Что делает оператор `as`? Чем опасен type assertion?

### TS-05
Чем `unknown` отличается от `any`? Когда использовать `unknown`?

### TS-06
Что такое `generics`? Напиши сигнатуру функции `function first<T>(arr: T[]): T | undefined`.

### TS-07
Что такое `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`? Зачем они нужны?

### TS-08
Что такое narrowing (сужение типов)? Как TypeScript понимает тип после `if (typeof x === 'string')`?

### TS-09
Как типизировать props React-компонента? Что такое `React.ReactNode`?

### TS-10
Что такое `enum`? Почему во многих React-проектах предпочитают union of literals?

---

## 3. React — теория

### REACT-01
Что такое React и зачем нужен Virtual DOM (упрощённо)?

### REACT-02
Чем функциональный компонент отличается от классового? Почему в 2026 почти везде функции?

### REACT-03
Перечисли правила Hooks. Почему нельзя вызывать `useState` внутри `if`?

### REACT-04
Чем `useState` отличается от `useRef`? Когда нужен ref вместо state?

### REACT-05
Для чего нужен `useEffect`? Что такое cleanup-функция?

### REACT-06
Чем controlled input отличается от uncontrolled?

### REACT-07
Что такое props drilling? Какие способы решения знаешь (Context, composition)?

### REACT-08
Что делает `React.memo`? Когда мемоизация **не** нужна?

### REACT-09
Чем `useCallback` отличается от `useMemo`?

### REACT-10
Что такое key в списке? Почему плохо использовать index как key?

### REACT-11
Как работает React Router (или аналог)? Что такое nested routes?

### REACT-12
Как загрузить данные с API в React? Где хранить loading / error / data?

### REACT-13
Что такое Client Component и Server Component (React 19 / Next.js)? Когда нужна директива `'use client'`?

### REACT-14
Что такое lifting state up?

### REACT-15
Как обработать форму в React? Чем нативный submit отличается от `onClick` на кнопке без type?

---

## 4. Браузер, HTTP, сеть

### WEB-01
Что происходит, когда пользователь вводит URL и нажимает Enter (упрощённо)?

### WEB-02
Чем HTTP отличается от HTTPS?

### WEB-03
Что такое CORS? Почему браузер блокирует запрос с `localhost:3000` на другой домен?

### WEB-04
Какие HTTP-методы знаешь? Чем GET отличается от POST?

### WEB-05
Что такое статус-коды 200, 201, 400, 401, 403, 404, 500?

### WEB-06
Где хранят JWT / токен на Frontend? Какие риски у `localStorage`?

### WEB-07
Что такое cookie? Чем `HttpOnly` и `Secure` важны для безопасности?

### WEB-08
Что делает `fetch`? Чем отличается от `axios` (общие слова)?

### WEB-09
Что такое DOM? Как React связан с реальным DOM?

### WEB-10
Что такое accessibility (a11y)? Назови 2–3 базовых правила.

---

## 5. Инструменты и процесс

### TOOL-01
Для чего нужен Git? Чем `commit` отличается от `push`?

### TOOL-02
Что такое ветка (branch)? Как работает Pull Request?

### TOOL-03
Что делает `npm` / `pnpm` / `yarn`? Что такое `package.json` и `node_modules`?

### TOOL-04
Чем dev-dependency отличается от dependency?

### TOOL-05
Что такое Vite? Чем лучше старого Webpack для pet-project (кратко)?

### TOOL-06
Что такое ESLint и Prettier?

### TOOL-07
Что такое unit-тест? Чем RTL (React Testing Library) отличается от тестирования implementation details?

### TOOL-08
Что такое CI/CD одной фразой?

---

## 6. Алгоритмы и структуры данных (junior)

> Подробная теория — [lesson55](../lesson55/ALGORITHMSREADME.md).

### ALGO-01
Что такое Big O? Какая сложность у linear search и binary search?

### ALGO-02
Чем массив (`Array`) удобен, а когда лучше `Map`?

### ALGO-03
**Задача:** вернуть сумму всех чисел в массиве.

```typescript
// sum([1, 2, 3]) → 6
function sum(nums: number[]): number {
  // ваш код
}
```

### ALGO-04
**Задача:** найти максимум в массиве (без `Math.max`).

```typescript
function findMax(nums: number[]): number {
  // ваш код
}
```

### ALGO-05
**Задача:** развернуть строку.

```typescript
// reverseString('hello') → 'olleh'
function reverseString(s: string): string {
  // ваш код
}
```

### ALGO-06
**Задача:** проверить, является ли строка палиндромом.

```typescript
// isPalindrome('racecar') → true
// isPalindrome('hello') → false
function isPalindrome(s: string): boolean {
  // ваш код
}
```

### ALGO-07
**Задача:** FizzBuzz для числа n (вернуть массив строк от 1 до n).

```typescript
// fizzBuzz(5) → ['1','2','Fizz','4','Buzz']
function fizzBuzz(n: number): string[] {
  // ваш код
}
```

### ALGO-08
**Задача:** убрать дубликаты из массива.

```typescript
// unique([1, 2, 2, 3, 1]) → [1, 2, 3]
function unique<T>(arr: T[]): T[] {
  // ваш код
}
```

### ALGO-09
**Задача:** две sum — есть ли в массиве два числа с заданной суммой?

```typescript
// hasPairWithSum([2, 7, 11, 15], 9) → true  (2 + 7)
function hasPairWithSum(nums: number[], target: number): boolean {
  // ваш код
}
```

### ALGO-10
**Задача:** подсчитать частоту символов в строке (вернуть `Map` или объект).

```typescript
// charCount('aab') → { a: 2, b: 1 }
function charCount(s: string): Record<string, number> {
  // ваш код
}
```

### ALGO-11
**Задача:** проверить сбалансированность скобок `()[]{}`.

```typescript
function isBalanced(s: string): boolean {
  // ваш код
}
```

### ALGO-12
**Задача:** бинарный поиск — индекс элемента в **отсортированном** массиве или -1.

```typescript
function binarySearch(arr: number[], target: number): number {
  // ваш код
}
```

---

## 7. Разбор кода на собеседовании

На junior-собесах часто дают **короткий фрагмент** и спрашивают:

| Тип задачи | Формулировка | Что проверяют |
| ---------- | ------------ | ------------- |
| **Output** | «Что выведет `console.log`?» | Event loop, типы, приведения |
| **Variable** | «Чему равна `x` после выполнения?» | Пошаговое выполнение, scope |
| **Bug hunt** | «Найди ошибку / баг» | React, мутации, hooks |
| **Behavior** | «Что увидит пользователь?» | UI + state + async |

> **Совет:** проговаривайте вслух: «Сначала sync, потом microtask…» — так видно мышление даже при ошибке.

---

### 7A. Что выведет этот код?

### CODE-01 · Вывод · `typeof`
```javascript
console.log(typeof null);
console.log(typeof []);
console.log(typeof NaN);
```

### CODE-02 · Вывод · float
```javascript
console.log(0.1 + 0.2 === 0.3);
console.log(Number((0.1 + 0.2).toFixed(1)) === 0.3);
```

### CODE-03 · Вывод · closure + var
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// что выведет? как исправить на 0, 1, 2?
```

### CODE-04 · Вывод · event loop
```javascript
console.log('start');
setTimeout(() => console.log('timeout'), 0);
Promise.resolve().then(() => console.log('promise'));
console.log('end');
// порядок?
```

### CODE-05 · Вывод · ссылка на объект
```javascript
const user = { name: 'Anna', age: 25 };
const copy = user;
copy.age = 30;
console.log(user.age);
```

### CODE-06 · Вывод · closure
```javascript
function createCounter() {
  let count = 0;
  return () => ++count;
}
const a = createCounter();
const b = createCounter();
console.log(a());
console.log(a());
console.log(b());
```

### CODE-07 · Вывод · map vs push
```typescript
const arr = [1, 2, 3];
const doubled = arr.map((x) => x * 2);
arr.push(4);
console.log(doubled.length);
console.log(arr.length);
```

### CODE-10 · Вывод · TypeScript union
```typescript
type Role = 'admin' | 'user';

function canEdit(role: Role): boolean {
  return role === 'admin';
}

const r: Role = 'user';
console.log(canEdit(r));
```

### CODE-11 · Вывод · `++` prefix/postfix
```javascript
let a = 1;
let b = a++;
let c = ++a;
console.log(a, b, c);
```

### CODE-12 · Вывод · spread массива
```javascript
const arr1 = [1, 2];
const arr2 = [...arr1, 3];
arr1.push(99);
console.log(arr2);
console.log(arr1);
```

### CODE-13 · Вывод · spread объектов
```javascript
const defaults = { theme: 'light', lang: 'en' };
const user = { lang: 'ru', name: 'Anna' };
const settings = { ...defaults, ...user };
console.log(settings.theme);
console.log(settings.lang);
console.log(settings.name);
```

### CODE-14 · Вывод · async порядок
```javascript
console.log('A');
async function test() {
  console.log('B');
  await Promise.resolve();
  console.log('C');
}
test();
console.log('D');
```

### CODE-15 · Вывод · map/filter
```javascript
const result = [1, 2, 3, 4, 5]
  .filter((x) => x % 2 === 0)
  .map((x) => x * 10);
console.log(result);
```

### CODE-16 · Вывод · `||` vs `??`
```javascript
console.log(0 || 'default');
console.log(0 ?? 'default');
console.log('' ?? 'default');
console.log(null ?? 'default');
```

### CODE-17 · Вывод · `&&` и `||`
```javascript
console.log(true && 'hello');
console.log(false && 'hello');
console.log('' || 'fallback');
console.log('ok' || 'fallback');
```

### CODE-18 · Вывод · hoisting
```javascript
console.log(x);
var x = 5;
console.log(x);
```

### CODE-19 · Вывод · sort без compareFn
```javascript
const nums = [10, 1, 2];
console.log(nums.sort());
```

### CODE-20 · Вывод · JSON и ссылки
```javascript
const obj = { a: 1, nested: { b: 2 } };
const copy = JSON.parse(JSON.stringify(obj));
copy.nested.b = 99;
console.log(obj.nested.b);
console.log(copy.nested.b);
```

---

### 7B. Чему равна переменная?

### VAR-01 · Destructuring + default
```javascript
const { a = 1, b = 2 } = { a: 10 };
// a = ?   b = ?
```

### VAR-02 · Rest
```javascript
const [first, ...rest] = [1, 2, 3, 4];
// first = ?   rest = ?
```

### VAR-03 · Closure + let в цикле
```javascript
const funcs = [];
for (let i = 0; i < 3; i++) {
  funcs.push(() => i);
}
// funcs[0](), funcs[1](), funcs[2]() — ?
```

### VAR-04 · Shallow copy
```javascript
const original = { items: [1, 2] };
const clone = { ...original };
clone.items.push(3);
// original.items.length = ?
// clone.items.length = ?
```

### VAR-05 · reduce без initial value
```javascript
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n);
// sum = ?
```

### VAR-06 · Optional chaining
```javascript
const user = { profile: null };
const city = user.profile?.address?.city ?? 'Unknown';
// city = ?
```

### VAR-07 · Template literal
```javascript
const count = 3;
const msg = `Total: ${count + 2}`;
// msg = ?
```

### VAR-08 · parseInt
```javascript
const a = parseInt('08', 10);
const b = parseInt('0x10', 10);
// a = ?   b = ?
```

### VAR-09 · Set
```javascript
const set = new Set([1, 1, 2, 3, 3]);
// set.size = ?
```

### VAR-10 · Map
```javascript
const map = new Map([['id', 42]]);
map.set('id', 100);
const x = map.get('id');
// x = ?
```

### VAR-11 · TypeScript overload paths
```typescript
function len(x: string | string[]) {
  if (typeof x === 'string') return x.length;
  return x.length;
}
// len('abc') = ?
// len(['a', 'b']) = ?
```

### VAR-12 · Stack operations
```javascript
const stack = [1, 2, 3];
const top = stack.pop();
stack.push(4);
// top = ?   stack = ?
```

### VAR-13 · После destructuring rename
```javascript
const user = { name: 'Anna', age: 25 };
const { name: userName, age } = user;
// userName = ?   age = ?
```

### VAR-14 · Logical assignment
```javascript
let config = { retries: 0 };
config.retries ||= 3;
config.timeout ??= 5000;
// config.retries = ?   config.timeout = ?
```

---

### 7C. Где ошибка в коде?

### BUG-01 · React · key={index}
```tsx
function UserList({ users }: { users: { id: number; name: string }[] }) {
  return (
    <ul>
      {users.map((user, index) => (
        <li key={index}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### BUG-02 · React · useEffect без deps
```tsx
function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/api/search?q=${query}`)
      .then((r) => r.json())
      .then(setResults);
  });

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

### BUG-03 · React · мутация state
```tsx
function TodoList() {
  const [todos, setTodos] = useState(['Learn React']);

  function addTodo(text: string) {
    todos.push(text);
    setTodos(todos);
  }

  return <button onClick={() => addTodo('New')}>Add</button>;
}
```

### BUG-04 · React · fetch в теле компонента
```tsx
function Profile({ userId }: { userId: string }) {
  const [user, setUser] = useState<{ name: string } | null>(null);

  const loadUser = async () => {
    const res = await fetch(`/api/users/${userId}`);
    setUser(await res.json());
  };

  loadUser();

  return <div>{user?.name}</div>;
}
```

### BUG-05 · React · stale closure в setInterval
```tsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <div>{count}</div>;
}
```

### BUG-06 · React · value + defaultValue
```tsx
function NameForm() {
  const [name, setName] = useState('Anna');

  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value.toUpperCase())}
      defaultValue="Bob"
    />
  );
}
```

### BUG-07 · JS · сравнение объектов
```javascript
const a = { id: 1 };
const b = { id: 1 };

if (a === b) {
  console.log('same');
} else {
  console.log('different');
}
// баг логики или ожидаемое поведение?
```

### BUG-08 · JS · async forEach
```javascript
async function loadAll(urls: string[]) {
  const results: string[] = [];

  urls.forEach(async (url) => {
    const res = await fetch(url);
    results.push(await res.text());
  });

  return results;
}
```

### BUG-09 · TS · опечатка скрыта any
```typescript
function getLength(value: any) {
  return value.lenght;
}
```

### BUG-10 · fetch без res.ok
```typescript
async function loadUser(id: string) {
  const res = await fetch(`/api/users/${id}`);
  const data = await res.json();
  return data;
}
```

### BUG-11 · React · key + uncontrolled input
```tsx
function EditableList({ items }: { items: string[] }) {
  const [list, setList] = useState(items);

  function remove(index: number) {
    setList(list.filter((_, i) => i !== index));
  }

  return (
    <ul>
      {list.map((item, index) => (
        <li key={index}>
          <input defaultValue={item} />
          <button onClick={() => remove(index)}>×</button>
        </li>
      ))}
    </ul>
  );
}
```

### BUG-12 · useMemo + mutating sort
```tsx
function ExpensiveList({ items }: { items: string[] }) {
  const sorted = useMemo(() => items.sort(), [items]);
  return sorted.map((item) => <div key={item}>{item}</div>);
}
```

### BUG-13 · React · прямой доступ к DOM
```tsx
function AutoFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  inputRef.current?.focus();

  return <input ref={inputRef} />;
}
```

### BUG-14 · setState batching misconception
```tsx
function Counter() {
  const [n, setN] = useState(0);

  function handleClick() {
    setN(n + 1);
    setN(n + 1);
    console.log(n);
  }

  return <button onClick={handleClick}>{n}</button>;
}
// после одного клика: n на экране = ?  console.log = ?
```

---

### 7D. Что не так и как исправить?

Назови проблему **и** покажи минимальный fix.

### FIX-01 · form submit
```tsx
function LoginForm() {
  const handleSubmit = () => {
    login();
  };

  return (
    <form>
      <input type="email" />
      <button onClick={handleSubmit}>Sign in</button>
    </form>
  );
}
```

### FIX-02 · optional email
```typescript
interface User {
  id: string;
  name: string;
  email?: string;
}

function sendEmail(user: User) {
  console.log(user.email.toLowerCase());
}
```

### FIX-03 · null data на первом render
```tsx
const [data, setData] = useState<{ items: unknown[] } | null>(null);

useEffect(() => {
  fetch('/api/playlists')
    .then((r) => r.json())
    .then(setData);
}, []);

return <h1>{data.items.length} playlists</h1>;
```

### FIX-04 · мутация входного массива
```javascript
function doubleValues(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
  }
  return arr;
}

const original = [1, 2, 3];
const result = doubleValues(original);
```

### FIX-05 · типизация + memo
```tsx
function Parent() {
  const [count, setCount] = useState(0);
  return <Child onIncrement={() => setCount(count + 1)} count={count} />;
}

const Child = ({ onIncrement, count }) => (
  <button onClick={onIncrement}>{count}</button>
);
```

---

### 7E. Что увидит пользователь?

Опиши UI **до и после** клика, effect или async.

### BEHAV-01
```tsx
function Greeting() {
  const [name, setName] = useState('');

  useEffect(() => {
    setName('Anna');
  }, []);

  return <h1>Hello, {name || 'Guest'}!</h1>;
}
// первый render → ?   после effect → ?
```

### BEHAV-02
```tsx
function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  function toggle() {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  }

  return <button onClick={toggle}>{likes}</button>;
}
// клик 1 раз при likes=0 — что на кнопке?
```

### BEHAV-03
```tsx
function Users() {
  const [users, setUsers] = useState<{ name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then((r) => r.json())
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!users.length) return <p>No users</p>;
  return <ul>{users.map((u) => <li key={u.name}>{u.name}</li>)}</ul>;
}
// что видит пользователь: сразу / через 1 сек (данные пришли) / если массив пуст?
```

---

## 8. Live coding — мини-задачи

Задачи, которые часто дают **на 15–25 минут** в редакторе.

### LIVE-01
Напиши компонент `Counter`: кнопки `+` и `-`, число по центру. Состояние только внутри компонента.

### LIVE-02
Напиши компонент `TodoInput`: поле ввода + кнопка «Add». По submit добавляет задачу в список (state — массив строк).

### LIVE-03
Напиши хук `useFetch<T>(url: string)`, который возвращает `{ data, loading, error }`.

### LIVE-04
Напиши функцию `groupBy<T>(arr: T[], key: keyof T): Record<string, T[]>`.

```typescript
groupBy(
  [
    { type: 'fruit', name: 'apple' },
    { type: 'fruit', name: 'banana' },
    { type: 'veg', name: 'carrot' },
  ],
  'type',
);
// → { fruit: [...], veg: [...] }
```

### LIVE-05
Отфильтровать массив пользователей по строке поиска (по полю `name`, без учёта регистра).

### LIVE-06
Компонент `Button`: props `variant: 'primary' | 'secondary'`, `disabled`, `onClick`. С TypeScript.

### LIVE-07
Debounced search: при вводе в input запрос уходит через 300 ms после последнего символа.

### LIVE-08
Преобразовать массив `{ id, parentId }` в дерево (1 уровень вложенности достаточно для junior).

---

## 9. Поведенческие вопросы и проект

### SOFT-01
Расскажи о себе за 2 минуты (формат для HR).

### SOFT-02
Почему Frontend? Почему React?

### SOFT-03
Расскажи о pet-project / diplom: что делал **лично ты**, какие технологии, какие сложности.

### SOFT-04
Был ли конфликт в команде / на учёбе? Как решил?

### SOFT-05
Что делать, если не знаешь ответ на технический вопрос на собесе?

### SOFT-06
Как ты учишь новое? Что смотрел / читал за последний месяц?

### SOFT-07
Готов ли к code review? Как относишься к замечаниям?

### SOFT-08
Какие вопросы **ты** задашь работодателю?

---

## Чеклист готовности к mock interview

- [ ] Ответил на 80% блоков §1–§3 без подсказок
- [ ] Решил §6 ALGO-03 — ALGO-12 на TypeScript
- [ ] Объяснил §7A (вывод), §7B (переменные), §7C (баги), §7D–§7E
- [ ] Написал LIVE-01 и LIVE-03 за 30 минут
- [ ] Подготовил рассказ про проект (SOFT-03)

**Ответы:** [INTERVIEWANSWERS.md](./INTERVIEWANSWERS.md)
