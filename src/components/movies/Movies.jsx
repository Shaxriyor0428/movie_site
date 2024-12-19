import React, { memo } from "react";
import MovieItem from "./MovieItem";

const Movies = ({ data }) => {
  return (
    <div className="container mb-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data?.results?.map((movie) => (
        <MovieItem key={movie?.id} {...movie} />
      ))}
    </div>
  );
};

export default memo(Movies);
