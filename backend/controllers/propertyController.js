import Property from "../models/Property.js";
import Tenant from "../models/Tenant.js";
import User from "../models/User.js"; // Import du modèle User pour obtenir le téléphone

// Fonction pour générer un numéro de propriété
const generatePropertyNumber = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 3; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 6; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
};

// Ajouter une nouvelle propriété
export const createProperty = async (req, res) => {
  try {
    const { nomProprietaire, adresse, telephone, nombreEtages, nombreAppartements, servicesInclus, prixLoyer, description } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Utilisateur non authentifié ou token invalide." });
    }

    const numeroPropriete = generatePropertyNumber();
    const appartements = [];
    for (let i = 1; i <= nombreAppartements; i++) {
      const numeroAppartement = `AP${i.toString().padStart(2, '0')}`;
      appartements.push({ numeroAppartement });
    }

    const newProperty = new Property({
      proprietaire: req.user._id,
      nomProprietaire,
      adresse,
      telephone,
      nombreEtages,
      nombreAppartements,
      servicesInclus,
      prixLoyer,
      description,
      numeroPropriete,
      appartements,
    });

    const savedProperty = await newProperty.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur lors de la création de la propriété", error: err.message });
  }
};

// Obtenir toutes les propriétés d'un propriétaire avec les informations des locataires
export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ proprietaire: req.user._id });

    // Boucle pour chaque propriété pour y ajouter les données des locataires
    const propertiesWithTenants = await Promise.all(
      properties.map(async (property) => {
        const tenants = await Tenant.find({ numeroPropriete: property.numeroPropriete }).populate({
          path: "locataire", // "locataire" est le champ dans le modèle Tenant
          model: User, // Le modèle à utiliser est User
          select: "nom prenom telephone", // Champs à récupérer de l'utilisateur
        });

        // 🐛 CORRECTION : Filtrer pour ne garder que les locataires qui ont un utilisateur associé
        const validTenants = tenants.filter(tenant => tenant.locataire);
        
        // Formater les données pour les envoyer au frontend
        return {
          ...property.toObject(),
          nombreAppartementsOccupes: validTenants.length, // Utilisez le tableau filtré
          locataires: validTenants.map((tenant) => ({
            _id: tenant.locataire._id,
            nom: tenant.locataire.prenom + ' ' + tenant.locataire.nom,
            telephone: tenant.locataire.telephone,
            numeroAppartement: tenant.numeroAppartement,
            facture: "Générer",
          })),
        };
      })
    );

    res.json(propertiesWithTenants);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur lors de la récupération des propriétés", error: err.message });
  }
};