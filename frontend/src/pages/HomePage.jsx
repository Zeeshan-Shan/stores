import React, { useEffect, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import {
	Zap,
	Fan,
	AirVent,
	Cable,
	Tv,
	ChevronLeft,
	ChevronRight,
	Star,
	Clock,
} from "lucide-react";
import { Link } from "react-router-dom";

const sliderImages = [
	"/cooler.jpg.webp",
	"/fan.jpg.webp",
	"/cable.jpg.jpg",
];

const categories = [
	{ name: "Fans", icon: Fan, slug: "fan" },
	{ name: "ACs & Coolers", icon: AirVent, slug: "AC" },
	{ name: "Wires & Cables", icon: Cable, slug: "wires" },
	{ name: "Televisions", icon: Tv, slug: "tv" },
];


const reviews = [
	{ name: "Amit Kumar", text: "Excellent quality fans. Very smooth delivery." },
	{ name: "Neha Singh", text: "AC cooling is amazing. Totally worth the price." },
	{ name: "Rohit Sharma", text: "Wires quality is top-notch. Highly recommended." },
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();
	const [slide, setSlide] = useState(0);
	const [reviewIndex, setReviewIndex] = useState(0);

	
	const [timeLeft, setTimeLeft] = useState({
		hours: 6,
		minutes: 45,
		seconds: 30,
	});

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	useEffect(() => {
		const timer = setInterval(() => {
			setSlide((prev) => (prev + 1) % sliderImages.length);
		}, 4000);
		return () => clearInterval(timer);
	}, []);

	
	useEffect(() => {
		const timer = setInterval(() => {
			setReviewIndex((prev) => (prev + 1) % reviews.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	
	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft((prev) => {
				if (prev.seconds > 0) {
					return { ...prev, seconds: prev.seconds - 1 };
				}
				if (prev.minutes > 0) {
					return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
				}
				if (prev.hours > 0) {
					return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
				}
				return prev;
			});
		}, 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className="bg-linear-to-b from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950 pt-28">

		
			<section className="relative max-w-7xl mx-auto px-4">
				<div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl">
					<img
						src={sliderImages[slide]}
						className="w-full h-full object-cover"
						alt="banner"
					/>
					<div className="absolute inset-0 bg-black/30" />

					<button
						onClick={() =>
							setSlide((slide - 1 + sliderImages.length) % sliderImages.length)
						}
						className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white"
					>
						<ChevronLeft />
					</button>

					<button
						onClick={() => setSlide((slide + 1) % sliderImages.length)}
						className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 p-2 rounded-full text-white"
					>
						<ChevronRight />
					</button>
				</div>
			</section>

		
			<section className="max-w-7xl mx-auto px-4 py-14">
				<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
					Shop by Category
				</h2>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
					{categories.map((cat) => {
						const Icon = cat.icon;
						return (
							<Link
								key={cat.slug}
								to={`/category/${cat.slug}`}
								className="bg-white dark:bg-slate-800 rounded-2xl p-6
								flex flex-col items-center gap-4 shadow
								hover:shadow-xl hover:-translate-y-1 transition"
							>
								<Icon size={42} className="text-cyan-600" />
								<p className="font-semibold text-slate-900 dark:text-white">
									{cat.name}
								</p>
							</Link>
						);
					})}
				</div>
			</section>
			<section className="max-w-7xl mx-auto px-4 py-12 bg-white dark:bg-slate-800 rounded-2xl shadow-lg">
				<div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
					<h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
						<Zap className="text-amber-500" /> Deals of the Day
					</h2>

					<div className="flex items-center gap-3 text-sm bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full">
						<Clock size={16} />
						<span>
							{timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
						</span>
					</div>
				</div>

				{!isLoading && products.length > 0 && (
					<div className="relative">
						<FeaturedProducts featuredProducts={products.slice(0, 6)} />
						<span className="absolute top-4 left-4 bg-rose-500 text-white text-xs px-3 py-1 rounded-full">
							UP TO 30% OFF
						</span>
					</div>
				)}
			</section>

			
			<section className="max-w-4xl mx-auto px-4 py-16 text-center">
				<h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
					What Our Customers Say
				</h2>

				<div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
					<div className="flex justify-center gap-1 mb-4">
						{Array.from({ length: 5 }).map((_, i) => (
							<Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
						))}
					</div>

					<p className="text-slate-600 dark:text-slate-300 italic mb-4">
						“{reviews[reviewIndex].text}”
					</p>

					<p className="font-semibold text-slate-900 dark:text-white">
						— {reviews[reviewIndex].name}
					</p>
				</div>
			</section>

			
			<section className="max-w-7xl mx-auto px-4 py-14">
				<h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
					Featured Electrical Products
				</h2>

				{!isLoading && products.length > 0 && (
					<FeaturedProducts featuredProducts={products} />
				)}
			</section>
		</div>
	);
};

export default HomePage;
