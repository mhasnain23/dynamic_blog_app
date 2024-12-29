import Image from "next/image";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="flex-1 space-y-6 md:order-none order-2">
          <h1 className="text-5xl font-bold leading-tight text-white">
            Discover Insights Through Our Dynamic Blog
          </h1>
          <p className="text-xl text-white/50">
            Explore thought-provoking articles and stay ahead with the latest
            trends in technology and innovation.
          </p>
        </div>

        {/* Right Image */}
        <div className="md:flex-1 flex relative w-full h-[300px] md:h-[400px] md:order-none order-1">
          <Image
            src="/hero1.jpeg"
            alt="Blog Hero Image"
            fill
            className="object-cover rounded-lg shadow-xl"
            priority
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
