import mongoose from "mongoose";

const appartementSchema = new mongoose.Schema({
  numeroAppartement: { type: String, unique: true },
  immeubleId: { type: mongoose.Schema.Types.ObjectId, ref: "Immeuble" },
  loyer: Number,
  locataireId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  statut: { type: String, enum: ["libre", "occupé"], default: "libre" }
});

export default mongoose.model("Appartement", appartementSchema);
