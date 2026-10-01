"use client";

import { useEffect, useRef, useState } from "react";

/** Đếm số từ 0 tới giá trị khi cuộn tới, giữ nguyên hậu tố (+, k+...). Ví dụ "45.6k+". */
export default function CountUp({ value, duration = 1600 }: { value: string; duration?: number }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match?.[2] ?? "";
  const decimals = match?.[1].includes(".") ? match[1].split(".")[1].length : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          setN(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Trước khi đếm (và khi SSR) hiển thị đúng giá trị cuối để không lệch SEO
  return <span ref={ref}>{n === null ? value : `${n.toFixed(decimals)}${suffix}`}</span>;
}
