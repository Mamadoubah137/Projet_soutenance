import { useState } from "react";
import { generateInvoices } from "../services/api";
import { FaUser, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function GenererFactureModal({ isOpen, onClose, property }) {
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [dateEcheance, setDateEcheance] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState({ type: "", message: "" });

  if (!isOpen) return null;

  const handleSelectTenant = (tenantId) => {
    setSelectedTenants(prev =>
      prev.includes(tenantId)
        ? prev.filter(id => id !== tenantId)
        : [...prev, tenantId]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allTenantIds = property.locataires.map(locataire => locataire._id);
      setSelectedTenants(allTenantIds);
    } else {
      setSelectedTenants([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTenants.length === 0 || !dateEcheance) {
      setResponseMessage({ type: "error", message: "Veuillez sélectionner au moins un locataire et définir une date d'échéance." });
      return;
    }
    
    setLoading(true);
    setResponseMessage({ type: "", message: "" });

    try {
      const payload = {
        tenantIds: selectedTenants,
        dateEcheance,
        numeroPropriete: property.numeroPropriete,
      };
      await generateInvoices(payload);
      setResponseMessage({ type: "success", message: "Factures générées et envoyées !" });
    } catch (error) {
      const msg = error.response?.data?.message || "Erreur lors de l'envoi des factures.";
      setResponseMessage({ type: "error", message: msg });
    } finally {
      setLoading(false);
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
        <h2 className="text-xl font-bold mb-4">Générer des factures pour le bien #{property.numeroPropriete}</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="selectAll"
                onChange={handleSelectAll}
                checked={selectedTenants.length === property.locataires.length && property.locataires.length > 0}
                className="mr-2"
              />
              <label htmlFor="selectAll" className="font-semibold text-gray-700">Sélectionner tout</label>
            </div>
            
            <ul className="space-y-3 max-h-60 overflow-y-auto">
              {property.locataires.map((locataire) => (
                <li key={locataire._id} className="flex items-center bg-gray-100 p-3 rounded-lg">
                  <input
                    type="checkbox"
                    id={locataire._id}
                    checked={selectedTenants.includes(locataire._id)}
                    onChange={() => handleSelectTenant(locataire._id)}
                    className="mr-3"
                  />
                  <FaUser className="text-blue-500 mr-2" />
                  <label htmlFor={locataire._id} className="font-medium text-gray-700">
                    {locataire.nom} (App. {locataire.numeroAppartement})
                  </label>
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <label htmlFor="dateEcheance" className="block text-sm font-medium text-gray-700">Date d'échéance</label>
              <input
                type="date"
                id="dateEcheance"
                value={dateEcheance}
                onChange={(e) => setDateEcheance(e.target.value)}
                className="mt-1 w-full border p-2 rounded"
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white transition-colors ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`}
              disabled={loading}
            >
              {loading ? "Envoi en cours..." : "Envoyer"}
            </button>
          </div>
          
          {responseMessage.message && (
            <div className={`mt-4 flex items-center p-3 rounded-md ${responseMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {responseMessage.type === 'success' ? <FaCheckCircle className="mr-2" /> : <FaExclamationCircle className="mr-2" />}
              <span>{responseMessage.message}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}