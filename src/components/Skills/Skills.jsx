import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { 
  Code, 
  Palette, 
  Database, 
  Server, 
  Layers, 
  Zap,
  Smartphone,
  GitBranch,
  Terminal,
  Brush,
  Component,
  Globe
} from "lucide-react";

const Skills = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const skillCategories = [
    {
      title: "Frontend Frameworks",
      icon: <Component className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      skills: ["React.js", "Next.js", "Vue.js", "Nuxt.js"]
    },
    {
      title: "Languages",
      icon: <Code className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      skills: ["JavaScript", "TypeScript", "HTML5", "CSS3"]
    },
    {
      title: "Styling & Design",
      icon: <Palette className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      skills: ["TailwindCSS", "Material-UI", "Shadcn/ui", "SCSS"]
    },
    {
      title: "Development Tools",
      icon: <Terminal className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
      skills: ["Git", "GitHub", "VS Code", "Vite"]
    },
    {
      title: "Backend & Database",
      icon: <Database className="w-6 h-6" />,
      color: "from-red-500 to-pink-500",
      skills: ["Node.js", "Express.js", "MongoDB", "MySQL"]
    },
    {
      title: "Additional Tools",
      icon: <Zap className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500",
      skills: ["Figma", "Framer Motion", "Axios", "REST APIs"]
    }
  ];

  const featuredSkills = [
    "React.js", "Next.js", "TypeScript", "TailwindCSS", 
    "Material-UI", "Shadcn/ui", "JavaScript", "Node.js",
    "Framer Motion", "Git", "MongoDB", "Figma"
  ];

  return (
    <motion.section
      id="skills"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 transition-colors duration-300"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-6 font-space-grotesk"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Technical Skills
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Bringing ideas to life with modern technologies and frameworks
          </motion.p>
        </motion.div>

        {/* Featured Skills Cloud */}
        <motion.div
          className="mb-20"
          variants={itemVariants}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-center text-slate-800 dark:text-white mb-12 font-space-grotesk"
            variants={itemVariants}
          >
            Core Technologies
          </motion.h3>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {featuredSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="glass-effect px-6 py-3 rounded-full hover:shadow-xl transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Categories */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h4 className="text-xl font-semibold text-slate-800 dark:text-white font-space-grotesk">
                  {category.title}
                </h4>
              </div>
              
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 group/skill"
                    whileHover={{ x: 4 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover/skill:scale-125 transition-transform duration-200" />
                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            Always learning and exploring new technologies to create better digital experiences.
          </motion.p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
