import Layout from "../src/components/Layout"
import { request } from "../lib/datocms"
import { useQuerySubscription } from "react-datocms"
import { responsiveImageFragment } from "../lib/fragments"
import Link from "next/link"
import Head from "next/head"
import Script from "next/script"
import Hero from "../src/components/Hero"
import Section from "../src/components/Section"
import Cards from "../src/components/OrganizerCarousel"
import Highlights from "../src/components/HighlightCarousel"

export async function getStaticProps({
  params,
  preview = false,
  landingHeroDetails = false,
  highlightsDetails = false,
}) {
  // for all pages
  const graphqlRequest = {
    query: `
      {
        pages: allPages {
          heroTitle
          slug
        }
      }
          `,
    preview,
  }

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
      }
    }
    ${responsiveImageFragment}
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
    },
  }
}

export default function LandingPage({ landingHero, highlightsInfo }) {
  const { data: hero } = useQuerySubscription(landingHero)
  const { data: highlightResp } = useQuerySubscription(highlightsInfo)

  const heroDetails = hero.landing
  const highlightDetails = highlightResp.allHighlights

  return (
    <Layout pageTitle="GDSC - Fresno State Website">
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
      <Section SectionTitle={"Events"}>
        <p>test</p>
      </Section>

      {/* Organizers */}
      <Section SectionTitle={"Learn More about GDSC-Fresno"}>
        <p>test</p>
        <Cards></Cards>
      </Section>

      {/* Contact & Socials */}
      <Section SectionTitle={"Connect"}>
        <p>test</p>
      </Section>
    </Layout>
  )
}
