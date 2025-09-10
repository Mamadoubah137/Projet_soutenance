// routes/invoiceRoutes.js
import express from "express";
import { generateAndSendInvoices, getTenantInvoices, softDeleteInvoice, getHistoricalInvoices } from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, generateAndSendInvoices);
router.get("/my-invoices", protect, getTenantInvoices);
router.put("/soft-delete/:id", protect, softDeleteInvoice); // 💡 Nouvelle route
router.get("/history", protect, getHistoricalInvoices); // 💡 Nouvelle route


export default router;