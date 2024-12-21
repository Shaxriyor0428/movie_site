import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { HEADER_LINKS } from "../../static";
import { FaMoon } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "../../lang";
import englishFlag from "@/assets/flags/english.png";
import uzbekFlag from "@/assets/flags/uzbek.png";
import russianFlag from "@/assets/flags/russian.png";
import { MdLightMode } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

const LANGUAGES = [
  { label: "English", code: "en", flag: englishFlag },
  { label: "Uzbek", code: "uz", flag: uzbekFlag },
  { label: "Russian", code: "ru", flag: russianFlag },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  const [dark, setDark] = useState(
    localStorage.getItem("dark_mode") === "true" || true
  );
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const toggleDarkMode = () => {
    setDark((prevDark) => {
      const newDarkMode = !prevDark;
      localStorage.setItem("dark_mode", newDarkMode);
      return newDarkMode;
    });
  };

  function changeLang(e) {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
    localStorage.setItem("lang_code", lang_code);
  }

  const handleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <header
      id="header"
      className="w-full h-[80px] bg-white dark:bg-black sticky top-0 left-0 z-20 shadow-md"
    >
      <nav className="container relative mx-auto px-4 h-full flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4">
          <div>
            <button
              onClick={handleMenu}
              className="text-2xl text-black dark:text-white hidden max-[720px]:block"
            >
              <IoMenu />
            </button>
          </div>
          <Link to="/">
            <img src={logo} alt="logo" className="w-[112px] h-9" />
          </Link>
        </div>

        <ul className="hidden text-black dark:text-white gap-8 flex-wrap max-[720px]:hidden md:flex">
          {HEADER_LINKS.map((link) => (
            <li key={link.id} className="flex flex-col items-center">
              <NavLink
                to={link.url}
                className="flex flex-col items-center gap-1"
              >
                {link.icon}
                <p>{t(`header.nav.${link.title}`)}</p>
              </NavLink>
            </li>
          ))}
        </ul>

        {open && (
          <ul className="absolute top-[80px] left-0 w-full bg-white dark:bg-black text-black dark:text-white flex flex-col gap-4 p-4 shadow-lg md:hidden">
            {HEADER_LINKS.map((link) => (
              <li key={link.id} className="flex flex-col items-center">
                <NavLink
                  to={link.url}
                  className="flex flex-col items-center gap-1"
                  onClick={() => setOpen(false)}
                >
                  {link.icon}
                  <p>{t(`header.nav.${link.title}`)}</p>
                </NavLink>
              </li>
            ))}
            <button className="bg-blue-500 text-white font-medium text-sm py-2 px-4 rounded-lg hover:bg-blue-600 w-full">
              {t("header.login")}
            </button>
          </ul>
        )}

        <div className="flex items-center gap-5">
          <select
            className="bg-gray-300 dark:bg-slate-800 dark:text-white rounded-lg py-2 px-2 outline-none"
            defaultValue={localStorage.getItem("lang_code") || i18n.language}
            onChange={changeLang}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={toggleDarkMode}
            className="text-2xl text-gray-700 dark:text-white"
          >
            {dark ? <MdLightMode className="text-[gold]" /> : <FaMoon />}
          </button>

          <button className="bg-blue-500 text-white font-medium text-sm py-2 px-4 rounded-lg hover:bg-blue-600 max-[430px]:hidden">
            {t("header.login")}
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
