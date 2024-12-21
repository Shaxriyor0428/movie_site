import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/loading/Loading";
import translate from "translate";

const Detail = () => {
  const [translatedCountries, setTranslatedCountries] = useState([]);
  const [translatedGenres, setTranslatedGenres] = useState([]);
  const [translatedJobs, setTranslatedJobs] = useState([]);
  const [translatedCasts, setTranslatedCasts] = useState([]);

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

  useEffect(() => {
    const translateAllData = async () => {
      try {
        if (data?.production_countries) {
          const translatedCountries = await Promise.all(
            data.production_countries.map((country) =>
              translate(country.name, "ru")
            )
          );
          setTranslatedCountries(translatedCountries);
        }

        if (data?.genres) {
          const translatedGenres = await Promise.all(
            data.genres.map((genre) => translate(genre.name, "ru"))
          );
          setTranslatedGenres(translatedGenres);
        }

        if (credits?.crew) {
          const translatedCrew = await Promise.all(
            credits.crew
              .filter((member) => member.job === "Director")
              .map((member) => translate(member.name, "ru"))
          );
          setTranslatedJobs(translatedCrew);
        }

        if (credits?.cast) {
          const translatedCasts = await Promise.all(
            credits.cast.slice(0, 5).map(async (member) => ({
              name: await translate(member.name, "ru"),
              character: await translate(member.character, "ru"),
            }))
          );
          setTranslatedCasts(translatedCasts);
        }
      } catch (error) {
        console.error("Tarjima jarayonida xatolik yuz berdi:", error);
      }
    };

    translateAllData();
  }, [data, credits]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}ч ${remainingMinutes}м / ${minutes} минут`;
  };

  if (
    isLoading ||
    isImageLoading ||
    isSimilarLoading ||
    !translatedCountries.length
  ) {
    return (
      <div className="text-center text-2xl min-h-10 text-red-600">
        <Loading />
      </div>
    );
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

      <div className="container mx-auto px-4 py-8 flex flex-col justify-center items-center ">
        <h2 className="text-2xl font-bold mb-4">Overview</h2>
        <p className="dark:text-gray-300 mb-8">{data.overview}</p>

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

        <div className="detail-list w-[380px] mt-12">
          <div className="first-buttons grid grid-cols-2">
            <button className="bg-[#111111] text-white py-4 px-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all">
              Билеты
            </button>
            <button className="bg-[#1D1D1D] text-primary py-4 px-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-all">
              О Фильме
            </button>
          </div>

          <div className="Detali border-b pb-8 border-[#2D2D2D]">
            <h3 className="mt-12 text-white text-xl">Детали</h3>
            <div className="flex flex-wrap justify-between mt-6">
              <p className="text-sm ">Продолжительность</p>
              <p className="text-sm ">{formatTime(data?.runtime)}</p>
            </div>
            <div className="flex flex-wrap justify-between mt-4">
              <p className="text-sm ">Премьера</p>
              <p className="text-sm ">
                {new Date(data?.release_date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-wrap justify-between mt-4">
              <p className="text-sm ">Производство</p>
              <p className="text-sm ">{translatedCountries.join(", ")}</p>
            </div>
            <div className="flex flex-wrap justify-between mt-4">
              <p className="text-sm ">Жанр</p>
              <p className="text-sm ">
                {translatedGenres.slice(0, 2).join(", ")}
              </p>
            </div>
            <div className="flex flex-wrap justify-between mt-4">
              <p className="text-sm ">Режиссер</p>
              <p className="text-sm ">
                {translatedJobs.join(", ") || "Майк Митчелл, Стефани Стайн"}
              </p>
            </div>
          </div>

          <div className="Roli border-b pb-8 border-[#2D2D2D]">
            <h3 className="mt-12 text-white text-xl">В ролях</h3>
            {translatedCasts.map((member, index) => (
              <div key={index} className="flex flex-wrap justify-between mt-6">
                <p className="text-sm ">{member.name}</p>
                <p className="text-sm ">{member.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
