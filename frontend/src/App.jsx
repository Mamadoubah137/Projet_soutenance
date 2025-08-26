import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import DashboardAbonnee from './pages/DashboardAbonnee';
import DashboardProprietaire from './pages/DashboardProprietaire';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/a-propos" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard-abonne" element={<DashboardAbonnee />} />
      <Route path="/dashboard-proprietaire" element={<DashboardProprietaire />} />
      {/* Add more routes as needed */}

    </Routes>
  );
}
