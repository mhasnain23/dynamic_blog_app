import Image from "next/image";
import Link from "next/link";
import { posts } from "../data/index";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function BlogPage() {
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
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    quality={100}
                    className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-xl font-bold text-white line-clamp-2">
                  {post.title}
                </h2>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <p className="text-gray-400">{post.date}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
