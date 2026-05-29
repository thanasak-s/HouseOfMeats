# Directus Catalog Integration Design

## Objective

Replace the current browser-only catalog admin with Directus as the single source of truth for:

- products
- prices
- images
- descriptions
- featured state

The public website remains a React + Vite frontend deployed to Netlify. If Directus is unavailable, the site must fall back to the local catalog defined in `src/data/products.ts`.

## Current State

- Product data is hard-coded in `src/data/products.ts`.
- The site reads and mutates product data in the browser through local state and `localStorage`.
- `src/components/AdminCMS.tsx` provides an in-site editor, but it is not secure and does not persist changes across devices or users.
- Product images are stored in the repo and served from `public/picture`.

## Target Architecture

### Frontend

- Keep the existing React + Vite site.
- Deploy the frontend to Netlify.
- Fetch published product data from Directus at runtime from the browser.
- Transform Directus API responses into the existing `Product` UI shape to minimize UI churn.
- If the fetch fails, use `src/data/products.ts` as a fallback catalog.

### CMS / Backend

- Run Directus as a separate service from Netlify.
- Use Directus as the only editing surface for catalog content.
- Store uploaded media directly in Directus.
- Expose published product data to the frontend via Directus public read permissions.

## Directus Data Model

Create a `products` collection with these fields:

- `id`
  - Directus primary key
- `slug`
  - stable public identifier used by the frontend
- `status`
  - Directus status field used to publish/unpublish items
- `sort`
  - integer ordering field for manual display order
- `name_en`
- `name_th`
- `weight`
- `price_en`
- `price_th`
- `description_en`
- `description_th`
- `featured`
  - boolean
- `facebook_url`
  - optional URL
- `line_message_url_en`
  - optional URL
- `line_message_url_th`
  - optional URL
- `cover_image`
  - Directus file relation
- `gallery_images`
  - Directus files relation, ordered

## Frontend Behavior

### Product Loading

- On app startup, try to fetch `published` products from Directus.
- Request the fields needed by the existing product UI, including image file metadata or file IDs required to build asset URLs.
- Sort results by the Directus `sort` field first, then preserve API order.
- Map Directus records into the existing `Product` interface.

### Fallback Behavior

- If the Directus request fails, returns malformed data, or no usable products, use the local `PRODUCTS` constant from `src/data/products.ts`.
- Fallback should keep the website usable without an admin-facing error state.
- Failure details can be logged to the console for debugging, but should not break rendering.

### Images

- The frontend must render Directus-hosted image URLs when API data is available.
- The local fallback catalog continues to use repo-hosted image paths from `public/picture`.

## Admin Changes

- Remove the in-site `AdminCMS` editing flow from the website.
- Remove hash-based admin opening behavior tied to `#admin`.
- Keep the public browsing experience unchanged.
- If the footer or any other component links to the old admin, replace that interaction with a neutral contact or no-op behavior as appropriate.

## Configuration

Add frontend environment variables:

- `VITE_DIRECTUS_URL`
  - base URL for the Directus instance

No write-capable secrets should be exposed to the browser. The frontend will use public read access only.

## Out of Scope

- authentication into Directus from the website
- order management
- inventory management
- checkout or payment flows
- migration of existing images into Directus through automation
- Netlify function proxying
- build-time content syncing

## Implementation Notes

- Prefer a small dedicated data-access module for Directus reads and response mapping.
- Keep the existing `Product` type if possible and adapt Directus records to it.
- Preserve the fallback catalog file so the site remains resilient during Directus outages or setup delays.
- Remove `localStorage` catalog persistence because Directus becomes the authoritative source.

## Success Criteria

- Editors can manage products, prices, descriptions, featured state, and uploaded images entirely in Directus.
- The Netlify-hosted site renders Directus product data without requiring code changes for catalog updates.
- If Directus is down or misconfigured, the site still renders the fallback catalog.
- The old in-browser admin editor is no longer used.

## Directus Setup Notes

- Create a public `products` collection with published read access only.
- Add these fields exactly as named: `id`, `slug`, `status`, `sort`, `name_en`, `name_th`, `weight`, `price_en`, `price_th`, `description_en`, `description_th`, `featured`, `facebook_url`, `line_message_url_en`, `line_message_url_th`, `cover_image`, `gallery_images`.
- Configure `cover_image` as a single file relation.
- Configure `gallery_images` as a multi-file relation.
- Upload product media directly into Directus.
- Set `VITE_DIRECTUS_URL` in Netlify to the Directus base URL.
