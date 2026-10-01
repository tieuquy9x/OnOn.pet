import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SITE, formatVnd } from "@/lib/site";
import ProductCard from "@/components/ProductCard";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

const getProduct = (slug: string) =>
  prisma.product.findUnique({ where: { slug }, include: { category: true } });

export async function generateStaticParams() {
  const items = await prisma.product.findMany({ select: { slug: true } });
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description.slice(0, 160),
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { images: [p.image] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = await getProduct(slug);
  if (!p) notFound();

  const related = await prisma.product.findMany({
    where: { categoryId: p.categoryId, NOT: { id: p.id } },
    take: 4,
  });
  const discount = p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.image,
    offers: {
      "@type": "Offer",
      priceCurrency: "VND",
      price: p.salePrice ?? p.price,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/products/${p.slug}`,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
        <Link href="/" className="hover:text-brand-600">Trang chủ</Link> / <Link href="/products" className="hover:text-brand-600">Sản phẩm</Link> / <span className="text-ink">{p.name}</span>
      </nav>
      <article className="mt-6 grid gap-10 md:grid-cols-2">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-brand-50 shadow-lg">
          <Image src={p.image} alt={p.name} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          {discount > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-rose-500 px-3 py-1 text-sm font-extrabold text-white">-{discount}%</span>
          )}
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-teal-700">{p.category.name}</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{p.name}</h1>
          <p className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-brand-600">{formatVnd(p.salePrice ?? p.price)}</span>
            {p.salePrice && <span className="text-lg text-neutral-400 line-through">{formatVnd(p.price)}</span>}
          </p>
          <p className="mt-6 leading-7 text-neutral-700">{p.description}</p>
          <ul className="mt-6 space-y-2 text-sm font-semibold text-neutral-700">
            <li>✅ Chất liệu an toàn cho thú cưng</li>
            <li>🚚 Giao hàng nhanh 24-48h</li>
            <li>🔄 Đổi trả trong 7 ngày</li>
          </ul>
          <Link href="/contact" className="mt-8 inline-block rounded-full bg-brand-500 px-8 py-3.5 font-bold text-white shadow-lg shadow-brand-500/30 transition hover:bg-brand-600">
            Liên hệ đặt mua
          </Link>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold">Sản phẩm liên quan</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((r) => (
              <ProductCard key={r.id} {...r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
