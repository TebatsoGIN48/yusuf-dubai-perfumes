# Yusuf Dubai Perfumes - Project Structure Guide

This guide outlines a recommended file and folder structure for the Yusuf Dubai Perfumes eCommerce site, using Vite and React.

## Root Directory

```
YusufWebsite2-main/
├── client/                     # Vite's root directory for the frontend application
│   ├── public/                 # Static assets served directly by Vite
│   │   ├── images/             # All images (logo, products, banners)
│   │   │   ├── logo/           # Logo files
│   │   │   │   └── YDP_Transparent.png  (Example: Your logo here)
│   │   │   ├── men/            # Product images for men's section
│   │   │   ├── women/          # Product images for women's section
│   │   │   └── unisex/         # Product images for unisex section
│   │   └── favicon.ico         # Your site's favicon
│   │
│   ├── src/                    # Main React application source code
│   │   ├── components/         # Reusable React components
│   │   │   ├── common/         # General components (e.g., Button, Card, Modal)
│   │   │   │   └── BuyNowButton.tsx  (Will link to WhatsApp: https://wa.me/27713003566)
│   │   │   ├── layout/         # Structural components (Navbar, Footer, PageLayout)
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── product/        # Components related to products
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductList.tsx
│   │   │   │   └── FeaturedProducts.tsx
│   │   │   └── ui/             # Specific UI elements (e.g., Hero section)
│   │   │       └── Hero.tsx
│   │   │
│   │   ├── pages/              # Page-level components (rendered by React Router)
│   │   │   ├── HomePage.tsx    # Content for the main landing page
│   │   │   ├── MenPage.tsx     # Content for the Men's perfume page
│   │   │   ├── WomenPage.tsx   # Content for the Women's perfume page
│   │   │   ├── UnisexPage.tsx  # Content for the Unisex perfume page
│   │   │   ├── ContactPage.tsx # Content for the Contact Us page
│   │   │   └── AdminPage.tsx   # (Future) Content for the Admin dashboard
│   │   │
│   │   ├── router/             # React Router configuration
│   │   │   └── index.tsx       # Defines all application routes
│   │   │
│   │   ├── services/           # For API calls, data fetching (e.g., product data)
│   │   │   └── productService.ts
│   │   │
│   │   ├── styles/             # Global styles, themes, CSS variables
│   │   │   └── global.css
│   │   │
│   │   ├── utils/              # Utility functions, helpers
│   │   │
│   │   ├── App.tsx             # Main application component, sets up router
│   │   ├── main.tsx            # React entry point
│   │   └── index.css           # Base global styles (imported by main.tsx)
│   │
│   └── index.html              # Main HTML shell for the SPA
│
├── images/                     # Your original images folder. **RECOMMENDATION: Move contents to client/public/images/**
├── attached_assets/            # Your original attached_assets. Evaluate if still needed or merge relevant assets into client/public/
├── server/                     # Backend server code (if any)
├── shared/                     # Code shared between client/server (if any)
├── vite.config.ts              # Vite configuration
├── package.json
├── tsconfig.json
└── README.md
```
