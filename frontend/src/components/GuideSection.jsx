// src/components/GuideSection.jsx
import { User, Home, CheckCircle } from "lucide-react";

const GuideSection = () => {
  return (
    <section className="py-16 bg-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-6 text-center">
        {/* Titre */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
          Guide d’utilisation
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Découvrez comment utiliser <span className="font-semibold text-blue-600">BALLALbills</span>, 
          que vous soyez un abonné ou un propriétaire. Suivez les étapes simples ci-dessous.
        </p>

        {/* Cartes Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Abonné */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-xl transition duration-300">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800">Pour les Abonnés</h3>
            </div>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <span>Connectez-vous à votre tableau de bord personnel.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <span>Consultez vos factures et loyers (payés ou en attente).</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <span>Recevez des alertes automatiques de paiement.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <span>Choisissez votre mode de paiement directement dans l’application.</span>
              </li>
            </ul>
          </div>

          {/* Propriétaire */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-left hover:shadow-xl transition duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Home className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Pour les Propriétaires</h3>
            </div>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <span>Accédez à la liste complète de vos locataires.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <span>Vérifiez en temps réel qui a payé ou non son loyer.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <span>Recevez des messages concernant les pannes ou incidents signalés par vos locataires.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                <span>Gérez également vos propres factures depuis votre tableau de bord.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
