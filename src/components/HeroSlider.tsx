"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

/** Ảnh nền hero tự chuyển mờ chéo mỗi `interval` ms. Ảnh đầu được ưu tiên tải (LCP). */
export default function HeroSlider({ slides, interval = 5000, dotsClassName = "bottom-24" }: { slides: Slide[]; interval?: number; dotsClassName?: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [paused, slides.length, interval]);

  return (
    <div className="absolute inset-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {slides.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={i === active ? s.alt : ""}
          aria-hidden={i !== active}
          fill
          priority={i === 0}
          loading="eager"
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1400ms] ease-in-out ${
            i === active ? "animate-kenburns opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className={`absolute ${dotsClassName} left-1/2 z-[5] flex -translate-x-1/2 gap-2.5`} role="tablist" aria-label="Chọn ảnh nền">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={`Ảnh ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
