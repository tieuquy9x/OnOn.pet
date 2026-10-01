import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { IMG, photo } from "@/lib/images";
import { formatVnd } from "@/lib/site";
import PostCard from "@/components/PostCard";
import Icon, { type IconName } from "@/components/Icon";
import SectionTitle from "@/components/SectionTitle";
import HeroSlider from "@/components/HeroSlider";
import AppointmentForm from "@/components/AppointmentForm";

export const revalidate = 3600;

const HERO_SLIDES = [
  { src: photo("1587300003388-59208cc962cb", 1800), alt: "Chú chó Úc đang cười trên bãi biển" },
  { src: photo("1596492784531-6e6eb5ea9993", 1800), alt: "Chú chó Samoyed lông trắng đáng yêu" },
  { src: photo("1548199973-03cce0bbc87b", 1800), alt: "Hai chú chó corgi và yorkie đang chạy" },
  { src: photo("1573865526739-10659fec78a5", 1800), alt: "Chú mèo cam đang thư giãn" },
  { src: photo("1543466835-00a7907e9de1", 1800), alt: "Chú chó beagle đang cười" },
];
const TESTIMONY_BG = photo("1544568100-847a948585b9", 1800);
const APPOINTMENT_BG = photo("1450778869180-41d0601e046e", 1800);

const WHY: { icon: IconName; title: string; text: string }[] = [
  { icon: "home", title: "Phòng riêng HOME 1–14", text: "Mỗi bé một không gian kính trong suốt, thoáng mát, có đèn ấm và theo dõi được từ quầy." },
  { icon: "heart", title: "Chăm sóc tận tâm", text: "Bé được nhẹ nhàng, kiên nhẫn từ lúc đón đến lúc trả, như người thân trong nhà." },
  { icon: "sparkle", title: "Không gian sạch, ấm", text: "Tông kem nâu dịu mắt, vệ sinh kỹ sau mỗi lượt để bé và chủ đều thấy dễ chịu." },
  { icon: "bag", title: "Cửa hàng ngay trong tiệm", text: "Thức ăn, đồ chơi, giường nằm và phụ kiện chọn lọc, mua tiện khi đón bé." },
];

const SERVICES: { icon: IconName; title: string; text: string }[] = [
  { icon: "scissors", title: "Grooming", text: "Cắt tỉa, tạo kiểu gọn gàng theo từng giống và đúng ý chủ." },
  { icon: "drop", title: "Spa", text: "Tắm gội, sấy khô, dưỡng lông và thư giãn nhẹ nhàng cho bé." },
  { icon: "home", title: "Hotel", text: "Lưu trú trong phòng riêng HOME, thoáng mát, an toàn, có người trông." },
  { icon: "sun", title: "Daycare", text: "Gửi bé theo ngày để chơi và nghỉ ngơi khi bạn bận việc." },
  { icon: "bag", title: "Cửa hàng", text: "Thức ăn, đồ chơi, giường nằm và phụ kiện chọn lọc cho bé." },
  { icon: "chat", title: "Tư vấn", text: "Hướng dẫn chăm sóc, chọn thức ăn và lịch làm đẹp phù hợp từng bé." },
];

const FAQS = [
  ["Tôi cần đặt lịch trước khi đưa bé đến khám không?", "Bạn nên đặt lịch qua form tư vấn hoặc hotline để được phục vụ nhanh, riêng ca khẩn cấp có thể đến trực tiếp."],
  ["Bé bao nhiêu tháng tuổi thì được tiêm phòng?", "Thông thường chó mèo bắt đầu tiêm từ 6-8 tuần tuổi. Bác sĩ sẽ lập lịch tiêm cụ thể sau khi khám."],
  ["Spa & grooming mất bao lâu?", "Tuỳ giống và độ dài lông, trung bình 1,5 - 3 giờ. Chúng tôi sẽ báo thời gian nhận bé khi đặt lịch."],
  ["Cửa hàng có giao hàng tận nơi không?", "Có. Giao hàng 24-48 giờ, miễn phí cho đơn từ 299.000₫ và đổi trả trong 7 ngày."],
];

