# Unraid Directus Deployment Guide

## Goal

Deploy Directus for House of Meats on an existing Unraid NAS and connect the public storefront on Netlify to it.

Target layout:

- `Frontend`: Netlify
- `CMS`: Directus on Unraid
- `Database`: Postgres on Unraid
- `Cache`: Redis on Unraid
- `Admin URL`: `https://cms.houseofmeats.shop/admin`

## Quick Start

If you want the shortest path, do this in order:

1. Set a static IP for the Unraid box.
2. Point `cms.houseofmeats.shop` to your public IP.
3. Forward router ports `80` and `443` to Unraid.
4. Install `Nginx Proxy Manager` on Unraid.
5. Install `Postgres`.
6. Install `Redis`.
7. Install `Directus`.
8. Open `https://cms.houseofmeats.shop/admin`.
9. Create the `products` collection and fields.
10. Set `VITE_DIRECTUS_URL=https://cms.houseofmeats.shop` in Netlify.
11. Redeploy the storefront.

If any one of steps 4 to 8 is incomplete, stop there and fix it before moving on.

## Recommended Production Shape

Use four containers on Unraid:

1. `postgres`
2. `redis`
3. `directus`
4. `nginx-proxy-manager` or another reverse proxy you already trust

This keeps Directus off Netlify while preserving the current frontend deployment model.

## Before You Start

Prepare these first:

- Unraid server with Docker enabled
- Static LAN IP for the Unraid box
- A public domain you control
- DNS access for `houseofmeats.shop`
- Router access for port forwarding
- A place to store backups of:
  - Postgres data
  - Directus uploads
  - Directus env/config

Recommended DNS records:

- `houseofmeats.shop` -> Netlify
- `www.houseofmeats.shop` -> Netlify
- `cms.houseofmeats.shop` -> your public home/business IP

## Step 1: Prepare Unraid Appdata Paths

Create these folders under your appdata share:

```text
/mnt/user/appdata/houseofmeats/postgres
/mnt/user/appdata/houseofmeats/redis
/mnt/user/appdata/houseofmeats/directus/uploads
/mnt/user/appdata/houseofmeats/directus/extensions
/mnt/user/appdata/houseofmeats/directus/snapshots
```

If you use a cache pool for appdata, keep these folders on cache for better database and app performance.

Unraid UI path:

1. Open `Shares`
2. Open your `appdata` share
3. Create folder `houseofmeats`
4. Inside it create:
   - `postgres`
   - `redis`
   - `directus`
5. Inside `directus` create:
   - `uploads`
   - `extensions`
   - `snapshots`

## Step 2: Create a Dedicated Docker Network

In Unraid, create a custom bridge network for the stack, for example:

- Network name: `hom_net`

Keep Directus, Postgres, Redis, and your reverse proxy on the same internal network where possible.

If you already use a shared custom Docker network for apps, you can reuse it. Do not expose Postgres or Redis on host ports unless you actually need them for admin/debugging.

## Step 3: Deploy Postgres

Create a Postgres container with:

- Image: `postgres:16`
- Container name: `hom-postgres`
- Network: `hom_net`
- Persistent path:
  - `/var/lib/postgresql/data` -> `/mnt/user/appdata/houseofmeats/postgres`

Environment variables:

```text
POSTGRES_DB=directus
POSTGRES_USER=directus
POSTGRES_PASSWORD=<strong-random-password>
```

Notes:

- Use a strong random password.
- Do not expose Postgres publicly to the internet.

Unraid UI checklist:

1. Go to `Apps`
2. Search `Postgres`
3. Pick a trusted container source
4. Set container name to `hom-postgres`
5. Set network to `hom_net`
6. Map `/var/lib/postgresql/data`
7. Set the three env vars:
   - `POSTGRES_DB`
   - `POSTGRES_USER`
   - `POSTGRES_PASSWORD`
8. Apply and wait until the container is healthy/running

## Step 4: Deploy Redis

Create a Redis container with:

- Image: `redis:7`
- Container name: `hom-redis`
- Network: `hom_net`
- Persistent path if desired:
  - `/data` -> `/mnt/user/appdata/houseofmeats/redis`

You can run Redis without public port exposure.

