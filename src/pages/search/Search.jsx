import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "@tanstack/react-query";
import { request } from "../../api";
import Movies from "../../components/movies/Movies";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["discover/movie", page, selectedGenre],
    queryFn: () =>
      request
        .get("/discover/movie", {
          params: {
            page: page,
            without_genres: "18,10749,99",
            with_genres: selectedGenre.join(","),
          },
        })
        .then((res) => res.data),
  });

  useEffect(() => {
    if (error) {
      toast.error("Film not found !");
      navigate("/");
    }
  }, [error, navigate]);

  const { data: genres, isLoading: isGenresLoading } = useQuery({
    queryKey: ["/genre/movie/list"],
    queryFn: () =>
      request.get("/genre/movie/list").then((res) => res.data.genres),
  });

  if (error) {
    return alert("This film not found", error?.message);
  }
  const handleGenreChange = (id) => {
    setSelectedGenre((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
    setPage(1);
  };

  if (isGenresLoading || isLoading) {
    return (
      <div className="text-center text-2xl min-h-screen flex justify-center items-center text-red-600 ">
        {" "}
        <Loading />
      </div>
    );
  }
  // return (
  //   // <div id="search" className="text-white min-h-screen ">
  //   //   <div className="container mx-auto px-4">
  //   //     <h2 className="text-red-500 text-3xl text-center font-bold py-4">
  //   //       <i>Kinolarni janr bo‘yicha qidirish</i>
  //   //     </h2>

  //   //     <div className="mb-6">
  //   //       <h3 className="dark:text-white text-lg font-medium mb-2 text-black">
  //   //         Kino Janrlari:
  //   //       </h3>
  //   //       <div className="genre-scrollbar flex gap-4 overflow-x-auto py-2">
  //   //         {[
  //   //           ...genres?.filter((genre) => selectedGenre.includes(genre.id)),
  //   //           ...genres?.filter((genre) => !selectedGenre.includes(genre.id)),
  //   //         ].map((genre) => (
  //   //           <button
  //   //             key={genre.id}
  //   //             onClick={() => handleGenreChange(genre.id)}
  //   //             className={`py-2 px-4 rounded-md border border-red-500 transition-all duration-300 whitespace-nowrap ${
  //   //               selectedGenre.includes(genre.id)
  //   //                 ? "dark:bg-green-500 dark:text-white bg-blue-500 border-none"
  //   //                 : "dark:bg-slate-800 dark:text-gray-300 text-black dark:hover:bg-red-500 hover:bg-red-500 hover:text-white"
  //   //             }`}
  //   //           >
  //   //             {genre.name}
  //   //           </button>
  //   //         ))}
  //   //       </div>
  //   //     </div>

  //   //     <div className="mb-6">
  //   //       {data?.results?.length > 0 ? (
  //   //         <Movies data={data} bg={"bg-gray-800"} />
  //   //       ) : (
  //   //         <div className="text-center text-lg font-semibold text-gray-300">
  //   //           Ushbu janr bo‘yicha film topilmadi.
  //   //         </div>
  //   //       )}
  //   //     </div>

  //   //     <div className="flex justify-center py-4">
  //   //       <Pagination
  //   //         page={page}
  //   //         onChange={handleChange}
  //   //         size="large"
  //   //         count={data?.total_pages <= 500 ? data?.total_pages : 500}
  //   //         variant="outlined"
  //   //         shape="circular"
  //   //         color="primary"
  //   //         className="text-white"
  //   //         sx={{
  //   //           "& .MuiPaginationItem-root": {
  //   //             color: "#fff",
  //   //             backgroundColor: "#000",
  //   //             border: "1px solid #ff4040",
  //   //             "&:hover": {
  //   //               backgroundColor: "#ff4040",
  //   //               color: "#00bfff",
  //   //             },
  //   //             "&:focus": {
  //   //               outline: "2px solid #ff7373",
  //   //             },
  //   //           },
  //   //           "& .Mui-selected": {
  //   //             backgroundColor: "#ff4040",
  //   //             color: "#fff",
  //   //             border: "1px solid #ff7373",
  //   //             "&:hover": {
  //   //               backgroundColor: "#ff7373",
  //   //             },
  //   //           },
  //   //           "& .MuiPaginationItem-ellipsis": {
  //   //             color: "#ff7373",
  //   //           },
  //   //           "& .MuiPagination-ul": {
  //   //             gap: "8px",
  //   //           },
  //   //         }}
  //   //       />
  //   //     </div>
  //   //   </div>
  //   // </div>
  // );
};

export default Search;
