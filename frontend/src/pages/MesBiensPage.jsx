import { useEffect, useState } from 'react';
import { getMesProprietes, removeTenant } from '../services/api';
import { FaBuilding, FaDoorOpen, FaUsers, FaTrashAlt } from 'react-icons/fa';
import { FaPhone, FaUser } from 'react-icons/fa6';
import GenererFactureModal from '../components/GenererFactureModal';

export default function MesBiensPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

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

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const handleRemoveTenant = async (numeroAppartement) => {
    const isConfirmed = window.confirm(`Êtes-vous sûr de vouloir libérer l'appartement ${numeroAppartement}?`);
    if (isConfirmed) {
      try {
        await removeTenant({ numeroAppartement });
        // Mettre à jour la liste après la suppression
        fetchProperties(); 
      } catch (err) {
        console.error("Erreur lors de la suppression du locataire:", err);
        alert("Erreur lors de la suppression du locataire.");
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Chargement de vos biens...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mes Biens</h1>
      <div className="space-y-8">
        {properties.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            Vous n'avez pas encore de biens enregistrés.
          </div>
        ) : (
          properties.map((property, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  <FaBuilding className="inline mr-2 text-blue-500" />
                  {property.description}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600">
                <div className="flex items-center"><FaDoorOpen className="mr-2" /> <span>Nombre d'étages :</span> <span className="font-medium ml-1">{property.nombreEtages}</span></div>
                <div className="flex items-center"><FaUsers className="mr-2" /> <span>Nombre d'appartements :</span> <span className="font-medium ml-1">{property.nombreAppartements}</span></div>
                <div className="flex items-center"><FaUsers className="mr-2" /> <span>Appartements occupés :</span> <span className="font-medium ml-1">{property.nombreAppartementsOccupes}</span></div>
              </div>

              <hr className="my-4" />

              <h3 className="text-lg font-semibold text-gray-800 mb-3">Liste des locataires</h3>
              {property.locataires.length === 0 ? (
                <p className="text-gray-500 text-sm">Aucun locataire n'est encore enregistré pour cette propriété.</p>
              ) : (
                <ul className="space-y-3">
                  {property.locataires.map((locataire, i) => (
                    <li key={i} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
                      <div className="flex-1 flex items-center space-x-4">
                        <div className="flex items-center">
                          <FaUser className="text-blue-500 mr-2" />
                          <span className="font-medium text-gray-700">{locataire.prenom} {locataire.nom}</span>
                        </div>
                        <div className="flex items-center">
                          <FaPhone className="text-green-500 mr-2" />
                          <span className="text-gray-600">{locataire.telephone}</span>
                        </div>
                        <div>
                        <span className="text-sm font-semibold text-gray-500">App. {locataire.numeroAppartement}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleOpenModal({
                              ...property,
                              locataires: [locataire]
                            })}
                            className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-800 text-white text-sm"
                            title="Générer une facture pour ce locataire"
                          >
                            Générer Facture
                          </button>
                        <button
                          onClick={() => handleRemoveTenant(locataire.numeroAppartement)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                          title="Libérer cet appartement"
                        >
                          <FaTrashAlt size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            
            </div>
          ))
        )}
      </div>
        {isModalOpen && (
        <GenererFactureModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          property={selectedProperty}
        />
      )}
    </div>
  );
}