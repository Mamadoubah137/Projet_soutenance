import mongoose from "mongoose";

const appartementSchema = new mongoose.Schema({
  numeroAppartement: { type: String, required: true },
  disponible: { type: Boolean, default: true },
  locataireId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
});

const immeubleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  adresse: { type: String, required: true },
  numeroImmeuble: { type: String, required: true, unique: true },
  proprietaireId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  appartements: [appartementSchema],
}, { timestamps: true });

export default mongoose.model("Immeuble", immeubleSchema);
