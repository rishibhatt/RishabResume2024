import React from "react";
import link from "../../assets/images/link.png";
import logo from "../../assets/images/logo.png";
import cv from "../../assets/images/cv.png";
import email from "../../assets/images/email.png";
import { Link, animateScroll as scroll } from "react-scroll";
const Footer = () => {
  return (
    <>
      <div className="p-5 text-left mt-20" id="contact">
        <div className="flex justify-between lg:w-[80%] lg:justify-start mx-auto  pb-16 pl-14 border-b border-black">
          <span className="text-4xl font-inter text-[#353639] font-extrabold md:text-6xl  ">
            LET'S TALK
          </span>
          <a
            href="https://wa.me/918360558587?text=Hi%20there!%20I'd%20like%20to%20get%20in%20touch%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer border font-mono border-black  flex gap-2 text-center justify-center mx-auto items-center h-12 w-40 text-base lg:h-16 lg:w-48 lg:text-lg lg:mr-[40%]"
          >
            Contact <img src={link} className="lg:h-6 h-4 mb-0.5" />
          </a>
        </div>
        <div className="flex flex-wrap justify-around mt-16 w-full border border-b-gray-300 pb-10">
          <div className="flex flex-col   lg:flex-row justify-around items-center w-1/4">
            <ul className="">
              <li className="cursor-pointer hover:underline">
                <Link
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  Home
                </Link>
              </li>
            </ul>
            <ul>
              <li className="cursor-pointer hover:underline">
                <Link
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  ABOUT
                </Link>
              </li>
            </ul>
            <ul>
              <li className="cursor-pointer hover:underline">
                <Link
                  to="experience"
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                >
                  EXPERIENCE
                </Link>
              </li>
            </ul>
          </div>
          <div className=" w-1/4">
            <ul className="flex flex-col lg:flex-row gap-2 md:gap-5 items-center mx-auto">
              <li className=" ">
                <a
                  className=""
                  href="https://www.instagram.com/rishibhatt.007/"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://www.linkedin.com/in/rishab-bhatt-7ba7111ab/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="https://github.com/rishibhatt">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </li>
              <li>
                <a href="mailto:bhattrishu07@gmail.com">
                  <img src={email} className="h-10 w-10" />{" "}
                </a>
              </li>
              <li>
                <a href="https://drive.google.com/file/d/1XY8HNk1q3pQ-LPw7RmLqkhNadLPsud5E/view?usp=sharing">
                  <img src={cv} className="h-10 w-10" />{" "}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex ">
          <div className="text-gray-500 text-left p-3 mt-2">
            Made with ❤️ by Rishie
          </div>
          <img
            src={logo}
            className="rounded-full h-14  mt-2 pl-2 py-1 border border-black"
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
