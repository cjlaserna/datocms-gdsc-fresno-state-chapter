import Layout from "../src/components/Layout"
import { request } from "../lib/datocms"
import { renderMetaTags } from "react-datocms"
import { useQuerySubscription } from "react-datocms"
import { responsiveImageFragment, metaTagsFragment } from "../lib/fragments"
import Link from "next/link"
import Head from "next/head"
import Script from "next/script"
import Hero from "../src/components/Hero"
import Section from "../src/components/Section"
import Cards from "../src/components/OrganizerCarousel"
import Highlights from "../src/components/HighlightCarousel"
import Events from "../src/components/Events"
import Contact from "../src/components/Connect"

export async function getStaticProps({
  params,
  landingHeroDetails = false,
  highlightsDetails = false,
  eventDetails = false,
  organizerDetails = false,
}) {
  // for landingHeroDetails
  const landingHeroReq = {
    query: `
    {
      landing{
        heroSubtitle(markdown: false)
        heroImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop}) {
            ...responsiveImageFragment
          }
        }
        heroTitle
        linkUrl
        linkText
        pageLink {
          slug
        }
        seo: _seoMetaTags {
          ...metaTagsFragment
        }
      }
    }
    ${responsiveImageFragment}
    ${metaTagsFragment}
    `,
    landingHeroDetails,
  }

  const highlightsReq = {
    query: `{
      allHighlights {
        heroTitle
        projectDescription
        heroImage {
          responsiveImage(imgixParams: {fm: jpg, fit: crop}) {
            ...responsiveImageFragment
          }
        }
        readMorePage {
          slug
        }
      }
    }${responsiveImageFragment}
    `,
    highlightsDetails,
  }

  const eventsReq = {
    query: `{
      allEvents {
        eventName
        eventDesc
        eventDate
        eventLocation
        archive {
          slug
        }
        workshopLink
        zoomLinkIfAny
      }
    }`,
    eventDetails,
  }

  const organizerReq = {
    query: `{
      allOrganizers(orderBy: _createdAt_ASC) {
        name
        clubPosition
        picture {
          responsiveImage(imgixParams: {fm: jpg, fit: crop}) {
            ...responsiveImageFragment
          }
        }
      }
    }${responsiveImageFragment}`,
    organizerDetails,
  }
  return {
    props: {
      landingHero: landingHeroDetails
        ? {
            ...landingHeroReq,
            initialData: await request(landingHeroReq),
            token: process.env.DATOCMS_API_READONLY_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(landingHeroReq),
          },
      highlightsInfo: highlightsDetails
        ? {
            ...highlightsReq,
            initialData: await request(highlightsReq),
            token: process.env.DATOCMS_API_READONLY_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(highlightsReq),
          },
      eventsInfo: eventDetails
        ? {
            ...eventsReq,
            initialData: await request(eventsReq),
            token: process.env.DATOCMS_API_READONLY_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(eventsReq),
          },
      organizerInfo: organizerDetails
        ? {
            ...organizerReq,
            initialData: await request(organizerReq),
            token: process.env.DATOCMS_API_READONLY_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(organizerReq),
          },
    },
  }
}

export default function LandingPage({ landingHero, highlightsInfo, eventsInfo, organizerInfo }) {
  const { data: hero } = useQuerySubscription(landingHero)
  const { data: highlightResp } = useQuerySubscription(highlightsInfo)
  const { data: eventsResp } = useQuerySubscription(eventsInfo)
  const { data: organizerResp } = useQuerySubscription(organizerInfo)

  const heroDetails = hero.landing
  const metaTags = heroDetails.seo
  const highlightDetails = highlightResp.allHighlights
  const eventDetails = eventsResp.allEvents
  const organizerDetails = organizerResp.allOrganizers

  return (
    <Layout pageTitle="GDSC - Fresno State Website">
      <Head>{renderMetaTags(metaTags)}</Head>
      {/* Hero */}
      {/* @TODO: Add datocms integration */}
      <section className="relative min-h-300 heroImg">
        <Section>
          <Highlights allHighlights={highlightDetails} />
        </Section>
      </section>

      {/* <Hero record={heroDetails} /> */}
      {/* Highlights & Achievements */}
      <Section SectionTitle={""}>
        <div className="w-full grid md:min-h-fit lg:min-h-fit bg-neutral text-neutral-content px-6 py-6 md:py-8 md:px-8 lg:py-10 ld:px-10">
          <div className="justify-self-start">
            <h1 className="font-bold text-lg md:text-2xl lg:text-3xl">{heroDetails.heroTitle}</h1>
            {heroDetails.heroSubtitle ? (
              <p className="text-md md:text-xl lg:text-2xl">{heroDetails.heroSubtitle}</p>
            ) : (
              ""
            )}
          </div>
          <div className="justify-self-end self-end">
            {heroDetails.linkText ? (
              <Link href={heroDetails.linkUrl ? `linkUrl` : `/pages/${heroDetails.pageLink.slug}`}>
                <a className="btn btn-primary">{heroDetails.linkText}</a>
              </Link>
            ) : (
              ""
            )}
          </div>
        </div>
      </Section>

      {/* Events */}
      <Section SectionTitle={"Events"} centered>
        {eventDetails ? <Events allEvents={eventDetails} /> : <p>There are no current events</p>}
      </Section>

      {/* Organizers */}
      <Section SectionTitle={"About Us"} centered>
        <Cards allOrganizers={organizerDetails} />
      </Section>

      {/* Contact & Socials */}
      <Section SectionTitle={"Connect with Us!"}>
        <Contact />
      </Section>
    </Layout>
  )
}
