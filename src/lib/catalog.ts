import type { Product } from '../data/products';
import {
  isDirectusProductRecord,
  mapDirectusProduct,
} from './directus';

interface LoadCatalogOptions {
  directusUrl?: string;
  fallbackProducts: Product[];
  fetcher?: typeof fetch;
}

interface DirectusResponse {
  data?: unknown;
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
    if (!Array.isArray(payload.data)) {
      throw new Error('Directus payload is malformed: data is not an array');
    }

    if (!payload.data.every(isDirectusProductRecord)) {
      throw new Error('Directus payload contains invalid product records');
    }

    const records = payload.data;
    const products = records.map((record) =>
      mapDirectusProduct(directusUrl, record)
    );

    if (products.length === 0) {
      return { products: fallbackProducts, source: 'fallback' };
    }

    return { products, source: 'directus' };
  } catch (error) {
    console.error('Falling back to local catalog', error);
    return { products: fallbackProducts, source: 'fallback' };
  }
}
