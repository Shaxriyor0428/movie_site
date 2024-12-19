import React, { memo } from "react";
import MovieItem from "./MovieItem";

const Movies = ({ data }) => {
  return (
    <div className="flex gap-[20px] flex-wrap container mb-14">
      {data?.results?.map((movie) => (
        <MovieItem key={movie?.id} {...movie} />
      ))}
    </div>
  );
};

export default memo(Movies);
