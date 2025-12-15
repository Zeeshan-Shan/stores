// import express from "express";
// const router=express.Router();
// import {login,signup,logout,refreshToken,getProfile, ADMIN} from "../controllers/auth.controller.js";
// import { protectRoute } from "../middleware/auth.middleware.js";
// router.post("/signup",signup);

// router.post("/login",login);

// router.post("/logout",logout);
// router.post("/refresh-token", refreshToken);
// router.get("/profile", protectRoute, getProfile);
// router.post("/user/admin",ADMIN)
// export default router;
import express from "express";
const router = express.Router();

import {
	login,
	signup,
	logout,
	refreshToken,
	getProfile,
	updateProfile,
	updatePassword,  // ✅ ADD THIS
	ADMIN,
} from "../controllers/auth.controller.js";

import { protectRoute } from "../middleware/auth.middleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/profile", protectRoute, getProfile);
router.put("/profile", protectRoute, updateProfile);

// ✅ ADD THIS ROUTE
router.put("/change-password", protectRoute, updatePassword);

router.post("/refresh-token", refreshToken);

// Optional admin seed
router.post("/user/admin", ADMIN);

export default router;