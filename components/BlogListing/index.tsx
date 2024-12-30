"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlogPostT {
  id: string;
  title: string;
  description: string;
  uploadImage: string;
}

const BlogListing = () => {
  const [blogs, setBlogs] = useState<BlogPostT[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadBlogs = () => {
      try {
        const saved = localStorage.getItem("blogFormData");
        if (saved) {
          const data = JSON.parse(saved);
          setBlogs(Array.isArray(data) ? data : [data]);
        }
      } catch (error) {
        console.error("Error loading blogs:", error);
      }
    };

    loadBlogs();
  }, []);

  const handleDeleteBlog = (id: string) => {
    try {
      // Filter out the blog post with the given ID from the list
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      // Update the state with the new list
      setBlogs(updatedBlogs);

      // Save the updated list to local storage
      localStorage.setItem("blogFormData", JSON.stringify(updatedBlogs));
    } catch (error) {
      // Log any errors to the console
      console.error("Error deleting blog:", error);
    }
  };

  if (blogs.length === 0) {
    return <div className="text-center text-gray-500">No blogs found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-0 px-6">
      {blogs.map((blog) => (
        <Card
          key={blog.id}
          className="overflow-hidden bg-gray-800 border-gray-700"
        >
          <CardHeader className="p-0">
            <div className="aspect-square relative overflow-hidden cursor-pointer">
              <Image
                src={blog.uploadImage}
                alt={blog.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h2 className="text-xl font-bold text-white mb-2">{blog.title}</h2>
            <p className="text-gray-400 line-clamp-3">{blog.description}</p>
            <div className="flex justify-between items-center gap-5">
              <button
                className="btn btn-primary mt-4"
                onClick={() => router.push(`/blog/${blog.id}`)}
              >
                Preview
              </button>
              <button
                className="btn btn-primary mt-4"
                onClick={() => handleDeleteBlog(blog.id)}
              >
                <Trash2Icon className="w-6 h-6" />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BlogListing;
