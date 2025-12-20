import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader, ImageIcon } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = [
  "freeze",
  "air-conditioner",
  "fans",
  "cooler",
  "wires",
  "cables",
  "tv",
];

const CreateProductForm = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newProduct.image) {
      alert("Please upload an image");
      return;
    }

    await createProduct({
      ...newProduct,
      price: Number(newProduct.price),
    });

    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        max-w-2xl mx-auto
        bg-linear-to-br from-slate-900 via-slate-800 to-slate-900
        border border-slate-700
        rounded-2xl shadow-2xl
        p-8
      "
    >
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Create New Product
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Add a new product to your store inventory
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* PRODUCT NAME */}
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct((p) => ({ ...p, name: e.target.value }))
          }
          required
          className="
            w-full px-4 py-3 rounded-xl
            bg-slate-800 text-white
            border border-slate-700
            focus:ring-2 focus:ring-emerald-500
            outline-none
          "
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Product Description"
          rows={4}
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct((p) => ({ ...p, description: e.target.value }))
          }
          required
          className="
            w-full px-4 py-3 rounded-xl
            bg-slate-800 text-white
            border border-slate-700
            focus:ring-2 focus:ring-emerald-500
            outline-none resize-none
          "
        />

        {/* PRICE & CATEGORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price (₹)"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct((p) => ({ ...p, price: e.target.value }))
            }
            required
            className="
              w-full px-4 py-3 rounded-xl
              bg-slate-800 text-white
              border border-slate-700
              focus:ring-2 focus:ring-emerald-500
              outline-none
            "
          />

          <select
            value={newProduct.category}
            onChange={(e) =>
              setNewProduct((p) => ({ ...p, category: e.target.value }))
            }
            required
            className="
              w-full px-4 py-3 rounded-xl
              bg-slate-800 text-white
              border border-slate-700
              focus:ring-2 focus:ring-emerald-500
              outline-none
            "
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="border-2 border-dashed border-slate-600 rounded-xl p-4 text-center">
          <label className="cursor-pointer flex flex-col items-center gap-2 text-slate-400 hover:text-emerald-400 transition">
            <ImageIcon size={36} />
            <span className="text-sm">
              Click to upload product image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {newProduct.image && (
            <img
              src={newProduct.image}
              alt="Preview"
              className="mt-4 h-40 mx-auto rounded-lg object-cover shadow-md"
            />
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          type="submit"
          disabled={loading}
          className="
            w-full flex items-center justify-center gap-2
            py-3 rounded-xl font-semibold
            text-white
            bg-linear-to-r from-emerald-500 to-cyan-500
            hover:from-emerald-600 hover:to-cyan-600
            transition shadow-lg
            disabled:opacity-50
          "
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <PlusCircle size={20} />
              Create Product
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateProductForm;

