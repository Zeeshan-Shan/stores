import { useState } from "react";
import ProductSkeleton from "./ProductSkeleton";
import AdminProductFilters from "./AdminProductFilters";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { products, isLoading } = useProductStore();

	const [search, setSearch] = useState("");
	const [min, setMin] = useState("");
	const [max, setMax] = useState("");

	const filtered = products.filter((p) => {
		const matchName = p.name.toLowerCase().includes(search.toLowerCase());
		const matchMin = min ? p.price >= min : true;
		const matchMax = max ? p.price <= max : true;
		return matchName && matchMin && matchMax;
	});

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{Array.from({ length: 6 }).map((_, i) => (
					<ProductSkeleton key={i} />
				))}
			</div>
		);
	}

	return (
		<>
			<AdminProductFilters
				search={search}
				setSearch={setSearch}
				min={min}
				setMin={setMin}
				max={max}
				setMax={setMax}
			/>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{filtered.map((p) => (
					<div
						key={p._id}
						className="bg-white dark:bg-slate-900
						border border-slate-200 dark:border-slate-800
						rounded-xl p-4"
					>
						<img src={p.image} className="h-40 w-full object-cover rounded-md" />
						<h3 className="mt-3 font-semibold">{p.name}</h3>
						<p className="text-slate-500">₹{p.price}</p>
					</div>
				))}
			</div>
		</>
	);
};

export default ProductsList;

