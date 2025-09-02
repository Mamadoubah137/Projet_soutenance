// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// // axios.defaults.withCredentials = true;
// export default function LoginModal({ onClose }) {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");   // succès/erreur visible
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setLoading(true);
//     console.log(formData);
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {formData}, { withCredentials: true });
//       alert("gggggggggg");
//       const { token, role } = res.data;

//       localStorage.setItem("token", token);
//       localStorage.setItem("role", role);

//       setMessage("✅ Connexion réussie.");
//       // Redirection SPA (fiable) selon le rôle
//       if (role === "abonne") {
//         navigate("/dashboard-abonne", { replace: true });
//       } else {
//         navigate("/dashboard-proprietaire", { replace: true });
//       }
//     } catch (err) {
//       setMessage("❌ " + (err.response?.data?.message || "Erreur de connexion"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
//       <div className="relative bg-white p-8 rounded-2xl w-[600px] shadow-2xl">
//         {/* Croix */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-red-600 text-2xl font-bold"
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Connexion</h2>

//         {message && (
//           <div
//             className={`mb-4 text-center font-medium ${
//               message.startsWith("✅") ? "text-green-600" : "text-red-600"
//             }`}
//           >
//             {message}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             name="email"
//             type="email"
//             placeholder="Email"
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Mot de passe"
//             onChange={handleChange}
//             className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 hover:bg-blue-700 text-white w-full py-3 rounded-lg font-semibold shadow disabled:opacity-60"
//           >
//             {loading ? "Connexion..." : "Se connecter"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }






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

  //   try {
  //     // ENVOI CORRECT : on envoie directement formData (pas { formData })
  //     const res = await loginService(formData); // withCredentials déjà géré par api.js

  //     // TON BACKEND RENVOIE `user` DANS res.data.user
  //     const role = res.data?.user?.role;
  //     if (!role) {
  //       setMessage("❌ Réponse inattendue du serveur (role manquant).");
  //       return;
  //     }

  //     // facultatif : stocker le rôle pour l'UI (pas le token)
  //     localStorage.setItem("role", role);

  //     setMessage("✅ Connexion réussie.");
  //     onClose?.();

  //     // Normaliser et rediriger selon le rôle (tolérant aux variantes)
  //     const r = (role || "").toLowerCase();
  //     if (r.startsWith("abon")) {
  //       navigate("/dashboard-abonne", { replace: true });
  //     } else {
  //       navigate("/dashboard-proprietaire", { replace: true });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     const msg = err.response?.data?.message || err.message || "Erreur de connexion";
  //     setMessage("❌ " + msg);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
