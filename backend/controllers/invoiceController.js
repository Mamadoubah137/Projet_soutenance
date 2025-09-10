// controllers/invoiceController.js
import Invoice from "../models/Invoice.js";
import Tenant from "../models/Tenant.js";
import Property from "../models/Property.js";
import User from "../models/User.js";
import Notification from "../models/Notification.js"; 

// Générer des factures pour un ou plusieurs locataires
export const generateAndSendInvoices = async (req, res) => {
  try {
    const { tenantIds, dateEcheance, numeroPropriete } = req.body;
    const proprietaireId = req.user._id;

    if (!tenantIds || tenantIds.length === 0 || !dateEcheance || !numeroPropriete) {
      return res.status(400).json({ message: "Les informations requises sont manquantes." });
    }

    const invoicesToCreate = [];
    const property = await Property.findOne({ numeroPropriete, proprietaire: proprietaireId });

    if (!property) {
      return res.status(404).json({ message: "Propriété non trouvée ou vous n'êtes pas le propriétaire." });
    }

    if (isNaN(property.prixLoyer)) {
        return res.status(400).json({ message: "Le loyer de la propriété est manquant ou invalide." });
    }

    const tenants = await Tenant.find({
      locataire: { $in: tenantIds },
      numeroPropriete,
    });

    if (tenants.length === 0) {
        return res.status(404).json({ message: "Aucun locataire trouvé pour les identifiants fournis." });
    }

//     for (const tenant of tenants) {
//       invoicesToCreate.push({
//         proprietaire: proprietaireId,
//         locataire: tenant.locataire,
//         property: property._id, // NOUVEAU : l'ID de la propriété
//         numeroAppartement: tenant.numeroAppartement,
//         montant: property.prixLoyer,
//         dateEcheance: new Date(dateEcheance),
//       });
//     }

//     await Invoice.insertMany(invoicesToCreate);
//     res.status(201).json({ message: "Factures générées et envoyées avec succès." });

//   } catch (err) {
//     console.error("Erreur de serveur lors de la génération des factures:", err);
//     res.status(500).json({ message: "Erreur serveur lors de la génération des factures", error: err.message });
//   }
// };
 // 💡 MODIFICATION : Créez une facture et une notification pour chaque locataire
    const notificationsToCreate = [];
    // for (const tenant of tenants) {
    //   invoicesToCreate.push({
    //     proprietaire: proprietaireId,
    //     locataire: tenant.locataire,
    //     numeroPropriete: tenant.numeroPropriete,
    //     numeroAppartement: tenant.numeroAppartement,
    //     montant: property.prixLoyer,
    //     dateEcheance: new Date(dateEcheance),
    //   });

    for (const tenant of tenants) {
       invoicesToCreate.push({
         proprietaire: proprietaireId,
         locataire: tenant.locataire,
         property: property._id, // NOUVEAU : l'ID de la propriété
         numeroAppartement: tenant.numeroAppartement,
         montant: property.prixLoyer,
         dateEcheance: new Date(dateEcheance),
       });


      notificationsToCreate.push({
        destinataire: tenant.locataire,
        message: `Vous avez une nouvelle facture pour la propriété ${property.adresse}.`,
      });
    }

    await Invoice.insertMany(invoicesToCreate);
    await Notification.insertMany(notificationsToCreate); // 💡 ENREGISTREMENT DES NOTIFICATIONS

    res.status(201).json({ message: "Factures et notifications générées et envoyées avec succès." });

  } catch (err) {
    console.error("Erreur de serveur lors de la génération des factures:", err);
    res.status(500).json({ message: "Erreur serveur lors de la génération des factures", error: err.message });
  }
};
// Récupérer les factures actives d'un locataire (non-supprimées)
export const getTenantInvoices = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoices = await Invoice.find({ locataire: userId, isDeleted: false }) // 💡 Filtre pour les factures non-supprimées
            .populate({
                path: 'proprietaire',
                model: User,
                select: 'nom prenom'
            })
            .populate({
                path: 'property',
                model: Property,
                select: 'adresse numeroPropriete'
            });

        res.status(200).json(invoices);
    } catch (err) {
        console.error("Erreur de serveur lors de la récupération des factures:", err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération des factures", error: err.message });
    }
};

// Récupérer les factures archivées d'un locataire (l'historique)
export const getHistoricalInvoices = async (req, res) => {
    try {
        const userId = req.user._id;
        const invoices = await Invoice.find({ locataire: userId, isDeleted: true }) // 💡 Filtre pour les factures supprimées
            .populate({
                path: 'proprietaire',
                model: User,
                select: 'nom prenom'
            })
            .populate({
                path: 'property',
                model: Property,
                select: 'adresse numeroPropriete'
            });

        res.status(200).json(invoices);
    } catch (err) {
        console.error("Erreur de serveur lors de la récupération de l'historique des factures:", err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération de l'historique des factures", error: err.message });
    }
};

// Marquer une facture comme supprimée (soft delete)
export const softDeleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

        if (!invoice) {
            return res.status(404).json({ message: "Facture introuvable." });
        }
        
        res.status(200).json({ message: "Facture archivée avec succès." });
    } catch (err) {
        console.error("Erreur serveur lors de la suppression de la facture:", err);
        res.status(500).json({ message: "Erreur serveur lors de la suppression de la facture", error: err.message });
    }
};