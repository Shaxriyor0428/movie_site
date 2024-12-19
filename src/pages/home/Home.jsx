import React, { memo, useEffect, useState } from "react";
import Movies from "@/components/movies/Movies";
import { request } from "@/api";
import { useLocation } from "react-router-dom";
import Hero from "./Hero";
import Carousel from "./Carousel";

const Home = () => {
  const location = useLocation();
  const [data, setData] = useState(null);
  useEffect(() => {
    request
      .get("/discover/movie")
      .then((res) => setData(res.data))
      .catch((err) => alert("ERROR ON HOME", err?.response?.data));
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Hero movies={data?.results} />
      {/* <Carousel data={data?.results}/> */}
      <Movies data={data} />
    </>
  );
};

export default memo(Home);
