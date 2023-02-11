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

export async function getStaticProps({ params, preview = false, landingHeroDetails = false }) {
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
      <Section SectionTitle={"Highlights & Achievements"}>
        <p>test</p>
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
