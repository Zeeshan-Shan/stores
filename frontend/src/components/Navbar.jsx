import React, { useEffect, useState } from "react";
import {
  ShoppingCart,
  UserPlus,
  Lock,
  Search,
  User,
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "TVs & Appliances", slug: "tv" },
  { name: "AC", slug: "AC" },
  { name: "Coolers", slug: "coolers" },
  { name: "Fans", slug: "fan" },
  { name: "Wires & Cables", slug: "wires" },
  { name: "Cables", slug: "cables" },
];

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const isAdmin = user?.role === "admin";
  const navigate = useNavigate();

  /* 🌙 THEME STATE */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  /* APPLY THEME */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white text-black dark:bg-slate-900 dark:text-white shadow">
      
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Electronic<span className="text-indigo-500">Items</span>
        </Link>

        {/* SEARCH */}
        <div className="flex-1 max-w-xl flex bg-gray-100 dark:bg-slate-800 rounded-md overflow-hidden">
          <input
            placeholder="Search for products, brands and more"
            className="w-full px-4 py-2 text-sm bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none"
          />
          <button className="px-4 text-indigo-500 hover:text-indigo-400">
            <Search size={18} />
          </button>
        </div>

        {/* NAV */}
        <nav className="flex items-center gap-6 text-sm">

          {/* 🌙 THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-slate-800 transition"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* USER MENU */}
          {user ? (
            <div className="relative group">

              <div className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-800 transition">
                <User size={18} />
                <span className="font-medium">{user.name}</span>
                <ChevronDown size={14} />
              </div>

              <div className="absolute left-0 right-0 top-full h-3" />

              <div
                className="
                  absolute right-0 top-[calc(100%+6px)]
                  w-56
                  bg-white dark:bg-slate-800
                  border border-gray-200 dark:border-slate-700
                  rounded-xl shadow-xl
                  opacity-0 invisible translate-y-2
                  group-hover:opacity-100
                  group-hover:visible
                  group-hover:translate-y-0
                  transition-all duration-200
                "
              >
                <Link to="/profile" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-t-xl">
                  Profile
                </Link>

                <Link to="/profile?tab=orders" className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-slate-700">
                  My Orders
                </Link>

                <div className="h-px bg-gray-200 dark:bg-slate-700 my-1" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-b-xl"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="flex items-center gap-1 hover:text-indigo-500 transition"
              >
                <UserPlus size={16} /> Sign Up
              </Link>
            </>
          )}

          {/* CART */}
          {user && (
            <Link to="/cart" className="relative flex items-center gap-1 hover:text-indigo-500 transition">
              <ShoppingCart size={18} />
              Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-xs px-1.5 rounded-full text-white">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {/* ADMIN */}
          {isAdmin && (
            <Link
              to="/secret-dashboard"
              className="flex items-center gap-1 bg-indigo-500 text-white px-2 py-1 rounded"
            >
              <Lock size={14} /> Admin
            </Link>
          )}
        </nav>
      </div>

      {/* CATEGORY BAR */}
      <div className="bg-gray-100 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-8 text-sm">
          {categories.map((c) => (
            <Link
              key={c.slug}
              to={`/category/${c.slug}`}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
