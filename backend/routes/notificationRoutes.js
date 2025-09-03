import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  genererRappelsMensuels,
  mesRappels,
  marquerRappelLu,
  statistiquesRappels
} from "../controllers/notificationController.js";

const router = express.Router();

// Routes protégées (nécessitent une authentification)
router.use(protect);

// Route système (à protéger en production avec un token spécial)
router.post("/generer-rappels", genererRappelsMensuels);

// Routes pour les locataires
router.get("/mes-rappels", mesRappels);
router.put("/rappel/:rappelId/lu", marquerRappelLu);

// Routes pour les propriétaires
router.get("/statistiques", statistiquesRappels);

export default router;