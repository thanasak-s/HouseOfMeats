# Directus Catalog Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the browser-only catalog admin with Directus-backed runtime catalog loading while preserving a local fallback catalog.

**Architecture:** Keep the current React/Vite storefront on Netlify, add a small Directus read layer in the frontend, and map Directus records into the existing `Product` model. If Directus is unavailable or misconfigured, the app falls back to `src/data/products.ts`.

**Tech Stack:** React 19, TypeScript, Vite 8, Directus REST API

---

## File Structure

- Create: `src/lib/directus.ts`
  - Directus types, asset URL helpers, and record-to-`Product` mapping.
- Create: `src/lib/catalog.ts`
  - Runtime catalog loader with Directus fetch and local fallback.
- Modify: `src/App.tsx`
  - Remove localStorage/admin state and load products from the new catalog loader.
- Modify: `src/components/Footer.tsx`
  - Remove the admin trigger prop and leave the footer public-only.
- Modify: `src/data/products.ts`
  - Keep the current fallback catalog and export the `Product` type cleanly.
- Delete: `src/components/AdminCMS.tsx`
  - Remove the old browser-only admin panel.
- Create: `.env.example`
  - Document the required frontend environment variable.

## Task 1: Add the Directus Read Layer

**Files:**
- Create: `src/lib/directus.ts`
- Create: `src/lib/catalog.ts`
- Modify: `src/data/products.ts`

- [ ] **Step 1: Add Directus mapping helpers**

Create `src/lib/directus.ts`:

```ts
import type { Product } from '../data/products';

type DirectusGalleryItem =
  | string
  | { directus_files_id?: string | null }
  | { id?: string | null };

export interface DirectusProductRecord {
  slug: string;
  name_en: string;
  name_th: string;
  weight: string;
  price_en: string;
  price_th: string;
  description_en: string;
  description_th: string;
  featured?: boolean | null;
  facebook_url?: string | null;
  line_message_url_en?: string | null;
  line_message_url_th?: string | null;
  cover_image?: string | null;
  gallery_images?: DirectusGalleryItem[] | null;
}

const getFileId = (value: DirectusGalleryItem): string => {
  if (typeof value === 'string') return value;
  return value.directus_files_id ?? value.id ?? '';
};

export const toDirectusAssetUrl = (
  directusUrl: string,
  fileId: string | null | undefined
): string => {
  if (!fileId) return '';
  return `${directusUrl.replace(/\/$/, '')}/assets/${fileId}`;
};

export const mapDirectusProduct = (
  directusUrl: string,
  record: DirectusProductRecord
): Product => {
  const coverImage = toDirectusAssetUrl(directusUrl, record.cover_image);
  const gallery = (record.gallery_images ?? [])
    .map(getFileId)
    .filter(Boolean)
    .map((fileId) => toDirectusAssetUrl(directusUrl, fileId));
  const images = [coverImage, ...gallery].filter(Boolean);

  return {
    id: record.slug,
    nameEn: record.name_en,
    nameTh: record.name_th,
    weight: record.weight,
    priceEn: record.price_en,
    priceTh: record.price_th,
    descriptionEn: record.description_en,
    descriptionTh: record.description_th,
    image: coverImage,
    images,
    lineMessageUrlEn: record.line_message_url_en ?? '',
    lineMessageUrlTh: record.line_message_url_th ?? '',
    facebookUrl: record.facebook_url ?? undefined,
    isFeatured: Boolean(record.featured),
  };
};
```

- [ ] **Step 2: Add runtime catalog loading with fallback**

Create `src/lib/catalog.ts`:

```ts
import type { Product } from '../data/products';
import { mapDirectusProduct, type DirectusProductRecord } from './directus';

interface LoadCatalogOptions {
  directusUrl?: string;
  fallbackProducts: Product[];
  fetcher?: typeof fetch;
}

interface DirectusResponse {
  data?: DirectusProductRecord[];
}

export interface CatalogLoadResult {
  products: Product[];
  source: 'directus' | 'fallback';
}

const PRODUCTS_QUERY = [
  'fields=slug,name_en,name_th,weight,price_en,price_th,description_en,description_th,featured,facebook_url,line_message_url_en,line_message_url_th,cover_image,gallery_images.directus_files_id',
  'filter[status][_eq]=published',
  'sort=sort',
].join('&');

export async function loadCatalog({
  directusUrl,
  fallbackProducts,
  fetcher = fetch,
}: LoadCatalogOptions): Promise<CatalogLoadResult> {
  if (!directusUrl) {
    return { products: fallbackProducts, source: 'fallback' };
  }

  try {
    const response = await fetcher(
      `${directusUrl.replace(/\/$/, '')}/items/products?${PRODUCTS_QUERY}`
    );

    if (!response.ok) {
      throw new Error(`Directus request failed with ${response.status}`);
    }

    const payload = (await response.json()) as DirectusResponse;
    const records = Array.isArray(payload.data) ? payload.data : [];
    const products = records.map((record) => mapDirectusProduct(directusUrl, record));

    if (products.length === 0) {
      return { products: fallbackProducts, source: 'fallback' };
    }

    return { products, source: 'directus' };
  } catch (error) {
    console.error('Falling back to local catalog', error);
    return { products: fallbackProducts, source: 'fallback' };
  }
}
```

- [ ] **Step 3: Keep `src/data/products.ts` as the fallback source**

