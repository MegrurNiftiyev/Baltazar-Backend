import type { ExploreSectionDTO } from '../shared/dto/explore-card.dto.js';

export interface WishlistEntry {
  serviceId: string;
  serviceType: string;
}

/**
 * Wraps the wishlist array as a Set of composite keys (`${serviceType}:${serviceId}`)
 * once per request to keep lookups O(1) per item.
 */
export function createWishlistSet(userWishlist?: WishlistEntry[]): Set<string> {
  const set = new Set<string>();
  if (!userWishlist || !Array.isArray(userWishlist)) return set;
  for (const entry of userWishlist) {
    if (entry && entry.serviceId && entry.serviceType) {
      set.add(`${entry.serviceType}:${entry.serviceId}`);
    }
  }
  return set;
}

/**
 * Attaches `isLiked: boolean` to an array of domain items for a specific serviceType.
 */
export function attachIsLiked<T extends { id?: string }>(
  items: T[],
  userWishlist: WishlistEntry[] | undefined,
  serviceType: string
): (T & { isLiked: boolean })[] {
  const wishlistSet = createWishlistSet(userWishlist);
  return items.map((item) => ({
    ...item,
    isLiked: Boolean(item.id && wishlistSet.has(`${serviceType}:${item.id}`)),
  }));
}

/**
 * Attaches `isLiked: boolean` to a single domain item for a specific serviceType.
 */
export function attachIsLikedToItem<T extends { id?: string }>(
  item: T,
  userWishlist: WishlistEntry[] | undefined,
  serviceType: string
): T & { isLiked: boolean } {
  const wishlistSet = createWishlistSet(userWishlist);
  return {
    ...item,
    isLiked: Boolean(item.id && wishlistSet.has(`${serviceType}:${item.id}`)),
  };
}

/**
 * Attaches `isLiked: boolean` to heterogeneous explore/related-item cards
 * where each card contains its own embedded `serviceType` and `id` (or `serviceId`).
 */
export function attachIsLikedToCards<T extends { id?: string; serviceId?: string; serviceType?: string }>(
  cards: T[],
  userWishlist: WishlistEntry[] | undefined
): (T & { isLiked: boolean })[] {
  const wishlistSet = createWishlistSet(userWishlist);
  return cards.map((card) => {
    const sType = card.serviceType || '';
    const sId = card.serviceId || card.id || '';
    const isLiked = Boolean(sType && sId && wishlistSet.has(`${sType}:${sId}`));
    return {
      ...card,
      isLiked,
    };
  });
}

/**
 * Attaches `isLiked: boolean` across all sections and section items in the Explore feed response.
 */
export function attachIsLikedToExploreSections(
  sections: ExploreSectionDTO[],
  userWishlist: WishlistEntry[] | undefined
): ExploreSectionDTO[] {
  const wishlistSet = createWishlistSet(userWishlist);
  return sections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      const sType = item.serviceType || section.serviceType;
      const sId = item.serviceId || item.id;
      const isLiked = Boolean(sType && sId && wishlistSet.has(`${sType}:${sId}`));
      return {
        ...item,
        isLiked,
      };
    }),
  }));
}
