import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import ProductSkeleton from "./ProductSkeleton";
import AdminProductFilters from "./AdminProductFilters";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
  const { products, isLoading, deleteProduct } = useProductStore();
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const filtered = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchMin = min ? p.price >= Number(min) : true;
    const matchMax = max ? p.price <= Number(max) : true;
    return matchName && matchMin && matchMax;
  });

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-4 w-72">
        <p className="font-semibold mb-3">Delete this product?</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 text-sm rounded-md border"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                setDeletingId(id);
                await deleteProduct(id);
                toast.success("Product deleted successfully");
              } catch {
                toast.error("Failed to delete product");
              } finally {
                setDeletingId(null);
              }
            }}
            className="px-3 py-1 text-sm rounded-md bg-red-600 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

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
            className="
              bg-white dark:bg-slate-900
              border border-slate-200 dark:border-slate-800
              rounded-xl p-4
            "
          >
            <img
              src={p.image}
              className="h-40 w-full object-cover rounded-md"
            />

            {/* TITLE + DELETE BUTTON */}
            <div className="flex items-center justify-between mt-3">
              <h3 className="font-semibold text-lg">{p.name}</h3>

              <button
                disabled={deletingId === p._id}
                onClick={() => handleDelete(p._id)}
                className="
                  p-2 rounded-full
                  bg-red-50 text-red-600
                  hover:bg-red-100
                  disabled:opacity-50
                "
                title="Delete product"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <p className="text-slate-500 mt-1">₹{p.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsList;
