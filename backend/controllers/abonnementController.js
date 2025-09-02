import Abonnement from "../models/Abonnement.js";
import Appartement from "../models/Appartement.js";
import Immeuble from "../models/Immeuble.js";

export const ajouterAbonnement = async (req, res) => {
  try {
    const { locataireNom, locataireEmail, locataireTel, numeroImmeuble, numeroAppartement } = req.body;

    // Vérifier que l'immeuble existe
    const immeuble = await Immeuble.findOne({ numeroImmeuble });
    if (!immeuble) return res.status(400).json({ error: "Immeuble introuvable." });

    // Vérifier que l'appartement existe et est libre
    const appartement = await Appartement.findOne({
      numeroAppartement,
      immeubleId: immeuble._id,
      statut: "libre",
    });

    if (!appartement) {
      return res.status(400).json({ error: "Appartement non disponible ou inexistant." });
    }

    const loyer = immeuble.loyer || 0;

    // Créer l'abonnement
    const abonnement = new Abonnement({
      locataireNom,
      locataireEmail,
      locataireTel,
      numeroImmeuble,
      numeroAppartement,
      loyer,
    });
    await abonnement.save();

    // Marquer l'appartement comme occupé
    appartement.statut = "occupé";
    appartement.locataireId = abonnement._id;
    await appartement.save();

    res.status(201).json({ message: "Abonnement créé avec succès", abonnement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
