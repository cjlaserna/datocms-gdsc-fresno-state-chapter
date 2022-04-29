import Layout from "../../src/components/Layout"
import Hero from "../../src/components/Hero"
import Service from "../../src/components/Service"
import About from "../../src/components/About"
import Footer from "../../src/components/Footer"
import { Container } from "react-bootstrap"
import Head from "next/head"
import serviceSource from "../../src/assets/services.json"
import footerSource from "../../src/assets/footer.json"
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments"
import { request } from "../../lib/datocms"
import { StructuredText, useQuerySubscription, renderMetaTags } from "react-datocms"

export async function getStaticPaths() {
  const data = await request({ query: `{ allLandingPages { slug } }` })

  return {
    paths: data.allLandingPages.map((landing) => `/landings/${landing.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query LandingBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        landingPage(filter: {slug: {eq: $slug}}) {
          seo: _seoMetaTags {
            ...metaTagsFragment
          }
          heroTitle
          heroSubtitle
          slug
          content {
            value
            blocks {
              __typename
              ...on AboutBlockRecord {
                id
                title
              }
              ...on ServiceRecord {
                id
                title
                ctaLink
                text
                image {
                  responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100}) {
                    ...responsiveImageFragment
                  }
                }
              }
            }
          }
          ogImage: heroImage{
            url(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 })
          }
          heroImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
      }
      ${responsiveImageFragment}
      ${metaTagsFragment}
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  }

  return {
    props: {
      subscription: preview
        ? {
            ...graphqlRequest,
            initialData: await request(graphqlRequest),
            token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
      preview,
    },
  }
}

export default function LandingPage({ subscription }) {
  const {
    data: { site, landingPage },
  } = useQuerySubscription(subscription)

  const metaTags = landingPage.seo.concat(site.favicon)
  return (
    <Layout pageTitle="Landing Page Template in Next.js">
      <Head>{renderMetaTags(metaTags)}</Head>
      <Hero record={landingPage} />
      <section className="section" id="about">
        <Container>
          <StructuredText
            data={landingPage.content}
            renderBlock={({ record }, ...props) => {
              switch (record.__typename) {
                case "AboutBlockRecord":
                  return <About record={record} />
                case "ServiceRecord":
                  return <Service service={record} />
                default:
                  return null
              }
            }}
          />
        </Container>
      </section>
    </Layout>
  )
}
