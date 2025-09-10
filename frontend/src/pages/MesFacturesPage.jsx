import { useEffect, useState } from 'react';
import { getTenantInvoices, softDeleteInvoice } from '../services/api'; 
import { FaFileInvoiceDollar, FaCheckCircle, FaHourglassHalf, FaMoneyBillWave, FaTrashAlt } from 'react-icons/fa';

export default function MesFacturesPage() {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchInvoices = async () => {
        try {
            const response = await getTenantInvoices();
            setInvoices(response.data);
        } catch (err) {
            setError("Erreur lors de la récupération des factures.");
            console.error("Erreur API:", err);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleDeleteInvoice = async (invoiceId) => {
        if (window.confirm("Êtes-vous sûr de vouloir archiver cette facture ?")) {
            try {
                await softDeleteInvoice(invoiceId);
                // Mettre à jour l'état local pour retirer la facture de la liste
                setInvoices(invoices.filter(invoice => invoice._id !== invoiceId));
            } catch (err) {
                console.error("Erreur lors de l'archivage de la facture:", err);
                alert("Erreur lors de l'archivage de la facture. Veuillez réessayer.");
            }
        }
    };

    if (loading) {
        return <div className="text-center mt-8">Chargement de vos factures...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-8">{error}</div>;
    }

    if (invoices.length === 0) {
        return <div className="text-center mt-8 text-gray-500">Vous n'avez aucune facture pour le moment.</div>;
    }

    return (
        <div className="p-18">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Factures</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-blue-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Propriété</th>
                            <th className="py-3 px-6 text-left">Appartement</th>
                            <th className="py-3 px-6 text-left">Montant</th>
                            <th className="py-3 px-6 text-left">Date d'échéance</th>
                            <th className="py-3 px-6 text-center">Statut</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-black-600 text-sm font-light">
                        {invoices.map((invoice) => (
                            <tr key={invoice._id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{invoice.property?.numeroPropriete}</td>
                                <td className="py-3 px-6 text-left">{invoice.numeroAppartement}</td>
                                <td className="py-3 px-6 text-left font-bold text-lg text-blue-600 flex items-center">
                                    <FaMoneyBillWave className="mr-2" /> {invoice.montant} GNF
                                </td>
                                <td className="py-3 px-6 text-left">{new Date(invoice.dateEcheance).toLocaleDateString()}</td>
                                <td className="py-3 px-6 text-center">
                                    {invoice.statut === 'payee' ? (
                                        <span className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs flex items-center justify-center">
                                            <FaCheckCircle className="mr-1" /> Payée
                                        </span>
                                    ) : (
                                        <span className="bg-yellow-200 text-yellow-600 py-1 px-3 rounded-full text-xs flex items-center justify-center">
                                            <FaHourglassHalf className="mr-1" /> Non payée
                                        </span>
                                    )}
                                </td>
                                <td className="py-3 px-6 text-center">
                                     {invoice.statut === 'non-payee' ? (
                                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">
                                            Payer
                                        </button>
                                    ) : (
                                        <button 
                                            onClick={() => handleDeleteInvoice(invoice._id)} 
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 flex items-center justify-center space-x-2"
                                        >
                                            <FaTrashAlt />
                                            <span>Supprimer</span>
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}