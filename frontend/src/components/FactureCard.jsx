import React, { useState } from "react";
import { FaBolt, FaWater, FaHome } from "react-icons/fa";
import FactureModal from "./FactureModal";

export default function FactureCard({ facture, onSupprimer }) {
  const { type, montant, dateEmission, dateEcheance, statut, montantPaye = 0 } = facture;
  const [showModal, setShowModal] = useState(false);

  const typeGradient =
    type === "Électricité" ? "from-yellow-400 to-yellow-600" :
    type === "Eau" ? "from-blue-400 to-blue-600" :
    "from-indigo-400 to-indigo-600";

  const pourcentagePaye = Math.min((montantPaye / montant) * 100, 100);

  const statutGradient =
    statut === "Payée" ? "from-green-400 to-green-600" :
    statut === "En attente" ? "from-yellow-400 to-yellow-600" :
    statut === "En retard" ? "from-red-400 to-red-600" :
    "from-orange-400 to-orange-600";

  const getIcon = (type) => {
    if (type === "Électricité") return <FaBolt className="text-yellow-500 w-6 h-6" />;
    if (type === "Eau") return <FaWater className="text-blue-500 w-6 h-6" />;
    if (type === "Loyer") return <FaHome className="text-indigo-500 w-6 h-6" />;
    return null;
  };

  return (
    <>
      <div className={`bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between min-w-[250px] transform hover:scale-105 transition-all duration-300`}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            {getIcon(type)}
            <h3 className="text-lg font-bold">{type}</h3>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${statutGradient} text-white`}>
            {statut}
          </span>
        </div>

        <p className="text-gray-600 mb-2">Montant : <span className="font-semibold">{montant} GNF</span></p>
        <p className="text-gray-600 mb-2">Émis le : {dateEmission}</p>
        <p className="text-gray-600 mb-2">Échéance : {dateEcheance}</p>

        <div className="my-2">
          <div className="bg-gray-200 rounded-full h-3 w-full overflow-hidden">
            <div
              className={`h-3 rounded-full bg-gradient-to-r ${typeGradient} transition-all duration-1000`}
              style={{ width: `${pourcentagePaye}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-1">{pourcentagePaye.toFixed(0)}% payé</p>
        </div>

        <div className="mt-4 flex justify-between flex-wrap gap-2">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex-1"
          >
            Voir
          </button>

          {statut !== "Payée" && (
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition flex-1">
              Payer
            </button>
          )}

          {statut === "Payée" && (
            <button
              onClick={() => onSupprimer(facture.id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition flex-1"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>

      {/* Popup modal */}
      {showModal && <FactureModal facture={facture} onClose={() => setShowModal(false)} />}
    </>
  );
}
