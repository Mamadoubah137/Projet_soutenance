import { useState, useEffect } from "react";
import { ajouterImmeuble } from "../services/api"

export default function AjouterImmeubleModal({ isOpen, onClose, proprietaireId }) {
  const [formData, setFormData] = useState({
    proprietaireId,
    adresse: "",
    description: "",
    nombreAppartements: 1,
    loyer: 0
  });

  // Mettre à jour proprietaireId si elle arrive après le render initial
  useEffect(() => {
  if (proprietaireId) {
    setFormData(prev => ({ ...prev, proprietaireId }));
  }
}, [proprietaireId]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await ajouterImmeuble(formData); // 👉 On envoie tout le formData

    console.log("✅ Immeuble ajouté avec succès");
    onClose(); // fermer le modal après ajout
  } catch (err) {
    console.error("❌ Erreur :", err.response?.data || err.message);
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

        <h2 className="text-xl font-bold mb-4">Ajouter un Immeuble</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="nombreAppartements"
            placeholder="Nombre d'appartements"
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
          <input
            type="number"
            name="loyer"
            placeholder="Loyer (GNF)"
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            ➕ Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
