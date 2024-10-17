import React, { useEffect } from "react";
import "./About.css";
import Rishi from "../../assets/images/Rishi.png";
import comma from "../../assets/images/quotation-mark.png";

const About = () => {
  return (
    <>
      <div
        className="p-5 text-center mt-20 border-b border-gray-300"
        id="about"
      >
        <h2 className="about-header font-inter font-bold text-4xl lg:text-6xl">
          About Me !
        </h2>
        <img
          alt="image"
          src={Rishi}
          className="h-32 w-28 rounded-full mx-auto border border-gray-400 p-2 mt-16"
        />
        <div className="" data-aos="fade-up">
          <img src={comma} className="h-10 p-0 sm:ml-[15%]" />
          <p className="text-2xl px-8 pb-8 sm:w-[70%] mx-auto lg:text-4xl text-gray-500 ">
            Driven by curiosity and creativity, I thrive on turning complex
            problems into elegant solutions.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
