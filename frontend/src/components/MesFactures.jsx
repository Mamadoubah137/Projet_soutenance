import React, { useState } from "react";
import FactureCard from "./FactureCard";
import FacturesSummary from "./FacturesSummary";

export default function MesFactures() {
  const [factures, setFactures] = useState([
    { id: 1, type: "Électricité", montant: 120000, montantPaye: 60000, dateEmission: "2025-08-01", dateEcheance: "2025-08-10", statut: "En attente" },
    { id: 2, type: "Eau", montant: 80000, montantPaye: 80000, dateEmission: "2025-08-05", dateEcheance: "2025-08-15", statut: "Payée" },
    { id: 3, type: "Loyer", montant: 250000, montantPaye: 0, dateEmission: "2025-08-01", dateEcheance: "2025-08-31", statut: "En retard" },
    { id: 4, type: "Électricité", montant: 100000, montantPaye: 50000, dateEmission: "2025-07-01", dateEcheance: "2025-07-10", statut: "En attente" },
    { id: 5, type: "Eau", montant: 90000, montantPaye: 90000, dateEmission: "2025-07-05", dateEcheance: "2025-07-15", statut: "Payée" },
  ]);

  const [filtre, setFiltre] = useState("Toutes");

  const handleSupprimer = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette facture ?")) {
      setFactures(factures.filter(f => f.id !== id));
    }
  };

  // Filtrer les factures selon le type sélectionné
  const facturesFiltrees = filtre === "Toutes"
    ? factures
    : factures.filter(f => f.type === filtre);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Mes Factures</h2>

      {/* Résumé par statut */}
      <FacturesSummary factures={facturesFiltrees} />

      {/* Filtre par type */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["Toutes", "Électricité", "Eau", "Loyer"].map(type => (
          <button
            key={type}
            onClick={() => setFiltre(type)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filtre === type ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Liste des factures responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {facturesFiltrees.map(f => (
          <FactureCard key={f.id} facture={f} onSupprimer={handleSupprimer} />
        ))}
      </div>
    </div>
  );
}
