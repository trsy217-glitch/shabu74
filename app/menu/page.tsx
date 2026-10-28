import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon from "@/components/Icon";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import { MobileActionBar, SiteFooter } from "@/components/SiteFooter";
import { formatPrice, menu, restaurant, telHref } from "@/lib/data";
import { buildRestaurantJsonLd } from "@/lib/jsonld";
import styles from "./menu.module.css";

const lowest = Math.min(...menu.courses.map((c) => c.price));
const highest = Math.max(...menu.courses.map((c) => c.price));

export const metadata: Metadata = {
  title: { absolute: "진주 한우샤브샤브 가격 · 메뉴 | 샤브74 평거동" },
  description: `샤브74 메뉴·가격표. 평일 점심 ${formatPrice(lowest)}, 주말·공휴일 ${formatPrice(highest)}, 초등 ${formatPrice(
    menu.kids[0].price,
  )} · 미취학 ${formatPrice(menu.kids[1].price)}. 1++ 한우와 7종 스마트팜 채소, 20여 종 무제한 셀프바, 밀키트 포장.`,
  alternates: { canonical: "/menu" },
  openGraph: {
    url: "/menu",
    title: "진주 한우샤브샤브 가격 · 메뉴 | 샤브74",
    description: "평일 점심 · 주말 가격, 셀프바 구성, 아이 요금, 고기 추가 안내까지 한눈에.",
  },
};

const JUMP = [
  { href: "#course-prices", label: "샤브샤브 코스 가격" },
  { href: "#hanwoo-philosophy", label: "1++ 한우 원칙" },
  { href: "#self-bar", label: "셀프바 (7개 구역)" },
  { href: "#broth-sauces", label: "육수 & 특제소스" },
  { href: "#takeout-drinks", label: "포장 · 밀키트 / 주류" },
];

type Row = {
  id: string;
  name: string;
  tag?: string;
  featured?: boolean;
  sub?: string;
  composition: string;
  selfBar: { icon: string; label: string };
  price: number;
  kind: "course" | "kid" | "addon";
};

const rows: Row[] = [
  ...menu.courses.map<Row>((c) => ({
    id: c.id,
    name: c.name,
    tag: c.tag,
    featured: c.featured,
    sub: c.schedule,
    composition: c.composition,
    selfBar: { icon: "all_inclusive", label: c.selfBar },
    price: c.price,
    kind: "course",
  })),
  ...menu.kids.map<Row>((k) => ({
    id: k.id,
    name: k.name,
    composition: k.description,
    selfBar: k.price === 0 ? { icon: "child_care", label: "동반 무료" } : { icon: "all_inclusive", label: "무제한 이용" },
    price: k.price,
    kind: "kid",
  })),
  ...menu.addons.map<Row>((a) => ({
    id: a.id,
    name: a.name,
    composition: a.description,
    selfBar: { icon: "scale", label: "저울 정량 계량" },
    price: a.price,
    kind: "addon",
  })),
];

