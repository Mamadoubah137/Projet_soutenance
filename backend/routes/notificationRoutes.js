// routes/notificationRoutes.js
import express from "express";
import { getUnreadNotificationCount, getAllNotifications } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route pour obtenir le nombre de notifications non lues
router.get("/count", protect, getUnreadNotificationCount);

// Route pour obtenir les notifications et les marquer comme lues
router.get("/", protect, getAllNotifications);

export default router;