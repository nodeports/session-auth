import { Router } from "express";
import { register, login, logout } from "../controllers/auth";
import { isAuthenticated } from "../middlewares/auth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);

export default router;
