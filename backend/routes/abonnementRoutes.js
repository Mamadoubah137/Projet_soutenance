import express from "express";
import { ajouterAbonnement } from "../controllers/abonnementController.js";

const router = express.Router();

router.post("/", ajouterAbonnement);

export default router;
