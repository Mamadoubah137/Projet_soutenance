// controllers/notificationController.js
import Notification from "../models/Notification.js";

// Obtenir le nombre de notifications non lues pour l'utilisateur connecté
export const getUnreadNotificationCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await Notification.countDocuments({ destinataire: userId, isRead: false });
    res.status(200).json({ count });
  } catch (err) {
    console.error("Erreur lors de la récupération du nombre de notifications non lues:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Obtenir toutes les notifications et les marquer comme lues
export const getAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ destinataire: userId }).sort({ dateCreation: -1 });

    // Marquer toutes les notifications non lues comme lues
    await Notification.updateMany({ destinataire: userId, isRead: false }, { isRead: true });

    res.status(200).json(notifications);
  } catch (err) {
    console.error("Erreur lors de la récupération des notifications:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};