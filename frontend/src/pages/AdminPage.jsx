import {
  BarChart,
  PlusCircle,
  ShoppingBasket,
  ClipboardList,
  Bell,
} from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import AnalyticsTab from "../components/AnalyticsTab";
import CreateProductForm from "../components/CreateProductForm";
import ProductsList from "../components/ProductsList";
import AdminOrdersTab from "../components/AdminOrdersTab";
import AdminProfileMenu from "../components/AdminProfileMenu";
import { useProductStore } from "../stores/useProductStore";

const menu = [
  { id: "create", label: "Create Product", icon: PlusCircle },
  { id: "products", label: "Products", icon: ShoppingBasket },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "analytics", label: "Analytics", icon: BarChart },
];

const SIDEBAR_WIDTH = "w-72";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    /* ✅ SHARED FLEX CONTAINER */
    <div className="flex h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-white">

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          ${SIDEBAR_WIDTH}
          hidden md:flex flex-col
          sticky top-0 h-screen
          bg-white/80 dark:bg-slate-900/80
          backdrop-blur-xl
          border-r border-slate-200 dark:border-slate-800
          z-40
        `}
      >
        {/* BRAND */}
        <div className="px-6 py-8">
          <h2 className="text-2xl font-extrabold bg-linear-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your store
          </p>
        </div>

        {/* MENU */}
        <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto pb-6">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`
                  group relative flex items-center gap-3
                  px-4 py-3 rounded-xl transition-all duration-300
                  ${
                    active
                      ? "bg-linear-to-r from-indigo-500 to-cyan-500 text-white shadow-lg"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }
                `}
              >
                <Icon
                  size={20}
                  className={
                    active
                      ? "text-white"
                      : "text-slate-500 group-hover:text-indigo-500"
                  }
                />
                <span className="font-medium">{item.label}</span>

                {active && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 px-4 md:px-8 py-12 relative overflow-y-auto">

        {/* TOP RIGHT ACTIONS */}
        <div className="fixed top-6 right-6 flex items-center gap-4 z-50">
          <button
            className="relative p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
              3
            </span>
          </button>

          <AdminProfileMenu />
        </div>

        {/* PAGE TITLE */}
        <motion.h1
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {menu.find((m) => m.id === activeTab)?.label}
        </motion.h1>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              rounded-2xl p-6 md:p-8
              shadow-xl
            "
          >
            {activeTab === "create" && <CreateProductForm />}
            {activeTab === "products" && <ProductsList />}
            {activeTab === "orders" && <AdminOrdersTab />}
            {activeTab === "analytics" && <AnalyticsTab />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminPage;

