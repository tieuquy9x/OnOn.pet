/** Bộ icon nét mảnh (stroke) dùng chung, hợp phong cách vintage: không emoji. */
const PATHS = {
  paw: "M12 20c-3 0-5-1.6-5-3.6 0-2.2 2.4-4.4 5-4.4s5 2.2 5 4.4c0 2-2 3.6-5 3.6zM5.5 10.5a1.7 2.3 0 100-.01M9 6.5a1.7 2.3 0 100-.01M15 6.5a1.7 2.3 0 100-.01M18.5 10.5a1.7 2.3 0 100-.01",
  scissors: "M6 4l12 12M6 16L18 4M5.5 19a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4zM18.5 19a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4z",
  drop: "M12 3c3.2 4.2 5.2 6.8 5.2 9.4a5.2 5.2 0 01-10.4 0C6.8 9.8 8.8 7.2 12 3zM9.5 13.5a2.7 2.7 0 002.2 2.2",
  home: "M4 11l8-7 8 7M6 10v10h12V10M10 20v-5h4v5",
  sun: "M12 8.5a3.5 3.5 0 013.5 3.5h-7A3.5 3.5 0 0112 8.5zM12 3.5v2M5.2 6.2l1.4 1.4M18.8 6.2l-1.4 1.4M4 15.5h16M7 19h10",
  bag: "M6 8h12l-1 12H7L6 8zM9 8V6.5a3 3 0 016 0V8",
  chat: "M4 5h16v11H9l-5 4V5zM8 9.5h8M8 12.5h5",
  heart: "M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z",
  shield: "M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3zM9 12l2.2 2.2L15.5 10",
  sparkle: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM18.5 16l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z",
} as const;

export type IconName = keyof typeof PATHS;

export default function Icon({ name, className = "h-8 w-8" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`fill-none stroke-current ${className}`} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[name]} />
    </svg>
  );
}
