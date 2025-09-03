import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// ==================== AUTH ====================

// Inscription
export const register = async (data) => {
  return await API.post("/auth/register", data);
};

// Connexion
export const login = async (data) => {
  const response = await API.post("/auth/login", data);
  
  localStorage.setItem("user", JSON.stringify(response.data.user));

  return response;
};

// Déconnexion
export const logout = async () => {
  localStorage.removeItem("user");
  return await API.post("/auth/logout");
};

// ==================== PROPRIETES ====================

// Ajouter une propriété (anciennement immeuble)
export const ajouterPropriete = async (data) => {
  return await API.post("/properties/add", data);
};

// Récupérer les propriétés du propriétaire
export const getMesProprietes = async () => {
  return await API.get("/properties/my-properties");
};

// ==================== LOCATAIRES ====================

// S'abonner comme locataire
export const ajouterLocataire = async (data) => {
  return await API.post("/tenants/register", data);
};

// Récupérer les informations du locataire
export const getMyTenantInfo = async () => {
  return await API.get("/tenants/my-info");
};