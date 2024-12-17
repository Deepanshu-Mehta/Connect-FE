import { Github, Twitter, Linkedin, Youtube } from 'lucide-react';

const socialLinks = [
  { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
  { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
  { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  { icon: <Youtube className="w-5 h-5" />, href: '#', label: 'YouTube' },
];

export default function FooterSocial() {
  return (
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          aria-label={social.label}
          className="text-gray-400 hover:text-pink-500 transition-colors"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}