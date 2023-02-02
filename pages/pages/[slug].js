import Layout from "../../src/components/Layout"
import Hero from "../../src/components/Hero"
import About from "../../src/components/About"
import Head from "next/head"
import { isHeading, isLink, isList } from "datocms-structured-text-utils"
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments"
import { render as toPlainText } from "datocms-structured-text-to-plain-text"
import { request } from "../../lib/datocms"
import Link from "next/link"
import { StructuredText, useQuerySubscription, renderMetaTags, renderNodeRule } from "react-datocms"
import { FiHash, FiLink } from "react-icons/fi"

const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")

export async function getStaticPaths() {
  const data = await request({ query: `{ allPages { slug } }` })

  return {
    paths: data.allPages.map((page) => `/pages/${page.slug}`),
    fallback: false,
  }
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      query PageBySlug($slug: String) {
        site: _site {
          favicon: faviconMetaTags {
            ...metaTagsFragment
          }
        }
        page(filter: {slug: {eq: $slug}}) {
          slug
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
          content {
            value
            blocks {
              __typename
              ... on SectionRecord {
                id
                title
                text
                content {
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
            token: process.env.DATOCMS_API_READONLY_TOKEN,
          }
        : {
            enabled: false,
            initialData: await request(graphqlRequest),
          },
      preview,
    },
  }
}

export default function Page({ subscription }) {
  const {
    data: { site, page },
  } = useQuerySubscription(subscription)

  const metaTags = page.seo.concat(site.favicon)

  return (
    <Layout>
      <Head>{renderMetaTags(metaTags)}</Head>
      <Hero record={page} />
      <div className="max-w-[85rem] w-full mx-auto px-4 py-5">
        <StructuredText
          data={page.content}
          renderBlock={({ record }) => {
            switch (record.__typename) {
              case "SectionRecord":
                const blocks = record.content.map((rec) => {
                  switch (rec.__typename) {
                    case "TitleBlockRecord":
                      return (
                        <div md={4} key={rec.id}>
                          <h3 className="font-weight-light line-height-1_6 text-dark mb-4">{rec.title}</h3>
                        </div>
                      )
                  }
                })

                return (
                  <section className="section">
                    <div>
                      <h2 className="text-lg text-dark text-center mb-4" key={record.id} id={slugify(record.title)}>
                        {record.title}
                      </h2>
                      <p className="text-muted text-center mb-5">{record.text}</p>
                      {blocks.length > 0 && (
                        <div className="justify-content-center" key={record.id + "-block"}>
                          {blocks}
                        </div>
                      )}
                    </div>
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

              // console.log("foo", anchor)

              return (
                <a className="flex items-center flex-row" href={`#${anchor}`}>
                  <div className="pr-2">
                    <FiHash />
                  </div>
                  <HeadingTag
                    key={key}
                    id={anchor}
                    className="whitespace-nowrap w-full font-weight-normal text-2xl pt-2 text-secondary mb-3"
                  >
                    {children}
                  </HeadingTag>
                </a>
              )
            }),
            renderNodeRule(isLink, ({ node, children, key }) => {
              return (
                <span className="font-weight-normal link link-primary">
                  <Link key={key} href={node.url}>
                    {node.children.at(0).value}
                  </Link>
                </span>
              )
            }),
          ]}
        />
      </div>
    </Layout>
  )
}
