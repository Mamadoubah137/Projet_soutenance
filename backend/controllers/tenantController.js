import Tenant from "../models/Tenant.js";
import Property from "../models/Property.js";

// Ajouter un nouveau locataire
export const createTenant = async (req, res) => {
  try {
    const { nomComplet, numeroPropriete, numeroAppartement, email } = req.body;

    // Vérifier si la propriété et l'appartement existent
    const property = await Property.findOne({ numeroPropriete });
    if (!property) {
      return res.status(404).json({ message: "Numéro de propriété introuvable" });
    }

    const appartement = property.appartements.find(app => app.numeroAppartement === numeroAppartement);
    if (!appartement) {
      return res.status(404).json({ message: "Numéro d'appartement introuvable pour cette propriété" });
    }

    const newTenant = new Tenant({
      locataire: req.user._id, // Récupère l'ID de l'utilisateur à partir du token
      nomComplet,
      numeroPropriete,
      numeroAppartement,
      email,
    });

    const savedTenant = await newTenant.save();
    res.status(201).json(savedTenant);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur lors de l'ajout du locataire", error: err.message });
  }
};

// Obtenir les informations du locataire
export const getMyTenantInfo = async (req, res) => {
  try {
    const tenantInfo = await Tenant.findOne({ locataire: req.user._id });
    if (!tenantInfo) {
      return res.status(404).json({ message: "Aucune information de locataire trouvée" });
    }
    res.json(tenantInfo);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des informations du locataire", error: err.message });
  }
};