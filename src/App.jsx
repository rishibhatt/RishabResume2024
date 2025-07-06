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
      <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
        <Toaster 
          position="top-right"
          toastOptions={{
            className: 'dark:bg-slate-800 dark:text-white',
            duration: 4000,
          }}
        />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Project />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
