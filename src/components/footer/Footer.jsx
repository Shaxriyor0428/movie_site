import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import {
  MdLocalMovies,
  MdTheaterComedy,
  MdSportsSoccer,
  MdEvent,
} from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";
import { PiStarFour } from "react-icons/pi";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import logo from "@/assets/logos/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-10 mt-24">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex space-x-2 items-center mb-4">
            <img
              src={logo}
              alt="logo"
              className="w-[55px] h-9 cursor-pointer hover:opacity-75"
            />
          </div>
          <div className="mb-4">
            <Link href="#" className="block mb-2">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="w-36 cursor-pointer hover:opacity-75"
              />
            </Link>
            <Link href="#" className="block">
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="w-36 cursor-pointer hover:opacity-75"
              />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">About us</h3>
          <ul>
            <li className="hover:underline hover:text-red-500 cursor-pointer mb-2 flex items-center">
              <IoDocumentTextSharp className="text-red-500 mr-2" />
              Public offer
            </li>
            <li className="hover:underline hover:text-red-500 cursor-pointer mb-2 flex items-center">
              <PiStarFour className="text-red-500 mr-2" />
              Advertising
            </li>
            <li className="hover:underline hover:text-red-500 cursor-pointer mb-2 flex items-center">
              <FaRegCircleQuestion className="text-red-500 mr-2" />
              F.A.Q
            </li>
            <li className="hover:underline hover:text-red-500 cursor-pointer flex items-center">
              <FiPhone className="text-red-500 mr-2" />
              Contacts
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul>
            <li className="hover:underline hover:text-red-500 cursor-pointer mb-2 flex items-center">
              <MdLocalMovies className="text-red-500 mr-2" /> Movie
            </li>
            <li className="hover:underline hover:text-red-500 cursor-pointer mb-2 flex items-center">
              <MdTheaterComedy className="text-red-500 mr-2" /> Theatre
            </li>
            <li className="hover:underline hover:text-red-500 cursor-pointer mb-2 flex items-center">
              <MdEvent className="text-red-500 mr-2" /> Concerts
            </li>
            <li className="hover:underline hover:text-red-500 cursor-pointer flex items-center">
              <MdSportsSoccer className="text-red-500 mr-2" /> Sport
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact us</h3>
          <p className="text-red-500 mb-6 cursor-pointer hover:underline hover:text-red-600">
            +998 (95) 897-33-38
          </p>
          <h3 className="text-lg font-semibold mb-4">Social media</h3>
          <div className="flex space-x-4">
            <FaInstagram className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition" />
            <FaFacebookF className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition" />
            <FaYoutube className="text-red-500 text-2xl cursor-pointer hover:text-red-600 transition" />
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} Your Company. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
