"use client";

import { useEffect, useRef } from "react";

type Source = { src: string; type: string };

type NetworkInformation = { saveData?: boolean; effectiveType?: string };

/**
 * Muted, looping, autoplaying promo video layered over a poster image.
 *
 * - The <video> is server-rendered with `poster`, but its <source> URLs are kept
 *   in data-src until the browser confirms it is OK to download video:
 *   no Data Saver, not a 2G connection, and no prefers-reduced-motion.
 *   Otherwise only the poster is shown (plan: "느린 회선에서는 사진만 노출").
 * - The video stays transparent until it actually plays, so a missing or slow
 *   file never hides the poster.
 */
export default function HeroVideo({ poster, sources, className }: { poster: string; sources: Source[]; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const saveData = conn?.saveData === true;
    const slowNetwork = /(^|-)2g$/.test(conn?.effectiveType ?? "");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (saveData || slowNetwork || reducedMotion) return;

    video.querySelectorAll<HTMLSourceElement>("source[data-src]").forEach((s) => {
      s.src = s.dataset.src ?? "";
    });
    video.muted = true; // required for mobile autoplay
    video.load();

    const onPlaying = () => video.setAttribute("data-playing", "");
    video.addEventListener("playing", onPlaying);
    video.play().catch(() => {
      /* autoplay blocked or file missing: the poster stays visible */
    });
    return () => video.removeEventListener("playing", onPlaying);
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      aria-hidden="true"
      tabIndex={-1}
      disablePictureInPicture
    >
      {sources.map((s) => (
        <source key={s.src} data-src={s.src} type={s.type} />
      ))}
    </video>
  );
}
