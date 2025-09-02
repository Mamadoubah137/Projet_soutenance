import Appartement from "../models/Appartement.js";

export const abonnementLocataire = async (req, res) => {
  try {
    const { numeroAppartement, locataireId } = req.body;

    const appartement = await Appartement.findOne({ numeroAppartement });

    if (!appartement) {
      return res.status(404).json({ message: "Appartement introuvable" });
    }

    if (appartement.statut === "occupé") {
      return res.status(400).json({ message: "Appartement déjà occupé" });
    }

    appartement.locataireId = locataireId;
    appartement.statut = "occupé";
    await appartement.save();

    res.json({ message: "Locataire abonné avec succès", appartement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
