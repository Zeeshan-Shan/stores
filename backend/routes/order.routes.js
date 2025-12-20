import express from "express";
import {
	getUserOrders,
	getOrderById,
	updateOrderStatus,
    getAllOrdersAdmin,
} from "../controllers/order.controller.js";

import { refundOrder } from "../controllers/refund.controller.js";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.get("/", protectRoute, adminRoute, getAllOrdersAdmin);
router.get("/my-orders", protectRoute, getUserOrders);
router.get("/:id", protectRoute, getOrderById);

router.put(
	"/:id/status",
	protectRoute,
	adminRoute,
	updateOrderStatus
);

router.post(
	"/:id/refund",
	protectRoute,
	adminRoute,
	refundOrder
);

export default router;
