import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { Experiences } from "../../assets/constants/constant";
import { Briefcase, MapPin, Calendar, ArrowRight, Building, User } from "lucide-react";

const Experience = () => {
  const { isDark } = useTheme();
  const experiences = Experiences;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      id="experience"
      className="scroll-mt-24 py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 font-space-grotesk"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Professional Experience
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            3+ years of hands-on experience in frontend development, delivering scalable web applications
          </motion.p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 group relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 via-purple-500/5 to-transparent rounded-full" />

              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white font-space-grotesk">
                        {experience.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                          <Building className="w-4 h-4" />
                          {experience.company}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                          <MapPin className="w-4 h-4" />
                          {experience.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-4 py-2 rounded-full text-sm font-medium">
                  <Calendar className="w-4 h-4" />
                  {experience.year}
                </div>
              </div>

              {/* Key Achievements */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-4">
                  Key Achievements & Responsibilities:
                </h4>

                <div className="grid gap-3">
                  {experience.description.map((desc, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800/30 hover:bg-white/80 dark:hover:bg-slate-800/50 transition-all duration-200 group/item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <ArrowRight className="w-4 h-4 text-blue-500 group-hover/item:translate-x-1 transition-transform duration-200" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base">
                        {desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              {index === 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex flex-wrap gap-2">
                    {["ReactJS", "NextJS", "TailwindCSS", "TypeScript", "Web3", "Redux"].map((tech, techIdx) => (
                      <span
                        key={techIdx}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: "Years of Experience", value: "3+", icon: <User className="w-6 h-6" /> },
            { label: "Projects Delivered", value: "10+", icon: <Briefcase className="w-6 h-6" /> },
            { label: "Technologies Mastered", value: "15+", icon: <ArrowRight className="w-6 h-6" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 glass-effect rounded-xl hover:shadow-lg transition-all duration-300"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;
