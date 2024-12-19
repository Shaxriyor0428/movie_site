import React, { memo } from "react";

const MovieItem = ({ title, poster_path, vote_average }) => {
  
  return (
    <div className="w-56 rounded-md flex flex-col gap-2">
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}${poster_path}`}
        alt=""
        className=""
      />
      <h2 className=" font-medium text-[24px] leading-7 text-white line-clamp-1">
        {title}
      </h2>
      <p className="text-[#4D4D4D] text-sm font-medium">{vote_average}</p>
    </div>
  );
};

export default memo(MovieItem);
