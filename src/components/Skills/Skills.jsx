import React from "react";
import "./Skills.css";
import {
  HTML_Img,
  CSS_Img,
  JS_Img,
  React_Img,
  Mongo_Img,
  Scss_Img,
  Tailwind_Img,
  Node_Img,
  Express_Img,
  Git_Img,
  Typescript_Img,
} from "../../assets/constants/constant.jsx";
const Skills = () => {
  return (
    <>
      <div
        className="p-5 text-center mt-20 border-b border-gray-300"
        id="skills"
      >
        <h2 className="skill-header   font-inter font-bold text-4xl lg:text-6xl">
          My Technical Skills
        </h2>
        <div data-aos="fade-up">
          <p className="subheading text-base lg:text-lg mt-3">
            Bringing ideas to life with these tools
          </p>
          <div className="skill-icons-container flex flex-wrap gap-4 p-5 mt-10 lg:w-[70%] mx-auto align-middle justify-center">
            <div className="border border-black flex gap-2 rounded-full w-28 lg:w-40 h-10 lg:h-12 align-middle text-center p-1 ">
              <img src={HTML_Img} className="lg:h-10 h-7 ml-2 rounded-full" />
              <p className="p-1 text-sm lg:text-lg">HTML</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-28 lg:w-36 h-10 lg:h-12  align-middle text-center p-1 ">
              <img src={CSS_Img} className="lg:h-10 h-7 ml-2 rounded-full" />
              <p className="p-1 text-sm lg:text-lg">CSS</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full  w-24 lg:w-36 h-10 lg:h-12 align-middle text-center p-1 ">
              <img src={JS_Img} className="lg:h-10 h-7 ml-2 rounded-full" />
              <p className="p-1 text-sm lg:text-lg">JS</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-34 lg:w-44 h-10 lg:h-12 align-middle text-center p-1 ">
              <img
                src={Typescript_Img}
                className="lg:h-10 h-7 ml-2 rounded-full"
              />
              <p className="p-1 text-sm lg:text-lg">TypeScript</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-28 lg:w-40 h-10 lg:h-12 align-middle text-center p-1 ">
              <img src={Scss_Img} className="lg:h-10 h-7 ml-2 rounded-full" />
              <p className="p-1 text-sm lg:text-lg">SCSS</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-34 lg:w-48 h-10 lg:h-12 align-middle text-center p-1 ">
              <img
                src={Tailwind_Img}
                className="lg:h-10 h-7 ml-2 rounded-full"
              />
              <p className="p-1 text-sm lg:text-lg">TailwindCSS</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-34 lg:w-48 h-10 lg:h-12 align-middle text-center p-1 ">
              <img src={React_Img} className="lg:h-10 h-7 ml-2 rounded-full" />
              <p className="p-1 text-sm lg:text-lg">ReactJS</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-28 lg:w-40 h-10 lg:h-12 align-middle text-center p-1 ">
              <img src={Node_Img} className="lg:h-10 h-7 ml-2 rounded-full" />
              <p className="p-1 text-sm lg:text-lg">NodeJs</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-36 lg:w-44 h-10 lg:h-12 align-middle text-center p-1 ">
              <img src={Mongo_Img} className="lg:h-10 h-7 ml-2 rounded-full" />
              <p className="p-1 text-sm lg:text-lg">MongoDB</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-40 lg:w-56 h-10 lg:h-12 align-middle text-center p-1 ">
              <img
                src={Express_Img}
                className="lg:h-10 h-7 ml-2 rounded-full"
              />
              <p className="p-1 text-sm lg:text-lg">ExpressJs</p>
            </div>
            <div className="border border-black flex gap-2 rounded-full w-28 lg:w-32 h-10 lg:h-12 align-middle text-center p-1 ">
              <img src={Git_Img} className="lg:h-10 h-7 ml-2 rounded-full" />
              <p className="p-1 text-sm lg:text-lg">Git</p>
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
};

export default Skills;
