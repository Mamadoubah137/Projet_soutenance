// models/Invoice.js
import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  locataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  property: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  numeroAppartement: {
    type: String, 
    required: true,
  },
  montant: {
    type: Number,
    required: true,
  },
  dateEcheance: {
    type: Date,
    required: true,
  },
  statut: {
    type: String,
    enum: ["non-payee", "payee"], 
    default: "non-payee", 
  },
  isDeleted: { // 💡 Nouveau champ pour la suppression souple
    type: Boolean,
    default: false,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.model("Invoice", invoiceSchema);