import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import AOS from "aos";
import "aos/dist/aos.css";
import Experience from "./components/Experience/Experience";
import Footer from "./components/Footer/Footer";
import Project from "./components/Projects/Project";
import Contact from "./components/Contact/Contact";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";

function App() {
  useEffect(() => {
    AOS.init({ 
      duration: 1200,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
    AOS.refresh();
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-950">
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'bg-slate-800 text-white',
            duration: 4000,
          }}
        />
        <Navbar />
        <main>
          <Hero />
          <Project />
          <Experience />
          <Skills />
          <About />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ThemeProvider>
  );
}

export default App;
