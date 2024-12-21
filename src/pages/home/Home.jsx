import React, { memo, useEffect, useState } from "react";
import Movies from "@/components/movies/Movies";
import { request } from "@/api";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";

const Home = () => {
  const {
    data: movie,
    isPending,
    error,
  } = useQuery({
    queryKey: ["movie"],
    queryFn: () =>
      request
        .get("/discover/movie", {
          params: {
            without_genre: "18,99",
          },
        })
        .then((res) => res.data),
  });
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      {isPending && (
        <div className="text-center text-2xl min-h-10 text-red-600">
          {" "}
          <Loading />
        </div>
      )}
      <Hero movies={movie?.results} />
      <Movies data={movie}  />
    </>
  );
};

export default memo(Home);
