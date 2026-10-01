import Image from "next/image";
import Link from "next/link";
import { formatVnd } from "@/lib/site";

type Props = {
  slug: string;
  name: string;
  image: string;
  price: number;
  salePrice: number | null;
  categoryName?: string;
};

export default function ProductCard({ slug, name, image, price, salePrice, categoryName }: Props) {
  const discount = salePrice ? Math.round((1 - salePrice / price) * 100) : 0;
  return (
    <Link href={`/products/${slug}`} className="reveal group block overflow-hidden rounded bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {discount > 0 && <span className="absolute left-0 top-3 bg-brand-500 px-3 py-1 text-xs font-bold text-white">-{discount}%</span>}
      </div>
      <div className="p-4 text-center">
        {categoryName && <p className="text-[11px] font-bold uppercase tracking-widest text-brand-500">{categoryName}</p>}
        <h3 className="mt-1 line-clamp-2 text-base font-bold group-hover:text-brand-500">{name}</h3>
        <p className="mt-2 flex items-baseline justify-center gap-2">
          <span className="font-bold text-brand-600">{formatVnd(salePrice ?? price)}</span>
          {salePrice && <span className="text-sm text-neutral-400 line-through">{formatVnd(price)}</span>}
        </p>
      </div>
    </Link>
  );
}
