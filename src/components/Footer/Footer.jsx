import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-scroll";
import { ArrowUp, Github, Linkedin, Instagram, Mail, FileText, MessageCircle } from "lucide-react";

const Footer = () => {
  const { isDark } = useTheme();

  const socialLinks = [
    {
      icon: <Instagram className="w-6 h-6" />,
      href: "https://www.instagram.com/rishibhatt.007/",
      label: "Instagram"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/rishab-bhatt-7ba7111ab/",
      label: "LinkedIn"
    },
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/rishibhatt",
      label: "GitHub"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:bhattrishu07@gmail.com",
      label: "Email"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      href: "https://drive.google.com/file/d/1XY8HNk1q3pQ-LPw7RmLqkhNadLPsud5E/view?usp=sharing",
      label: "Resume"
    }
  ];

  const navLinks = [
    { name: "Home", to: "hero" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Contact Section */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 font-space-grotesk"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Let's Talk
          </motion.h2>
          
          <motion.p 
            className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to bring your ideas to life? Let's connect and create something amazing together.
          </motion.p>
          
          <motion.a
            href="https://wa.me/918360558587?text=Hi%20there!%20I'd%20like%20to%20get%20in%20touch%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-primary text-lg px-8 py-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MessageCircle className="w-6 h-6" />
            Get In Touch
          </motion.a>
        </div>

        {/* Navigation and Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Navigation */}
          <motion.div 
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white font-space-grotesk">Navigation</h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white font-space-grotesk">Connect</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-slate-400 hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Back to Top */}
          <motion.div 
            className="text-center md:text-right"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col items-center md:items-end">
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors duration-200"
              >
                <ArrowUp className="w-5 h-5" />
                Back to Top
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Rishab Bhatt. Made with ❤️ and lots of ☕
          </p>
          <p className="text-slate-500 text-xs">
            Designed & Developed by Rishab Bhatt
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
