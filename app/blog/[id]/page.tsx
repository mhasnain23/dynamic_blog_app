"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import CommentSection from "@/components/CommentSection";
import { useParams } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  uploadImage: string;
  createdAt: string;
}

export default function BlogPosts() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem("blogFormData");
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        const foundPost = parsedPosts.find(
          (p: BlogPost) => p.id === Number(params.id)
        );
        setPost(foundPost || null);
      }
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="text-center text-2xl font-bold py-16">Loading...</div>
    );
  }

  if (!post) {
    return <div className="text-center py-16">Post not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="aspect-video relative w-full mb-8">
        <Image
          src={post.uploadImage}
          alt={post.title}
          fill
          priority
          quality={100}
          className="object-cover rounded-lg"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-white">{post.title}</h1>
      <p className="text-gray-400 mb-2">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 mb-3 text-lg">{post.description}</p>
      </div>
      <CommentSection />
    </div>
  );
}
