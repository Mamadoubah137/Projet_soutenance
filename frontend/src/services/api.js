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

// Libérer un appartement
export const removeTenant = async (data) => {
    return await API.delete("/tenants/remove", { data });
};

// Récupérer les informations de loyer et de l'immeuble pour un locataire
export const getTenantRentInfo = async () => {
    return await API.get("/tenants/my-rent");
};

// ==================== FACTURES ====================

// Générer les factures pour les locataires
export const generateInvoices = async (data) => {
  return await API.post("/invoices/generate", data);
};

// Récupérer les factures pour un locataire
export const getTenantInvoices = async () => {
  return await API.get("/invoices/my-invoices");
};

// Archiver (soft delete) une facture
export const softDeleteInvoice = async (invoiceId) => {
  return await API.put(`/invoices/soft-delete/${invoiceId}`);
};

// Récupérer les factures archivées (historique)
export const getHistoricalInvoices = async () => {
    return await API.get("/invoices/history");
};

// ==================== NOTIFICATIONS ====================

// Récupérer le nombre de notifications non lues
export const getUnreadNotificationCount = async () => {
  return await API.get("/notifications/count");
};

// Récupérer toutes les notifications et les marquer comme lues
export const getNotifications = async () => {
  return await API.get("/notifications");
};