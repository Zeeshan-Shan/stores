import express from "express";
import { createContact, getMyContacts } from "../controllers/contact.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createContact);  
router.get("/my", protectRoute, getMyContacts); 

export default router;