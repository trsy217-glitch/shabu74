import menuData from "@/data/menu.json";
import restaurantData from "@/data/restaurant.json";
import homeData from "@/data/home.json";

/**
 * All page content is read from /data/*.json so that prices, hours and copy
 * have exactly one source. Pages and the JSON-LD builder both import from here.
 */
export const menu = menuData;
export const restaurant = restaurantData;
export const home = homeData;

export type Menu = typeof menuData;
export type Course = Menu["courses"][number];
export type PricedItem = { id: string; name: string; description?: string; price: number };

/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in production (e.g. https://shabu74.kr). */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shabu74.kr").replace(/\/$/, "");

const krw = new Intl.NumberFormat("ko-KR");

/** 19900 -> "19,900원", 0 -> "무료" */
export function formatPrice(price: number, { freeLabel = "무료" } = {}): string {
  return price === 0 ? freeLabel : `${krw.format(price)}원`;
}

/** 19900 -> "19,900" (number only, for layouts that style the unit separately) */
export function formatNumber(price: number): string {
  return krw.format(price);
}

export const telHref = `tel:${restaurant.telephone}`;

/**
 * Resolves the short link keys used in data files ("reservation", "order", "tel")
 * to real hrefs, so CTA targets can be changed in restaurant.json alone.
 */
export function resolveHref(key: string): string {
  if (key === "tel") return telHref;
  if (key in restaurant.links) return restaurant.links[key as keyof typeof restaurant.links];
  return key;
}

export function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

/** "2026-10-20" -> "2026.10.20" */
export function formatDate(iso: string): string {
  return iso.replaceAll("-", ".");
}
