import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductStore } from "../stores/useProductStore";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import toast from "react-hot-toast";
const ProductDetailPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { fetchProductById, selectedProduct } = useProductStore();
    const { addToCart, clearCart } = useCartStore();
	const { user } = useUserStore();
	useEffect(() => {
		fetchProductById(id);
	}, [id, fetchProductById]);

	if (!selectedProduct) {
		return <p className="text-center mt-10">Loading...</p>;
	}
	const handleAddToCart = () => {
		if (!user) {
			toast.error("Please login first");
			return;
		}
		addToCart(selectedProduct);
	};
    const handleBuyNow = async () => {
	if (!user) {
		toast.error("Please login first");
		return;
	}
	await clearCart();               
	await addToCart(selectedProduct);
	navigate("/cart?autoCheckout=true");
};
	return (
		<div className="max-w-6xl mx-auto px-4 py-10">
			<div className="grid md:grid-cols-2 gap-10 items-start">
				<div className="flex justify-center">
					<img
						src={selectedProduct.image}
						alt={selectedProduct.name}
						className="rounded-xl max-h-[420px] object-contain bg-gray-900 p-4"
					/>
				</div>
				<div>
					<h1 className="text-3xl font-bold">{selectedProduct.name}</h1>

					<p className="text-emerald-400 text-2xl font-semibold mt-2">
						₹{selectedProduct.price}
					</p>

					<p className="mt-4 text-gray-300 leading-relaxed">
						{selectedProduct.description}
					</p>
					<div className="mt-8 flex gap-4">
						<button
							onClick={handleAddToCart}
							className="px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-semibold"
						>
							Add to Cart
						</button>

						<button
							onClick={handleBuyNow}
							className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 font-semibold"
						>
							Buy Now
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;