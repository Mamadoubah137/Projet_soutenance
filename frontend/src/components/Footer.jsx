import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-sky-600 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo + description */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <img src="/images/lelogo.png" alt="Logo" className="w-10 h-10" />
            <span className="text-xl font-bold">BALLALfactures</span>
          </div>
          <p className="text-white-400 text-sm">
            Gérer vos factures et loyers facilement depuis une seule plateforme.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-white-400 text-sm mb-3">
            Recevez nos dernières actualités et mises à jour.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Votre email"
              className="w-full px-3 py-2 rounded-l-md text-black-400 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-black-400 hover:bg-blue-600 px-4 rounded-r-md font-semibold"
            >
              S’abonner
            </button>
          </form>
        </div>

        {/* Liens utiles */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
          <ul className="space-y-2 text-black-400 text-sm">
            <li><Link to="/" className="hover:text-blue-500">Accueil</Link></li>
            <li><Link to="/a-propos" className="hover:text-blue-500">À propos</Link></li>
            <li><a href="/services" className="hover:text-blue-500">Services</a></li>
            <li><a href="/contact" className="hover:text-blue-500">Contact</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-white-500 hover:bg-blue-600 p-2 rounded-full">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-white-500 hover:bg-blue-600 p-2 rounded-full">
              <FaTwitter />
            </a>
            <a href="#" className="bg-white-500 hover:bg-blue-600 p-2 rounded-full">
              <FaInstagram />
            </a>
            <a href="#" className="bg-white-500 hover:bg-blue-600 p-2 rounded-full">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-black-400 text-sm">
        © {new Date().getFullYear()} BALLALfactures. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
