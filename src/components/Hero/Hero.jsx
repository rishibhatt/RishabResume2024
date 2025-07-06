import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Link } from "react-scroll";
import CV from "../../../public/RishabCV2025.pdf";
const Hero = () => {
  const { isDark } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      href: "https://github.com/rishibhatt",
      label: "GitHub"
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      href: "https://www.linkedin.com/in/rishab-bhatt-7ba7111ab/",
      label: "LinkedIn"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      href: "mailto:bhattrishu07@gmail.com",
      label: "Email"
    }
  ];

  return (
    <section id="hero" className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center min-h-screen py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium">
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 font-space-grotesk"
            >
              <span className="gradient-text text-shadow">Rishab Bhatt</span>
            </motion.h1>

            {/* Role */}
            <motion.h2 
              variants={itemVariants}
              className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-700 dark:text-slate-300 mb-8"
            >
              Frontend Developer & UI/UX Enthusiast
            </motion.h2>

            {/* Description */}
            <motion.p 
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              I create stunning, responsive web applications with modern technologies like 
              <span className="text-blue-600 dark:text-blue-400 font-semibold"> React.js</span>,
              <span className="text-purple-600 dark:text-purple-400 font-semibold"> Next.js</span>, and
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold"> TailwindCSS</span>. 
              Passionate about clean code, user experience, and bringing ideas to life.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                to="projects"
                smooth={true}
                duration={500}
                offset={-70}
                className="btn-primary cursor-pointer group flex items-center"
              >
                View My Work
                <ArrowDown className="w-5 h-5 ml-2 group-hover:animate-bounce" />
              </Link>
              <a
                href={CV}
                className="btn-secondary group flex items-center"
                download
              >
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-center space-x-6"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <Link
              to="about"
              smooth={true}
              duration={500}
              offset={-70}
              className="flex flex-col items-center cursor-pointer group"
            >
              <span className="text-sm text-slate-500 dark:text-slate-400 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Scroll down
              </span>
              <ArrowDown className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 animate-bounce transition-colors" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/4 right-1/6 w-2 h-2 bg-pink-400 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Hero;
