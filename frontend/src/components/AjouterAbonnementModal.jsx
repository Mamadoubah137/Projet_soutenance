import { useState } from "react";
import { ajouterLocataire } from "../services/api"; // Mettez à jour l'import

export default function AjouterAbonnementModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nomComplet: "",
    numeroPropriete: "",
    numeroAppartement: "",
    email: "", // Ce champ est utilisé pour la validation et le lien avec le user
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await ajouterLocataire(formData);
      alert(`✅ Abonnement créé pour ${res.data.nomComplet}`);
      onClose();
    } catch (error) {
      alert("❌ Erreur : " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Ajouter un Abonnement</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nomComplet"
            placeholder="Nom complet"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email (doit correspondre à votre compte)"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="numeroPropriete"
            placeholder="Numéro de Propriété"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="numeroAppartement"
            placeholder="Numéro d'Appartement"
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
            >
              S’abonner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}