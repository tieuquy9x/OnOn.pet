import Image from "next/image";
import Link from "next/link";

type Props = { slug: string; title: string; excerpt: string; image: string; publishedAt: Date };

export default function PostCard({ slug, title, excerpt, image, publishedAt }: Props) {
  return (
    <Link href={`/blog/${slug}`} className="reveal group block overflow-hidden rounded bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-xl">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={image} alt={title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="p-6">
        <time dateTime={publishedAt.toISOString()} className="text-xs font-bold uppercase tracking-wide text-brand-500">
          {publishedAt.toLocaleDateString("vi-VN")}
        </time>
        <h3 className="mt-2 text-lg font-bold leading-snug group-hover:text-brand-500">{title}</h3>
        <p className="mt-2 line-clamp-2 text-sm">{excerpt}</p>
      </div>
    </Link>
  );
}
