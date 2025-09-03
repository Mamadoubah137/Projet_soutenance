import express from "express";
import { createProperty, getMyProperties } from "../controllers/propertyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route pour ajouter une propriété, seulement accessible aux propriétaires
router.post("/add", protect, createProperty);
// Route pour obtenir les propriétés du propriétaire, seulement accessible aux propriétaires
router.get("/my-properties", protect, getMyProperties);

export default router;