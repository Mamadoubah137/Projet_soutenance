import React from "react";

export default function FacturesSummary({ factures }) {

  // Compter chaque type de facture
  const payees = factures.filter(f => f.statut === "Payée").length;
  const enAttente = factures.filter(f => f.statut === "En attente").length;
  const enRetard = factures.filter(f => f.statut === "En retard").length;
  const payeesPartiellement = factures.filter(f => f.montantPaye > 0 && f.montantPaye < f.montant).length;

  // Tableau des stats pour map
  const stats = [
    { label: "Payées", value: payees, color: "bg-green-500" },
    { label: "En attente", value: enAttente, color: "bg-yellow-500" },
    { label: "En retard", value: enRetard, color: "bg-red-500" },
    { label: "Payées partiellement", value: payeesPartiellement, color: "bg-orange-500" },
  ];

  return (
    <div className="flex flex-wrap justify-between gap-4 bg-indigo-50 p-6 rounded-xl mb-6 shadow-md">
      {stats.map((stat, index) => (
        <div key={index} className="flex-1 min-w-[120px] text-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition">
          <h4 className="text-gray-500">{stat.label}</h4>
          <p className={`text-2xl font-bold mt-2 ${stat.color} text-white rounded-full inline-block px-4 py-2`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
