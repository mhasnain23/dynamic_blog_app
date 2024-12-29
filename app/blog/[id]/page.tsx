import Image from "next/image";
import { posts } from "../../data";
import CommentSection from "@/components/CommentSection";

export default async function BlogPosts({ params }: { params: any }) {
  const { id } = await params;

  const post = posts.find((p) => p.id === id);

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="relative h-[400px] mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
      <p className="text-gray-400 mb-8">{post.date}</p>
      <div className="prose prose-invert max-w-none mb-16">{post.content}</div>

      {/* Comments Section */}
      <CommentSection />
    </div>
  );
}
