# Структуры данных: от массива до дерева

Материал для занятия: **структуры данных** в JavaScript/TypeScript — массивы, `Set`, `Map`, `WeakMap`, стек, очередь, куча, деревья — с **примерами кода**, таблицами **Big O** и ссылками на **визуализации**.

> **Одной фразой:** алгоритм — это **что делать**; структура данных — **где хранить** данные, чтобы алгоритм работал быстро. Плохая структура превращает O(log n) в O(n).

Полный разбор сортировок и поисков — в [ALGORITHMSREADME.md](./ALGORITHMSREADME.md).

---

## Содержание

1. [Структура данных vs алгоритм](#структура-данных-vs-алгоритм)
2. [Big O для структур данных](#big-o-для-структур-данных)
3. [List — список (массив)](#list--список-массив)
4. [Set — множество уникальных значений](#set--множество-уникальных-значений)
5. [Map и WeakMap — словарь по ключу](#map-и-weakmap--словарь-по-ключу)
6. [Хэш-таблица — как работает Map под капотом](#хэш-таблица--как-работает-map-под-капотом)
7. [Стек (Stack) — LIFO](#стек-stack--lifo)
8. [Очередь (Queue) — FIFO](#очередь-queue--fifo)
9. [Куча (Heap) — приоритетная очередь](#куча-heap--приоритетная-очередь)
10. [Деревья (Trees)](#деревья-trees)
11. [Базовые алгоритмы и структуры](#базовые-алгоритмы-и-структуры)
12. [Что выбрать на Frontend](#что-выбрать-на-frontend)
13. [Мини-задачи для практики](#мини-задачи-для-практики)
14. [Полезные ссылки с визуализациями](#полезные-ссылки-с-визуализациями)
15. [Краткий словарь](#краткий-словарь)

---

## Структура данных vs алгоритм

| | **Структура данных** | **Алгоритм** |
|--|----------------------|--------------|
| Вопрос | Где и как **хранить**? | Как **обработать**? |
| Пример | `Map`, массив, дерево | binary search, sort |
| Аналогия | Полка, шкаф, картотека | Рецепт приготовления |

```
Задача: «Найти пользователя по id среди 50 000 записей»

Плохо:  массив + linear search каждый раз     → O(n) на каждый клик
Хорошо: Map<id, user> + map.get(id)         → O(1) в среднем
```

### Основные группы структур

| Группа | Примеры | Главная идея |
|--------|---------|--------------|
| **Линейные** | массив, связный список, стек, очередь | Элементы в «линию» |
| **Ассоциативные** | хэш-таблица, `Map`, `Object` | Ключ → значение |
| **Множества** | `Set`, `WeakSet` | Только уникальные значения |
| **Иерархические** | дерево, куча | Родитель → дети |
| **Графы** | nodes + edges | Связи «кто с кем» |

---

## Big O для структур данных

Big O описывает, **как растёт время** при увеличении количества элементов `n`. Подробнее — в [ALGORITHMSREADME.md § Big O](./ALGORITHMSREADME.md#big-o--как-измерять-скорость).

### Сводная таблица операций

| Структура | Доступ / поиск | Вставка | Удаление | Примечание |
|-----------|----------------|---------|----------|------------|
| **Array (List)** | O(1) по индексу, O(n) по значению | O(1)* в конец, O(n) в середину | O(n) | *амортизированно |
| **Linked List** | O(n) | O(1) в начало | O(1) в начало | В JS редко пишут вручную |
| **Stack** | O(n) peek top | O(1) push | O(1) pop | Только с «вершины» |
| **Queue** | O(n) peek front | O(1) enqueue | O(1) dequeue | Только с «головы/хвоста» |
| **Hash Table / Map** | O(1) avg, O(n) worst | O(1) avg | O(1) avg | Зависит от hash-коллизий |
| **Set** | O(1) avg `has` | O(1) avg `add` | O(1) avg `delete` | Без дубликатов |
| **Binary Search Tree** | O(log n) avg, O(n) worst | O(log n) avg | O(log n) avg | Нужен баланс (AVL, Red-Black) |
| **Heap** | O(1) min/max | O(log n) insert | O(log n) extract | Не полная сортировка |
| **Sort (Array.sort)** | — | — | — | O(n log n) |

### Как читать таблицу джуну

```
O(1)      — «мгновенно», не зависит от размера
O(log n)  — «быстро даже на больших данных» (1 млн → ~20 шагов)
O(n)      — «пройти всё один раз» — норм для одного прохода
O(n²)     — «каждый с каждым» — на 10 000 уже тяжело
```

**Визуализация Big O:** [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) · [VisuAlgo — Recursion Tree / complexity](https://visualgo.net/en)

---

## List — список (массив)

**List (список)** — упорядоченная последовательность элементов с доступом по **индексу**.

В JavaScript основной List — это **`Array`**.

```
index:  0    1    2    3
      ┌────┬────┬────┬────┐
      │ 'A'│ 'B'│ 'C'│ 'D'│
      └────┴────┴────┴────┴────
```

### Базовые операции

```typescript
const tracks = ['Song A', 'Song B', 'Song C'];

tracks[0];              // O(1) — доступ по индексу
tracks.push('Song D');  // O(1)* — в конец
tracks.unshift('Intro'); // O(n) — в начало (сдвиг всех)
tracks.pop();           // O(1) — с конца
tracks.splice(1, 1);    // O(n) — удаление из середины

tracks.indexOf('Song B'); // O(n) — линейный поиск
tracks.includes('Song B'); // O(n)
```

### List vs Linked List (связный список)

| | **Array (динамический массив)** | **Linked List** |
|--|--------------------------------|-----------------|
| Память | Непрерывный блок | Узлы `{ value, next }` |
| Доступ по индексу | O(1) | O(n) |
| Вставка в начало | O(n) | O(1) |
| В JS | `Array` — всегда | Почти не используют |

**Визуализация:** [VisuAlgo — Linked List](https://visualgo.net/en/list) · [VisuAlgo — Array](https://visualgo.net/en/array)

### Простая реализация связного списка (для понимания)

```typescript
class ListNode<T> {
  constructor(
    public value: T,
    public next: ListNode<T> | null = null,
  ) {}
}

class LinkedList<T> {
  head: ListNode<T> | null = null;

  prepend(value: T): void {
    this.head = new ListNode(value, this.head);
  }

  find(value: T): ListNode<T> | null {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

const list = new LinkedList<number>();
list.prepend(3);
list.prepend(2);
list.prepend(1);
console.log(list.toArray()); // [1, 2, 3]
```

### List на Frontend

```typescript
// список карточек — порядок важен
const playlist = ['track-1', 'track-2', 'track-3'];

// map/filter — O(n), создают новый массив
const visible = items.filter((item) => item.isPublished);

// не мутируй state напрямую — spread / map
setItems((prev) => [...prev, newItem]);
```

---

## Set — множество уникальных значений

**Set** хранит только **уникальные** значения. Порядок вставки сохраняется (в ES2015+).

```
Set { 'react', 'typescript', 'vite' }
      ↑
  повторный add('react') — игнорируется
```

### Базовые операции

```typescript
const tags = new Set<string>();

tags.add('frontend');    // O(1) avg
tags.add('react');
tags.add('frontend');    // дубликат — не добавится

tags.has('react');       // O(1) avg — true
tags.delete('react');    // O(1) avg
tags.size;               // 1

// из массива — убрать дубликаты за O(n)
const uniqueIds = [...new Set([1, 2, 2, 3, 3, 3])]; // [1, 2, 3]
```

### Операции над множествами

```typescript
function union<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a, ...b]);
}

function intersection<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter((x) => b.has(x)));
}

function difference<T>(a: Set<T>, b: Set<T>): Set<T> {
  return new Set([...a].filter((x) => !b.has(x)));
}

const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

console.log([...intersection(a, b)]); // [2, 3]
console.log([...difference(a, b)]);   // [1]
```

### Set vs Array

| Задача | Array | Set |
|--------|-------|-----|
| Порядок + дубликаты нужны | ✅ | ❌ |
| Проверить «уже видели?» | O(n) `includes` | O(1) `has` |
| Уникальные id посетителей | `[...new Set(arr)]` | ✅ |

### WeakSet (кратко)

```typescript
const cache = new WeakSet<object>();

const node = document.createElement('div');
cache.add(node);
cache.has(node); // true

// ключи — только объекты
// не итерируется, не имеет .size
// GC может удалить объект — запись исчезнет сама
```

**Когда:** пометить DOM-узлы / объекты без утечки памяти.  
**Документация:** [MDN — WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet)

---

## Map и WeakMap — словарь по ключу

**Map** — коллекция пар **ключ → значение**. Ключом может быть **любой тип** (в отличие от plain object).

```
Map {
  'user:1'  → { name: 'Anna' }
  'user:42' → { name: 'Bob' }
}
```

### Map — базовые операции

```typescript
const users = new Map<string, { name: string; email: string }>();

users.set('1', { name: 'Anna', email: 'a@test.com' }); // O(1) avg
users.get('1');   // O(1) avg
users.has('42');  // O(1) avg
users.delete('1');
users.size;

// итерация
for (const [id, user] of users) {
  console.log(id, user.name);
}

// из массива пар
const map = new Map([
  ['a', 1],
  ['b', 2],
]);
```

### Map vs Object

| | `Map` | `Object` |
|--|-------|----------|
| Ключи | любой тип | string / Symbol |
| Порядок ключей | порядок вставки | частично* |
| Размер | `.size` | вручную |
| Итерация | `for...of` | `Object.keys` |
| JSON | ❌ | ✅ |
| Прототип | чистая map | может наследовать |

\* Для string-ключей порядок в современных движках предсказуем, но `Map` надёжнее для «словаря».

### Практика на Frontend

```typescript
// индекс для быстрого поиска O(1) вместо find O(n)
type Track = { id: string; title: string };

function indexById(tracks: Track[]): Map<string, Track> {
  return new Map(tracks.map((t) => [t.id, t]));
}

const byId = indexById(tracks);
const track = byId.get('track-42');

// подсчёт частоты слов
function wordCount(text: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const word of text.toLowerCase().split(/\s+/)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return counts;
}
```

### WeakMap

```typescript
const privateData = new WeakMap<object, { token: string }>();

class ApiClient {
  constructor(token: string) {
    privateData.set(this, { token });
  }

  getAuthHeader(): string {
    const data = privateData.get(this);
    return `Bearer ${data?.token ?? ''}`;
  }
}

// ключ — только объект
// нельзя перебрать, нет .size
// когда объект удалён GC — запись исчезает
```

| Map | WeakMap |
|-----|---------|
| Любые ключи | Только объекты |
| `.size`, итерация | Нет |
| Держит ключ «живым» | Не мешает GC |
| Кэш, индексы, счётчики | «Приватные» поля, метаданные DOM |

**Документация:** [MDN — Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) · [MDN — WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap)

---

## Хэш-таблица — как работает Map под капотом

**Хэш-таблица (Hash Table)** — структура «ключ → значение» с **быстрым доступом** через **хэш-функцию**.

`Map` и `Set` в JavaScript реализованы **на основе хэш-таблицы** (детали — внутри движка V8/SpiderMonkey).

### Как это работает (упрощённо)

```
ключ "user:42"
      │
      ▼
 hash("user:42") → 7382 → bucket[7382 % size]
      │
      ▼
┌─────────────────────────────────────┐
│ bucket │ bucket │ bucket │ bucket │...
│  [...]  │ [pair] │  [...]  │  [...]  │
└─────────────────────────────────────┘
         ↑
    { key: 'user:42', value: {...} }
```

1. **Hash function** — превращает ключ в число (индекс).
2. **Bucket** — «ячейка» в массиве, куда кладём пару.
3. **Collision (коллизия)** — разные ключи → один bucket. Решения: **chaining** (список в ячейке) или **open addressing**.

### Наглядная анимация

| Ресурс | Ссылка |
|--------|--------|
| VisuAlgo — Hash Table | [visualgo.net/en/hashtable](https://visualgo.net/en/hashtable) |
| USFCA — Closed Hashing | [ClosedHash](https://www.cs.usfca.edu/~galles/visualization/ClosedHash.html) |
| USFCA — Open Hashing | [OpenHash](https://www.cs.usfca.edu/~galles/visualization/OpenHash.html) |
| Wikipedia | [Hash table](https://en.wikipedia.org/wiki/Hash_table) |

### Упрощённая учебная реализация

```typescript
class SimpleHashMap<K extends string, V> {
  private buckets: Array<Array<[K, V]>> = [];
  private capacity = 16;

  private hash(key: K): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    if (!this.buckets[index]) this.buckets[index] = [];

    const bucket = this.buckets[index];
    const existing = bucket.find(([k]) => k === key);
    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
    }
  }

  get(key: K): V | undefined {
    const bucket = this.buckets[this.hash(key)];
    return bucket?.find(([k]) => k === key)?.[1];
  }
}

const map = new SimpleHashMap<string, number>();
map.set('apple', 5);
map.set('banana', 3);
console.log(map.get('apple')); // 5
```

### Почему worst case O(n)?

Если **все ключи** попали в один bucket → поиск превращается в **линейный** по списку в ячейке. Хорошая hash-функция и **rehash** при росте держат **средний случай O(1)**.

---

## Стек (Stack) — LIFO

**Stack (стек)** — **LIFO**: Last In, First Out. Последний положил — первый забрал.

```
        push(3)
          ↓
      ┌───┐
      │ 3 │ ← top
      ├───┤
      │ 2 │
      ├───┤
      │ 1 │
      └───┘
        pop() → 3
```

### Операции

| Операция | Описание | Сложность |
|----------|----------|-----------|
| `push(x)` | Положить на вершину | O(1) |
| `pop()` | Снять с вершины | O(1) |
| `peek()` | Посмотреть вершину | O(1) |
| `isEmpty()` | Пуст ли стек | O(1) |

### Реализация на массиве

```typescript
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  get size(): number {
    return this.items.length;
  }
}
```

### Пример: проверка скобок

```typescript
function isBalanced(input: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  for (const char of input) {
    if ('([{'.includes(char)) {
      stack.push(char);
    } else if (')]}'.includes(char)) {
      if (stack.pop() !== pairs[char]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isBalanced('{[()()]}')); // true
console.log(isBalanced('{[(])}'));  // false
```

### Стек в JavaScript

| Где встречается | Пример |
|-----------------|--------|
| **Call Stack** | вложенные вызовы функций |
| **History** | кнопка «Назад» в SPA (стек URL) |
| **Undo** | редактор: undo = pop, redo = второй стек |
| **DFS** | обход дерева/графа «в глубину» |

**Визуализация:** [VisuAlgo — Stack](https://visualgo.net/en/list) (выберите Stack) · [USFCA — Stack](https://www.cs.usfca.edu/~galles/visualization/StackArray.html)

---

## Очередь (Queue) — FIFO

**Queue (очередь)** — **FIFO**: First In, First Out. Как очередь в магазине.

```
enqueue(1) → enqueue(2) → enqueue(3)

  front                         back
    ↓                             ↓
  ┌───┬───┬───┐
  │ 1 │ 2 │ 3 │
  └───┴───┴───┘
    ↑
  dequeue() → 1
```

### Операции

| Операция | Описание | Сложность |
|----------|----------|-----------|
| `enqueue(x)` | В конец | O(1) |
| `dequeue()` | Из начала | O(1)* |
| `peek()` | Первый элемент | O(1) |

\* В JS `Array.shift()` — O(n). Для настоящей O(1) — кольцевой буфер или linked list.

### Реализация (учебная)

```typescript
class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift(); // O(n) — для продакшена лучше deque
  }

  peek(): T | undefined {
    return this.items[0];
  }

  get size(): number {
    return this.items.length;
  }
}
```

### Пример: BFS — обход «слоями»

```typescript
function bfsLevels(root: string, graph: Record<string, string[]>): string[] {
  const visited = new Set<string>();
  const queue = [root];
  const order: string[] = [];

  while (queue.length) {
    const node = queue.shift()!; // в учебных примерах; в проде — deque
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    queue.push(...graph[node]);
  }

  return order;
}
```

### Очередь на Frontend

| Сценарий | Очередь |
|----------|---------|
| Очередь API-запросов | задачи ждут своей очереди |
| Обработка событий | event loop, microtasks |
| Breadth-First Search | обход дерева компонентов по уровням |
| Print / task scheduler | FIFO задачи |

**Визуализация:** [VisuAlgo — Queue](https://visualgo.net/en/list) · [USFCA — Queue](https://www.cs.usfca.edu/~galles/visualization/QueueArray.html)

---

## Куча (Heap) — приоритетная очередь

**Heap (куча)** — дерево, где **родитель всегда «лучше» детей** (min-heap или max-heap). Используется для **priority queue**.

### Min-Heap (минимум наверху)

```
        1
       / \
      3   2
     / \   \
    7   4   5

Свойство: каждый родитель ≤ своих детей
Корень (root) — минимальный элемент → O(1)
```

### Операции

| Операция | Min-Heap | Сложность |
|----------|----------|-----------|
| Получить минимум | `peek()` → root | O(1) |
| Вставить | `insert` + heapify up | O(log n) |
| Удалить минимум | `extractMin` + heapify down | O(log n) |
| Построить из массива | heapify | O(n) |

### Heap vs отсортированный массив

| Задача | Sort + взять первый | Heap |
|--------|---------------------|------|
| Найти min один раз | O(n log n) sort | O(n) build или O(1) если heap готов |
| k раз взять min | — | O(k log n) |
| Top K элементов | sort всего O(n log n) | min-heap размера K → O(n log k) |

### Реализация Min-Heap на массиве

В куче узел `i` имеет детей `2i+1` и `2i+2`, родителя `(i-1)/2`.

```typescript
class MinHeap {
  private heap: number[] = [];

  peek(): number | undefined {
    return this.heap[0];
  }

  insert(value: number): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMin(): number | undefined {
    if (!this.heap.length) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length) {
      this.heap[0] = last;
      this.bubbleDown(0);
    }
    return min;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent] <= this.heap[index]) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  private bubbleDown(index: number): void {
    const length = this.heap.length;
    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;

      if (left < length && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < length && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === index) break;

      [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
      index = smallest;
    }
  }
}

const heap = new MinHeap();
[5, 3, 8, 1, 2].forEach((n) => heap.insert(n));
console.log(heap.extractMin()); // 1
console.log(heap.extractMin()); // 2
```

### Top K частых слов (типичная задача)

```typescript
function topKFrequent(words: string[], k: number): string[] {
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, k)
    .map(([word]) => word);
}

console.log(topKFrequent(['i', 'love', 'leetcode', 'i', 'love', 'coding'], 2));
// ['i', 'love']
```

> В JS нет встроенного `Heap` — на собесах пишут сами или используют библиотеку. Идея важнее синтаксиса.

**Визуализация:** [VisuAlgo — Heap](https://visualgo.net/en/heap) · [USFCA — Heap Sort / Heap](https://www.cs.usfca.edu/~galles/visualization/Heap.html) · [Wikipedia — Binary heap](https://en.wikipedia.org/wiki/Binary_heap)

---

## Деревья (Trees)

**Дерево (Tree)** — иерархия узлов: один **корень (root)**, у узла — **дети (children)**, нет циклов.

```
       React App          ← root
       /        \
   Header      Main
              /    \
          Sidebar  Content
```

### Термины

| Термин | Значение |
|--------|----------|
| **Root** | Верхний узел без родителя |
| **Leaf** | Узел без детей |
| **Height** | Длина longest path root → leaf |
| **Depth** | Расстояние от root до узла |
| **Subtree** | Узел + все его потомки |

### Binary Tree (бинарное дерево)

У каждого узла **не более двух** детей: `left` и `right`.

```
       8
      / \
     3   10
    / \    \
   1   6    14
      / \   /
     4   7 13
```

### Binary Search Tree (BST)

Для каждого узла: **левое поддерево < узел < правое поддерево**.

| Операция | BST (сбалансированный) | BST (вырожденный*) |
|----------|------------------------|---------------------|
| Search | O(log n) | O(n) |
| Insert | O(log n) | O(n) |

\* Вырожденное — когда дерево превращается в список (1→2→3→4).

**Визуализация:** [VisuAlgo — BST](https://visualgo.net/en/bst) · [USFCA — BST](https://www.cs.usfca.edu/~galles/visualization/BST.html)

### Обходы дерева (Traversals)

| Обход | Порядок | Аналогия | Когда |
|-------|---------|----------|-------|
| **In-order** | left → node → right | Отсортированный вывод BST | sorted order |
| **Pre-order** | node → left → right | Копировать дерево | serialize |
| **Post-order** | left → right → node | Удалить дерево снизу | cleanup |
| **Level-order (BFS)** | по уровням | слой за слоем | UI-деревья |

```typescript
type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

function inOrder<T>(node: TreeNode<T> | undefined, visit: (v: T) => void): void {
  if (!node) return;
  inOrder(node.left, visit);
  visit(node.value);
  inOrder(node.right, visit);
}

function levelOrder<T>(root: TreeNode<T>): T[][] {
  if (!root) return [];
  const result: T[][] = [];
  const queue: TreeNode<T>[] = [root];

  while (queue.length) {
    const levelSize = queue.length;
    const level: T[] = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()!;
      level.push(node.value);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
```

### Деревья на Frontend

| Где | Дерево |
|-----|--------|
| **DOM** | `document.body` → children → … |
| **React** | Virtual DOM — дерево компонентов |
| **Файловая система** | папки / файлы |
| **Меню** | nested `children` |
| **JSON** | вложенные объекты |
| **Router** | nested routes |

```typescript
type MenuItem = { label: string; children?: MenuItem[] };

function countMenuItems(items: MenuItem[]): number {
  return items.reduce((sum, item) => {
    return sum + 1 + (item.children ? countMenuItems(item.children) : 0);
  }, 0);
}

// React: рекурсивный компонент
function MenuTree({ items }: { items: MenuItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.label}>
          {item.label}
          {item.children && <MenuTree items={item.children} />}
        </li>
      ))}
    </ul>
  );
}
```

### Поиск в BST

```typescript
function searchBST(root: TreeNode<number> | undefined, target: number): boolean {
  if (!root) return false;
  if (root.value === target) return true;
  if (target < root.value) return searchBST(root.left, target);
  return searchBST(root.right, target);
}
```

**Анимации обходов:** [VisuAlgo — Traversal](https://visualgo.net/en/bst) · [USFCA — Tree Traversal](https://www.cs.usfca.edu/~galles/visualization/BST.html)

---

## Базовые алгоритмы и структуры

Каждый алгоритм «сидит» на структуре. Ниже — **какая структура нужна** и **куда смотреть подробнее**.

| Алгоритм | Нужная структура | Time | Ссылка |
|----------|------------------|------|--------|
| Linear Search | List / Array | O(n) | [ALGORITHMSREADME § Linear](./ALGORITHMSREADME.md#линейный-linear-search) |
| Binary Search | Sorted Array | O(log n) | [ALGORITHMSREADME § Binary](./ALGORITHMSREADME.md#бинарный-binary-search) |
| Bubble / Insertion Sort | Array | O(n²) | [ALGORITHMSREADME § Sorts](./ALGORITHMSREADME.md#сортировки) |
| Merge / Quick Sort | Array | O(n log n) | [ALGORITHMSREADME § Sorts](./ALGORITHMSREADME.md#сортировки) |
| BFS | Queue + Graph/Tree | O(V + E) | [ALGORITHMSREADME § BFS](./ALGORITHMSREADME.md#обход-графа-bfs-и-dfs-кратко) |
| DFS | Stack (или рекурсия) | O(V + E) | там же |
| Hash lookup | Hash Table / Map | O(1) avg | этот файл § Hash |
| Top K / Priority | Heap | O(n log k) | этот файл § Heap |
| Tree search | BST | O(log n) | этот файл § Trees |

### Пример: одна задача — разные структуры

**Задача:** хранить список треков и часто искать по `id`.

```typescript
type Track = { id: string; title: string; plays: number };

// ❌ только массив — каждый find O(n)
const tracks: Track[] = [...];

function getTrackSlow(id: string): Track | undefined {
  return tracks.find((t) => t.id === id);
}

// ✅ Map как hash table — get O(1)
const tracksById = new Map(tracks.map((t) => [t.id, t]));

function getTrackFast(id: string): Track | undefined {
  return tracksById.get(id);
}

// ✅ Set — уникальные id лайкнутых треков
const likedIds = new Set<string>();

function toggleLike(id: string): void {
  if (likedIds.has(id)) likedIds.delete(id);
  else likedIds.add(id);
}
```

### Пример: сортировка + бинарный поиск

```typescript
const sorted = [...nums].sort((a, b) => a - b);

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

## Что выбрать на Frontend

| Задача | Структура | Почему |
|--------|-----------|--------|
| Список карточек в UI | `Array` | Порядок, map/filter |
| Убрать дубликаты | `Set` | O(1) проверка |
| Быстрый lookup по id | `Map` | O(1) вместо find |
| Кэш ответов API | `Map` | ключ = url + params |
| Посещённые страницы | `Set` | «уже был здесь?» |
| Приватные данные объекта | `WeakMap` | без утечек памяти |
| Undo / history | Stack | LIFO |
| Очередь запросов | Queue | FIFO |
| Топ-N по рейтингу | Heap (или sort + slice) | k << n |
| Nested menu / JSON | Tree + DFS/BFS | рекурсия или queue |
| DOM-операции | Tree (браузер) | parent/children |

### Частые ошибки джунов

| Ошибка | Проблема | Решение |
|--------|----------|---------|
| `arr.find` в каждом render | O(n) × renders | `Map` / мемоизация |
| `[...new Set(arr)]` в hot path | лишние аллокации | Set с самого начала |
| `Object` как map с int-ключами | ключи → string | `Map` |
| `shift()` в большой очереди | O(n) каждый раз | индекс head или deque |
| Рекурсия по глубокому JSON | stack overflow | итерация + stack/queue |

---

## Мини-задачи для практики

| # | Задача | Структура |
|---|--------|-----------|
| 1 | Убрать дубликаты из массива id | `Set` |
| 2 | Подсчитать частоту букв в строке | `Map` |
| 3 | Проверить сбалансированность скобок | Stack |
| 4 | Обойти nested menu и собрать labels | Tree + DFS |
| 5 | BFS: кратчайший путь в unweighted графе | Queue |
| 6 | Реализовать MinHeap и extractMin × 3 | Heap |
| 7 | Индекс `users` по email для O(1) login | Map |
| 8 | Top 3 самых частых слова в тексте | Map + sort / Heap |
| 9 | In-order обход BST → sorted array | Tree |
| 10 | LRU cache (продвинуто) | Map + doubly linked list |

---

## Полезные ссылки с визуализациями

### Интерактивные визуализаторы

| Сайт | Темы |
|------|------|
| [VisuAlgo](https://visualgo.net/en) | List, Stack, Queue, Hash, Heap, BST, BFS/DFS |
| [USFCA — Data Structures](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html) | Все базовые структуры |
| [Algorithm Visualizer](https://algorithm-visualizer.org/) | Код + анимация |
| [Data Structure Visualizations](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html) | Сравнение структур и sort |

### MDN (JavaScript)

| Структура | Ссылка |
|-----------|--------|
| Array | [MDN — Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) |
| Set | [MDN — Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) |
| Map | [MDN — Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) |
| WeakMap | [MDN — WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) |
| WeakSet | [MDN — WeakSet](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) |

### Статьи с картинками

| Ресурс | Тема |
|--------|------|
| [GeeksforGeeks — Data Structures](https://www.geeksforgeeks.org/data-structures/) | Обзор всех структур |
| [GeeksforGeeks — Hashing](https://www.geeksforgeeks.org/hashing-data-structure/) | Хэш-таблицы |
| [GeeksforGeeks — Heap](https://www.geeksforgeeks.org/heap-data-structure/) | Куча |
| [Programiz — DSA Tutorial](https://www.programiz.com/dsa) | Пошагово с иллюстрациями |
| [Wikipedia — Tree (data structure)](https://en.wikipedia.org/wiki/Tree_(data_structure)) | Деревья с диаграммами |

### Видео

| Ресурс | Тема |
|--------|------|
| [Fireship — Data Structures Easy](https://www.youtube.com/watch?v=DuDz6B4COO0) | 8 структур за 15 минут |
| [freeCodeCamp — Data Structures JS](https://www.youtube.com/watch?v=t2CE-whp2p4) | Полный курс |
| [William Fiset — Heaps](https://www.youtube.com/watch?v=t0Cq6tVNRBA) | Куча подробно |

---

## Краткий словарь

| Термин | Простое объяснение |
|--------|-------------------|
| **List / Array** | Упорядоченный список с индексами |
| **Linked List** | Цепочка узлов `{ value, next }` |
| **Set** | Только уникальные значения |
| **Map** | Пары ключ → значение, любой тип ключа |
| **WeakMap / WeakSet** | Слабые ссылки, не мешают GC |
| **Hash Table** | Map/Set под капотом: hash → bucket |
| **Collision** | Два ключа попали в один bucket |
| **Stack** | LIFO — последний вошёл, первый вышел |
| **Queue** | FIFO — первый вошёл, первый вышел |
| **Heap** | Дерево с min/max наверху, priority queue |
| **Tree** | Иерархия: root, children, leaves |
| **BST** | Дерево: left < node < right |
| **Traversal** | Обход всех узлов (in/pre/post/level order) |
| **Big O** | Как растёт время/память при росте n |

---

## Что запомнить

```
1. Array — default List; Map — default hash lookup.
2. Set — уникальность и O(1) has.
3. Stack → undo, DFS, скобки; Queue → BFS, очереди задач.
4. Heap — min/max и Top K, не путать с sort всего массива.
5. Деревья — DOM, React, меню, JSON; обход — DFS или BFS.
6. Big O — смотрите таблицу операций перед выбором структуры.
7. Сначала VisuAlgo, потом код руками.
```

Связанный материал: [ALGORITHMSREADME.md](./ALGORITHMSREADME.md) — сортировки, поиски, рекурсия, two pointers.