Ensure the type export remains clean and unchanged:

```ts
export interface Product {
  id: string;
  nameEn: string;
  nameTh: string;
  weight: string;
  priceEn: string;
  priceTh: string;
  descriptionEn: string;
  descriptionTh: string;
  image: string;
  images: string[];
  lineMessageUrlEn: string;
  lineMessageUrlTh: string;
  facebookUrl?: string;
  isFeatured?: boolean;
}

export const PRODUCTS: Product[] = [/* existing fallback catalog */];
```

- [ ] **Step 4: Verify the code compiles**

Run:

```bash
npm run build
```

Expected: TypeScript and Vite complete successfully.

- [ ] **Step 5: Commit**

```bash
git add src/data/products.ts src/lib/directus.ts src/lib/catalog.ts
git commit -m "feat: add directus catalog loader"
```

## Task 2: Refactor the App to Load Products from Directus

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Remove localStorage and admin state**

Update `src/App.tsx` to remove:

- `AdminCMS` import
- `isAdminOpen` state
- `localStorage` initialization for products
- `localStorage` sync effect
- `#admin` hash listener
- admin-related body scroll locking

- [ ] **Step 2: Load the catalog on startup**

Replace the current product state setup with:

```tsx
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import About from './components/About';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import FloatingButtons from './components/FloatingButtons';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import { PRODUCTS, type Product } from './data/products';
import { loadCatalog } from './lib/catalog';
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    let isActive = true;

    loadCatalog({
      directusUrl: import.meta.env.VITE_DIRECTUS_URL,
      fallbackProducts: PRODUCTS,
    }).then((result) => {
      if (isActive) {
        setProducts(result.products);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) return;

      let id = window.location.hash.substring(1);
      let element = document.getElementById(id);

      if (!element && id === 'product') {
        id = 'products';
        element = document.getElementById(id);
      }

      if (!element) return;

      if (element.classList.contains('product-card')) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    };

    const timer = setTimeout(scrollToHash, 300);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProduct ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Hero />
        <Products products={products} onOpenDetails={setSelectedProduct} />
        <About />
        <Contact />
        <FinalCTA />
      </main>
      <FloatingButtons />
      <ProductDetailModal
        key={selectedProduct?.id || 'none'}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 3: Verify build and lint**

Run:

```bash
npm run build
npm run lint
```

Expected: both commands succeed without `AdminCMS` or `localStorage`-related errors.

- [ ] **Step 4: Commit**

```bash
git add src/App.tsx
git commit -m "feat: load storefront catalog from directus"
```

## Task 3: Remove the In-App Admin Surface

**Files:**
- Modify: `src/components/Footer.tsx`
- Delete: `src/components/AdminCMS.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Make the footer public-only**

Update `src/components/Footer.tsx` to remove the `onOpenAdmin` prop and clickable admin trigger:

```tsx
import React from 'react';
import { LineIcon, FacebookIcon, MailIcon, MapIcon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer-section">
      {/* existing footer content */}
      <div className="footer-bottom">
        <div className="section-container footer-bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} House of Meats. {t('footer.copyright')}
          </p>
          <p className="footer-design-tag">
            {t('footer.label_design')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 2: Delete the old admin panel**

Run:

```bash
rm src/components/AdminCMS.tsx
```

Then confirm `src/App.tsx` no longer imports it.

- [ ] **Step 3: Verify build and lint again**

Run:

```bash
npm run build
npm run lint
```

Expected: the app still builds and the footer compiles without an `onOpenAdmin` prop.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.tsx src/App.tsx
git rm src/components/AdminCMS.tsx
git commit -m "refactor: remove in-app catalog admin"
```

## Task 4: Add Operator Handoff for Directus and Netlify

**Files:**
- Create: `.env.example`
- Modify: `docs/superpowers/specs/2026-05-29-directus-catalog-integration-design.md`

- [ ] **Step 1: Add the frontend environment example**

Create `.env.example`:

```bash
VITE_DIRECTUS_URL=https://your-directus-instance.example.com
```

- [ ] **Step 2: Add Directus setup notes to the approved design doc**

Append:

```md
## Directus Setup Notes

- Create a public `products` collection with published read access only.
- Add the fields from the data model section exactly as named.
- Configure `cover_image` as a single file relation.
- Configure `gallery_images` as a multi-file relation.
- Upload product media directly into Directus.
- Set `VITE_DIRECTUS_URL` in Netlify to the Directus base URL.
```

- [ ] **Step 3: Run final verification**

Run:

```bash
npm run build
npm run lint
```

Expected: build and lint remain green after the documentation/env updates.

- [ ] **Step 4: Commit**

```bash
git add .env.example docs/superpowers/specs/2026-05-29-directus-catalog-integration-design.md
git commit -m "docs: add directus setup handoff"
```

## Self-Review

- Spec coverage:
  - Directus as source of truth: covered by Tasks 1 and 2.
  - Local fallback catalog: covered by Task 1 and Task 2.
  - Remove old in-site admin: covered by Task 3.
  - Runtime browser fetch and Netlify compatibility: covered by Tasks 1 and 2.
  - Environment/operator handoff: covered by Task 4.
- Placeholder scan:
  - No placeholders remain.
- Type consistency:
  - `Product`, `DirectusProductRecord`, `mapDirectusProduct`, and `loadCatalog` are defined before later tasks rely on them.
