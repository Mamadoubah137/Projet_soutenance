import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// =====================
// INSCRIPTION
// =====================
export const registerUser = async (req, res) => {
  try {
    const { nom, prenom, email, telephone, adresse, role, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      nom,
      prenom,
      email,
      telephone,
      adresse,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "Inscription réussie" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// =====================
// CONNEXION
// =====================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Utilisateur introuvable" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });

    // Renvoi de l'utilisateur complet, avec le vrai _id
    res.json({
      message: "Connexion réussie",
      user: {
        _id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


// =====================
// DÉCONNEXION
// =====================
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Déconnexion réussie" });
};
