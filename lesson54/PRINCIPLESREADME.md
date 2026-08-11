# Принципы и подходы Frontend-разработки

Материал для занятия: **топ-10** общепринятых эвристик и подходов, которые дополняют SOLID и помогают писать **простой, поддерживаемый и предсказуемый** код — в утилитах, хуках и React-компонентах.

> **Одной фразой:** это не «законы физики», а **правила здравого смысла** — они подсказывают, когда упростить, когда вынести дублирование, когда не строить «на вырост» и как не превратить UI в монолит.

---

## Содержание

1. [Как эти принципы связаны с SOLID](#как-эти-принципы-связаны-с-solid)
2. [Топ-10: сводная таблица](#топ-10-сводная-таблица)
3. [KISS — Keep It Simple, Stupid](#kiss--keep-it-simple-stupid)
4. [DRY — Don't Repeat Yourself](#dry--dont-repeat-yourself)
5. [YAGNI — You Aren't Gonna Need It](#yagni--you-arent-gonna-need-it)
6. [SoC — Separation of Concerns](#soc--separation-of-concerns)
7. [Composition over Inheritance](#composition-over-inheritance)
8. [SSOT — Single Source of Truth](#ssot--single-source-of-truth)
9. [LoD — Law of Demeter](#lod--law-of-demeter)
10. [Fail Fast](#fail-fast)
11. [Progressive Enhancement](#progressive-enhancement)
12. [Boy Scout Rule](#boy-scout-rule)
13. [Когда принципы конфликтуют](#когда-принципы-конфликтуют)
14. [Чеклист code review](#чеклист-code-review)
15. [Полезные ссылки](#полезные-ссылки)
16. [Краткий словарь](#краткий-словарь)

---

## Как эти принципы связаны с SOLID

| Группа | Принципы | Фокус |
|--------|----------|-------|
| **SOLID** | S, O, L, I, D | Архитектура модулей: границы, зависимости, расширяемость |
| **Простота** | KISS, YAGNI | Не усложнять без причины |
| **Дублирование** | DRY | Одна правда — одно место в коде |
| **Структура** | SoC, Composition, SSOT, LoD | Кто за что отвечает и как части собираются |
| **Надёжность** | Fail Fast | Ошибки видны сразу, а не «потом» |
| **Продукт / UX** | Progressive Enhancement | Работающий UI для всех, улучшения — по слоям |
| **Культура команды** | Boy Scout Rule | Код становится чуть лучше после каждого PR |

```
SOLID отвечает: «КАК разделить ответственность в растущем коде?»
KISS / YAGNI:     «НУЖНО ли вообще это усложнение?»
DRY:              «Где одна правда, а где — случайное совпадение?»
SoC / SSOT:       «Где границы между UI, данными и side effects?»
```

> Полный разбор SOLID — в [SOLIDREADME.md](./SOLIDREADME.md).

---

## Топ-10: сводная таблица

| # | Аббревиатура | Полное название | Суть в одной строке |
|---|--------------|-----------------|---------------------|
| 1 | **KISS** | Keep It Simple, Stupid | Делай проще — пока не появится реальная причина усложнять |
| 2 | **DRY** | Don't Repeat Yourself | Знание и логика — в одном месте, не копируй «на всякий случай» |
| 3 | **YAGNI** | You Aren't Gonna Need It | Не пиши функциональность «на будущее», пока её не попросили |
| 4 | **SoC** | Separation of Concerns | Разделяй UI, данные, side effects и инфраструктуру |
| 5 | **Composition** | Composition over Inheritance | Собирай поведение из маленьких частей, а не от «родителя» |
| 6 | **SSOT** | Single Source of Truth | У каждого факта — одно авторитетное место в приложении |
| 7 | **LoD** | Law of Demeter | Общайся с ближайшими соседями, не лезь в «друзей друзей» |
| 8 | **Fail Fast** | Fail Fast | Падай / сигнализируй сразу при неверных данных или контракте |
| 9 | **PE** | Progressive Enhancement | Базовый UI работает везде; JS/CSS — улучшение, не единственный путь |
| 10 | **BSR** | Boy Scout Rule | Оставляй код чуть чище, чем нашёл |

---

## KISS — Keep It Simple, Stupid

### Формулировка

> **Лучшее решение — самое простое, которое решает задачу.** Не добавляй абстракции, паттерны и «архитектуру на вырост», пока простой код не перестал справляться.

### Зачем на Frontend

- UI быстро меняется — сложные слои тормозят итерации.
- Простой компонент проще тестировать, ревьюить и передавать джуну.
- «Умный» generic-компонент на 400 строк часто хуже трёх понятных на 80.

### Признаки нарушения KISS

- Фабрики фабрик ради одного use case.
- `useGenericDataTable<T, K, F>()` вместо обычной таблицы.
- Redux / Zustand / Context «на всякий случай» для локального `useState`.
- CSS-in-JS с 5 уровнями HOC для одной кнопки.

---

### KISS в коде

#### Плохо: абстракция ради абстракции

```tsx
type EntityConfig<T extends { id: string }> = {
  fetcher: (id: string) => Promise<T>;
  renderer: (item: T) => React.ReactNode;
  cacheKey: (id: string) => string;
};

function createEntityPage<T extends { id: string }>(config: EntityConfig<T>) {
  return function EntityPage() {
    const { id } = useParams();
    const [item, setItem] = useState<T | null>(null);
    // 80 строк generic-логики для одной страницы плейлиста...
    return config.renderer(item!);
  };
}
```

#### Хорошо: прямолинейная страница

```tsx
function PlaylistPage() {
  const { id } = useParams();
  const { playlist, isLoading, error } = useLoadPlaylist(id);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return <PlaylistView playlist={playlist} />;
}
```

#### KISS и состояние формы

```tsx
// Плохо: свой mini-framework для двух полей
const form = useFormEngine({ schema, adapters, plugins: [analyticsPlugin] });

// Хорошо: нативный controlled input или react-hook-form для реальной сложности
const [email, setEmail] = useState("");
```

> **Правило большого пальца:** если объяснение архитектуры дольше объяснения фичи — возможно, пора упростить.

---

## DRY — Don't Repeat Yourself

### Формулировка

> **Каждый фрагмент знания должен иметь единственное, недвусмысленное представление в системе.** Изменение правила — в одном месте, а не в пяти копиях.

### DRY ≠ «не повторять символы»

| Это DRY | Это не DRY (случайное совпадение) |
|---------|-----------------------------------|
| Формула скидки в одной функции | Два `className="flex gap-2"` в разных карточках |
| Константа `API_BASE_URL` | Принудительный `Button` из двух разных `<button>` с разной семантикой |
| Общий хук `useDebounce` | Объединение несвязанных компонент только из-за похожей вёрстки |

**AHA** (Avoid Hasty Abstractions) — близкий по духу совет Dan Abramov: не спеши абстрагировать, пока не увидишь **третий** по-настоящему одинаковый случай.

### Признаки нарушения DRY

- Исправление бага требует правок в 4+ файлах.
- «Скопировал из соседнего компонента и чуть подправил».
- Одинаковые regex / regex валидации email в форме и на сервере — но только на клиенте.
- Дублирование типов API-ответа вручную вместо codegen / shared types.

---

### DRY на Frontend

#### Плохо: копипаста fetch-логики

```tsx
function UserProfile() {
  useEffect(() => {
    fetch("/api/user", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setUser);
  }, [token]);
}

function Settings() {
  useEffect(() => {
    fetch("/api/user", { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then(setUser);
  }, [token]);
}
```

#### Хорошо: один источник загрузки

```tsx
// api/useCurrentUser.ts
export function useCurrentUser() {
  return useQuery({ queryKey: ["user", "me"], queryFn: fetchCurrentUser });
}

function UserProfile() {
  const { data: user } = useCurrentUser();
  // ...
}
```

#### DRY в дизайн-системе

```tsx
// tokens/colors.ts — одна правда для цветов
export const colors = {
  primary: "var(--color-primary)",
  danger: "var(--color-danger)",
} as const;

// Плохо: #3b82f6 в 20 компонентах
// Хорошо: className="text-primary" или theme token
```

#### Когда НЕ применять DRY

```tsx
// Два похожих layout, но разная бизнес-логика — OK держать отдельно
function CheckoutSummary() { /* ... */ }
function OrderSummary() { /* ... */ }  // не сливать в GenericSummary «ради DRY»
```

---

## YAGNI — You Aren't Gonna Need It

### Формулировка

> **Не реализуй функциональность, пока она реально не нужна.** «Может пригодится» — слабый аргумент для кода в production.

### Зачем на Frontend

- Лишние фичи = лишний JS, сложнее bundle и поддержка.
- «Универсальный» компонент под 10 гипотетических кейсов редко используется ни в одном.
- Premature optimization — частный случай YAGNI.

### Признаки нарушения YAGNI

- Проп `variant: 'primary' | 'secondary' | ... | 'legacyV3'` — половина вариантов не используется.
- Feature flags и конфиги для фич, которых нет в roadmap.
- Абстрактный `StorageAdapter` с Redis-реализацией в SPA, где только `localStorage`.
- i18n на 12 языков при одном `locale: 'ru'`.

---

### YAGNI в React

#### Плохо: «на вырост»

```tsx
type DataGridProps<T> = {
  columns: ColumnDef<T>[];
  grouping?: boolean;
  pivot?: boolean;
  exportCsv?: boolean;
  virtualize?: boolean;
  plugins?: Plugin[];
};

// В проекте — одна таблица из 3 колонок без сортировки
```

#### Хорошо: только то, что нужно сейчас

```tsx
type PlaylistTracksProps = {
  tracks: Track[];
  onPlay: (id: string) => void;
};

function PlaylistTracks({ tracks, onPlay }: PlaylistTracksProps) {
  return (
    <ul>
      {tracks.map((track) => (
        <li key={track.id}>
          {track.name}
          <button type="button" onClick={() => onPlay(track.id)}>Play</button>
        </li>
      ))}
    </ul>
  );
}
```

#### YAGNI vs SOLID

| Ситуация | Что выбрать |
|----------|-------------|
| CRUD-форма на 2 поля, MVP | **YAGNI + KISS** — без слоёв repository |
| Auth + payments + команда 5+ человек | **SOLID + SoC** — границы окупаются |
| «Сделаем plugin system на первый день» | **YAGNI** — добавите, когда появится второй plugin |

---

## SoC — Separation of Concerns

### Формулировка

> **Разные аспекты системы должны жить отдельно:** представление, бизнес-правила, доступ к данным, инфраструктура — не в одной «каше».

SoC — «старший брат» **SRP** из SOLID: SRP про один модуль, SoC — про **слои и зоны** всего приложения.

### Типичные слои на Frontend

```
┌─────────────────────────────────────────┐
│  UI (components, pages, styles)         │
├─────────────────────────────────────────┤
│  Application logic (hooks, use cases)     │
├─────────────────────────────────────────┤
│  Data access (api client, React Query)  │
├─────────────────────────────────────────┤
│  Infrastructure (router, analytics)     │
└─────────────────────────────────────────┘
```

FSD, Clean Architecture и «features / entities / shared» — практические воплощения SoC.

### Признаки нарушения SoC

- `fetch` прямо в JSX или в `onClick`.
- CSS-модули знают про структуру API-ответа.
- Компонент кнопки импортирует `zustand`-store всего приложения.
- Валидация домена только на клиенте в компоненте без возможности переиспользовать.

---

### SoC в React

#### Плохо: всё в одном компоненте

```tsx
function ProductPage() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.price < 0) throw new Error("Invalid price");
        setProduct(data);
        window.gtag?.("view_item", { id: data.id });
      });
  }, [id]);

  const finalPrice = product ? product.price * (1 - product.discount) : 0;

  return <div>{product?.name} — {finalPrice} ₽</div>;
}
```

#### Хорошо: слои разделены

```tsx
// entities/product/lib/calcFinalPrice.ts — доменная логика
export function calcFinalPrice(product: Product) {
  return product.price * (1 - product.discount);
}

// api/useProduct.ts — данные
export function useProduct(id: string) {
  return useQuery({ queryKey: ["product", id], queryFn: () => fetchProduct(id) });
}

// features/analytics/trackViewItem.ts — инфраструктура
export function trackViewItem(product: Product) {
  window.gtag?.("view_item", { id: product.id });
}

// pages/product/ProductPage.tsx — сборка
function ProductPage() {
  const { id } = useParams();
  const { data: product } = useProduct(id!);

  useEffect(() => {
    if (product) trackViewItem(product);
  }, [product]);

  if (!product) return null;

  return <ProductView product={product} price={calcFinalPrice(product)} />;
}
```

---

## Composition over Inheritance

### Формулировка

> **Собирай объекты и UI из маленьких независимых частей (композиция), а не через глубокие цепочки наследования «базовый → расширенный → супер-форма».**

React официально [рекомендует композицию](https://react.dev/learn/passing-props-to-a-component) вместо наследования классов.

### Зачем на Frontend

- Наследование жёстко связывает детей с родителем; props и children — гибче.
- Hooks — композиция поведения без `extends BaseComponent`.
- UI-kit строят через compound components (`Tabs`, `Tabs.List`, `Tabs.Panel`).

### Признаки «наследования там, где нужна композиция»

- `class AdminButton extends PrimaryButton extends BaseButton`.
- HOC-матрёшка: `withAuth(withTheme(withRouter(Component)))`.
- «Базовый» компонент на 600 строк с 40 optional props «для наследников».

---

### Composition в React

#### Плохо: наследование классов (legacy)

```tsx
class BaseModal extends React.Component {
  render() {
    return <div className="modal">{this.renderBody()}</div>;
  }
  renderBody() {
    throw new Error("override me");
  }
}

class ConfirmModal extends BaseModal {
  renderBody() {
    return <p>Are you sure?</p>;
  }
}
```

#### Хорошо: композиция и children

```tsx
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="modal" role="dialog">
      <button type="button" onClick={onClose} aria-label="Close">×</button>
      {children}
    </div>
  );
}

function ConfirmModal({ message, onConfirm }: { message: string; onConfirm: () => void }) {
  return (
    <Modal onClose={onConfirm}>
      <p>{message}</p>
      <button type="button" onClick={onConfirm}>OK</button>
    </Modal>
  );
}
```

#### Compound components

```tsx
function Tabs({ children, defaultId }: { children: React.ReactNode; defaultId: string }) {
  const [activeId, setActiveId] = useState(defaultId);
  return (
    <TabsContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </TabsContext.Provider>
  );
}

Tabs.List = function TabsList({ children }: { children: React.ReactNode }) {
  return <div role="tablist">{children}</div>;
};

Tabs.Panel = function TabsPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const { activeId } = useTabsContext();
  if (activeId !== id) return null;
  return <div role="tabpanel">{children}</div>;
};
```

#### Композиция хуков

```tsx
function usePlaylistPage(playlistId: string) {
  const playlist = useLoadPlaylist(playlistId);
  const player = useAudioPlayer();
  const { trackPlay } = useAnalytics();

  const playTrack = (trackId: string) => {
    player.play(trackId);
    trackPlay(trackId);
  };

  return { ...playlist, playTrack };
}
```

---

## SSOT — Single Source of Truth

### Формулировка

> **У каждого факта в приложении должно быть ровно одно авторитетное место.** Остальной код **производит** UI из этого источника, а не хранит копии.

### Зачем на Frontend

- Рассинхрон: URL говорит `tab=settings`, state — `tab: 'profile'`, localStorage — третье.
- «Дублирующий state» — классическая ошибка React: `useState` + props с одним и тем же значением.
- Кэш React Query / Redux — SSOT для server state; `useState` — для чисто UI.

### Признаки нарушения SSOT

- Одни и те же данные в Context, Redux и локальном state.
- Фильтры только в state, но не в URL — нельзя поделиться ссылкой.
- Два компонента независимо fetch'ат одни данные и расходятся.

---

### SSOT на практике

#### Плохо: два источника правды

```tsx
function SearchPage() {
  const [query, setQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  // query и ?q= в URL живут отдельно — легко рассинхронить

  const onChange = (value: string) => {
    setQuery(value);
    setSearchParams({ q: value }); // нужно не забыть обновить оба
  };
}
```

#### Хорошо: URL — источник правды для shareable state

```tsx
function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const onChange = (value: string) => {
    setSearchParams(value ? { q: value } : {});
  };
}
```

#### Server state: React Query как SSOT

```tsx
// Плохо: ручной cache в useState + refetch в другом месте
// Хорошо:
const { data: user } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
});

// Инвалидация — один механизм для всего приложения
queryClient.invalidateQueries({ queryKey: ["user", userId] });
```

#### Derived state — не второй SSOT

```tsx
// Плохо: хранить fullName в state и синхронизировать с firstName/lastName
const [fullName, setFullName] = useState("");

// Хорошо: вычислять
const fullName = `${firstName} ${lastName}`.trim();
```

---

## LoD — Law of Demeter

### Формулировка

> **Модуль должен знать только о своих непосредственных «соседях».** Не вызывай цепочки вида `a.getB().getC().doSomething()` — это хрупкая связность.

Также: **Principle of Least Knowledge** — принцип минимального знания.

### Зачем на Frontend

- Prop drilling через 5 уровней «ради одного поля» — запах LoD (лечится composition, context с узким API, не «весь store»).
- Компонент лезет в `user.account.billing.plan.features` — знает слишком много о домене.
- Селекторы Redux / Zustand скрывают структуру store — хорошая практика LoD.

### Признаки нарушения LoD

- `order.user.profile.settings.theme` в JSX.
- Универсальный `useAppStore()` в каждом leaf-компоненте.
- Utility импортирует половину `entities/` ради одного поля.

---

### LoD в React

#### Плохо: train wreck в JSX

```tsx
function OrderBadge({ order }: { order: Order }) {
  const isPremium =
    order.customer.membership.tier === "premium" &&
    order.customer.membership.validUntil > Date.now();

  return isPremium ? <Badge>Premium order</Badge> : null;
}
```

#### Хорошо: узкий контракт / селектор

```tsx
function OrderBadge({ isPremiumOrder }: { isPremiumOrder: boolean }) {
  return isPremiumOrder ? <Badge>Premium order</Badge> : null;
}

// родитель или selector
function OrderRow({ order }: { order: Order }) {
  return <OrderBadge isPremiumOrder={selectIsPremiumOrder(order)} />;
}

function selectIsPremiumOrder(order: Order): boolean {
  const m = order.customer.membership;
  return m.tier === "premium" && m.validUntil > Date.now();
}
```

#### Context с узким API (связь с ISP из SOLID)

```tsx
// Плохо
const { user, cart, theme, locale, ...rest } = useAppContext();

// Хорошо
const { addToCart } = useCartActions();
const theme = useTheme();
```

---

## Fail Fast

### Формулировка

> **При неверных входных данных или нарушении контракта — останавливайся и сигнализируй сразу**, а не продолжай с «тихими» дефолтами, которые всплывут позже.

### Зачем на Frontend

- `undefined is not an object` в проде — часто следствие «мягкого» `?.` вместо явной проверки на границе.
- Error Boundaries ловят сбои дерева — fail fast на уровне UI.
- Валидация форм до submit экономит round-trip.
- TypeScript + runtime guards (zod) на границе API — fail fast для внешних данных.

### Признаки нарушения Fail Fast

- `catch (e) {}` — проглоченная ошибка.
- `data?.user?.name ?? 'Guest'` в 15 местах вместо проверки после fetch.
- Fallback UI, который выглядит как успех при ошибке API.

---

### Fail Fast на Frontend

#### Плохо: тихий провал

```tsx
async function loadPlaylist(id: string) {
  try {
    const res = await fetch(`/api/playlists/${id}`);
    const data = await res.json();
    return data;
  } catch {
    return null; // UI покажет пустоту — непонятно, ошибка это или «нет данных»
  }
}
```

#### Хорошо: явная ошибка

```tsx
async function loadPlaylist(id: string): Promise<Playlist> {
  const res = await fetch(`/api/playlists/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to load playlist: ${res.status}`);
  }
  const data = await res.json();
  return playlistSchema.parse(data); // zod — fail fast на неверной форме
}
```

```tsx
function PlaylistPage() {
  const { data, error, isLoading } = useLoadPlaylist(id);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />; // явно
  return <PlaylistView playlist={data} />;
}
```

#### Runtime validation на границе

```tsx
const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

export async function fetchUser(id: string): Promise<User> {
  const raw = await api.get(`/users/${id}`);
  return UserSchema.parse(raw); // сразу бросит, если API изменился
}
```

#### Error Boundary

```tsx
<ErrorBoundary fallback={<CrashScreen />}>
  <AppRoutes />
</ErrorBoundary>
```

---

## Progressive Enhancement

### Формулировка

> **Сначала работающий базовый опыт для всех (HTML, семантика, доступность), затем улучшения через CSS и JavaScript** — не наоборот.

Это продуктово-технический принцип веба: SPA не отменяет идею «страница должна что-то значить без JS».

### Зачем на Frontend

- SEO, медленные сети, блокировщики скриптов.
- Accessibility: форма с `<form action>` и submit работает и без React hydration.
- Resilience: если chunk не загрузился — базовый контент уже виден (SSR/SSG).

### Уровни улучшения

```
1. Semantic HTML     →  контент и формы работают
2. CSS               →  layout, responsive, motion (prefers-reduced-motion)
3. JavaScript        →  интерактивность, optimistic UI, offline
4. Advanced APIs     →  PWA, Web Share, Notifications (если нужны)
```

### Признаки нарушения PE

- Пустой `<div id="root">` без SSR и без skeleton content.
- Кнопка `<div onClick>` вместо `<button>` / `<a href>`.
- Критичный контент только после `useEffect` fetch без loading/skeleton.
- «Ломается полностью», если отключить JS.

---

### Progressive Enhancement в React

#### Плохо

```tsx
function SignInPage() {
  return (
    <div onClick={redirectToOAuth} role="button">
      Sign in
    </div>
  );
}
```

#### Хорошо: прогрессивные слои

```tsx
function SignInPage() {
  const { signIn, isLoading } = useSpotifySignIn();

  return (
    <form
      action="/api/auth/spotify" // базовый fallback для no-JS (если бэкенд поддерживает)
      method="GET"
      onSubmit={(e) => {
        e.preventDefault();
        signIn();
      }}
    >
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Redirecting…" : "Sign in with Spotify"}
      </button>
    </form>
  );
}
```

#### SSR / SSG как PE

```tsx
// Next.js / Remix: контент в HTML, React hydrates для интерактива
export async function loader() {
  return json(await fetchFeaturedPlaylists());
}
```

#### Graceful degradation

```tsx
function ShareButton({ url, title }: { url: string; title: string }) {
  const canNativeShare = typeof navigator.share === "function";

  if (canNativeShare) {
    return <button type="button" onClick={() => navigator.share({ url, title })}>Share</button>;
  }

  return (
    <button type="button" onClick={() => copyToClipboard(url)}>
      Copy link
    </button>
  );
}
```

---

## Boy Scout Rule

### Формулировка

> **Оставляй код (и окружение) чуть лучше, чем нашёл.** Не обязательно переписывать модуль — достаточно маленького улучшения в зоне текущей задачи.

Robert C. Martin («Uncle Bob»): часть культуры **Clean Code** и здорового legacy.

### Зачем на Frontend

- UI-код быстро «гниёт» от copy-paste и hotfix.
- Микро-рефакторинг в PR дешевле big bang rewrite.
- Команда поддерживает качество без отдельных «недель на refactor».

### Что считается «чуть лучше»

| OK в рамках PR | Не OK (scope creep) |
|----------------|---------------------|
| Переименовать `data` → `playlist` | Переписать весь модуль auth |
| Вынести дублированный fetch в хук | Миграция всего проекта на другой state manager |
| Добавить `aria-label` к кнопке | «Заодно переделал дизайн-систему» |
| Удалить мёртвый import / unused prop | 40 файлов «заодно отформатировал» |

### Boy Scout + YAGNI

Улучшай **то, что трогаешь**, но не добавляй **новые фичи «заодно»** — это уже не BSR, а нарушение scope.

---

### Boy Scout Rule на практике

```tsx
// Было (legacy в файле, который вы правите для бага):
function Plist({ data }: any) {
  return <div>{data.name}</div>;
}

// Стало — минимально в рамках задачи:
type PlistProps = { playlist: Playlist };

function PlaylistTitle({ playlist }: PlistProps) {
  return <h1>{playlist.name}</h1>;
}
```

```tsx
// Заодно поправили a11y — boy scout
<button type="button" aria-expanded={isOpen} aria-controls="menu-id">
  Menu
</button>
```

---

## Когда принципы конфликтуют

Принципы — **эвристики**, они могут тянуть в разные стороны:

| Конфликт | Как думать |
|----------|------------|
| **DRY vs KISS** | Не абстрагируй две строки в helper «ради DRY» — проще оставить дубликат |
| **DRY vs AHA** | Жди третий реальный кейс, потом выноси |
| **YAGNI vs SOLID** | SOLID когда код уже растёт; YAGNI на старте фичи |
| **KISS vs SoC** | Разделение слоёв не должно означать 20 файлов на кнопку |
| **Fail Fast vs UX** | Ошибку показываем явно, но с понятным recovery (retry, link home) |
| **PE vs SPA** | SSR + semantic HTML для критичного пути; SPA-удобство — поверх |

```
                    ┌─────────────┐
         ┌─────────►│   YAGNI     │ «Нужно ли это сейчас?»
         │          └─────────────┘
         │                 │
         ▼                 ▼
   ┌──────────┐      ┌──────────┐
   │   KISS   │◄────►│   DRY    │
   └──────────┘      └──────────┘
         │                 │
         └────────┬────────┘
                  ▼
           ┌─────────────┐
           │ SoC / SOLID │ «Как структурировать то, что осталось»
           └─────────────┘
```

---

## Чеклист code review

### KISS
- [ ] Можно объяснить решение за 30 секунд?
- [ ] Абстракция используется больше одного раза по-настоящему?

### DRY
- [ ] Исправление правила — в одном месте?
- [ ] Похожий код — это одно знание или случайное совпадение?

### YAGNI
- [ ] Нет props / flags / слоёв «на будущее» без задачи в backlog?
- [ ] Generic решение оправдано текущими кейсами?

### SoC
- [ ] Fetch / analytics / routing не смешаны с presentational UI?
- [ ] Доменная логика не привязана к CSS?

### Composition
- [ ] Поведение собрано из хуков / children, а не из deep extends / HOC-цепочек?

### SSOT
- [ ] Нет дублирующего state (URL vs useState vs store)?
- [ ] Server state централизован (React Query / cache)?

### LoD
- [ ] Leaf-компоненты получают узкие props, а не «пол-дерева» данных?
- [ ] Нет длинных цепочек `a.b.c.d` в JSX?

### Fail Fast
- [ ] Ошибки API и validation не проглатываются?
- [ ] Есть Error Boundary / явный error state?

### Progressive Enhancement
- [ ] Интерактивные элементы — `button` / `a`, не `div onClick`?
- [ ] Критичный контент доступен до / без полной загрузки JS?

### Boy Scout Rule
- [ ] PR чуть улучшает зону правок без некontrolled scope creep?

---

## Полезные ссылки

| Ресурс | URL |
|--------|-----|
| The Pragmatic Programmer — DRY | [pragprog.com](https://pragprog.com/titles/tpp20/the-pragmatic-programmer-20th-anniversary-edition/) |
| Robert C. Martin — Clean Code | [blog.cleancoder.com](https://blog.cleancoder.com/) |
| Dan Abramov — AHA vs DRY | [overreacted.io](https://overreacted.io/goodbye-clean-code/) |
| React — Composition vs Inheritance | [react.dev](https://react.dev/learn/passing-props-to-a-component) |
| MDN — Progressive Enhancement | [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) |
| Feature-Sliced Design (SoC на практике) | [feature-sliced.design](https://feature-sliced.design/) |
| Web.dev — Performance / resilience | [web.dev](https://web.dev/explore/learn-core-web-vitals) |

---

## Краткий словарь

| Термин | Значение |
|--------|----------|
| **Эвристика** | Правило-подсказка; не абсолютный закон |
| **AHA** | Avoid Hasty Abstractions — не спеши с обобщениями |
| **Premature abstraction** | Абстракция до понимания реальных вариантов использования |
| **Prop drilling** | Передача props через много уровней без необходимости |
| **Derived state** | Значение, вычисляемое из другого state, а не хранимое отдельно |
| **Server state** | Данные с API; кэш, stale, refetch |
| **Client state** | UI-only: модалки, табы, input до submit |
| **Train wreck** | Цепочка вызовов `a.b().c.d` — нарушение LoD |
| **Scope creep** | Расползание задачи «заодно сделаю ещё…» |
| **Compound component** | Составной UI-kit-паттерн (Tabs + Tabs.Panel) |

---

## Шпаргалка: все 10 в одном примере

**Задача:** страница поиска треков с URL `?q=`.

| Принцип | Плохо | Хорошо |
|---------|-------|--------|
| **KISS** | GenericSearchFramework | `SearchPage` + `useSearchTracks(q)` |
| **DRY** | fetch в Header и SearchPage | один `useSearchTracks` |
| **YAGNI** | fuzzy + semantic + AI search day 1 | простой `includes` / API search |
| **SoC** | fetch + UI + analytics в одном файле | hook + view + trackSearch |
| **Composition** | `SearchPage extends BasePage` | `<Layout><SearchForm /><Results /></Layout>` |
| **SSOT** | `query` в state и в URL | `query = searchParams.get('q')` |
| **LoD** | `results.items[0].album.label.name` в Card | `TrackCard` получает `trackTitle` |
| **Fail Fast** | `catch {}` → пустой список | error state + retry |
| **PE** | `<div onClick>` | `<form>` + `<button type="submit">` |
| **BSR** | только hotfix typo | + тип для props, + aria на input |

---

> **Итог занятия:** KISS, DRY и YAGNI удерживают от лишней сложности; SoC, Composition, SSOT и LoD задают **границы** в React-приложении; Fail Fast и Progressive Enhancement делают продукт **надёжнее**; Boy Scout Rule — про **культуру** команды. Вместе с [SOLID](./SOLIDREADME.md) это рабочий набор для ежедневных решений на Frontend — начните с **KISS + SoC + SSOT**, они дают самый заметный эффект в типичных SPA.
