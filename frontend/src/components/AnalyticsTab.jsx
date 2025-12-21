import {
  motion,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AnimatedCounter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [value]);

  return (
    <motion.span className="text-3xl font-bold">
      {rounded}
    </motion.span>
  );
};

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className={`relative rounded-xl p-6 text-white shadow-lg bg-linear-to-br ${color}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <AnimatedCounter value={value} />
      </div>
      <Icon size={48} className="opacity-30" />
    </div>
  </motion.div>
);

const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  });
  const [dailySalesData, setDailySalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chartKey, setChartKey] = useState(0); 
  const fetchAnalyticsData = useCallback(
    async (showToast = false) => {
      try {
        const res = await axios.get("/analytics");

        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);

        setChartKey((k) => k + 1);

        if (showToast) {
          toast.success("Analytics updated");
        }
      } catch (err) {
        toast.error("Failed to refresh analytics");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  useEffect(() => {
    fetchAnalyticsData();

    const handleAnalyticsUpdate = () => {
      fetchAnalyticsData(true); 
    };

    window.addEventListener(
      "analytics:update",
      handleAnalyticsUpdate
    );

    return () => {
      window.removeEventListener(
        "analytics:update",
        handleAnalyticsUpdate
      );
    };
  }, [fetchAnalyticsData]);

  if (isLoading) {
    return (
      <p className="text-center text-slate-400">
        Loading analytics…
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.users}
          icon={Users}
          color="from-indigo-500 to-violet-600"
        />
        <AnalyticsCard
          title="Products"
          value={analyticsData.products}
          icon={Package}
          color="from-emerald-500 to-teal-600"
        />
        <AnalyticsCard
          title="Total Sales"
          value={analyticsData.totalSales}
          icon={ShoppingCart}
          color="from-cyan-500 to-blue-600"
        />
        <AnalyticsCard
          title="Revenue (₹)"
          value={analyticsData.totalRevenue}
          icon={DollarSign}
          color="from-orange-500 to-amber-600"
        />
      </div>

      {/* ===== LINE CHART (SMOOTH ANIMATION) ===== */}
      <motion.div
        className="
          bg-white dark:bg-slate-800
          border border-slate-200 dark:border-slate-700
          rounded-xl p-6 shadow-lg
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ResponsiveContainer width="100%" height={380}>
          <LineChart key={chartKey} data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#6366F1"
              strokeWidth={3}
              dot={false}
              isAnimationActive
              animationDuration={1000}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#10B981"
              strokeWidth={3}
              dot={false}
              isAnimationActive
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AnalyticsTab;

