import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <div className="relative min-h-screen">
      {/* Hero Background */}
      <div className="absolute inset-0">
        <img
          src="https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp"
          alt="Developer collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 pt-32 px-6 max-w-7xl mx-auto text-white">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
              {" "}Dev Match
            </span>
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Connect with fellow developers, collaborate on projects, and build lasting friendships in the tech community.
          </p>
          <Link to="/signup-login" aria-label="Go to signup/login page">
          <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-opacity">
            Start Matching
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
}