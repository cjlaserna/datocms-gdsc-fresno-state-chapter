import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper"
import "swiper/css"
import styles from "../../styles/component_css/HighlightCarousel.module.css"
import randomBanners from "./utils/RandomBanners"
import { Image as ImgDato } from "react-datocms"
import Image from "next/image"
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi"
import Link from "next/link"

// display them one at a time, big carousel stuff

export default function Highlights({ allHighlights }) {
  console.log(allHighlights)
  return (
    <section className="h-[20em] lg:h-[30em] md:h-[20em] sm:h-[20em] flex justify-center relative items-center">
      <div className={styles.swiper_button_prev + " swiper-button-prev swiper-button hidden md:block"}>
        <FiChevronLeft />
      </div>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-navigation-size": "1rem",
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        grabCursor={false}
        modules={[Autoplay, Navigation]}
        className="highlights h-[20em] lg:h-[30em] md:h-[20em] sm:h-[20em]"
      >
        {allHighlights?.map((highlight) => {
          console.log(highlight)
          return (
            <SwiperSlide
              className={
                styles.swiperSlide + " h-[20em] lg:h-[30em] md:h-[20em] sm:h-[20em] relative rounded-lg bg-base-100"
              }
            >
              <div className=" hidden md:inline-block">
                {highlight.heroImage ? (
                  <ImgDato
                    data={highlight.heroImage.responsiveImage}
                    className="!absolute top-0 left-0 z-[-1] object-cover rounded-lg"
                  />
                ) : (
                  <Image
                    src={randomBanners()}
                    layout="fill"
                    className="absolute top-0 left-0 z-[-1] object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="flex flex-col w-full h-full">
                <div className="bg-transparent text-base-content md:bg-base-100/75 md:text-base-content m-0 sm:m-0 md:my-10 lg:my-10 m-0 md:mx-20 lg:mx-20 max-w-[100%] sm:max-w[100%] lg:max-w-[50%] rounded-lg p-10 flex flex-col">
                  <h3 className="font-semibold text-lg md:text-2xl lg:text-3xl">{highlight.heroTitle}</h3>
                  <p>{highlight.projectDescription}</p>
                </div>
                {highlight.readMorePage.slug ? (
                  <div className="flex justify-end items-end w-full flex-1 p-10 z-[100]">
                    <a class="btn btn-primary gap-2 w-fit-content" href={`/pages/${highlight.readMorePage.slug}`}>
                      Learn More
                      <FiArrowRight />
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <div className={styles.swiper_button_next + " swiper-button-next swiper-button hidden md:block"}>
        <FiChevronRight />
      </div>
    </section>
  )
}
