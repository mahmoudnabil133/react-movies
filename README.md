# 🎬 Movie Explorer Frontend Planning

## Pages Overview

| Page | Route | Purpose |
|--------|--------|----------|
| Home | `/` | Discover movies |
| Movies | `/movies` | Browse all movies |
| Search | `/search` | Search movies |
| Movie Details | `/movie/:id` | View movie information |
| Genre | `/genres/:id` | Browse movies by genre |
| Wishlist | `/wishlist` | User saved movies |
| Favorites | `/favorites` | User favorite movies |
| Profile | `/profile` | User information |
| Login | `/login` | User authentication |
| Register | `/register` | Create account |
| 404 | `*` | Invalid routes |

---

# 🏠 Home Page

## Route

`/`

## Features

- Hero Banner
- Search Bar
- Now Playing Movies
- Popular Movies
- Top Rated Movies
- Genres List
- Recommendations

## API Endpoints

### Now Playing

```http
GET /movie/now_playing?api_key={key}
```

### Popular Movies

```http
GET /discover/movie?api_key={key}&sort_by=popularity.desc
```

### Top Rated Movies

```http
GET /discover/movie?api_key={key}&sort_by=vote_average.desc
```

### Genres

```http
GET /genre/movie/list?api_key={key}
```

---

# 🎥 Movies Page

## Route

`/movies`

## Features

- Movies Grid
- Pagination
- Genre Filtering
- Sort By Popularity
- Sort By Rating

## API Endpoints

### Fetch Movies

```http
GET /discover/movie?api_key={key}
```

### Pagination

```http
GET /discover/movie?api_key={key}&page={page}
```

### Filter By Genre

```http
GET /discover/movie?api_key={key}&with_genres={genreId}
```

### Sort By Popularity

```http
GET /discover/movie?api_key={key}&sort_by=popularity.desc
```

### Sort By Rating

```http
GET /discover/movie?api_key={key}&sort_by=vote_average.desc
```

### Fetch Genres

```http
GET /genre/movie/list?api_key={key}
```

---

# 🔍 Search Page

## Route

`/search`

## Features

- Live Search
- Search Suggestions
- Search History

## API Endpoints

### Search Movies

```http
GET /search/movie?api_key={key}&query={query}
```

Example:

```http
GET /search/movie?query=batman
```

---

# 🎬 Movie Details Page

## Route

`/movie/:id`

Example:

```txt
/movie/550
```

## Features

- Movie Poster
- Backdrop
- Overview
- Rating
- Genres
- Release Date
- Trailer
- Recommendations
- Add To Wishlist
- Add To Favorites

## API Endpoints

### Movie Details

```http
GET /movie/{id}?api_key={key}
```

### Videos & Trailer

```http
GET /movie/{id}/videos?api_key={key}
```

### Recommendations

```http
GET /movie/{id}/recommendations?api_key={key}
```

---

# 🎭 Genre Page

## Route

`/genres/:id`

## Features

- Genre Information
- Movies Grid
- Pagination

## API Endpoints

### Movies By Genre

```http
GET /discover/movie?api_key={key}&with_genres={genreId}
```

### Genre List

```http
GET /genre/movie/list?api_key={key}
```

---

# ❤️ Wishlist Page

## Route

`/wishlist`

## Features

- Saved Movies
- Remove Movie
- Open Movie Details

## API Endpoints

### Fetch Wishlist

```http
GET /wishlist
```

---

# ⭐ Favorites Page

## Route

`/favorites`

## Features

- Favorite Movies
- Remove Favorite
- Open Movie Details

## API Endpoints

### Add Favorite

```http
POST /account/{account_id}/favorite/movies
```

### Fetch Favorites

```http
GET /favorites
```

---

# 👤 Profile Page

## Route

`/profile`

## Features

- User Information
- Favorites Count
- Wishlist Count

## API Endpoints

### Account Details

```http
GET /account
```

---

# 🔐 Login Page

## Route

`/login`

## Features

- User Authentication
- JWT Storage
- Redirect After Login

## API Endpoints

### Login

```http
POST /login
```

Request Body:

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

---

# 📝 Register Page

## Route

`/register`

## Features

- Create Account
- Validation
- Auto Login

## API Endpoints

### Register

```http
POST /register
```

Request Body:

```json
{
  "name": "Mahmoud",
  "email": "user@example.com",
  "password": "password"
}
```

---

# ❌ Not Found Page

## Route

```txt
*
```

## Features

- 404 Message
- Back To Home Button

---

# API Usage Summary

| Endpoint | Used In |
|-----------|----------|
| `/movie/now_playing` | Home |
| `/discover/movie` | Home, Movies, Genres |
| `/genre/movie/list` | Home, Movies, Genres |
| `/search/movie` | Search |
| `/movie/{id}` | Movie Details |
| `/movie/{id}/videos` | Movie Details |
| `/movie/{id}/recommendations` | Movie Details |
| `/wishlist` | Wishlist |
| `/account` | Profile |
| `/login` | Login |
| `/register` | Register |
| `/account/{account_id}/favorite/movies` | Favorites |