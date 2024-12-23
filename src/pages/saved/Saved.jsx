import React from "react";
import { useSelector } from "react-redux";

const Saved = () => {
  const movies = useSelector((s) => s.saved.value);

  console.log(movies);
  return <div className="min-h-screen text-white">Saved</div>;
};

export default Saved;
