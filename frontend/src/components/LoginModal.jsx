import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../services/api"; // ajuste le chemin si besoin

export default function LoginModal({ onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
   try {
     const res = await loginService(formData); // withCredentials déjà géré par api.js

      const user = res.data.user;
      localStorage.setItem("user", JSON.stringify(user));
      setMessage("✅ Connexion réussie");
      onClose?.();

      if (user.role === "proprietaire") navigate("/dashboard-proprietaire", { replace: true });
      else navigate("/dashboard-abonne", { replace: true });
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
      <div className="relative bg-white p-8 rounded-2xl w-[600px] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Connexion</h2>

        {message && (
          <div
            className={`mb-4 text-center font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold shadow disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
