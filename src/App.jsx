import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import AOS from "aos";
import "aos/dist/aos.css";
import Experience from "./components/Experience/Experience";
import Footer from "./components/Footer/Footer";
import Project from "./components/Projects/Project";
import RandomFacts from "./components/RandomFacts/RandomFacts";
function App() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
    AOS.refresh();
  }, []);
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Project />
      <RandomFacts />
      <Footer />
    </>
  );
}

export default App;
