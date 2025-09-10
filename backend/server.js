import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import des routes
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/propertyRoutes.js"; 
import tenantRoutes from "./routes/tenantRoutes.js"; 
import invoiceRoutes from "./routes/invoiceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";


const app = express();
dotenv.config();

// Middleware
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// Connexion à la base de données
connectDB();

// Routes
app.use("/api/contact", contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/tenants', tenantRoutes); 
app.use("/api/invoices", invoiceRoutes);
app.use("/api/notifications", notificationRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});