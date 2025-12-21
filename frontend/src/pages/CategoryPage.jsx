import { useEffect, useMemo, useState } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const categoryOptions = [
  "Accessories",
  "Audio",
  "Cameras",
  "Computer & Laptop",
  "Headphones",
  "Home Appliances",
  "Most Popular",
  "New Arrival",
  "On Sale",
  "Smart Watch",
  "Smartphone",
  "Speaker",
  "Video Games",
  "Watches",
];

const connectivityOptions = ["Bluetooth", "Wired", "Wireless"];

const CategoryPage = () => {
  const { fetchProductsByCategory, products } = useProductStore();
  const { category } = useParams();
  const navigate = useNavigate();

  // FILTER STATES
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");
  const [connectivity, setConnectivity] = useState([]);

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  // FILTER + SORT LOGIC
  const filteredProducts = useMemo(() => {
    let data = [...products];

    // Price filter
    data = data.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    // Rating filter
    if (rating > 0) {
      data = data.filter((p) => (p.rating || 0) >= rating);
    }

    // Connectivity filter
    if (connectivity.length > 0) {
      data = data.filter((p) =>
        connectivity.includes(p.connectivity)
      );
    }

    // Sorting
    if (sort === "low-high") {
      data.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-low") {
      data.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    if (sort === "latest") {
      data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    if (sort === "popularity") {
      data.sort(
        (a, b) => (b.popularity || 0) - (a.popularity || 0)
      );
    }

    return data;
  }, [products, minPrice, maxPrice, rating, sort, connectivity]);

  const toggleConnectivity = (type) => {
    setConnectivity((prev) =>
      prev.includes(type)
        ? prev.filter((c) => c !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-4 flex gap-8">

        {/* LEFT SIDEBAR */}
        <aside className="hidden md:block w-72 shrink-0">
          <div className="space-y-10 sticky top-28">

            {/* BY CATEGORIES */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                By Categories
              </h3>
             <select
			className="
				w-full border px-3 py-2
				bg-white/70 backdrop-blur-sm
				dark:bg-slate-900/70
			"
			onChange={(e) =>
				navigate(
				`/category/${e.target.value
					.toLowerCase()
					.replace(/\s+/g, "-")}`
				)
			}
			>
			<option value="">Select a category</option>
			{categoryOptions.map((cat) => (
				<option key={cat} value={cat}>
				{cat}
				</option>
			))}
			</select>

            </div>

            {/* BY PRICE */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                By Price
              </h3>

              <input
                type="range"
                min="0"
                max="50000"
                step="1000"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="w-full"
              />

              <div className="flex justify-between mt-4 text-sm">
                <div>
                  <p className="border px-3 py-2">${minPrice}</p>
                  <span className="block mt-1">Min. Price</span>
                </div>
                <div>
                  <p className="border px-3 py-2">${maxPrice}</p>
                  <span className="block mt-1">Max. Price</span>
                </div>
              </div>
            </div>

            {/* BY CONNECTIVITY */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                By Connectivity
              </h3>
              <div className="space-y-3">
                {connectivityOptions.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={connectivity.includes(type)}
                      onChange={() =>
                        toggleConnectivity(type)
                      }
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          {/* TOP BAR */}
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm">
              Showing all {filteredProducts.length} results
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm">Sort By:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border px-3 py-2
              bg-white/70 backdrop-blur-sm
              dark:bg-slate-900/70"
              >
                <option value="">Default sorting</option>
                <option value="popularity">
                  Sort by popularity
                </option>
                <option value="rating">
                  Sort by average rating
                </option>
                <option value="latest">
                  Sort by latest
                </option>
                <option value="low-high">
                  Sort by price: low to high
                </option>
                <option value="high-low">
                  Sort by price: high to low
                </option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <motion.div
            className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredProducts.length === 0 && (
              <p className="col-span-full text-center">
                No products found
              </p>
            )}

            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
