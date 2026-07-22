# Lesson 49 — HTTP / HTTPS, REST API, клиент–сервер, fetch / axios

Материал для занятия: как устроено общение браузера с сервером, что такое REST и как делать запросы из React.

## Файлы

| Файл                                     | О чём                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [HTTPRESTREADME.md](./HTTPRESTREADME.md) | Полный гайд: клиент–сервер, HTTP/HTTPS, методы, статус-коды, REST, headers, CORS, fetch, axios, сравнение |

## Связь с другими уроками

| Урок                                                          | Связь                               |
| ------------------------------------------------------------- | ----------------------------------- |
| [lesson47 — json-server](../lesson47/JSONSERVERREADME.md)     | Локальный mock REST API             |
| [lesson47 — Redux Thunk](../lesson47/REDUXTHUNKREADME.md)     | Async-запросы в Redux через `fetch` |
| [lesson48 — Redux Toolkit](../lesson48/REDUXTOOLKITREADME.md) | `createAsyncThunk` + API            |

## Быстрый старт

```bash
# fetch — встроен в браузер, ничего ставить не нужно

# axios — опционально
npm install axios
```

### Обсуждение на занятии

1. Инкапсуляция - способ ограничивать доступ к внутренней реализации для внешнего мира.

2. CRUD операции - create (POST), read (GET), update (PUT), delete (DELETE)

Обнови студента

POST /student/1

body - {age: 25, address : 'Moscow'}

У каждого HTTP запроса есть путь, метод, бади, хедеры и СТАТУС

404 - no found
503 - service unavailable
500 - internal server error
200 - ok
403 - forbidden
401 - unauthorized
