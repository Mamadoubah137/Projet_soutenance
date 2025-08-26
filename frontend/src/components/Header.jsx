import React, { useState } from "react"; 
import { Link } from "react-router-dom";
import { 
  FaPhone, FaMapMarkerAlt, FaEnvelope, FaUser, FaServicestack, 
  FaHome, FaInfoCircle, FaMailBulk 
} from "react-icons/fa";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";

const Header = () => {
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

     // Quand l'inscription réussit → ouvrir LoginModal
  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowLogin(true);
  };
  return (
    <header className="bg-white">
      {/* Top Bar - Logo et coordonnées */}
      <div className="w-full py-4 px-4 md:px-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo */}
          <div className="mb-4 md:mb-0 transition-transform hover:scale-105">
            <img
              src="/hero.png"
              alt="Logo"
              className="h-12 md:h-14 w-auto"
            />
          </div>

          {/* Coordonnées */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-sm">
            <ContactItem icon={<FaEnvelope />} text="contact@entreprise.com" />
            <ContactItem icon={<FaPhone />} text="+224 638899482" />
            <ContactItem icon={<FaMapMarkerAlt />} text="Conakry-Ratoma, Koloma" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="w-full py-2 bg-from-sky-200 to-black-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-sky-500 to-black-600 rounded-xl shadow-lg p-1">
            <div className="flex flex-col md:flex-row justify-between items-center bg-white rounded-lg p-3">
              <nav className="w-full md:w-auto mb-3 md:mb-0">
                <ul className="flex flex-wrap justify-center gap-1 md:gap-6">
                  <NavItem to="/" icon={<FaHome />} text="Accueil" />
                  <NavItem to="/a-propos" icon={<FaInfoCircle />} text="À propos" />
                  <NavItem to="/services" icon={<FaServicestack />} text="Services" />
                  <NavItem to="/contact" icon={<FaMailBulk />} text="Nous Contacter" />
                </ul>
              </nav>

              {/* Boutons */}
              <div className="flex gap-3">
                {/* Connexion */}
                <button 
                  className="bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg text-sm flex items-center transition-all hover:shadow-md"
                  onClick={() => setShowLogin(true)}
                >
                  <FaUser className="mr-2" /> Connexion
                </button>

                {/* Inscription */}
                <button  
                  className="bg-gradient-to-r from-sky-500 to-blue-500 text-white hover:shadow-lg font-medium py-2 px-4 rounded-lg text-sm transition-all"
                  onClick={() => setShowRegister(true)}
                >
                  Inscription
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

       {/* POPUPS */}
      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSuccess={handleRegisterSuccess} // 🔥 important
        />
      )}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </header>
  );
};

const ContactItem = ({ icon, text }) => (
  <div className="flex items-center group">
    <div className="bg-gradient-to-r from-sky-400 to-blue-600 p-2 rounded-full mr-3 group-hover:rotate-12 transition-transform text-white">
      {icon}
    </div>
    <span className="text-black-600 group-hover:text-blue-600 transition-colors">{text}</span>
  </div>
);

const NavItem = ({ to, icon, text }) => {
  return (
    <li className="inline-block">
      <Link 
        to={to} 
        className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all text-gray-600 hover:bg-blue-50 hover:text-blue-600"
      >
        <span className="mr-2 text-blue-500">{icon}</span>
        {text}
      </Link>
    </li>
  );
};

export default Header;
