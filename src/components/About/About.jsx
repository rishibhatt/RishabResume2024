import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Code,
  Palette,
  Zap,
  Coffee,
  Heart,
  Lightbulb,
  Award,
  Trophy,
  BookOpen,
  Target,
} from "lucide-react";
import Rishi from "../../assets/images/Rishab-Image.jpeg";

const About = () => {
  const { isDark } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    {
      label: "Years of Experience",
      value: "3+",
      icon: <Code className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Projects Completed",
      value: "10+",
      icon: <Trophy className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Technologies",
      value: "15+",
      icon: <Zap className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Coffee Consumed",
      value: "∞",
      icon: <Coffee className="w-6 h-6" />,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const skills = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Frontend Development",
      desc: "Building responsive and interactive web applications with React, Next.js, and modern CSS frameworks.",
      tech: ["React.js", "Next.js", "TypeScript", "TailwindCSS"],
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "UI/UX Design",
      desc: "Creating beautiful and intuitive user interfaces that provide exceptional user experiences.",
      tech: ["Figma", "Adobe XD", "Responsive Design", "User Research"],
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Problem Solving",
      desc: "Analytical thinking to break down complex problems and implement efficient solutions.",
      tech: ["Algorithm Design", "Code Optimization", "Debugging", "Testing"],
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation",
      desc: "Staying updated with latest technologies and implementing cutting-edge solutions.",
      tech: ["Web3", "Blockchain", "Progressive Web Apps", "AI Integration"],
    },
  ];

  const achievements = [
    {
      icon: <Award className="w-6 h-6" />,
      title: "Radio Jockey @90.8 MHz",
      description:
        "Hosted community shows during college, developing communication and presentation skills.",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Idea Hunt Winner",
      description:
        "Won startup idea competition organized by GradCapital for innovative business concept.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Continuous Learner",
      description:
        "Always exploring new technologies and sharing knowledge with the developer community.",
    },
  ];

  return (
    <motion.section
      id="about"
      className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 transition-colors duration-300"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
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
            About Me
          </motion.h2>
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Passionate Frontend Developer crafting digital experiences that
            matter
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          {/* Left Column - Image and Quote */}
          <motion.div
            className="lg:col-span-5 space-y-8"
            variants={itemVariants}
          >
            {/* Profile Image */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative inline-block w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur-xl opacity-30 animate-pulse" />
                <img
                  src={Rishi}
                  alt="Rishab Bhatt"
                  className="relative w-full max-w-md mx-auto rounded-2xl object-cover border-4 border-white dark:border-slate-700 shadow-2xl"
                />
              </div>
            </motion.div>

            {/* Quote Card */}
            <motion.div
              className="glass-effect rounded-2xl p-8 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute top-4 left-4 text-4xl text-blue-400 opacity-30 font-serif">
                "
              </div>
              <p className="text-xl text-slate-700 dark:text-slate-300 italic font-medium relative z-10 pt-4 pb-4">
                Driven by curiosity and creativity, I thrive on turning complex
                problems into elegant solutions that make a real impact.
              </p>
              <div className="absolute bottom-4 right-4 text-4xl text-blue-400 opacity-30 font-serif rotate-180">
                "
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="lg:col-span-7 space-y-8"
            variants={itemVariants}
          >
            {/* Bio */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6 font-space-grotesk">
                Frontend Developer & Creative Problem Solver
              </h3>
              <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                <p>
                  With over 3 years of experience in frontend development, I
                  specialize in creating responsive, user-friendly web
                  applications using modern technologies like React.js, Next.js,
                  and TailwindCSS. My journey in tech has been driven by a
                  passion for combining technical excellence with creative
                  design.
                </p>
                <p>
                  I believe in the power of clean code, thoughtful design, and
                  continuous learning. My approach to development focuses on
                  creating scalable solutions that not only meet current needs
                  but also adapt to future requirements.
                </p>
                <p>
                  Beyond coding, I bring unique perspectives from my experience
                  as a Radio Jockey, which has enhanced my communication skills
                  and ability to engage with diverse audiences. This combination
                  of technical expertise and communication skills allows me to
                  bridge the gap between complex technology and user-friendly
                  experiences.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-6 glass-effect rounded-xl hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} text-white mb-3 group-hover:scale-110 transition-transform duration-200`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-12 font-space-grotesk"
            variants={itemVariants}
          >
            What I Do Best
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-slate-800 dark:text-white mb-3">
                      {skill.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                      {skill.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {skill.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h3
            className="text-3xl md:text-4xl font-bold text-center text-slate-800 dark:text-white mb-12 font-space-grotesk"
            variants={itemVariants}
          >
            Achievements & Recognition
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="text-center p-6 glass-effect rounded-2xl hover:shadow-xl transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4 group-hover:scale-110 transition-transform duration-200">
                  {achievement.icon}
                </div>
                <h4 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                  {achievement.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
