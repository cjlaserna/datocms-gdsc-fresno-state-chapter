import React, { useRef, useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Navigation, Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-cards"
import styles from "../../styles/component_css/OrganizerCarousel.module.css"

// fetch all & return results
// @TODO: REMOVE DOO DOO PLUGIN: INVIEW IT DOES NOT WORK
// @TODO: Look at this for in-view functionality https://github.com/modularorg/modularscroll
export default function Cards() {
  return (
    <div className="organizers flex flex-row items-start justify-start">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        loop={true}
        modules={[Autoplay, EffectCards]}
        className={styles.swiper + " organizerSwiper"}
        id="organizerSwiper"
      >
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 2</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 3</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 4</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 5</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 6</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 7</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 8</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide + " drop-shadow-md"}>Slide 9</SwiperSlide>
      </Swiper>
      <h1>Learn more about GDSC.</h1>
    </div>
  )
}
