import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <div className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Find Your Dev Match?
        </h2>
        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of developers who are already connecting, collaborating, and creating together.
        </p>
        <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-4 rounded-full font-semibold text-lg text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2">
          Get Started Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}