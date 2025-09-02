import React from "react";
import { FaTimes } from "react-icons/fa";

export default function FactureModal({ facture, onClose }) {
  if (!facture) return null;

  const { id, type, montant, montantPaye = 0, dateEmission, dateEcheance, statut, nomClient, adresseClient, modePaiement, notes } = facture;
  const reste = montant - montantPaye;

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black bg-opacity-50 p-4 w-100">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4">{type} - Détails</h2>

        <div className="space-y-2">
          <p><span className="font-semibold">Numéro de facture :</span> {id}</p>
          <p><span className="font-semibold">Montant total :</span> {montant} GNF</p>
          <p><span className="font-semibold">Montant payé :</span> {montantPaye} GNF</p>
          <p><span className="font-semibold">Reste à payer :</span> {reste} GNF</p>
          <p><span className="font-semibold">Émis le :</span> {dateEmission}</p>
          <p><span className="font-semibold">Échéance :</span> {dateEcheance}</p>
          <p><span className="font-semibold">Statut :</span> {statut}</p>
          <p><span className="font-semibold">Nom client :</span> {nomClient || "N/A"}</p>
          <p><span className="font-semibold">Adresse :</span> {adresseClient || "N/A"}</p>
          <p><span className="font-semibold">Mode de paiement :</span> {modePaiement || "N/A"}</p>
          <p><span className="font-semibold">Notes :</span> {notes || "Aucune"}</p>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
