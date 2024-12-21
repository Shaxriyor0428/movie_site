import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";
import translate from "translate";

const Detail = () => {
  translate.engine = "google";
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const { data, isLoading } = useQuery({
    queryKey: [`movie/${id}`],
    queryFn: () =>
      request
        .get(`movie/${id}`, { params: { without_genre: "18,99" } })
        .then((res) => res.data),
  });

  const { data: images, isLoading: isImageLoading } = useQuery({
    queryKey: [`movie/${id}/images`],
    queryFn: () => request.get(`movie/${id}/images`).then((res) => res.data),
  });

  const { data: similar, isLoading: isSimilarLoading } = useQuery({
    queryKey: [`movie/${id}/similar`],
    queryFn: () => request.get(`movie/${id}/similar`).then((res) => res.data),
  });

  const { data: credits } = useQuery({
    queryKey: [`movie/${id}/credits`],
    queryFn: () => request.get(`movie/${id}/credits`).then((res) => res.data),
  });

  if (isLoading || isImageLoading || isSimilarLoading) {
    return (
      <div className="text-center text-2xl min-h-10 text-red-600">
        {" "}
        <Loading />
      </div>
    );
  }

  // credits?.cast.map((item) => (translate(item.character,"ru").then(res => console.log(res))));

  return (
    <div className="min-h-screen dark:bg-black dark:text-white text-black">
      <div
        className="relative w-full h-[700px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${
            import.meta.env.VITE_IMAGE_URL + data.backdrop_path
          })`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <p className="text-gray-300 mt-2">
              Release Date: {data.release_date}
            </p>
            <p className="text-yellow-400 mt-2">
              Rating: {data.vote_average} / 10
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-black ">Overview</h2>
        <p className="dark:text-gray-300 mb-8 text-black">{data.overview}</p>

        {images && images.backdrops.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Images</h2>
            <div className="flex flex-wrap gap-4">
              {images.backdrops.slice(0, 10).map((image, index) => (
                <img
                  key={index}
                  src={import.meta.env.VITE_IMAGE_URL + image.file_path}
                  alt="Movie Scene"
                  className="w-56 h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        )}

        {similar && similar.results.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
            <div className="flex flex-wrap gap-4">
              {similar.results.slice(0, 10).map((movie) => (
                <div key={movie.id} className="w-56">
                  <img
                    onClick={() => navigate(`/product/${movie.id}`)}
                    src={import.meta.env.VITE_IMAGE_URL + movie.poster_path}
                    alt={movie.title}
                    className="w-56 h-80 object-cover rounded-lg mb-2"
                  />
                  <p className="text-center">{movie.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
