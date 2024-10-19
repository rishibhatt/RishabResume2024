import React from "react";
import "./Project.css";
import { Projects } from "../../assets/constants/constant";
import link from "../../assets/images/link.png";

const Project = () => {
  const projects = Projects;
  return (
    <>
      <div
        className="p-10 text-center mt-20 border-b border-gray-300"
        id="projects"
      >
        <h2 className="text-[#353639] font-inter font-bold text-4xl lg:text-6xl lg:w-[60%] mx-auto">
          SHOWCASE OF MY PRACTICE PROJECTS
        </h2>
        {projects.map((project, id) => (
          <div
            key={id}
            className={`mt-16 w-full p-5 mx-auto flex flex-col lg:flex-row ${
              id % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center relative`}
          >
            <div className="lg:w-[60%] border border-black" data-aos="zoom-in">
              <img
                src={project.image}
                className="project-image border object-fill mx-auto  lg:h-full rounded-xl"
                alt="project"
              />
            </div>
            <div
              className="project-description p-5 bg-transparent lg:w-[40%]"
              data-aos="zoom-in"
            >
              <div className="p-2 text-center">
                <h3 className="font-serif underline">{project.title}</h3>
                <p className="font-serif text-sm">{project.description}</p>
              </div>
              <div className="flex gap-3 text-sm p-4 justify-center lg:justify-start">
                <a
                  className="p-3 w-36 cursor-pointer text-white bg-[#353639] border border-black"
                  href={project.demoLink}
                >
                  Live Demo
                </a>
                <a
                  className="p-3 w-36 flex justify-around cursor-pointer border border-black"
                  href={project.codeLink}
                >
                  View Code
                  <img src={link} className="h-4" alt="link icon" />
                </a>
              </div>
            </div>
          </div>
        ))}
        <button className="mt-20 group relative inline-flex items-center justify-start overflow-hidden rounded-full px-5 py-3 font-bold">
          <span className="absolute left-0 top-0 h-48 w-48 -translate-y-2 translate-x-12 rotate-45 bg-[#353639] opacity-[3%]"></span>
          <span className="absolute left-0 top-0 -mt-1 h-48 w-48 -translate-x-56 -translate-y-24 rotate-45 bg-[#353639] opacity-100 transition-all duration-500 ease-in-out group-hover:-translate-x-8"></span>
          <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-white">
            MORE PROJECTS SOON
          </span>
          <span className="absolute inset-0 rounded-full border-2 border-black"></span>
        </button>
      </div>
    </>
  );
};

export default Project;
