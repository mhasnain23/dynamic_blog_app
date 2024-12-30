"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface BlogPost {
  id: number;
  title: string;
  description: string;
  uploadImage: string;
  createdAt: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedPosts = localStorage.getItem("blogFormData");
      if (savedPosts) {
        const parsedPosts = JSON.parse(savedPosts);
        setPosts(Array.isArray(parsedPosts) ? parsedPosts : []);
      }
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-white">Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id} className="block">
            <Card className="h-full overflow-hidden bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="p-0">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={post.uploadImage}
                    alt={post.title}
                    fill
                    priority
                    quality={100}
                    className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-white">{post.title}</h2>
                <p className="text-white/80 mt-2">
                  {post.description.split(" ").slice(0, 40).join(" ")}..
                </p>
              </CardContent>
              <CardFooter className="flex items-center justify-between px-3">
                <p className="btn px-4 btn-primary">Read More</p>
                <p className="text-md text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
