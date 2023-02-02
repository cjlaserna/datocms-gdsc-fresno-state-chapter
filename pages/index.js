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
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.DATOCMS_API_READONLY_TOKEN,
            environment: process.env.NEXT_DATOCMS_ENVIRONMENT || null,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
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

export default function LandingPage({ subscription, landingHero }) {
  const {
    data: { pages },
  } = useQuerySubscription(subscription)

  const { data: hero } = useQuerySubscription(landingHero)

  const heroDetails = hero.landing

  return (
    <Layout pageTitle="Landing Page Template in Next.js">
      {/* Hero */}
      {/* @TODO: Add datocms integration */}
      <Hero record={heroDetails} />

      {/* Highlights & Achievements */}

      {/* Events */}

      {/* Organizers */}

      {/* Contact & Socials */}
      <section className="section">
        <div>
          <div className="justify-content-center">
            <div lg={6} md={8}>
              <div className="title text-center mb-5 mt-5">
                <h1 className="font-weight-bold text-dark mb-5">
                  <span className="text-warning">All pages</span>
                </h1>
                {pages &&
                  pages.map(({ slug, heroTitle }) => {
                    return (
                      <div key={slug} className="text-center mb-2">
                        <Link href={`/pages/${slug}`}>
                          <a>{heroTitle}</a>
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
