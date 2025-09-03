import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Import des routes
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/auth.js";
import propertyRoutes from "./routes/propertyRoutes.js"; // Importez la route des propriétés
import tenantRoutes from "./routes/tenantRoutes.js"; // Importez la route des locataires

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
app.use('/api/properties', propertyRoutes); // Utilisez la route des propriétés
app.use('/api/tenants', tenantRoutes); // Utilisez la route des locataires

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
});