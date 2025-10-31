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

## Users

### Users

`GET /users`

No body required

Returns: `200 OK`
```json
[
  {
    "email": "adam@example.com",
    "authorities": []
  },
  {
    "email": "bob@example.com",
    "authorities": []
  }
]
```

### Me

`GET /users/me`

No body required

Returns: `200 OK`
```json
{
  "email": "adam@example.com",
  "authorities": []
}
```