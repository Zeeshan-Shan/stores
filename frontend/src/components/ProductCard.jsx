import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const ProductCard = ({ product, compact }) => {
	const [liked, setLiked] = useState(false);

	return (
		<motion.div
			whileHover={{ y: -4 }}
			className="relative bg-white dark:bg-slate-900 rounded-xl border shadow-sm"
		>
			<button
				onClick={(e) => {
					e.preventDefault();
					setLiked(!liked);
				}}
				className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white shadow"
			>
				<Heart
					size={16}
					className={liked ? "text-red-500 fill-red-500" : "text-slate-400"}
				/>
			</button>
			<Link to={`/product/${product._id}`}>
				<img
					src={product.image}
					className={`w-full rounded-t-xl object-cover ${
						compact ? "h-32" : "h-48"
					}`}
				/>

				<div className="p-3 space-y-1">
					<h3 className="text-sm font-medium line-clamp-2">
						{product.name}
					</h3>

					<div className="flex items-center gap-1 text-xs text-amber-500">
						<Star size={14} fill="#f59e0b" />
						{product.rating || 4.2}
					</div>

					<p className="font-semibold text-emerald-600">
						₹{product.price}
					</p>
				</div>
			</Link>
		</motion.div>
	);
};

export default ProductCard;



