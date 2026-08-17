# Алгоритмы: сортировки, поиски и сложность

Материал для занятия: **что такое алгоритм**, как оценивать его **скорость и память**, и как работают **классические сортировки и поиски** — с примерами на TypeScript и ссылками на сайты с **анимациями и картинками**.

> **Одной фразой:** алгоритм — это **пошаговый рецепт** решения задачи. На собеседованиях и в реальной работе важно не только «знать сортировку пузырьком», но и **понимать, когда она уместна, а когда — нет**.

Структуры данных (List, Set, Map, стек, очередь, куча, деревья) — в [DATASTRUCTURESREADME.md](./DATASTRUCTURESREADME.md).

---

## Содержание

1. [Что такое алгоритм](#что-такое-алгоритм)
2. [Big O — как измерять «скорость»](#big-o--как-измерять-скорость)
3. [Сводная таблица алгоритмов](#сводная-таблица-алгоритмов)
4. [Сортировки](#сортировки)
   - [Пузырьковая (Bubble Sort)](#пузырьковая-bubble-sort)
   - [Выбором (Selection Sort)](#выбором-selection-sort)
   - [Вставками (Insertion Sort)](#вставками-insertion-sort)
   - [Слиянием (Merge Sort)](#слиянием-merge-sort)
   - [Быстрая (Quick Sort)](#быстрая-quick-sort)
   - [Подсчётом (Counting Sort)](#подсчётом-counting-sort)
   - [Встроенная сортировка в JavaScript](#встроенная-сортировка-в-javascript)
5. [Поиск](#поиск)
   - [Линейный (Linear Search)](#линейный-linear-search)
   - [Бинарный (Binary Search)](#бинарный-binary-search)
   - [Поиск в объектах и массивах JS](#поиск-в-объектах-и-массивах-js)
6. [Рекурсия — когда функция вызывает себя](#рекурсия--когда-функция-вызывает-себя)
7. [Два указателя и скользящее окно](#два-указателя-и-скользящее-окно)
8. [Обход графа: BFS и DFS (кратко)](#обход-графа-bfs-и-dfs-кратко)
9. [Как тренироваться](#как-тренироваться)
10. [Чеклист для самопроверки](#чеклист-для-самопроверки)
11. [Полезные ссылки с визуализациями](#полезные-ссылки-с-визуализациями)
12. [Краткий словарь](#краткий-словарь)

---

## Что такое алгоритм

**Алгоритм** — конечная последовательность шагов, которая:

1. Принимает **входные данные** (input).
2. Выполняет **определённые действия**.
3. Возвращает **результат** (output).

```
Вход:  [5, 2, 8, 1]
         │
         ▼
   Алгоритм сортировки
         │
         ▼
Выход: [1, 2, 5, 8]
```

### Свойства «хорошего» алгоритма

| Свойство | Что значит для джуна |
|----------|----------------------|
| **Корректность** | На любых допустимых данных даёт правильный ответ |
| **Понятность** | Коллега может прочитать код без «дешифровки» |
| **Эффективность** | Не «зависает» на больших массивах без причины |
| **Конечность** | Заканчивается за конечное время (нет бесконечного цикла) |

### Алгоритм vs код

| Алгоритм | Код |
|----------|-----|
| Идея / рецепт | Реализация на конкретном языке |
| «Сравни соседей и меняй местами» | `if (arr[j] > arr[j + 1]) swap(...)` |
| Можно описать словами или на блок-схеме | TypeScript, Python, Java… |

> **На Frontend** алгоритмы встречаются постоянно: сортировка списка треков, фильтрация по поисковой строке, debounce, обход дерева компонентов, поиск в nested JSON.

---

## Big O — как измерять «скорость»

Когда массив из **10** элементов — почти всё работает быстро. Когда **1 000 000** — разница между алгоритмами становится критичной.

**Big O** описывает, **как растёт время** (или память) при росте размера входа `n`. Нас интересует **порядок роста**, а не точные миллисекунды.

### Частые классы сложности (от лучшего к худшему)

| Notation | Название | Пример | 10 → 1000 элементов |
|----------|----------|--------|---------------------|
| **O(1)** | Константа | доступ `arr[i]`, `Map.get` | ~одинаково |
| **O(log n)** | Логарифм | бинарный поиск | растёт медленно |
| **O(n)** | Линейная | линейный поиск, один проход | в 100 раз больше работы |
| **O(n log n)** | Линейно-логарифмическая | merge sort, `Array.sort` | типичная «хорошая» сортировка |
| **O(n²)** | Квадратичная | bubble sort, вложенные циклы | на 1000 — уже больно |
| **O(2ⁿ)** | Экспоненциальная | наивная рекурсия Фибоначчи | быстро «убивает» |

```
Количество операций (условно)
│
│                              O(n²)
│                            ╱
│                          ╱
│              O(n log n)╱
│                    ╱
│          O(n)    ╱
│            ╱  ╱
│  O(log n)╱
│ O(1)────╱──────────────────────► n (размер данных)
```

### Как «увидеть» Big O в коде

| Паттерн в коде | Обычно |
|----------------|--------|
| Один цикл по `n` | O(n) |
| Два вложенных цикла по `n` | O(n²) |
| Делим задачу пополам каждый шаг | O(log n) |
| Делим пополам + работа на каждом уровне | O(n log n) |
| Рекурсия с двумя вызовами без мемоизации | часто O(2ⁿ) |

### Best / Average / Worst case

| Алгоритм | Лучший | Средний | Худший |
|----------|--------|---------|--------|
| Linear Search | O(1) — элемент первый | O(n) | O(n) |
| Binary Search | O(1) | O(log n) | O(log n) |
| Bubble Sort | O(n) — уже отсортирован | O(n²) | O(n²) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) — редкий случай |

> **Практика:** на собеседовании часто спрашивают **worst case** и **дополнительную память** (space complexity).

---

## Сводная таблица алгоритмов

| Алгоритм | Тип | Time (worst) | Space | Стабильная* | Когда учить |
|----------|-----|--------------|-------|-------------|-------------|
| Bubble Sort | Сортировка | O(n²) | O(1) | Да | Первая «учебная» |
| Selection Sort | Сортировка | O(n²) | O(1) | Нет | Понять «минимум слева» |
| Insertion Sort | Сортировка | O(n²) | O(1) | Да | Хорош на почти отсортированных |
| Merge Sort | Сортировка | O(n log n) | O(n) | Да | Делить и властвовать |
| Quick Sort | Сортировка | O(n²) | O(log n)** | Нет | Практичная «быстрая» |
| Counting Sort | Сортировка | O(n + k) | O(k) | Да | Малый диапазон чисел |
| Linear Search | Поиск | O(n) | O(1) | — | Любой массив |
| Binary Search | Поиск | O(log n) | O(1) | — | Только отсортированный |

\* **Стабильная сортировка** — равные элементы сохраняют относительный порядок.  
\** Space для quick sort — глубина стека рекурсии.

---

## Сортировки

### Пузырьковая (Bubble Sort)

**Идея:** идём по массиву и **меняем местами соседей**, если они стоят «не так». Самый большой элемент «всплывает» в конец — как пузырь.

**Визуализация:** [VisuAlgo — Bubble Sort](https://visualgo.net/en/sorting?algo=bubbleSort)

```
Шаг 1:  [5, 2, 8, 1]  →  2 и 5 меняем  →  [2, 5, 8, 1]
Шаг 2:  [2, 5, 8, 1]  →  8 ok           →  [2, 5, 8, 1]
Шаг 3:  [2, 5, 8, 1]  →  8 и 1 меняем  →  [2, 5, 1, 8]  ← 8 «всплыла»
...
```

```typescript
function bubbleSort(arr: number[]): number[] {
  const result = [...arr]; // не мутируем исходный массив

  for (let i = 0; i < result.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < result.length - 1 - i; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }

    // оптимизация: если за проход ничего не меняли — уже отсортировано
    if (!swapped) break;
  }

  return result;
}

console.log(bubbleSort([5, 2, 8, 1])); // [1, 2, 5, 8]
```

| Плюсы | Минусы |
|-------|--------|
| Очень просто понять | O(n²) — медленно на больших данных |
| Можно остановиться раньше (`swapped`) | В проде почти не используют |

**Картинки и GIF:** [Wikipedia — Bubble sort](https://en.wikipedia.org/wiki/Bubble_sort), [TutorialsPoint — Bubble Sort](https://www.tutorialspoint.com/data_structures_algorithms/bubble_sort_algorithm.htm)

---

### Выбором (Selection Sort)

**Идея:** на каждом шаге ищем **минимум** в неотсортированной части и ставим его на текущую позицию.

**Визуализация:** [VisuAlgo — Selection Sort](https://visualgo.net/en/sorting?algo=selectionSort)

```
[5, 2, 8, 1]
 ↑ мин=1 → меняем с 5
[1, 2, 8, 5]
    ↑ мин=2 — уже на месте
[1, 2, 8, 5]
       ↑ мин=5
[1, 2, 5, 8]
```

```typescript
function selectionSort(arr: number[]): number[] {
  const result = [...arr];

  for (let i = 0; i < result.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < result.length; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }

  return result;
}
```

| Плюсы | Минусы |
|-------|--------|
| Мало обменов (swap) | Всё равно O(n²) |
| Простая логика | Нестабильная |

---

### Вставками (Insertion Sort)

**Идея:** как **сортировка карт в руке** — берём следующий элемент и вставляем в уже «отсортированную» левую часть.

**Визуализация:** [VisuAlgo — Insertion Sort](https://visualgo.net/en/sorting?algo=insertionSort)

```
[5, 2, 8, 1]
[5 | 2, 8, 1]  → вставляем 2  →  [2, 5 | 8, 1]
[2, 5 | 8, 1]  → 8 на месте    →  [2, 5, 8 | 1]
[2, 5, 8 | 1]  → вставляем 1   →  [1, 2, 5, 8]
```

```typescript
function insertionSort(arr: number[]): number[] {
  const result = [...arr];

  for (let i = 1; i < result.length; i++) {
    const current = result[i];
    let j = i - 1;

    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }

    result[j + 1] = current;
  }

  return result;
}
```

| Плюсы | Минусы |
|-------|--------|
| Быстро на **почти отсортированных** данных | O(n²) в среднем |
| Стабильная, in-place | На больших массивах — медленно |
| Простая | |

> **На практике:** маленькие массивы (до ~10–20 элементов) некоторые движки до сих пор до-сортируют insertion sort.

---

### Слиянием (Merge Sort)

**Идея:** **разделяй и властвуй** — делим массив пополам, сортируем части, **сливаем** два отсортированных массива в один.

**Визуализация:** [VisuAlgo — Merge Sort](https://visualgo.net/en/sorting?algo=mergeSort)

```
        [38, 27, 43, 3]
           /          \
    [38, 27]          [43, 3]
     /    \            /    \
  [38]   [27]       [43]    [3]
     \    /            \    /
    [27, 38]          [3, 43]
           \          /
        [3, 27, 38, 43]
```

```typescript
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}
```

| Плюсы | Минусы |
|-------|--------|
| Стабильная O(n log n) **всегда** | Нужна доп. память O(n) |
| Предсказуемая | Чуть больше кода, чем у «простых» сортировок |

**Анимация:** [Wikipedia — Merge sort](https://en.wikipedia.org/wiki/Merge_sort)

---

### Быстрая (Quick Sort)

**Идея:** выбираем **опорный элемент (pivot)**, делим массив на «меньше pivot» и «больше pivot», рекурсивно сортируем части.

**Визуализация:** [VisuAlgo — Quick Sort](https://visualgo.net/en/sorting?algo=quickSort)

```
pivot = 3
[5, 2, 8, 3, 1]
 → partition →  [2, 1] 3 [5, 8]
 → рекурсия на [2,1] и [5,8]
 → [1, 2, 3, 5, 8]
```

```typescript
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const less: number[] = [];
  const equal: number[] = [];
  const greater: number[] = [];

  for (const value of arr) {
    if (value < pivot) less.push(value);
    else if (value > pivot) greater.push(value);
    else equal.push(value);
  }

  return [...quickSort(less), ...equal, ...quickSort(greater)];
}
```

> Это **упрощённая** версия (с новыми массивами). In-place partition — сложнее, но экономит память. Смотрите [VisuAlgo](https://visualgo.net/en/sorting?algo=quickSort).

| Плюсы | Минусы |
|-------|--------|
| Очень быстрая на практике | Worst case O(n²) |
| O(n log n) в среднем | Нестабильная |
| In-place версия — O(log n) памяти | Выбор pivot важен |

---

### Подсчётом (Counting Sort)

**Идея:** если числа в **небольшом диапазоне** (например, оценки 1–5), считаем, сколько раз встречается каждое значение, и восстанавливаем массив.

**Визуализация:** [VisuAlgo — Counting Sort](https://visualgo.net/en/sorting?algo=countingSort)

```typescript
function countingSort(arr: number[], maxValue: number): number[] {
  const count = new Array(maxValue + 1).fill(0);

  for (const num of arr) {
    count[num]++;
  }

  const result: number[] = [];
  for (let i = 0; i <= maxValue; i++) {
    while (count[i] > 0) {
      result.push(i);
      count[i]--;
    }
  }

  return result;
}

console.log(countingSort([4, 2, 2, 5, 1, 4], 5)); // [1, 2, 2, 4, 4, 5]
```

| Плюсы | Минусы |
|-------|--------|
| O(n + k), где k — диапазон | Только целые числа в известном диапазоне |
| Линейная при малом k | Много памяти при большом k |

---

### Встроенная сортировка в JavaScript

В реальном коде **почти всегда** используют `Array.prototype.sort`:

```typescript
const tracks = [
  { title: 'Song B', plays: 120 },
  { title: 'Song A', plays: 300 },
  { title: 'Song C', plays: 50 },
];

// по числу
tracks.sort((a, b) => b.plays - a.plays);

// по строке (locale-aware)
tracks.sort((a, b) => a.title.localeCompare(b.title));
```

| Что важно знать | Детали |
|-----------------|--------|
| Алгоритм | В современных движках — **Timsort** (гибрид merge + insertion) |
| Сложность | O(n log n) в типичных случаях |
| Сравнение | `(a, b) => number`: `< 0` — a раньше, `> 0` — b раньше, `0` — равны |
| Стабильность | **Стабильная** с ES2019 |
| Мутация | **Мутирует** исходный массив! Копия: `[...arr].sort(...)` |

**Документация:** [MDN — Array.sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

---

## Поиск

### Линейный (Linear Search)

**Идея:** идём **с начала до конца**, пока не найдём элемент (или не закончится массив).

**Визуализация:** [VisuAlgo — Linear Search](https://visualgo.net/en/bfsdfs?algo=linearSearch) (раздел Searching)

```
[4, 2, 7, 1, 9]  ищем 7
 ↑  ↑  ✓
```

```typescript
function linearSearch<T>(arr: T[], target: T): number {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// с объектами — часто ищем по полю
function findUserById(users: { id: string; name: string }[], id: string) {
  return users.find((user) => user.id === id); // под капотом — линейный проход
}
```

| Когда использовать | Почему |
|--------------------|--------|
| Массив **не отсортирован** | Бинарный поиск не подойдёт |
| Мало элементов (< 100) | Разница с O(log n) незаметна |
| Нужен **первый** подходящий по сложному условию | `find`, `findIndex` |

**Time:** O(n) · **Space:** O(1)

---

### Бинарный (Binary Search)

**Идея:** массив **отсортирован** → сравниваем с **серединой** → отбрасываем половину → повторяем.

**Визуализация:** [VisuAlgo — Binary Search](https://visualgo.net/en/bfsdfs?algo=binarySearch)

```
[1, 2, 5, 8, 9, 12, 15]  ищем 9
        ↑ mid=8, идём вправо
              ↑ mid=9 ✓
```

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

**Рекурсивная версия** (для понимания рекурсии):

```typescript
function binarySearchRecursive(
  arr: number[],
  target: number,
  left = 0,
  right = arr.length - 1,
): number {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}
```

| Условие | Обязательно |
|---------|-------------|
| Данные **отсортированы** | Да |
| Доступ по индексу за O(1) | Да (массив; не связный список) |

**Time:** O(log n) · **Space:** O(1) итеративно, O(log n) рекурсивно

**Картинки:** [Khan Academy — Binary search](https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search), [GeeksforGeeks — Binary Search](https://www.geeksforgeeks.org/binary-search/)

---

### Поиск в объектах и массивах JS

| Задача | Метод | Сложность |
|--------|-------|-----------|
| Есть ли элемент | `arr.includes(x)` | O(n) |
| Индекс | `arr.indexOf(x)` | O(n) |
| Первый подходящий | `arr.find(fn)` | O(n) |
| Все подходящие | `arr.filter(fn)` | O(n) |
| Быстрый поиск по ключу | `Map.get(key)` | O(1) в среднем |
| Проверка ключа | `Set.has(value)` | O(1) в среднем |

```typescript
// O(1) lookup — когда много поисков по id
const userById = new Map(users.map((u) => [u.id, u]));
const user = userById.get('42');
```

> **Совет джуну:** если в UI постоянно ищете одно и то же в массиве из 10 000 элементов — возможно, нужен `Map` / индекс, а не `find` в каждом рендере.

---

## Рекурсия — когда функция вызывает себя

**Рекурсия** — функция решает задачу, вызывая **упрощённую версию** той же задачи, пока не дойдёт до **базового случая**.

```
factorial(4)
  → 4 * factorial(3)
  → 4 * 3 * factorial(2)
  → 4 * 3 * 2 * factorial(1)
  → 4 * 3 * 2 * 1 = 24
```

### Пример: факториал

```typescript
function factorial(n: number): number {
  if (n <= 1) return 1; // базовый случай
  return n * factorial(n - 1);
}
```

### Пример: сумма массива

```typescript
function sum(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr[0] + sum(arr.slice(1));
}
```

### Пример: обход вложенного меню (Frontend)

```typescript
type MenuItem = {
  label: string;
  href?: string;
  children?: MenuItem[];
};

function flattenMenu(items: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = [];

  for (const item of items) {
    result.push({ label: item.label, href: item.href });
    if (item.children?.length) {
      result.push(...flattenMenu(item.children));
    }
  }

  return result;
}
```

### Когда рекурсия опасна

| Проблема | Пример | Решение |
|----------|--------|---------|
| Нет базового случая | бесконечные вызовы | всегда проверяйте `if` выхода |
| Stack overflow | слишком глубокая рекурсия | итерация или хвостовая рекурсия |
| O(2ⁿ) | наивный Fibonacci | мемоизация или цикл |

```typescript
// плохо: O(2ⁿ)
function fibSlow(n: number): number {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

// лучше: O(n)
function fibFast(n: number): number {
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}
```

**Визуализация рекурсии:** [USFCA — Recursion Visualizer](https://www.cs.usfca.edu/~galles/visualization/RecFact.html), [Recursion Tree — Fibonacci](https://visualgo.net/en/recursion)

---

## Два указателя и скользящее окно

Паттерны, которые часто встречаются на **LeetCode Easy** и в реальном коде.

### Два указателя (Two Pointers)

**Идея:** два индекса двигаются по массиву навстречу или в одну сторону.

**Пример:** есть ли пара с суммой `target` в **отсортированном** массиве?

```typescript
function hasPairWithSum(sorted: number[], target: number): boolean {
  let left = 0;
  let right = sorted.length - 1;

  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }

  return false;
}

console.log(hasPairWithSum([1, 2, 4, 6, 10], 8)); // true (2 + 6)
```

**Визуализация:** [LeetCode Pattern — Two Pointers](https://leetcode.com/explore/learn/card/array-and-string/204/conclusion/1181/)

### Скользящее окно (Sliding Window)

**Идея:** «окно» фиксированной или переменной длины едет по массиву — удобно для подмассивов и строк.

**Пример:** максимальная сумма подмассива длины `k`.

```typescript
function maxSumSubarray(arr: number[], k: number): number {
  if (arr.length < k) return 0;

  let windowSum = arr.slice(0, k).reduce((a, b) => a + b, 0);
  let maxSum = windowSum;

  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // добавили новый, убрали старый
    maxSum = Math.max(maxSum, windowSum);
  }

  return maxSum;
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)
```

**Статья с картинками:** [GeeksforGeeks — Sliding Window](https://www.geeksforgeeks.org/window-sliding-technique/)

---

## Обход графа: BFS и DFS (кратко)

На Frontend «граф» — это часто **дерево компонентов**, **файловая структура**, **меню**, **зависимости модулей**.

| Алгоритм | Полное название | Идея | Аналогия |
|----------|-----------------|------|----------|
| **BFS** | Breadth-First Search | Сначала все соседи, потом соседи соседей | Волна от центра |
| **DFS** | Depth-First Search | Идём вглубь до тупика, потом назад | Лабиринт: всегда вперёд |

**Визуализация:** [VisuAlgo — BFS/DFS](https://visualgo.net/en/dfsbfs)

```typescript
// граф как список смежности
const graph: Record<string, string[]> = {
  A: ['B', 'C'],
  B: ['D'],
  C: ['E'],
  D: [],
  E: [],
};

function bfs(start: string): string[] {
  const visited = new Set<string>();
  const queue = [start];
  const order: string[] = [];

  while (queue.length) {
    const node = queue.shift()!;
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);
    queue.push(...graph[node]);
  }

  return order;
}

function dfs(start: string, visited = new Set<string>()): string[] {
  if (visited.has(start)) return [];
  visited.add(start);
  return [start, ...graph[start].flatMap((neighbor) => dfs(neighbor, visited))];
}
```

> **Для старта** достаточно понимать разницу и уметь обойти дерево (рекурсия или очередь). Глубокий разбор — в [VisuAlgo DFS/BFS](https://visualgo.net/en/dfsbfs) и [Reducible — BFS vs DFS](https://www.youtube.com/watch?v=7SRM3QGjP4Q).

---

## Как тренироваться

### 1. Смотреть визуализации, потом писать код

```
VisuAlgo → понял шаги → закрыл сайт → написал с нуля → сравнил
```

### 2. Мини-задачи для закрепления

| # | Задача | Алгоритм |
|---|--------|----------|
| 1 | Отсортировать массив чисел без `.sort` | bubble / insertion |
| 2 | Найти индекс числа в отсортированном массиве | binary search |
| 3 | Найти минимум и максимум за один проход | linear scan |
| 4 | Удалить дубликаты из отсортированного массива | two pointers |
| 5 | Развернуть строку | two pointers |
| 6 | Подсчитать частоту слов в тексте | Map |
| 7 | Обойти nested JSON и собрать все `id` | DFS / рекурсия |
| 8 | Найти два числа с заданной суммой | two pointers (sorted) |

### 3. Пример unit-теста (Vitest / Jest)

```typescript
import { describe, it, expect } from 'vitest';
import { binarySearch } from './binary-search';

describe('binarySearch', () => {
  it('находит существующий элемент', () => {
    expect(binarySearch([1, 3, 5, 7], 5)).toBe(2);
  });

  it('возвращает -1, если нет элемента', () => {
    expect(binarySearch([1, 3, 5, 7], 4)).toBe(-1);
  });

  it('работает с одним элементом', () => {
    expect(binarySearch([42], 42)).toBe(0);
  });
});
```

### 4. Платформы для практики

| Платформа | Уровень | Особенность |
|-----------|---------|-------------|
| [LeetCode](https://leetcode.com/) | Easy → Hard | Собеседования |
| [Codewars](https://www.codewars.com/) | 8 kyu → 1 kyu | Короткие kata |
| [HackerRank](https://www.hackerrank.com/) | Beginner | Пошаговые треки |
| [Exercism](https://exercism.org/) | Beginner | Менторство |
| [NeetCode Roadmap](https://neetcode.io/roadmap) | Structured | План по темам |

---

## Чеклист для самопроверки

После занятия вы должны уметь **своими словами** объяснить:

- [ ] Чем алгоритм отличается от конкретной реализации на TS
- [ ] Что такое O(n), O(log n), O(n²) — на простом примере
- [ ] Как работает bubble sort и зачем флаг `swapped`
- [ ] Почему binary search требует отсортированный массив
- [ ] Разницу между linear search и `Map.get`
- [ ] Что такое стабильная сортировка
- [ ] Когда в JS достаточно `[...arr].sort((a,b) => a - b)`
- [ ] Что такое базовый случай в рекурсии
- [ ] Зачем нужны two pointers и sliding window

---

## Полезные ссылки с визуализациями

### Интерактивные визуализаторы (анимации, пошаговый режим)

| Сайт | Что смотреть |
|------|--------------|
| [VisuAlgo](https://visualgo.net/en) | Сортировки, поиск, BFS/DFS, рекурсия — **лучший старт** |
| [Algorithm Visualizer](https://algorithm-visualizer.org/) | Код + анимация side-by-side |
| [USFCA Visualizations](https://www.cs.usfca.edu/~galles/visualization/Algorithms.html) | Классические структуры и алгоритмы |
| [Sorting Algorithms — Toptal](https://www.toptal.com/developers/sorting-algorithms) | Сравнение всех сортировок на одной странице |
| [Data Structure Visualizations (USFCA)](https://www.cs.usfca.edu/~galles/visualization/ComparisonSort.html) | Сравнение sort-алгоритмов |

### Big O и шпаргалки

| Сайт | Описание |
|------|----------|
| [Big-O Cheat Sheet](https://www.bigocheatsheet.com/) | Таблицы сложности с графиками |
| [Common Sense Dev — Big-O](https://commonsense.dev/big-o-notation/) | Простым языком для начинающих |
| [MDN — Time complexity](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for#loop_overhead) | Контекст для JS |

### Статьи с диаграммами

| Сайт | Тема |
|------|------|
| [GeeksforGeeks — Sorting Algorithms](https://www.geeksforgeeks.org/sorting-algorithms/) | Обзор с картинками |
| [GeeksforGeeks — Searching Algorithms](https://www.geeksforgeeks.org/searching-algorithms/) | Linear, binary, jump… |
| [Programiz — Sorting](https://www.programiz.com/dsa/sorting-algorithm) | Пошагово с иллюстрациями |
| [Programiz — Searching](https://www.programiz.com/dsa/searching-algorithm) | Поиск с примерами |
| [Wikipedia — Sorting algorithm](https://en.wikipedia.org/wiki/Sorting_algorithm) | GIF-анимации у многих алгоритмов |

### Видео (наглядно)

| Канал / плейлист | Язык | Тема |
|-----------------|------|------|
| [freeCodeCamp — Algorithms in JS (11h)](https://www.youtube.com/watch?v=t2CE-whp2p4) | EN | Полный курс |
| [Fireship — Big O in 100 Seconds](https://www.youtube.com/watch?v=BgLTDT03Qt4) | EN | Big O быстро |
| [Abdul Bari — Algorithms](https://www.youtube.com/playlist?list=PLDN4rr-kFg84jGsofioRYs4TrTOWqUgbg) | EN | Сортировки, графы |
| [Reducible — Sorting Algorithms](https://www.youtube.com/watch?v=KGzMlONHD4s) | EN | Сравнение с анимацией |
| [Хабр — «Алгоритмы для самых маленьких»](https://habr.com/ru/companies/vk/articles/250539/) | RU | Введение |

### Книги и курсы (опционально)

| Ресурс | Для кого |
|--------|----------|
| [Grokking Algorithms (Aditya Bhargava)](https://www.manning.com/books/grokking-algorithms) | Наглядная книга для начинающих |
| [Khan Academy — Algorithms](https://www.khanacademy.org/computing/computer-science/algorithms) | Бесплатно, с упражнениями |
| [Coursera — Algorithms, Part I (Princeton)](https://www.coursera.org/learn/algorithms-part1) | Глубже, с Java |

---

## Краткий словарь

| Термин | Простое объяснение |
|--------|-------------------|
| **Алгоритм** | Пошаговый способ решить задачу |
| **Сложность (Big O)** | Как растёт время/память при росте данных |
| **In-place** | Сортировка без создания второго большого массива |
| **Stable sort** | Равные элементы не меняют порядок друг относительно друга |
| **Pivot** | Опорный элемент в Quick Sort |
| **Partition** | Разделение на «меньше» и «больше» pivot |
| **Merge** | Слияние двух отсортированных массивов |
| **Recursion** | Функция вызывает себя с меньшей задачей |
| **Base case** | Условие остановки рекурсии |
| **Two pointers** | Два индекса, двигающиеся по структуре |
| **Sliding window** | Подмассив фиксированной/переменной длины «едет» по данным |
| **BFS** | Обход «в ширину» — слой за слоем |
| **DFS** | Обход «в глубину» — до конца ветки |
| **Хеш-таблица / Map** | Структура с быстрым поиском по ключу |

---

## Что запомнить на первом занятии

```
1. Алгоритм — это идея; код — реализация.
2. Big O — про рост, не про миллисекунды.
3. Bubble / Selection / Insertion — учебные O(n²), знайте идею.
4. Merge / Quick — практичные O(n log n).
5. Linear search — везде; binary search — только sorted.
6. В JS для сортировки — [...arr].sort(compareFn).
7. Смотрите VisuAlgo, потом пишите сами.
```

Удачи на практике — алгоритмы становятся понятнее, когда **рисуете массив на бумаге** и **прогоняете 5–7 элементов руками** перед тем, как открыть IDE.
