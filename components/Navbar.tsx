"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="max-w-7xl mx-auto">
      <div className="navbar md:px-0 px-5 bg-base-100 rounded-md">
        <div className="flex-1">
          <Link href="/" className="btn md:px-0 px-5 btn-ghost text-xl">
            Blogiee
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal md:px-0 px-5 flex items-center">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/blog"}>Blog</Link>
            </li>
            <li>
              <button
                className="btn btn-outline p-4"
                onClick={() => router.push("/post")}
              >
                Post a Blog
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
