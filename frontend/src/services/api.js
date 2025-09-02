import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// ==================== AUTH ====================

// Inscription
export const register = (data) => API.post("/auth/register", data);

// Connexion
export const login = async (data) => {
  const response = await API.post("/auth/login", data);

  // Sauvegarde de l’utilisateur connecté
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userId", response.data.user._id);
  localStorage.setItem("role", response.data.user.role);

  return response;
};

// Déconnexion
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("role");
  return API.post("/auth/logout");
};

// ==================== IMMEUBLES ====================

// Ajouter un immeuble
export const ajouterImmeuble = async (data) => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  if (!userId) throw new Error("Utilisateur non connecté");

  return await API.post(
    "/immeubles",
    {
      ...data, // 👈 utiliser data
      proprietaireId: userId, // injecter l'ID du propriétaire
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
