import Link from "next/link";
import Icon from "@/components/Icon";
import { menu, restaurant, telHref } from "@/lib/data";
import styles from "./chrome.module.css";

export function SiteFooter() {
  const [weekday, weekend] = restaurant.hours;
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <div className={styles.footerTop}>
          <div>
            <p className={styles.footerBrand}>
              {restaurant.name} <span>프리미엄 1++ 한우 & 스마트팜 채소 샤브샤브</span>
            </p>
            <p className="t-body-sm t-muted">{restaurant.slogan} · 스마트팜 채소 당일 수확 원칙</p>
          </div>
          <div className={styles.social}>
            <a href={restaurant.links.instagram} target="_blank" rel="noopener noreferrer">
              <Icon name="photo_camera" /> @shabu.74
            </a>
            <a href={restaurant.links.youtube} target="_blank" rel="noopener noreferrer">
              <Icon name="smart_display" /> YouTube
            </a>
          </div>
        </div>

        <address className={styles.footerInfo}>
          <p>
            <b>매장 주소</b> {restaurant.address.display}
          </p>
          <p>
            <b>대표전화</b> <a href={telHref}>{restaurant.telephone}</a> (예약 · 단체 문의)
          </p>
          <p>
            <b>주차</b> {restaurant.parking}
          </p>
          <p>
            <b>영업시간</b> {weekday.label} {weekday.opens}~{weekday.closes} (L.O {weekday.lastOrder}) ·{" "}
            {weekend.label} {weekend.opens}~{weekend.closes} (L.O {weekend.lastOrder})
          </p>
          <p>
            <b className="t-red">정기휴무</b> {restaurant.closedLabel}
          </p>
        </address>

        <div className={styles.footerBottom}>
          <p>© {menu.updatedAt.slice(0, 4)} 샤브74 (SHABU 74). All Rights Reserved.</p>
          <nav aria-label="하단 메뉴">
            <Link href="/menu">메뉴 · 가격</Link>
            <Link href="/menu#course-prices">원산지 · 가격 안내</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

/** Level-3 sticky action console shown on mobile only. */
export function MobileActionBar() {
  return (
    <nav className={styles.actionBar} aria-label="빠른 실행">
      <div className={styles.actionGrid}>
        <a href={telHref}>
          <Icon name="call" />
          <span>전화</span>
        </a>
        <a href={restaurant.links.naverMap} target="_blank" rel="noopener noreferrer">
          <Icon name="directions" />
          <span>길찾기</span>
        </a>
        <Link href={restaurant.links.order} className={styles.actionGreen}>
          <Icon name="local_shipping" />
          <span>주문</span>
        </Link>
        <Link href={restaurant.links.reservation} className={styles.actionCta}>
          <Icon name="event_seat" />
          <span>예약</span>
        </Link>
      </div>
    </nav>
  );
}