export default async function HomePage() {
  const [products, plans, testimonials, posts] = await Promise.all([
    prisma.product.findMany({ include: { category: true }, take: 6, orderBy: { id: "asc" } }),
    prisma.plan.findMany({ orderBy: { sort: "asc" } }),
    prisma.testimonial.findMany({ take: 3 }),
    prisma.post.findMany({ take: 3, orderBy: { publishedAt: "desc" } }),
  ]);

  return (
    <>
      {/* Hero phong cách playful */}
      <section className="relative overflow-hidden bg-sky bg-paws">
        <div aria-hidden className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-white/50 blur-2xl" />
        <div aria-hidden className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-white/40 to-transparent" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-20 pt-14 md:pb-24 md:pt-20 lg:grid-cols-2">
          <div className="animate-hero">
            <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-ink shadow-sm">🐾 OnOn.Pet · Phòng khám &amp; cửa hàng</span>
            <h1 className="mt-6 font-fun text-5xl font-extrabold leading-[1.02] tracking-tight text-ink md:text-6xl lg:text-[4.25rem]">
              Thú cưng của bạn,
              <br />
              là{" "}
              <span className="relative inline-block">
                ưu tiên
                <svg aria-hidden viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-3 w-full text-sun">
                  <path d="M2 9 C 40 1, 80 15, 120 6 S 180 4, 198 8" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>{" "}
              số 1
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-ink/70">
              Khám chữa, spa và cửa hàng đồ chơi, phụ kiện an toàn: mọi thứ để bé cưng luôn khoẻ mạnh và vui vẻ mỗi ngày.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#dich-vu" className="rounded-full bg-ink px-7 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-black">
                Tìm hiểu thêm
              </Link>
              <Link href="/contact" className="rounded-full bg-sun px-7 py-3.5 text-sm font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:brightness-95">
                Đặt lịch ngay
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden className="absolute -right-4 -top-4 h-full w-full rounded-[45%_55%_50%_50%/55%_45%_55%_45%] bg-sun/90" />
            <div className="relative aspect-[5/6] overflow-hidden rounded-[45%_55%_50%_50%/55%_45%_55%_45%] border-8 border-white bg-white shadow-2xl">
              <HeroSlider slides={HERO_SLIDES} dotsClassName="bottom-6" />
            </div>
            <div className="animate-float absolute -left-2 bottom-12 rounded-2xl bg-white px-4 py-3 shadow-xl">
              <p className="text-xs font-bold uppercase tracking-wide text-ink/60">Khách hàng hài lòng</p>
              <p className="font-fun text-2xl font-extrabold text-ink">45.6k+ <span className="text-sun">★</span></p>
            </div>
          </div>
        </div>
      </section> 

      {/* Lời hứa */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
          <div className="reveal relative mx-auto aspect-square w-full max-w-md">
            <div aria-hidden className="absolute inset-0 -translate-x-4 translate-y-4 rounded-full bg-sky bg-paws" />
            <div className="relative h-full w-full overflow-hidden rounded-full border-8 border-white shadow-xl">
              <Image src={IMG.aboutMain} alt="Chú chó golden ngậm bông hoa" fill sizes="(min-width: 768px) 40vw, 80vw" className="object-cover" />
            </div>
            <svg aria-hidden viewBox="0 0 80 80" className="absolute -left-6 top-4 h-20 w-20 text-sun">
              <g stroke="currentColor" strokeWidth="7" strokeLinecap="round">
                <path d="M10 38 L34 44" />
                <path d="M20 14 L38 30" />
                <path d="M44 6 L48 26" />
              </g>
            </svg>
          </div>
          <div className="reveal text-center md:text-left">
            <p className="inline-block -rotate-3 font-script text-2xl text-ink md:text-3xl">Lời hứa của chúng tôi...</p>
            <h2 className="mt-3 font-fun text-4xl font-extrabold leading-[1.05] text-ink md:text-6xl">
              Thú cưng vui,
              <br />
              chủ nuôi vui
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-ink/70 md:mx-0">
              Từ buổi khám đầu tiên tới món đồ chơi yêu thích, đội ngũ OnOn.Pet luôn đồng hành để mỗi bé cưng được chăm sóc tận tâm và mỗi gia đình hoàn toàn yên tâm.
            </p>
            <Link href="/contact" className="mt-6 inline-block text-sm font-bold text-ink underline decoration-sun decoration-4 underline-offset-4 transition hover:text-brand-600">
              Tìm hiểu thêm
            </Link>
          </div>
        </div>
      </section>

      {/* Dịch vụ: thẻ đè lên hero */}
      <section id="dich-vu" className="bg-mesh py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle center kicker="Dịch vụ" title="Mọi điều bé cần, trong một nơi" />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-brand-500/40 bg-brand-500/40 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((sv, i) => (
              <li key={sv.title} className="reveal group relative bg-cream p-9 transition duration-500 hover:bg-ink">
                <span className="absolute right-7 top-6 font-fun text-5xl italic text-brand-200 transition group-hover:text-brand-500/50">0{i + 1}</span>
                <Icon name={sv.icon} className="h-10 w-10 text-brand-500 transition group-hover:text-sun" />
                <h3 className="mt-7 font-fun text-2xl text-ink transition group-hover:text-cream">{sv.title}</h3>
                <span className="mt-3 block h-px w-10 bg-brand-500 transition-all duration-500 group-hover:w-20" />
                <p className="mt-4 text-sm leading-7 transition group-hover:text-cream/75">{sv.text}</p>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-brand-600 transition group-hover:text-sun">
                  Đặt lịch <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Vì sao chọn chúng tôi */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-24 md:grid-cols-2">
        <div className="reveal relative aspect-[4/5] overflow-hidden rounded">
          <Image src={IMG.aboutMain} alt="Chú chó ngậm bông hoa" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <SectionTitle kicker="Về chúng tôi" title="Vì sao chọn OnOn.Pet?" />
          <p className="mt-5">
            OnOn.Pet gom grooming, spa, lưu trú và cửa hàng vào một không gian ấm áp, để bé cưng được chăm sóc trọn vẹn và bạn yên tâm trao gửi.
          </p>
          <ul className="mt-8 space-y-6">
            {WHY.map((w) => (
              <li key={w.title} className="reveal flex gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-brand-500/50 bg-cream text-brand-500"><Icon name={w.icon} className="h-7 w-7" /></span>
                <div>
                  <h4 className="font-fun text-xl text-ink">{w.title}</h4>
                  <p className="mt-1 text-sm">{w.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mesh-blue py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
          <div>
            <SectionTitle kicker="Hỏi đáp" title="Câu hỏi thường gặp" />
            <div className="mt-8 space-y-3">
              {FAQS.map(([q, a], i) => (
                <details key={q} open={i === 0} className="reveal group rounded bg-cream shadow-sm">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold text-ink">
                    {q}
                    <span aria-hidden className="text-brand-500 transition group-open:rotate-45">＋</span>
                  </summary>
                  <p className="px-5 pb-5 text-sm leading-7">{a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="reveal relative aspect-square overflow-hidden rounded">
            <Image src={IMG.aboutSmall} alt="Mèo và chó nằm cạnh nhau trên cỏ" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Phản hồi: nền ảnh */}
      <section className="relative py-24">
        <Image src={TESTIMONY_BG} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-night" />
        <div aria-hidden className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="text-center [&_h2]:text-white">
            <SectionTitle center kicker="Đánh giá" title="Khách hàng nói gì" />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="reveal rounded-2xl bg-white p-8 shadow-lg">
                <p className="text-amber-400" aria-label="5 sao">★★★★★</p>
                <p className="mt-3 text-sm leading-7">“{t.content}”</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-500 font-bold text-white">{t.name[0]}</span>
                  <span>
                    <span className="block font-bold text-ink">{t.name}</span>
                    <span className="text-xs">{t.role}</span>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Bảng giá */}
      <section id="bang-gia" className="bg-mesh py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle center kicker="Bảng giá" title="Gói dịch vụ hợp túi tiền" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {plans.map((pl) => (
              <div
                key={pl.id}
                className={`reveal rounded-2xl p-10 text-center shadow-lg ${pl.highlighted ? "bg-brand-gradient text-white md:-translate-y-3 shadow-brand-500/30" : "bg-white/90 backdrop-blur"}`}
              >
                <h3 className={`text-sm font-bold uppercase tracking-widest ${pl.highlighted ? "text-white" : ""}`}>{pl.name}</h3>
                <p className={`mt-4 text-4xl font-extrabold ${pl.highlighted ? "text-white" : "text-ink"}`}>{formatVnd(pl.price)}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {pl.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 block rounded-full px-2 py-3.5 text-xs font-bold uppercase tracking-widest transition ${
                    pl.highlighted ? "bg-white text-brand-600 hover:bg-brand-50" : "bg-brand-500 text-white hover:bg-brand-600"
                  }`}
                >
                  Bắt đầu
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery sản phẩm */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <SectionTitle center kicker="Cửa hàng" title="Sản phẩm nổi bật" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link key={p.id} href={`/products/${p.slug}`} className="reveal group relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 p-5 text-white opacity-0 transition group-hover:opacity-100">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-200">{p.category.name}</p>
                <h3 className="text-lg font-bold text-white">{p.name}</h3>
                <p className="text-sm font-semibold">{formatVnd(p.salePrice ?? p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/products" className="inline-block rounded-full bg-brand-gradient px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-brand-600">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </section>

      {/* Blog */}
      <section className="bg-mesh-blue py-24">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle center kicker="Blog" title="Tin mới nhất từ blog" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.id} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Tư vấn miễn phí: nền ảnh + form */}
      <section className="relative py-24">
        <Image src={APPOINTMENT_BG} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-night" />
        <div aria-hidden className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-azure/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
          <div className="text-white">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-500">Đặt lịch</p>
            <h2 className="mt-2 text-3xl text-white md:text-5xl">Đặt lịch cho bé</h2>
            <p className="mt-5 max-w-md text-white/85">
              Để lại thông tin, đội ngũ OnOn.Pet sẽ gọi lại xác nhận lịch grooming, spa, hotel hoặc daycare cho bé trong ngày.
            </p>
          </div>
          <AppointmentForm tone="glass" />
        </div>
      </section>
    </>
  );
}