export default function MenuPage() {
  const extraMeat = menu.addons[0];
  const [featuredZone, ...zones] = menu.selfBar.zones;
  const dessertZone = zones.find((z) => !z.image);
  const photoZones = zones.filter((z) => z.image);
  const [mealkit, ...otherTakeout] = menu.takeout;

  return (
    <>
      <JsonLd data={buildRestaurantJsonLd()} />
      <SiteHeader current="menu" />

      <main className="main">
        {/* Page header + jump navigation */}
        <section className={`container ${styles.pageHead}`}>
          <span className="pill">
            <Icon name="eco" /> 당일 수확 스마트팜 &amp; 1++ 한우 정품
          </span>
          <div className={styles.titleRow}>
            <div>
              <h1 className="t-h1">메뉴 · 가격 안내</h1>
              <p className="t-body-lg t-muted">진주 평거동 샤브74 | 1++ 한우와 매장 스마트팜 유기농 7종 채소</p>
            </div>
            <p className={`t-label-sm ${styles.allIncluded}`}>
              <span className={styles.greenDot} /> 모든 코스 채소 &amp; 셀프바 무제한 포함
            </p>
          </div>
          <nav className={`scroll-x ${styles.jump}`} aria-label="메뉴 페이지 바로가기">
            {JUMP.map((j, i) => (
              <a key={j.href} href={j.href} className={i === 0 ? styles.jumpActive : undefined}>
                {j.label}
              </a>
            ))}
          </nav>
        </section>

        {/* 1. PRICE TABLE (single semantic table; restyled as cards on mobile) */}
        <section id="course-prices" className={`container ${styles.block}`} aria-labelledby="price-title">
          <div className={styles.blockHead}>
            <h2 id="price-title" className={`t-h2 ${styles.barTitle}`}>
              샤브샤브 코스 정가표
            </h2>
            <span className="t-label-sm t-red">* {menu.priceNote}</span>
          </div>

          <div className={`card card--flush ${styles.tableCard}`}>
            <table className={styles.table}>
              <caption className="sr-only">
                샤브74 샤브샤브 코스 가격표 (1인 기준, {menu.priceNote})
              </caption>
              <thead>
                <tr>
                  <th scope="col">코스 구분</th>
                  <th scope="col">제공 구성</th>
                  <th scope="col">스마트팜 &amp; 셀프바</th>
                  <th scope="col" className={styles.right}>
                    1인 가격
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr
                    key={r.id}
                    className={[
                      styles[`row_${r.kind}`],
                      r.featured ? styles.rowFeatured : "",
                    ].join(" ")}
                  >
                    <th scope="row">
                      <div className={styles.course}>
                        {r.kind === "addon" && <Icon name="add_circle" className="t-red" />}
                        {r.tag && (
                          <span className={`pill ${r.featured ? "pill--solid-red" : "pill--neutral"}`}>{r.tag}</span>
                        )}
                        <span>
                          <span className={r.kind === "course" ? "t-h4" : "t-label-lg"}>{r.name}</span>
                          {r.sub && <span className={`t-label-sm t-muted ${styles.block2}`}>{r.sub}</span>}
                        </span>
                      </div>
                    </th>
                    <td data-label="제공 구성">
                      {r.kind === "course" ? (
                        <>
                          <b className="t-red">{r.composition.split(" + ")[0]}</b> + {r.composition.split(" + ").slice(1).join(" + ")}
                        </>
                      ) : (
                        <span className="t-muted">{r.composition}</span>
                      )}
                    </td>
                    <td data-label="셀프바">
                      <span className={styles.selfBar}>
                        <Icon name={r.selfBar.icon} /> {r.selfBar.label}
                      </span>
                    </td>
                    <td data-label="1인 가격" className={styles.right}>
                      <span
                        className={`price ${r.kind === "course" ? styles.priceLg : styles.priceMd} ${
                          r.price === 0 ? "t-green" : r.kind === "kid" ? styles.priceNeutral : ""
                        }`}
                      >
                        {formatPrice(r.price)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.notice}>
            <Icon name="info" className="t-green" size={24} />
            <p className="t-body-sm t-muted">
              <strong>안내 말씀:</strong> {menu.includedNote}
            </p>
          </div>
          <div className={styles.notice}>
            <Icon name="schedule" className="t-green" size={24} />
            <p className="t-body-sm t-muted">
              <strong>영업 안내:</strong>{" "}
              {restaurant.hours.map((h) => `${h.label} ${h.opens}~${h.closes} (L.O ${h.lastOrder})`).join(" · ")} ·{" "}
              {restaurant.closedLabel}. {restaurant.eveningNote}
            </p>
          </div>
        </section>

        {/* 2. WHY IS EXTRA MEAT PAID? */}
        <section id="hanwoo-philosophy" className={`container ${styles.block}`} aria-labelledby="hanwoo-title">
          <div className={`card ${styles.philo}`}>
            <div className={styles.philoVisual}>
              <div className={`frame frame--4x3 ${styles.philoFrame}`}>
                <Image
                  src="/images/hanwoo-closeup.jpg"
                  alt="샤브74 1++ 한우 샤브샤브용 슬라이스 — 마블링이 고운 투뿔 한우"
                  fill
                  sizes="(min-width: 1024px) 460px, 100vw"
                />
                <span className={`pill pill--solid-red ${styles.overlayPill}`}>
                  <Icon name="verified" /> 1++ 투뿔 한우
                </span>
              </div>
              <div className={styles.certRow}>
                <span className="t-label">
                  <Icon name="assignment_turned_in" className="t-green" /> 축산물 등급판정확인서
                </span>
                <span className="t-label-sm t-muted">매장 카운터 비치</span>
              </div>
            </div>

            <div className={styles.philoText}>
              <span className="pill pill--red">샤브74의 고집과 철학</span>
              <h2 id="hanwoo-title" className="t-h2">
                “왜 샤브74는 고기를 무한리필하지 않고 추가 비용을 받나요?”
              </h2>
              <p className="t-body t-muted">
                샤브74는 저가 냉동 수입육을 무한리필로 제공하며 질을 타협하지 않습니다. 내 아이와 부모님께 대접할 수 있는{" "}
                <strong className="t-red">1++ 등급 한우</strong>만을 고집합니다.
              </p>
              <p className="t-body t-muted">
                진짜 한우의 고소한 육즙과 부드러운 식감을 정직한 가격으로 경험하실 수 있도록, 고기 추가는{" "}
                <strong>100g {formatPrice(extraMeat.price)}</strong>에 투명하게 제공합니다.
              </p>
              <ul className={styles.checks}>
                <li>
                  <Icon name="workspace_premium" className="t-green" />
                  <strong className="t-label">엄선된 1++ 한우</strong>
                  <span className="t-body-sm t-muted">저가 냉동 수입육과 비교 불가</span>
                </li>
                <li>
                  <Icon name="scale" className="t-green" />
                  <strong className="t-label">정직한 정량 100g</strong>
                  <span className="t-body-sm t-muted">전자저울 정확 계량</span>
                </li>
                <li>
                  <Icon name="verified_user" className="t-green" />
                  <strong className="t-label">등급 판정서 비치</strong>
                  <span className="t-body-sm t-muted">이력번호 투명 조회</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. SELF BAR — 7 zones */}
        <section id="self-bar" className={`container ${styles.block}`} aria-labelledby="selfbar-title">
          <div className={styles.introHead}>
            <span className="pill">
              <Icon name="restaurant" /> {menu.selfBar.summary}
            </span>
            <h2 id="selfbar-title" className="t-h1">
              무제한 프리미엄 셀프바 존
            </h2>
            <p className="t-body-lg t-muted">
              매장 스마트팜 유기농 채소와 정성 요리를 마음껏 즐기세요. 모든 코스에 포함되어 있습니다.
            </p>
          </div>

          <ul className={styles.zoneGrid}>
            <li className={`card card--flush card--lift ${styles.zoneFeatured}`}>
              <div className={`frame ${styles.zoneFeaturedImg}`}>
                <Image src={featuredZone.image!} alt={featuredZone.imageAlt!} fill sizes="(min-width: 1024px) 380px, 100vw" />
                <span className={`pill pill--solid-green ${styles.overlayPill}`}>{featuredZone.badge}</span>
              </div>
              <div className={styles.zoneFeaturedBody}>
                <div>
                  <p className="t-label t-green">
                    <Icon name="potted_plant" /> 스마트팜 직송
                  </p>
                  <h3 className="t-h3">{featuredZone.name}</h3>
                  <p className="t-body t-muted">{featuredZone.description}</p>
                </div>
                <p className={styles.zoneNote}>
                  <Icon name="verified" /> {featuredZone.note}
                </p>
              </div>
            </li>

            {photoZones.map((z) => (
              <li key={z.id} className={`card card--flush card--lift ${styles.zone}`}>
                <div className="frame frame--16x10">
                  <Image src={z.image!} alt={z.imageAlt!} fill sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw" />
                  <span className={`pill ${z.accent ? "pill--solid-red" : "pill--neutral"} ${styles.overlayPill}`}>
                    {z.badge}
                  </span>
                </div>
                <div className={styles.zoneBody}>
                  <h3 className="t-h4">{z.name}</h3>
                  <p className="t-body t-muted">{z.description}</p>
                  <span className={`t-label-sm ${z.accent ? "t-red" : "t-green"}`}>{z.note}</span>
                </div>
              </li>
            ))}

            {dessertZone && (
              <li className={`card ${styles.zoneWide}`}>
                <div className={styles.zoneWideMain}>
                  <span className="icon-badge icon-badge--round">
                    <Icon name={dessertZone.icon ?? "coffee"} />
                  </span>
                  <div>
                    <p className={styles.zoneWideTitle}>
                      <span className="pill pill--neutral">{dessertZone.badge}</span>
                      <span className="t-h4">{dessertZone.name}</span>
                    </p>
                    <p className="t-body t-muted">{dessertZone.description}</p>
                  </div>
                </div>
                <span className="pill">{dessertZone.note}</span>
              </li>
            )}
          </ul>
        </section>

        {/* 4. BROTHS & SAUCES */}
        <section id="broth-sauces" className={`container ${styles.block}`} aria-labelledby="broth-title">
          <div className={styles.introHead}>
            <span className="pill pill--neutral">Golden Ratio Soup &amp; Sauce</span>
            <h2 id="broth-title" className="t-h1">
              육수 &amp; 특제 수제소스
            </h2>
            <p className="t-body-lg t-muted">반반 냄비로 2가지 육수를 동시에 즐기실 수 있도록 기본 제공합니다.</p>
          </div>

          <div className="grid-2">
            {menu.broths.map((b) => (
              <article key={b.id} className={`card ${styles.broth}`}>
                <div className={styles.brothTop}>
                  <span className={`pill ${b.tone === "accent" ? "pill--red" : ""}`}>{b.tag}</span>
                  <Icon name={b.icon} className={b.tone === "accent" ? "t-red" : "t-green"} size={26} />
                </div>
                <h3 className="t-h3">{b.name}</h3>
                <p className="t-body t-muted">{b.description}</p>
                <p className={`t-label-sm ${b.tone === "accent" ? "t-red" : "t-green"} ${styles.brothNote}`}>
                  <Icon name={b.tone === "accent" ? "thumb_up" : "favorite"} /> {b.note}
                </p>
              </article>
            ))}
          </div>

          <div className={styles.sauceBar}>
            <div className={styles.sauceHead}>
              <h3 className="t-h4">정성을 담은 4가지 특제 수제소스 바</h3>
              <span className="t-label-sm t-muted">셀프 소스바에서 자유롭게 리필</span>
            </div>
            <ul className={styles.sauces}>
              {menu.sauces.map((s) => (
                <li key={s.id}>
                  <p>
                    <strong className="t-label-lg">{s.name}</strong>
                    <span className="t-label-sm t-muted">{s.tag}</span>
                  </p>
                  <p className="t-body-sm t-muted">{s.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. TAKEOUT, MEAL KIT & DRINKS */}
        <section id="takeout-drinks" className={`container ${styles.block}`} aria-label="포장 · 밀키트 및 주류">
          <div className={styles.takeoutGrid}>
            <div className={styles.col}>
              <div>
                <span className="pill">
                  <Icon name="shopping_bag" /> 홈파티 &amp; 캠핑 추천
                </span>
                <h2 className={`t-h2 ${styles.colTitle}`}>포장 및 프리미엄 밀키트</h2>
                <p className="t-body t-muted">매장의 신선한 감동을 집에서도 그대로 간편하게 조리해 드실 수 있습니다.</p>
              </div>

              <article className={`card ${styles.mealkit}`}>
                <div className={`frame frame--square ${styles.mealkitImg}`}>
                  <Image src={mealkit.image!} alt={mealkit.imageAlt!} fill sizes="176px" />
                </div>
                <div className={styles.mealkitBody}>
                  <div className={styles.spread}>
                    <span className="pill pill--neutral">{mealkit.tag}</span>
                    <span className={`price ${styles.priceMd}`}>{formatPrice(mealkit.price)}</span>
                  </div>
                  <h3 className="t-h4">{mealkit.name}</h3>
                  <p className="t-body-sm t-muted">{mealkit.description}</p>
                  <a href={telHref} className="btn btn--sm btn--green">
                    <Icon name="call" /> 전화로 밀키트 주문
                  </a>
                </div>
              </article>

              {otherTakeout.map((t) => (
                <article key={t.id} className={`card ${styles.takeoutRow}`}>
                  <span className="icon-badge icon-badge--red">
                    <Icon name="takeout_dining" />
                  </span>
                  <div>
                    <h3 className="t-label-lg">{t.name}</h3>
                    <p className="t-body-sm t-muted">{t.description}</p>
                  </div>
                  <span className={`price ${styles.priceMd}`}>{formatPrice(t.price)}</span>
                </article>
              ))}
            </div>

            <div className={styles.col}>
              <div>
                <span className="pill pill--neutral">
                  <Icon name="local_bar" /> 페어링 주류 &amp; 음료
                </span>
                <h2 className={`t-h2 ${styles.colTitle}`}>주류 &amp; 음료</h2>
                <p className="t-body t-muted">샤브샤브와 어울리는 깔끔한 주류 리스트입니다.</p>
              </div>
              <ul className={`card ${styles.drinks}`}>
                {menu.drinks.map((d) => (
                  <li key={d.id}>
                    <div>
                      <strong className="t-label-lg">{d.name}</strong>
                      <span className="t-body-sm t-muted">{d.description}</span>
                    </div>
                    <div className={styles.right}>
                      <span className={`price ${styles.priceNeutral} ${d.subPrice ? styles.priceSm : styles.priceMd}`}>
                        {d.priceLabel ?? formatPrice(d.price)}
                      </span>
                      {d.subPrice && (
                        <span className="t-body-sm t-muted">
                          {d.subPrice.label} {formatPrice(d.subPrice.price)}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 6. RESERVATION CALLOUT */}
        <section className={`container ${styles.block} ${styles.lastBlock}`} aria-labelledby="cta-title">
          <div className={styles.cta}>
            <div className={styles.ctaCopy}>
              <span className="pill">
                <Icon name="groups" /> 개별룸 &amp; 가족 모임 완비
              </span>
              <h2 id="cta-title" className="t-h2">
                소중한 가족 외식과 단체 모임, 미리 예약하세요
              </h2>
              <p className="t-body-lg">
                단체 모임 및 개별룸 예약은 전화로 가능합니다. 평일 저녁은 단체·전체 대관 예약제로 운영합니다.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <a href={telHref} className="btn btn--primary">
                <Icon name="call" /> 예약 전화 {restaurant.telephone}
              </a>
              <Link href="/#location" className="btn btn--secondary">
                <Icon name="map" /> 오시는 길
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
