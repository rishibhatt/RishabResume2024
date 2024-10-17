import React from "react";
import "./Hero.css";
import hero from "../../assets/images/hero.png";
const Hero = () => {
  return (
    <>
      <div
        className="h-full p-5 flex flex-col lg:flex-row justify-around border-b border-gray-300 "
        id="home"
      >
        <div className=" w-[30%] sm:mx-auto mr-[60%] p-3 sm:ml-20">
          <h1 className="hero-text font-inter font-extrabold mx-auto text-4xl lg:mt-20 lg:text-6xl p-5">
            MY NAME IS RISHAB BHATT,
            <span className="text-red-400">FRONTEND ENGINEER</span>
          </h1>
        </div>

        <img
          src={hero}
          className="h-[450px] w-[400px] mx-auto sm:mx-auto sm:h-[450px] sm:w-[450px] lg:h-auto lg:w-auto lg:mb-10"
        />
      </div>
    </>
  );
};

export default Hero;
