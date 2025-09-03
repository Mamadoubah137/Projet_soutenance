import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nomProprietaire: { type: String, required: true },
  adresse: { type: String, required: true },
  telephone: { type: String, required: true },
  nombreEtages: { type: Number, required: true },
  nombreAppartements: { type: Number, required: true },
  servicesInclus: { type: String, required: true },
  prixLoyer: { type: Number, required: true },
  description: { type: String, required: true },
  numeroPropriete: { type: String, unique: true },
  appartements: [
    {
      // La contrainte unique a bien été retirée ici
      numeroAppartement: { type: String },
    },
  ],
}, {
  timestamps: true,
});

export default mongoose.model("Property", propertySchema);