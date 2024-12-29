import PostNewBlog from "@/components/PostBlog";

function PostPage() {
  return (
    <section className="w-full py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-4">
        {/* left container */}
        <div className="lg:w-[460px]">
          <PostNewBlog />
        </div>
        {/* right container */}
        <div></div>
      </div>
    </section>
  );
}
export default PostPage;
