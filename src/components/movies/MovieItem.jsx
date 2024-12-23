import React, { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { savedMovies } from "../../redux/slices/Saved";

const MovieItem = ({ title, poster_path, vote_average, id, bg, data }) => {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.saved.value);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSave = (product) => {
    const isSaved = movies.some((movie) => movie.id === product.id);
    const isDark = localStorage.getItem("dark_mode") || true;
    if (isSaved) {
      const updatedMovies = movies.filter((movie) => movie.id !== product.id);
      dispatch(savedMovies(updatedMovies));
      toast.success(t("toast_messages.removed.title"), {
        style: {
          borderRadius: "10px",
          background: isDark ? "#333" : "white",
          color: isDark ? "red" : "black",
        },
      });
    } else {
      const updatedMovies = [...movies, product];
      dispatch(savedMovies(updatedMovies));
      toast.success(t("toast_messages.saved.title"), {
        style: {
          borderRadius: "10px",
          background: isDark ? "#333" : "white",
          color: isDark ? "#fff" : "black",
        },
      });
    }
  };

  return (
    <div
      className={`rounded-lg relative overflow-hidden shadow-lg  p-4 flex flex-col items-center ${
        bg ? "dark:bg-black" : "dark:bg-gray-800"
      }`}
    >
      <button
        onClick={() => handleSave(data)}
        className="absolute top-7 right-7 text-3xl font-bold"
      >
        <FaSave className="text-red-500 " />
      </button>
      <img
        onClick={() => navigate(`/product/${id}`)}
        src={`${import.meta.env.VITE_IMAGE_URL}${poster_path}`}
        alt={title}
        className="w-full h-[400px] object-cover rounded-md mb-4"
      />
      <h2
        title={title}
        className={`font-medium text-[20px] text-red-500 text-center mb-2 line-clamp-1 ${
          bg && "dark:text-white"
        }`}
      >
        {title}
      </h2>
      <p className="text-gray-500 text-sm font-medium ">
        ⭐ {vote_average !== undefined ? vote_average : "N/A"}
      </p>
    </div>
  );
};

export default memo(MovieItem);
