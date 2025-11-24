import React from "react";
import { useLocation } from "react-router-dom";

const CategoryPage = () => {
    const location = useLocation();
    const products = location.state?.products || [];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map(product => (
                    <div key={product._id} className="border p-4 rounded-lg shadow">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded"
                        />
                        <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>
                        <p className="text-gray-600">₹{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
