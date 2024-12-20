import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <div className="bg-gray-900 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Use Link instead of button for navigation */}
        <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Dev Match?
          </h2>
        <Link to="/signup-login" aria-label="Go to signup/login page">
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already connecting, collaborating, and creating together.
          </p>
        </Link>
        <Link to="/signup-login">
          <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-4 rounded-full font-semibold text-lg text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2 focus:outline-none">
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
