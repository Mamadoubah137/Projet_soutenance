import express from "express";
import { abonnementLocataire } from "../controllers/locataireController.js";

const router = express.Router();

router.post("/abonnement", abonnementLocataire);

export default router;
