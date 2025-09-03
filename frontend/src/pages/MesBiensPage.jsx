import { useEffect, useState } from 'react';
import { getMesProprietes } from '../services/api';
import { FaBuilding, FaDoorOpen, FaUsers } from 'react-icons/fa'; // Assurez-vous d'avoir react-icons installé
import { FaPhone, FaUser } from 'react-icons/fa6'; // Icônes pour le nom et le téléphone

export default function MesBiensPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getMesProprietes();
        setProperties(response.data);
      } catch (err) {
        setError("Erreur lors de la récupération des propriétés.");
        console.error("Erreur API:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Chargement de vos biens...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes Propriétés</h1>
      <div className="space-y-6">
        {properties.length === 0 ? (
          <p className="text-center text-gray-500">Vous n'avez pas encore ajouté de propriété.</p>
        ) : (
          properties.map((property, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-600 flex items-center">
                  <FaBuilding className="mr-2" /> Numéro de la propriété : {property.numeroPropriete}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-gray-700">
                <div className="flex items-center">
                  <FaDoorOpen className="mr-2 text-gray-500" />
                  <span>Total d'appartements : <span className="font-medium">{property.nombreAppartements}</span></span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-2 text-gray-500" />
                  <span>Appartements occupés : <span className="font-medium">{property.nombreAppartementsOccupes}</span></span>
                </div>
              </div>

              <hr className="my-4" />

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Liste des locataires</h3>
              {property.locataires.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucun locataire n'est encore enregistré pour cette propriété.</p>
              ) : (
                <ul className="space-y-3">
                  {property.locataires.map((locataire, i) => (
                    <li key={i} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <FaUser className="text-blue-500 mr-2" />
                        <span className="font-medium text-gray-700">{locataire.nom}</span>
                      </div>
                      <div className="flex items-center">
                        <FaPhone className="text-green-500 mr-2" />
                        <span className="text-gray-600">{locataire.telephone}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-500">App. {locataire.numeroAppartement}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}