import { Router } from "express";
import { validateJWT } from "../middlewares/authentication";

import { login, register, validateSession } from "../services/authService";

const router = Router();

// routes
router.post("/register", (req, res) => register(req, res));
router.post("/login", (req, res) => login(req, res));
router.get("/validate-session", validateJWT, (req, res) => validateSession(req, res));

// export
export default router;
