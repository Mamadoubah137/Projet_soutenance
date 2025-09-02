import Immeuble from "../models/Immeuble.js";

// =========================
// Générer un numéro unique pour immeuble
// =========================
const generateNumeroImmeuble = () => {
  const prefix = "IMB";
  const random = Math.floor(1000 + Math.random() * 9000); // ex: IMB-4582
  return `${prefix}-${random}`;
};

// =========================
// Générer les numéros des appartements
// =========================
const generateAppartements = (nombreAppartements, numeroImmeuble) => {
  let appartements = [];
  for (let i = 1; i <= nombreAppartements; i++) {
    const numeroAppartement = `${numeroImmeuble}-APT${i}`;
    appartements.push({
      numeroAppartement,
      disponible: true, // par défaut dispo
    });
  }
  return appartements;
};

// =========================
// Ajouter un immeuble
// =========================
export const ajouterImmeuble = async (req, res) => {
  try {
    const { nom, adresse, nombreAppartements } = req.body;

    // ID du propriétaire depuis le token
    const proprietaireId = req.user.id;

    if (!proprietaireId) {
      return res.status(400).json({ message: "Propriétaire non authentifié" });
    }

    // Génération numéro immeuble
    const numeroImmeuble = generateNumeroImmeuble();

    // Génération des appartements
    const appartements = generateAppartements(nombreAppartements, numeroImmeuble);

    // Création de l'immeuble
    const newImmeuble = new Immeuble({
      nom,
      adresse,
      numeroImmeuble,
      proprietaire: proprietaireId,
      appartements,
    });

    await newImmeuble.save();

    res.status(201).json({
      message: "Immeuble créé avec succès",
      immeuble: newImmeuble,
    });
  } catch (error) {
    console.error("Erreur ajout immeuble:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// =========================
// Récupérer les immeubles du propriétaire connecté
// =========================
export const getMesImmeubles = async (req, res) => {
  try {
    const proprietaireId = req.user.id;
    const immeubles = await Immeuble.find({ proprietaireId });
    res.json(immeubles);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
