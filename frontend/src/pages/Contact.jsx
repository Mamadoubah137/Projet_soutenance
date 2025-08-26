import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Nous Contacter</h1>
          <p className="text-gray-600 mb-10">
            Vous avez une question, une suggestion ou un souci ?  
            Remplissez le formulaire ci-dessous pour nous envoyer un message.
          </p>
        </div>

        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
