# BGSv2 API

Unless otherwise specified, each request requires the following header:
```
Authorization: Bearer <jwt-token>
```

## Auth

### Login

`POST /auth/login`

**No authorization header required**

Body:
```json
{
  "email": "adam@example.com",
  "password": "adam-password"
}
```

Returns: `200 OK`
```json
{
  "token": "abc...",
  "expiresIn": 3600000
}
```

### Register

`POST /auth/register`

**No authorization header required**

Body:
```json
{
  "email": "adam@example.com",
  "password": "adam-password"
}
```

Returns: `201 CREATED`
```json
{
  "id": 1,
  "email": "adam@example.com",
  "authorities": []
}
```

## Users

### Get users

`GET /users`

Authority: `MANAGE_USERS`

No body required

Returns: `200 OK`
```json
[
  {
    "id": 1,
    "email": "adam@example.com",
    "authorities": []
  },
  {
    "id": 2,
    "email": "bob@example.com",
    "authorities": []
  }
]
```

### Get me

`GET /users/me`

No body required

Returns: `200 OK`
```json
{
  "id": 1,
  "email": "adam@example.com",
  "authorities": []
}
```

### Get user

`GET /users/{id}`

Authority: `MANAGE_USERS`

No body required

Returns: `200 OK`
```json
{
  "id": 1,
  "email": "adam@example.com",
  "authorities": []
}
```

### Delete user

`DELETE /users/{id}`

Authority: `MANAGE_USERS`

No body required

Returns: `204 NO CONTENT`
