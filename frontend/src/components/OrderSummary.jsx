import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import {
	MoveRight,
	ShieldCheck,
	Lock,
	CreditCard,
} from "lucide-react";
import axios from "../lib/axios";

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();
	const navigate = useNavigate();

	const savings = subtotal - total;

	const loadRazorpayScript = () =>
		new Promise((resolve) => {
			if (window.Razorpay) return resolve(true);
			const script = document.createElement("script");
			script.src = "https://checkout.razorpay.com/v1/checkout.js";
			script.onload = () => resolve(true);
			script.onerror = () => resolve(false);
			document.body.appendChild(script);
		});

	const handleRazorpayPayment = async () => {
		try {
			const { data } = await axios.post("/payments/create-checkout-session", {
				products: cart,
				couponCode: coupon ? coupon.code : null,
			});

			const loaded = await loadRazorpayScript();
			if (!loaded) return alert("Razorpay SDK failed to load");

			const options = {
				key: data.key,
				order_id: data.orderId,
				amount: data.amount,
				currency: "INR",
				name: "Electronic Items Store",
				description: "Secure Checkout",
				handler: async (response) => {
					const verifyRes = await axios.post(
						"/payments/checkout-success",
						{
							razorpay_order_id: response.razorpay_order_id,
							razorpay_payment_id: response.razorpay_payment_id,
							razorpay_signature: response.razorpay_signature,
							products: cart,
							couponCode: coupon ? coupon.code : null,
						}
					);

					if (verifyRes.data.success) {
						navigate("/checkout-success");
					} else {
						alert("Payment verification failed");
					}
				},
				theme: { color: "#10B981" },
			};

			new window.Razorpay(options).open();
		} catch (err) {
			console.error("Razorpay error:", err);
			alert("Payment initialization failed");
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			className="
				rounded-2xl border border-slate-200 dark:border-slate-800
				bg-white dark:bg-slate-900 shadow-xl
				p-6 space-y-6
			"
		>
			<div className="flex items-center justify-between">
				<h3 className="text-xl font-semibold text-slate-900 dark:text-white">
					Order Summary
				</h3>

				{coupon && isCouponApplied && (
					<span className="
						px-3 py-1 text-xs font-medium rounded-full
						bg-emerald-100 text-emerald-700
						dark:bg-emerald-900/40 dark:text-emerald-300
					">
						Coupon: {coupon.code}
					</span>
				)}
			</div>

			{/* PRICE BREAKDOWN */}
			<div className="space-y-3 text-sm">
				<div className="flex justify-between text-slate-600 dark:text-slate-400">
					<span>Subtotal</span>
					<span>₹{subtotal.toFixed(2)}</span>
				</div>

				{savings > 0 && (
					<div className="flex justify-between text-emerald-600 font-medium">
						<span>You Save</span>
						<span>-₹{savings.toFixed(2)}</span>
					</div>
				)}

				<div className="
					border-t border-dashed border-slate-300 dark:border-slate-700
					pt-3 flex justify-between text-lg font-bold
				">
					<span>Total</span>
					<span className="text-emerald-600">
						₹{total.toFixed(2)}
					</span>
				</div>
			</div>

			{/* TRUST BADGES */}
			<div className="
				grid grid-cols-3 gap-3 text-xs text-center
				text-slate-500 dark:text-slate-400
			">
				<div className="flex flex-col items-center gap-1">
					<ShieldCheck size={18} className="text-emerald-500" />
					SSL Secure
				</div>
				<div className="flex flex-col items-center gap-1">
					<Lock size={18} className="text-indigo-500" />
					Safe Checkout
				</div>
				<div className="flex flex-col items-center gap-1">
					<CreditCard size={18} className="text-cyan-500" />
					Razorpay
				</div>
			</div>

			{/* CTA */}
			<motion.button
				whileTap={{ scale: 0.98 }}
				onClick={handleRazorpayPayment}
				className="
					w-full py-3 rounded-xl font-semibold text-white
					bg-linear-to-r from-emerald-500 to-teal-600
					hover:from-emerald-600 hover:to-teal-700
					transition shadow-lg
				"
			>
				Pay Securely
			</motion.button>
			<div className="text-center text-sm text-slate-500 dark:text-slate-400">
				or{" "}
				<Link
					to="/"
					className="inline-flex items-center gap-1
					text-emerald-600 hover:underline"
				>
					Continue Shopping <MoveRight size={14} />
				</Link>
			</div>
		</motion.div>
	);
};

export default OrderSummary;





