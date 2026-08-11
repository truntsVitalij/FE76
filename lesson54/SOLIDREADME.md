# SOLID: принципы проектирования кода

Материал для занятия: пять принципов, которые помогают писать **понятный, расширяемый и тестируемый** код — в классах, функциях и React-компонентах.

> **Одной фразой:** SOLID — это не «религия ООП», а **набор эвристик**: каждый принцип отвечает на вопрос «как разделить ответственность, чтобы изменения в одном месте не ломали всё остальное».

---

## Содержание

1. [Откуда взялся SOLID](#откуда-взялся-solid)
2. [SOLID и не только ООП](#solid-и-не-только-oop)
3. [S — Single Responsibility Principle](#s--single-responsibility-principle)
4. [O — Open/Closed Principle](#o--openclosed-principle)
5. [L — Liskov Substitution Principle](#l--liskov-substitution-principle)
6. [I — Interface Segregation Principle](#i--interface-segregation-principle)
7. [D — Dependency Inversion Principle](#d--dependency-inversion-principle)
8. [SOLID в React: сводная таблица](#solid-в-react-сводная-table)
9. [SOLID и FSD / слои приложения](#solid-и-fsd--слои-приложения)
10. [Разбор `diplom`: где SOLID, где нет](#разбор-diplom-где-solid-где-нет)
11. [Частые заблуждения](#частые-заблуждения)
12. [Чеклист code review](#чеклист-code-review)
13. [Полезные ссылки](#полезные-ссылки)
14. [Краткий словарь](#краткий-словарь)

---

## Откуда взялся SOLID

| Буква | Принцип | Автор / источник |
|-------|---------|------------------|
| **S** | Single Responsibility | Robert C. Martin («Uncle Bob») |
| **O** | Open/Closed | Bertrand Meyer |
| **L** | Liskov Substitution | Barbara Liskov |
| **I** | Interface Segregation | Robert C. Martin |
| **D** | Dependency Inversion | Robert C. Martin |

SOLID описывает **как проектировать модули** (классы, функции, компоненты), чтобы:

- их было **легче читать**;
- **менять** одну часть без каскада правок;
- **тестировать** изолированно;
- **расширять** поведение без переписывания старого кода.

```
Плохой дизайн                    Хороший дизайн (SOLID)
─────────────────                ──────────────────────
Один класс / компонент           Много маленьких модулей
делает всё                       с одной зоной ответственности
        │                                  │
        ▼                                  ▼
Изменение UI ломает БД           UI меняется отдельно от API
Сложно тестировать               Каждый модуль тестируется сам
```

---

## SOLID и не только ООП

SOLID родился в мире **классов и интерфейсов**, но смысл переносится на:

| Парадигма | «Модуль» в SOLID | Пример |
|-----------|------------------|--------|
| **ООП** | класс, интерфейс | `UserRepository`, `EmailService` |
| **FP** | чистая функция, модуль, композиция | `fetchUser`, `pipe`, `createStore` |
| **React** | компонент, хук, утилита | `SignInPage`, `useLoadPlaylist`, `makeRequest` |

> **Важно:** в React и FP редко пишут `class`, но принципы те же: **не смешивай причины для изменения**, **завись от абстракций**, **не заставляй клиента знать лишнее**.

---

## S — Single Responsibility Principle

### Формулировка

> **У модуля должна быть только одна причина для изменения** — одна зона ответственности.

«Причина для изменения» = **актор** или **источник требований**: дизайнер меняет UI, бэкенд меняет API, безопасник меняет правила auth.

### Признаки нарушения SRP

- Класс / функция / компонент длинный и «про всё».
- В одном файле и fetch, и валидация, и форматирование, и навигация.
- Тест на модуль требует мокать половину приложения.
- Название не отражает суть: `Utils`, `Manager`, `Helper`, `DataService`.

---

### SRP в ООП

#### Плохо: один класс — много обязанностей

```typescript
class User {
  constructor(
    public name: string,
    public email: string,
    private isActive = false,
  ) {}

  activate() {
    this.isActive = true;
  }

  saveToDatabase() {
    console.log(`INSERT INTO users ('${this.email}')`);
  }

  sendWelcomeEmail() {
    console.log(`Welcome, ${this.name}!`);
  }

  toHtml(): string {
    return `<div>${this.name} (${this.email})</div>`;
  }
}
```

**Причины для изменения:** правила активации, схема БД, шаблон письма, вёрстка HTML — **четыре**.

#### Хорошо: каждый класс — одна роль

```typescript
class User {
  constructor(
    public name: string,
    public email: string,
    private isActive = false,
  ) {}

  activate() {
    this.isActive = true;
  }
}

class UserRepository {
  save(user: User) {
    // только персистентность
  }
}

class EmailService {
  sendWelcome(user: User) {
    // только уведомления
  }
}

class UserPresenter {
  toHtml(user: User): string {
    return `<div>${user.name} (${user.email})</div>`;
  }
}
```

#### Пример из предметной области: заказ

```typescript
// Плохо
class Order {
  calculateTotal() { /* ... */ }
  chargeCreditCard() { /* ... */ }
  generatePdfInvoice() { /* ... */ }
  sendSmsNotification() { /* ... */ }
}

// Хорошо
class Order {
  calculateTotal() { /* только бизнес-логика заказа */ }
}

class PaymentGateway {
  charge(amount: number) { /* ... */ }
}

class InvoiceRenderer {
  toPdf(order: Order) { /* ... */ }
}

class NotificationService {
  sendSms(text: string) { /* ... */ }
}
```

---

### SRP в функциональном программировании

В FP нет классов, но **функция — тот же «модуль»**. SRP = **функция делает одну вещь**.

#### Плохо: «божественная» функция

```typescript
async function handleSignUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 1. Валидация
  if (!email.includes("@")) throw new Error("Invalid email");
  if (password.length < 8) throw new Error("Weak password");

  // 2. HTTP
  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  const user = await response.json();

  // 3. Аналитика
  window.gtag?.("event", "sign_up");

  // 4. Навигация / side effect UI
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "/dashboard";

  return user;
}
```

#### Хорошо: композиция маленьких функций

```typescript
// каждая функция — одна ответственность

function validateSignUp(email: string, password: string) {
  if (!email.includes("@")) throw new Error("Invalid email");
  if (password.length < 8) throw new Error("Weak password");
}

async function signUpRequest(email: string, password: string) {
  const response = await fetch("/api/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Sign up failed");
  return response.json();
}

function trackSignUp() {
  window.gtag?.("event", "sign_up");
}

function persistUser(user: unknown) {
  localStorage.setItem("user", JSON.stringify(user));
}

function redirectToDashboard() {
  window.location.href = "/dashboard";
}

// оркестрация — отдельно (можно в хуке / use case)
async function handleSignUp(email: string, password: string) {
  validateSignUp(email, password);
  const user = await signUpRequest(email, password);
  trackSignUp();
  persistUser(user);
  redirectToDashboard();
  return user;
}
```

#### SRP и «модули» в FP

```typescript
// userValidation.ts — только валидация
export function validateEmail(email: string) { /* ... */ }

// userApi.ts — только HTTP
export function fetchUser(id: string) { /* ... */ }

// userFormatters.ts — только форматирование
export function formatUserName(user: { firstName: string; lastName: string }) {
  return `${user.firstName} ${user.lastName}`;
}
```

---

### SRP в React

#### Плохо: страница делает auth + fetch + UI + redirect

Типичный «God-компонент» (упрощённо, как бывает в учебных проектах):

```tsx
function SignIn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (getAccessToken()) navigate("/home");
  }, [navigate]);

  useEffect(() => {
    const code = searchParams.get("code");
    if (!code) return;
    // exchangeCodeForToken, setError, navigate...
  }, [searchParams]);

  const handleSignIn = async () => {
    await redirectToSpotifyAuth();
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <button onClick={handleSignIn}>{isLoading ? "..." : "Sign in"}</button>
    </div>
  );
}
```

**Причины для изменения:** OAuth-flow, роутинг, UI кнопки, тексты ошибок.

#### Хорошо: разделение по слоям

```tsx
// features/spotify-auth/model/useOAuthCallback.ts
export function useOAuthCallback() {
  // только обработка ?code= и ?error=
}

// features/spotify-auth/ui/SignInForm.tsx
export function SignInForm() {
  const { error, isLoading, signIn } = useSpotifySignIn();
  useOAuthCallback();
  return (/* только UI */);
}

// pages/sign-in/SignInPage.tsx
export function SignInPage() {
  return (
    <div className={styles.page}>
      <SignInForm />
    </div>
  );
}

// app/router/GuestRoute.tsx
export function GuestRoute({ children }: { children: React.ReactNode }) {
  if (getAccessToken()) return <Navigate to="/" replace />;
  return children;
}
```

#### Плохо: fetch внутри компонента списка

```tsx
function Playlist() {
  const token = useAccessToken();
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/playlists/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setPlaylist);
  }, [id, token]);

  return <h2>{playlist?.name}</h2>;
}
```

#### Хорошо: компонент только отображает, хук загружает

```tsx
// api/use-load-current-playlist.ts
export function useLoadCurrentPlaylist(id?: string) {
  // fetch, loading, error
}

// pages/playlist/playlist.tsx
function Playlist() {
  const { id } = useParams();
  const { currentPlaylist, isLoading, error } = useLoadCurrentPlaylist(id);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return <h2>{currentPlaylist?.name}</h2>;
}
```

#### SRP для UI-компонентов

```tsx
// Плохо: Card и форматирование даты, и бизнес-статус
function UserCard({ user }: { user: User }) {
  const isPremium = user.plan === "pro" && user.paidUntil > Date.now();
  const formatted = new Date(user.createdAt).toLocaleDateString("ru-RU");
  return (
    <div>
      {isPremium && <Badge>Premium</Badge>}
      <span>{formatted}</span>
    </div>
  );
}

// Хорошо
function isPremiumUser(user: User) {
  return user.plan === "pro" && user.paidUntil > Date.now();
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU");
}

function UserCard({ user }: { user: User }) {
  return (
    <div>
      {isPremiumUser(user) && <Badge>Premium</Badge>}
      <span>{formatDate(user.createdAt)}</span>
    </div>
  );
}
```

---

## O — Open/Closed Principle

### Формулировка

> **Модули должны быть открыты для расширения, но закрыты для модification.**

Новое поведение добавляем **без правки** уже работающего кода — через новые классы, функции, компоненты, а не через `if/else` и `switch` на каждый новый кейс.

### Когда нарушают OCP

```typescript
function getShippingCost(type: "standard" | "express" | "pickup", weight: number) {
  if (type === "standard") return weight * 10;
  if (type === "express") return weight * 25;
  if (type === "pickup") return 0;
  // каждый новый тип → правим эту функцию
  throw new Error("Unknown type");
}
```

---

### OCP в ООП

#### Плохо

```typescript
class ReportGenerator {
  generate(type: "pdf" | "csv", data: unknown[]) {
    if (type === "pdf") {
      // ...
    } else if (type === "csv") {
      // ...
    }
  }
}
```

#### Хорошо: стратегия через полиморфизм

```typescript
interface ReportExporter {
  export(data: unknown[]): Blob;
}

class PdfExporter implements ReportExporter {
  export(data: unknown[]) {
    return new Blob([/* pdf bytes */]);
  }
}

class CsvExporter implements ReportExporter {
  export(data: unknown[]) {
    return new Blob([/* csv text */]);
  }
}

class ReportGenerator {
  constructor(private exporter: ReportExporter) {}

  generate(data: unknown[]) {
    return this.exporter.export(data);
  }
}

// Новый формат — новый класс, ReportGenerator не трогаем
class XlsxExporter implements ReportExporter {
  export(data: unknown[]) {
    return new Blob([/* xlsx */]);
  }
}
```

#### Пример: скидки в интернет-магазине

```typescript
interface DiscountRule {
  apply(price: number): number;
}

class NoDiscount implements DiscountRule {
  apply(price: number) {
    return price;
  }
}

class PercentDiscount implements DiscountRule {
  constructor(private percent: number) {}
  apply(price: number) {
    return price * (1 - this.percent / 100);
  }
}

class FixedDiscount implements DiscountRule {
  constructor(private amount: number) {}
  apply(price: number) {
    return Math.max(0, price - this.amount);
  }
}

class PriceCalculator {
  constructor(private rule: DiscountRule) {}
  total(basePrice: number) {
    return this.rule.apply(basePrice);
  }
}
```

---

### OCP в функциональном программировании

В FP OCP часто выражают через **функции высшего порядка** и **композицию**.

#### Плохо

```typescript
type NotificationType = "email" | "sms" | "push";

function notify(type: NotificationType, message: string) {
  switch (type) {
    case "email":
      return sendEmail(message);
    case "sms":
      return sendSms(message);
    case "push":
      return sendPush(message);
  }
}
```

#### Хорошо: реестр обработчиков

```typescript
type Notifier = (message: string) => Promise<void>;

const notifiers: Record<string, Notifier> = {
  email: sendEmail,
  sms: sendSms,
  push: sendPush,
};

function notify(type: string, message: string) {
  const fn = notifiers[type];
  if (!fn) throw new Error(`Unknown notifier: ${type}`);
  return fn(message);
}

// Расширение без изменения notify:
notifiers.telegram = sendTelegram;
```

#### Higher-order functions

```typescript
const withLogging =
  <T extends (...args: unknown[]) => unknown>(fn: T): T =>
  ((...args) => {
    console.log("call", fn.name, args);
    return fn(...args);
  }) as T;

const withRetry =
  (retries: number) =>
  <T extends (...args: unknown[]) => Promise<unknown>>(fn: T): T =>
  (async (...args) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await fn(...args);
      } catch (e) {
        if (i === retries - 1) throw e;
      }
    }
  }) as T;

// fetchUser не меняем — оборачиваем
const loadUser = withRetry(3)(withLogging(fetchUser));
```

#### OCP и `pipe`

```typescript
const normalize = (s: string) => s.trim().toLowerCase();
const removeSpaces = (s: string) => s.replace(/\s+/g, "");
const slugify = (s: string) => s.replace(/[^a-z0-9-]/g, "-");

// Новый шаг — новая функция в pipe, старые не трогаем
const toSlug = (input: string) =>
  [normalize, removeSpaces, slugify].reduce((acc, fn) => fn(acc), input);
```

---

### OCP в React

#### Плохо: компонент знает все варианты кнопок

```tsx
function ActionButton({ variant }: { variant: "save" | "delete" | "share" }) {
  if (variant === "save") return <button className="green">Save</button>;
  if (variant === "delete") return <button className="red">Delete</button>;
  if (variant === "share") return <button className="blue">Share</button>;
  return null;
}
```

#### Хорошо: compound components / children / render props

```tsx
function Button({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
}) {
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
}

// Новый вариант — новый variant в CSS, не новый if в JSX
<Button variant="danger">Delete</Button>
```

#### Расширяемый список без switch

```tsx
// Плохо
function Field({ type, value, onChange }: FieldProps) {
  switch (type) {
    case "text":
      return <input value={value} onChange={onChange} />;
    case "select":
      return <select /* ... */ />;
    // каждое новое поле → правим Field
  }
}

// Хорошо: registry
const fieldComponents = {
  text: TextField,
  select: SelectField,
  checkbox: CheckboxField,
} as const;

function DynamicField({ type, ...props }: { type: keyof typeof fieldComponents }) {
  const Component = fieldComponents[type];
  return <Component {...props} />;
}

// Новое поле = новый компонент + запись в registry
```

#### OCP и полиморфные компоненты (`as`)

```tsx
type ButtonProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

function Button<T extends React.ElementType = "button">({
  as,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? "button";
  return <Component {...props}>{children}</Component>;
}

// Расширение без изменения Button:
<Button as="a" href="/docs">Docs</Button>
<Button as={Link} to="/home">Home</Button>
```

---

## L — Liskov Substitution Principle

### Формулировка

> **Объекты подтипа должны заменять объекты базового типа без нарушения корректности программы.**

Если функция принимает `Bird`, она должна работать с **любой** реализацией `Bird`, включая `Sparrow` и `Penguin`, **не ломая ожиданий**.

### Классический пример нарушения LSP

```typescript
class Bird {
  fly() {
    console.log("Flying");
  }
}

class Sparrow extends Bird {}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly!"); // нарушение LSP
  }
}

function makeBirdFly(bird: Bird) {
  bird.fly(); // упадёт для Penguin
}
```

**Проблема:** `Penguin` формально `Bird`, но **меняет контракт** метода `fly`.

#### Исправление: разделить абстракции (ISP + LSP)

```typescript
interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

class Sparrow implements Flyable {
  fly() {
    console.log("Flying");
  }
}

class Penguin implements Swimmable {
  swim() {
    console.log("Swimming");
  }
}

function makeFly(flyable: Flyable) {
  flyable.fly(); // только для летающих
}
```

---

### LSP в ООП: контракт, не только сигнатура

LSP — про **поведение**:

| Нарушение | Пример |
|-----------|--------|
| Усиление предусловий | подтип требует больше, чем базовый тип |
| Ослабление постусловий | подтип гарантирует меньше |
| Исключения там, где их не ждали | `save()` бросает в подклассе |
| Возврат «не того» типа | метод возвращает `null` вместо данных |

```typescript
class Repository {
  findById(id: string): User | null {
    // может вернуть null
  }
}

class CachedUserRepository extends Repository {
  findById(id: string): User {
    // бросает, если нет в кэше — клиент не ожидал throw вместо null
    const user = cache.get(id);
    if (!user) throw new Error("Not in cache");
    return user;
  }
}
```

---

### LSP в функциональном программировании

В FP LSP проявляется как **подстановимость функций с совместимыми типами** и **сохранение контракта**.

#### Плохо: «расширение» ломает ожидания

```typescript
type Reader = (id: string) => Promise<User | null>;

const dbReader: Reader = async (id) => {
  /* ... */
  return user ?? null;
};

// «Оптимизированная» версия нарушает контракт
const strictCachedReader: Reader = async (id) => {
  const cached = cache.get(id);
  if (!cached) throw new Error("Cache miss"); // клиент ждал null, получил throw
  return cached;
};
```

#### Хорошо: одинаковый контракт

```typescript
const cachedReader: Reader = async (id) => {
  const hit = cache.get(id);
  if (hit) return hit;
  return dbReader(id); // тот же контракт: User | null
};
```

#### LSP и структурная типизация TypeScript

```typescript
type Shape = { area(): number };

const circle: Shape = {
  area: () => Math.PI * 5 ** 2,
};

const brokenSquare: Shape = {
  area: () => {
    throw new Error("Not implemented"); // нельзя подставить вместо Shape
  },
};

function totalArea(shapes: Shape[]) {
  return shapes.reduce((sum, s) => sum + s.area(), 0);
}
```

---

### LSP в React

#### Плохо: «универсальный» Input с разным поведением

```tsx
interface BaseInputProps {
  value: string;
  onChange: (value: string) => void;
}

function TextInput({ value, onChange }: BaseInputProps) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

// «Тот же» интерфейс, но onChange игнорируется в read-only режиме без предупреждения
function ReadOnlyInput({ value, onChange }: BaseInputProps) {
  return <input value={value} readOnly onChange={() => {}} />;
}

function Form({ InputComponent }: { InputComponent: React.FC<BaseInputProps> }) {
  const [value, setValue] = useState("");
  return <InputComponent value={value} onChange={setValue} />;
}

// Form ожидает, что любой InputComponent обновит value — ReadOnlyInput нарушает ожидание
```

#### Хорошо: явные пропсы / discriminated union

```tsx
type EditableInputProps = {
  mode: "editable";
  value: string;
  onChange: (value: string) => void;
};

type ReadonlyInputProps = {
  mode: "readonly";
  value: string;
};

type InputProps = EditableInputProps | ReadonlyInputProps;

function Input(props: InputProps) {
  if (props.mode === "readonly") {
    return <input value={props.value} readOnly />;
  }
  return (
    <input
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}
```

#### LSP и переиспользование компонентов

```tsx
// Button должен оставаться кнопкой: кликабельный, с onClick, доступный
function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" {...props} />;
}

// Плохая «кнопка»-ссылка через наследование пропсов без семантики
function FakeButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div {...(props as React.HTMLAttributes<HTMLDivElement>)} />
  ); // не фокусируется, не onClick с клавиатуры — нарушение ожиданий
}

// Хорошо: polymorphic `as`, сохраняем семантику элемента
<Button as="a" href="/help">Help</Button>
```

---

## I — Interface Segregation Principle

### Формулировка

> **Клиенты не должны зависеть от интерфейсов, которые они не используют.**

Лучше **несколько узких интерфейсов**, чем один «толстый».

---

### ISP в ООП

#### Плохо: fat interface

```typescript
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Human implements Worker {
  work() {}
  eat() {}
  sleep() {}
}

class Robot implements Worker {
  work() {}
  eat() {
    throw new Error("Robot doesn't eat"); // вынужден реализовывать лишнее
  }
  sleep() {
    throw new Error("Robot doesn't sleep");
  }
}
```

#### Хорошо: segregated interfaces

```typescript
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

class Human implements Workable, Eatable {
  work() {}
  eat() {}
}

class Robot implements Workable {
  work() {}
}

function runFactory(worker: Workable) {
  worker.work();
}
```

#### Пример: принтер / сканер / факс

```typescript
// Плохо
interface MultiFunctionDevice {
  print(doc: Document): void;
  scan(): Document;
  fax(doc: Document): void;
}

// Хорошо
interface Printer {
  print(doc: Document): void;
}

interface Scanner {
  scan(): Document;
}

interface Fax {
  fax(doc: Document): void;
}

class SimplePrinter implements Printer {
  print(doc: Document) {}
}
```

---

### ISP в функциональном программировании

В FP «интерфейс» = **форма объекта / тип пропсов / набор полей**.

#### Плохо

```typescript
type UserService = {
  getUser: (id: string) => Promise<User>;
  updateUser: (id: string, data: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
  exportUsersToCsv: () => Promise<Blob>;
  sendMarketingEmail: (userId: string) => Promise<void>;
};

// Компоненту профиля нужен только getUser + updateUser
function useProfilePage(api: UserService) {
  // случайно доступны deleteUser, export, marketing...
}
```

#### Хорошо: Pick / узкие типы

```typescript
type ProfileApi = Pick<UserService, "getUser" | "updateUser">;

function useProfilePage(api: ProfileApi) {
  // видит только нужное
}

// или отдельные функции
type GetUser = (id: string) => Promise<User>;
type UpdateUser = (id: string, data: Partial<User>) => Promise<User>;
```

#### ISP и параметры функции

```typescript
// Плохо: функция требует весь config
function createApp(config: {
  apiUrl: string;
  theme: Theme;
  analyticsKey: string;
  featureFlags: Record<string, boolean>;
  sentryDsn: string;
}) {}

// Хорошо: каждый модуль получает свой кусок
function initApi({ apiUrl }: { apiUrl: string }) {}
function initTheme({ theme }: { theme: Theme }) {}
function initAnalytics({ analyticsKey }: { analyticsKey: string }) {}
```

---

### ISP в React

#### Плохо: компонент требует весь объект User

```tsx
type User = {
  id: string;
  email: string;
  passwordHash: string;
  billingPlan: string;
  internalNotes: string;
};

function UserAvatar({ user }: { user: User }) {
  return <img alt={user.email} />;
}
```

#### Хорошо: минимальный контракт

```tsx
function UserAvatar({ email }: { email: string }) {
  return <img alt={email} />;
}

// или
function UserAvatar({ user }: { user: Pick<User, "email"> }) {
  return <img alt={user.email} />;
}
```

#### ISP и пропсы компонентов

```tsx
// Плохо: Sidebar получает всё приложение
function Sidebar(props: {
  user: User;
  playlists: Playlist[];
  onLogout: () => void;
  onRefreshToken: () => void;
  onExportData: () => void;
  theme: Theme;
}) {}

// Хорошо: каждый виджет — свои пропсы
function UserMenu({ userName, onLogout }: { userName: string; onLogout: () => void }) {}
function PlaylistList({ playlists }: { playlists: Playlist[] }) {}
function ThemeToggle({ theme, onChange }: { theme: Theme; onChange: (t: Theme) => void }) {}
```

#### ISP и Context

```tsx
// Плохо: один AppContext на 20 полей
const AppContext = createContext<{
  user: User;
  token: string;
  theme: Theme;
  locale: string;
  // ...
} | null>(null);

// Хорошо: разделённые контексты
const AuthContext = createContext<{ user: User; token: string } | null>(null);
const ThemeContext = createContext<Theme | null>(null);
const I18nContext = createContext<{ locale: string } | null>(null);
```

Компонент, которому нужна только тема, не перерендеривается при смене user (при правильной мемоизации).

---

## D — Dependency Inversion Principle

### Формулировка

> **1. Модули верхнего уровня не должны зависеть от модулей нижнего уровня — оба зависят от абстракций.**  
> **2. Абстракции не должны зависеть от деталей — детали зависят от абстракций.**

Проще: **бизнес-логика не должна знать про fetch, localStorage, конкретный SDK**. Она зависит от **интерфейса** («получить пользователя»), а реализация подставляется снаружи.

```
Без DIP                          С DIP
────────                         ─────
Component ──▶ fetch              Component ──▶ UserRepository (interface)
              Spotify API                    ▲
                                             │
                                    SpotifyUserRepository
                                    MockUserRepository (tests)
```

---

### DIP в ООП

#### Плохо: жёсткая зависимость

```typescript
class OrderService {
  private db = new PostgresDatabase(); // деталь

  create(order: Order) {
    this.db.save("orders", order);
  }
}
```

#### Хорошо: инверсия через интерфейс

```typescript
interface OrderStore {
  save(table: string, data: unknown): Promise<void>;
}

class OrderService {
  constructor(private store: OrderStore) {}

  create(order: Order) {
    return this.store.save("orders", order);
  }
}

class PostgresOrderStore implements OrderStore {
  save(table: string, data: unknown) {
    // Postgres
  }
}

class InMemoryOrderStore implements OrderStore {
  private data: unknown[] = [];
  save(_table: string, data: unknown) {
    this.data.push(data);
  }
}

// Production
const service = new OrderService(new PostgresOrderStore());

// Tests
const testService = new OrderService(new InMemoryOrderStore());
```

#### DI-контейнер (концепция)

```typescript
// регистрация реализаций
container.register("OrderStore", PostgresOrderStore);
container.register("OrderService", OrderService);

// OrderService получает OrderStore через конструктор автоматически
```

---

### DIP в функциональном программировании

DIP в FP = **передача зависимостей аргументами** (dependency injection без классов).

#### Плохо

```typescript
async function loadPlaylist(id: string) {
  const token = localStorage.getItem("token");
  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}
```

#### Хорошо: inject dependencies

```typescript
type HttpClient = (url: string, init?: RequestInit) => Promise<Response>;
type TokenProvider = () => string | null;

async function loadPlaylist(
  id: string,
  deps: { http: HttpClient; getToken: TokenProvider },
) {
  const token = deps.getToken();
  if (!token) throw new Error("No token");

  const response = await deps.http(
    `https://api.spotify.com/v1/playlists/${id}`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return response.json();
}

// production
loadPlaylist("123", { http: fetch, getToken: () => localStorage.getItem("token") });

// tests
loadPlaylist("123", {
  http: async () => new Response(JSON.stringify({ name: "Test" })),
  getToken: () => "fake-token",
});
```

#### Factory с дефолтными зависимостями

```typescript
function createPlaylistLoader(deps?: Partial<PlaylistLoaderDeps>) {
  const { http = fetch, getToken = getAccessToken } = {
    ...defaultDeps,
    ...deps,
  };
  return (id: string) => loadPlaylist(id, { http, getToken });
}
```

---

### DIP в React

#### Плохо: компонент напрямую вызывает fetch / localStorage

```tsx
function Playlists() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("https://api.spotify.com/v1/me/playlists", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setItems(d.items));
  }, []);

  return <ul>{items.map(/* ... */)}</ul>;
}
```

#### Хорошо: хук / API-слой / inject через context

```tsx
// api/playlist-api.ts — абстракция
export type PlaylistApi = {
  getMyPlaylists: () => Promise<Playlist[]>;
  getById: (id: string) => Promise<Playlist>;
};

export const spotifyPlaylistApi: PlaylistApi = {
  getMyPlaylists: () => makeRequest("/v1/me/playlists"),
  getById: (id) => makeRequest(`/v1/playlists/${id}`),
};

// hooks/use-playlist-api.ts
const PlaylistApiContext = createContext<PlaylistApi>(spotifyPlaylistApi);

export function PlaylistApiProvider({
  api,
  children,
}: {
  api: PlaylistApi;
  children: React.ReactNode;
}) {
  return (
    <PlaylistApiContext.Provider value={api}>
      {children}
    </PlaylistApiContext.Provider>
  );
}

export function usePlaylistApi() {
  return useContext(PlaylistApiContext);
}

// component
function Playlists() {
  const api = usePlaylistApi();
  const { playlists } = useMyPlaylists(api);
  return <ul>{playlists.map(/* ... */)}</ul>;
}
```

#### DIP и тестирование React

```tsx
const mockApi: PlaylistApi = {
  getMyPlaylists: async () => [{ id: "1", name: "Test" }],
  getById: async () => ({ id: "1", name: "Test" }),
};

render(
  <PlaylistApiProvider api={mockApi}>
    <Playlists />
  </PlaylistApiProvider>,
);

expect(await screen.findByText("Test")).toBeInTheDocument();
```

#### DIP vs «просто вынести в хук»

| Подход | DIP? | Комментарий |
|--------|------|-------------|
| `fetch` в компоненте | нет | жёсткая зависимость |
| `fetch` в хуке `useLoadPlaylist` | частично | лучше, но хук всё ещё привязан к fetch |
| `makeRequest` + `useAccessToken` | лучше | общая абстракция HTTP |
| `PlaylistApi` interface + mock в тестах | да | полная инверсия |

---

## SOLID в React: сводная таблица

| Принцип | В React это значит | Практика |
|---------|-------------------|----------|
| **S** | Компонент / хук — одна задача | UI отдельно, fetch в api, auth в feature |
| **O** | Новые кейсы без правки старого JSX | registry, variant, compound components |
| **L** | Заменяемые компоненты с тем же контрактом | не ломать пропсы / поведение в подкомпонентах |
| **I** | Маленькие пропсы, узкие хуки | `Pick<>`, split context, не тащить весь `user` |
| **D** | UI зависит от абстракции API | `PlaylistApi`, inject mock, `makeRequest` |

### Мини-чеклист для компонента

```
□ Компонент только рисует? (S)
□ Новый тип поля / кнопки — без нового if в 5 местах? (O)
□ Можно подставить другую реализацию с теми же пропсами? (L)
□ Пропсы — только то, что нужно? (I)
□ Нет прямого fetch / localStorage в JSX? (D)
```

---

## SOLID и FSD / слои приложения

Feature-Sliced Design **не заменяет** SOLID, а помогает его соблюдать на уровне папок:

| Слой FSD | SOLID |
|----------|-------|
| `shared/ui` | S, I — переиспользуемые dumb-компоненты |
| `entities` | S, D — модель предметной области |
| `features` | S, O — пользовательские сценарии |
| `pages` | S — только композиция |
| `app` | D — providers, router, DI |

```
pages/sign-in     →  собирает feature (S)
features/auth     →  один сценарий (S, O)
entities/session  →  token, user (S, D)
shared/api        →  makeRequest (D)
```

---

## Разбор `diplom`: где SOLID, где нет

Упрощённый аудит учебного проекта (не приговор — точки роста):

| Место | Принцип | Оценка |
|-------|---------|--------|
| `get-library-playlists.ts` | **S** | хорошо — одна трансформация данных |
| `use-load-current-playlist.ts` | **S, D** | лучше, чем fetch в компоненте |
| `make-request.ts` | **D** | абстракция HTTP |
| `sign-in.tsx` | **S, D** | много ответственностей в одном файле |
| `use-load-playlists.ts` | **S** | ок, но fetch всё ещё внутри хука |
| Router без guards | **S, D** | auth-логика размазана по страницам |
| `components/` vs `shared/` | архитектура | нет явного разделения features/entities |

### Как улучшить `sign-in` с SOLID

```
1. GuestRoute (router)        → S: редирект если уже есть token
2. useOAuthCallback (feature) → S: обработка ?code=
3. SignInForm (feature/ui)    → S: только UI
4. spotifyAuthApi (api)       → D: абстракция над OAuth
5. SignInPage (page)          → S: композиция
```

---

## Частые заблуждения

| Миф | Реальность |
|-----|------------|
| «SRP = один метод на класс» | Нет. Одна **зона ответственности**, методов может быть много |
| «SOLID только для Java/C#» | Принципы универсальны; в JS/React они про модули и функции |
| «Больше файлов = всегда лучше» | Переусложнение тоже вредно. SOLID — баланс, не фетиш |
| «Хук = автоматически SRP» | Нет. `useEverything()` нарушает SRP так же, как God-class |
| «TypeScript interface = DIP» | Интерфейс помогает, но DIP — про **направление зависимостей**, не про ключевое слово |
| «FP не нужен SOLID» | Нужен; просто «интерфейсы» — это типы и сигнатуры функций |

### SOLID vs YAGNI / KISS

- **SOLID** помогает, когда код **растёт** и **меняется**.
- Для одноразового скрипта на 30 строк — достаточно **KISS**.
- Не создавай 15 интерфейсов «на вырост» для CRUD-формы на 2 поля.

---

## Чеклист code review

### Single Responsibility
- [ ] Файл / функция / компонент можно описать одним предложением?
- [ ] Тест требует минимум моков?
- [ ] Изменение дизайна не заставляет трогать API-слой?

### Open/Closed
- [ ] Новый вариант добавляется новым модулем, а не новым `case`?
- [ ] Switch / if-цепочки по типу — сигнал пересмотреть дизайн?

### Liskov Substitution
- [ ] Подтип / альтернативная реализация не бросает неожиданные ошибки?
- [ ] Контракт (null, Promise, sync) одинаков?

### Interface Segregation
- [ ] Пропсы / типы / context — только нужные поля?
- [ ] Компонент не получает «весь store»?

### Dependency Inversion
- [ ] Бизнес-логика не импортирует `fetch` / `localStorage` напрямую?
- [ ] В тестах можно подставить mock без monkey-patching?

---

## Полезные ссылки

| Ресурс | URL |
|--------|-----|
| Robert C. Martin — SOLID | [blog.cleancoder.com](https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html) |
| Refactoring Guru — SOLID | [refactoring.guru/design-patterns](https://refactoring.guru/design-patterns) |
| React — Composition vs Inheritance | [react.dev](https://react.dev/learn/passing-props-to-a-component) |
| Feature-Sliced Design | [feature-sliced.design](https://feature-sliced.design/) |
| Functional architecture patterns | [fsharpforfunandprofit.com](https://fsharpforfunandprofit.com/posts/recipe-part2/) |

---

## Краткий словарь

| Термин | Значение |
|--------|----------|
| **Модуль** | класс, функция, файл, компонент — единица с границами |
| **Контракт** | что модуль принимает, возвращает, какие ошибки возможны |
| **Абстракция** | интерфейс, type, сигнатура — без привязки к реализации |
| **Деталь** | конкретика: Postgres, fetch, Spotify SDK |
| **Dependency Injection** | передача зависимостей извне, а не создание внутри |
| **God object / God component** | модуль, который «знает и делает всё» |
| **Polymorphism** | одно имя — разные реализации (OCP, LSP) |
| **Composition** | сборка из маленьких частей (FP, React) |
| **Heuristic** | эвристика — правило-подсказка, не закон природы |

---

## Шпаргалка: один пример на все 5 букв

**Задача:** отправить пользователю чек после оплаты.

| Принцип | Плохо | Хорошо |
|---------|-------|--------|
| **S** | `Order` сам печатает PDF и шлёт email | `Order`, `PdfService`, `MailService` |
| **O** | `if (format === 'pdf')` на каждый формат | `Exporter` interface + новые классы |
| **L** | `MockMailer` бросает в `send()` | `MockMailer` ведёт себя как `Mailer` |
| **I** | `Notifier` с sms + email + push + fax | `EmailNotifier`, `SmsNotifier` |
| **D** | `Checkout` вызывает `nodemailer` | `Checkout` зависит от `Mailer` interface |

**React-версия:**

```tsx
// D + I: узкий API, inject через context
type ReceiptApi = { sendReceipt: (orderId: string) => Promise<void> };

function CheckoutPage() {
  const { sendReceipt } = useReceiptApi(); // D
  return <CheckoutForm onPaid={(id) => sendReceipt(id)} />;
}

// S: форма не знает про nodemailer
function CheckoutForm({ onPaid }: { onPaid: (orderId: string) => void }) {
  // только UI + submit
}
```

---

> **Итог занятия:** SOLID — не про «правильные классы», а про **устойчивость к изменениям**. В React и FP вы применяете те же идеи: маленькие модули, явные контракты, зависимость от абстракций, композиция вместо монолита. Начните с **SRP** и **DIP** — они дают самый быстрый выигрыш в реальных проектах.
