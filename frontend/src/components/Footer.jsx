import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold tracking-wide">
            Electronic<span className="text-indigo-500">Items</span>
          </h2>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Your one-stop destination for electronics, gadgets, and smart
            devices at the best prices.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4 mt-6">
            <a href="#" className="hover:text-indigo-500 transition">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <Instagram size={18} />
            </a>
            <a href="#" className="hover:text-indigo-500 transition">
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link to="/" className="hover:text-indigo-500">Home</Link></li>
            <li><Link to="/category/electronics" className="hover:text-indigo-500">Shop</Link></li>
            <li><Link to="/my-orders" className="hover:text-indigo-500">My Orders</Link></li>
            <li><Link to="/cart" className="hover:text-indigo-500">Cart</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-500">Contact</Link></li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
            <li><Link to="/category/audio" className="hover:text-indigo-500">Audio</Link></li>
            <li><Link to="/category/smartphone" className="hover:text-indigo-500">Smartphones</Link></li>
            <li><Link to="/category/headphones" className="hover:text-indigo-500">Headphones</Link></li>
            <li><Link to="/category/home-appliances" className="hover:text-indigo-500">Home Appliances</Link></li>
            <li><Link to="/category/accessories" className="hover:text-indigo-500">Accessories</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex gap-2 items-start">
              <MapPin size={16} className="mt-1" />
              <span>New Delhi, India</span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex gap-2 items-center">
              <Mail size={16} />
              <span>support@electronicitems.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ElectronicItems. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
