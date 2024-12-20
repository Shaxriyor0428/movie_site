import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

const MovieItem = ({ title, poster_path, vote_average, id }) => {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-gray-800 p-4 flex flex-col items-center">
      <img
        onClick={() => navigate(`/product/${id}`)}
        src={`${import.meta.env.VITE_IMAGE_URL}${poster_path}`}
        alt={title}
        className="w-full h-[400px] object-cover rounded-md mb-4"
      />
      <h2 className="font-medium text-[20px] text-white text-center mb-2 line-clamp-1">
        {title}
      </h2>
      <p className="text-gray-400 text-sm font-medium">
        ⭐ {vote_average !== undefined ? vote_average : "N/A"}
      </p>
    </div>
  );
};

export default memo(MovieItem);
