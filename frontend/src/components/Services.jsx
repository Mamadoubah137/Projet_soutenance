import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Services() {
  const services = [
    {
      title: "GEREZ VOS FACTURES",
      description:
        "Centralisez toutes vos factures (eau, électricité, internet...) dans un tableau clair et intuitif.",
      icon: "📑",
    },
    {
      title: "PAYER VOTRE LOYER",
      description:
        "Effectuez vos paiements de loyer en ligne de façon sécurisée et rapide.",
      icon: "💳",
    },
    {
      title: "CONNAITRE QUI DE VOS LOCATAIRE A PAYER SON LOYER",
      description:
        "Gardez un suivi en temps réel des paiements de vos locataires et recevez des alertes automatiques.",
      icon: "🏠",
    },
  ];

  // Parallax effect
  const { scrollYProgress } = useScroll();
  const yOffset1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const yOffset2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yOffset3 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const smooth1 = useSpring(yOffset1, { stiffness: 100, damping: 20 });
  const smooth2 = useSpring(yOffset2, { stiffness: 100, damping: 20 });
  const smooth3 = useSpring(yOffset3, { stiffness: 100, damping: 20 });

  const offsets = [smooth1, smooth2, smooth3];

  return (
    <section className="relative -mt-24 pt-15 z-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center mb-14 text-gray-800"
        >
          Nos Services
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              style={{ y: offsets[index] }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 1 : -1 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center border-t-4 border-blue-500"
            >
              <motion.div
                initial={{ rotate: -10, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-5xl mb-4"
              >
                {service.icon}
              </motion.div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {service.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
