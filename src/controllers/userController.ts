import { Router } from "express";
import { compareTokenID, validateJWT } from "../middlewares/authentication";

import { getTrendingGIFs, getUserData, search, saveGIF, unsaveGIF } from "../services/userService";

const router = Router();

// routes
router.get("/user/:userID", validateJWT, compareTokenID, (req, res) => getUserData(req, res));
router.get("/trending", validateJWT, (req, res) => getTrendingGIFs(req, res));
router.get("/search", validateJWT, (req, res) => search(req, res));
router.post("/save-gif/:userID", validateJWT, compareTokenID, (req, res) => saveGIF(req, res));
router.post("/unsave-gif/:userID", validateJWT, compareTokenID, (req, res) => unsaveGIF(req, res));

// export
export default router;
