import { motion } from "framer-motion";
import { FaMoneyBillWave, FaHome, FaClipboardList } from "react-icons/fa";

export default function ServicesSection() {
  const services = [
    {
      icon: <FaClipboardList size={40} className="text-indigo-500" />,
      title: "Gérez vos factures",
      description:
        "Accédez à votre tableau de bord pour voir toutes vos factures, classées par statut (payées ou non), et recevez des rappels automatiques.",
    },
    {
      icon: <FaHome size={40} className="text-green-500" />,
      title: "Payer votre loyer",
      description:
        "Choisissez facilement votre mode de paiement pour régler votre loyer. Suivez l’historique de vos paiements et obtenez des confirmations instantanées.",
    },
    {
      icon: <FaMoneyBillWave size={40} className="text-yellow-500" />,
      title: "Connaître qui a payé",
      description:
        "Les propriétaires peuvent voir quels locataires ont payé, recevoir des signalements de pannes et gérer leurs factures en un seul endroit.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Nos Services
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-2xl transition duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {service.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
