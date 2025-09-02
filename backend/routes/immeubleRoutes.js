import express from "express";
import { ajouterImmeuble } from "../controllers/immeubleController.js";

const router = express.Router();

router.post("/", ajouterImmeuble);

export default router;
