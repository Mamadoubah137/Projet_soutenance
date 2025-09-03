import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  // Vérifier header Authorization
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Vérifier cookie
  if (!token && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Propriétaire non authentifié (token manquant)" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    next();
  } catch (error) {
    console.error("Erreur authMiddleware:", error.message);
    return res.status(401).json({ message: "Token invalide ou expiré" });
  }
};
