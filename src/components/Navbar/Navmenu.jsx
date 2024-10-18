import React, { useRef } from "react";
import "./Navmenu.css";
import cv from "../../assets/images/cv.png";
import email from "../../assets/images/email.png";
import { Link, animateScroll as scroll } from "react-scroll";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Navmenu = ({ closemenu }) => {
  const gsapRef = useRef();
  useGSAP(() => {
    gsap.to(gsapRef.current, {
      display: "flex",
      height: "100%",
      duration: 1,
      ease: "back.out(1.7)",
    });
  });
  return (
    <>
      <div
        ref={gsapRef}
        className="navmenu-container hidden cursor-pointer font-inter backdrop-blur-2xl opacity-90 p-10 text-black  w-full absolute top-0 left-0  flex-col justify-evenly z-10 "
      >
        <Link
          to="home"
          onClick={closemenu}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          Home
        </Link>
        <Link
          to="about"
          onClick={closemenu}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          About
        </Link>

        <Link
          to="skills"
          onClick={closemenu}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          Skills
        </Link>
        <Link
          to="projects"
          onClick={closemenu}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          Projects
        </Link>

        <Link
          to="experience"
          onClick={closemenu}
          spy={true}
          smooth={true}
          offset={-100}
          duration={500}
        >
          Experience
        </Link>
        <Link
          to="contact"
          onClick={closemenu}
          spy={true}
          smooth={true}
          offset={-100}
          duration={1000}
        >
          Contact
        </Link>

        <ul className="flex gap-4 ">
          <li className=" ">
            <a className="" href="https://www.instagram.com/rishibhatt.007/">
              Instagram
            </a>
          </li>

          <li>
            <a href="https://www.linkedin.com/in/rishab-bhatt-7ba7111ab/">
              LinkedIn
            </a>
          </li>

          <li>
            <a href="https://github.com/rishibhatt">Git</a>
          </li>
          <li>
            <a href="mailto:bhattrishu07@gmail.com">Email</a>
          </li>
          <li>
            <a href="https://drive.google.com/file/d/1XY8HNk1q3pQ-LPw7RmLqkhNadLPsud5E/view?usp=sharing">
              CV
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navmenu;
