import { useEffect, useState } from "react";

export default function SuccessCard({ message, onClose }) {
  const [isVisible, setIsVisible] = useState(false);

  // Gère l'animation de la pop-up
  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, 5000); // La pop-up disparaît après 5 secondes
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message || !isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm text-center transform transition-all duration-500 scale-100 opacity-100">
        <div className="flex justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Succès !</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}