import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`/orders/${id}`).then((res) => setOrder(res.data));
  }, [id]);

  if (!order) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold mb-6">
        Order #{order._id.slice(-6)}
      </h1>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-6 space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Customer</h3>
          <p>{order.user.name}</p>
          <p className="text-sm text-slate-500">{order.user.email}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Products</h3>
          <div className="space-y-2">
            {order.products.map((p) => (
              <div
                key={p._id}
                className="flex justify-between text-sm"
              >
                <span>
                  {p.product.name} × {p.quantity}
                </span>
                <span>₹{p.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <p>
            <b>Order Status:</b> {order.orderStatus}
          </p>
          <p>
            <b>Payment:</b> {order.paymentStatus}
          </p>
        </div>

        {order.refundStatus !== "NONE" && (
          <p className="text-red-500">
            Refund Status: {order.refundStatus}
          </p>
        )}

        <div className="border-t pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
