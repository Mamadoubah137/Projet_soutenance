import express from "express";
import { createTenant, getMyTenantInfo, removeTenantSubscription, getTenantRentInfo } from "../controllers/tenantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route pour le locataire d'ajouter ses informations
router.post("/register", protect, createTenant);
// Route pour obtenir les informations du locataire
router.get("/my-info", protect, getMyTenantInfo);
// Route pour libérer un appartement
router.delete("/remove", protect, removeTenantSubscription);
// Nouvelle route pour les informations de loyer
router.get("/my-rent", protect, getTenantRentInfo);

export default router;