Unraid UI checklist:

1. Go to `Apps`
2. Search `Redis`
3. Set container name to `hom-redis`
4. Set network to `hom_net`
5. If the template supports persistence, map `/data`
6. Apply

## Step 5: Deploy Directus

Use a pinned image version rather than `latest`.

Example:

```text
directus/directus:11.5.1
```

Container settings:

- Container name: `hom-directus`
- Network: `hom_net`
- Container port: `8055`
- No public WAN exposure directly if using reverse proxy

Persistent paths:

```text
/directus/uploads -> /mnt/user/appdata/houseofmeats/directus/uploads
/directus/extensions -> /mnt/user/appdata/houseofmeats/directus/extensions
/directus/snapshots -> /mnt/user/appdata/houseofmeats/directus/snapshots
```

Minimum environment variables:

```text
KEY=<long-random-key>
SECRET=<long-random-secret>

ADMIN_EMAIL=admin@houseofmeats.shop
ADMIN_PASSWORD=<strong-random-password>

DB_CLIENT=pg
DB_HOST=hom-postgres
DB_PORT=5432
DB_DATABASE=directus
DB_USER=directus
DB_PASSWORD=<same-as-postgres-password>

CACHE_ENABLED=true
CACHE_STORE=redis
REDIS=redis://hom-redis:6379

WEBSOCKETS_ENABLED=true
PUBLIC_URL=https://cms.houseofmeats.shop
```

Recommended optional variables:

```text
LOG_LEVEL=info
RATE_LIMITER_ENABLED=true
CORS_ENABLED=true
CORS_ORIGIN=true
```

Notes:

- `KEY` and `SECRET` must be strong random values.
- `PUBLIC_URL` should match the real CMS domain.
- Keep these values outside the repo. Store them in Unraid container config or a private env file.

Unraid UI checklist:

1. Go to `Apps`
2. Search for `Directus`
3. If there is no reliable template, use `Add Container`
4. Image: `directus/directus:11.5.1`
5. Name: `hom-directus`
6. Network: `hom_net`
7. Map these volumes:
   - `/directus/uploads`
   - `/directus/extensions`
   - `/directus/snapshots`
8. Add all required env vars from the section above
9. Apply
10. Check logs immediately

Healthy first-run signs:

- container stays running
- no database connection errors
- no migration crash loop
- Directus reports app ready on port `8055`

## Step 6: Put Directus Behind Reverse Proxy

Recommended public endpoint:

- `https://cms.houseofmeats.shop`

If using Nginx Proxy Manager:

1. Create a proxy host for `cms.houseofmeats.shop`
2. Forward hostname to `hom-directus`
3. Forward port to `8055`
4. Enable WebSocket support
5. Request a Let's Encrypt certificate
6. Force SSL

Recommended values in Nginx Proxy Manager:

- Domain Names: `cms.houseofmeats.shop`
- Scheme: `http`
- Forward Hostname / IP: `hom-directus`
- Forward Port: `8055`
- Websockets Support: enabled
- Block Common Exploits: enabled
- SSL: Let's Encrypt
- Force SSL: enabled

If your Unraid box is behind a home router, forward:

- `80` -> reverse proxy
- `443` -> reverse proxy

Do not expose Directus container port `8055` directly to the public internet unless you have a very specific reason.

## Step 7: First Login

After the proxy is live, open:

```text
https://cms.houseofmeats.shop/admin
```

Login with:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

If setup succeeded, Directus will initialize its project automatically on first run.

If login fails:

1. Check Directus container logs
2. Check Postgres container logs
3. Confirm `DB_HOST=hom-postgres`
4. Confirm the database password in Directus matches Postgres exactly
5. Confirm the reverse proxy points to the Directus container name and port `8055`

## Step 8: Create the `products` Collection

Create a collection named:

```text
products
```

Add these fields exactly:

```text
slug
status
sort
name_en
name_th
weight
price_en
price_th
description_en
description_th
featured
facebook_url
line_message_url_en
line_message_url_th
cover_image
gallery_images
```

Suggested field types:

