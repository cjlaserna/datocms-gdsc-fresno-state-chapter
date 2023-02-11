import React, { useRef, useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCards, Navigation, Autoplay, Pagination } from "swiper"
import "swiper/css"
import "swiper/css/effect-cards"
import styles from "../../styles/component_css/OrganizerCarousel.module.css"
import InitialsAvatar from "react-initials-avatar"
import "react-initials-avatar/lib/ReactInitialsAvatar.css"
import Link from "next/link"
import { Image } from "react-datocms"
import { BsMouse } from "react-icons/bs"

// fetch all & return results
// @TODO: REMOVE DOO DOO PLUGIN: INVIEW IT DOES NOT WORK
// @TODO: Look at this for in-view functionality https://github.com/modularorg/modularscroll
export default function Cards({ allOrganizers }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 bg-base-100 shadow-md pb-10">
      <div className="organizers flex flex-col items-center justify-center">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          loop={true}
          modules={[Autoplay, EffectCards]}
          className={styles.swiper + " organizerSwiper"}
          id="organizerSwiper"
        >
          {allOrganizers?.map((organizer) => {
            return (
              <SwiperSlide className={styles.swiperSlide + " shadow-xl cardParent"}>
                <div className="h-full flex flex-col justify-center items-center">
                  {organizer.picture ? (
                    <Image
                      data={organizer.picture.responsiveImage}
                      className=" object-cover rounded-full !h-[100px] !w-[100px] cardParent"
                    />
                  ) : (
                    <InitialsAvatar name={organizer.name} className="initials-avatar !h-[100px] !w-[100px]" />
                  )}
                  <div className="flex flex-col justify-end items-center  w-full cardParent">
                    <div className="bg-base-100 my-2 p-3 rounded-md text-center  w-full cardParent">
                      <h3 className="text-info-content text-lg font-bold cardParent">{organizer.name}</h3>
                      <p>{organizer.clubPosition}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="my-4">
          <BsMouse className="inline mr-[5px]" />
          <span>Swipe to View All</span>
        </div>
      </div>

      <div className="col-span-2 h-full">
        <p className="mt-5 text-lg m-5">
          Google Developer Student Clubs are university based community groups for students interested in Google
          developer technologies. Students from all undergraduate or graduate programs with an interest in growing as a
          developer are welcome. By joining a GDSC, students grow their knowledge in a peer-to-peer learning environment
          and build solutions for local businesses and their community.
        </p>

        <div className="flex justify-end items-end p-5 flex-1">
          <Link href="https://gdsc.community.dev/" target="_blank">
            <a className="btn btn-primary">Visit Official Site</a>
          </Link>
        </div>
      </div>
    </div>
  )
}
