// models/Notification.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  destinataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Référence au modèle User pour savoir à qui la notification est destinée
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false, // Le statut par défaut est "non lue"
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Notification", notificationSchema);