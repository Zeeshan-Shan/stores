import React from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
			className="
				group rounded-2xl border border-slate-700
				bg-slate-900/80 backdrop-blur-md
				p-4 md:p-6 shadow-md hover:shadow-xl
				transition
			"
		>
			<div className="flex flex-col md:flex-row gap-6">

				<div className="shrink-0">
					<img
						src={item.image}
						alt={item.name}
						className="
							h-24 w-24 md:h-32 md:w-32
							rounded-xl object-cover
							border border-slate-700
							group-hover:scale-105 transition
						"
					/>
				</div>
				<div className="flex-1 space-y-2">
					<h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition">
						{item.name}
					</h3>

					<p className="text-sm text-slate-400 line-clamp-2">
						{item.description}
					</p>

					<p className="text-lg font-bold text-emerald-400">
						₹{item.price}
					</p>
				</div>

				<div className="flex md:flex-col items-center justify-between gap-4">

					<div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-1 border border-slate-700">
						<button
							onClick={() =>
								updateQuantity(item._id, item.quantity - 1)
							}
							className="
								h-8 w-8 flex items-center justify-center
								rounded-lg bg-slate-700 hover:bg-slate-600
								text-white transition
							"
						>
							<Minus size={14} />
						</button>

						<span className="min-w-6 text-center font-medium text-white">
							{item.quantity}
						</span>

						<button
							onClick={() =>
								updateQuantity(item._id, item.quantity + 1)
							}
							className="
								h-8 w-8 flex items-center justify-center
								rounded-lg bg-slate-700 hover:bg-slate-600
								text-white transition
							"
						>
							<Plus size={14} />
						</button>
					</div>

					<button
						onClick={() => removeFromCart(item._id)}
						className="
							flex items-center gap-1 text-sm
							text-red-400 hover:text-red-300
							hover:underline transition
						"
					>
						<Trash size={16} />
						Remove
					</button>
				</div>
			</div>
		</motion.div>
	);
};

export default CartItem;
