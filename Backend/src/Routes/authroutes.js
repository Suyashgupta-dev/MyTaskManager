import express from "express"
// import router from "express.Router"
import { registerUser, loginUser, getMe, updateUserProfile } from "../Controllers/authController.js"
import protect from "../Middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/me", protect, getMe)
router.put("/profile", protect, updateUserProfile)

export default router