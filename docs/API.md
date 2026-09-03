# Express Blog API

REST API for reading and managing blog posts.

## Base URL

```text
http://localhost:3000
```

## Response formats

The implemented read endpoints return JSON. Error responses use this structure:

```json
{
  "message": "Error description"
}
```

The create, update, and delete endpoints are currently placeholders and return
plain text.

## Post resource

| Property  | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| `id`      | integer  | Unique positive identifier    |
| `title`   | string   | Post title                    |
| `content` | string   | Post content                  |
| `image`   | string   | Path to the post image        |
| `tags`    | string[] | Tags associated with the post |

Example:

```json
{
  "id": 1,
  "title": "Ciambellone della domenica",
  "content": "Un ciambellone soffice e semplice, perfetto per la colazione.",
  "image": "/images/ciambellone.jpeg",
  "tags": ["dolci", "colazione", "ciambellone"]
}
```

## Endpoints

| Method   | Path         | Description                  | Current status |
| -------- | ------------ | ---------------------------- | -------------- |
| `GET`    | `/`          | Show general API information | Implemented    |
| `GET`    | `/posts`     | Get all posts                | Implemented    |
| `GET`    | `/posts/:id` | Get one post by ID           | Implemented    |
| `POST`   | `/posts`     | Create a post                | Placeholder    |
| `PUT`    | `/posts/:id` | Update a post                | Placeholder    |
| `DELETE` | `/posts/:id` | Delete a post                | Placeholder    |

### `GET /`

Returns a welcome message and a summary of the available endpoints.

#### Successful response

Status: `200 OK`

```json
{
  "message": "Welcome to the Express Blog API",
  "apiEndpoints": {
    "posts": {
      "totalCount": 5,
      "endpoints": [
        {
          "method": "GET",
          "path": "/posts",
          "description": "Recupera tutti i post"
        }
      ]
    }
  }
}
```

The `endpoints` array in the actual response contains all the routes listed in
the [Endpoints](#endpoints) table.

### `GET /posts`

Returns an array containing all posts. Query parameters can be combined; they
are applied in this order: filter by tag, search, sort, and limit.

#### Query parameters

| Parameter | Type    | Accepted values      | Description                                                     |
| --------- | ------- | -------------------- | --------------------------------------------------------------- |
| `tag`     | string  | One tag              | Keep posts containing the tag; comparison is case-insensitive   |
| `search`  | string  | Any search term      | Search in `title` and `content`; comparison is case-insensitive |
| `sortBy`  | string  | `id`, `title`        | Sort the resulting posts by the selected property               |
| `order`   | string  | `asc`, `desc`        | Select the sorting direction; requires `sortBy`                 |
| `_limit`  | integer | Any positive integer | Return at most the requested number of posts                    |

When `sortBy` is present and `order` is omitted, the default order is `asc`.
If a valid tag or search term has no matches, the endpoint returns an empty
array with status `200 OK`.

#### Example requests

Filter, search, and sort posts:

```http
GET /posts?tag=dolci&search=torta&sortBy=title&order=desc
```

Sort by descending ID and return at most two posts:

```http
GET /posts?sortBy=id&order=desc&_limit=2
```

#### Successful response (get all posts)

Status: `200 OK`

```json
[
  {
    "id": 5,
    "title": "Torta paesana della tradizione",
    "content": "La classica torta paesana, ricca e dal sapore rustico.",
    "image": "/images/torta_paesana.jpeg",
    "tags": ["dolci", "torta", "tradizione"]
  }
]
```

#### Error responses

Status: `400 Bad Request`

A `400` response is returned when:

- `sortBy` is not `id` or `title`;
- `order` is provided without `sortBy`;
- `order` is not `asc` or `desc`;
- `_limit` is not a positive integer;
- a query parameter that expects one value is repeated.

Example:

```http
GET /posts?sortBy=date
```

```json
{
  "message": "Campo sortBy non valido. I valori consentiti sono: id, title"
}
```

Only one value is supported for each query parameter. For example,
`?tag=dolci&tag=pasta` is not supported and returns `400 Bad Request`.

### `GET /posts/:id`

Returns the post with the requested ID.

#### Path parameters

| Parameter | Type    | Description              |
| --------- | ------- | ------------------------ |
| `id`      | integer | Positive post identifier |

#### Example request

```http
GET /posts/1
```

#### Successful response (get single post)

Status: `200 OK`

```json
{
  "id": 1,
  "title": "Ciambellone della domenica",
  "content": "Un ciambellone soffice e semplice, perfetto per la colazione.",
  "image": "/images/ciambellone.jpeg",
  "tags": ["dolci", "colazione", "ciambellone"]
}
```

#### Invalid ID

Status: `400 Bad Request`

Returned when `id` is not a positive integer, for example `/posts/abc` or
`/posts/0`.

```json
{
  "message": "L'id deve essere un numero intero positivo"
}
```

#### Post not found

Status: `404 Not Found`

Returned when the ID is valid but does not belong to an existing post.

```json
{
  "message": "Post non trovato"
}
```

### `POST /posts`

This endpoint is a placeholder. It does not currently read a request body or
create a post.

#### Current response

Status: `200 OK`

```text
TODO: Creazione di un nuovo post
```

### `PUT /posts/:id`

This endpoint is a placeholder. It does not currently read a request body,
validate the ID, or update a post.

#### Current response (put)

Status: `200 OK`

```text
TODO: Aggiornamento del post con id: 1
```

### `DELETE /posts/:id`

This endpoint is a placeholder. It does not currently validate the ID or delete
a post.

#### Current response (delete)

Status: `200 OK`

```text
TODO: Eliminazione del post con id: 1
```

## Unknown routes

Requests that do not match an existing route return:

Status: `404 Not Found`

```json
{
  "message": "Not Found"
}
```

## Current implementation notes

- Posts are stored in memory, so there is no database persistence.
- Multiple values for the same query parameter are not supported.
- Empty `tag`, `search`, `sortBy`, `order`, and `_limit` values are currently
  treated as if the parameter had been omitted.
- Query parameters that are not recognized are currently ignored.
