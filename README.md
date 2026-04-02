# React E-commerce App

A responsive e-commerce application built with React + Vite that includes product browsing, cart management, authentication, and a mock checkout flow.

## Features

- Product listing from [Fake Store API](https://fakestoreapi.com/docs)
- Loading, error, and empty states for API fetch
- Load more pagination behavior
- Session-level caching for product API response
- Cart add/remove with total items and total price
- Mock authentication (login/register) using local storage
- Protected checkout action (requires authenticated user)
- Checkout form simulation and order confirmation summary

## Tech Stack

- React
- React Router
- Vite
- HTML5 / CSS3 / JavaScript (ES6+)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

4. Preview production build:

```bash
npm run preview
```

## Deployment

You can deploy the `dist` output to:

- Vercel
- Netlify
- GitHub Pages (with a Vite pages workflow)

## Notes

- This app uses a mock checkout; no real payments are processed.
- Authentication is simulated for assignment purposes.
