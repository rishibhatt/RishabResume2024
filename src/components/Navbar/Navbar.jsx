import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import menu from "../../assets/images/menu.png";
import cross from "../../assets/images/cross.png";
import { blogLink } from "../../assets/constants/constant";
import Navmenu from "./Navmenu";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuBtn, setMenuBtn] = useState(menu);
  const toggleMenu = () => {
    setMenuBtn(!menuOpen ? cross : menu);
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  };
  return (
    <>
      <div className="nav-container bg-transparent flex justify-between p-5 mt-3 sm:w-[80%] w-[90%] mx-auto rounded-full shadow-lg ring-1 ring-black/5 relative z-20">
        <button className="pl-5">
          <img src={menuBtn} onClick={toggleMenu} className="h-8 z-20" />
        </button>
        <div className="flex  text-center align-baseline">
          <img src={logo} className="h-10 " />
          <h2 className="hidden sm:block  text-xl mt-0.5  font-inter font-bold">
            Rishab Bhatt
          </h2>
        </div>
        <a className="pr-5">
          <a href={blogLink}>
            <h2 className=" mt-0.5">Blogs</h2>
          </a>
        </a>
      </div>
      {menuOpen && <Navmenu closemenu={toggleMenu} />}
    </>
  );
};

export default Navbar;
