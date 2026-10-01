export default function SectionTitle({
  kicker,
  title,
  center = false,
}: {
  kicker?: string;
  title: string;
  center?: boolean;
}) {
  return (
    <div className={`reveal ${center ? "text-center" : ""}`}>
      {kicker && <p className="text-xs font-bold uppercase tracking-[0.35em] text-brand-500">{kicker}</p>}
      <h2 className={`mt-2 text-3xl md:text-5xl ${center ? "mx-auto max-w-3xl text-balance" : "max-w-xl text-balance"}`}>{title}</h2>
    </div>
  );
}
