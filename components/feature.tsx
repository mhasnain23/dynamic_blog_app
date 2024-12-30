import { BookOpen, PenSquare, MessageCircle } from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-blue-500" />,
      title: "Read Amazing Blogs",
      description:
        "Discover a wide range of interesting blog posts created by our community of writers.",
    },
    {
      icon: <PenSquare className="w-10 h-10 text-green-500" />,
      title: "Create Your Own Blog",
      description:
        "Share your thoughts and stories with our easy-to-use blog creation tools.",
    },
    {
      icon: <MessageCircle className="w-10 h-10 text-purple-500" />,
      title: "Engage with Comments",
      description:
        "Interact with other readers through our dynamic commenting system.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
