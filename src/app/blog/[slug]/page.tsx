import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const items = await prisma.post.findMany({ select: { slug: true } });
  return items.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await prisma.post.findUnique({ where: { slug } });
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", publishedTime: p.publishedAt.toISOString(), images: [p.image] },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const p = await prisma.post.findUnique({ where: { slug } });
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/blog" className="text-sm font-bold text-brand-600 hover:underline">← Tất cả bài viết</Link>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">{p.title}</h1>
      <time dateTime={p.publishedAt.toISOString()} className="mt-2 block text-sm font-bold text-teal-700">
        {p.publishedAt.toLocaleDateString("vi-VN")}
      </time>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl shadow-lg">
        <Image src={p.image} alt={p.title} fill priority sizes="768px" className="object-cover" />
      </div>
      <div className="mt-8 space-y-5 text-lg leading-8 text-neutral-700">
        {p.content.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
