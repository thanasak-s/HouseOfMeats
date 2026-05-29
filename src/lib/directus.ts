import type { Product } from '../data/products';

type DirectusGalleryItem =
  | number
  | string
  | { directus_files_id?: string | number | null }
  | { id?: string | number | null };

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

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const normalizeOptionalUrl = (
  value: string | null | undefined
): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
};

const isOptionalNullableString = (
  value: unknown
): value is string | null | undefined => value == null || typeof value === 'string';

const isOptionalFileIdentifier = (
  value: unknown
): value is string | number | null | undefined =>
  value == null || typeof value === 'string' || typeof value === 'number';

const isDirectusGalleryItem = (value: unknown): value is DirectusGalleryItem => {
  if (typeof value === 'number') {
    return true;
  }

  if (typeof value === 'string') {
    return true;
  }

  if (!value || typeof value !== 'object') {
    return false;
  }

  if ('directus_files_id' in value) {
    return isOptionalFileIdentifier(value.directus_files_id);
  }

  if ('id' in value) {
    return isOptionalFileIdentifier(value.id);
  }

  return false;
};

const hasUsableAssetSource = (record: Record<string, unknown>): boolean => {
  if (isNonEmptyString(record.cover_image)) {
    return true;
  }

  return (
    Array.isArray(record.gallery_images) &&
    record.gallery_images.some((item) => isDirectusGalleryItem(item) && isNonEmptyString(getFileId(item)))
  );
};

export const isDirectusProductRecord = (
  value: unknown
): value is DirectusProductRecord => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    isNonEmptyString(record.slug) &&
    isNonEmptyString(record.name_en) &&
    isNonEmptyString(record.name_th) &&
    isNonEmptyString(record.weight) &&
    isNonEmptyString(record.price_en) &&
    isNonEmptyString(record.price_th) &&
    isNonEmptyString(record.description_en) &&
    isNonEmptyString(record.description_th) &&
    (record.featured == null || typeof record.featured === 'boolean') &&
    isOptionalNullableString(record.facebook_url) &&
    isOptionalNullableString(record.line_message_url_en) &&
    isOptionalNullableString(record.line_message_url_th) &&
    hasUsableAssetSource(record) &&
    isOptionalNullableString(record.cover_image) &&
    (record.gallery_images == null ||
      (Array.isArray(record.gallery_images) &&
        record.gallery_images.every(isDirectusGalleryItem)))
  );
};

const getFileId = (value: DirectusGalleryItem): string => {
  if (typeof value === 'number') {
    return String(value);
  }

  if (typeof value === 'string') {
    return value;
  }

  if ('directus_files_id' in value) {
    return value.directus_files_id != null
      ? String(value.directus_files_id)
      : '';
  }

  if ('id' in value) {
    return value.id != null ? String(value.id) : '';
  }

  return '';
};

export const toDirectusAssetUrl = (
  directusUrl: string,
  fileId: string | null | undefined
): string => {
  if (!fileId) {
    return '';
  }

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
  const primaryImage = coverImage || gallery[0] || '';

  return {
    id: record.slug,
    nameEn: record.name_en,
    nameTh: record.name_th,
    weight: record.weight,
    priceEn: record.price_en,
    priceTh: record.price_th,
    descriptionEn: record.description_en,
    descriptionTh: record.description_th,
    image: primaryImage,
    images,
    lineMessageUrlEn: normalizeOptionalUrl(record.line_message_url_en) ?? '',
    lineMessageUrlTh: normalizeOptionalUrl(record.line_message_url_th) ?? '',
    facebookUrl: normalizeOptionalUrl(record.facebook_url),
    isFeatured: Boolean(record.featured),
  };
};

export const getProductLineMessageUrl = (
  product: Product,
  language: 'en' | 'th'
): string | undefined =>
  normalizeOptionalUrl(
    language === 'th' ? product.lineMessageUrlTh : product.lineMessageUrlEn
  );
