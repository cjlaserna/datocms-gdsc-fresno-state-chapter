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
import { FiArrowLeft, FiHash, FiLink } from "react-icons/fi"
import Section from "../../src/components/Section"

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
  const dateModified = page.seo[5] ? page.seo[5].attributes.content.split("T", 1)[0] : null

  // sharing
  async function onShare() {
    const shareToast = document.getElementById("shareToast")
    const shareToastContent = document.getElementById("shareToastContent")
    console.log(shareToast)
    try {
      var currentURL = null
      if (typeof window !== "undefined") {
        currentURL = window.location.href
      }
      const shareData = {
        text: "Check out this page from the Google Developers Student Club @ CSU Fresno!",
        title: `GDSC CSU Fresno - ${page.heroTitle}`,
        url: currentURL,
      }
      await navigator.share(shareData)
      shareToastContent.innerHTML = "Shared successfully!"
      shareToast.classList.remove("hidden")
    } catch (err) {
      await navigator.clipboard.writeText(currentURL)
      shareToastContent.innerHTML = "URL copied to clipboard!"
      shareToast.classList.remove("hidden")
    }
  }
  return (
    <Layout>
      <Head>{renderMetaTags(metaTags)}</Head>
      <Hero record={page} />
      <div className="flex flex-1">
        <div class="toast toast-start hidden" id="shareToast">
          <div class="alert alert-info">
            <div>
              <span id="shareToastContent">New mail arrived.</span>
            </div>
          </div>
        </div>
        <Section>
          <div className="sm:px-20">
            <p>
              <Link href="/">
                <span className="font-semibold link underline decoration-solid">
                  <FiArrowLeft className="inline mb-[2px] mr-[5px]" />
                  Home
                </span>
              </Link>
              / <span>{page.heroTitle}</span>
            </p>

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
                        className="whitespace-nowrap w-full font-bold text-2xl mt-2 mb-3"
                      >
                        {children}
                      </HeadingTag>
                    </a>
                  )
                }),
                renderNodeRule(isLink, ({ node, children, key }) => {
                  return (
                    <Link key={key} href={node.url}>
                      <span className="font-semibold link underline decoration-solid">{node.children.at(0).value}</span>
                    </Link>
                  )
                }),
              ]}
            />
            <div className="px-2 py-2 mt-10 bg-neutral font-bold text-sm text-neutral-content grid grid-cols-2 grid-flow-col gap-4">
              <span>Modified: {dateModified}</span>
              <span className="float-right text-right underline hover:cursor-pointer" onClick={onShare}>
                Share This Page
              </span>
            </div>
          </div>
        </Section>
      </div>
    </Layout>
  )
}
