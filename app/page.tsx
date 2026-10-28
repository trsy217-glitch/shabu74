import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HeroVideo from "@/components/HeroVideo";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import { MobileActionBar, SiteFooter } from "@/components/SiteFooter";
import { formatDate, formatNumber, formatPrice, home, isExternal, menu, resolveHref, restaurant, telHref } from "@/lib/data";
import { buildRestaurantJsonLd } from "@/lib/jsonld";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: { absolute: "샤브74 | 진주 평거동 한우 투뿔 샤브샤브 · 유기농 채소" },
  description:
    "내 가족이 먹을 건강한 밥상. 한우 투뿔과 7가지 유기농 채소, 매장 스마트팜. 평거동 제우스빌딩 4층, 무료 지하주차.",
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "샤브74 | 진주 평거동 한우 투뿔 샤브샤브",
    description: "내 가족이 먹을 건강한 밥상. 한우 투뿔(1++)과 7가지 유기농 채소, 매장 스마트팜.",
  },
};

const toneBadge: Record<string, string> = {
  primary: "",
  accent: "icon-badge--red",
  neutral: "icon-badge--neutral",
};
const tonePill: Record<string, string> = {
  primary: "",
  accent: "pill--red",
  neutral: "pill--neutral",
};

function SmartLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  if (isExternal(href) || href.startsWith("tel:")) {
    const ext = isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
    return (
      <a href={href} className={className} {...ext}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function Stars({ size = 18 }: { size?: number }) {
  return (
    <span className={styles.stars} aria-label="별점 5점 만점에 5점">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" fill size={size} />
      ))}
    </span>
  );
}

