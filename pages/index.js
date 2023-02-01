import Layout from "../src/components/Layout"
import { request } from "../lib/datocms"
import { useQuerySubscription } from "react-datocms"
import Link from "next/link"
import Head from "next/head"
import Script from "next/script"

export async function getStaticProps({ params, preview = false }) {
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
    },
  }
}

export default function LandingPage({ subscription }) {
  const {
    data: { pages },
  } = useQuerySubscription(subscription)

  return (
    <Layout pageTitle="Landing Page Template in Next.js">
      {/* Hero */}
      {/* @TODO: Add datocms integration */}
      <section className="min-h-300 heroImg flex justify-center items-center">GSDC - Fresno State Chapter</section>

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
