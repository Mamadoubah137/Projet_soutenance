import { useState } from "react";
import axios from "axios";


export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    adresse: "",
    role: "abonne", // valeur par défaut
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(""); // Message visible
  const [loading, setLoading] = useState(false);

  // Gestion des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  {/*// Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Étape 1 : INSCRIPTION
      await axios.post("http://localhost:5000/api/auth/register", formData);

      // Étape 2 : CONNEXION AUTOMATIQUE après inscription réussie
      const res = await axios.post("http://localhost:5000/api/auth/login", {
      email: formData.email,
      password: formData.password,
      });

      // Stockage du token et rôle
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Message visible
      setMessage("✅ Inscription Réussie.");

      // Étape 3 : Redirection selon rôle
      setTimeout(() => {
        if (res.data.role === "abonne") {
        navigate("/dashboard-abonne", { replace: true });
       } else {
        navigate("/dashboard-proprietaire", { replace: true });
    }
      }, 1500);

    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Erreur lors de l'inscription"));
    } finally {
      setLoading(false);
    }
  };*/}

  // Soumission du formulaire
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    // Étape 1 : INSCRIPTION
    await axios.post("http://localhost:5000/api/auth/register", formData);

    // Message visible
    setMessage("✅ Inscription réussie. Veuillez vous connecter.");

    // Étape 2 : Après inscription → ouvrir directement le LoginModal
    setTimeout(() => {
      onClose();           // ferme le modal inscription
      onSwitchToLogin();   // ouvre le modal connexion
    }, 1500);

  } catch (err) {
    setMessage("❌ " + (err.response?.data?.message || "Erreur lors de l'inscription"));
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative">
        {/* Bouton fermer (croix) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">Inscription</h2>

        {/* Message visible */}
        {message && (
          <p
            className={`mb-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              name="nom"
              placeholder="Nom"
              className="border p-2 rounded-lg w-full"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="prenom"
              placeholder="Prénom"
              className="border p-2 rounded-lg w-full"
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="telephone"
            placeholder="Téléphone"
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
          />

          <input
            type="text"
            name="adresse"
            placeholder="Adresse"
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
          />

          <select
            name="role"
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
          >
            <option value="abonne">Abonné</option>
            <option value="proprietaire">Propriétaire</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            className="border p-2 rounded-lg w-full"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>
      </div>
    </div>
  );
}
