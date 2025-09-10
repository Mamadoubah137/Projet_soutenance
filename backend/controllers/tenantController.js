import Tenant from "../models/Tenant.js";
import Property from "../models/Property.js";
import User from "../models/User.js"; // Import du modèle User pour obtenir le téléphone


// // Ajouter un nouveau locataire
// export const createTenant = async (req, res) => {
//   try {
//     const { nomComplet, numeroPropriete, numeroAppartement, email } = req.body;

//     // Vérifier si la propriété et l'appartement existent
//     const property = await Property.findOne({ numeroPropriete });
//     if (!property) {
//       return res.status(404).json({ message: "Numéro de propriété introuvable" });
//     }

//     const appartement = property.appartements.find(app => app.numeroAppartement === numeroAppartement);
//     if (!appartement) {
//       return res.status(404).json({ message: "Numéro d'appartement introuvable pour cette propriété" });
//     }

//     const newTenant = new Tenant({
//       locataire: req.user._id, 
//       nomComplet,
//       numeroPropriete,
//       numeroAppartement,
//       email,
//     });

//     const savedTenant = await newTenant.save();
//     res.status(201).json(savedTenant);
//   } catch (err) {
//     res.status(500).json({ message: "Erreur serveur lors de l'ajout du locataire", error: err.message });
//   }
// };

// Ajouter un nouveau locataire
export const createTenant = async (req, res) => {
  try {
    const { nomComplet, numeroPropriete, numeroAppartement, email } = req.body;

    // 🐛 CORRECTION : Validation explicite des champs requis
    if (!nomComplet || !numeroPropriete || !numeroAppartement || !email) {
      return res.status(400).json({ message: "Tous les champs de locataire sont requis." });
    }

    // Le middleware `protect` attache l'utilisateur à `req.user`.
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Utilisateur non authentifié ou token invalide." });
    }

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
    console.error("Erreur createTenant:", err.message);
    res.status(500).json({ message: "Erreur serveur lors de l'ajout du locataire", error: err.message });
  }
};

// Obtenir les informations du locataire
export const getMyTenantInfo = async (req, res) => {
  try {
    const tenantInfo = await Tenant.findOne({ locataire: req.user._id });
    if (!tenantInfo) {
      return res.status(404).json({ message: "Aucune information de locataire trouvée." });
    }
    res.json(tenantInfo);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

// Libérer un appartement (supprimer l'abonnement du locataire)
export const removeTenantSubscription = async (req, res) => {
  try {
    const { numeroAppartement } = req.body;

    // Trouver le locataire à supprimer par le numéro d'appartement
    const tenantToDelete = await Tenant.findOne({ numeroAppartement });

    if (!tenantToDelete) {
        return res.status(404).json({ message: "Locataire non trouvé pour cet appartement." });
    }

    // Vérifier si l'utilisateur connecté est bien le propriétaire de la propriété
    const property = await Property.findOne({ numeroPropriete: tenantToDelete.numeroPropriete });

    if (!property || property.proprietaire.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas le propriétaire de cet immeuble." });
    }

    // Supprimer l'abonnement du locataire
    await Tenant.findByIdAndDelete(tenantToDelete._id);

    res.status(200).json({ message: "Locataire retiré de l'appartement avec succès." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur lors de la libération de l'appartement", error: err.message });
  }
};

// Nouvelle fonction: obtenir les informations de l'immeuble et du propriétaire
export const getTenantRentInfo = async (req, res) => {
  try {
    const tenant = await Tenant.findOne({ locataire: req.user._id });
    if (!tenant) {
      return res.status(404).json({ message: "Aucun abonnement trouvé pour cet utilisateur." });
    }

    const property = await Property.findOne({ numeroPropriete: tenant.numeroPropriete }).populate('proprietaire');
    if (!property) {
      return res.status(404).json({ message: "Immeuble associé introuvable." });
    }

    // Le loyer est stocké dans l'immeuble
    const loyer = property.loyer;

    const proprietaireInfo = {
      nom: property.proprietaire.nom,
      prenom: property.proprietaire.prenom,
      email: property.proprietaire.email,
      telephone: property.proprietaire.telephone
    };

    const immeubleInfo = {
      description: property.description,
      numeroPropriete: property.numeroPropriete,
      loyer: loyer,
      adresse: property.adresse
    };

    res.json({
      immeuble: immeubleInfo,
      proprietaire: proprietaireInfo
    });

  } catch (err) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des informations de loyer.", error: err.message });
  }
};