export default function HomePage() {
  const { story, smartFarm } = home;
  const [weekday, weekend] = restaurant.hours;
  const extraMeat = menu.addons[0];

  return (
    <>
      <JsonLd data={buildRestaurantJsonLd()} />
      <SiteHeader />

      <main className="main">
        {/* 1. HERO — promo video (poster + muted loop) with real-text slogan & CTAs */}
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroMedia}>
            <Image
              src={restaurant.media.heroPoster}
              alt={restaurant.media.heroPosterAlt}
              fill
              preload
              sizes="100vw"
              className={styles.heroPoster}
            />
            <HeroVideo
              poster={restaurant.media.heroPoster}
              sources={restaurant.media.heroVideo}
              className={styles.heroVideo}
            />
            <div className={styles.heroScrim} />
          </div>

          <div className={`container ${styles.heroContent}`}>
            <p className={`${styles.heroBadge} rise`}>
              <span className={styles.heroDot} />
              진주 평거동 · 한우 투뿔 샤브샤브
            </p>
            <h1 id="hero-title" className={`t-display ${styles.heroTitle} rise rise-1`}>
              내 가족이 먹을
              <br className={styles.brMobile} /> 건강한 밥상
            </h1>
            <p className={`t-body-lg ${styles.heroSub} rise rise-2`}>
              한우 투뿔과 7가지 유기농 채소, 매장에서 직접 키우는 수경재배 스마트팜
            </p>
            <div className={`${styles.heroCtas} rise rise-3`}>
              <Link href={restaurant.links.reservation} className="btn btn--primary">
                <Icon name="calendar_month" /> 예약하기
              </Link>
              <Link href={restaurant.links.order} className="btn btn--secondary">
                <Icon name="local_shipping" /> 밀키트 주문
              </Link>
            </div>
            <a
              href={restaurant.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.heroFilm} rise rise-4`}
            >
              <span className={styles.playDot}>
                <Icon name="play_arrow" fill size={18} />
              </span>
              <span>영상 전체 보기 (매장 &amp; 스마트팜 둘러보기)</span>
            </a>
            <ul className={`${styles.heroChips} rise rise-4`}>
              {home.heroChips.map((chip) => (
                <li key={chip.label}>
                  <Icon name={chip.icon} className={chip.tone === "accent" ? "t-red" : "t-green"} />
                  {chip.label}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 2. TRUST BADGE ROW */}
        <section className={styles.trust} aria-label="샤브74 신뢰 배지">
          <div className="container">
            <ul className={`scroll-x ${styles.trustRow}`}>
              {home.trustBadges.map((b) => (
                <li key={b.title} className={styles.trustItem}>
                  <span className={`icon-badge icon-badge--round ${toneBadge[b.tone]}`}>
                    <Icon name={b.icon} />
                  </span>
                  <span>
                    <strong className="t-label">{b.title}</strong>
                    <span className="t-label-sm t-muted">{b.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 3. 74 STORY — 7 vegetables + 4 promises */}
        <section id="story" className="section" aria-labelledby="story-title">
          <div className="container">
            <div className={`section-head section-head--split ${styles.storyHead}`}>
              <div className={styles.storyIntro}>
                <span className="pill">BRAND PHILOSOPHY</span>
                <h2 id="story-title" className={styles.equation}>
                  <span className="sr-only">샤브74의 의미: </span>7 + 4 = 74
                </h2>
                <p className={`t-h4 t-red ${styles.quote}`}>{story.quote}</p>
                <p className="t-body t-muted">{story.body}</p>
              </div>
              <Link href="/menu#hanwoo-philosophy" className="link-arrow">
                고기 추가가 유료인 이유 <Icon name="arrow_forward" />
              </Link>
            </div>

            <div className={styles.storyGrid}>
              <article className={`card ${styles.vegCard}`} aria-labelledby="veg-title">
                <header className={styles.cardHead}>
                  <span className={`${styles.num} ${styles.numGreen}`}>7</span>
                  <div>
                    <h3 id="veg-title" className="t-h4">
                      매일 아침 수확 유기농 채소 7종
                    </h3>
                    <p className="t-label-sm t-muted">매장 내 수경재배 스마트팜 &amp; 청정 농가 계약 재배</p>
                  </div>
                  <span className={`pill ${styles.hideXs}`}>
                    <Icon name="verified" /> 무농약
                  </span>
                </header>
                <ol className={styles.vegGrid}>
                  {story.vegetables.map((v, i) => (
                    <li key={v.name} className={v.wide ? styles.vegWide : undefined}>
                      <span className={styles.vegNum}>{i + 1}</span>
                      <strong className="t-label">{v.name}</strong>
                      <span className="t-label-sm t-muted">{v.note}</span>
                    </li>
                  ))}
                </ol>
                <p className={styles.vegFoot}>
                  <span>
                    <Icon name="water_drop" className="t-green" /> 무농약 수경재배로 흙먼지 없이 맑고 깨끗한 영양
                  </span>
                  <strong className="t-green">무제한 리필</strong>
                </p>
              </article>

              <article className={`card ${styles.promiseCard}`} aria-labelledby="promise-title">
                <header className={styles.cardHead}>
                  <span className={`${styles.num} ${styles.numRed}`}>4</span>
                  <div>
                    <h3 id="promise-title" className="t-h4">
                      고객과의 4가지 약속
                    </h3>
                    <p className="t-label-sm t-muted">가족의 이름을 걸고 지키는 음식 철학</p>
                  </div>
                </header>
                <ol className={styles.promises}>
                  {story.promises.map((p, i) => (
                    <li key={p.title}>
                      <span className={styles.promiseNum}>{String(i + 1).padStart(2, "0")}</span>
                      <div>
                        <h4 className="t-label-lg">{p.title}</h4>
                        <p className="t-body-sm t-muted">{p.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            </div>
          </div>
        </section>

        {/* 4. MENU & PRICE SUMMARY — prices read from data/menu.json */}
        <section id="menu-summary" className="section section--alt" aria-labelledby="menu-title">
          <div className="container">
            <div className="section-head">
              <span className="t-eyebrow t-eyebrow--red">PREMIUM DINING</span>
              <h2 id="menu-title" className="t-h2">
                정직한 가격과 푸짐한 건강식
              </h2>
              <p className={styles.includeNote}>
                <Icon name="check_circle" className="t-green" />
                한우 샤브샤브 + 무제한 셀프바 · 신선 샐러드 · 월남쌈 기본 포함
              </p>
            </div>

            <div className="grid-2">
              {menu.courses.map((c) => (
                <article key={c.id} className={`card card--lift ${styles.priceCard}`}>
                  <div className={styles.priceTop}>
                    <div>
                      <span className={`pill ${c.featured ? "pill--red" : ""}`}>{c.eyebrow}</span>
                      <h3 className="t-h3">{c.name}</h3>
                      <p className="t-body-sm t-muted">{c.schedule}</p>
                    </div>
                    <p className={`price ${styles.priceBig}`}>
                      {formatNumber(c.price)}
                      <small>원 / {c.unit}</small>
                    </p>
                  </div>
                  <dl className="rows">
                    {c.includes.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd className={row.value.includes("무제한") ? "t-green" : c.featured ? "t-red" : ""}>
                          {row.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Link
                    href={restaurant.links.reservation}
                    className={`btn btn--block ${c.featured ? "btn--primary" : "btn--ghost"}`}
                  >
                    {c.featured ? "주말 · 공휴일 예약하기" : "평일 점심 예약하기"} <Icon name="chevron_right" />
                  </Link>
                </article>
              ))}
            </div>

            <ul className={styles.subPrices}>
              {menu.kids.slice(0, 2).map((k) => (
                <li key={k.id}>
                  <span className="t-label t-muted">{k.name}</span>
                  <strong className="t-label-lg">{formatPrice(k.price)}</strong>
                </li>
              ))}
              <li>
                <span className="t-label t-red">{extraMeat.name}</span>
                <strong className="t-h4 t-red">{formatPrice(extraMeat.price)}</strong>
              </li>
            </ul>
            <p className={`t-body-sm t-muted ${styles.eveningNote}`}>
              <Icon name="info" /> {restaurant.eveningNote}
            </p>

            <h3 className={`t-h4 ${styles.selfBarTitle}`}>
              <Icon name="restaurant_menu" className="t-green" /> 샤브74 프리미엄 셀프바 대표 메뉴
            </h3>
            <ul className="grid-4">
              {home.selfBarHighlights.map((item) => (
                <li key={item.name} className="card card--flush card--lift">
                  <div className={`frame ${styles.thumb}`}>
                    <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 270px, 50vw" />
                  </div>
                  <div className={styles.thumbBody}>
                    <strong className="t-label">{item.name}</strong>
                    <span className="t-label-sm t-muted">{item.note}</span>
                  </div>
                </li>
              ))}
            </ul>

            <p className={styles.centerLink}>
              <Link href="/menu" className="link-arrow">
                전체 메뉴 및 가격 보기 <Icon name="arrow_forward" />
              </Link>
            </p>
          </div>
        </section>

        {/* 5. TODAY'S SMART FARM */}
        <section id="smartfarm" className="section" aria-labelledby="farm-title">
          <div className="container">
            <div className={`card ${styles.farmCard}`}>
              <div className={styles.farmStatus}>
                <p className="t-label-lg t-green">
                  <span className="live-dot" /> {smartFarm.status}
                </p>
                <p className="pill pill--neutral">
                  <Icon name="sensors" className="t-green" /> {smartFarm.location}
                </p>
              </div>
              <ul className={`grid-3 ${styles.farmFacts}`}>
                {smartFarm.facts.map((f) => (
                  <li key={f.label}>
                    <span className="icon-badge">
                      <Icon name={f.icon} />
                    </span>
                    <div>
                      <span className="t-label-sm t-muted">{f.label}</span>
                      <strong className="t-h4">{f.value}</strong>
                    </div>
                    <span className="t-label-sm t-green">{f.note}</span>
                  </li>
                ))}
              </ul>
              <div className={styles.farmVisual}>
                <Image src={smartFarm.image} alt={smartFarm.alt} fill sizes="(min-width: 1200px) 1100px, 100vw" />
                <div className={styles.farmCopy}>
                  <span className="pill pill--solid-green">HYDROPONIC SMART FARM</span>
                  <h2 id="farm-title" className="t-h3">
                    {smartFarm.title}
                  </h2>
                  <p className="t-body">{smartFarm.body}</p>
                  <Link href="/menu#self-bar" className="btn btn--sm btn--secondary">
                    스마트팜 채소가 나오는 셀프바 보기 <Icon name="arrow_forward" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. OCCASIONS */}
        <section className="section section--alt" aria-labelledby="occasion-title">
          <div className="container">
            <div className="section-head">
              <span className="t-eyebrow">OCCASIONS</span>
              <h2 id="occasion-title" className="t-h2">
                이런 날 오세요
              </h2>
              <p>소중한 분들과 함께하는 모든 순간이 건강하고 편안하도록 준비했습니다.</p>
            </div>
            <ul className="grid-4">
              {home.occasions.map((o) => (
                <li key={o.title} className={`card card--lift ${styles.occasion}`}>
                  <span className={`icon-badge ${o.accent ? "icon-badge--red" : ""}`}>
                    <Icon name={o.icon} />
                  </span>
                  <h3 className="t-h4">{o.title}</h3>
                  <p className="t-body-sm t-muted">{o.body}</p>
                  <SmartLink
                    href={resolveHref(o.href)}
                    className={`btn btn--sm btn--block ${o.accent ? "btn--primary" : "btn--tertiary"} ${styles.occasionCta}`}
                  >
                    {o.cta} <Icon name={o.href === "tel" ? "call" : "chevron_right"} />
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 7. REVIEWS & REVIEW EVENT */}
        <section className="section" aria-labelledby="review-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <span className="t-eyebrow t-eyebrow--red">GUEST EXPERIENCES</span>
                <h2 id="review-title" className="t-h2">
                  손님들이 남겨주신 솔직한 후기
                </h2>
              </div>
              <a href={restaurant.links.naverMap} target="_blank" rel="noopener noreferrer" className="link-arrow">
                네이버 플레이스 리뷰 전체 보기 <Icon name="open_in_new" />
              </a>
            </div>
            <ul className="grid-3">
              {home.reviews.map((r) => (
                <li key={r.author} className={`card ${styles.review}`}>
                  <div className={styles.reviewTop}>
                    <span className={`pill ${tonePill[r.tone]}`}>{r.source}</span>
                    <Stars size={16} />
                  </div>
                  <blockquote className="t-body">{r.body}</blockquote>
                  <p className="t-label-sm">{r.author}</p>
                </li>
              ))}
            </ul>

            <aside className={styles.event} aria-label="리뷰 이벤트">
              <div className={styles.eventBody}>
                <span className={styles.eventIcon}>
                  <Icon name="redeem" size={30} />
                </span>
                <div>
                  <span className={styles.eventTag}>EVENT</span>
                  <h3 className="t-h4">{home.reviewEvent.title}</h3>
                  <p className="t-body-sm">{home.reviewEvent.body}</p>
                </div>
              </div>
              <a href={restaurant.links.naverMap} target="_blank" rel="noopener noreferrer" className={styles.eventBtn}>
                리뷰 남기러 가기
              </a>
            </aside>
          </div>
        </section>

        {/* 8. LATEST NEWS */}
        <section className="section section--alt" aria-labelledby="news-title">
          <div className="container">
            <div className="section-head section-head--split">
              <div>
                <span className="t-eyebrow">SHABU 74 NEWS</span>
                <h2 id="news-title" className="t-h3">
                  샤브74 새소식 &amp; 공지
                </h2>
              </div>
              <a href={restaurant.links.instagram} target="_blank" rel="noopener noreferrer" className="link-arrow">
                인스타그램에서 더 보기 <Icon name="chevron_right" />
              </a>
            </div>
            <ul className="grid-3">
              {home.news.map((n) => (
                <li key={n.title} className={`card ${styles.news}`}>
                  <div className={styles.newsTop}>
                    <span className={`pill ${tonePill[n.tone]}`}>{n.category}</span>
                    <time dateTime={n.date} className="t-label-sm t-muted">
                      {formatDate(n.date)}
                    </time>
                  </div>
                  <h3 className="t-label-lg">{n.title}</h3>
                  <p className="t-body-sm t-muted">{n.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 9. LOCATION & HOURS */}
        <section id="location" className="section" aria-labelledby="location-title">
          <div className="container">
            <div className="section-head">
              <span className="t-eyebrow">VISIT US</span>
              <h2 id="location-title" className="t-h2">
                매장 위치 &amp; 이용 안내
              </h2>
              <p>진주 평거동 제우스빌딩 4층에 있습니다. 건물 지하주차장을 무료로 이용하실 수 있습니다.</p>
            </div>

            <div className={styles.locationGrid}>
              <div className={`card card--flush ${styles.mapCard}`}>
                <a
                  href={restaurant.links.naverMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`frame ${styles.map}`}
                  aria-label="네이버 지도에서 샤브74 위치 보기"
                >
                  <Image src="/images/map.png" alt="" fill sizes="(min-width: 1024px) 680px, 100vw" />
                  <span className={styles.mapPin}>
                    <span className={styles.mapPinIcon}>
                      <Icon name="pin_drop" />
                    </span>
                    <span>
                      <strong className="t-label">{restaurant.branch}</strong>
                      <span className="t-label-sm t-muted">제우스빌딩 4층</span>
                    </span>
                  </span>
                </a>
                <div className={styles.mapFoot}>
                  <p className="t-label">
                    <Icon name="directions_car" className="t-green" /> {restaurant.address.display}
                  </p>
                  <div className={styles.mapBtns}>
                    <a href={restaurant.links.kakaoMap} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--ghost">
                      카카오맵 길찾기
                    </a>
                    <a href={restaurant.links.naverMap} target="_blank" rel="noopener noreferrer" className="btn btn--sm btn--green">
                      네이버 지도 길찾기
                    </a>
                  </div>
                </div>
              </div>

              <div className={`card ${styles.infoCard}`}>
                <dl className={styles.infoList}>
                  <div>
                    <span className="icon-badge icon-badge--round">
                      <Icon name="location_on" />
                    </span>
                    <dt className="t-label">도로명 주소</dt>
                    <dd className="t-body t-muted">{restaurant.address.display}</dd>
                  </div>
                  <div>
                    <span className="icon-badge icon-badge--round icon-badge--neutral">
                      <Icon name="local_parking" />
                    </span>
                    <dt className="t-label">주차 안내</dt>
                    <dd className="t-body t-muted">{restaurant.parking}</dd>
                  </div>
                  <div>
                    <span className="icon-badge icon-badge--round icon-badge--neutral">
                      <Icon name="schedule" />
                    </span>
                    <dt className="t-label">운영 시간 및 휴무</dt>
                    <dd className="t-body-sm t-muted">
                      <span className={styles.hourRow}>
                        <b>{weekday.label}</b> {weekday.opens} ~ {weekday.closes} (L.O {weekday.lastOrder})
                      </span>
                      <span className={styles.hourRow}>
                        <b>{weekend.label}</b> {weekend.opens} ~ {weekend.closes} (L.O {weekend.lastOrder})
                      </span>
                      <span className={`${styles.hourRow} t-red`}>
                        <b className="t-red">{restaurant.closedLabel}</b>
                      </span>
                      <span className={styles.hourRow}>{restaurant.eveningNote}</span>
                    </dd>
                  </div>
                  <div>
                    <span className="icon-badge icon-badge--round icon-badge--red">
                      <Icon name="call" />
                    </span>
                    <dt className="t-label">대표 예약 · 단체 문의</dt>
                    <dd className={`price ${styles.phoneBig}`}>{restaurant.telephone}</dd>
                  </div>
                </dl>
                <div className={styles.infoBtns}>
                  <a href={telHref} className="btn btn--ghost">
                    <Icon name="call" /> 전화 연결
                  </a>
                  <a href={telHref} className="btn btn--primary">
                    <Icon name="event_seat" /> 전화로 예약
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 10. DESKTOP CTA CONSOLE */}
        <section className={styles.ctaBar} aria-label="예약 안내">
          <div className={`container ${styles.ctaInner}`}>
            <div className={styles.ctaCopy}>
              <span className={styles.ctaIcon}>
                <Icon name="soup_kitchen" size={28} />
              </span>
              <div>
                <h2 className="t-h4">소중한 가족과 함께하는 특별한 식사, 샤브74</h2>
                <p className="t-body-sm">당일 수확 스마트팜 채소와 1++ 한우의 정갈한 맛을 미리 예약하세요.</p>
              </div>
            </div>
            <div className={styles.ctaBtns}>
              <a href={telHref} className="btn btn--sm btn--secondary">
                전화 예약 {restaurant.telephone}
              </a>
              <Link href={restaurant.links.order} className="btn btn--sm btn--primary">
                밀키트 주문
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
      <MobileActionBar />
    </>
  );
}
