import Layout from "../src/components/Layout"
import { request } from "../lib/datocms"
import { useQuerySubscription } from "react-datocms"
import Link from "next/link"
import { Container, Row, Col } from "react-bootstrap"

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
    query: `
      {
        landings: allLandingPages {
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
    data: { landings },
  } = useQuerySubscription(subscription)

  return (
    <Layout pageTitle="Landing Page Template in Next.js">
      <section className="section" id="services">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8}>
              <div className="title text-center mb-5">
                <h3 className="font-weight-normal text-dark">
                  <span className="text-warning">All landing pages</span>
                </h3>
                {landings &&
                  landings.map(({ slug, heroTitle }) => {
                    return (
                      <div key={slug}>
                        <Link href={`/landings/${slug}`}>
                          <a>{heroTitle}</a>
                        </Link>
                      </div>
                    )
                  })}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  )
}
