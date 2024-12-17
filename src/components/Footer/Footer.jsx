import FooterLinks from './FooterLinks';
import FooterNewsletter from './FooterNewsletter';
import FooterSocial from './FooterSocial';
import { Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row gap-12 mb-12">
          <FooterLinks />
          <FooterNewsletter />
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-8 h-8 text-pink-500" />
            <span className="text-white font-semibold text-lg">connectDev</span>
          </div>
          
          <FooterSocial />
          
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} connectDev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}