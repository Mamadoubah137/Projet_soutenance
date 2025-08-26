import { useState } from "react";
import { Home, FileText, CreditCard, MessageCircle, LogOut, Building, Bell, Search } from "lucide-react";

export default function DashboardProprietaire() {
  const [active, setActive] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Tableau de bord", icon: Home },
    { id: "biens", label: "Mes Biens", icon: Building },
    { id: "factures", label: "Factures générées", icon: FileText },
    { id: "paiements", label: "Suivi paiements", icon: CreditCard },
    { id: "reclamations", label: "Réclamations", icon: MessageCircle },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-600 text-white flex flex-col justify-between p-5">
        <div>
          {/* Profil utilisateur */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://via.placeholder.com/80"
              alt="User"
              className="w-20 h-20 rounded-full border-2 border-white"
            />
            <h2 className="mt-3 text-lg font-semibold">Bonjour, Karim</h2>
          </div>

          {/* Menu */}
          <nav className="space-y-3">
            {menuItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActive(id)}
                className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
                  active === id ? "bg-white text-blue-600" : "hover:bg-blue-500"
                }`}
              >
                <Icon className="mr-3" size={20} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Déconnexion */}
        <button className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-500">
          <LogOut className="mr-2" size={20} /> Déconnexion
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {/* Top bar */}
        <div className="flex justify-end items-center space-x-6 mb-6">
          <Search className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full border"
          />
        </div>

        {/* Contenu dynamique */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          {active === "dashboard" && (
            <h2 className="text-xl font-semibold">Vue d’ensemble (Graphiques & Statistiques)</h2>
          )}
          {active === "biens" && (
            <h2 className="text-xl font-semibold">Gestion des biens immobiliers</h2>
          )}
          {active === "factures" && (
            <h2 className="text-xl font-semibold">Factures générées pour les abonnés</h2>
          )}
          {active === "paiements" && (
            <h2 className="text-xl font-semibold">Suivi des paiements des abonnés</h2>
          )}
          {active === "reclamations" && (
            <h2 className="text-xl font-semibold">Réclamations reçues</h2>
          )}
        </div>
      </main>
    </div>
  );
}
