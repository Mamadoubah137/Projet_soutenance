import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout");
    navigate("/", { replace: true });
  };
  return <button className="flex items-center px-3 py-2 rounded-lg hover:bg-blue-500" onClick={handleLogout}>Déconnexion</button>;
}
