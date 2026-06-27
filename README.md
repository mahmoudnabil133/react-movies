# 📚 Online Bookstore

A modern, responsive online bookstore built with React, TypeScript, and Vite. Powered by the OpenLibrary API.

## Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Discover popular books |
| Search | `/search` | Search books |
| Book Details | `/book/:id` | View book information |
| Wishlist | `/wishlist` | User saved books |
| Login | `/login` | User authentication |
| Register | `/register` | Create account |
| 404 | `*` | Invalid routes |

## Tech Stack

- React 19 + Vite 8 + TypeScript
- React Router v7
- Zustand (state management)
- Tailwind CSS v4 + shadcn/ui
- OpenLibrary API
- Express.js + MongoDB (auth + wishlist)

## Getting Started

```bash
npm install
npm run dev
```

## API

Powered by [OpenLibrary](https://openlibrary.org/developers/api).
