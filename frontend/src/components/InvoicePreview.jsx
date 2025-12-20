import { FileText } from "lucide-react";

const InvoicePreview = ({ order }) => {
	return (
		<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6">
			<div className="flex items-center gap-2 mb-4">
				<FileText className="text-indigo-500" />
				<h3 className="font-semibold text-slate-900 dark:text-white">
					Invoice Preview
				</h3>
			</div>

			<div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
				<p><strong>Order ID:</strong> {order?.id || "AUTO-GENERATED"}</p>
				<p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
				<p><strong>Total:</strong> ₹{order?.total || "—"}</p>
				<p><strong>Status:</strong> Processing</p>
			</div>

			<button
				className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
			>
				Download Invoice (PDF)
			</button>
		</div>
	);
};

export default InvoicePreview;
