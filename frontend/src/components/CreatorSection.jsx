import React from "react";
// remplace par le chemin de ta photo

const CreatorSection = () => {
  return (
       <div>


      {/* NOUVELLE SECTION - À propos du créateur */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:flex lg:items-center lg:gap-12">
          
          {/* Texte à gauche */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Mots du créateur</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Je suis <span className="font-bold">MAMADOU BAH</span> créateur de cette application, passionné par la technologie et le développement web.
              Mon objectif est de fournir des outils simples, performants et accessibles pour faciliter la vie des utilisateurs.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Avec cette application, je souhaite offrir une expérience fluide et agréable, tout en apportant des solutions modernes aux besoins quotidiens.
            </p>
          </div>

          {/* Image à droite avec effet fluide */}
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <img
              src="/images/hero.png"
              alt="Créateur"
              className="rounded-full shadow-lg w-80 h-80 object-cover transition-transform duration-500 hover:scale-105"
              style={{ maskImage: "radial-gradient(circle, white 80%, transparent 100%)", WebkitMaskImage: "radial-gradient(circle, white 80%, transparent 100%)" }}
            />
          </div>

        </div>
      </section>
    </div>
  );
}

export default CreatorSection;
