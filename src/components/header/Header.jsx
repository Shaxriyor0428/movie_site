import React, { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { HEADER_LINKS } from "../../static";
import { FaMoon, FaRegSun } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import i18n from "@/lang/index";

import englishFlag from "@/assets/flags/english.png";
import uzbekFlag from "@/assets/flags/uzbek.png";
import russianFlag from "@/assets/flags/russian.png";

const LANGUAGES = [
  { label: "English", code: "en", flag: englishFlag },
  { label: "Uzbek", code: "uz", flag: uzbekFlag },
  { label: "Russian", code: "ru", flag: russianFlag },
];

const Header = () => {
  const [dark, setDark] = useState(true);
  const { i18n, t } = useTranslation();

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  function changeLang(e) {
    const lang_code = e.target.value;
    i18n.changeLanguage(lang_code);
  }

  return (
    <header className="w-full h-[80px] bg-white dark:bg-black sticky top-0 left-0 z-20 shadow-md">
      <nav className="container mx-auto px-4 h-full flex items-center justify-between flex-wrap">
        <Link to="/">
          <img src={logo} alt="logo" className="w-[112px] h-9 " />
        </Link>

        <ul className="flex text-black dark:text-white gap-5 flex-wrap">
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

        <div className="flex items-center gap-5">
          <select
            className="bg-gray-300 dark:bg-slate-800 dark:text-white rounded-lg py-2 px-2 outline-none flex items-center gap-2"
            defaultValue={i18n.language}
            onChange={changeLang}
          >
            {LANGUAGES.map((lang) => (
              <option
                key={lang.code}
                value={lang.code}
                className="flex items-center gap-2"
              >
                {lang.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setDark(!dark)}
            className="text-2xl text-gray-700 dark:text-white"
          >
            {dark ? <FaRegSun /> : <FaMoon />}
          </button>

          <button className="bg-blue-500 text-white font-medium text-sm py-2 px-4 rounded-lg hover:bg-blue-600">
            {t("header.login")}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
