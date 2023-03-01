import React from "react"
import EventCard from "./EventCard"

export default function Events({ allEvents }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-x-[0] gap-y-10">
      {allEvents?.map((event) => {
        var eventLink
        var eventBtn
        if (event.archive) {
          eventLink = `/pages/${event.archive.slug}`
          eventBtn = event.customBtnText ? event.customBtnText : "Learn More"
        } else if (event.externalLink) {
          eventLink = event.externalLink
          eventBtn = event.customBtnText ? event.customBtnText : "Learn More"
        } else if (event.workshopLink) {
          eventLink = event.workshopLink
          eventBtn = event.customBtnText ? event.customBtnText : "Watch Recording"
        } else if (event.zoomLinkIfAny) {
          eventLink = event.zoomLinkIfAny
          eventBtn = event.customBtnText ? event.customBtnText : "Join Online"
        } else {
          eventLink = null
        }
        return (
          <EventCard
            cardTitle={event.eventName}
            cardDesc={event.eventDesc}
            buttonTitle={eventBtn}
            cardLoc={event.eventLocation}
            cardDate={event.eventDate}
            buttonLink={eventLink}
            key={event.id}
          />
        )
      })}
    </div>
  )
}

// @TODO: When allEvents > 10, add a load more btn so it doesn't load all events at once
