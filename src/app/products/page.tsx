import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sản phẩm đồ chơi & phụ kiện thú cưng",
  description: "Danh sách đồ chơi, thức ăn và phụ kiện cho chó mèo, giá tốt, an toàn cho thú cưng.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const categories = await prisma.category.findMany({
    include: { products: { orderBy: { id: "asc" } } },
    orderBy: { id: "asc" },
  });
  return (
    <>
      <section className="bg-brand-50 py-12 text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">Sản phẩm</h1>
        <p className="mt-2 text-neutral-600">Đồ chơi và phụ kiện an toàn, được yêu thích nhất</p>
      </section>
      <div className="mx-auto max-w-6xl px-4 py-12">
        {categories.map((c) => (
          <section key={c.id} className="mb-14">
            <h2 className="text-2xl font-extrabold">{c.name}</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {c.products.map((p) => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
