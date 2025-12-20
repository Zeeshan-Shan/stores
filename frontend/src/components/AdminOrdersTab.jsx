import { useEffect, useState } from "react";
import axios from "../lib/axios";
import { RotateCcw } from "lucide-react";

const STATUSES = [
  "PLACED",
  "CONFIRMED",
  "PACKED",
  "SHIPPED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
];

const statusColor = (status) => {
  switch (status) {
    case "DELIVERED":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40";
    case "CANCELLED":
      return "bg-red-100 text-red-700 dark:bg-red-900/40";
    case "SHIPPED":
    case "OUT_FOR_DELIVERY":
      return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800";
  }
};

const AdminOrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to load orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/orders/${id}/status`, { status });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: status } : o
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  const refundOrder = async (id) => {
    try {
      await axios.post(`/orders/${id}/refund`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, refundStatus: "REQUESTED" } : o
        )
      );
    } catch {
      alert("Refund failed");
    }
  };

  if (loading) {
    return <p className="text-slate-500">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-slate-500">No orders found</p>;
  }
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <div
          key={order._id}
          className="
            p-6 rounded-2xl
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-800
            shadow-sm hover:shadow-md transition
          "
        >
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg">
                Order #{order._id.slice(-6)}
              </p>
              <span
                className={`inline-block mt-1 px-3 py-0.5 text-xs rounded-full ${statusColor(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </div>

            <p className="text-xl font-bold text-emerald-600">
              ₹{order.totalAmount}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
              {order.user?.name?.charAt(0)}
            </div>
            <div>
              <p className="font-medium">{order.user?.name}</p>
              <p className="text-xs text-slate-500">
                {order.user?.email}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-5 items-center">
            <select
              value={order.orderStatus}
              onChange={(e) =>
                updateStatus(order._id, e.target.value)
              }
              className="
                border rounded-lg px-3 py-1.5 text-sm
                bg-white dark:bg-slate-800
                border-slate-300 dark:border-slate-700
              "
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {order.paymentStatus === "PAID" &&
              order.refundStatus === "NONE" && (
                <button
                  onClick={() => refundOrder(order._id)}
                  className="
                    flex items-center gap-1 text-xs
                    text-red-600 hover:text-red-700
                    border border-red-200 dark:border-red-800
                    px-3 py-1.5 rounded-lg
                    hover:bg-red-50 dark:hover:bg-red-900/30
                    transition
                  "
                >
                  <RotateCcw size={14} />
                  Refund
                </button>
              )}

            {order.refundStatus !== "NONE" && (
              <span className="text-xs text-orange-500 font-medium">
                Refund: {order.refundStatus}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrdersTab;

