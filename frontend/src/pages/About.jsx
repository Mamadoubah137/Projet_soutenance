import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import Partners from "../components/Partners";
import Footer from "../components/Footer";
import CreatorSection from "../components/CreatorSection";


export default function About() {
  return (
    <>
      <Header />
      <Hero />
      <AboutSection/>
      <CreatorSection />
      <Partners />
      <Footer />
    </>
  );
}
