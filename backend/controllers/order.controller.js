import Order from "../models/order.model.js";

export const getUserOrders = async (req, res) => {
	const orders = await Order.find({ user: req.user._id })
		.populate("products.product")
		.sort({ createdAt: -1 });

	res.json(orders);
};
export const getAllOrdersAdmin = async (req, res) => {
	try {
		const orders = await Order.find()
			.populate("user", "name email")
			.populate("products.product")
			.sort({ createdAt: -1 });

		res.json(orders);
	} catch (error) {
		res.status(500).json({ message: "Failed to fetch orders" });
	}
};
export const getOrderById = async (req, res) => {
	const order = await Order.findById(req.params.id)
		.populate("products.product")
		.populate("user", "name email");

	if (!order) {
		return res.status(404).json({ message: "Order not found" });
	}

	// users can only see their own orders
	if (
		order.user._id.toString() !== req.user._id.toString() &&
		req.user.role !== "admin"
	) {
		return res.status(403).json({ message: "Unauthorized" });
	}

	res.json(order);
};

export const updateOrderStatus = async (req, res) => {
	const { status } = req.body;

	const order = await Order.findById(req.params.id);
	if (!order) {
		return res.status(404).json({ message: "Order not found" });
	}

	order.orderStatus = status;
	await order.save();

	res.json({ success: true, order });
};
