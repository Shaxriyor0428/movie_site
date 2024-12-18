import React from "react";
import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { HEADER_LINKS } from "../../static";

const Header = () => {
  return (
    <header
      id="header"
      className="w-full h-[80px] bg-secondary sticky top-0 left-0 z-20"
    >
      <nav className="w-[1212px] h-full px-4 mx-auto flex items-center justify-between">
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-[112px] h-9" />
          </Link>
        </div>

        <ul className="flex text-white gap-10">
          {HEADER_LINKS.map((link) => (
            <li key={link.id} className="flex flex-col items-center">
              <NavLink
                to={link.url}
                className="flex flex-col items-center gap-1"
              >
                {link.icon}
                <p>{link.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>

        <ul className="flex gap-5 items-center">
          <li className="text-white">
            <p>UZ</p>
          </li>
          <li>
            <button className="bg-primary text-white font-medium text-[16px] leading-5 rounded-lg py-[18px] px-[67px]">
              Login
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
