import Layout from "../src/components/Layout"
import { request } from "../lib/datocms"
import { useQuerySubscription } from "react-datocms"
import { responsiveImageFragment } from "../lib/fragments"
import Link from "next/link"
import Head from "next/head"
import Script from "next/script"
import Hero from "../src/components/Hero"

export async function getStaticProps({ params, preview = false, landingHeroDetails = false }) {
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
    },
  }
}

export default function LandingPage({ landingHero }) {
  const { data: hero } = useQuerySubscription(landingHero)

  const heroDetails = hero.landing

  return (
    <Layout pageTitle="GDSC - Fresno State Website">
      {/* Hero */}
      {/* @TODO: Add datocms integration */}
      <Hero record={heroDetails} />

      {/* Highlights & Achievements */}
      <section className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between py-5">
        <h2 className="text-2xl font-bold"> Highlights & Achievements </h2>
      </section>
      {/* Events */}
      <section className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between py-5">
        <h2 className="text-2xl font-bold"> Events</h2>
      </section>

      {/* Organizers */}
      <section className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between py-5">
        <h2 className="text-2xl font-bold"> Organizers</h2>
      </section>
      {/* Contact & Socials */}
      <section className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between py-5">
        <h2 className="text-2xl font-bold"> Connect with us</h2>
      </section>
    </Layout>
  )
}
