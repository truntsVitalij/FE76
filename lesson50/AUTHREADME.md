# Авторизация, виды схем, OAuth 2.0, JWT

Материал для занятия: кто такой «пользователь» для API, как доказать серверу, что вы — это вы, и как разграничить права доступа.

> **Одной фразой:** **аутентификация** — «кто ты?», **авторизация** — «что тебе можно?». На фронте чаще всего: логин → получаем **токен** (часто JWT) → кладём в `Authorization` → сервер проверяет и отдаёт данные. **OAuth 2.0** — стандарт, как делегировать вход через Google / GitHub / и т.д. без передачи пароля третьему сайту.

---

## Содержание

1. [Аутентификация vs авторизация](#аутентификация-vs-авторизация)
2. [Зачем это нужно](#зачем-это-нужно)
3. [Базовый поток «логин → доступ»](#базовый-поток-логин--доступ)
4. [Виды аутентификации / схем](#виды-аутентификации--схем)
5. [Сессии и cookies](#сессии-и-cookies)
6. [HTTP Basic Auth](#http-basic-auth)
7. [API keys](#api-keys)
8. [Bearer-токены](#bearer-токены)
9. [JWT — JSON Web Token](#jwt--json-web-token)
10. [Структура JWT](#структура-jwt)
11. [Access token и Refresh token](#access-token-и-refresh-token)
12. [Где хранить токен на фронте](#где-хранить-токен-на-фронте)
13. [OAuth 2.0](#oauth-20)
14. [Роли в OAuth 2.0](#роли-в-oauth-20)
15. [Grant types (flows) в OAuth 2.0](#grant-types-flows-в-oauth-20)
16. [Authorization Code + PKCE (для SPA)](#authorization-code--pkce-для-spa)
17. [OpenID Connect (OIDC)](#openid-connect-oidc)
18. [Статус-коды и заголовки](#статус-коды-и-заголовки)
19. [Примеры в React / fetch](#примеры-в-react--fetch)
20. [Типичные ошибки](#типичные-ошибки)
21. [Чеклист](#чеклист)
22. [Полезные ссылки](#полезные-ссылки)
23. [Краткий словарь](#краткий-словарь)

---

## Аутентификация vs авторизация

| Термин | Вопрос | Пример |
|--------|--------|--------|
| **Authentication** (аутентификация) | Кто ты? | Логин/пароль, Google OAuth, отпечаток |
| **Authorization** (авторизация) | Что тебе можно? | User читает свой профиль, Admin удаляет посты |
| **Identification** | Как тебя зовут / какой id? | `userId: 42` в токене |

На практике в речи часто говорят «авторизация» про весь процесс входа. В API важно различать:

- **401 Unauthorized** — «не представился» / токен битый / нет токена (по смыслу ближе к *не аутентифицирован*).
- **403 Forbidden** — «я тебя знаю, но так делать нельзя».

```
┌──────────────┐     login (credentials/креды)      ┌──────────────┐
│   Клиент     │ ───────────────────────────▶ │   Сервер     │
│   (React)    │ ◀── token / Set-Cookie ────── │   (API)      │
└──────────────┘                              └──────────────┘
        │                                            │
        │  GET /me   Authorization: Bearer <token>   │
        └───────────────────────────────────────────▶│
                                                     │ verify → allow / deny
```

---

## Зачем это нужно

- Защитить личные данные (профиль, заказы, черновики).
- Разделить роли: гость / пользователь / админ.
- Не доверять клиенту: UI можно обойти; **проверку делает сервер**.
- Для публичных API — ограничить злоупотребление (квоты, ключи).

> Frontend **не** является источником правды о правах. Скрытие кнопки «Удалить» — UX, не безопасность.

---

## Базовый поток «логин → доступ»

1. Пользователь вводит email + password (или жмёт «Войти через Google»).
2. Сервер проверяет credentials.
3. Сервер выдаёт **доказательство сессии**: cookie, JWT, пару access/refresh.
4. Клиент сохраняет доказательство.
5. Каждый защищённый запрос несёт доказательство (header / cookie).
6. Сервер валидирует → отдаёт данные или 401/403.
7. Logout: удалить токен у клиента (+ при refresh — инвалидировать на сервере).

Типичные эндпоинты (пример):

```
POST   /auth/login
POST   /auth/register
POST   /auth/refresh
POST   /auth/logout
GET    /me
```

---

## Виды аутентификации / схем

| Схема | Кратко | Где встречается |
|-------|--------|-----------------|
| **Session + Cookie** | Сервер хранит сессию, браузер шлёт cookie | Классические сайты, SSR |
| **HTTP Basic** | `login:password` в Base64 в каждом запросе | Внутренние/временные API, редко в SPA |
| **API Key** | Статичный секрет в header/query | Публичные сервисы, server-to-server |
| **Bearer Token** | Непрозрачный или JWT в `Authorization` | SPA + REST API |
| **JWT** | Самодостаточный подписанный токен | Microservices, mobile, SPA |
| **OAuth 2.0** | Делегированный доступ через провайдера | «Войти через Google», сторонние интеграции |
| **mTLS / сертификаты** | Клиентский TLS-сертификат | Корпоративные / IoT |
| **OTP / Magic link / WebAuthn** | Код из SMS/email, ссылка, passkey | 2FA, passwordless |

Часто комбинируют: **OAuth 2.0 для входа** → на выходе **JWT (access) + refresh**.

---

## Сессии и cookies

### Как работает

1. `POST /login` с паролем.
2. Сервер создаёт запись сессии в памяти/Redis/БД: `sessionId → userId`.
3. Ответ: `Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax`.
4. Браузер сам прикрепляет cookie к запросам на тот же домен.
5. Сервер читает cookie → находит сессию → знает пользователя.

### Плюсы / минусы

| + | − |
|---|---|
| Cookie можно сделать `HttpOnly` (JS не читает → сложнее XSS-кража) | Нужен стор сессий на сервере |
| Привычная модель для веба | Сложнее для мобилок / нескольких API |
| Logout = удалить сессию на сервере | CORS + credentials требуют аккуратной настройки |

Важные флаги cookie:

| Флаг | Зачем |
|------|-------|
| `HttpOnly` | Недоступна из `document.cookie` |
| `Secure` | Только HTTPS |
| `SameSite=Strict/Lax/None` | Защита от CSRF |
| `Path` / `Domain` / `Max-Age` | Область и срок жизни |

> Для SPA на другом домене (`app.com` → `api.com`) cookie-сессии работают, но нужны `credentials: 'include'` и правильный CORS (`Access-Control-Allow-Credentials`).

---

## HTTP Basic Auth

Каждый запрос:

```http
GET /students HTTP/1.1
Host: api.example.com
Authorization: Basic YW5uYTpwYXNzd29yZA==
```

`YW5uYTpwYXNzd29yZA==` = Base64(`anna:password`).

| + | − |
|---|---|
| Просто | Пароль фактически в каждом запросе |
| Встроено в HTTP | Base64 ≠ шифрование → только поверх HTTPS |
| | Плохо для SPA (некуда «безопасно» держать пароль) |

На фронте почти не используют для пользовательского логина.

---

## API keys

Статичный ключ, выданный сервисом:

```http
GET /weather?city=Minsk
X-API-Key: sk_live_abc123
```

или

```http
GET /weather?city=Minsk&api_key=sk_live_abc123
```

| + | − |
|---|---|
| Просто для server-to-server | Ключ в query попадает в логи |
| Легко отозвать / ротировать | Не привязан к конкретному пользователю (часто) |
| | **Нельзя** светить в клиентском бандле React — любой увидит в DevTools |

> В браузерном приложении API-ключ погоды/карт почти всегда уезжает на **ваш backend** (прокси), а не лежит в Vite env как «секрет».

---

## Bearer-токены

Схема:

```http
Authorization: Bearer <token>
```

`Bearer` = «предъявитель»: у кого токен — тот и считается аутентифицированным (пока токен валиден).

Токен бывает:

1. **Opaque** (непрозрачный) — случайная строка; сервер смотрит в БД/Redis: `token → user`.
2. **JWT** — самодостаточный; сервер проверяет подпись и claims без обязательного lookup (иногда всё равно blacklist).

---

## JWT — JSON Web Token

**JWT** — компактный способ передать JSON-утверждения (claims), **подписанные** секретом или парой ключей.

Идея: сервер при логине собирает payload (`sub`, `role`, `exp`…) → подписывает → отдаёт клиенту одну строку. При каждом запросе клиент шлёт JWT, сервер **проверяет подпись и срок** и доверяет содержимому.

```
Клиент                         Auth-сервер                    Resource API
  │  POST /login                    │                              │
  │ ───────────────────────────────▶│                              │
  │ ◀────── JWT access (+ refresh) ─│                              │
  │                                 │                              │
  │  GET /blogs  Authorization: Bearer <jwt>                       │
  │ ──────────────────────────────────────────────────────────────▶│
  │                                 │         verify signature     │
  │ ◀────────────────────────────── JSON ──────────────────────────│
```

### Чем JWT удобен

- Stateless: много инстансов API могут проверять один и тот же токен без общей session-таблицы (если нет blacklist).
- Удобно для microservices: сервис читает `role` / `sub` из токена.
- Работает одинаково для web и mobile.

### Чем неудобен / опасно

- До `exp` токен formalно валиден — **отозвать сложно** (нужен blacklist / короткий TTL + refresh).
- Payload **не зашифрован** (обычно) — только подписан. Не кладите пароли и секреты в JWT; всё читается после Base64.
- Большой JWT раздувает каждый запрос.
- Утечка JWT = доступ от имени пользователя до истечения срока.

---

## Структура JWT

JWT — **три части через точку**:

```
xxxxx.yyyyy.zzzzz
│     │     │
│     │     └─ Signature
│     └─ Payload (claims)
└─ Header
```

Каждая часть — **Base64URL** (не «секретный» формат, просто кодирование).

Пример (учебный, сокращённо):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.
eyJzdWIiOiI0MiIsIm5hbWUiOiJBbm5hIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MTAwMDAwMDAsImV4cCI6MTcxMDAwMzYwMH0
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

Разбор: [jwt.io](https://jwt.io) (только с тестовыми токенами!).

### 1. Header

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

| Поле | Смысл |
|------|--------|
| `alg` | Алгоритм подписи: `HS256` (симметричный секрет), `RS256` / `ES256` (пара ключей) |
| `typ` | Обычно `JWT` |
| `kid` | (опционально) id ключа, если ключей несколько |

### 2. Payload (claims)

```json
{
  "sub": "42",
  "name": "Anna",
  "role": "user",
  "iat": 1710000000,
  "exp": 1710003600,
  "iss": "https://auth.example.com",
  "aud": "https://api.example.com"
}
```

#### Registered claims (стандартные)

| Claim | Имя | Смысл |
|-------|-----|--------|
| `sub` | Subject | Id пользователя (или сущности) |
| `iss` | Issuer | Кто выпустил токен |
| `aud` | Audience | Для кого токен предназначен |
| `exp` | Expiration | Unix-time: после этого токен невалиден |
| `nbf` | Not Before | Не принимать до этого времени |
| `iat` | Issued At | Когда выпущен |
| `jti` | JWT ID | Уникальный id токена (удобно для revoke) |

#### Custom / private claims

Любые поля приложения: `role`, `permissions`, `email`, `tenantId`…

> Не кладите чувствительные данные: payload видно всем, у кого есть токен.

### 3. Signature

Для `HS256` упрощённо:

```
HMACSHA256(
  base64url(header) + "." + base64url(payload),
  secret
)
```

Для `RS256`: подпись **приватным** ключом auth-сервера; API проверяет **публичным**.

Подпись отвечает на вопрос: «токен не подделали и не изменили claims?».

### Что проверяет сервер

1. Формат из 3 частей.
2. Подпись валидна (`alg` + ключ).
3. `exp` (и при наличии `nbf`) в допустимых границах.
4. При необходимости: `iss`, `aud`, наличие в blacklist / версия ключа.

### Типы связанных стандартов

| Аббревиатура | Смысл |
|--------------|--------|
| **JWS** | Подписанный токен (обычный JWT в API) |
| **JWE** | Зашифрованный токен (редко на учебном уровне) |
| **JWK / JWKS** | Формат ключей; URL `/.well-known/jwks.json` для публичных ключей |

---

## Access token и Refresh token

| | Access token | Refresh token |
|--|--------------|---------------|
| Назначение | Доступ к API | Получить новую пару токенов |
| TTL | Короткий (минуты–час) | Длинный (дни–недели) |
| Куда слать | `Authorization: Bearer` на resource API | Только на `/auth/refresh` |
| Формат | Часто JWT | Часто opaque (хранится в БД) или JWT |
| Риск утечки | Высокий, но короткоживущий | Критичный — даёт долгий доступ |

Типичный цикл:

```
1. login        → access + refresh
2. API-запросы  → access
3. access истёк → POST /auth/refresh { refresh }
4.             ← новые access (+ иногда новый refresh)
5. logout       → удалить refresh на сервере + очистить клиент
```

Пример ответа логина:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "d9f3c2a1-....",
  "expiresIn": 3600,
  "tokenType": "Bearer"
}
```

**Refresh rotation:** при каждом refresh выдаётся новый refresh, старый становится недействительным — если украденный токен используют параллельно, сервер может заметить reuse и отозвать всю цепочку.

---

## Где хранить токен на фронте

| Место | XSS | CSRF | Удобство для SPA | Комментарий |
|-------|-----|------|------------------|-------------|
| `localStorage` / `sessionStorage` | Уязвим | Нет (не шлётся сам) | Высокое | Просто; при XSS токен крадут |
| Memory (переменная JS) | Лучше при reload теряется | Нет | Среднее | + silent refresh; сложнее UX |
| Cookie `HttpOnly` | Защищён от JS | Нужна защита CSRF | Среднее | Часто для refresh; access иногда отдельно |

Практика для учебных SPA:

- Часто access (JWT) в `localStorage` + header `Authorization` — как в `blog-application`.
- В проде чаще: **короткий access в memory**, **refresh в HttpOnly Secure SameSite cookie**.

Никогда:

- Не коммитьте секреты и прод-токены в git.
- Не кладите JWT в URL query (`?token=...`) — утечёт в историю и логи.

---

## OAuth 2.0

**OAuth 2.0** — фреймворк **делегированной авторизации** (authorization framework).

Пользователь разрешает приложению **A** действовать от его имени в сервисе **B**, **не отдавая пароль** приложению A.

Классический сценарий: «Войти через Google» / «Разрешить Notion доступ к Google Drive».

> OAuth 2.0 сам по себе про **доступ к ресурсам** (scopes). «Кто пользователь» в человеческом смысле дополняет **OpenID Connect**.

Без OAuth (плохо):

```
Сайт → «дай логин/пароль от Google» → опасно и недопустимо
```

С OAuth:

```
Сайт → редирект на Google → пользователь логинится у Google →
Google спрашивает согласие → редирект обратно с code →
сайт меняет code на tokens → доступ в рамках scopes
```

---

## Роли в OAuth 2.0

| Роль | Кто | Пример |
|------|-----|--------|
| **Resource Owner** | Пользователь | Вы |
| **Client** | Приложение, которому нужен доступ | Ваш React-сайт / backend |
| **Authorization Server** | Выдаёт коды и токены | `accounts.google.com` |
| **Resource Server** | API с защищёнными данными | Google Calendar API, ваш `/api` |

Часто Authorization Server и Resource Server — один продукт (Auth0, Keycloak, Cognito), но роли разные.

Важные понятия:

| Термин | Смысл |
|--------|--------|
| **Client ID** | Публичный id приложения у провайдера |
| **Client Secret** | Секрет приложения (**только на backend**, не в SPA) |
| **Redirect URI** | Куда вернуть пользователя после согласия (whitelist) |
| **Scope** | Права: `openid profile email`, `read:blogs` |
| **Consent** | Экран «разрешить доступ к …» |
| **State** | Случайная строка против CSRF на редиректе |
| **PKCE** | Защита public-клиентов (SPA/mobile) без secret |

---

## Grant types (flows) в OAuth 2.0

| Flow | Кто использует | Сейчас |
|------|----------------|--------|
| **Authorization Code** | Web с backend | ✅ основной |
| **Authorization Code + PKCE** | SPA, mobile | ✅ рекомендуемый для публичных клиентов |
| **Client Credentials** | Server ↔ server, без пользователя | ✅ для машин |
| **Device Code** | TV / CLI | ✅ нишевый |
| **Implicit** | Старые SPA | ❌ устарел / не использовать |
| **Resource Owner Password** | Логин/пароль напрямую в client | ❌ почти не использовать |

### Client Credentials (кратко)

Приложение само (без юзера) получает токен своим `client_id` + `client_secret` — для фоновых джобов, микросервисов.

### Implicit (почему умер)

Раньше токен отдавали сразу в URL fragment (`#access_token=...`). Риски утечки через историю/Referer + нет refresh по стандарту. Заменён на **Auth Code + PKCE**.

---

## Authorization Code + PKCE (для SPA)

Самый актуальный поток для React SPA.

### Подготовка (клиент)

1. Сгенерировать `code_verifier` (случайная строка).
2. `code_challenge = BASE64URL(SHA256(code_verifier))`.
3. Сохранить `code_verifier` (sessionStorage / memory).
4. Сгенерировать `state`.

### Редирект на Authorization Server

```
GET https://auth.example.com/authorize
  ?response_type=code
  &client_id=YOUR_CLIENT_ID
  &redirect_uri=https://app.example.com/callback
  &scope=openid%20profile%20email
  &state=xyz
  &code_challenge=CHALLENGE
  &code_challenge_method=S256
```

### Пользователь логинится и соглашается

Authorization Server редиректит:

```
https://app.example.com/callback?code=AUTH_CODE&state=xyz
```

Клиент проверяет `state`.

### Обмен code → tokens

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTH_CODE
&redirect_uri=https://app.example.com/callback
&client_id=YOUR_CLIENT_ID
&code_verifier=VERIFIER
```

Ответ:

```json
{
  "access_token": "eyJ...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "...",
  "id_token": "eyJ..."
}
```

`id_token` появляется, если подключен **OpenID Connect** (`scope` включает `openid`).

```
┌─────────┐   redirect /authorize    ┌────────────────────┐
│  SPA    │ ───────────────────────▶ │ Authorization      │
│         │ ◀── redirect ?code=... ──│ Server (Google…)   │
│         │                           └────────────────────┘
│         │   POST /token + verifier
│         │ ───────────────────────▶ (тот же AS)
│         │ ◀── access / refresh / id_token
└─────────┘
```

PKCE мешает украсть `code` с redirect: без `code_verifier` обмен на токены не пройдёт.

---

## OpenID Connect (OIDC)

**OIDC** = слой идентификации поверх OAuth 2.0.

| OAuth 2.0 | OIDC |
|-----------|------|
| «Можно ли приложению читать календарь?» | «Кто залогинился?» |
| `access_token` | + **`id_token`** (JWT с профилем) |
| scopes доступа к API | `openid`, `profile`, `email` |

`id_token` (JWT) типично содержит: `sub`, `email`, `name`, `iss`, `aud`, `exp`…

Эндпоинт userinfo (часто):

```
GET /userinfo
Authorization: Bearer <access_token>
```

На занятии достаточно: **OAuth даёт доступ, OIDC говорит, кто пользователь**.

---

## Статус-коды и заголовки

| Код | Когда |
|-----|--------|
| **200 / 201** | Успех (в т.ч. логин) |
| **401** | Нет / просрочен / битый токен |
| **403** | Токен ок, прав нет |
| **400** | Невалидный grant / code |
| **429** | Слишком много попыток логина |

Заголовки:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Сервер может ответить challenge:

```http
WWW-Authenticate: Bearer realm="api", error="invalid_token"
```

Связь с [lesson49 — Headers / статус-коды](../lesson49/HTTPRESTREADME.md).

---

## Примеры в React / fetch

### Логин и сохранение токена

```ts
async function login(email: string, password: string) {
  const response = await fetch("https://api.example.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }

  const data = await response.json();
  localStorage.setItem("token", data.accessToken);
  return data;
}
```

### Защищённый запрос

```ts
async function getMe() {
  const token = localStorage.getItem("token");

  const response = await fetch("https://api.example.com/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
    // redirect to /sign-in
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
```

### Разбор JWT на клиенте (только для UI, не для безопасности)

```ts
function parseJwtPayload(token: string): Record<string, unknown> {
  const [, payload] = token.split(".");
  const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  return JSON.parse(json);
}

// Пример: показать имя / проверить exp для UX
const payload = parseJwtPayload(token);
```

> Клиентский разбор **не заменяет** серверную проверку подписи.

### axios interceptor

```ts
import axios from "axios";

const api = axios.create({ baseURL: "https://api.example.com" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  },
);
```

### Private route (идея)

```tsx
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
}
```

Это только UI-гард. API всё равно должен проверять токен.

---

## Типичные ошибки

### 1. Путать 401 и 403

- Нет токена / истёк → **401**.
- User пытается удалить чужой пост → **403**.

### 2. Класть `client_secret` в React

Секрет OAuth-клиента только на backend. В SPA — public client + PKCE.

### 3. Считать Base64 «шифрованием»

Header и payload JWT читаются кем угодно. Защищает **подпись** + HTTPS в транзите.

### 4. Долгий access JWT без refresh/revoke

Украли — гуляют месяцами. Делайте короткий `exp` + refresh.

### 5. Токен в query string

```
❌ https://api.example.com/me?token=eyJ...
✅ Authorization: Bearer eyJ...
```

### 6. Доверять `role` только из UI

Скрытая кнопка ≠ защита. Сервер читает claims / БД сам.

### 7. Игнорировать HTTPS

Без TLS cookie и Bearer видны в сети.

### 8. Логировать токены

Access/refresh в консоли, Sentry, URL — путь к утечке.

---

## Чеклист

```text
# 1. Различать authentication и authorization
# 2. Знать: session/cookie, Basic, API key, Bearer, JWT, OAuth 2.0
# 3. JWT = header.payload.signature (Base64URL), проверить alg/exp/подпись на сервере
# 4. Не класть секреты в payload JWT
# 5. Access короткий + Refresh длинный
# 6. Header: Authorization: Bearer <token>
# 7. 401 = не аутентифицирован, 403 = нет прав
# 8. OAuth: Resource Owner, Client, Authorization Server, Resource Server
# 9. Для SPA: Authorization Code + PKCE (не Implicit)
# 10. OIDC = OAuth + id_token («кто ты»)
# 11. На фронте: хранение токена осознанно (XSS/CSRF trade-off)
# 12. Проверку всегда делает сервер
```

Мини-шпаргалка запросов:

```http
POST /auth/login
Content-Type: application/json

{"email":"anna@example.com","password":"secret"}
```

```http
GET /me HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

```http
POST /oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code&code=...&redirect_uri=...&client_id=...&code_verifier=...
```

---

## Полезные ссылки

| Ресурс | Зачем |
|--------|--------|
| [RFC 6749 — OAuth 2.0](https://datatracker.ietf.org/doc/html/rfc6749) | Спецификация OAuth |
| [RFC 7636 — PKCE](https://datatracker.ietf.org/doc/html/rfc7636) | PKCE |
| [RFC 7519 — JWT](https://datatracker.ietf.org/doc/html/rfc7519) | Спецификация JWT |
| [jwt.io](https://jwt.io) | Разбор структуры токена |
| [OAuth 2.0 simplified](https://www.oauth.com/) | Понятные объяснения flows |
| [OWASP Auth Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) | Безопасные практики |
| [lesson49 HTTPRESTREADME](../lesson49/HTTPRESTREADME.md) | Headers, 401/403, fetch |

---

## Краткий словарь

| Термин | Одной строкой |
|--------|----------------|
| Authentication | Доказать, кто ты |
| Authorization | Проверить, что тебе можно |
| Session | Серверное состояние «залогинен» |
| Cookie | Кусок данных, который браузер шлёт сам |
| Bearer token | Токен в заголовке `Authorization` |
| JWT | Подписанный JSON из трёх Base64URL-частей |
| Claim | Поле в payload JWT |
| Access / Refresh | Короткий ключ к API / ключ обновить access |
| OAuth 2.0 | Делегированный доступ без передачи пароля |
| Scope | Набор разрешённых действий |
| PKCE | Защита code-flow для SPA без client secret |
| OIDC | OAuth + идентификация пользователя (`id_token`) |
| XSS | Кража токена из JS-хранилища |
| CSRF | Подделка запроса с cookie жертвы |

---

> В `blog-application` упрощённый учебный вариант: после SignIn в `localStorage` кладётся `token`, дальше UI смотрит `useIsLogin`. Настоящая проверка подписи JWT и прав — всегда на стороне API.
