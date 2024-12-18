import React, { memo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

const Hero = ({ movies }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const heroItems1 = movies?.map((movie) => (
    <SwiperSlide key={movie.id} className=" relative">
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}${movie.backdrop_path}`}
        alt={movie?.title}
      />
      <div className=" absolute left-0 bottom-[28px] text-white flex flex-col items-center justify-center gap-2 w-full">
        <h2 className=" text-[32px] font-medium leading-10">{movie.title} </h2>
        <p className="text-sm leading-4"> {movie.release_date}</p>
        <span>raring: {movie.vote_average} </span>
        <button className="bg-white text-primary py-[14px] px-[137px] rounded-lg text-[16px] font-medium">
          Ko'rish
        </button>
      </div>
    </SwiperSlide>
  ));
  const heroItems2 = movies?.map((movie) => (
    <SwiperSlide key={movie.id} className=" relative">
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}${movie.backdrop_path}`}
        alt={movie?.title}
      />
    </SwiperSlide>
  ));
  return (
    <div className=" mb-10">
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 container h-screen"
      >
        {heroItems1}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        navigation={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper container"
      >
        {heroItems2}
      </Swiper>
    </div>
  );
};

export default memo(Hero);
