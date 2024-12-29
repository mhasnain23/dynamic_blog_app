"use client";

import { ListCollapse, Loader2Icon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface BlogPostT {
  title: string;
  description: string;
  uploadImage: string;
}
// Helper functions at the top
const saveToLocalStorage = (formData: BlogPostT) => {
  try {
    localStorage.setItem("blogFormData", JSON.stringify(formData));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
    throw new Error("Failed to save data");
  }
};

const loadFromLocalStorage = (): BlogPostT => {
  try {
    const saved = localStorage.getItem("blogFormData");
    return saved
      ? JSON.parse(saved)
      : {
          title: "",
          description: "",
          uploadImage: "",
        };
  } catch (error) {
    console.error("Error loading from localStorage:", error);
    return {
      title: "",
      description: "",
      uploadImage: "",
    };
  }
};

const PostNewBlog = () => {
  const [blogFormData, setBlogFormData] = useState<BlogPostT>({
    title: "",
    description: "",
    uploadImage: "",
  });
  const [loading, setLoading] = useState(false);

  // Load saved data on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    setBlogFormData(savedData);
  }, []);

  const handleBtnDisabled = () => {
    return (
      blogFormData.title.trim() &&
      blogFormData.description.trim() &&
      blogFormData.uploadImage.trim()
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (
        blogFormData.title.trim() === "" ||
        blogFormData.description.trim() === "" ||
        blogFormData.uploadImage.trim() === ""
      ) {
        throw new Error("All fields are required");
      }

      saveToLocalStorage(blogFormData);

      // Reset form after successful save
      setBlogFormData({
        title: "",
        description: "",
        uploadImage: "",
      });

      alert("Blog post saved successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error instanceof Error ? error.message : "Failed to save blog post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-start justify-center gap-5 max-w-xl mx-auto px-6 py-5"
    >
      <input
        type="text"
        placeholder="Blog title"
        value={blogFormData.title}
        name="title"
        onChange={(e) =>
          setBlogFormData({
            ...blogFormData,
            [e.target.name]: e.target.value,
          })
        }
        className="w-full px-8 py-2 rounded-lg bg-gray-300 text-black/80 font-bold placeholder:text-black/50 placeholder:text-sm placeholder:font-semibold outline-none"
      />
      <textarea
        placeholder="Blog description"
        value={blogFormData.description}
        name="description"
        onChange={(e) =>
          setBlogFormData({ ...blogFormData, [e.target.name]: e.target.value })
        }
        className="w-full px-8 py-2 rounded-lg bg-gray-300 text-black/80 font-bold placeholder:text-black/50 placeholder:text-sm placeholder:font-semibold outline-none"
      />
      <input
        type="text"
        placeholder="blog image link"
        value={blogFormData.uploadImage}
        name="uploadImage"
        onChange={(e) =>
          setBlogFormData({ ...blogFormData, [e.target.name]: e.target.value })
        }
        className="w-full px-8 py-2 rounded-lg bg-gray-300 text-black/80 font-bold placeholder:text-black/50 placeholder:text-sm placeholder:font-semibold outline-none"
      />
      <button
        type="submit"
        disabled={!handleBtnDisabled()}
        className="btn text-black/80 btn-primary px-2 disabled:text-white/50 disabled:bg-[#313942]"
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin" />
          </>
        ) : (
          "Post New Blog"
        )}
      </button>
    </form>
  );
};

export default PostNewBlog;
