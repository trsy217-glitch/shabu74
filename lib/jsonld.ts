import { menu, restaurant, SITE_URL, type PricedItem } from "@/lib/data";

/**
 * Builds the schema.org Restaurant object from the same JSON files that render
 * the pages, so the structured data can never drift from the visible prices.
 * Follows Google's local-business guidance: most specific type (Restaurant),
 * name + address required, servesCuisine / menu recommended.
 */

function offer(price: number) {
  return { "@type": "Offer", price, priceCurrency: menu.currency };
}

function menuItem(item: PricedItem & { summary?: string }) {
  return {
    "@type": "MenuItem",
    name: item.name,
    description: item.summary ?? item.description,
    offers: offer(item.price),
  };
}

function menuSection(name: string, items: (PricedItem & { summary?: string })[]) {
  return { "@type": "MenuSection", name, hasMenuItem: items.map(menuItem) };
}

export function buildMenuJsonLd() {
  return {
    "@type": "Menu",
    "@id": `${SITE_URL}/menu#menu`,
    name: `${restaurant.name} 메뉴 · 가격`,
    url: `${SITE_URL}/menu`,
    inLanguage: "ko-KR",
    hasMenuSection: [
      menuSection("샤브샤브 코스 (성인)", menu.courses),
      menuSection("어린이 요금", menu.kids),
      menuSection("추가 메뉴", menu.addons),
      menuSection("포장 · 밀키트", menu.takeout),
      menuSection("주류 · 음료", menu.drinks),
    ],
  };
}

export function buildRestaurantJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: restaurant.name,
    alternateName: restaurant.alternateName,
    slogan: restaurant.slogan,
    description: restaurant.description,
    url: SITE_URL,
    image: [`${SITE_URL}${restaurant.media.heroPoster}`],
    telephone: restaurant.telephoneIntl,
    priceRange: restaurant.priceRange,
    servesCuisine: restaurant.servesCuisine,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurant.address.streetAddress,
      addressLocality: restaurant.address.addressLocality,
      addressRegion: restaurant.address.addressRegion,
      addressCountry: restaurant.address.addressCountry,
    },
    openingHoursSpecification: restaurant.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    menu: `${SITE_URL}/menu`,
    hasMenu: buildMenuJsonLd(),
    acceptsReservations: true,
    sameAs: [restaurant.links.instagram],
  };
}

/** Serialises JSON-LD safely for inline <script> (escapes "<" per Next.js guidance). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
