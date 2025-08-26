import React from "react";

const PartenairesBar = () => {
  const partenaires = [
    { name: "Directon Generale Des Impôt", logo: "/images/LOGO-DGI.jpg" },
    { name: "EDG", logo: "images/LOGO-EDG.png" },
    { name: "SEG", logo: "images/seglogo.jpg" },
    { name: "Doumbouya Fitness", logo: "images/Doumbouyafitness.jpg" },
    { name: "Agence ", logo: "images/hero.png" },
  ];

  return (
    <div className="w-full bg-gray-100 py-4 overflow-hidden relative">
      <div className="flex animate-scroll whitespace-nowrap">
        {partenaires.concat(partenaires).map((partenaire, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 mx-6 flex-shrink-0"
          >
            <img
              src={partenaire.logo}
              alt={partenaire.name}
              className="w-12 h-12 object-contain"
            />
            <span className="text-gray-700 font-semibold">{partenaire.name}</span>
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PartenairesBar;
