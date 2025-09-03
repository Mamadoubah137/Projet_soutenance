import { useState } from "react";
import { ajouterPropriete } from "../services/api";
import SuccessCard from "./SuccessCard";

export default function AjouterImmeubleModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    nomProprietaire: "",
    adresse: "",
    telephone: "",
    nombreEtages: 1,
    nombreAppartements: 1,
    servicesInclus: "",
    prixLoyer: 0,
    description: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);

  if (!isOpen && !successMessage) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ajouterPropriete({
        ...formData,
        nombreEtages: Number(formData.nombreEtages),
        nombreAppartements: Number(formData.nombreAppartements),
        prixLoyer: Number(formData.prixLoyer)
      });

      const { numeroPropriete } = response.data;
      setSuccessMessage(`✅ Votre propriété a été ajoutée avec succès. Son numéro est : ${numeroPropriete}`);
      onClose();

    } catch (err) {
      alert("❌ Erreur : " + (err.response?.data?.message || err.message));
      console.error("❌ Erreur :", err.response?.data || err.message);
    }
  };

  const handleSuccessClose = () => {
    setSuccessMessage(null);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
            <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl">✖</button>
            <h2 className="text-xl font-bold mb-4">Ajouter une Propriété</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="nomProprietaire" placeholder="Nom du propriétaire" onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="text" name="adresse" placeholder="Adresse" onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="tel" name="telephone" placeholder="Téléphone" onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="number" name="nombreEtages" placeholder="Nombre d'étages" onChange={handleChange} className="w-full border p-2 rounded" min="1" required />
              <input type="number" name="nombreAppartements" placeholder="Nombre d'appartements" onChange={handleChange} className="w-full border p-2 rounded" min="1" required />
              <input type="text" name="servicesInclus" placeholder="Services inclus (ex: Eau, électricité...)" onChange={handleChange} className="w-full border p-2 rounded" required />
              <input type="number" name="prixLoyer" placeholder="Prix du loyer (GNF)" onChange={handleChange} className="w-full border p-2 rounded" min="0" required />
              <textarea name="description" placeholder="Description de la propriété" onChange={handleChange} className="w-full border p-2 rounded" rows="3" required></textarea>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">➕ Ajouter</button>
            </form>
          </div>
        </div>
      )}
      <SuccessCard message={successMessage} onClose={handleSuccessClose} />
    </>
  );
}