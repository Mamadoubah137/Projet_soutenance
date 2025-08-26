import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  adresse: { type: String, required: true },
  role: { type: String, enum: ["abonne", "proprietaire"], required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
