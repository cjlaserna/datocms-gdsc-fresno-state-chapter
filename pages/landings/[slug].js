import Layout from "../../src/components/Layout"
import Hero from "../../src/components/Hero"
import Service from "../../src/components/Service"
import About from "../../src/components/About"
import Head from "next/head"
import { isHeading, isParagraph } from "datocms-structured-text-utils"
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments"
import { render as toPlainText } from "datocms-structured-text-to-plain-text"
import { request } from "../../lib/datocms"
import { StructuredText, useQuerySubscription, renderMetaTags, renderNodeRule } from "react-datocms"
import { Row, Container, Col } from "react-bootstrap"

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
          heroImage {
            responsiveImage(imgixParams: {fm: jpg, fit: crop }) {
              ...responsiveImageFragment
            }
          }
          slug
          content {
            value
            blocks {
              __typename
              ... on LinksToModelRecord {
                __typename
                id
                links {
                  ... on ServiceRecord {
                    __typename
                    id
                    title
                    ctaLink
                    text
                    image {
                      responsiveImage(imgixParams: {fm: jpg, fit: crop}) {
                        ...responsiveImageFragment
                      }
                    }
                  }
                }
              }
              ... on SectionRecord {
                id
                title
                text
                content {
                  ...on AboutBlockRecord {
                    __typename
                    title
                    text
                  }
                  ...on TitleBlockRecord {
                    id
                    __typename
                    title
                  }
                }
              }
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
            renderBlock={({ record }) => {
              switch (record.__typename) {
                case "LinksToModelRecord":
                  return record.links.map((link) => {
                    if (link.__typename === "ServiceRecord") {
                      return <Service service={link} />
                    }
                  })
                case "SectionRecord":
                  const blocks = record.content.map((rec) => {
                    if (rec.__typename === "AboutBlockRecord") {
                      return <About record={rec} />
                    } else if (rec.__typename === "TitleBlockRecord") {
                      return (
                        <Col md={4} key={rec.id}>
                          <h2 className="font-weight-light line-height-1_6 text-dark mb-4">{rec.title}</h2>
                        </Col>
                      )
                    }
                  })

                  return (
                    <section className="section bg-light">
                      <Container>
                        <div className="title text-center mb-5">
                          <h3 className="font-weight-normal text-dark">{record.title}</h3>
                          <p className="text-muted">{record.subtitle}</p>
                          {blocks.length > 0 && (
                            <Row className="justify-content-center mt-5" key={record.id}>
                              {blocks}
                            </Row>
                          )}
                        </div>
                      </Container>
                    </section>
                  )
                default:
                  return null
              }
            }}
            customNodeRules={[
              renderNodeRule(isHeading, ({ node, children, key }) => {
                const HeadingTag = `h${node.level}`
                const anchor = toPlainText(node)
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, "")

                return (
                  <HeadingTag key={key} id={anchor} className="font-weight-normal text-warning mb-3">
                    <a href={`#${anchor}`}>{children}</a>
                  </HeadingTag>
                )
              }),
            ]}
          />
        </Container>
      </section>
    </Layout>
  )
}
