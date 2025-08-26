import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Steps from "../components/Steps";
import Partners from "../components/Partners";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Steps />
      <Partners />
      <Footer />
    </>
  );
}
