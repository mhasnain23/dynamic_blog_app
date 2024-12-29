"use client";
import { Trash2Icon } from "lucide-react";
import { useState, useEffect } from "react";

type Comment = {
  id: string;
  text: string;
  author: string;
  createdAt: string;
};

// Helper functions for localStorage
const saveCommentsToLocal = (comments: Comment[]) => {
  try {
    localStorage.setItem("blogComments", JSON.stringify(comments));
  } catch (error) {
    console.error("Failed to save comments to localStorage:", error);
  }
};

const loadCommentsFromLocal = (): Comment[] => {
  try {
    const saved = localStorage.getItem("blogComments");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to load comments from localStorage:", error);
    return [];
  }
};

const CommentSection = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [author, setAuthor] = useState("");

  // Load comments on component mount
  useEffect(() => {
    const savedComments = loadCommentsFromLocal();
    setComments(savedComments);
  }, []);

  // Helper functions for form validation
  const handleBtnValid = () => {
    return newComment.trim() !== "" && author.trim() !== "";
  };

  // Handle form submission
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: author || "Anonymous",
      createdAt: new Date().toISOString(),
    };
    // Update comments state and save to localStorage
    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    saveCommentsToLocal(updatedComments);
    setNewComment("");
    setAuthor("");
  };

  const handleDeleteComment = (commentId: string) => {
    const filteredComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(filteredComments);
    saveCommentsToLocal(filteredComments);
  };

  return (
    <div className="border-t border-gray-700 pt-8">
      <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>

      <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded text-white"
        />
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded text-white"
          rows={3}
        />
        <button
          type="submit"
          disabled={!handleBtnValid()}
          className="disabled:opacity-60 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800 p-4 rounded-md relative">
            <div className="flex justify-between mb-2">
              <p className="font-bold text-white">{comment.author}</p>
              <p className="text-gray-400 text-sm">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <p className="text-gray-300">{comment.text}</p>
            <span
              className="text-gray-400 cursor-pointer absolute right-0 top-7 p-4"
              onClick={() => handleDeleteComment(comment.id)}
            >
              <Trash2Icon />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
