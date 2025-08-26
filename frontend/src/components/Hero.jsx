import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({
  title = "Gérez vos factures en toute simplicité",
  subtitle = "BALLALbills",
  description =
    "Centralisez eau, électricité, loyer… et payez en un clic. Suivi en temps réel, alertes intelligentes, historique détaillé.",
  ctaPrimary = { label: "Découvrir" },
  ctaSecondary = { label: "Connexion" },
  imageSrc = "/images/hero2.png", // ← Ton image par défaut
  imageAlt = "Aperçu de l'application BALLALbills",
}) {
  return (
    <section className="relative overflow-hidden">
      <DecorBackground />

      <div className="relative mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          
          {/* IMAGE À GAUCHE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.1 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              <motion.div
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-3xl bg-white/60 p-2 shadow-xl ring-1 ring-black/5 backdrop-blur-md"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="h-auto w-full object-cover"
                    loading="eager"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 16 }}
                className="absolute -right-4 -top-4 hidden select-none rounded-2xl bg-white/80 px-3 py-2 text-sm shadow-lg ring-1 ring-black/5 backdrop-blur md:block"
              >
                <span className="font-semibold">Nouvelles fonctionnalités</span>
              </motion.div>
            </div>
          </motion.div>

          {/* TEXTE À DROITE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 20 }}
            className="order-1 space-y-6 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
              <span className="text-xs font-medium">✨ Simple. Rapide. Sécurisé.</span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              <span className="block text-zinc-900 dark:text-zinc-50">{title}</span>
              <span className="mt-2 block bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {subtitle}
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              {description}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={ctaPrimary.onClick}
                className="group flex items-center rounded-2xl bg-primary px-6 py-3 text-base font-medium text-white shadow-lg transition hover:bg-primary/90"
              >
                {ctaPrimary.label}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                onClick={ctaSecondary.onClick}
                className="rounded-2xl border border-zinc-300 px-6 py-3 text-base font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
              >
                {ctaSecondary.label}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DecorBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-1/2 top-[-10%] h-[60vh] w-[80vw] rounded-full bg-gradient-to-br from-primary/20 via-purple-300/10 to-cyan-500/10 blur-3xl" />
      <div className="absolute -right-1/2 bottom-[-10%] h-[60vh] w-[80vw] rounded-full bg-gradient-to-tr from-cyan-500/10 via-purple-300/10 to-primary/20 blur-3xl" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}
