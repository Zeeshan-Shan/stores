import { useEffect, useState } from "react";
import axios from "../lib/axios";
import toast from "react-hot-toast";
import {
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
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
const statusSelectStyle = (status) => {
  switch (status) {
    case "DELIVERED":
      return "bg-emerald-50 text-emerald-700 border-emerald-300";
    case "CANCELLED":
      return "bg-red-50 text-red-700 border-red-300";
    case "SHIPPED":
    case "OUT_FOR_DELIVERY":
      return "bg-indigo-50 text-indigo-700 border-indigo-300";
    default:
      return "bg-slate-50 text-slate-700 border-slate-300";
  }
};
const refundUI = {
  NONE: {
    label: "Request Refund",
    icon: RotateCcw,
    color:
      "border-red-200 text-red-600 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-900/30",
  },
  REQUESTED: {
    label: "Refund Requested",
    icon: Clock,
    color: "bg-orange-100 text-orange-600 dark:bg-orange-900/40",
  },
  APPROVED: {
    label: "Refunded",
    icon: CheckCircle,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40",
  },
  REJECTED: {
    label: "Refund Rejected",
    icon: XCircle,
    color: "bg-red-100 text-red-600 dark:bg-red-900/40",
  },
};
const normalizeRefundStatus = (status) => {
  if (!status) return "NONE";
  if (refundUI[status]) return status;
  return "NONE";
};


const AdminOrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/orders");
        setOrders(res.data);
        toast.success("Orders loaded");
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const updateStatus = async (id, status) => {
    try {
      setActionId(id);
      await axios.put(`/orders/${id}/status`, { status });

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, orderStatus: status } : o
        )
      );

      toast.success(`Order marked as ${status}`);
    } catch {
      toast.error("Failed to update order status");
    } finally {
      setActionId(null);
    }
  };

  const refundOrder = async (id) => {
    try {
      setActionId(id);
      await axios.post(`/orders/${id}/refund`);

      setOrders((prev) =>
        prev.map((o) =>
          o._id === id
            ? { ...o, refundStatus: "REQUESTED" }
            : o
        )
      );

      toast.success("Refund request sent");
    } catch {
      toast.error("Refund request failed");
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return <p className="text-slate-500">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-slate-500">No orders found</p>;
  }
  return (
    <div className="space-y-6">
      {orders.map((order) => {
        const refundStatus = normalizeRefundStatus(order.refundStatus);
        const RefundIcon = refundUI[refundStatus].icon;

        return (
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
                disabled={actionId === order._id}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className={`
                  px-4 py-2 text-sm font-medium
                  rounded-full border
                  cursor-pointer
                  transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-1
                  focus:ring-indigo-400
                  ${statusSelectStyle(order.orderStatus)}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              {/* REFUND */}
              {order.paymentStatus === "PAID" &&
                order.orderStatus === "DELIVERED" &&
                refundStatus === "NONE" && (
                  <button
                    disabled={actionId === order._id}
                    onClick={() => refundOrder(order._id)}
                    className={`
                      flex items-center gap-1 text-xs
                      px-3 py-1.5 rounded-lg border
                      ${refundUI.NONE.color}
                      disabled:opacity-50
                    `}
                  >
                    <RefundIcon size={14} />
                    {refundUI.NONE.label}
                  </button>
                )}

              {refundStatus !== "NONE" && (
                <span
                  className={`
                    flex items-center gap-1 text-xs
                    px-3 py-1.5 rounded-full
                    ${refundUI[refundStatus].color}
                  `}
                >
                  <RefundIcon size={14} />
                  {refundUI[refundStatus].label}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminOrdersTab;


