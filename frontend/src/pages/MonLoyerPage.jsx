import { useEffect, useState } from 'react';
import { getTenantRentInfo } from '../services/api';
import { FaBuilding, FaUser, FaPhone, FaEnvelope, FaMoneyBillWave } from 'react-icons/fa';

export default function MonLoyerPage() {
  const [rentInfo, setRentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRentInfo = async () => {
      try {
        const response = await getTenantRentInfo();
        setRentInfo(response.data);
      } catch (err) {
        setError("Impossible de récupérer les informations de loyer.");
        console.error("Erreur API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRentInfo();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Chargement de vos informations...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }
  
  if (!rentInfo) {
      return <div className="text-center mt-8 text-gray-500">Aucune information de loyer trouvée. Veuillez contacter votre propriétaire.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-4">Mon Loyer</h1>
      
      <div className="space-y-8">
        {/* Section Immeuble */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <FaBuilding className="text-blue-600 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-blue-600">Informations sur l'immeuble</h2>
          </div>
          <p className="text-gray-700 mb-2"><span className="font-medium">Numéro de propriété :</span> {rentInfo.immeuble.numeroPropriete}</p>
          <p className="text-gray-700 mb-2"><span className="font-medium">Description :</span> {rentInfo.immeuble.description}</p>
          <p className="text-gray-700 mb-2"><span className="font-medium">Adresse :</span> {rentInfo.immeuble.adresse}</p>
          <div className="flex items-center text-blue-400 text-lg font-bold mt-4">
            <FaMoneyBillWave className="mr-2" />
            <span>Loyer mensuel : {rentInfo.immeuble.prixLoyer} GNF</span>
          </div>
        </div>
        
        {/* Section Propriétaire */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <FaUser className="text-gray-800 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Informations sur le propriétaire</h2>
          </div>
          <p className="text-gray-700 mb-2"><span className="font-medium">Nom :</span> {rentInfo.proprietaire.prenom} {rentInfo.proprietaire.nom}</p>
          <p className="text-gray-700 mb-2 flex items-center"><FaEnvelope className="mr-2 text-gray-500" /> <span className="font-medium">Email :</span> {rentInfo.proprietaire.email}</p>
          <p className="text-gray-700 mb-2 flex items-center"><FaPhone className="mr-2 text-gray-500" /> <span className="font-medium">Téléphone :</span> {rentInfo.proprietaire.telephone}</p>
        </div>
      </div>
    </div>
  );
}