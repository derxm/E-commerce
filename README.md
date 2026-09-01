# DexHub

DexHub is a modern, fully responsive e-commerce web application built with **React** and **Vite**. It features a complete storefront experience — browsing, search, filtering, sorting, product details, a cart, and a wishlist — styled with a distinctive **black, cream, and gold** theme with light/dark mode.

## Features

- **Product catalog** — 190+ real products sourced live from the [DummyJSON API](https://dummyjson.com/docs/products), each with an image that matches the item.
- **Categories** — browse by category with a visual grid on the home page (DummyJSON's fine-grained categories are grouped into familiar buckets such as Shoes, Bags, Beauty, Home, Electronics, and more).
- **Search & filtering** — full-text search across titles, descriptions, and categories.
- **Sorting** — by price (low/high), rating, or name.
- **Product details** — image, rating stars, review count, and full description.
- **Cart** — add, remove, and adjust quantities with a live total.
- **Wishlist** — save and remove favourites with a persistent toggle.
- **Currency** — all prices displayed in **Naira (₦)**, converted from USD.
- **Theming** — black/cream/gold palette with a light/dark toggle, persisted to `localStorage`.
- **Persistence** — cart, wishlist, and theme selections survive page reloads via `localStorage`.
- **Lazy-loaded images** with a graceful fallback if an image fails to load.

## Tech Stack

| Layer     | Technology                                   |
| --------- | -------------------------------------------- |
| Frontend  | [React 19](https://react.dev)                |
| Build     | [Vite](https://vite.dev)                     |
| Routing   | [React Router v7](https://reactrouter.com)   |
| Data      | [DummyJSON API](https://dummyjson.com)       |
| Linting   | [OxLint](https://oxc.rs/docs/guide/usage/linter.html) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+ and npm

### Installation

```bash
git clone https://github.com/derxm/E-commerce.git
cd E-commerce
npm install
```

> No API keys are required — data is fetched from the public DummyJSON API at runtime.

### Running locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Building for production

```bash
npm run build
npm run preview
```

`npm run build` outputs the production bundle to `dist/`; `npm run preview` serves it locally.

### Linting

```bash
npm run lint
```

## Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Build the app for production             |
| `npm run preview` | Preview the production build locally     |
| `npm run lint`    | Run OxLint over the codebase             |

## Project Structure

```
├── public/                 # Static assets (icons, favicon)
└── src/
    ├── components/         # Reusable UI: Navbar, Footer, ProductCard, SearchBar, Loader
    ├── pages/              # Views: Home, Products, ProductDetails, Cart, Wishlist
    ├── context/            # CartContext, WishlistContext, ThemeContext
    ├── data/               # Category metadata & DummyJSON category mapping
    ├── services/           # DummyJSON API client
    ├── utils/              # Currency & image helpers
    ├── App.jsx             # Route definitions
    ├── main.jsx            # App entry point
    ├── index.css           # Global styles & theme variables
    └── shared.css          # Shared component styles
```

## Architecture Notes

- **Data layer** — `src/services/api.js` wraps the DummyJSON REST API (`getProducts`, `getProductById`, `getCategories`, `getProductsByCategory`) and normalises each response into a consistent product shape.
- **Category mapping** — `src/data/products.js` exports a `CATEGORY_MAP` that translates DummyJSON's granular categories (e.g. `mens-shirts`, `womens-bags`) into the app's display buckets, plus labels and emojis used across UI components.
- **State management** — context providers in `src/context/` manage cart, wishlist, and theme state, each synced to `localStorage` for persistence.
- **Currency** — `src/utils/currency.js` applies a fixed USD→NGN conversion so every price renders as Naira with thousands separators.

## License

This project is for demonstration purposes and is not currently licensed for redistribution.