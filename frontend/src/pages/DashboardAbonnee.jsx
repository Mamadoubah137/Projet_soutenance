import { useState } from "react";
import { FileText, MessageCircle, Bell, Search, PersonStanding, SubscriptIcon, HistoryIcon } from "lucide-react";
import axios from "axios";
import Logout from "../components/logout";
import MesFactures from "../components/MesFactures";
import AjouterAbonnementModal from "../components/AjouterAbonnementModal";

axios.defaults.withCredentials = true;
export default function DashboardAbonne() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [active, setActive] = useState("factures");

  const menuItems = [
    { id: "abonnement", label: "Mon Loyer", icon: SubscriptIcon },
    { id: "historique", label: "Historique De Paiement", icon: HistoryIcon},
    { id: "reclamations", label: "Réclamations", icon: MessageCircle },
    { id: "factures", label: "Factures", icon: FileText },
    { id: "profil", label: "Profil", icon: PersonStanding },
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
            <h2 className="mt-3 text-lg font-semibold">Bonjour</h2>
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
       <Logout />
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-auto">
        {/* Top bar */}
        <div className="flex justify-end items-center space-x-6 mb-6">
          <Search className="w-6 h-6 text-gray-600 cursor-pointer" />
          <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
          <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
      >
        Ajouter un abonnement
      </button>
        </div>

        {/* Contenu dynamique */}
        {active === "abonnement" && (
            <h2 className="text-xl font-semibold">Les abonnement deja ajouter</h2>
          )}
          {active === "historique" && (
            <h2 className="text-xl font-semibold">Historique des factures</h2>
          )}
          {active === "reclamations" && (
            <h2 className="text-xl font-semibold">Faire une réclamation</h2>
          )}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
          {active === "factures" && (
            <MesFactures />
          )}
          
          {active === "profil" && (
            <h2 className="text-xl font-semibold">Le profil de l'utilisateur</h2>
          )}
        </div>
      </main>
      <AjouterAbonnementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
