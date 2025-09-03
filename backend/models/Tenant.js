import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema({
  locataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nomComplet: { type: String, required: true },
  numeroPropriete: { type: String, required: true },
  numeroAppartement: { type: String, required: true },
  email: { type: String, required: true },
}, {
  timestamps: true,
});

export default mongoose.model("Tenant", tenantSchema);