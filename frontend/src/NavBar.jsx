// src/components/NavBar.js
import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-white p-2 flex justify-between items-center shadow-md rounded-full mx-auto max-w-7xl">
      <ul className="flex space-x-6 text-cyan-500 font-medium">
        <li>ACCUEIL</li>
        <li>APROPOS</li>
        <li>GUIDE</li>
        <li>MESSAGE</li>
      </ul>
      <div className="flex space-x-2">
        <button className="bg-gray-900 text-white px-4 py-2 rounded-full">CONNEXION</button>
        <button className="bg-gray-900 text-white px-4 py-2 rounded-full">S'INSCRIRE</button>
      </div>
    </nav>
  );
};

export default NavBar;