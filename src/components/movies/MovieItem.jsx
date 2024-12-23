import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const MovieItem = ({
  title,
  poster_path,
  vote_average,
  id,
  bg,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg  p-4 flex flex-col items-center ${
        bg ? "dark:bg-black" : "dark:bg-gray-800"
      }`}
    >
      <img
        onClick={() => navigate(`/product/${id}`)}
        src={`${import.meta.env.VITE_IMAGE_URL}${poster_path}`}
        alt={title}
        className="w-full h-[400px] object-cover rounded-md mb-4"
      />
      <h2
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
