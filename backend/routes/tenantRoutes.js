import express from "express";
import { createTenant, getMyTenantInfo } from "../controllers/tenantController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route pour le locataire d'ajouter ses informations
router.post("/register", protect, createTenant);
// Route pour obtenir les informations du locataire
router.get("/my-info", protect, getMyTenantInfo);

export default router;