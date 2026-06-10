import { Link } from "react-router-dom";
import { footerLinks } from "../utils/data";
import { Briefcase } from "lucide-react";
import { FaInstagram, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const socialLinks = [
  { id: 1, icon: FaInstagram, href: "/", label: "Instagram" },
  { id: 2, icon: FaGithub, href: "/", label: "GitHub" },
  { id: 3, icon: FaLinkedin, href: "/", label: "LinkedIn" },
  { id: 4, icon: FaFacebook, href: "/", label: "Facebook" },
];

export default function Foooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 w-full">
      <div className="max-w-screen-xl mx-auto px-6 pt-14 pb-8">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-600 rounded-md flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-xl font-bold">
                Job<span className="text-purple-400">Portal</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Find your next opportunity or hire top talent. We connect job seekers and
              companies every day.
            </p>

            {/* Newsletter */}
            <div className="flex gap-0 mt-2">
              <input
                className="flex-1 min-w-0 bg-gray-800 border border-gray-700 rounded-l-md py-2 px-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                type="email"
                placeholder="Your email"
              />
              <button
                type="button"
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white text-sm font-medium px-4 py-2 rounded-r-md whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ id, title, links }) => (
            <div key={id} className="space-y-3">
              <h3 className="text-white text-sm font-semibold uppercase tracking-widest">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to="/"
                      className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ id, icon: Icon, href, label }) => (
              <a
                key={id}
                href={href}
                aria-label={label}
                className="text-gray-500 hover:text-purple-400 transition-colors"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
