import { useEffect, useState } from 'react';
import { getHistoricalInvoices } from '../services/api'; // 💡 Importez la fonction pour l'historique
import { FaFileInvoiceDollar, FaCheckCircle, FaHourglassHalf, FaHistory } from 'react-icons/fa';

export default function HistoriqueFacturesPage() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await getHistoricalInvoices(); // 💡 Appel à la nouvelle fonction
                setInvoices(response.data);
            } catch (err) {
                setError("Erreur lors de la récupération de l'historique des factures.");
                console.error("Erreur API:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Chargement de votre historique de factures...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-8">{error}</div>;
    }

    if (invoices.length === 0) {
        return <div className="text-center mt-8 text-gray-500">Vous n'avez aucune facture archivée pour le moment.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaHistory className="mr-2" /> Historique des Factures
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-blue-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Propriété</th>
                            <th className="py-3 px-6 text-left">Appartement</th>
                            <th className="py-3 px-6 text-left">Montant</th>
                            <th className="py-3 px-6 text-left">Date d'échéance</th>
                            <th className="py-3 px-6 text-center">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="text-black-600 text-sm font-light">
                        {invoices.map((invoice) => (
                            <tr key={invoice._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{invoice.property?.numeroPropriete}</td>
                                <td className="py-3 px-6 text-left">{invoice.numeroAppartement}</td>
                                <td className="py-3 px-6 text-left font-bold text-lg text-blue-600 flex items-center">
                                    <FaFileInvoiceDollar className="mr-2" /> {invoice.montant} GNF
                                </td>
                                <td className="py-3 px-6 text-left">{new Date(invoice.dateEcheance).toLocaleDateString()}</td>
                                <td className="py-3 px-6 text-center">
                                    <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs flex items-center justify-center">
                                        <FaCheckCircle className="mr-1" /> Archivée
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}