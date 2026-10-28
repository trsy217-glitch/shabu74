import Link from "next/link";
import Icon from "@/components/Icon";
import { restaurant, telHref } from "@/lib/data";
import styles from "./chrome.module.css";

type NavKey = "story" | "menu" | "smartfarm" | "location";

const NAV: { key: NavKey; href: string; label: string }[] = [
  { key: "story", href: "/#story", label: "브랜드 스토리" },
  { key: "menu", href: "/menu", label: "메뉴 & 가격" },
  { key: "smartfarm", href: "/#smartfarm", label: "스마트팜 이야기" },
  { key: "location", href: "/#location", label: "매장 위치 & 예약" },
];

function BrandMark() {
  return (
    <svg className={styles.mark} viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#2f6b3a" />
      <path d="M20 7c4.8 2.6 7 6.6 6.4 11.2C22 17.6 19.4 14 20 7Z" fill="#a8d5a0" />
      <text x="20" y="31" textAnchor="middle" fontSize="15" fontWeight="800" fill="#fff" fontFamily="inherit">
        74
      </text>
    </svg>
  );
}

export default function SiteHeader({ current }: { current?: NavKey }) {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Link href="/" className={styles.brand} aria-label={`${restaurant.name} 홈`}>
          <BrandMark />
          <span className={styles.brandText}>
            <span className={styles.brandRow}>
              <span className={styles.brandName}>{restaurant.name}</span>
              <span className={styles.brandLatin}>{restaurant.alternateName}</span>
            </span>
            <span className={styles.brandSlogan}>{restaurant.slogan}</span>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="주요 메뉴">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={styles.navLink}
              aria-current={current === item.key ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href={telHref}>
            <Icon name="call" />
            <span>{restaurant.telephone}</span>
          </a>
          <Link className={`btn btn--sm btn--secondary ${styles.hideSm}`} href={restaurant.links.order}>
            밀키트 주문
          </Link>
          <Link className="btn btn--sm btn--primary" href={restaurant.links.reservation}>
            예약하기
          </Link>

          {/* JS-free mobile menu */}
          <details className={styles.mobileMenu}>
            <summary aria-label="모바일 메뉴 열기">
              <Icon name="menu" size={26} />
            </summary>
            <div className={styles.mobilePanel}>
              {NAV.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={current === item.key ? "page" : undefined}
                >
                  {item.label}
                  <Icon name="chevron_right" />
                </Link>
              ))}
              <a href={telHref} className={styles.mobilePhone}>
                <Icon name="call" /> 전화 {restaurant.telephone}
              </a>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
