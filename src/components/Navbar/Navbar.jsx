import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-scroll";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", to: "hero" },
    { name: "Projects", to: "projects" },
    { name: "Experience", to: "experience" },
    { name: "Skills", to: "skills" },
    { name: "About", to: "about" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-effect shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo with PFP */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <Link
              to="hero"
              smooth={true}
              duration={500}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src="/RishabPFP.png"
                  alt="Rishab Bhatt"
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/80 shadow-md group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900 animate-pulse" />
              </div>
              <span className="text-2xl font-bold gradient-text font-space-grotesk">
                Rishab.
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={item.to}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className={`text-slate-300 hover:text-blue-400 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 hover:bg-slate-800/50 ${
                    item.name === "Projects" ? "text-blue-400 font-bold" : ""
                  }`}
                  activeClass="text-blue-400 font-semibold"
                  spy={true}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Constant CTA to Projects */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Link
                to="projects"
                smooth={true}
                duration={500}
                offset={-70}
                className="btn-primary cursor-pointer text-xs py-2 px-4 flex items-center gap-1.5 shadow-md shadow-blue-500/20"
              >
                <span>Live Projects</span>
                <span className="text-amber-300">⚡</span>
              </Link>
            </motion.div>

            {/* Resume Download */}
            <motion.a
              href="/RishabCV2026.pdf"
              download="Rishab_Bhatt_Resume.pdf"
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume CV
            </motion.a>
          </div>

          {/* Mobile hamburger only */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-blue-400 hover:bg-slate-800/50 transition-all duration-200"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    to={item.to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="text-slate-300 hover:text-blue-400 block px-3 py-3 rounded-lg text-base font-medium cursor-pointer transition-all duration-200 hover:bg-slate-800/50"
                    activeClass="text-blue-400 bg-blue-900/20"
                    spy={true}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-3 pb-1 space-y-2">
                <Link
                  to="projects"
                  smooth={true}
                  duration={500}
                  offset={-70}
                  onClick={() => setIsOpen(false)}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm font-semibold shadow-md touch-manipulation"
                >
                  <span>Explore Live Projects</span>
                  <span className="text-amber-300">⚡</span>
                </Link>
                <a
                  href="/RishabCV2026.pdf"
                  download="Rishab_Bhatt_Resume.pdf"
                  className="w-full flex items-center justify-center py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold touch-manipulation"
                >
                  Download Resume CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
