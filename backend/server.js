import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/auth.js";
import immeubleRoutes from "./routes/immeubleRoutes.js";
import locataireRoutes from "./routes/locataireRoutes.js";
import abonnementRoutes from "./routes/abonnementRoutes.js";

const app = express();
dotenv.config();

// Middleware
app.use(cors(
    { origin: "http://localhost:5173", credentials: true }
));
app.use(express.json());
app.use(cookieParser());
connectDB();



// Routes
app.use("/api/contact", contactRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/immeubles", immeubleRoutes);
app.use("/api/locataire", locataireRoutes);
app.use("/api/abonnements", abonnementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
