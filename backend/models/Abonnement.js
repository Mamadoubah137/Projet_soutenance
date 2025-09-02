import mongoose from "mongoose";

const abonnementSchema = new mongoose.Schema({
  locataireNom: { type: String, required: true },
  locataireEmail: { type: String, required: true },
  locataireTel: { type: String, required: true },
  numeroImmeuble: { type: String, required: true },
  numeroAppartement: { type: String, required: true },
  loyer: { type: Number, required: true },
  dateDebut: { type: Date, default: Date.now },
});

export default mongoose.model("Abonnement", abonnementSchema);
