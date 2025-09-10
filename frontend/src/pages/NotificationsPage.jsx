// pages/NotificationsPage.jsx
import { useEffect, useState } from 'react';
import { getNotifications } from '../services/api';
import { FaBell, FaCheckCircle } from 'react-icons/fa';

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Cet appel récupère les notifications et les marque comme lues côté serveur
                const response = await getNotifications(); 
                setNotifications(response.data);
            } catch (err) {
                setError("Erreur lors de la récupération de vos notifications.");
                console.error("Erreur API:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    if (loading) {
        return <div className="text-center mt-8">Chargement de vos notifications...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500 mt-8">{error}</div>;
    }

    if (notifications.length === 0) {
        return <div className="text-center mt-8 text-gray-500">Vous n'avez aucune notification.</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaBell className="mr-2" /> Vos Notifications
            </h1>
            <ul className="space-y-4">
                {notifications.map((notif) => (
                    <li key={notif._id} className="bg-white p-4 rounded-lg shadow-md flex items-center">
                        <FaCheckCircle className="text-green-500 mr-4" />
                        <div className="flex-1">
                            <p className="text-gray-800 font-medium">{notif.message}</p>
                            <span className="text-gray-500 text-sm">{new Date(notif.dateCreation).toLocaleString()}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}