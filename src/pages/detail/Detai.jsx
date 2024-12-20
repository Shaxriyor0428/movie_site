import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "@/api";

const Detail = () => {
  const [data, setData] = useState(null);
  const [images, setImages] = useState(null);
  const [similar, setSimilar] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    request.get(`movie/${id}`).then((res) => setData(res.data));
  }, [id]);

  useEffect(() => {
    request.get(`movie/${id}/images`).then((res) => setImages(res.data));
  }, [id]);

  useEffect(() => {
    request.get(`movie/${id}/similar`).then((res) => setSimilar(res.data));
  }, [id]);

  if (!data) {
    return <div className="text-center text-white">Loading...</div>;
  }

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
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end">
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
