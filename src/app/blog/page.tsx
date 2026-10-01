import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Tin tức & kinh nghiệm chăm sóc thú cưng",
  description: "Bài viết hữu ích về chăm sóc, huấn luyện và chọn đồ chơi cho chó mèo.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
  return (
    <>
      <section className="bg-brand-50 py-12 text-center">
        <h1 className="text-4xl font-extrabold md:text-5xl">Tin tức</h1>
        <p className="mt-2 text-neutral-600">Kinh nghiệm chăm sóc và nuôi dạy thú cưng</p>
      </section>
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 md:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.id} {...p} />
        ))}
      </div>
    </>
  );
}
