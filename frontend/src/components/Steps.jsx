import { motion } from "framer-motion";

export default function HowItWorks() {
  const stepsAbonne = [
    {
      title: "Créer un compte (Abonné)",
      description: "Inscrivez-vous facilement avec l’option abonné.",
      icon: "📝",
    },
    {
      title: "Ajouter un abonnement ou loyer",
      description: "Enregistrez vos factures et loyers rapidement.",
      icon: "📑",
    },
  ];

  const stepsProprietaire = [
    {
      title: "Créer un compte (Propriétaire)",
      description: "Inscrivez-vous avec l’option propriétaire.",
      icon: "📝",
    },
    {
      title: "Ajouter un immeuble et des locataires",
      description: "Ajoutez facilement vos biens et locataires.",
      icon: "🏢",
    },
  ];

  const renderSteps = (steps, color) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, delay: index * 0.2, type: "spring", stiffness: 120 }}
          viewport={{ once: true }}
          className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 border-${color}-500`}
        >
          <div className="text-4xl mb-4">{step.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Comment l'application fonctionne
        </h2>

        {/* Abonné */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-8 text-blue-600 text-center md:text-left">
            Abonné
          </h3>
          {renderSteps(stepsAbonne, "blue")}
          <div className="mt-6 text-center md:text-left">
            <button
              onClick={() => alert("Redirection vers la page à propos")}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
            >
              Voir plus
            </button>
          </div>
        </div>

        {/* Propriétaire */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-green-600 text-center md:text-left">
            Propriétaire
          </h3>
          {renderSteps(stepsProprietaire, "green")}
          <div className="mt-6 text-center md:text-left">
            <button
              onClick={() => alert("Redirection vers la page à propos")}
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
            >
              Voir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
