import { Code2, Users, Heart, Coffee, Sparkles, GitBranch } from 'lucide-react';

const features = [
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Match by Tech Stack",
    description: "Find developers who share your programming language preferences and technical interests."
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Collaborative Projects",
    description: "Connect and collaborate on exciting projects with developers who share your passion."
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Meaningful Connections",
    description: "Build lasting friendships and professional relationships in the tech community."
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: "Virtual Coffee Chats",
    description: "Schedule casual meetups to discuss code, career, and life with your matches."
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Skill Development",
    description: "Learn and grow together through peer programming and knowledge sharing."
  },
  {
    icon: <GitBranch className="w-8 h-8" />,
    title: "Open Source",
    description: "Find contributors and maintainers for your open source projects."
  }
];

export default function Features() {
  return (
    <div className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Developers Love ConnectDev
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of developers who are finding their perfect coding companions and building amazing things together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-colors duration-300"
            >
              <div className="text-pink-500 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}