import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function AboutSection() {
  const reasons = [
    {
      title: "Simplicité d’utilisation",
      description:
        "Une interface claire et intuitive pour gérer toutes vos factures au même endroit.",
    },
    {
      title: "Rappels intelligents",
      description:
        "Recevez des notifications avant l’échéance pour éviter tout retard de paiement.",
    },
    {
      title: "Sécurité optimale",
      description:
        "Vos données sont protégées par les dernières normes de sécurité.",
    },
    {
      title: "Accessibilité partout",
      description:
        "Accédez à vos factures depuis n’importe quel appareil, à tout moment.",
    },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6 md:px-16">
      {/* Qui sommes-nous */}
      <div className="max-w-5xl mx-auto mb-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Qui sommes-nous ?
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          Chez <span className="font-semibold text-indigo-600">BALLALbills</span>,
          nous simplifions la gestion de vos factures d’eau, d’électricité,
          de loyer et bien plus encore. Notre mission est de vous offrir une
          plateforme moderne, rapide et sécurisée pour suivre, payer et
          archiver vos dépenses en toute tranquillité.
        </p>
        <p className="text-lg text-gray-600 mt-4 leading-relaxed">
          Pensée pour les particuliers comme pour les professionnels,
          <span className="font-semibold text-indigo-600"> BALLALbills</span>{" "}
          centralise toutes vos factures au même endroit, vous évitant pertes
          de temps et oublis. Avec une interface intuitive et des rappels
          intelligents, nous vous aidons à garder le contrôle sur vos finances,
          à tout moment et partout.
        </p>
      </div>

      {/* Pourquoi nous choisir - Timeline */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          Pourquoi nous choisir ?
        </h3>
        <div className="relative border-l-4 border-indigo-500">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="mb-10 ml-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <span className="absolute flex items-center justify-center w-8 h-8 bg-indigo-500 rounded-full -left-4 ring-4 ring-white">
                <CheckCircleIcon className="w-5 h-5 text-white" />
              </span>
              <h4 className="text-lg font-semibold text-gray-800">
                {reason.title}
              </h4>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