- `slug`: string
- `status`: status
- `sort`: integer
- `name_en`: string
- `name_th`: string
- `weight`: string
- `price_en`: string
- `price_th`: string
- `description_en`: text
- `description_th`: text
- `featured`: boolean
- `facebook_url`: string
- `line_message_url_en`: string
- `line_message_url_th`: string
- `cover_image`: file, single relation
- `gallery_images`: files, multiple relation

Directus UI order:

1. `Settings`
2. `Data Model`
3. `Create Collection`
4. Name it `products`
5. Add the fields one by one
6. Save

## Step 9: Set Permissions Safely

For public access:

- allow `Read` on `products`
- restrict to `status = published`
- expose only fields needed by the storefront

For files:

- ensure product images used by the storefront are publicly accessible
- do not make all internal files public unless necessary

Important:

- the storefront only needs public read access
- admin editing should stay behind Directus login

Minimum permission rule for storefront reads:

- Role: `Public`
- Collection: `products`
- Action: `Read`
- Filter: `status = published`

If your images do not render publicly, check file permissions or folder/file access inside Directus.

## Step 10: Upload Real Product Media

In Directus:

1. Upload cover image to `cover_image`
2. Upload gallery images to `gallery_images`
3. Fill in bilingual product text
4. Fill in price fields
5. Publish the record

Because the storefront is already coded to use Directus asset URLs, uploaded images should render from the CMS automatically once permissions are correct.

## Step 11: Connect Netlify

In Netlify, set:

```text
VITE_DIRECTUS_URL=https://cms.houseofmeats.shop
```

Then redeploy the site.

The current frontend behavior is:

- try Directus first
- if Directus fails or returns malformed/unusable data, fall back to local catalog data in `src/data/products.ts`

Netlify UI path:

1. Open the Netlify site dashboard
2. Go to `Site configuration`
3. Go to `Environment variables`
4. Add:
   - `VITE_DIRECTUS_URL`
   - value: `https://cms.houseofmeats.shop`
5. Save
6. Trigger a new deploy

## Step 12: Validate End-to-End

Run this checklist:

1. Open `https://cms.houseofmeats.shop/admin`
2. Confirm login works
3. Create one test product
4. Publish it
5. Confirm Directus file URLs open publicly
6. Redeploy Netlify after setting `VITE_DIRECTUS_URL`
7. Open the storefront
8. Confirm product title, image, price, and featured state come from Directus
9. Disable Directus temporarily and confirm the storefront falls back to local data

Practical smoke test after go-live:

1. Change one product price in Directus
2. Save and publish
3. Refresh the storefront
4. Confirm the price changed
5. Change featured flag
6. Refresh again
7. Confirm the UI changed

## Backups

Back up these locations regularly:

- `/mnt/user/appdata/houseofmeats/postgres`
- `/mnt/user/appdata/houseofmeats/directus/uploads`
- `/mnt/user/appdata/houseofmeats/directus/extensions`
- reverse proxy config

At minimum:

- daily appdata backup
- before every Directus upgrade
- before schema changes

## Operational Risks

Unraid is workable for this setup, but you should be clear on the tradeoff:

- if NAS is down, Directus is down
- if home/business internet is down, Directus is down
- if public IP changes and DNS is not updated, CMS becomes unreachable
- if Directus is down, the storefront falls back to local catalog and will not show the latest CMS edits

For a small catalog site this is often acceptable at the start.

## When To Move Off Unraid

Consider moving Directus to a VPS/cloud host later if:

- you need stronger uptime guarantees
- multiple staff depend on CMS every day
- you want less networking/security maintenance
- you want managed backups and simpler disaster recovery

## Reference Links

- Directus Docker Guide: https://docs.directus.io/self-hosted/docker-guide
- Directus Quickstart: https://docs.directus.io/self-hosted/quickstart
- Directus Config Options: https://docs.directus.io/self-hosted/config-options
- Directus Files Reference: https://docs.directus.io/reference/files
- Unraid Docker Overview: https://docs.unraid.net/unraid-os/using-unraid-to/run-docker-containers/overview/
- Unraid Community Applications: https://docs.unraid.net/unraid-os/using-unraid-to/run-docker-containers/community-applications/
- Unraid SSL / secure connection: https://docs.unraid.net/unraid-os/system-administration/secure-your-server/securing-your-connection/
