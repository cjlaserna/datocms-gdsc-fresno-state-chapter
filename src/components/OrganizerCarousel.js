import React, { useRef, useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Navigation, Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-cards"
import inView from "in-view"

// fetch all & return results
export default function Cards() {
  useEffect(() => {
    const swiper = document.querySelector("#organizerSwiper").swiper
  }, [])

  inView.is("#organizerSwiper").on("enter", doSomething)

  inView.offset(-50)

  return (
    <div className="organizers flex flex-row items-start justify-start">
      <Swiper
        effect={"cards"}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        grabCursor={true}
        loop={true}
        modules={[Autoplay, EffectCards]}
        className="organizerSwiper"
        id="organizerSwiper"
      >
        <SwiperSlide className="drop-shadow-md">Slide 1</SwiperSlide>
        <SwiperSlide className="drop-shadow-md">Slide 2</SwiperSlide>
        <SwiperSlide className="drop-shadow-md">Slide 3</SwiperSlide>
        <SwiperSlide className="drop-shadow-md">Slide 4</SwiperSlide>
        <SwiperSlide className="drop-shadow-md">Slide 5</SwiperSlide>
        <SwiperSlide className="drop-shadow-md">Slide 6</SwiperSlide>
        <SwiperSlide className="drop-shadow-md">Slide 7</SwiperSlide>
        <SwiperSlide className="drop-shadow-md">Slide 8</SwiperSlide>
        <SwiperSlide className="drop-shadow-md">Slide 9</SwiperSlide>
      </Swiper>
      <h1>Learn more about GDSC.</h1>
    </div>
  )
}
