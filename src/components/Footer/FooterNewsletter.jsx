import { Send } from 'lucide-react';

export default function FooterNewsletter() {
  return (
    <div className="lg:w-1/3">
      <h3 className="text-lg font-semibold text-white mb-4">Stay Connected</h3>
      <p className="text-gray-400 mb-4">
        Get the latest updates about new features and community events.
      </p>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 bg-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-violet-500 p-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>
    </div>
  );
}